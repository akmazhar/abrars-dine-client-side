import Swal from "sweetalert2";

const AddProduct = () => {

    const AddFood handleAddFood = event => {
        event.preventDefault();
        
        const form = event.target;
        const name = form.name.value;
        const category = form.category.value;
        const quantity = form.quantity.value;
        const origin = form.origin.value;
        const price = form.price.value;
        const shortDescription = form.shortDescription.value;
        const image = form.image.value;
        
        const newFood = {name, category, price, quantity, origin, shortDescription, image};
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

        <div className="bg-[#c2f4bc] p-40">
              
             <div className="flex justify-center items-center text-center mb-5 rounded-3xl">
             {/* <h1 className='text-3xl text-center font-extrabold font-mono p-3 ml-40 text-blue-600'>Pick Your Car<span className='text-orange-950 font-semibold font-serif'> : Quiet, Rapid, Classic Elegance.</span></h1> */}
             {/* <img className="justify-center items-center" src="/car.png" alt="" width={200}/> */}
             <img className="justify-center items-center" src="https://i.ibb.co/3vdvt4k/1.png" alt="" width={1250}/>
             </div>

        <form onSubmit={handleAddFood}>
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
             <input type="shortDescription" name="shortDescription" placeholder="Description of Car/Brand"  className="input input-bordered w-full" />
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