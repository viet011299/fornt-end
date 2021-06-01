import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import buildingApi from '../../api/buildingApi';
import ListFloor from './ListFloor';
import meterApi from '../../api/meterApi';
import { SocketContext } from '../../context/socket';
import { isEqualsDate, formatDate,MinuteDaysThanNow } from 'helper/helper'

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));



export default function ScrollableTabsButtonAuto() {

  const socket = useContext(SocketContext);
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [dataBuilding, setDataBuilding] = useState([])
  const [listMeter, setListMeter] = useState([])
  const [dataShow, setDataShow] = useState([])
  const dataMeterRef = useRef([])
  const [update, setUpdate] = useState(false)


  const fetchData = async () => {
    try {
      const response = await buildingApi.getAll()
      const getMeter = await meterApi.getAllMeterRom()
      dataMeterRef.current = getMeter.data.listData
      setListMeter(getMeter.data.listMeter)
      setDataBuilding(response.data);
      console.log('Fetch building successfully: ', getMeter.data.listData);
      return
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };


  useEffect(() => {
    async function getApi() {
      await fetchData()
      socket.on('new-data', (data) => {
        dataMeterRef.current.push(data)
        setUpdate(true)
      })
    }
    getApi()
    return () => {
      socket.off('new-data')
    }
  }, []);


  useEffect(() => {
    console.log("update", dataMeterRef.current);
    setDataShow(fillByMeter(listMeter, dataMeterRef.current))
    setUpdate(false)
  }, [dataMeterRef.current, listMeter, update])

  const fillByMeter = (listMeter, listMeterData) => {
    const result = {}
    listMeter.forEach((meter) => {
      const dataMeter = {
        meter,
        a: 0,
        v: 0,
        w: 0,
        kWh: 0,
        totalkWh: 0,
        data: [],
        status:"normal",
        timeCurrent: new Date() 
      }

      let useDay = []
      let totalkWh = 0
      listMeterData.forEach((data, index) => {
        if (meter.meterId == data.meterId) {
          dataMeter.data.push(data)
          if (isEqualsDate(data.time, new Date())) {
            useDay.push(data)
          }
        }
      })

      if(useDay.length>0){
        const length = useDay.length
        totalkWh= useDay[length- 1].kWh - useDay[0].kWh
      }
      dataMeter.totalkWh = parseFloat(totalkWh.toFixed(2))

      if (dataMeter.data[dataMeter.data.length - 1]) {
          dataMeter.kWh = dataMeter.data[dataMeter.data.length - 1].kWh
          dataMeter.w = dataMeter.data[dataMeter.data.length - 1].w
          dataMeter.a = dataMeter.data[dataMeter.data.length - 1].a
          dataMeter.v = dataMeter.data[dataMeter.data.length - 1].v
          dataMeter.timeCurrent = dataMeter.data[dataMeter.data.length - 1].time
          
          if(MinuteDaysThanNow(dataMeter.data[dataMeter.data.length - 1].time,5)){
            dataMeter.status="warning"
          }else{
            if(dataMeter.a>75 || dataMeter.v>242 || dataMeter.v<176){
              dataMeter.status="danger"
            }
          }
      }
      result[`${meter.roomId}`] = dataMeter
    })
    return result
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {
            dataBuilding.map((building, index) =>
            (
              <Tab label={`Building ${building.buildingName}`} {...a11yProps(index)} key={index} />
            )
            )
          }
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {
          dataBuilding.map((building, index) =>
          (
            <TabPanel value={value} index={index} dir={theme.direction} key={index}>
              {building.buildingName} {building.buildingInfo ? building.buildingInfo : ""}
              <ListFloor buildingData={building} dataMeter={dataShow} />
            </TabPanel>
          )
          )
        }


      </SwipeableViews>
    </div>
  );
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};