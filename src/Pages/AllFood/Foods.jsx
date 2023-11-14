import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Foods = () => {
    const [data, setdata] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dish')
            .then((res) => res.json())
            .then((data) => setdata(data))
            .catch((error) => console.error(error));
    }, []);
    console.log(data)
    const oneCart = {
      image: data.image,
      name: data.name,
      category: data.category,
      chef: data.chef,
      price: data.price,
      quantity: data.quantity,
      origin: data.origin,
      description: data.description,
    };
    const myOrderHandle = () => {
        fetch("http://localhost:5000/myOrder", {
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
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto bg-slate-900">
            {data.map((data, index) => (
                <div key={index} className="card w-96 bg-base-200 shadow-xl ml-5 mb-8 mt-2 rounded-2xl">
                    <figure className="h-60 overflow-hidden rounded-e-3xl rounded-s-3xl">
                        <img
                            src={data.image}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="card-body rounded-s-3xl shadow-red-700 px-2 text-center py-4 bg-cyan-300 rounded-t-2xl shadow-inner">
                        <div className="flex">
                            <div>
                            <h2 className="card-title text-orange-950 text-start font-serif">{data.name}</h2>
            <p className="font-mono font-bold text-pink-700 text-start">{data.category}</p>
            <p className="font-mono text-start">Made By: {data.chef}</p>
            <p className="font-serif text-start">Quantity : {data.quantity}</p>
            <h2 className="font-mono font-medium text-start">Price: {data.price}</h2>
            <p className="font-sans text-yellow-950 font-semibold text-start">Brief: {data.description}</p> 
                                <div className="btn-group btn-group-vertical mt-1 ml-5 mr-5 px-24 space-y-3 justify-center">
                                <Link to="/myOrder"><button
              onClick={myOrderHandle}
              className="btn bg-pink-600 shadow-amber-600 text-white font-mono border-black border-spacing-8 px-14"
            >
              Order
            </button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Foods;
