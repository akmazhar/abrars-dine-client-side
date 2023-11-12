import { useEffect } from "react";
import { useState } from "react";





const MyOrder = () => {
  const [jsonData, setJasonData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/myOrder`)
      .then((res) => res.json())
      .then((data) => {
        setJasonData(data);
      })
  }, []);

  
  return (
    <div>
      {data.map((item) => (<Add key={item._id} item={item}/>))}
    </div>
  );
};

export default MyOrder;
