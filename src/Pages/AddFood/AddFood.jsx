import { Helmet } from "react-helmet";
import Swal from "sweetalert2";




const AddFood = () => {

    const handleAddFood = event => {
        event.preventDefault();
        
        const form = event.target;
        const name = form.name.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const origin = form.origin.value;
        const price = form.price.value;
        const description = form.description.value;
        const image = form.image.value;
        const newAllFood = {name,  category, price, quantity, origin, description, image};
        console.log(newAllFood);

        //send data to the server
        fetch('https://restaurant-management-server-three.vercel.app/myAddedFood', {
         method: 'POST',
         headers:  {
            'content-type':'application/json'
         },
         body: JSON.stringify(newAllFood)
        })
         .then(res =>res.json())
         .then(data => {
            console.log(data);
            if(data.insertedId){
               Swal.fire({
                  title: 'Success!',
                  text: 'New Food Added Efficiently',
                  icon: 'success',
                  confirmButtonText: 'Great'
                })
            }

         })

    }

    return (

        <div className="bg-black">
             
             {/* <div className="flex justify-center items-center text-center"> */}
             <div className="items-center justify-center">
            <video autoPlay muted loop className="video w-full h-1/3 ">
            <source src="/add.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
             {/* <img className="justify-center items-center " src="https://i.ibb.co/3vdvt4k/1.png" alt="" width={1250}/> */}
             </div>

        <form className="p-40 rounded-t-full rounded-b-full bg-cyan-700" onSubmit={handleAddFood}>
       <h1 className='text-4xl text-center font-extrabold font-mono mb-10 p-3 text-white'>Add Your Food<span className='text-yellow-400 font-semibold font-serif'> : Globally Delicious.</span></h1>
        <div className="md:flex gap-2 justify-center mb-5">
        <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Food Name</span>
                    </label>
                    <label className="input-group">
             <input type="text" name="name" placeholder="Name of Food" className="input input-bordered w-full" />
          </label>
       </div>


      <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Category</span>
                    </label>
                    <label className="input-group">
             <input type="category" name="category" placeholder="Mention the Category Name" className="input input-bordered w-full" />
          </label>
       </div> 
        </div>


          
        <div className="md:flex gap-2 justify-center mb-5">
        <div className="form-control md:w-full">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Short Description</span>
                    </label>
                    <label className="input-group">
             <input type="description" name="description" placeholder="Description of Food"  className="input input-bordered w-full" />
          </label>
       </div>
        </div>
       

        <div className="md:flex gap-2 justify-center mb-5">
        <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Origin of Food</span>
                    </label>
                    <label className="input-group">
             <input type="origin" name="origin" placeholder="Origin of Food" className="input input-bordered w-full" />
          </label>
       </div>


       <div className="form-control md:w-1/2 ml-4">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Price</span>
                    </label>
                    <label className="input-group">
             <input type="price" name="price" placeholder="Price" className="input input-bordered w-full" />
          </label>
       </div>



       <div className="form-control md:w-1/2">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Quantity</span>
                    </label>
                    <label className="input-group">
             <input type="quantity" name="quantity" placeholder="Quantity of Food" className="input input-bordered w-full" />
          </label>
       </div>
        </div>
     
        
  
      
        <div className="md:flex gap-2 justify-center mb-5">
        <div className="form-control md:w-full">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Image</span>
                    </label>
                    <label className="input-group">
             <input type="photo" name="image" placeholder="Paste Image URL" className="input input-bordered w-full" />
          </label>
       </div>
      </div>
      <input type="submit" value="Add & Pick Your Delicious Food" className="btn btn-block px-3 bg-green-800 text-white text-xl mt-5 font-mono rounded-lg" />
      </form> 
      <Helmet>
          <title>Abrar's Dine | Add Food</title>
        </Helmet>
      </div>
    );
};

export default AddFood;