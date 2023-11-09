import moment from "moment/moment";
import Service from "../Service/Service";
import Banner from "../Shared/Banner/Banner";



const Home = () => {
    return (
        <div>
   
         <Banner></Banner>
         <Service></Service>
         <div>
        <p className='text-3xl text-center p-5 font-serif text-white bg-black h-20 w-2/5 rounded-2xl justify-center ml-96'>{moment().format('llll')}</p>
        </div>
        </div>
    );
};

export default Home;