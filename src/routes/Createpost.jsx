import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { preview } from "../assets";
import { FormField, Loader } from "../copmonents";
import { getRandomPrompts } from "../lib/utils";

const Createpost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setgeneratingImg(true);
        const response = await fetch(
          "https://server-imaginary.vercel.app/api/v1/imaginary",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );
        const data = await response.json();
        const imgUrl = data.photo[0];
        console.log(data.photo[0]);
        setform({ ...form, photo: data.photo[0] });
      } catch (error) {
        alert(error);
      } finally {
        setgeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const [generatingImg, setgeneratingImg] = useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (form.prompt && form.photo) {
      setloading(true);
      try {
        const response = await fetch(
          "https://server-imaginary.vercel.app/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        await response.json();
        navigate("/");
      } catch (error) {
        console.log(error);
        alert(error);
      } finally {
        setloading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image first");
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = (e) => {
    const randomPrompt = getRandomPrompts(form.prompt);
    setform({ ...form, prompt: randomPrompt });
  };

  return (
    // <section className="max-w-7xl mx-auto">
    //   <div>
    //     <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
    //     <p className="mt-2 text-[#666e75] text-[16px] max-w-500px">
    //       Cretae imaginative and visually stunning images through Imaginary and
    //       share them with Community
    //     </p>
    //   </div>
    //   <form className="mt-16 max-w-3xl " onSubmit={handleSubmit}>
    //     <div className="flex flex-col gap-5">
    //       <FormField
    //         lable="Your Name"
    //         type="text"
    //         name="name"
    //         placeholder="jeet"
    //         value={form.name}
    //         handleChange={handleChange}
    //       />
    //       <FormField
    //         label="Promt"
    //         type="text"
    //         name="prompt"
    //         placeholder="an armchair in the shape of an avocado"
    //         value={form.prompt}
    //         handleChange={handleChange}
    //         isSurpriseMe
    //         handleSurpriseMe={handleSurpriseMe}
    //       />
    //       <div className="relative bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 w-64 p-3 h-64 flex justify-center items-center">
    //         {form.photo ? (
    //           <img
    //             src={form.photo}
    //             alt={form.prompt}
    //             className="w-full h-full object-contain"
    //           />
    //         ) : (
    //           <img
    //             src={preview}
    //             alt="preview"
    //             className="w-9/12 h-9/12 object-contain opacity-40"
    //           />
    //         )}
    //       </div>
    //       {generatingImg && (
    //         <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,,0,0.5)] rounded-lg">
    //           <Loader />
    //         </div>
    //       )}
    //     </div>
    //     <div className="mt-5 flex gap-5">
    //       {" "}
    //       <button
    //         type="button"
    //         onClick={generateImage}
    //         className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    //       >
    //         {generatingImg ? "Generating" : "Generate "}
    //       </button>
    //     </div>
    //     <div className="mt-10">
    //       <p className="mt-2 text-[#666e75] text-14px ">
    //         Once you have created the image you want , you can also share it
    //         with others in the Community
    //       </p>
    //       <button
    //         type="submit"
    //         className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    //       >
    //         {loading ? "Sharing..." : "Share with the Community"}
    //       </button>
    //     </div>
    //   </form>
    // </section>
    <section className="max-w-7xl mx-auto p-8 bg-white shadow-xl rounded-xl">
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-gray-900">Create</h1>
        <p className="mt-4 text-xl text-gray-600">
          Create imaginative and visually stunning images through Imaginary and
          share them with the Community.
        </p>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
          <div className="space-y-6">
            <FormField
              label="Your Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={form.name}
              handleChange={handleChange}
              className="w-full border-2 border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <FormField
              label="Prompt"
              type="text"
              name="prompt"
              placeholder="Describe your image"
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
              className="w-full border-2 border-gray-300 p-4 rounded-lg focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <div className="aspect-w-1 aspect-h-1">
              <div className="border-4 border-gray-300 rounded-lg overflow-hidden">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt={form.prompt}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex justify-center items-center bg-gray-100 h-full">
                    <img
                      src={preview}
                      alt="preview"
                      className="w-1/2 opacity-40"
                    />
                  </div>
                )}
              </div>
            </div>
            {generatingImg && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={generateImage}
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
          <p className="text-gray-600">
            Once you have created the image you want, you can also share it with
            others in the Community.
          </p>
          <button
            type="submit"
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>
        </div>
      </form>
    </section>
  );
};
export default Createpost;
