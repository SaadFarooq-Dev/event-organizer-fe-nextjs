import { UserRoles } from "@/types";

const Query_Endpoint = {
  login: "/auth/login",
  register: "/user/create",
  allUsers: "/user/all",
  user: "/user/id",
  editUser: "/user/update",
  allEvents: "/event/all",
  createEvent: "event/create",
  event: "/event/id",
  userEvents: "/event/user",
  userJoinedEvents: "/event/attendee",
  editEvent: "/event/update",
  attendEvent: "/event",
};

const FormFields = {
  SignIn: {
    title: "Welcome Back",
    email: "Email",
    password: "Password",
    buttonMsg: "Sign In",
    altMsg: "Don't have an account?",
    altLink: "Register here",
  },
  SignUp: {
    title: "Create an account",
    name: "Name",
    email: "Email",
    phoneNumber: "Phone Number",
    password: "Password",
    role: "Role",
    buttonMsg: "Sign Up",
    altMsg: "Already have an account?",
    altLink: "Login here",
  },
};

const Logo = "Logo";

const UserRoles: UserRoles = {
  User: "user",
  Organizer: "organizer",
};

export { FormFields, Logo, UserRoles, Query_Endpoint };
