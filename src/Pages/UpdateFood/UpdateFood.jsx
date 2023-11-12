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
       <div className="bg-[#e2c9da] p-40">
             
       <div className="flex justify-center items-center text-center mb-5">
       {/* <h1 className='text-3xl text-center font-extrabold font-mono p-3 ml-40 text-green-600'>Update Your Car<span className='text-orange-950 font-semibold font-serif'> : Smartly</span></h1> */}
       {/* <img className="justify-center items-center" src="/c.png" alt="" width={80}/> */}
       <img className="justify-center items-center" src="https://i.ibb.co/S6bw72J/1.jpg" alt="" width={1250}/>
       </div>
     
       <form onSubmit={handleUpdateFood}> 

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
   
       
      <input origin="submit" value="Update Your Test" className="btn btn-block bg-[#383edf] text-white text-xl p-3 mt-5 font-mono rounded-lg" />
       </form>
       
       </div>
       );
       };

export default UpdateFood;
