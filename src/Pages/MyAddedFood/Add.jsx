

const Add = ({setAddFoodItems, addFoodItems, item}) => {

    const {_id, food_name price, food_image, food_category} = item
     
    return (

        <div>
    <div className="card card-side bg-base-100 mt-20 ml-52 mr-40 shadow-2xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
    <figure className="ml-3"><img src={item.food_image} alt="image" /></figure>
    <div className="card-body px-15 py-10">
    <div className="grid">
 <div>
     <h2 className="card-title text-green-600 font-serif">Name: {item.food_name}</h2>
     <p className="font-mono font-bold text-black-700">Category:  {item.food_category}</p>
     <h2 className="font-mono font-medium text-pink-600">Price: {item.price}</h2>
     
 </div>

 <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-end">
<Link to={`/updateFood/${_id}`}>
  <button className="btn bg-cyan-600 mr-92 shadow-black text-white font-mono border-yellow-700 border-spacing-5">Update</button>
</Link>
  </div>
</div>

</div>
 </div>
    </div>
       
    
    );
};

export default Add;