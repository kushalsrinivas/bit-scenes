"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { BranchStep } from "./branch-step";
import { USNUsernameStep } from "./usn-username-step";
import { SocialLinksStep } from "./social-links-step";
import { InterestsStep } from "./interests-step";
import { api } from "@/trpc/react";

import { useRouter } from "next/navigation";
interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  [platform: string]: string; // For dynamic keys
}

// Define FormData interface
interface FormData {
  userId: string;
  usn: string;
  username: string;
  branch: string;
  socialLinks: SocialLinks;
  interests: string[];
}
const steps = ["USN & Username", "Branch", "Social Links", "Interests"];

export function MultiStepForm({ userId }: { userId: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    userId: userId,
    usn: "",
    username: "",
    branch: "",
    socialLinks: { github: "", linkedin: "", twitter: "" },
    interests: [],
  });
  const Createstudent = api.students.create.useMutation({
    onSuccess: () => {
      router.push("/feed");
    },
  });

  const updateFormData = (stepData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const nextStep = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <USNUsernameStep data={formData} updateData={updateFormData} />;
      case 1:
        return <BranchStep data={formData} updateData={updateFormData} />;
      case 2:
        return <SocialLinksStep data={formData} updateData={updateFormData} />;
      case 3:
        return <InterestsStep data={formData} updateData={updateFormData} />;
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    try {
      Createstudent.mutate(formData);
      router.push("/feed");
    } catch (e) {
      console.error(e);
    }
    // Here you would typically send the data to your backend
  };
  const { data } = api.students.getById.useQuery({ userId: userId });
  if (data) {
    router.push("/feed");
  }

  return (
    <Card className="mx-auto w-full max-w-lg">
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="mb-2 flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`text-sm font-medium ${
                  index <= currentStep
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="bg-secondary h-2 w-full rounded-full">
            <div
              className="h-2 rounded-full bg-black transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>
        {renderStep()}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={prevStep} disabled={currentStep === 0}>
          Previous
        </Button>
        {currentStep < steps.length - 1 ? (
          <Button onClick={nextStep}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  );
}
