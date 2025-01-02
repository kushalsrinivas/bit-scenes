import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Define the shape of categorized interests
const categorizedInterests: Record<string, string[]> = {
  Technology: [
    "AI",
    "Blockchain",
    "Cybersecurity",
    "Web Development",
    "Data Science",
    "Machine Learning",
    "Cloud Computing",
    "Internet of Things (IoT)",
    "Augmented Reality (AR)",
    "Virtual Reality (VR)",
  ],
  Science: [
    "Physics",
    "Chemistry",
    "Biology",
    "Astronomy",
    "Genetics",
    "Ecology",
    "Quantum Mechanics",
    "Geology",
    "Meteorology",
    "Environmental Science",
  ],
  Arts: [
    "Painting",
    "Music",
    "Dance",
    "Theatre",
    "Sculpture",
    "Photography",
    "Creative Writing",
    "Calligraphy",
    "Film Making",
    "Graphic Design",
  ],
  // Additional categories...
};

// Define the types for props
interface InterestsStepProps {
  data: { interests: string[] };
  updateData: (newData: { interests: string[] }) => void;
}

export function InterestsStep({ data, updateData }: InterestsStepProps) {
  const toggleInterest = (interest: string) => {
    const isSelected = data.interests.includes(interest);
    let updatedInterests;

    if (isSelected) {
      // Remove the interest if it's already selected
      updatedInterests = data.interests.filter((i) => i !== interest);
    } else if (data.interests.length < 5) {
      // Add the interest if the max limit isn't reached
      updatedInterests = [...data.interests, interest];
    } else {
      // Do nothing if max limit is reached and trying to add more
      return;
    }

    updateData({ interests: updatedInterests });
  };

  return (
    <div>
      <div className="h-[95vh] space-y-6 py-5 overflow-x-hidden overflow-y-scroll">
        {Object.entries(categorizedInterests).map(([category, interests]) => (
          <div key={category}>
            <h3 className="mb-2 text-lg font-semibold">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Button
                  key={interest}
                  variant={
                    data.interests.includes(interest) ? "neutral" : "noShadow"
                  }
                  onClick={() => toggleInterest(interest)}
                  disabled={
                    !data.interests.includes(interest) &&
                    data.interests.length >= 5
                  }
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h4 className="mb-2 text-lg font-semibold">Selected Interests</h4>
        <div className="flex flex-wrap gap-2">
          {data.interests.map((interest) => (
            <Badge key={interest} variant="neutral">
              {interest}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
