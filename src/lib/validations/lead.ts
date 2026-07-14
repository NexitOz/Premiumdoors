import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Введите имя").max(80),
  phone: z
    .string()
    .min(10, "Введите телефон")
    .regex(/^[\d+()\s-]{10,20}$/, "Проверьте формат телефона"),
  email: z.string().email("Проверьте email").optional().or(z.literal("")),
  message: z.string().max(600).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Нужно согласие на обработку данных" }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
