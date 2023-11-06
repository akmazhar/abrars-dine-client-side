import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const UpdateFood = () => {
  const car = useLoaderData();
  const { _id, name, brandName, rating, price, type, image } = car;

  const handleUpdateProduct = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const type = form.type.value;
    const rating = form.rating.value;
    const price = form.price.value;
    const brandName = form.brandName.value;
    const image = form.image.value;

    const updatedCar = { name, brandName, rating, price, type, image };
    console.log(updatedCar);

    //send data to the server
    fetch(`https://abrars-automobile-server.vercel.app/product/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedCar)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Your Car Requirement is Updated',
            icon: 'success',
            confirmButtonText: 'Thank You!'
          });
        }
      });
  };

 
   return (
       <div className="bg-[#e2c9da] p-40">
             
       <div className="flex justify-center items-center text-center mb-5">
       {/* <h1 className='text-3xl text-center font-extrabold font-mono p-3 ml-40 text-green-600'>Update Your Car<span className='text-orange-950 font-semibold font-serif'> : Smartly</span></h1> */}
       {/* <img className="justify-center items-center" src="/c.png" alt="" width={80}/> */}
       <img className="justify-center items-center" src="https://i.ibb.co/S6bw72J/1.jpg" alt="" width={1250}/>
       </div>
     
       <form onSubmit={handleUpdateProduct}> 

       <div className="md:flex gap-2 justify-center mb-5">
       <div className="form-control md:w-1/2">
       <label className="label">
        <span className="label-text font-semibold font-serif text-lg">Name of Car</span>
              </label>
              <label className="input-group">
       <input type="text" name="name" defaultValue={name} placeholder="Car Name" className="input input-bordered w-full" />
       </label>
       </div>


       <div className="form-control md:w-1/2">
       <label className="label">
        <span className="label-text font-semibold font-serif text-lg">Brand Name</span>
              </label>
              <label className="input-group">
       <input type="text" name="brandName" defaultValue={brandName} placeholder="Mention the Brand Name" className="input input-bordered w-full" />
       </label>
       </div>
       
       <div className="form-control md:w-1/2 ml-4">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Type</span>
                   </label>
                   <label className="input-group">
            <input type="model" name="type" defaultValue={type} placeholder="Car Model Name" className="input input-bordered w-full" />
         </label>
      </div> 
       </div>

      
       <div className="md:flex gap-2 justify-center mb-5">
       <div className="form-control md:w-1/2">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Rating</span>
                   </label>
                   <label className="input-group">
            <input type="rating" name="rating" defaultValue={rating} placeholder="Put Your Rating, Please" className="input input-bordered w-full" />
         </label>
      </div>

      <div className="form-control md:w-1/2 ml-4">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Price</span>
                   </label>
                   <label className="input-group">
            <input type="price" name="price" defaultValue={price} placeholder="Price" className="input input-bordered w-full" />
         </label>
      </div>
       </div>
    
     
       <div className="md:flex gap-2 justify-center mb-5">
       <div className="form-control md:w-full">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Image</span>
                   </label>
                   <label className="input-group">
            <input type="photo" name="image" defaultValue={image} placeholder="Paste Image URL" className="input input-bordered w-full" />
         </label>
      </div>

       </div>
   
       
      <input type="submit" value="Update Your Car" className="btn btn-block bg-[#383edf] text-white text-xl p-3 mt-5 font-mono rounded-lg" />
       </form>
       
       </div>
       );
       };

export default UpdateFood;
