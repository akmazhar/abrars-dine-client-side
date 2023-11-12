import { useEffect } from "react";
import { useState } from "react";
import FoodCard from "../FoodCard/FoodCard";
import TwoParts from "../TwoParts/TwoParts";
import { Link } from "react-router-dom";


const Service = () => {
    const [service, setService] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/sixcard')
            .then(res => res.json())
            .then(data => setService(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);



    return (
        <div>
            <div className="text-center mt-4 bg-lime-100">
            <h3 className="font-bold text-4xl mb-1"> Choose Your <span className="text-red-600">Mouth-Watering</span> <span className="text-green-600">Delicious Food</span> </h3>
            <p className="font-mono text-2xl shadow-2xl">Top Rated Based Global Food Item</p>
            </div>
            <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 aos-init aos-animate mx-auto w-full p-5 gap-4 lg:-top-20 shadow-3xl shadow-lime-400 bg-lime-100">
           
                {service.map((item) => (
                    <FoodCard key={item._id} service={item} />
                ))}
            </div>
            <div className="text-center">
            <Link to={`/AllFood`}><button className="btn btn-outline text-red bg-red-600 text-white mr-5 mb-2 mt-2 px-16 rounded-e-full rounded-s-full">See All</button></Link>

            </div>
            <div className="items-center justify-center">
            <video autoPlay muted loop className="video w-full h-1/7 ">
            <source src="/Intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
            </div>
      <TwoParts></TwoParts>
        </div>
    );
};

export default Service;
