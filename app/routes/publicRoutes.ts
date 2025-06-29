import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export const publicRoutes = [
  { path: "/", element: Landing },
  { path: "/login", element: Login },
  { path: "/register", element: Register },
];
