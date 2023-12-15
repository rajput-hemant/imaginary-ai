import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { RootLayout } from "./components/layouts/root-layout";
import { NotFound } from "./components/not-found";
import HomePage from "./routes/home";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: (
      <div className="">
        <h1>Something went wrong</h1>
      </div>
    ),

    children: [
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
