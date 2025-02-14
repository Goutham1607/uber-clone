"use client"; // Ensure this is at the top to mark the component as client-side

import GoogleMapSection from "@/components/Home/GoogleMapSection";
import SearchSection from "@/components/Home/SearchSection";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import { LoadScript } from "@react-google-maps/api";
import React, { useState } from "react"; // Import React and useState

export default function Home() {
  const [source, setSource] = useState([]); // Now useState will be defined
  const [destination, setDestination] = useState([]);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <LoadScript
        libraries={['places']}
         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <div
          className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5"
          style={{ color: "black" }}
        >
          <div>
            <SearchSection />
          </div>
          <div className="col-span-2">
            <GoogleMapSection />
          </div>
        </div>
        </LoadScript>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
}
