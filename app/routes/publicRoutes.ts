import Landing from "@/pages/Landing";
import AuthForm from "@/pages/AuthForm";

export const publicRoutes = [
  { path: "/", element: Landing },
  { path: "/signin", element: AuthForm, props: { mode: "signin" as const } },
  {
    path: "/signup",
    element: AuthForm,
    props: { mode: "signup" as const },
  },
];
