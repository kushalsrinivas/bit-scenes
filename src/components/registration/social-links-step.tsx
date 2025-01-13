import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  [platform: string]: string; // For dynamic keys
}
interface SocialLinksStepProps {
  data: {
    socialLinks: SocialLinks; // Using Record for dynamic keys
  };
  updateData: (newData: { socialLinks: SocialLinks }) => void;
}

export function SocialLinksStep({ data, updateData }: SocialLinksStepProps) {
  const handleSocialLinkChange = (platform: string, value: string) => {
    updateData({ socialLinks: { ...data.socialLinks, [platform]: value } });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="github">GitHub</Label>
        <Input
          id="github"
          value={data.socialLinks.github}
          onChange={(e) => handleSocialLinkChange("github", e.target.value)}
          placeholder="Your GitHub profile URL"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn</Label>
        <Input
          id="linkedin"
          value={data.socialLinks.linkedin}
          onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
          placeholder="Your LinkedIn profile URL"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="twitter">Twitter</Label>
        <Input
          id="twitter"
          value={data.socialLinks.twitter}
          onChange={(e) => handleSocialLinkChange("twitter", e.target.value)}
          placeholder="Your Twitter profile URL"
        />
      </div>
    </div>
  );
}
