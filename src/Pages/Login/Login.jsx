
import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import { FcGoogle } from "react-icons/fc";
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';


const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [success, setSuccess] = useState('');
  const emailRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await signInUser(email, password);
      console.log(result);
      setLoginError('');
      setSuccess('Login Successful');
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
      });
    } catch (error) {
      console.error(error);
      setLoginError('Invalid email or password. Please try again.');
      setSuccess('');
      Swal.fire({
        icon: 'error',
        title: 'Login Error',
        text: 'Invalid email or password. Please try again.',
      });
    }
  };

  const handleForgetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log('Please provide an email', emailRef.current.value);
      return;
    }
    // Handle forgot password logic (send reset email)
    //      if(data.insertedId){
//       Swal.fire({
//         title: 'Success!',
//         text: 'Your Car is nicely selected',
//         icon: 'success',
//         confirmButtonText: 'Thank You!'
//       });
// }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Please Check Your Email');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
      });
  };


return (
    <div>
     
      <div className="hero min-h-screen">
        <div className="hero-content lg:flex-cols-reverse">
        <div className="w-96 h-96 hover:scale-110 transition-all aos-init aos-animate">
      <img src="https://i.ibb.co/gwJzscB/login.jpg" alt="" />
      {/* <iframe src="https://gifer.com/embed/ID5G" width="480" height="672" frameBorder="0" allowFullScreen></iframe><p><a href="https://gifer.com"></a></p> */}
      <button className="btn"><img className="w- h-32" src="https://i.ibb.co/wJvJzgz/lop.png" alt="" /></button>
       
    
      </div>

  {/* <div className="text-start lg:text-left">
    <h1 className="text-5xl text-indigo-600 font-mono font-bold">Login!</h1>
  </div> */}
  <div className="card flex-shrink-0  max-w-lg hover:scale-110 transition-all w-full aos-init aos-animate shadow-2xl shadow-red-500 bg-green-300 rounded-e-2xl rounded-s-full">
    

    <form onSubmit={handleLogin} className="card-body"> 



      <div className="form-control">
        <label className="label">
          <span className="label-text ml-20 text-xl font-bold text-yellow-800 px-5 font-mono">Email</span>
        </label>
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          className="input input-bordered"
          required
                />
  </div>
  <div className="form-control">
    <label className="label">
      <span className="label-text ml-3 text-xl font-bold text-yellow-800  font-mono">Password</span>
    </label>
    <input
      type="password"
      name="password"
      placeholder="Password"
      className="input input-bordered"
      required
    />
    <label className="label">


      <a onClick={handleForgetPassword} href="#" className="label-text-alt text-red-700 font-serif text-sm link link-hover">
      


        Forgot password?
      </a>
    </label>
  </div>
  <div className="form-control mt-6">
    <button className="btn btn-primary">Login</button>
    <p className="font-serif text-start ml-10">
    <i>  Do not have an account?
      
      <Link className="font-serif" to="/register">
        <button className="btn bg-green-300 border-y-green-300 border-x-green-300 text-red-500 font-bold">Register</button>
      </Link>

      first.</i>
    </p>

<p className="   font-mono py-5 font-semibold text-orange-800 text-center items-center" >Or Login With</p> <p>
        <button onClick={handleGoogleSignIn}
          className="btn bg-black rounded-s-3xl rounded-e-3xl px-28 ml-24 py-2  text-orange-300"
        >
          <FcGoogle className='w-8 h-6'></FcGoogle>
        </button>
      </p>
              </div>
            </form>
            {loginError && <p className="text-red-700">{loginError}</p>}
            {success && <p className="text-green-700">{success}</p>}
          </div>
        </div>
        <div>
         <Helmet>
          <title>Abrar's Dine | Login </title>
        </Helmet>
         </div>
      </div>


      

    </div>
  );
};

export default Login;
