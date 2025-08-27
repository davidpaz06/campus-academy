import Landing from "@/pages/public/Landing";
import AuthForm from "@/pages/public/AuthForm";

export const publicRoutes = [
  { path: "/", element: Landing },
  { path: "/signin", element: AuthForm, props: { mode: "signin" as const } },
  {
    path: "/signup",
    element: AuthForm,
    props: { mode: "signup" as const },
  },
];
