import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";

import { RootLayout } from "./components/layouts/root-layout";
import { NotFound } from "./components/not-found";
import { Createpost, Home } from "./routes";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <main className="p-4 bg-gray-100 min-h-screen">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/create-post" element={<Createpost />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   );
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/create-post" element={<Createpost />} />
//         </Routes>
//       </main>
//     </BrowserRouter>
//   );
// };

// export default App;

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
        element: <Home />,
      },

      {
        path: "/create-post",
        element: <Createpost />,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
