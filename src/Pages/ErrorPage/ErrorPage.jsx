
import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
      
        
        <div>
           
            <div>
            <div className=" ml-56 mr-56 mb-4 items-center justify-center shadow-2xl">
            <img src="https://i.ibb.co/sKLmbxp/error.png" alt="" />
      </div>
      
            </div>
            <Link className="flex justify-center w-25 border-red-600 h-25" to={'/'}>
                <button className="btn w-25 h-25 "><img src="https://i.ibb.co/tqWpFH2/po.png" alt="" /></button>
                {/* <button className="btn  mr-92 shadow-green-600 bg-red-600 text-white font-mono text-lg border-blue-600 border-spacing-56 px-16"><img src="https://i.ibb.co/GFX7GPg/Screenshot-2023-10-24-205943.png" alt="" /></button> */}
            </Link>
        </div>
        
    );
};

export default ErrorPage;