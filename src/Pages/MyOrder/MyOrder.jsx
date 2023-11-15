import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const MyOrder = () => {
  const [dataApi, setDataApi] = useState([]);

  const purchaseBtn = (_id) => {
    Swal.fire({
      title: "Purchase!",
      text: "Go to Purchase Page.",
      imageUrl: "https://i.ibb.co/TP70RD3/Screenshot-2023-11-14-102912.png/600/300",
      imageWidth: 600,
      imageHeight: 300,
      imageAlt: "Custom image"
    });
  }
  const deleteBtn = (_id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, omit it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://restaurant-management-server-36vzbkkon-a-k-m-azhars-projects.vercel.app/myOrder/${_id}`)
          .then((res) => {
            // Assuming the response contains information about the deletion
            if (res.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your food dish has been deleted.',
                'success'
              );
              const remaining = prevData => prevData.filter(item => item._id !== _id);
              setDataApi(remaining)
              // Update state to remove the deleted item
              // setDataApi(prevData => prevData.filter(item => item._id !== id));
            } else {
              Swal.fire(
                'Error!',
                'Failed to delete the item.',
                'error'
              );
            }
          })
          .catch(error => console.error(error));
      }
    });
  };

  useEffect(() => {
    axios.get('https://restaurant-management-server-36vzbkkon-a-k-m-azhars-projects.vercel.app/myOrder')
      .then(res => {
        setDataApi(res.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
   
      <div>
  {/* <img src="https://i.ibb.co/r59YrSt/as.png" alt="" /> */}
  <img src="https://i.ibb.co/Jm5d0x6/Banner.png" alt="" />


      {
      dataApi.map(item => <div key={item._id}> 


    


       <div className="flex-1">
      <div className="card card-side mb-2 mt-5 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-blue-700">
      <figure className="ml-3 mt-2">
      <img className="rounded-e-3xl rounded-s-3xl mr-4" src={item.image} alt="image" />
      </figure>
      <div className="card-body  bg-[#f5f3f6] px-10 py-5 m-2 rounded-s-3xl shadow-inner shadow-red-700">
      <div className="grid">       
      <h2 className="card-title text-green-600 font-serif"> {item.name}</h2>
     <p className="font-sans text-[#120f2e]">Category : {item.category}</p>
     <p className="font-serif text-lg text-blue-600">Origin : {item.origin}</p>
     <h2 className="font-sans font-medium text-pink-600">Price: $ {item.price}</h2>
      </div>
      <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">    
      <div className="btn-group btn-group-vertical mt-10  space-y-2 justify-end">
      <button onClick={() => deleteBtn(item._id)} className="btn mr-92 shadow-green-600 bg-red-600 text-white font-mono text-lg border-blue-600 border-spacing-56 px-16">Delete</button>
      <Link to="/FoodPurchase"><button onClick={() => purchaseBtn(item._id)} className="btn mr-92 shadow-red-600 bg-green-600 text-white font-mono text-lg border-yellow-400 border-spacing-56 px-16">Purchase</button></Link>
      </div>
      </div>
      </div>
      </div>


      </div>
      </div>)
      }
<Helmet>
          <title>Abrar's Dine | My Order </title>
        </Helmet>
      </div>
      
  
  );
};

export default MyOrder;
