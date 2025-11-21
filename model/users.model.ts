import { z } from "zod";

export const UsersFormSchema = z.object({
  users: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, { message: "Minimalnie 3 znaki" })
          .max(32, { message: "Maksymalnie 32 znaki" }),
      })
    )
    .min(2, "Wprowadz co najmniej 2 imiona")
    .max(20, "Możesz dodać maksymalnie 20 imion")
    .refine((arr) => arr.length % 2 === 0, {
      message: "Liczba użytkowników musi być parzysta",
      path: ["root"],
    }),
});

export type UsersFormValuesType = z.infer<typeof UsersFormSchema>;
