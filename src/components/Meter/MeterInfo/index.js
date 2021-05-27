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
import { CircularProgress } from '@material-ui/core';
import "react-datepicker/dist/react-datepicker.css";
import DatePickerData from './DatePicker';


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
  const [selectionRange, setSelectionRange] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  )
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
      const query = { startDate: selectionRange.startDate, endDate: selectionRange.endDate }
      const response = await meterApi.read(meterId, query)
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
  useEffect(() => {
    async function getApi() {
      await fetchData()
    }
    getApi()
  }, [selectionRange])

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
      <StyledDatePicker>
        <DatePickerData selectionRange={selectionRange} setSelectionRange={setSelectionRange} />
      </StyledDatePicker>
      {isLoading ?
        <>
          <StyledLoading>
            <CircularProgress style={{ marginBottom: "10px" }} />
            <StyledTextLoading> Loading data</StyledTextLoading>
          </StyledLoading>
        </>
        :
        <>

          {listData.length > 0 ? <Info data={data} options={options} /> : <StyledSubHeader>No Data</StyledSubHeader>}
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
const StyledDatePicker = styled.div`
margin: 20px 0;
display: flex;
justify-items: center;
>div{
  margin: auto
}
`
export default MeterInfo;