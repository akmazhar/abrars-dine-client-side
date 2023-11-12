


        const EachCard = ({ eachcards }) => {

            const { image, name, category, price } = eachcards;


            return (
                
                <div data-aos="fade-up"  className="card card-compact mt-3  shadow-gray-600 shadow-3xl relative lg:-top-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center bg-base-100 shadow-2xl rounded-xl mx-auto w-full md:w-3/4 lg:w-7/12 p-10 aos-init aos-animate">
                <figure><img src={image} alt="" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{name}</h2>
                  <h2 className="card-title">{category}</h2>
                  <p className="font-bold text-lg text-red-500">Price : $ {price}</p>
                  <div className="card-actions justify-end">
                    
                  </div>
                </div>
              </div>
            );
        };
       

export default EachCard;