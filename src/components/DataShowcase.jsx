import { useEffect, useState } from "react";
import milify from "millify";
import { Breadcrumbs, Link, Typography } from "@mui/material";
export default function DataShowcase({ country }) {
  const [cases, setCases] = useState({
    today: 0,
    total: 0,
  });
  const [deaths, setDeaths] = useState({
    today: 0,
    total: 0,
  });
  const [recovered, setRecovered] = useState({
    today: 0,
    total: 0,
  });
  const [active, setActive] = useState({
    today: 0,
    total: 0,
  });
  let url;
  if (country === "global") {
    url = "https://disease.sh/v3/covid-19/all";
  } else {
    url = `https://disease.sh/v3/covid-19/countries/${country}`;
  }
  useEffect(() => {
    async function getData() {
      // Fetching country wise data
      await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCases({
            today: data.todayCases,
            total: data.cases,
          });
          setDeaths({
            today: data.todayDeaths,
            total: data.deaths,
          });
          setRecovered({
            today: data.todayRecovered,
            total: data.recovered,
          });
          setActive({
            today: data.activePerOneMillion,
            total: data.active,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
  }, [url]);

  return (
    <>
      <Typography
        className="text-center mt-2 text-stone-600"
        variant="h3"
        gutterBottom
      >
        Global Dashboard
      </Typography>
      <div className="DataShowcase__main ">
        {/* coronavirus cases  */}
        <div className="DataShowcase__box">
          <h2 className="DataShowcase__box_title">Coronavirus cases</h2>
          <p className="DataShowcase__box_data">
            <span>Today</span>
            <span>
              {milify(cases.today, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
          <p className="DataShowcase__box_data">
            <span>Total</span>
            <span>
              {milify(cases.total, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
        </div>
        {/* Deaths  */}
        <div className="DataShowcase__box">
          <h2 className="DataShowcase__box_title">Deaths</h2>
          <p className="DataShowcase__box_data">
            <span>Today</span>
            <span>
              {milify(deaths.today, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
          <p className="DataShowcase__box_data">
            <span>Total</span>
            <span>
              {milify(deaths.total, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
        </div>
        {/* Recovered  */}
        <div className="DataShowcase__box">
          <h2 className="DataShowcase__box_title">Recovered</h2>
          <p className="DataShowcase__box_data">
            <span>Today</span>
            <span>
              {milify(recovered.today, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
          <p className="DataShowcase__box_data">
            <span>Total</span>
            <span>
              {milify(recovered.total, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
        </div>
      </div>
      {/* Active */}
      <div className="flex justify-center mt-3">
        <div className="DataShowcase__box">
          <h2 className="DataShowcase__box_title">Active</h2>
          <p className="DataShowcase__box_data">
            <span>Today</span>
            <span>
              {milify(active.today, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
          <p className="DataShowcase__box_data">
            <span>Total</span>
            <span>
              {milify(active.total, {
                precision: 2,
                decimalSeparator: ".",
              })}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}