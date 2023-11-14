import axios from "axios";


const axiosSecure = axios.create({
baseURL: 'http://localhost:5000',
withCredentials: true
});

const useAxiosSecure = () => {

    useEffect( () =>{
        axiosSecure.interceptors.response.use(res => )
    })
    return axiosSecure;

    
};

export default useAxiosSecure;