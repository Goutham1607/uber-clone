import { CarListData } from '@/utils/CarListData';
import React, { useState } from 'react';
import CarListItem from './CarListItem';

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  return (
    <div className="mt-5 p-5 overflow-auto h-[250px]">
      <h2 className="text-[22px] font-bold">Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={index} // Ensure each child in the list has a unique key
          className={`cursor-pointer p-2 px-4 rounded-md border-black ${
            activeIndex === index ? 'border-[3px]' : ''
          }`}
          onClick={() => {
            setActiveIndex(index); // Update active index
            setSelectedCar(item); // Update selected car
          }}
        >
          {/* Pass the corrected 'distance' prop */}
          <CarListItem car={item} distance={distance} />
        </div>
      ))}
      {selectedCar?.name? <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl rounded-lg w-full md:w-[30%] border-[1px] items-center'>
        <h2>Make Payment For</h2>
        <button className='p-3 bg-black text-white rounded-lg text-center'>Request {selectedCar.name}</button>
      </div>:null}
    </div>
  );
}

export default CarListOptions;
