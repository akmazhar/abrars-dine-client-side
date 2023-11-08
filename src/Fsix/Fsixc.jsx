import React from 'react';    
import { useEffect } from "react";
import { useState } from "react";
import ServiceCard from "./ServiceCard";


const Fsixc = () => {
   
    const [eachcard, setEachcard] = useState([]);
    useEffect(() => {
    fetch('service.json')
    .then(res => res.json())
    .then(data => setEachcard(data))
    }, [])


    return (
        <div>
           <div className="text-center mt-4">
           <h3 className="font-bold  text-red-500">Service</h3>
           <h3 className="font-bold text-4xl mb-3">Our Service Area</h3>
           <p className="mb-3 font-serif text-lg">The majority have suffered alteration in some form, by injected humour, or randomised <br/>words which do not look even slightly believable. </p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
             {
                service.map(service => <ServiceCard key={service._id} service={service}
                    ></ServiceCard>)
             }
           </div>
          <div className="text-center">
          <a className="btn btn-outline text-red mr-5 mb-2 mt-2 ">More Service</a>
          </div>
        </div>
    );
};

export default Fsixc;

