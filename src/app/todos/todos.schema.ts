import { z } from 'zod';

export const todoSchema = z.object({
  taskName: z.string().min(1, 'Task name is required'),
  status: z.string().min(1, 'Status is required'),
  dates: z.string().optional(),
  assignees: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent', '']).optional(),
  description: z.string().optional()
});

export type TodoFormData = z.infer<typeof todoSchema>;