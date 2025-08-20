import type { ReactElement } from "react";

interface EmptyStateProps {
  content: ReactElement;
  title: string;
  description?: string;
}

export const EmptyState = ({
  content,
  title,
  description,
}: EmptyStateProps) => {
  return (
    <div className="grid gap-4 ">
      <div className="flex justify-center items-center text-gray-400">
        {content}
      </div>
      <div>
        <p className="text-center text-gray-500">{title}</p>
      </div>
      {!!description && (
        <div>
          <p className="text-center text-gray-500">{description}</p>
        </div>
      )}
    </div>
  );
};
