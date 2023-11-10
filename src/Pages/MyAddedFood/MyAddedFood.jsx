import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import AddFood from "../AddFood/AddFood";

const MyAddedFood = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/myAddedFood`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addFoodHandle = (item) => {
    fetch("http://localhost:5000/myAddedFood", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(item),
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
      {data.map((item) => (
        <div key={item._id}>
          <AddFood item={item}></AddFood>
          <button onClick={() => addFoodHandle(item)} className="btn btn-block mt-2">
            Add Food
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyAddedFood;
