import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons'
import moment from "moment"
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import meterApi from '../../../api/meterApi';
import { SocketContext } from '../../../context/socket';
import GaugeChart from 'react-gauge-chart'
import ApexCharts from 'apexcharts';
import Info from './Info';
import { Button, CircularProgress } from '@material-ui/core';
import MaterialUIPickers from './dataPicker';

const formatDate = (date) => {
  const format = "HH:mm:ss DD-MM-YYYY"
  return moment(date).format(format);
}

function MeterInfo(props) {
  const socket = useContext(SocketContext);
  const meterId = props.match.params.id;
  const [meter, setMeter] = useState({})
  const [listData, setListData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const listDataRef = useRef([])
  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const [options, setOptions] = useState(
    {
      chart: {
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: false,
            customIcons: []
          },
        }
      },
      stroke: {
        curve: 'smooth'
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
      },
      xaxis: {
        type: "category",
        labels: {
          show: true,
          formatter: function (value) {
            return formatDate(value)
          },
          rotate: -20,
        },
        tickAmount: 10
      },
      tooltip: {
        x: {
          format: "HH:mm:ss dd/MM/yy",
        },
      }
    }
  )
  const [data, setData] = useState({
    u: [],
    i: [],
    w: [],
    kWh: []
  })
  const fetchData = async () => {
    try {
      const response = await meterApi.read(meterId)
      setIsLoading(true)
      setMeter(response.data.item)
      setListData(response.data.listData)
      listDataRef.current = response.data.listData
      console.log('Fetch building successfully: ', response);
      return response.data
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  }
  useEffect(() => {
    async function getApi() {
      await fetchData()
      socket.on(`new-data-${meterId}`, (data) => {
        listDataRef.current = [...listDataRef.current, data]
        setListData(listDataRef.current)
      })
    }
    getApi()
    return () => {
      socket.off(`new-data-${meterId}`)
    }
  }, [])
  useEffect(() => {
    setDataMeter()
  }, [listData])

  const setDataMeter = () => {
    const u = []
    const i = []
    const w = []
    const kWh = []
    const fillData = listData.slice(-100)
    fillData.forEach(data => {
      u.push({ x: data.time, y: data.v })
      i.push({ x: data.time, y: data.a })
      w.push({ x: data.time, y: data.w })
      kWh.push({ x: data.time, y: data.kWh })
    })
    const data = { i, u, w, kWh }
    setData(data)
    setIsLoading(false)
  }


  const currentData = useMemo(() => {

  }, [])

  return (
    <StyledInfo>
      <StyledLink
        to="/meters"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
      <StyledHeader>Meter {meter.meterId || ""}</StyledHeader>
      {isLoading ?
        <>
          <StyledLoading>
            <CircularProgress style={{ marginBottom: "10px" }} />
            <StyledTextLoading> Loading data</StyledTextLoading>
          </StyledLoading>
        </>
        :
        <>
          <Button>1 month</Button>
          <MaterialUIPickers />
          <Info data={data} options={options} />
        </>
      }

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
const StyledLoading = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const StyledTextLoading = styled.h2`

`
export default MeterInfo;