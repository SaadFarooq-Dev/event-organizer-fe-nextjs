import { UserSchema } from "@/schema/UserSchema";
import { z } from "zod";

export interface AuthFormType {
  formType: "SignIn" | "SignUp";
}

export interface UserRoles {
  [key: string]: string;
  User: string;
  Organizer: string;
}

export type UserSchemaType = z.infer<typeof UserSchema>;

export type InitialState = {
  value: AuthState;
};

export enum AuthRoles {
  User = "user",
  Organizer = "organizer",
}

export type AuthState = {
  isAuth: boolean;
  email: string;
  id: string;
  role: AuthRoles;
  token: string;
};

export type LogInPayloadAction = {
  email: string;
  id: string;
  role: AuthRoles;
  token: string;
};

export type UserType = {
  email: string;
  id: string;
  name: string;
  phoneNumber: string;
  role: AuthRoles;
};

export type GetUsersResponse = {
  data: UserType[];
};

export type RegisterResponseType = {
  success: boolean;
  user: UserType;
};

export type LoginResponseType = {
  success: boolean;
  access_token: string;
};

export type EventType = {
  id: string;
  title: string;
  desc: string;
  location: string;
  startDate: string;
  endDate: string;
  attendeeCount?: number;
};
