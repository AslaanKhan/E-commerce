import { z } from "zod";

export const QueryValidatior = z.object({
    category: z.string().optional(),
    sort:z.enum(['asc','desc']).optional(),
    limit: z.number().optional()
})

export type TQueryValidatior = z.infer<typeof QueryValidatior>