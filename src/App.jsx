import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import { Home, Createpost } from "./pages";
import { Loader } from "./copmonents";

const App = () => {
  // State to manage the modal visibility
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <BrowserRouter>
      <header className="flex justify-between items-center bg-[#7C9885] p-4 text-white">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-16 left-5 h-auto rounded-full object-contain bg-gray-500"
          />
        </Link>
        <div>
          <Link
            to="/create-post"
            className="font-medium bg-indigo-600 text-white px-4 py-2 rounded-md mr-4"
          >
            Create Image
          </Link>
          <button
            onClick={() => setModalOpen(true)}
            className="font-medium bg-indigo-600 text-white px-4 py-2 rounded-md "
          >
            Create Video
          </button>
        </div>
      </header>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#7C9885] p-8 rounded-md">
            <p className="text-lg font-medium mb-4">Coming Soon!</p>
            <p>This feature is currently under development.</p>
            <div>
              <Loader />
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <main className="p-4 bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<Createpost />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
// import { logo } from "./assets";
// import { Home, Createpost } from "./pages";
// const App = () => {
//   return (
//     <BrowserRouter>
//       <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
//         <Link to="/">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-28 rounded-full  h-16 object-contain "
//           ></img>
//         </Link>
//         <Link
//           to="/create-post"
//           className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
//         >
//           Create
//         </Link>
//       </header>
//       <header>
//         <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh- 73px)]"></main>
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route path="/create-post" element={<Createpost />}></Route>
//         </Routes>
//       </header>
//     </BrowserRouter>
//   );
// };

// export default App;
