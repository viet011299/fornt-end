import React, { useContext, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import ReactApexChart from "react-apexcharts";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons'
import meterApi from '../../api/meterApi';
import moment from "moment"
import { Statistic, Card, Row, Col } from 'antd';
import { SocketContext } from '../../context/socket';


const formatDate = (date) => {
  const format = "HH:mm:ss DD-MM-YYYY"
  return moment(date).format(format);
}

function MeterInfo(props) {
  const socket = useContext(SocketContext);
  const meterId = props.match.params.id;
  const [meter, setMeter] = useState({})
  const [listData, setListData] = useState([])
  const [data, setData] = useState({
    u: [],
    i: [],
    w: [],
    kWh: []
  })
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
      type: 'line',
      data: data.u
    }
  ]
  const optionsU = {
    title: {
      text: 'Volt',
      align: 'center'
    },
    stroke: {
      curve: 'smooth'
    },
    dataLabels: {
      enabled: false,
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
      data: data.i
    }
  ]
  const optionsI = {
    title: {
      text: 'Ampe',
      align: 'center'
    },
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
      data: data.w
    }
  ]
  const optionsW = {
    title: {
      text: 'P',
      align: 'center'
    },
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
      data: data.kWh
    }
  ]
  const optionskWh = {
    title: {
      text: 'Energy',
      align: 'center'
    },
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
    chart: {
      id: 'realtime',
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: 'Dynamic Updating Chart',
      align: 'left'
    },
    markers: {
      size: 0
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
    yaxis: {
      max: 100
    },
    legend: {
      show: false
    },
  }

  // const options = {
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   stroke: {
  //     curve: "smooth",
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     categories: [
  //       "1/22/20",
  //       "2/1/20",
  //       "2/15/20",
  //       "3/1/20",
  //       "3/15/20",
  //       "4/1/20",
  //       "4/15/20",
  //       "5/1/20",
  //       "5/7/20",
  //     ],
  //   },
  //   tooltip: {
  //     x: {
  //       format: "dd/MM/yy",
  //     },
  //   },
  // };
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

    // const socket = socketIOClient(ENDPOINT);
    // socket.on("FromAPI", data => {
    //   console.log(data)
    // });
  }, [])
  useEffect(() => {
    socket.on('new-data',(data)=>{
      const listDataClone = listData
      listDataClone.push(data)
      setListData(listDataClone)
    }) 
    setDataMeter()

  }, [listData])

  const setDataMeter = () => {
    const u = []
    const i = []
    const w = []
    const kWh = []
    const fillData = listData.slice(-10)
    console.log(listData);
    fillData.forEach(data => {
      u.push({ x: formatDate(data.time), y: data.v })
      i.push({ x: formatDate(data.time), y: data.a })
      w.push({ x: formatDate(data.time), y: data.w })
      kWh.push({ x: formatDate(data.time), y: data.kWh })
    })
    const data = { i, u, w, kWh }
    setData(data)
  }
  const totalP = () => {
    let result = 0
    data.w.forEach(w => {
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
              value={data.w.length > 0 ? data.w[data.w.length - 1].y : ""}
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
              value={data.kWh.length > 0 ? data.kWh[data.kWh.length - 1].y : ""}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              suffix="kWh"
            />
          </Card>
        </Col>
      </Row>

      <ReactApexChart
        type="line"
        options={optionsU}
        series={seriesU}
        height={350}
      />

      <ReactApexChart
        type="line"
        options={optionsI}
        series={seriesI}

        height={350}
      />
      <ReactApexChart
        type="line"
        options={optionsW}
        series={seriesW}

        height={350}
      />

      <ReactApexChart
        type="line"
        options={optionskWh}
        series={serieskWh}

        height={350}
      />
      <ReactApexChart
        options={options}
        series={series}

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