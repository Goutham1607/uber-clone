import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import {
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useCallback, useContext, useEffect, useState } from "react";
const libraries = ["geometry", "places"];

function GoogleMapSection() {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [map, setMap] = useState(null);
  const [directionRoutePoints, setDirectionRoutePoints] = useState(null);
  const [containerStyle, setContainerStyle] = useState({
    width: "100%",
    height: "50%",
  });

  useEffect(() => {
    const updateContainerStyle = () => {
      setContainerStyle({
        width: "100%",
        height: `${window.innerWidth * 0.4}px`,
      });
    };
    updateContainerStyle();
    window.addEventListener("resize", updateContainerStyle);
    return () => window.removeEventListener("resize", updateContainerStyle);
  }, []);

  useEffect(() => {
    if (source && destination) {
      directionRoute();
    }
    if (source && typeof source.lat === "number" && typeof source.lng === "number" && map) {
      map.panTo({ lat: source.lat, lng: source.lng });
      setCenter({ lat: source.lat, lng: source.lng });
    }
  }, [source, destination]);

  const directionRoute = () => {
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: { lat: source.lat, lng: source.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result?.routes?.length > 0) {
          setDirectionRoutePoints(result);
        } else {
          console.error("Directions request failed:", status, result);
        }
      }
    );
  };

  const onLoad = useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, [center]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      options={{ mapId: "6f3fe73d39c4824e" }}
    >
      {source && (
        <MarkerF
          position={{ lat: source.lat, lng: source.lng }}
          icon={{
            url: "/source.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayView
            position={{ lat: source.lat, lng: source.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{source.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {destination && (
        <MarkerF
          position={{ lat: destination.lat, lng: destination.lng }}
          icon={{
            url: "/dest.png",
            scaledSize: { width: 20, height: 20 },
          }}
        >
          <OverlayView
            position={{ lat: destination.lat, lng: destination.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="p-2 bg-white font-bold inline-block">
              <p className="text-black text-[16px]">{destination.label}</p>
            </div>
          </OverlayView>
        </MarkerF>
      )}
      {directionRoutePoints && (
        <DirectionsRenderer
          directions={directionRoutePoints}
          options={{ 
            polylineOptions:{
              strokeColor: 'black',
              strokeWeight:5
            },
            suppressMarkers: true }}
        />
      )}
    </GoogleMap>
  );
}

export default GoogleMapSection;
