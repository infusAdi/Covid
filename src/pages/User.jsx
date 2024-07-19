// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import MapTable from "../components/MapTable";

const User = () => {
  const [totalResByCountry, setTotalResByCountry] = useState([]);
  const [countries, setCountries] = useState([]);
  const [province, setProvince] = useState([]);
  const [selcountries, setSelCountries] = useState("IND");
  //   const [date, setDate] = useState(() => {
  //     const today = new Date();
  //     const formattedDate = today.toISOString().split('T')[0];
  //     return formattedDate;
  //   });
  const [date, setDate] = useState("2022-02-23");

  const handleDateChange = (event) => {
    setDate(event.target.value);
    console.log(date);
  };
  const fetchData1 = async () => {
    const res = await axios.get(`https://covid-api.com/api/regions`);
    // console.log(res.data.data);
    setCountries(res.data.data);
  };
  const fetchData2 = async () => {
    const res = await axios.get(
      `https://covid-api.com/api/provinces/${selcountries}`
    );
    console.log(res.data.data);
    setProvince(res.data.data);
  };

  const fetchData = async () => {
    const res =
      await axios.get(`https://covid-api.com/api/reports/total?date=${date}&iso=${selcountries}
`);
    // console.log(res.data.data);
    setTotalResByCountry(res.data.data);
  };
  useEffect(() => {
    fetchData();
    fetchData1();
    fetchData2();
  }, [date, selcountries]);

  return (
    <>
      <div>
        <input type="date" value={date} onChange={handleDateChange} />
      </div>
      {countries.length > 0 && (
        <div className="products">
          <select
            value={selcountries}
            onChange={(e) => setSelCountries(e.target.value)}
          >
            {countries.map(
              (country) => (
                <option key={country.name} value={country.iso}>
                  {country.name}
                </option>
              )
              // <option value="otherOption">Other option</option>
            )}
          </select>
          <p>{selcountries} is country</p>
        </div>
      )}

      <div>
        <h4>confirmed : {totalResByCountry.confirmed}</h4>
        <h4>confirmed_diff: {totalResByCountry.confirmed_diff}</h4>
        <h4>deaths: {totalResByCountry.deaths}</h4>
        <h4>deaths_diff: {totalResByCountry.deaths_diff}</h4>
        <h4>recovered: {totalResByCountry.recovered}</h4>
        <h4>recovered_diff: {totalResByCountry.recovered_diff}</h4>
        <h4>active: {totalResByCountry.active}</h4>
        <h4>active_diff: {totalResByCountry.active_diff}</h4>
        <h4>fatality_rate: {totalResByCountry.fatality_rate}</h4>
      </div>

      <>
      {/* <MapTable/> */}
      </>
    </>
  );
};

export default User;
