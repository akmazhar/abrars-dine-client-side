import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";





const UpdateFood = () => {
  const dish = useLoaderData();
  const { name, category, origin, price, image } = dish;

  const handleUpdateFood = (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const origin = form.origin.value;
    const price = form.price.value;
    const category = form.category.value;
    const image = form.image.value;

    const updatedFood = { name, category, origin, price, image };
    console.log(updatedFood);

    // send data to the server
    fetch(`http://localhost:5000/updateFood/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' // Corrected typo in 'content-origin'
      },
      body: JSON.stringify(updatedFood)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: 'Success!',
            text: 'Your Food Requirement is Updated',
            icon: 'success',
            confirmButtonText: 'Thank You!'
          });
        }
      });
  };


 
   return (
       <div className="bg-[#1e7f8c]">
             
             <div className="items-center justify-center">
            <video autoPlay muted loop className="video w-full ">
            <source src="/2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
            </div>
     
       <form className="p-40 rounded-s-full rounded-b-full bg-yellow-200" onSubmit={handleUpdateFood}> 
       <h1 className='text-4xl text-center font-extrabold font-serif mb-10 p-3 text-green-700'>Update Your <span className='text-yellow-900 font-semibold font-serif'> : Food Dish</span></h1>

       <div className="md:flex gap-2 justify-center mb-5">
       <div className="form-control md:w-1/2">
       <label className="label">
        <span className="label-text font-semibold font-serif text-lg">Name of Food</span>
              </label>
              <label className="input-group">
       <input origin="text" name="name" defaultValue={name} placeholder="Food Name" className="input input-bordered w-full" />
       </label>
       </div>


       <div className="form-control md:w-1/2">
       <label className="label">
        <span className="label-text font-semibold font-serif text-lg">Food Category</span>
              </label>
              <label className="input-group">
       <input origin="text" name="category" defaultValue={category} placeholder="Mention the Category Name" className="input input-bordered w-full" />
       </label>
       </div>
       </div>

      
       <div className="md:flex gap-2 justify-center mb-5">
      <div className="form-control md:w-1/2 ml-4">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Price</span>
                   </label>
                   <label className="input-group">
            <input origin="price" name="price" defaultValue={price} placeholder="Your Required Price" className="input input-bordered w-full" />
         </label>
      </div>

      <div className="form-control md:w-1/2 ml-4">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Origin</span>
                   </label>
                   <label className="input-group">
            <input origin="origin" name="origin" defaultValue={origin} placeholder="Food Origin Name" className="input input-bordered w-full" />
         </label>
      </div> 
       </div>
    
     
       <div className="md:flex gap-2 justify-center mb-5">
       <div className="form-control md:w-full">
           <label className="label">
             <span className="label-text font-semibold font-serif text-lg">Image</span>
                   </label>
                   <label className="input-group">
            <input origin="photo" name="image" defaultValue={image} placeholder="Paste Image URL" className="input input-bordered w-full" />
         </label>
      </div>

       </div>
   
       
      <input type="submit" value="Update Your Test" className="btn btn-block rounded-s-full rounded-e-2xl bg-[#138b06] text-white text-xl p-3 mt-2 font-mono rounded-lg" />
       </form>
       
       </div>
       );
       };

export default UpdateFood;
