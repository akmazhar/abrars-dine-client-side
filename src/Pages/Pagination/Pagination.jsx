import { useEffect } from "react";
import { useState } from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import Foods from "../AllFood/Foods";





// const AllFood = () => {
const Pagination = () => {    
  const [allFood, setAllFood] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const location = useLocation();
  const apiItem = useLoaderData();

  useEffect(() => {
    setAllFood(apiItem);
  }, [apiItem]);

  const handleSearch = (e) => {
    e.preventDefault();
    const inputValue = e.target.text.value;
    const dataResult = apiItem.filter((data) => data.food_name === inputValue);
    setAllFood(dataResult);
  };

  // Logic for displaying current cards
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allFood.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allFood.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {/* Pagination buttons */}
      <div className="join grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <button
          className="join-item btn btn-outline"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pageNumbers.length}
        >
          Next
        </button>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by Food Name..."
          name="text"
          className="input input-bordered rounded-tr-none rounded-br-none md:w-[470px] p-3 mt-60 rounded-t-xl px-7 from-neutral-500"
        />
        <input
          className="btn bg-[rgb(241,59,59)] mt-60 p-3 text-white rounded-tl-none rounded-bl-none rounded-xl px-7 font-medium"
          type="submit"
          value="Search"
        />
      </form>

      {/* Displaying current cards */}
      <div className="text-center mt-4 bg-lime-100">
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 aos-init aos-animate mx-auto w-full p-5 gap-4 lg:-top-20 shadow-3xl shadow-lime-400 bg-lime-100"
        >
          {currentItems.map((item) => (
            <Foods key={item._id} allfood={item} />
          ))}
        </div>
        <div className="text-center">
          <Link to={location.pathname}>
            <button className="btn btn-outline text-red bg-red-600 text-white mr-5 mb-2 mt-2 px-16 rounded-e-full rounded-s-full">
              See All
            </button>
          </Link>
        </div>
      </div>
    </div>
//   );
// };

// export default AllFood;

    );
};

export default Pagination;