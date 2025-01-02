import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const branches = [
  "Computer Science",
  "Information Technology",
  "Electronics and Communication",
  "Electrical and Electronics",
  "Mechanical Engineering",
  "Civil Engineering",
  "Telecommunication",
  "CSE Allied Branches",
];

interface BranchStepProps {
  data: {
    branch: string;
  };
  updateData: (newData: { branch: string }) => void;
}

export function BranchStep({ data, updateData }: BranchStepProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor="branch">Branch</Label>
      <Select
        value={data.branch}
        onValueChange={(value) => updateData({ branch: value })}
      >
        <SelectTrigger id="branch">
          <SelectValue placeholder="Select your branch" />
        </SelectTrigger>
        <SelectContent>
          {branches.map((branch) => (
            <SelectItem key={branch} value={branch}>
              {branch}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
