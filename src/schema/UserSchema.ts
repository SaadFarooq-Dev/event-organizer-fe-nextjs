import { UserRoles } from "@/assets/Constants";
import { z } from "zod";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const UserSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(5).max(30),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Number!"),
  role: z.enum([UserRoles.User, UserRoles.Organizer]),
});

export { UserSchema };
