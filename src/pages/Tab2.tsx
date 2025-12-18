/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonPage } from "@ionic/react";
import "./Tab2.css";
import Map, { Marker } from "react-map-gl/mapbox";
import { useRealtimeData } from "../hooks/useRealtimeData";
import { LocationsMap } from "./Tab1";
import ElectricianIcon from "../components/ElectricianIcon";
import "mapbox-gl/dist/mapbox-gl.css";

const Tab2: React.FC = () => {
  const { data: locationsData } = useRealtimeData("location") as {
    data: LocationsMap | null;
    error: any;
    loading: boolean;
  };

  // Бардык локациялардын саны

  const list = Object.entries(locationsData || {});

  console.log(list, "list");

  return (
    <IonPage>
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken="pk.eyJ1IjoibnVydGkiLCJhIjoiY21qOXRmdndlMGQzeDNjcjFoMDZteXQ2YiJ9.yE3nhZ0SfaPr4415iMgYdg"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        {list.map(([timestamp, location]) => {
          console.log(location, "lcoation");

          return (
            <Marker
              key={timestamp}
              latitude={Number(location?.latitude || 0)}
              longitude={Number(location?.longitude || 0)}
              element={(<div>State</div>) as unknown as HTMLElement}
            >
              <ElectricianIcon />
            </Marker>
          );
        })}
      </Map>
    </IonPage>
  );
};

export default Tab2;
