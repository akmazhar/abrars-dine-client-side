import { Helmet } from "react-helmet";


const Blog = () => {

    return (
        <div>
           
      <div className="hero min-h-screen bg-pink-300  rounded-e-2xl rounded-s-full  rounded-b-full">
  <div className="hero-content flex-col lg:flex-row-reverse">

    <img href='https://akmazhar2475.hashnode.dev/' src="https://i.ibb.co/yf1jSkP/Screenshot-2023-11-07-192756.png" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="font-sans text-start font-bold text-4xl text-lime-700">What is One way data binding?</h1>
      <h3 className="py-6 font-sans text-start text-xl text-black"><img className="w-25 h-25" src="https://i.ibb.co/6HZfd8R/bloglogo.png" alt="" /> One-way data binding is a data binding technique where the data is transferred in one <br/> direction, typically from the model to the view. Changes in the model automatically <br/> reflect in the view, but changes in the view do not affect the model. It is commonly<br/>   used in frameworks like AngularJS.

           </h3>
     
    </div>
  </div>
</div>


<div className="hero min-h-screen bg-green-300 shadow-2xl rounded-e-full rounded-s-2xl ">
  <div className="hero-content flex-col lg:flex-row">
    <img href='https://akmazhar2475.hashnode.dev/' src="https://i.ibb.co/xzrxXqt/Node-JS-Npm-01-1.png" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 className="text-4xl font-bold font-sans text-start text-blue-600">What is NPM in node.js?</h1>
      <h3 className="py-6 font-sans text-start text-xl text-black"> <img className="w-25 h-25" src="https://i.ibb.co/6HZfd8R/bloglogo.png" alt="" />NPM (Node Package Manager) is a package manager for Node.js that allows <br/>developers to easily install, share, and distribute packages or modules of <br/>reusable JavaScript code. It simplifies the process of incorporating various<br/> functionalities and libraries into a Node.js project.
     </h3>   
    </div>
  </div>
</div>



<div className="card w-full bg-lime-300 shadow-2xl rounded-t-full rounded-s-2xl">
  <figure className="px-4 pt-4">
    <img href='https://akmazhar2475.hashnode.dev/' src="https://i.ibb.co/wQMn0W0/mongodb-vs-mysql.jpg" alt="" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h1 className="text-4xl font-bold font-sans text-start text-red-500"> Different between Mongodb database vs mySQL database.</h1>
    <h2 className="py-6 font-sans text-start text-xl text-black"><img className="w-25 h-25" src="https://i.ibb.co/6HZfd8R/bloglogo.png" alt="" />MongoDB and MySQL are both popular database management systems, but they have distinct differences:

<br/> <br/>1. MongoDB is a NoSQL database, while MySQL is a relational database management system (RDBMS).
<br/><br/>2. MongoDB is schema-less, which means that you can create documents without having to define their structure beforehand. MySQL, on the other hand, requires a predefined schema.
<br/><br/>3. MongoDB uses a flexible, JSON-like document model, making it easier to work with certain types of data. MySQL stores data in tables with rows and columns.
<br/><br/>4. MongoDB is better suited for hierarchical data storage and for applications that require scalability and flexibility, while MySQL is typically used for traditional, structured data storage and applications where ACID (Atomicity, Consistency, Isolation, Durability) transactions are necessary.</h2>
    <div className="card-actions">
    </div>
  </div>
  <div>
         <Helmet>
          <title>Abrar's Dine | Blog </title>
        </Helmet>
         </div>
</div>

        </div>
    );
};

export default Blog;