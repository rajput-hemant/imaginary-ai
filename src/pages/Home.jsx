import React, { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../copmonents";
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};
// ehats it

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setsearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://server-imaginary.vercel.app/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const result = await response.json();

          setAllPosts(result.data.slice(-14).reverse());
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  // debouncing seekh rha
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);

    setsearchText(e.target.value);
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto bg-[#14141r] p-5 rounded-lg shadow-md mt-5">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-800">
          The Community Showcase
        </h1>
        <p className="mt-2 text-gray-600 text-lg max-w-xl">
          Browse Through a Collection of imaginative and visually stunning
          images generated by Imaginary
        </p>
      </div>
      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search posts"
          value={searchText}
          handleChange={handleSearchChange}
          className="mb-5"
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader className="loader" />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="text-xl font-medium text-gray-600 mb-3">
                Showing result for{" "}
                <span className="text-gray-800">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No search results found"
                  className="card"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No posts found"
                  className="card"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
