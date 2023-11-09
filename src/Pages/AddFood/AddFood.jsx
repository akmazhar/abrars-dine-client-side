import Swal from "sweetalert2";

const AddFood = () => {

    const handleAddFood = event => {
        event.preventDefault();
        
        const form = event.target;
        const food_name = form.food_name.value;
        const food_category = form.food_category.value;
        const food_quantity = form.food_quantity.value;
        const food_origin = form.food_origin.value;
        const price = form.price.value;
        const food_description = form.food_description.value;
        const food_image = form.food_image.value;
        
        const newFood = {food_name, food_category, price, food_quantity, food_origin, food_description, food_image};
        console.log(newFood);

        //send data to the server
        fetch('http://localhost:5000/allfood', {
         method: 'POST',
         headers:  {
            'content-type':'application/json'
         },
         body: JSON.stringify(newFood)
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

        <div className="bg-[#0e0f0e]">

             <div className="flex justify-center items-center text-center">
             {/* <img className="justify-center items-center" src="/car.png" alt="" width={200}/> */}
             <img className="justify-center items-center " src="https://i.ibb.co/3vdvt4k/1.png" alt="" width={1250}/>
             </div>

        <form className="p-40 rounded-t-full rounded-b-full bg-lime-100" onSubmit={handleAddFood}>
       <h1 className='text-4xl text-center font-extrabold font-mono mb-10 p-3 text-blue-700'>Add Your Food<span className='text-red-500 font-semibold font-serif'> : Globally Delicious.</span></h1>
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
             <input type="category" name="type" placeholder="Mention the Category Name" className="input input-bordered w-full" />
          </label>
       </div> 
        </div>


          
        <div className="md:flex gap-2 justify-center mb-5">
        <div className="form-control md:w-full">
            <label className="label">
              <span className="label-text font-semibold font-serif text-lg">Short Description</span>
                    </label>
                    <label className="input-group">
             <input type="shortDescription" name="shortDescription" placeholder="Description of Food"  className="input input-bordered w-full" />
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
      <input type="submit" value="Add & Pick Your Delicious Food" className="btn btn-block bg-[#652525] text-white text-xl p-3 mt-5 font-mono rounded-lg" />
      </form> 
      </div>
    );
};

export default AddFood;