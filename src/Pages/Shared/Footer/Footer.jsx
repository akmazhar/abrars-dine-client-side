

const Footer = () => {

    return (
        <div>
           <footer className="footer p-10 bg-black text-white">
  <aside>
   <img src="https://i.ibb.co/vzGHcbZ/Car-Service-Logo.png" alt="" />
    <p>Abrar is a software and web <br/>technologies engineer, a life coach <br/>trainer who is also a serial .</p>
  </aside> 
  <nav>
    <header className="footer-title  text-white">About</header> 
    <a className="link link-hover">Home</a> 
    <a className="link link-hover">Service</a> 
    <a className="link link-hover">Contact</a> 

  </nav> 
  <nav>
    <header className="footer-title  text-white">Company</header> 
    <a className="link link-hover">Why CarGarage</a> 
    <a className="link link-hover">About</a> 
  
  </nav> 
  <nav>
    <header className="footer-title  text-white">Support</header> 
    <a className="link link-hover">Support Center</a> 
    <a className="link link-hover">Feedback</a> 
    <a className="link link-hover">Accessibilty</a>
  </nav>
</footer> 
        </div>
    );
};

export default Footer;