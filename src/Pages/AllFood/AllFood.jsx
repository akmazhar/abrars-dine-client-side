import { useEffect, useState } from "react";
import Foods from "./Foods";
import { useLoaderData } from "react-router-dom";
import { Helmet } from "react-helmet";






    const AllFood  = () => {
        const [data, setData] = useState([]);

        const apiItem = useLoaderData();
      
        const handleSearch = e =>{
          e.preventDefault();
          const inputValue = e.target.text.value;
          const dataResult = apiItem.filter(data => data.name === inputValue)
          setData(dataResult)
      }
      
        useEffect(()=>{
          setData(apiItem)
        },[apiItem])



    return (

        <div>
    <div className='max-w-screen-2xl mx-auto'>
    <div className="hero h-[600px] mb-1" style={{ backgroundImage: "linear-gradient(rgba(2,2,2,0.8), rgba(2,2,2,0.8)), url(https://i.ibb.co/KWCTq6Y/Food-Menu.png)", }}>
            <div className="hero-overlay bg-opacity-5"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="text-black flex data-center justify-center">
                   <div>
                   <h1 className="flex justify-center font-serif data-center text-green-500 text-7xl font-extrabold">All Foods Are Here </h1>
                    <form onSubmit={handleSearch} className="flex justify-center data-center">
                    <input type="text" placeholder="Please Search by Food Name..." name="text" className="input input-bordered rounded-tr-none rounded-br-none md:w-[470px] p-3 mt-32 rounded-t-xl px-7 from-neutral-500" />
                        <input className="btn bg-[rgb(241,59,59)] mt-32 p-3 text-white rounded-tl-none rounded-bl-none rounded-xl px-7 font-medium" type="submit" value="Search" />
                    </form>
                   </div>
                   <div>
         <Helmet>
          <title>Abrar's Dine | All Food Item</title>
        </Helmet>
         </div>
                </div>
            </div>
        </div>
      </div>

   


        <Foods></Foods>


        </div>     
       ); 
    };


   export default AllFood;