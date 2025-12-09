import { z } from "zod";

export const FeatureTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]).optional(),
});

export type TaskSchema = z.infer<typeof FeatureTaskSchema>;
