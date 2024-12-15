import React from 'react';
import { HiUser } from "react-icons/hi";

function CarListItem({ car, distance }) {
  // Ensure distance is a valid number
  const validDistance = distance && !isNaN(distance) ? distance : 0;

  return (
    <div>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-5">
          <img
            src={car.image}
            alt={`${car.name} image`}
            width={100}
            height={100}
          />
          <div>
            <h2 className="font-semibold text-[18px] flex gap-3 items-center">
              {car.name}
              <span className="flex gap-2 items-center font-normal text-[14px]">
                <HiUser /> {car.seat}
              </span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className="text-[18px] font-semibold">
          Rs.{validDistance > 0 ? (car.amount * validDistance).toFixed(2) : "0.00"}
        </h2>
      </div>
    </div>
  );
}

export default CarListItem;
