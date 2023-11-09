import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Foods = () => {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allfood')
            .then((response) => response.json())
            .then((data) => setJsonData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto my-5">
            {jsonData.map((data, index) => (
                <div key={index} className="card w-96 bg-base-100 shadow-xl rounded-2xl">
                    <figure className="h-60 overflow-hidden rounded-t-2xl">
                        <img
                            src={data.food_image}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="card-body px-5 text-center gap-5 py-15 bg-lime-100 rounded-t-2xl shadow-2xl shadow-cyan-800">
                        <div className="flex">
                            <div>
                                <h2 className="font-bold text-pink-700 font-serif">{data.food_name}</h2>
                                <p className="font-sans font-bold text-black">Category : {data.food_category}</p>
                                <p className="font-mono text-lime-700">Quantity : {data.food_quantity}</p>
                                <h2 className="font-mono font-bold">Price : $ {data.price}</h2>
                                <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-center">
                                    <Link to={`/singlefood`}>
                                    <button className="btn rounded-b-3xl bg-red-600 text-white font-mono px-24">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Foods;
