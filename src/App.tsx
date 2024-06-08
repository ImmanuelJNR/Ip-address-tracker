// import { useState } from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BG_Image from './assets/pattern-bg-desktop.png';
import styled from 'styled-components';
import SearchIpAddress from './component/SearchComponent';
import ApiInfoBox from './component/Info';
import L from 'leaflet';
import markerIcon from './assets/placeholder.png';


const TopContainer = styled.div`
  background-image: url(${BG_Image});
  background-size: cover;
  background-position: center;
  height: 40vh;
  width: 100%;

  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  h1{
    color: #fff;
    margin: 35px 0;
    font-family: "Rubik", sans-serif;
    font-weight: 400;
    font-size: clamp(1.5rem, 2vw + 1rem, 3rem)
  }

  @media (max-width: 900px){
    h1{
      margin: 15px 0;
    }
  }
`

interface IpApiResponse {
  ip: string;
  location: {
    country: string;
    region: string;
    city: string;
    lat: number;
    lng: number;
    postalCode: string;
    timezone: string;
  };
  isp: string;
}



const customIcon = new L.Icon({
  iconUrl: markerIcon,
  iconSize: [40, 40], // Customize the size of the icon
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});


function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [apiResponse, setApiResponse] = useState<IpApiResponse | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);

  useEffect(() => {
    if (apiResponse) {
      console.log('Updating map center to:', [apiResponse.location.lat, apiResponse.location.lng]);
      setMapCenter([apiResponse.location.lat, apiResponse.location.lng]);
    }
  }, [apiResponse]);

  return (
    <>
      <TopContainer>
        <h1>IP Address Tracker</h1>
        <SearchIpAddress
          inputValue={inputValue}
          setInputValue={setInputValue}
          setApiResponse={setApiResponse}
        />
      </TopContainer>
      {apiResponse && (
        <ApiInfoBox
          ip={apiResponse.ip}
          location={`${apiResponse.location.city}, ${apiResponse.location.region}, ${apiResponse.location.country}`}
          timezone={`UTC ${apiResponse.location.timezone}`}
          isp={apiResponse.isp}
        />
      )}
      <MapContainer key={mapCenter.toString()} center={mapCenter} zoom={13} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {apiResponse && (
          <Marker position={[apiResponse.location.lat, apiResponse.location.lng]}  icon={customIcon}>
            <Popup>
              IP: {apiResponse.ip}<br />
              Location: {apiResponse.location.city}, {apiResponse.location.region}, {apiResponse.location.country}<br />
              ISP: {apiResponse.isp}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  )
}

export default App
