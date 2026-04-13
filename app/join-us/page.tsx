"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, FormProvider } from "react-hook-form"
import * as z from "zod"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Building2, Check, ChevronsUpDown, Eye, EyeOff, UserCircle2 } from "lucide-react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/Icons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const provinces = [
  { value: "jawa_barat", label: "Jawa Barat" },
  { value: "jawa_tengah", label: "Jawa Tengah" },
  { value: "jawa_timur", label: "Jawa Timur" },
  { value: "banten", label: "Banten" },
  { value: "dki_jakarta", label: "DKI Jakarta" },
  { value: "di_yogyakarta", label: "DI Yogyakarta" },
  { value: "bali", label: "Bali" },
]

const formSchema = z.object({
  entityType: z.enum(["", "mandiri", "perusahaan"]),
  email: z.string().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(8, "Password minimal 8 karakter."),
  role: z.string().min(1, "Silakan pilih peran Anda."),
  namaPeternakan: z.string().min(3, "Nama terlalu pendek."),
  nik: z.string().optional(),
  nib: z.string().optional(),
  address: z.string().min(10, "Alamat terlalu pendek."),
  headcount: z.number().min(1, "Jumlah minimal 1 ekor."),
  location: z.string().min(1, "Silakan pilih provinsi."),
}).superRefine((data, ctx) => {
  if (data.entityType === "mandiri") {
    if (!data.nik || !/^\d{16}$/.test(data.nik)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "NIK harus berisi tepat 16 digit angka.",
        path: ["nik"],
      })
    }
  } else if (data.entityType === "perusahaan") {
    if (!data.nib || !/^\d{13}$/.test(data.nib)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "NIB harus berisi tepat 13 digit angka.",
        path: ["nib"],
      })
    }
  }
})

type FormValues = z.infer<typeof formSchema>

const steps = [
  { id: 0, title: "Entitas" },
  { id: 1, title: "Identitas" },
  { id: 2, title: "Legalitas" },
  { id: 3, title: "Operasional" },
]

export default function MultiStepRegistrationForm() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [showPassword, setShowPassword] = React.useState(false)
  const [apiError, setApiError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entityType: "",
      email: "",
      password: "",
      role: "",
      namaPeternakan: "",
      nik: "",
      nib: "",
      address: "",
      headcount: 0,
      location: "",
    },
    mode: "onChange",
  })

  const entityType = form.watch("entityType")

  React.useEffect(() => {
    const savedData = sessionStorage.getItem("ternakaja_registration")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        form.reset(parsed.values)
        setCurrentStep(parsed.step)
      } catch (_e) {
        console.error("Failed to parse cached registration data")
      }
    }
    setIsHydrated(true)
  }, [form])

  React.useEffect(() => {
    if (!isHydrated) return
    const subscription = form.watch((value) => {
      sessionStorage.setItem(
        "ternakaja_registration",
        JSON.stringify({ values: value, step: currentStep })
      )
    })
    return () => subscription.unsubscribe()
  }, [form.watch, currentStep, isHydrated])

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = []
    
    switch (currentStep) {
      case 0:
        if (!entityType) {
          form.setError("entityType", { type: "manual", message: "Pilih tipe entitas" })
          return
        }
        break;
      case 1:
        fieldsToValidate = ["email", "password", "role"]
        break;
      case 2:
        fieldsToValidate = ["namaPeternakan", "address", entityType === "mandiri" ? "nik" : "nib"]
        break;
    }

    const isValid = fieldsToValidate.length ? await form.trigger(fieldsToValidate) : true
    if (isValid) setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => setCurrentStep((prev) => Math.max(0, prev - 1))

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() < 0.2 ? reject(new Error("Server timeout. Try again.")) : resolve(true)
        }, 1500)
      })
      sessionStorage.removeItem("ternakaja_registration")
      setCurrentStep(4)
    } catch (error) {
      setApiError((error as Error).message || "Registrasi gagal")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0
    if (pass.length < 8) return 33
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 100
    return 66
  }

  if (!isHydrated) return null

  if (currentStep === 4) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full sm:max-w-xl mx-auto shadow-lg border-border/50">
          <CardContent className="p-12 text-center flex flex-col items-center gap-6">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="size-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tight">Registrasi Berhasil</h2>
              <p className="text-muted-foreground">Akun Anda sedang diverifikasi oleh sistem.</p>
            </div>
            <Button className="mt-4" onClick={() => window.location.href = "/"}>Kembali ke Beranda</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-2xl tracking-tight mb-6 hover:opacity-80 transition">
          <Icons.appIcon />
          TernakAja
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-center">Pendaftaran Mitra</h1>
        <p className="text-muted-foreground text-sm mt-2 text-center">Lengkapi data verifikasi untuk integrasi sistem.</p>
      </div>

      <Card className="w-full sm:max-w-xl mx-auto shadow-lg border-border/50 overflow-hidden bg-card">      
        <CardHeader className="space-y-6 pb-8">
        {/* Semantic Flex-based Stepper */}
        <div className="flex items-center justify-between w-full relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-muted rounded-full pointer-events-none" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-primary rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />
          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-card px-2">
              <div className={cn(
                "size-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2",
                currentStep > step.id ? "bg-primary border-primary text-primary-foreground" :
                currentStep === step.id ? "bg-background border-primary text-primary" :
                "bg-background border-muted text-muted-foreground"
              )}>
                {currentStep > step.id ? <Check className="size-4" /> : step.id + 1}
              </div>
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-6 sm:px-8 relative min-h-[380px]">
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Network Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <FormProvider {...form}>
          <form id="multi-step-form" onSubmit={form.handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait" initial={false}>
              
              {/* STEP 0 */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <Card
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary/50",
                      entityType === 'mandiri' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                    )}
                    onClick={() => form.setValue("entityType", "mandiri", { shouldValidate: true })}
                  >
                    <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
                      <UserCircle2 className={cn("size-10", entityType === 'mandiri' ? "text-primary" : "text-muted-foreground")} />
                      <div>
                        <div className="font-medium">Peternakan Mandiri</div>
                        <p className="text-xs text-muted-foreground mt-1">Perorangan (Validasi NIK)</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card
                    className={cn(
                      "cursor-pointer transition-all hover:border-primary/50",
                      entityType === 'perusahaan' ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"
                    )}
                    onClick={() => form.setValue("entityType", "perusahaan", { shouldValidate: true })}
                  >
                    <CardContent className="p-6 flex flex-col items-center gap-4 text-center">
                      <Building2 className={cn("size-10", entityType === 'perusahaan' ? "text-primary" : "text-muted-foreground")} />
                      <div>
                        <div className="font-medium">Perusahaan</div>
                        <p className="text-xs text-muted-foreground mt-1">Korporasi (Validasi NIB)</p>
                      </div>
                    </CardContent>
                  </Card>
                  {form.formState.errors.entityType && (
                    <p className="text-sm font-medium text-destructive col-span-full text-center">
                      {form.formState.errors.entityType.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Email Sistem</FieldLabel>
                      <Input {...field} placeholder="admin@farm.com" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                  <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Kata Sandi Akses</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          type={showPassword ? "text" : "password"}
                          {...field}
                          placeholder="Minimal 8 karakter"
                        />
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton type="button" variant="ghost" size="icon-sm" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                          </InputGroupButton>
                        </InputGroupAddon>
                      </InputGroup>
                      <div className="flex gap-1 h-1.5 mt-2">
                        {[33, 66, 100].map((threshold) => (
                          <div key={threshold} className={cn(
                            "flex-1 rounded-full transition-colors",
                            getPasswordStrength(field.value) >= threshold 
                              ? getPasswordStrength(field.value) === 100 ? "bg-emerald-500" : getPasswordStrength(field.value) > 33 ? "bg-amber-500" : "bg-rose-500"
                              : "bg-muted"
                          )} />
                        ))}
                      </div>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                  <Controller name="role" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Otoritas</FieldLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkatan akses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin / Pemilik</SelectItem>
                          <SelectItem value="manager">Manajer Kandang</SelectItem>
                          <SelectItem value="operator">Operator Lapangan</SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                </motion.div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <Controller name="namaPeternakan" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{entityType === 'mandiri' ? 'Nama Fasilitas' : 'Nama Perusahaan'}</FieldLabel>
                      <Input {...field} />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />

                  <Controller name={entityType === 'mandiri' ? "nik" : "nib"} control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>{entityType === 'mandiri' ? 'NIK Pemilik' : 'NIB Perusahaan'}</FieldLabel>
                      <Input {...field} maxLength={entityType === 'mandiri' ? 16 : 13} className="font-mono" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />

                  <Controller name="address" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Titik Koordinat / Alamat Fisik</FieldLabel>
                      <Textarea {...field} className="resize-none h-24" />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                </motion.div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Replaced Slider with exact numerical input to prevent data inaccuracy */}
                  <Controller name="headcount" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Total Populasi Aktif (Ekor)</FieldLabel>
                      <Input 
                        type="number" 
                        min={1}
                        {...field} 
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                        className="font-mono"
                      />
                      <FieldDescription>Data ini menentukan alokasi provisioning perangkat IoT.</FieldDescription>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />

                  <Controller name="location" control={form.control} render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Regional Operasi</FieldLabel>
                      <Popover>
                        <PopoverTrigger >
                          <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", !field.value && "text-muted-foreground")}>
                            {field.value ? provinces.find((p) => p.value === field.value)?.label : "Pilih regional"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-0">
                          <Command>
                            <CommandInput placeholder="Cari regional..." />
                            <CommandList>
                              <CommandEmpty>Data regional tidak ditemukan.</CommandEmpty>
                              <CommandGroup>
                                {provinces.map((prov) => (
                                  <CommandItem key={prov.value} value={prov.label} onSelect={() => form.setValue("location", prov.value, { shouldValidate: true })}>
                                    <Check className={cn("mr-2 h-4 w-4", prov.value === field.value ? "opacity-100" : "opacity-0")} />
                                    {prov.label}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )} />
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </FormProvider>
      </CardContent>
      
      <CardFooter className="px-6 sm:px-8 py-6 bg-muted/20 border-t border-border/50">
        <div className="flex w-full justify-between gap-4">
          <Button type="button" variant="ghost" onClick={currentStep === 0 ? () => window.location.href = "/" : prevStep}>
            {currentStep === 0 ? "Batal" : "Kembali"}
          </Button>
          <Button 
            type="button" 
            onClick={currentStep === 3 ? form.handleSubmit(onSubmit) : nextStep} 
            disabled={isSubmitting}
            className="min-w-[120px]"
          >
            {isSubmitting ? "Sinkronisasi..." : currentStep === 3 ? "Deploy Data" : "Selanjutnya"}
          </Button>
        </div>
      </CardFooter>
      </Card>
      
      <p className="px-8 text-center text-sm text-muted-foreground mt-8">
        Sudah menjadi mitra?{" "}
        <Link href="/login" className="text-primary hover:underline hover:text-primary/90">
          Masuk
        </Link>
      </p>
    </div>
  )
}