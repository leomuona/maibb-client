import { useQueryClient } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "./authProvider";
import { createRoutes } from "./createRoutes";

function App(): JSX.Element {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const router = createBrowserRouter(createRoutes(auth, queryClient));

  return <RouterProvider router={router} />;
}

export default App;
