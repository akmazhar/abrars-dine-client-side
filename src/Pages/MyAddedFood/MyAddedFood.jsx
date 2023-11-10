import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import AddFood from "../AddFood/AddFood";






const MyAddedFood = () => {
  const loadedData = useLoaderData()
  const [addFoodItems, setAddFoodItems] = useState(loadedData);
  console.log(addFoodItems)

 

  return (
    <div>
     {
      addFoodItems.map(item => <AddFood key={item._id} addFoodItems={addFoodItems} setAddFoodItems={setAddFoodItems} item={item}></AddFood>)
     }
    </div>
  );
};

export default MyAddedFood;