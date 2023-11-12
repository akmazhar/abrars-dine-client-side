import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



const MyAddedFood = () => {
  const [dataApi, setDataApi] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/myAdded')
    .then(res => {
      setDataApi(res.data);
    })
    .catch(error => console.error(error))
  }, []);
 
  console.log(dataApi)




  return (

    <div>
      {
      dataApi.map(item => <div key={item._id}> 
  



<div className="card card-side mb-2 mt-20 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <figure className="ml-3">
        <img className="rounded-e-3xl rounded-s-3xl mr-4" src={item.image} alt="image" />
      </figure>
      <div className="card-body  bg-yellow-200 px-10 py-5 rounded-s-3xl shadow-inner shadow-lime-700">
        <div className="grid">
          
           
              <h2 className="font-bold text-pink-700 font-serif">{item.name}</h2>
            <p className="font-sans font-bold text-cyan-900">Category : {item.category}</p>
            <p className="font-mono text-blue-700">Origin : {item.origin}</p>
            <p className="font-sans text-white text-center bg-lime-950">Price : $ {item.price}</p>
            <p className="font-serif text-black">Origin : {item.description}</p>
            <h2 className="font-mono text-red-600 font-bold">Quantity : {item.quantity}</h2>
          </div>
       <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">
            
            <Link to={`/updateFood/${_id}`}><button className="btn bg-cyan-600 mr-92 shadow-black text-white font-mono border-yellow-700 border-spacing-5">Update</button></Link>
               </div>
             </div>
             </div>
      </div>)
      }
    </div>
  );
};

export default MyAddedFood;
