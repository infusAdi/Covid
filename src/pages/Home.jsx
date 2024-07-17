import axios from "axios";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import "../App.css";
// import MapChart from "../components/MapChart";
// backend driven

export default function Home() {
  const [products, setProducts] = useState([]);
  // const [Country, setCountry] = useState("");
  const position = [51.505, -0.09];
  const redOptions = { color: "red" };

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

  const fetchData = async () => {
    const res = await axios.get(`https://covid-api.com/api/regions`);
    console.log(res.data.data);
    setProducts(res.data.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* <div>
        {products.length > 0 && (
          <div className="products">
            <select
              value={Country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {products.map((prod) => (
                <option key={prod.name} value={prod.name}>
                  {prod.name}
                </option>
              ))}
            </select>
            <p>{Country} is country</p>
          </div>
        )}
      </div> */}

      {/* <div className="app__flex">
        <MapChart center={center} zoom={zoom} />
      </div> */}

      {/* <div className="map">
        <MapContainer center={position} zoom={3} scrollWheelZoom={false}>
          <CircleMarker
            center={[51.51, -0.12]}
            pathOptions={redOptions}
            radius={20}
          >
            <Popup>Popup in CircleMarker</Popup>
          </CircleMarker>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div> */}
    </div>
  );
}
