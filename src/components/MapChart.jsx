// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, useMap, Circle, Popup } from "react-leaflet";
// import { millify } from "millify";
// import "../App.css";

// export default function MapChart({ center, zoom }) {
//   const [countries, setCountries] = useState([]);

//   function SetViewOnClick({ coords }) {
//     const map = useMap();
//     map.setView(coords, map.getZoom());
//     map.setZoom(zoom);

//     return null;
//   }
//   const casesTypeColors = {
//     cases: {
//       hex: "#CC1034",
//       rgb: "rgb(204, 16, 52)",
//       half_op: "rgba(204, 16, 52, 0.5)",
//       multiplier: 800,
//     },
//     recovered: {
//       hex: "#7dd71d",
//       rgb: "rgb(125, 215, 29)",
//       half_op: "rgba(125, 215, 29, 0.5)",
//       multiplier: 1200,
//     },
//     deaths: {
//       hex: "#fb4443",
//       rgb: "rgb(251, 68, 67)",
//       half_op: "rgba(251, 68, 67, 0.5)",
//       multiplier: 2000,
//     },
//   };
//   useEffect(() => {
//     async function getData() {
//       await fetch("https://disease.sh/v3/covid-19/countries")
//         .then((res) => res.json())
//         .then((data) => {
//           const countries = data.map((res) => ({
//             lat: res.countryInfo.lat,
//             long: res.countryInfo.long,
//             cases: res.cases,
//             flag: res.countryInfo.flag,
//             deaths: res.deaths,
//             recovered: res.recovered,
//             name: res.country,
//           }));

//           setCountries(() => [{ lat: 23, long: 90 }, ...countries]);
//         })
//         .catch((err) => console.log(err));
//     }
//     getData();
//   }, []);

//   return (
//     <div className="Map__main">
//       <MapContainer center={center} zoom={zoom}>
//         <SetViewOnClick coords={center} />
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         {countries
//           ? countries.map((data, index) => {
//               return (
//                 <Circle
//                   key={index}
//                   center={[data.lat, data.long]}
//                   color={casesTypeColors.cases.hex}
//                   fillColor={casesTypeColors.cases.hex}
//                   fillOpacity={0.4}
//                   radius={
//                     data.cases
//                       ? Math.sqrt(data.cases) *
//                         Math.sqrt(casesTypeColors.cases.multiplier) *
//                         2
//                       : 0
//                   }
//                 >
//                   <Popup className="Map_popup">
//                     <div className="Map__popup_container">
//                       <div className="Map__popup_top">
//                         <img src={data.flag} alt="Flag" />
//                         <h3>{data.name}</h3>
//                       </div>
//                       <div className="Map__popup_bottom">
//                         <p>Total Cases: {millify(data.cases ? data.cases : 0)}</p>
//                         <p>Total Death: {millify(data.deaths ? data.deaths : 0)}</p>
//                         <p>Total Recovered: {millify(data.recovered ? data.recovered : 0)}</p>
//                       </div>
//                     </div>
//                   </Popup>
//                 </Circle>
//               );
//             })
//           : null}
//       </MapContainer>
//     </div>
//   );
// }



// new


import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Circle, Popup } from "react-leaflet";
import { millify } from "millify";
import "../App.css";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default function MapChart({ center, zoom }) {
  const [countries, setCountries] = useState([]);

  function SetViewOnClick({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    map.setZoom(zoom);

    return null;
  }
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 2000,
    },
  };
  useEffect(() => {
    async function getData() {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((res) => ({
            lat: res.countryInfo.lat,
            long: res.countryInfo.long,
            cases: res.cases,
            flag: res.countryInfo.flag,
            deaths: res.deaths,
            recovered: res.recovered,
            name: res.country,
          }));

          setCountries(() => [{ lat: 23, long: 90 }, ...countries]);
        })
        .catch((err) => console.log(err));
    }
    getData();
  }, []);

  return (
    <>

      {/* <Typography
        className="text-center text-stone-600"
        variant="h3"
        gutterBottom
      >
        Home Global dashboard
      </Typography> */}
    <div className="Map__main">

      <MapContainer center={center} zoom={zoom}>
        <SetViewOnClick coords={center} />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {countries
          ? countries.map((data, index) => {
              return (
                <Circle
                  key={index}
                  center={[data.lat, data.long]}
                  color={casesTypeColors.cases.hex}
                  fillColor={casesTypeColors.cases.hex}
                  fillOpacity={0.4}
                  radius={
                    data.cases
                      ? Math.sqrt(data.cases) *
                        Math.sqrt(casesTypeColors.cases.multiplier) *
                        2
                      : 0
                  }
                >
                  <Popup>
                    {
                      <Box sx={{ minWidth: 200 }}>
                        <Card variant="outlined">
                          <CardContent>
                            <Typography>
                              <img
                                className=" size-12 mr-auto ml-auto object-fill "
                                src={data.flag}
                                alt="Flag"
                              />
                            </Typography>

                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                            >
                              <span className="flex justify-center">
                                {data.name}
                              </span>
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Cases:{" "}
                              {millify(data.cases ? data.cases : 0)}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Death:{" "}
                              {millify(data.deaths ? data.deaths : 0)}
                            </Typography>
                            <Typography
                              sx={{ fontSize: 14 }}
                              color="text.secondary"
                              gutterBottom
                            >
                              Total Recovered:{" "}
                              {millify(data.recovered ? data.recovered : 0)}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    }
                  </Popup>
                </Circle>
              );
            })
          : null}
      </MapContainer>
    </div>
    </>
  );
}