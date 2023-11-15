import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [data, setData] = useState([]);
  const { count } = useLoaderData();
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  useEffect(() => {
    fetch(`https://restaurant-management-server-three.vercel.app/count?_page=${currentPage}&_limit=${itemsPerPage}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [currentPage, itemsPerPage]);
  

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
     <div className="pagination">
        <p>current page: {currentPage}</p>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={currentPage === page + 1 ? "selected" : ""}
            onClick={() => setCurrentPage(page + 1)}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === numberOfPages}>
          Next
        </button>
        <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div> 

    </div> 
   

  );
};

export default Pagination;
