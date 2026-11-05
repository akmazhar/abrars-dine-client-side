import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";



const MyAddedFood = () => {
  const [dataApi, setDataApi] = useState([]);


  useEffect(() => {
    fetch('https://restaurant-management-server-three.vercel.app/myAddedFood')
        .then((res) => res.json())
        .then((dataApi) => setDataApi(dataApi))
        .catch((error) => console.error(error));
}, []);

  console.log(dataApi)

 


  return (

    <div>

     <img className="shadow-2xl" src="https://i.ibb.co/r6KQ26k/pol.png" alt="" />

      {
      dataApi.map(item => <div key={item._id}> 
  



<div className="card card-side mb-2 mt-5 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <figure className="ml-3 mt-2">
        <img className="rounded-e-3xl rounded-s-3xl mr-4" src={item.image} alt="image" />
      </figure>
      <div className="card-body  bg-blue-200 px-10 py-5 ml-3 mt-2 rounded-s-3xl shadow-inner shadow-lime-700">
        <div className="grid">
          
           
              <h2 className="font-bold text-pink-700 font-serif">{item.name}</h2>
            <p className="font-sans font-bold text-cyan-900">Category : {item.category}</p>
            <p className="font-mono text-blue-700">Origin : {item.origin}</p>
            <p className="font-sans text-white text-center bg-lime-950">Price : $ {item.price}</p>
            <p className="font-serif text-black">Origin : {item.description}</p>
            <h2 className="font-mono text-red-600 font-bold">Quantity : {item.quantity}</h2>
          </div>
       <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">
            
            <Link to={`/UpdateFood`}><button className="btn bg-cyan-600 ml-28 mr-28 px-16 shadow-black text-white font-mono border-yellow-700 border-spacing-5">Update</button></Link>
               </div>
             </div>
             </div>
      </div>)
      }
         <div>
         <Helmet>
          <title>Abrar's Dine | My Added Food</title>
        </Helmet>
         </div>
    </div>
  );
};

export default MyAddedFood;
