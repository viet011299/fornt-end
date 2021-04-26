import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons'
import io from "socket.io-client"
import meterApi from '../../api/meterApi';
// MeterInfo.propTypes = {

// };
const URL = "http://localhost:6969";
// const socket = io(URL)
function MeterInfo(props) {
  const meterId = props.match.params.id;
  const [meter, setMeter] = useState([])
  const [listData, setListData] = useState([])
  const [uData, setUData] = useState([])
  const [iData, setIData] = useState([])
  const series = [
    {
      name: "U",
      data: [
        222,
        240,
        222.2,
        222.34,
        230.20,
        0,
        224,
      ],
    },
    // {
    //   name: "I",
    //   data: [28, 284, 9394, 42710, 76026, 191853, 501538, 1029651, 1255481],
    // },
    // {
    //   name: "W",
    //   data: [17, 259, 1666, 2996, 6472, 49675, 140658, 238619, 269567],
    // },
  ];
  const seriesU = [
    {
      name: "V",
      data: uData
    }
  ]
  const optionsU = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
    },
    tooltip: {
      x: {
        format: "HH:mm:ss dd/MM/yy",
      },
    },
  };
  const seriesI = [
    {
      name: "A",
      data: iData
    }
  ]
  const optionsI = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
    },
    tooltip: {
      x: {
        format: "HH:mm:ss dd/MM/yy",
      },
    },
  };

  const seriesW = [
    {
      name: "W",
      data: uData
    }
  ]
  const optionsW = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "date",
    },
    tooltip: {
      x: {
        format: "HH:mm:ss dd/MM/yy",
      },
    },
  };
  
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "1/22/20",
        "2/1/20",
        "2/15/20",
        "3/1/20",
        "3/15/20",
        "4/1/20",
        "4/15/20",
        "5/1/20",
        "5/7/20",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy",
      },
    },
  };
  const fetchData = async () => {
    try {
      const response = await meterApi.read("607c966ce5b60905003ac918")
      console.log(response.data);
      setMeter(response.data.item)
      setListData(response.data.listData)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  }
  useEffect(() => {
    fetchData();
    // socket.on('updateData',(data)=>{
    //   setMeter([...meter,data])
    //   console.log(data);
    // }) 
  }, [])
  useEffect(() => {
    setData()
  }, [listData])

  const setData = () => {
    const u = []
    const i = []
    listData.forEach(data => {
      u.push({ x: data.time,y: data.v })
      i.push({ x:data.time, y:data.a})
    })
    console.log(u);
    setUData(u)
    setIData(i)
  }
  return (
    <div
      style={{
        backgroundColor: "white",
      }}
    >
      <StyledLink
        to="/meters"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
      <h1>Meter {meterId}</h1>
      <br />

      <ReactApexChart
        options={optionsU}
        series={seriesU}
        type="area"
        height={350}
      />
      <ReactApexChart
        options={optionsI}
        series={seriesI}
        type="area"
        height={350}
      />
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
}
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
  text-align: start;
  display: flex;
`
export default MeterInfo;