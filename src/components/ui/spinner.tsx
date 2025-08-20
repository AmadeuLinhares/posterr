import { Loader } from "lucide-react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <Loader className="h-6 w-6 animate-spin text-gray-600" />
    </div>
  );
};
