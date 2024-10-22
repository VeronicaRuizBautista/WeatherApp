import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Example from "./pages/example";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Example/>,
        
    }
]);

export const App = () => {
  return (
      <RouterProvider router={router} />
  );
};