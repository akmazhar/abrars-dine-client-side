
import moment from 'moment';
import { BarChart } from "keep-react";

const Ratio = () => {
const BarChartData = [
  {
    name: "2",
    price: 340,
    sell: 140,
  },
  {
    name: "4",
    price: 300,
    sell: 200,
  },
  {
    name: "6",
    price: 170,
    sell: 120,
  },
  {
    name: "8",
    price: 190,
    sell: 130,
  },
  {
    name: "10",
    price: 450,
    sell: 120,
  },
  {
    name: "12",
    price: 400,
    sell: 213,
  },
  {
    name: "14",
    price: 250,
    sell: 180,
  },
  {
    name: "16",
    price: 320,
    sell: 150,
  },
  {
    name: "18",
    price: 280,
    sell: 160,
  },
  {
    name: "20",
    price: 390,
    sell: 110,
  },
  {
    name: "22",
    price: 220,
    sell: 90,
  },
  {
    name: "24",
    price: 360,
    sell: 170,
  },
  {
    name: "26",
    price: 410,
    sell: 140,
  },
  {
    name: "28",
    price: 280,
    sell: 200,
  },
  {
    name: "30",
    price: 330,
    sell: 160,
  },
];

  return (
    <div>
      <div className="text-red-500 ml-96">
        <p className="text-2xl mt-4 text-center ml-52 mr-48 px-12 py-4 font-serif bg-black h-30 w-1/5 rounded-full shadow-2xl shadow-red-600">
          {moment().format('llll')}
        </p>
      </div>
<div className="text-xl font-serif text-center ml-28 mr-28 rounded-e-full text-white shadow-2xl shadow-indigo-900 bg-white">
<BarChart
        height={250}
        width={940}
        barSize={30}
        barRadius={[4, 4, 0, 0]}
        dataKey="price"
        secondaryDataKey="sell"
        chartData={BarChartData}
        showBg={true}
        showLegend={true}
        showTooltip={true}
        showXaxis={true}
        showYaxis={true}
      />
    
</div>
<h1 className='text-4xl font-serif mb-3 text-yellow-600 shadow-2xl font-semibold text-center'>Half Months of <span className='text-red-600'>Abrar's Dine</span> : Price & Sell</h1>

    </div>
    

  );
};

export default Ratio;
