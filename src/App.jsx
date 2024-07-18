import "./App.css";
import { Route, Routes } from "react-router-dom";
import User from "./pages/User";
import Map from "./pages/Map";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import "../node_modules/leaflet/dist/leaflet.css";
import { useState } from "react";
import MapChart from "./components/MapChart";
import DataShowcase from "./components/DataShowcase";

function App() {
  const [country, setCountry] = useState("global");
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([40, 34]);

  async function handleCountryChange(e) {
    setCountry(e.target.value);
    let url;
    if (e.target.value === "global") {
      setCenter([40, 34]);
      setZoom(2);
    } else {
      url = `https://disease.sh/v3/covid-19/countries/${e.target.value}`;
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setCenter([data.countryInfo.lat, data.countryInfo.long]);
          setZoom(6);
        });
    }
  }

  return (
    <>
      <NavBar onCountryChange={handleCountryChange} />
      {/* <DataShowcase country={country} /> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
