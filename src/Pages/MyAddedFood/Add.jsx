import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Add = () => {
  const { id } = useParams();
  console.log(id);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/allfood/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })

      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const { food_image, food_name, food_category, price } = data; // Destructuring properties

  const addFoodHandle = () => {
    console.log(data);

    const oneCart = {
      food_image,
      food_name,
      price,
      food_category,
    };

    fetch("http://localhost:5000/myAddedFood", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(oneCart),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your Food is selected",
            icon: "success",
            confirmButtonText: "Thank You!",
          });
        }
      });
  };

  return (
    <div>
      <div className="card card-side bg-base-100 mt-20 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <figure className="ml-3">
          <img src={food_image} alt="image" />
        </figure>
        <div className="card-body px-15 py-10">
          <div className="grid">
            <div>
              <h2 className="card-title text-green-600 font-serif">Name: {food_name}</h2>
              <p className="font-mono font-bold text-black-700">Category: {food_category}</p>
              <h2 className="font-mono font-medium text-pink-600">Price: {price}</h2>
            </div>
            <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">
              <button onClick={addFoodHandle} className="btn bg-cyan-600 mr-92 shadow-black text-white font-mono border-yellow-700 border-spacing-5">
                Add Food
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
