import { Helmet } from "react-helmet";
import Service from "../Service/Service";
import Banner from "../Shared/Banner/Banner";
import Ratio from "../TwoParts/Ratio";




const Home = () => {
    return (
        <div>
     
         <Banner></Banner>
         <Service></Service>
         <Ratio></Ratio>
         <div>
         <Helmet>
          <title>Abrar's Dine | Home</title>
        </Helmet>
         </div>
        </div>
    );
};

export default Home;