import { Link } from "react-router-dom";


const Banner = () => {

    return (

       <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/Nnf0Qcn/1.png" className="w-full" />
    <div className="absolute h-full left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
   <div className="mt-10 ml-10">
   <h2 className="text-6xl text-white font-serif mb-3 ">Healthy & Farm-Fresh<br/> Vegetable Delights<br/>at Abrar's Dine</h2>
        <p className="text-white mb-4">Indulge in the vibrant and nourishing experience at Abrars Dine, offering an array of healthy, <br/> farm-fresh vegetables. Savor the natural flavors of handpicked seasonal produce, expertly<br/>incorporated into our delectable dishes, ensuring a wholesome and nutritious dining experience.</p>
        <Link to={`/AllFood`}><button className="btn gap-5 bg-red-700 btn-outline text-white mr-10">All Menu</button></Link>
       </div>
  </div> 
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0 ">
      <a href="#slide4" className="btn btn-circle text-white  bg-red-600  mr-5">❮</a> 
      <a href="#slide2" className="btn btn-circle text-white bg-red-600  mr-5">❯</a>
    </div>
  </div> 
   
     



  <div id="slide2" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/T1zNGVG/2.png" className="w-full" />
    <div className="absolute h-full left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
   <div className="mt-10 ml-10">
   <h2 className="text-6xl text-white font-serif mb-3 ">Discover<br/> Global Delights <br/>at Abrar's Dine</h2>
        <p className="text-white mb-4">Experience an exquisite culinary journey at Abrar's Dine, featuring a diverse array of authentic <br/> Bangladeshi, Chinese, Japanese, Italian, Thai, and Mexican delicacies. Indulge in a world-class <br/>dining experience with an extensive menu offering a fusion of flavors and cultures, all at <br/>affordable prices. Explore the rich tapestry of global cuisines within the inviting ambiance of<br/> Abrar's Dine, where every dish tells a story of culinary mastery and cultural diversity</p>
        <Link to={`/AllFood`}><button className="btn gap-5 bg-red-700 btn-outline text-white mr-10">All Menu</button></Link>
       </div>  
  </div> 
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
    <a href="#slide1" className="btn btn-circle text-white  bg-red-600  mr-5">❮</a> 
      <a href="#slide3" className="btn btn-circle text-white bg-red-600  mr-5">❯</a>
    </div>
  </div> 




  <div id="slide3" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/yWVhrrp/5.png" className="w-full" />
    <div className="absolute h-full left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
   <div className="mt-10 ml-10">
   <h2 className="text-6xl text-white font-serif mb-3 ">Lasagna<br/> Global Delights <br/>at Abrar's Dine</h2>
        <p className="text-white mb-4">A classic Italian favorite, boasts layers of rich flavors, combining  with savory Bolognese sauce and <br/> creamy béchamel. Served piping hot and garnished with melted cheese, <br/>it promises a comforting and indulgent dining experience.</p>
        <Link to={`/AllFood`}><button className="btn gap-5 bg-red-700 btn-outline text-white mr-10">All Menu</button></Link>
       </div>   
  </div> 
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
    <a href="#slide2" className="btn btn-circle text-white  bg-red-600  mr-5">❮</a> 
      <a href="#slide4" className="btn btn-circle text-white bg-red-600  mr-5">❯</a>
    </div>
  </div> 




  <div id="slide4" className="carousel-item relative w-full">
    <img src="https://i.ibb.co/KxZVqQH/3.png" className="w-full" />
    <div className="absolute h-full left-0 top-0  bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)]">
   <div className="mt-10 ml-10">
   <h2 className="text-6xl text-white font-serif mb-3 ">Delight <br/>in Tradition : Panta Ilish<br/>at Abrar's Dine</h2>
        <p className="text-white mb-4">Panta Ilish is a traditional Bengali dish, featuring fermented rice (panta bhat) served with<br/> seasoned Hilsa fish, offering a harmonious blend of tangy and savory flavors, <br/>deeply rooted in the cultural heritage of Bangladesh.</p>
        <Link to={`/AllFood`}><button className="btn gap-5 bg-red-700 btn-outline text-white mr-10">All Menu</button></Link>
       </div>
  </div> 
    <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 bottom-0">
    <a href="#slide3" className="btn btn-circle text-white  bg-red-600  mr-5">❮</a> 
      <a href="#slide1" className="btn btn-circle text-white bg-red-600  mr-5">❯</a>
    </div>
  </div>
</div>





    );
};

export default Banner;