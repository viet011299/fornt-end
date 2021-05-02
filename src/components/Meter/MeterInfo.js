import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons'
import io from "socket.io-client"
import meterApi from '../../api/meterApi';
import moment from "moment"
import { Box } from '@material-ui/core';
import { Statistic, Card, Row, Col } from 'antd';
const URL = "http://localhost:6969";
const formatDate = (date) => {
  const format = "HH:mm:ss DD-MM-YYYY"
  return moment(date).format(format);
}

function MeterInfo(props) {
  const meterId = props.match.params.id;
  const [meter, setMeter] = useState({})
  const [listData, setListData] = useState([])
  const [uData, setUData] = useState([])
  const [iData, setIData] = useState([])
  const [wData, setWData] = useState([])
  const [kWhData, setKWhData] = useState([])
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
    animations: {
      initialAnimation: {
        enabled: false
      }
    }
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
      data: wData
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
    animations: {
      initialAnimation: {
        enabled: false
      }
    }
  };

  const serieskWh = [
    {
      name: "kWh",
      data: kWhData
    }
  ]
  const optionskWh = {
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
    animations: {
      initialAnimation: {
        enabled: false
      }
    }
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
    const w = []
    const kWh = []
    listData.forEach(data => {
      u.push({ x: formatDate(data.time), y: data.v })
      i.push({ x: formatDate(data.time), y: data.a })
      w.push({ x: formatDate(data.time), y: data.w })
      kWh.push({ x: formatDate(data.time), y: data.kWh })
    })
    setUData(u)
    setIData(i)
    setWData(w)
    setKWhData(kWh)
  }
  const totalP = () => {
    let result = 0
    wData.forEach(w => {
      result += w.y
    })
    return result
  }


  return (
    <StyledInfo>
      <StyledLink
        to="/meters"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
      <StyledHeader>Meter {meter.meterId || ""}</StyledHeader>
      <Row gutter={18}>
        <Col span={8}>
          <Card>
            <Statistic
              title="P"
              value={wData.length>0? wData[wData.length-1].y : ""}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="W"
            />
          </Card> </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Total P in day"
              value={totalP()}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="W"
            />
          </Card> </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Energy"
              value={kWhData.length>0? kWhData[kWhData.length-1].y : ""}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="kWh"
            />
          </Card>
        </Col>
      </Row>
      <StyledSubHeader>Volt</StyledSubHeader>
      <ReactApexChart
        options={optionsU}
        series={seriesU}
        type="area"
        height={350}
      />
      <StyledSubHeader>Ampe</StyledSubHeader>
      <ReactApexChart
        options={optionsI}
        series={seriesI}
        type="area"
        height={350}
      />
      <ReactApexChart
        options={optionsW}
        series={seriesW}
        type="area"
        height={350}
      />

      <ReactApexChart
        options={optionskWh}
        series={serieskWh}
        type="area"
        height={350}
      />
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </StyledInfo >
  );
}
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
  text-align: start;
  display: flex;
`
const StyledHeader = styled.h1`
  text-align: center;
`
const StyledSubHeader = styled.h3`
  text-align: center;
  color:#0085FF;
`
const StyledInfo = styled.div`
  padding-top:10px;
`
const StyledListInfo = styled.div`

`
export default MeterInfo;