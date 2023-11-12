import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MyOrder = () => {
  const [dataApi, setDataApi] = useState([]);

  const deleteBtn = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/myOrder/${id}`)
          .then((res) => {
            // Assuming the response contains information about the deletion
            if (res.data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              );
              // Update state to remove the deleted item
              setDataApi(prevData => prevData.filter(item => item._id !== id));
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
    axios.get('http://localhost:5000/myOrder')
      .then(res => {
        setDataApi(res.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
   
      <div>
      {
      dataApi.map(item => <div key={item._id}> <div className="card card-side mb-2 mt-5 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <figure className="ml-3 mt-2">
        <img className="rounded-e-3xl rounded-s-3xl mr-4" src={item.image} alt="image" />
      </figure>
      <div className="card-body  bg-blue-200 px-10 py-5 ml-3 mt-2 rounded-s-3xl shadow-inner shadow-lime-700">
        <div className="grid">
          
        <h2 className="card-title text-green-600 font-serif">Name: {item.name}</h2>
     <p className="font-mono font-bold text-black-700">Category : {item.category}</p>
     <p className="font-serif text-lg text-blue-600">Origin : {item.origin}</p>
     <h2 className="font-mono font-medium text-pink-600">Price: $ {item.price}</h2>
          </div>
       <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">
            
       <div className="btn-group btn-group-vertical mt-10  space-y-2 justify-end">
      <button onClick={() => deleteBtn(item._id)} className="btn  mr-92 shadow-green-600 bg-red-600 text-white font-mono text-lg border-blue-600 border-spacing-56 px-16">Delete</button>
    </div>
               </div>
             </div>
             </div>
      </div>)
      }
    </div>
  );
};

export default MyOrder;
