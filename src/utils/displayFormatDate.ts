import { format } from "date-fns";

export const displayFormatDate = (date?: string) => {
  if (!date) return "";
  return format(date, "MMMM d, yyyy");
};
