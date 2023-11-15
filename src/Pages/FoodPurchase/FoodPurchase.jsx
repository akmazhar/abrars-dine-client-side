import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { DatePicker } from "keep-react";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const FoodPurchase = () => {
  const food = useLoaderData();
  const { _id, name, quantity, price } = food;
  const { user } = useContext(AuthContext);
  // Assuming you have the user's name and email available
  // const [buyerName, setBuyerName] = useState("User Name");
  // const [buyerEmail, setBuyerEmail] = useState("user@example.com");

  const handleFoodPurchase = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const price = form.price.value;
    const quantity = form.quantity.value;

    const foodPurchase = { name, price, quantity };
    console.log(foodPurchase);

    try {
      const response = await fetch(`https://restaurant-management-server-three.vercel.app/foodPurchase/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(foodPurchase),
      });

      const data = await response.json();

      console.log(data);

      if (data.modifiedCount > 0) {
        Swal.fire({
          title: 'Success!',
          text: 'Your dish is Purchased',
          icon: 'success',
          confirmButtonText: 'Thank You!',
        });
      } else {
        throw new Error('Purchase failed');
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        title: 'Error!',
        text: 'Your Booking and Purchase is not completed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const [rangeDate, setRangeDate] = useState(null);

  return (
    <div className="bg-[#bceee6]">
      <div className="items-center justify-center">
        <form
          className="ml-32 px-28 py-4 items-center w-4/5 justify-center bg-slate-900 rounded-e-3xl rounded-s-3xl"
          onSubmit={handleFoodPurchase}
        >
          <h1 className="text-4xl text-center font-extrabold font-mono mb-10 p-3 text-green-200">
            Purchase Your <span className="text-yellow-200 font-semibold font-serif">Food Dish</span>
          </h1>

          <div className="md:flex gap-2 justify-center mb-5">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold text-white font-serif text-lg">Name of Food</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  defaultValue={name}
                  placeholder="Food Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>

            <div className="form-control md:w-1/2 ml-4">
              <label className="label">
                <span className="label-text text-white font-semibold font-serif text-lg">Price</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="price"
                  defaultValue={price}
                  placeholder="Your Required Price"
                  className="input input-bordered w-full"
                />
              </label>
             </div>
             </div>



              <div className="md:flex gap-5 justify-start mb-5">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-semibold text-white font-serif text-lg">Quantity</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="quantity"
                  defaultValue={quantity}
                  placeholder="Quantity of Food "
                  className="input input-bordered w-full"
                />
              </label>
            </div>

           
            <div className="justify-start">
              <h1 className="label-text mt-4 text-yellow-500 font-semibold font-serif text-lg">Buying Date</h1>
              <DatePicker rangeDate={setRangeDate}>
                <DatePicker.Range />
              </DatePicker>
            </div>
          </div>

          
          <div className="md:flex mb-1 justify-start">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text text-black font-sans font-medium text-yellow-300 px-2 text-2xl"><span className="text-white">User Email : <br/></span> {user?.email} </span>
              </label>
            </div>



            </div>
            <div className="md:flex mb-5">
            <div className="form-control md:w-1/2">
              <label className="label">
              <span className="label-text text-black font-sans font-medium text-yellow-300 px-1 text-2xl"><span className="text-white">User Name : <br/></span> {user?.displayName} </span>
              </label>
            </div>
            </div>
         
         
         
         
         
          <input
            type="submit"
            value="Purchase Your Dish"
            className="btn btn-block bg-green-700 border-white text-white text-xl px-12 font-mono rounded-lg"
          />
        </form>
      </div>
      <Helmet>
          <title>Abrar's Dine | Food Purchase </title>
        </Helmet>
    </div>
  );
};

export default FoodPurchase;
