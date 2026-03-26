"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Dna,
  Save,
  RefreshCw,
  Check,
  Scale,
  Ruler,
  Camera,
  HardDrive,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export default function AddLivestockForm() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    deviceId: "",
    name: "",
    species: "",
    breed: "",
    gender: "",
    birthDate: "",
    photoUrl: "",
    status: "",
    weight: "",
    height: "",
    bodyConditionScore: "",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      "deviceId",
      "name",
      "species",
      "breed",
      "gender",
      "birthDate",
      "status",
      "weight",
      "height",
      "bodyConditionScore",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof typeof formData]) {
        newErrors[field] = `${field} is required`;
      }
    });

    if (formData.weight && isNaN(Number(formData.weight))) {
      newErrors.weight = "Invalid number";
    }

    if (formData.height && isNaN(Number(formData.height))) {
      newErrors.height = "Invalid number";
    }

    if (formData.bodyConditionScore && isNaN(Number(formData.bodyConditionScore))) {
      newErrors.bodyConditionScore = "Invalid number";
    }

    if (formData.deviceId && !/^[a-zA-Z0-9-]+$/.test(formData.deviceId)) {
      newErrors.deviceId = "Invalid format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const generateDeviceId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const base = formData.name
      ? formData.name.toLowerCase().replace(/\s+/g, "-")
      : "device";

    setFormData((prev) => ({
      ...prev,
      deviceId: `${base}-${timestamp}`,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submit clicked");
    // e.preventDefault();

    // if (!validateForm()) {
    //   toast.error("Please fill all fields correctly");
    //   return;
    // }

    // setIsSubmitting(true);

    // try {
    //   const res = await createLivestock(
    //     Number(user?.id),
    //     Number(formData.deviceId),
    //     formData.name,
    //     formData.species,
    //     formData.breed,
    //     formData.gender,
    //     formData.birthDate,
    //     formData.photoUrl || null,
    //     formData.status,
    //     Number(formData.height),
    //     Number(formData.weight),
    //     Number(formData.bodyConditionScore),
    //     formData.notes || null
    //   );

    //   toast.success(res.message);

    //   setIsSuccess(true);
    //   setIsSubmitting(false);

    //   setFormData({
    //     deviceId: "",
    //     name: "",
    //     species: "",
    //     breed: "",
    //     gender: "",
    //     birthDate: "",
    //     photoUrl: "",
    //     status: "",
    //     weight: "",
    //     height: "",
    //     bodyConditionScore: "",
    //     notes: "",
    //   });

    //   setTimeout(() => setIsSuccess(false), 3000);
    // } catch (err) {
    //   setIsSubmitting(false);
    //   toast.error("Failed to submit");
    // }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Add New Livestock
        </h1>
        <p className="text-muted-foreground">
          Register new livestock and connect it to a monitoring device.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="device">
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="device">Device</TabsTrigger>
            <TabsTrigger value="animal">Animal</TabsTrigger>
          </TabsList>

          {/* DEVICE */}
          <TabsContent value="device">
            <Card>
              <CardHeader>
                <CardTitle>Device Info</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Enter device details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Label className="text-foreground">Device ID</Label>
                <div className="flex gap-2">
                  <Input
                    name="deviceId"
                    value={formData.deviceId}
                    onChange={handleInputChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateDeviceId}
                  >
                    Generate
                  </Button>
                </div>
                {errors.deviceId && (
                  <p className="text-xs text-destructive">
                    {errors.deviceId}
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ANIMAL */}
          <TabsContent value="animal">
            <Card>
              <CardHeader>
                <CardTitle>Animal Info</CardTitle>
                <CardDescription>
                  Enter detailed livestock information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Bella"
                      required
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Use an identifiable name for this livestock.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="species"
                      className="flex items-center gap-2"
                    >
                      <Dna className="h-4 w-4" />
                      Species{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.species}
                      onValueChange={(value) =>
                        handleSelectChange("species", value)
                      }
                    >
                      <SelectTrigger id="species">
                        <SelectValue placeholder="Select species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cow">Cow</SelectItem>
                        <SelectItem value="goat">Goat</SelectItem>
                        <SelectItem value="sheep">Sheep</SelectItem>
                        <SelectItem value="pig">Pig</SelectItem>
                        <SelectItem value="horse">Horse</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.species && (
                      <p className="text-xs text-red-500">{errors.species}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Choose the livestock species.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="breed" className="flex items-center gap-2">
                      <Dna className="h-4 w-4" />
                      Breed{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder="e.g. Holstein"
                      required
                    />
                    {errors.breed && (
                      <p className="text-xs text-red-500">{errors.breed}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Enter the breed or variety.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Gender{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        handleSelectChange("gender", value)
                      }
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-xs text-red-500">{errors.gender}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Select the livestock gender.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="birthDate"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Birth Date{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.birthDate && (
                      <p className="text-xs text-red-500">{errors.birthDate}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Choose the livestock birth date.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="photoUrl"
                      className="flex items-center gap-2"
                    >
                      <Camera className="h-4 w-4" />
                      Photo URL
                    </Label>
                    <Input
                      id="photoUrl"
                      name="photoUrl"
                      value={formData.photoUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/photo.jpg"
                    />
                    <p className="text-xs text-gray-500">
                      Optional: add a public image URL.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="status" className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Health Status{" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="unhealthy">Unhealthy</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-xs text-red-500">{errors.status}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Current health status of the livestock.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="weight" className="flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      Weight (kg){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleInputChange}
                      placeholder="e.g. 350.5"
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.weight && (
                      <p className="text-xs text-red-500">{errors.weight}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Enter current body weight in kilograms.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="height" className="flex items-center gap-2">
                      <Ruler className="h-4 w-4" />
                      Height (cm){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleInputChange}
                      placeholder="e.g. 145.0"
                      required
                      min="0"
                      step="0.1"
                    />
                    {errors.height && (
                      <p className="text-xs text-red-500">{errors.height}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Enter current body height in centimeters.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="bodyConditionScore"
                      className="flex items-center gap-2"
                    >
                      <Scale className="h-4 w-4" />
                      Body Condition Score (1-9){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="bodyConditionScore"
                      name="bodyConditionScore"
                      type="number"
                      value={formData.bodyConditionScore}
                      onChange={handleInputChange}
                      placeholder="e.g. 5"
                      required
                      min="1"
                      max="9"
                      step="1"
                    />
                    {errors.bodyConditionScore && (
                      <p className="text-xs text-red-500">
                        {errors.bodyConditionScore}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Score from 1 (thin) to 9 (obese).
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Additional notes..."
                  />
                  <p className="text-xs text-gray-500">
                    Optional notes about behavior, treatment, or observations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUBMIT */}
          <div className="flex justify-end mt-6">
            {isSuccess ? (
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-md flex items-center gap-2">
                <Check className="h-4 w-4" />
                Success
              </div>
            ) : (
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:opacity-90"
              >
                {isSubmitting ? (
                  <RefreshCw className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Submit
              </Button>
            )}
          </div>
        </Tabs>
      </form>
    </motion.div>
  );
}