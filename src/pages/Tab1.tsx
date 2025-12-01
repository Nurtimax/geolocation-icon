/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonIcon,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import {
  location,
  speedometer,
  navigate,
  time,
  alertCircle,
  trendingUp,
} from "ionicons/icons";
import { useRealtimeData } from "../hooks/useRealtimeData";
import "./Tab1.css";
import { useEffect } from "react";
import { Geolocation } from "@capacitor/geolocation";
import { updateUserProfile } from "../firebase/update-location";
import { Device } from "@capacitor/device";

interface LocationData {
  accuracy: number;
  altitude: number;
  altitudeAccuracy: number;
  heading: number;
  latitude: number;
  longitude: number;
  speed: number;
}

interface LocationsMap {
  [timestamp: string]: LocationData;
}

const generateId = () => {
  const key = "local-key";
  const localKey = localStorage.getItem(key);
  const id = Date.now();

  if (localKey) return localKey;

  localStorage.setItem(key, JSON.stringify(id));
  return id;
};

const Tab1: React.FC = () => {
  const {
    data: locationsData,
    error,
    loading,
  } = useRealtimeData("location") as {
    data: LocationsMap | null;
    error: any;
    loading: boolean;
  };

  const positionId = generateId();

  useEffect(() => {
    Geolocation.watchPosition(
      { enableHighAccuracy: true },
      async (position) => {
        console.log(position, "pos");

        const info = await Device.getInfo();

        if (position) {
          const updates = {
            ...position.coords,
            ...info,
          };
          updateUserProfile(updates, String(positionId));
        }
      }
    );
  }, []);

  // Акыркы локацияны алуу
  const getLatestLocation = (): LocationData | null => {
    if (!locationsData || Object.keys(locationsData).length === 0) return null;

    const timestamps = Object.keys(locationsData).sort(
      (a, b) => Number(b) - Number(a)
    );
    return locationsData[timestamps[0]];
  };

  // Бардык локациялардын саны
  const locationCount = locationsData ? Object.keys(locationsData).length : 0;

  // Акыркы локация
  const latestLocation = getLatestLocation();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="ion-padding">
          <IonTitle>Локация Tracker</IonTitle>
          {locationCount > 0 && (
            <IonBadge slot="end" color="primary">
              {locationCount}
            </IonBadge>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <IonSpinner name="crescent" />
            <IonText>
              <p>Локация жүктөлүүдө...</p>
            </IonText>
          </div>
        )}

        {/* Error State */}
        {error && (
          <IonCard color="danger">
            <IonCardContent>
              <div style={{ display: "flex", alignItems: "center" }}>
                <IonIcon icon={alertCircle} style={{ marginRight: "8px" }} />
                <IonText>
                  <h3>Ката кетти</h3>
                  <p>{error.message}</p>
                </IonText>
              </div>
            </IonCardContent>
          </IonCard>
        )}

        {/* Latest Location Data */}
        {latestLocation && (
          <div className="location-container">
            {/* Statistics Card */}
            <IonCard>
              <IonCardContent>
                <div className="stats-container">
                  <IonChip color="primary">
                    <IonIcon icon={trendingUp} />
                    <IonLabel>Жаңыртуулар: {locationCount}</IonLabel>
                  </IonChip>
                  <IonText color="medium">
                    <small>
                      Акырксы:{" "}
                      {new Date(
                        Number(
                          Object.keys(locationsData!).sort(
                            (a, b) => Number(b) - Number(a)
                          )[0]
                        )
                      ).toLocaleTimeString()}
                    </small>
                  </IonText>
                </div>
              </IonCardContent>
            </IonCard>

            {/* Main Location Card */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>
                  <IonIcon icon={location} color="primary" />
                  Акыркы локация
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <div className="coordinate-item">
                        <IonText color="medium">
                          <small>Кеңдик</small>
                        </IonText>
                        <IonText>
                          <h3>{latestLocation.latitude?.toFixed(6)}</h3>
                        </IonText>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="coordinate-item">
                        <IonText color="medium">
                          <small>Узундук</small>
                        </IonText>
                        <IonText>
                          <h3>{latestLocation.longitude?.toFixed(6)}</h3>
                        </IonText>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>

            {/* Details Card */}
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Деталдар</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <div className="detail-item">
                        <IonIcon icon={navigate} color="success" />
                        <div>
                          <IonText color="medium">
                            <small>Тактык</small>
                          </IonText>
                          <IonText>
                            <p>±{latestLocation.accuracy?.toFixed(1)}m</p>
                          </IonText>
                        </div>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="detail-item">
                        <IonIcon icon={speedometer} color="warning" />
                        <div>
                          <IonText color="medium">
                            <small>Ылдамдык</small>
                          </IonText>
                          <IonText>
                            <p>{latestLocation.speed?.toFixed(1)} m/s</p>
                          </IonText>
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>

                  <IonRow>
                    <IonCol size="6">
                      <div className="detail-item">
                        <IonIcon icon={location} color="tertiary" />
                        <div>
                          <IonText color="medium">
                            <small>Бийиктик</small>
                          </IonText>
                          <IonText>
                            <p>{latestLocation.altitude?.toFixed(1)}m</p>
                          </IonText>
                        </div>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="detail-item">
                        <IonIcon icon={time} color="medium" />
                        <div>
                          <IonText color="medium">
                            <small>Бағыт</small>
                          </IonText>
                          <IonText>
                            <p>{latestLocation.heading?.toFixed(0)}°</p>
                          </IonText>
                        </div>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </div>
        )}

        {/* Location History List */}
        {locationsData && Object.keys(locationsData).length > 1 && (
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Локация тарыхы</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonList>
                {Object.entries(locationsData)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .slice(0, 5) // Акыркы 5 локация
                  .map(([timestamp, location]) => (
                    <IonItem key={timestamp}>
                      <IonLabel>
                        <h3>
                          {new Date(Number(timestamp)).toLocaleTimeString()}
                        </h3>
                        <p>
                          {location.latitude?.toFixed(4)},{" "}
                          {location.longitude?.toFixed(4)}
                        </p>
                        <p>Тактык: ±{location.accuracy?.toFixed(1)}m</p>
                      </IonLabel>
                      <IonBadge color="medium" slot="end">
                        {location.speed?.toFixed(1)}m/s
                      </IonBadge>
                    </IonItem>
                  ))}
              </IonList>
            </IonCardContent>
          </IonCard>
        )}

        {/* No Data State */}
        {!loading && !error && !latestLocation && (
          <IonCard>
            <IonCardContent className="no-data">
              <IonIcon icon={location} size="large" color="medium" />
              <IonText>
                <h3>Локация маалыматы жок</h3>
                <p>Локация маалыматтары келгенче күтө туруңуз</p>
              </IonText>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
