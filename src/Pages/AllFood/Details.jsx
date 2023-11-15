import { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Details = () => {
  const { id } = useParams();
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch(`https://restaurant-management-server-36vzbkkon-a-k-m-azhars-projects.vercel.app/dish/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
  }, [id]);
 console.log(jsonData)
  const oneCart = {
    image: jsonData.image,
    name: jsonData.name,
    category: jsonData.category,
    chef: jsonData.chef,
    price: jsonData.price,
    quantity: jsonData.quantity,
    origin: jsonData.origin,
    description: jsonData.description,
  };

  const myOrderHandle = () => {
    fetch("https://restaurant-management-server-36vzbkkon-a-k-m-azhars-projects.vercel.app/myOrder", {
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
            text: "Your Appetizing is selected",
            icon: "success",
            confirmButtonText: "Thank You!",
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="card card-side mb-2 mt-20 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <figure className="ml-3">
        <img className="rounded-e-3xl rounded-s-3xl mr-4" src={jsonData.image} alt="image" />
      </figure>
      <div className="card-body  bg-yellow-200 px-10 py-5 rounded-s-3xl shadow-inner shadow-lime-700">
        <div className="grid">
          <div>
              <h2 className="font-bold text-pink-700 font-serif">{jsonData.name}</h2>
            <p className="font-sans font-bold text-cyan-900">Category : {jsonData.category}</p>
            <p className="font-mono text-blue-700">Origin : {jsonData.origin}</p>
            <p className="font-sans text-white text-center bg-lime-950">Made By : {jsonData.chef}</p>
            <p className="font-serif text-black">Origin : {jsonData.description}</p>
            <h2 className="font-mono text-red-600 font-bold">Price : $ {jsonData.price}</h2>
          </div>
          <div className="btn-group btn-group-vertical mt-10  space-y-2 justify-end">
          <Link to="/myOrder"><button
              onClick={myOrderHandle} 
              className="btn bg-green-800 mr-92 shadow-amber-600 text-white font-mono border-red-600 border-spacing-8 px-10"
            >
              Order
            </button></Link>
          </div>
        </div>
      </div>
      <Helmet>
          <title>Abrar's Dine | Single Food Details </title>
        </Helmet>
    </div>
  );
};

export default Details;
