import React, { useEffect, useState, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

// Register necessary components
Chart.register(...registerables);

export default function WorldChart({ country }) {
   const [data, setData] = useState({
      cases: {},
      deaths: {},
      recovered: {},
   });

   const chartRef = useRef(null);

   useEffect(() => {
      async function getData() {
         try {
            const response = await fetch(
               `https://disease.sh/v3/covid-19/historical/${
                  country === "global" ? "all" : country
               }?lastdays=all`
            );
            const value = await response.json();

            if (value.cases) {
               setData(country === "global" ? value : value.timeline);
            } else {
               alert("No Data found!");
            }
         } catch (err) {
            console.error(err.message);
            alert("No Data found!");
         }
      }

      getData();
   }, [country]);

   return (
      <div className="WorldChart__main">
         <h2 className="WorldChart__title">
            Worldwide covid-19 history
            {/* This is for now. I will fix it later then it will show data for each country  */}
            {/* {country === "global"
               ? "Worldwide covid-19 history"
               : `Covid-19 history of ${country}`} */}
         </h2>
         <Line
            ref={chartRef}
            className="worldChart__lineGraph"
            data={{
               labels: Object.keys(data.cases),
               datasets: [
                  {
                     id: 1,
                     label: "Cases",
                     data: Object.values(data.cases),
                     backgroundColor: "yellow",
                     borderColor: "yellow",
                     fill: false,
                  },
                  {
                     id: 2,
                     label: "Deaths",
                     data: Object.values(data.deaths),
                     backgroundColor: "red",
                     borderColor: "red",
                     fill: false,
                  },
                  {
                     id: 3,
                     label: "Recovered",
                     data: Object.values(data.recovered),
                     backgroundColor: "green",
                     borderColor: "green",
                     fill: false,
                  },
               ],
            }}
         />
      </div>
   );
}