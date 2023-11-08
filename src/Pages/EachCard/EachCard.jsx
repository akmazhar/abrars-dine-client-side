


        const EachCard = ({ fsixc }) => {
            
            const { food_image, food_name, food_category, price } = fsixc;


            return (
                <div className="card card-compact w-96 bg-base-100 mt-3 shadow-xl">
                <figure><img src={food_image} alt="" /></figure>
                <div className="card-body">
                  <h2 className="card-title">{food_name}</h2>
                  <h2 className="card-title">{food_category}</h2>
                  <p className="font-bold text-lg text-red-500">Price : $ {price}</p>
                  <div className="card-actions justify-end">
                    
                  </div>
                </div>
              </div>
            );
        };


export default EachCard;