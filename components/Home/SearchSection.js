"use client";
import { DestinationContext } from '@/context/DestinationContext';
import { SourceContext } from '@/context/SourceContext';
import React, { useContext, useState } from 'react';
import CarListOptions from './CarListOptions';
import InputItem from './InputItem';

// Static libraries array for Google Maps
const libraries = ["geometry", "places"];

function SearchSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const [distance, setDistance] = useState(null);

  const calculateDistance = () => {
    console.log("Source:", source);
    console.log("Destination:", destination);
  
    if (
      source &&
      destination &&
      typeof source.lat === "number" &&
      typeof source.lng === "number" &&
      typeof destination.lat === "number" &&
      typeof destination.lng === "number"
    ) {
      const dist = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(source.lat, source.lng),
        new google.maps.LatLng(destination.lat, destination.lng)
      );
      console.log("Distance (in miles):", dist * 0.000621374);
      setDistance((dist * 0.000621374).toFixed(2)); // Convert to miles
    } else {
      console.error("Invalid source or destination coordinates.");
    }
  };
  

  return (
    <div>
      <div className="p-2 md:pd-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
      {distance ? <CarListOptions distance={distance} /> : null}
    </div>
  );
}

export default SearchSection;
