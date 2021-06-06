import React, { useContext, useEffect, useRef, useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons'
import moment from "moment"
import meterApi from '../../../api/meterApi';
import { SocketContext } from '../../../context/socket';
import Info from './Info';
import "react-datepicker/dist/react-datepicker.css";
import DatePickerData from './DatePicker';
import { Spin } from 'antd';
import { isEqualsDate, formatDate } from 'helper/helper'
import Warning from './Warning';
import { Button } from 'antd';
import Analytics from './Analytics';


function MeterInfo(props) {
  const socket = useContext(SocketContext);
  const meterId = props.match.params.id;
  const [selectionRange, setSelectionRange] = useState(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    }
  )
  const [meter, setMeter] = useState({})
  const [listData, setListData] = useState([])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)

  const [lastItem, setLastItem] = useState(null)
  const listDataRef = useRef([])
  const timeStartRef = useRef(new Date())
  const timeEndRef = useRef(new Date())
  const [isModalVisible, setIsModalVisible] = useState(false);


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
        type: "time",
        labels: {
          show: true,
          formatter: function (value) {
            return formatDate(value)
          },
          rotate: -20,
        },
        tickAmount: 15
      },
      tooltip: {
        shared: true,
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
      setIsLoading(true)
      const query = { startDate: selectionRange.startDate, endDate: selectionRange.endDate }
      timeStartRef.current = selectionRange.startDate
      timeEndRef.current = selectionRange.endDate
      const response = await meterApi.read(meterId, query)
      setMeter(response.data.item)
      setListData(response.data.listData)
      setLastItem(response.data.lastItem)
      listDataRef.current = response.data.listData
      setIsLoading(false)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsError(true)
        setError(error.message)
      }
      setIsLoading(false)
    }
  }
  useEffect(() => {
    async function getApi() {
      socket.on(`new-data-${meterId}`, (data) => {
        console.log(data);
        if (isEqualsDate(timeEndRef.current, new Date())) {
          listDataRef.current = [...listDataRef.current, data]
          setListData(listDataRef.current)
        }
        console.log(data);
        setLastItem(data)
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
    const fillData = listData
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

  const showModal = () => {
    setIsModalVisible(true);
  };
  const closeModal = () =>{
    setIsModalVisible(false)
  }
  return (
    <StyledInfo>
      {isError ? (
        <StyledError>
          {error}
        </StyledError>
      ) :
        <>
          <StyledLink
            to="/meters"
          >
            <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
          <StyledHeader>Meter {meterId}</StyledHeader>
          <TextLastItem> {lastItem && `Last update: ${formatDate(lastItem.time)}`}</TextLastItem>
          <Warning lastItem={lastItem} />
          <StyledDatePicker>
            <DatePickerData selectionRange={selectionRange} setSelectionRange={setSelectionRange} />
          </StyledDatePicker>
          {isLoading ?
            <>

              <StyledLoading>
                <Spin />
                <StyledTextLoading> Loading data</StyledTextLoading>
              </StyledLoading>
            </>
            :
            <>
              {listData.length > 0 ? <>
                <Button type="primary" onClick={showModal}>
                  Analytics
                </Button>
                {isModalVisible &&
                  <Analytics selectionRange={selectionRange} listData={listData} meterId={meterId} closeModal={closeModal} isModalVisible={isModalVisible}/>
                }

                <Info data={data} options={options} selectionRange={selectionRange} lastItem={lastItem} /> </>
                :
                <StyledSubHeader>No Data</StyledSubHeader>}
            </>
          }
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
  margin: auto;
}
`
const StyledError = styled.div`
margin-bottom:10px;
font-size:18px;
color:red;
text-align: center
`
const TextLastItem = styled.h3`
  text-align:end;
`
export default MeterInfo;