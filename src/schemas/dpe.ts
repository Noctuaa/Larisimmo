import { z } from "astro/zod";

export const dpeSchema = z.enum(['A', 'B', 'C', 'D', 'E', 'F', 'G']);

export type Dpe = z.infer<typeof dpeSchema>;