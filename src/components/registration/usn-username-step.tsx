import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function USNUsernameStep({ data, updateData }) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="usn">University Serial Number (USN)</Label>
        <Input
          id="usn"
          value={data.usn}
          onChange={(e) => updateData({ usn: e.target.value })}
          placeholder="Enter your USN"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={data.username}
          onChange={(e) => updateData({ username: e.target.value })}
          placeholder="Choose a username"
        />
      </div>
    </div>
  );
}
