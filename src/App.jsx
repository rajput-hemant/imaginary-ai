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
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          return fetch(`${import.meta.env.VITE_IMAGINARY_API_KEY}/api/v1/post`);
        },
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
