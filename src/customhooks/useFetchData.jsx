// import {useEffect,useState} from 'react'

// const useFetchData = (url) => {
//     const [fetchData,setFetchData]=useState([]);

//     useEffect(() => {
//         const getFetchData = async () => {
//             try {
//                 const response=await fetch("https://disease.sh/v3/covid-19/countries");
//                 const data=await response.json();
//                 setFetchData(data);   
//             } catch (error) {
//                 setFetchData([]);   
//             }
//           };
//           getFetchData(); 
//     }, [url])
    
//     return fetchData;
// }

// export default useFetchData


import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (selcountries, date) => {
  const [data, setData] = useState({
    countries: [],
    province: [],
    selectprovince: [],
    totalResByCountry: {},
    location: [20.5937, 78.9629],
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [regionsRes, provincesRes, totalRes] = await Promise.all([
          axios.get(`https://covid-api.com/api/regions`),
          axios.get(`https://covid-api.com/api/provinces/${selcountries}`),
          axios.get(
            `https://covid-api.com/api/reports/total?date=${date}&iso=${selcountries}`
          ),
        ]);

        setData((prevState) => ({
          ...prevState,
          countries: regionsRes.data.data,
          province: provincesRes.data.data,
          totalResByCountry: totalRes.data.data,
          location: provincesRes.data.data.length
            ? [provincesRes.data.data[0].lat, provincesRes.data.data[0].long]
            : prevState.location,
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, [selcountries, date]);

  useEffect(() => {
    const fetchProvinceData = async () => {
      try {
        const res = await axios.get(
          `https://covid-api.com/api/reports?date=${date}&iso=${selcountries}`
        );
        setData((prevState) => ({
          ...prevState,
          selectprovince: res.data.data || [],
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProvinceData();
  }, [selcountries, date]);

  return data;
};

export default useFetchData;
