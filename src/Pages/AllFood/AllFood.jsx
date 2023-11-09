
import Foods from "./Foods";





const AllFood  = () => {
    // const [allfood, setAllFood] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:5000/allfood')
    //         .then(res => res.json())
    //         .then(data => setAllFood(data))
    //         .catch(error => console.error('Error fetching data: ', error));
    // }, []);
            

    return (
           <div>
            {/* <div data-aos="fade-up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 aos-init aos-animate mx-auto w-full p-5 gap-4 lg:-top-20 shadow-3xl shadow-lime-400 bg-lime-100">
           
                {allfood.map((item) => (
                    <Foods key={item._id} allfood={allfood} />
                ))}
            </div>
            <div className="text-center">
            <Link to={`/allfood/${_id}`}><button className="btn btn-outline text-red bg-red-600 text-white mr-5 mb-2 mt-2 px-16 rounded-e-full rounded-s-full">See All</button></Link>

            </div> */}
            <Foods></Foods>
            </div>
  
    
    );
};


export default AllFood;