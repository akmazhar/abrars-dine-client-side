import axios from "axios";


const axiosSecure = axios.create({
baseURL: 'https://restaurant-management-server-36vzbkkon-a-k-m-azhars-projects.vercel.app',
withCredentials: true
});

const useAxiosSecure = () => {

    useEffect( () =>{
        axiosSecure.interceptors.response.use(res => )
    })
    return axiosSecure;

    
};

export default useAxiosSecure;