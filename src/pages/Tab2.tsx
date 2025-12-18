/* eslint-disable @typescript-eslint/no-explicit-any */
import { IonPage, useIonToast } from "@ionic/react";
import "./Tab2.css";
import Map, { Marker } from "react-map-gl/mapbox";
import { useRealtimeData } from "../hooks/useRealtimeData";
import { LocationData, LocationsMap } from "./Tab1";
import ElectricianIcon from "../components/ElectricianIcon";
import "mapbox-gl/dist/mapbox-gl.css";

const Tab2: React.FC = () => {
  const [present] = useIonToast();

  const { data: locationsData } = useRealtimeData("location") as {
    data: LocationsMap | null;
    error: any;
    loading: boolean;
  };

  const list = Object.entries(locationsData || {});

  const onMarkerClick = (location: LocationData) => {
    present({
      message: `${location?.name}`,
      duration: 1500,
      position: "top",
      color: "warning",
    });
  };

  return (
    <IonPage>
      <Map
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken="pk.eyJ1IjoibnVydGkiLCJhIjoiY21qOXRmdndlMGQzeDNjcjFoMDZteXQ2YiJ9.yE3nhZ0SfaPr4415iMgYdg"
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
      >
        {list.map(([timestamp, location]) => {
          return (
            <Marker
              key={timestamp}
              latitude={Number(location?.latitude || 0)}
              longitude={Number(location?.longitude || 0)}
              element={(<div>State</div>) as unknown as HTMLElement}
              anchor="top"
              onClick={() => onMarkerClick(location)}
              offset={[12, -26]}
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
