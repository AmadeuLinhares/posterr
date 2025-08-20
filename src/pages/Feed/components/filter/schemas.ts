import z from "zod";

export const filterSchema = z.object({
  filters: z.enum(["all", "following"]).default("all"),
});
