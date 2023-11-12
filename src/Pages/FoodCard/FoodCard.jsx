import { Link } from "react-router-dom";


const FoodCard = ({ service }) => {
    const {_id, image, name, category, price } = service;

    return (
        <div className="card w-full glass bg-orange-100 shadow-2xl shadow-lime-500 rounded-3xl">
            <figure><img src={image} alt="food" /></figure>
            <div className="card-body rounded-e-full bg-yellow-100 px-10 py-5 rounded-s-3xl shadow-inner shadow-lime-700">
                <h2 className="card-title font-sans font-bold text-blue-600">{name}</h2>
                <h3 className="px-8 font-semibold text-slate-400" ><i className="text-red-600 text-xl font-mono">{category} Food</i></h3>
                <p className="px-8 font-semibold text-black font-sans">Price: <span className="text-violet-800">$ {price}</span></p>
                <div className="card-actions justify-end">
                <Link to={`/details/${_id}`}> <button className="btn bg-green-600 text-white px-14">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
