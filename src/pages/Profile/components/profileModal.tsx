import { Button } from "@/components/ui/button";
import { Profile } from "..";

type ProfileModalProps = { onClose: () => void };

export default function ProfileModal({ onClose }: ProfileModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full h-full shadow-xl p-6 bg-primary grid gap-6 auto-rows-min">
        <div className="flex justify-start items-center">
          <Button onClick={onClose} variant={"secondary"}>
            Back
          </Button>
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </div>
  );
}
