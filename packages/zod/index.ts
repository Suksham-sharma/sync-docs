import z from "zod";

export const signUpData = z.object({
  username: z.string(),
  password: z.string(),
});

export const signInData = z.object({
  username: z.string(),
  password: z.string(),
});

export const createSheetData = z.object({
  title: z.string(),
  slug: z.string(),
});
