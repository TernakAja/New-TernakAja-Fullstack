"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, FormProvider } from "react-hook-form"
import * as z from "zod"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Building2, Check, ChevronsUpDown, Eye, EyeOff, UserCircle2 } from "lucide-react"

import { cn } from "@/lib/utils"
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
import { Progress } from "@/components/ui/progress"
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
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"

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
  headcount: z.array(z.number()),
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

function MultiStepRegistrationForm() {
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
      headcount: [100],
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
    const subscription = form.watch((_value) => {
      sessionStorage.setItem(
        "ternakaja_registration",
        JSON.stringify({ values: form.getValues(), step: currentStep })
      )
    })
    sessionStorage.setItem(
      "ternakaja_registration",
      JSON.stringify({ values: form.getValues(), step: currentStep })
    )
    return () => subscription.unsubscribe()
  }, [form.watch, currentStep, isHydrated, form])

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = []
    if (currentStep === 0) {
      if (!entityType) return
      setCurrentStep(1)
      return
    }

    if (currentStep === 1) {
      fieldsToValidate = ["email", "password", "role"]
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "namaPeternakan",
        "address",
        entityType === "mandiri" ? "nik" : "nib",
      ]
    }

    const isValid = await form.trigger(fieldsToValidate)
    if (isValid) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  const onSubmit = async (data: FormValues) => {
    console.log("Submitting:", data);
    setIsSubmitting(true)
    setApiError(null)

    // Simulate API Call
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate 20% random failure for edge case handling demonstration
          if (Math.random() < 0.2) {
            reject(new Error("Server sedang sibuk. Silakan coba beberapa saat lagi."))
          } else {
            resolve(true)
          }
        }, 1500)
      })

      // Success
      sessionStorage.removeItem("ternakaja_registration")
      setCurrentStep(4) // Final success screen
    } catch (error) {
      setApiError((error as Error).message || "Registrasi gagal")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { id: 1, title: "Identitas" },
    { id: 2, title: "Legalitas" },
    { id: 3, title: "Operasional" },
  ]

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0
    if (pass.length < 8) return 33
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) return 100
    return 66
  }

  if (!isHydrated) return null

  if (currentStep === 4) {
    return (
      <Card className="w-full sm:max-w-xl mx-auto shadow-xl ring-1 ring-border">
        <CardContent className="p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div className="size-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="size-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold">Registrasi Berhasil!</h2>
          <p className="text-muted-foreground">
            Selamat bergabung dengan TernakAja. Akun Anda sedang diverifikasi.
          </p>
          <Button className="mt-4" onClick={() => window.location.href = "/"}>
            Kembali ke Beranda
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full sm:max-w-xl mx-auto shadow-xl py-0 ring-1 ring-border overflow-hidden">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-xl">
          {currentStep === 0 ? "Pilih Entitas" : "Registrasi Pilot Program"}
        </CardTitle>
        <CardDescription>
          {currentStep === 0
            ? "Silakan pilih tipe pendaftaran yang paling sesuai."
            : "Lengkapi data untuk bergabung dengan TernakAja."}
        </CardDescription>

        {currentStep > 0 && currentStep <= 3 && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4 relative z-10 w-full">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
                  <Badge
                    variant={currentStep >= step.id ? "default" : "secondary"}
                    className={cn(
                      "size-8 flex justify-center items-center rounded-full text-base",
                      currentStep === step.id ? "ring-2 ring-primary ring-offset-2" : ""
                    )}
                  >
                    {step.id}
                  </Badge>
                  <span className="text-xs font-medium hidden sm:block text-muted-foreground">
                    {step.title}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 left-[16.6%] right-[16.6%] h-0.5 bg-muted -z-10" />
              <div
                className="absolute top-4 left-[16.6%] h-0.5 bg-primary -z-10 transition-all duration-300"
                style={{ width: `${(Math.max(0, currentStep - 1) / 2) * 66.8}%` }}
              />
            </div>
            <Progress value={(currentStep / 3) * 100} className="h-1 sm:hidden w-full" />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6 sm:p-8 relative min-h-[400px]">
        {apiError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{apiError}</AlertDescription>
          </Alert>
        )}

        <FormProvider {...form}>
          <form id="multi-step-form" onSubmit={form.handleSubmit(onSubmit)} className="overflow-x-hidden">
            <AnimatePresence mode="wait" initial={false}>

              {/* STEP 0 */}
              {currentStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <Card
                    className={cn(
                      "cursor-pointer border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-1",
                      entityType === 'mandiri' ? "border-primary bg-primary/5 shadow-sm" : "hover:border-primary/50"
                    )}
                    onClick={() => form.setValue("entityType", "mandiri")}
                  >
                    <CardContent className="p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-4 h-full">
                      <UserCircle2 className={cn("mx-auto size-14 text-muted-foreground transition-colors", entityType === 'mandiri' && "text-primary")} />
                      <div className="font-semibold text-xl">Peternakan Mandiri</div>
                      <p className="text-sm text-muted-foreground">
                        Untuk pemilik tunggal atau perorangan. Membutuhkan NIK KTP.
                      </p>
                    </CardContent>
                  </Card>

                  <Card
                    className={cn(
                      "cursor-pointer border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-1",
                      entityType === 'perusahaan' ? "border-primary bg-primary/5 shadow-sm" : "hover:border-primary/50"
                    )}
                    onClick={() => form.setValue("entityType", "perusahaan")}
                  >
                    <CardContent className="p-6 sm:p-8 text-center flex flex-col items-center justify-center gap-4 h-full">
                      <Building2 className={cn("mx-auto size-14 text-muted-foreground transition-colors", entityType === 'perusahaan' && "text-primary")} />
                      <div className="font-semibold text-xl">Perusahaan</div>
                      <p className="text-sm text-muted-foreground">
                        Untuk entitas hukum atau korporasi. Membutuhkan NIB.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* STEP 1 */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldGroup className="gap-6">
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Email Valid</FieldLabel>
                          <Input {...field} placeholder="email@contoh.com" aria-invalid={fieldState.invalid} />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Kata Sandi</FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              type={showPassword ? "text" : "password"}
                              {...field}
                              placeholder="Minimal 8 karakter"
                              aria-invalid={fieldState.invalid}
                            />
                            <InputGroupAddon align="inline-end">
                              <InputGroupButton type="button" variant="ghost" size="icon-sm" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <EyeOff /> : <Eye />}
                              </InputGroupButton>
                            </InputGroupAddon>
                          </InputGroup>
                          <Progress value={getPasswordStrength(field.value)} className={cn("h-1.5 mt-1", getPasswordStrength(field.value) === 100 ? "[&>div]:bg-green-500" : getPasswordStrength(field.value) > 33 ? "[&>div]:bg-yellow-500" : "[&>div]:bg-red-500")} />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Controller
                      name="role"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Peran Pengguna</FieldLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger aria-invalid={fieldState.invalid}>
                              <SelectValue placeholder="Pilih Peran" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Admin / Pemilik</SelectItem>
                              <SelectItem value="manager">Manajer Kandang</SelectItem>
                              <SelectItem value="operator">Operator Lapangan</SelectItem>
                            </SelectContent>
                          </Select>
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </motion.div>
              )}

              {/* STEP 2 */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldGroup className="gap-6">
                    <Controller
                      name="namaPeternakan"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>
                            {entityType === 'mandiri' ? 'Nama Peternakan' : 'Nama Perusahaan'}
                          </FieldLabel>
                          <Input {...field} placeholder="Masukkan nama..." aria-invalid={fieldState.invalid} />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    {entityType === 'mandiri' ? (
                      <Controller
                        name="nik"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nomor Induk Kependudukan (NIK)</FieldLabel>
                            <Input
                              {...field}
                              placeholder="16 Digit NIK"
                              maxLength={16}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldDescription>NIK harus 16 digit angka.</FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    ) : (
                      <Controller
                        name="nib"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Nomor Induk Berusaha (NIB)</FieldLabel>
                            <Input
                              {...field}
                              placeholder="13 Digit NIB"
                              maxLength={13}
                              aria-invalid={fieldState.invalid}
                            />
                            <FieldDescription>NIB harus 13 digit angka.</FieldDescription>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                    )}

                    <Controller
                      name="address"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel>Alamat Lengkap</FieldLabel>
                          <Textarea
                            {...field}
                            placeholder="Detail alamat domisili operasional..."
                            className="resize-none"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                </motion.div>
              )}

              {/* STEP 3 */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <FieldGroup className="gap-6">
                    <Controller
                      name="headcount"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <div className="flex justify-between items-center mb-2">
                            <FieldLabel>Estimasi Jumlah Ternak (Ekor)</FieldLabel>
                            <span className="font-semibold">{Array.isArray(field.value) ? field.value[0] : field.value}</span>
                          </div>
                          <Slider
                            value={Array.isArray(field.value) ? field.value : [field.value]}
                            onValueChange={(val) => field.onChange(Array.isArray(val) ? val : [val])}
                            max={10000}
                            min={10}
                            step={10}
                            className="py-4"
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      name="location"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="mt-4">
                          <FieldLabel>Provinsi Utama</FieldLabel>
                          <Popover>
                            <PopoverTrigger render={
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between",
                                  !field.value && "text-muted-foreground",
                                  fieldState.invalid && "border-destructive ring-destructive"
                                )}
                              />
                            }>
                              {field.value
                                ? provinces.find((p) => p.value === field.value)?.label
                                : "Pilih provinsi"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                              <Command>
                                <CommandInput placeholder="Cari provinsi..." />
                                <CommandList>
                                  <CommandEmpty>Provinsi tidak ditemukan.</CommandEmpty>
                                  <CommandGroup>
                                    {provinces.map((prov) => (
                                      <CommandItem
                                        value={prov.label}
                                        key={prov.value}
                                        onSelect={() => {
                                          form.setValue("location", prov.value)
                                        }}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            prov.value === field.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
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
                      )}
                    />
                  </FieldGroup>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </FormProvider>
      </CardContent>
      <CardFooter className="bg-muted/30 border-t p-6 sm:p-8">
        <div className="flex w-full justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={currentStep === 0 ? () => window.location.href = "/" : prevStep}
          >
            {currentStep === 0 ? "Batal" : "Kembali"}
          </Button>

          <Button
            type="button"
            onClick={currentStep === 3 ? form.handleSubmit(onSubmit) : nextStep}
            disabled={currentStep === 0 ? !entityType : isSubmitting}
          >
            {isSubmitting ? "Memproses..." : currentStep === 3 ? "Kirim Pendaftaran" : "Selanjutnya"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function JoinUsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 md:py-24 bg-background">
      <MultiStepRegistrationForm />
    </div>
  )
}
