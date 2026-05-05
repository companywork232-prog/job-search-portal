import { Route as rootRoute } from "@/routes/__root";
import { Route as dashboardRoute } from "@/routes/dashboard";
import { Route as homeRoute } from "@/routes/index";
import { Route as jobsRoute } from "@/routes/jobs";
import { Route as jobDetailRoute } from "@/routes/jobs.$jobId";
import { Route as loginRoute } from "@/routes/login";
import { Route as profileRoute } from "@/routes/profile";
import { Route as registerRoute } from "@/routes/register";
import { RouterProvider, createRouter } from "@tanstack/react-router";

const routeTree = rootRoute.addChildren([
  homeRoute,
  jobsRoute,
  jobDetailRoute,
  dashboardRoute,
  profileRoute,
  loginRoute,
  registerRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
