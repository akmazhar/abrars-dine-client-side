

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SingleFood = () => {
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/dish')
            .then((res) => res.json())
            .then((data) => setJsonData(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="card-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-xl mx-auto my-5">
            {jsonData.map((data, index) => (
                <div key={index} className="card w-96 bg-base-100 shadow-xl rounded-2xl">
                    <figure className="h-60 overflow-hidden rounded-t-2xl">
                        <img
                            src={data.image}
                            alt=""
                            className="object-cover w-full h-full"
                        />
                    </figure>
                    <div className="card-body px-5 text-start gap-5 py-15 rounded-t-2xl shadow-2xl shadow-cyan-800">
                        <div className="flex">
                            <div>
                                <h2 className="font-bold text-pink-700 font-serif">{data.name}</h2>
                                <p className="font-sans font-bold text-cyan-900">Category : {data.category}</p>
                                <p className="font-mono text-blue-500">Origin : {data.origin}</p>
                                <p className="font-sans text-white text-center bg-lime-950">Made By : {data.chef}</p>
                                <p className="font-serif text-black">Origin : {data.description}</p>
                                <h2 className="font-mono text-red-600 font-bold">Price : $ {data.price}</h2>
                                <div className="btn-group btn-group-vertical mt-1 ml-12 space-y-3 justify-center">
                                    <Link to={`/myOrder`}>
                                    <button className="btn rounded-e-3xl bg-green-600 text-white font-mono px-24">Order</button>
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

export default SingleFood;