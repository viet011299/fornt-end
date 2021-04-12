import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import buildingApi from '../../../api/buildingApi';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function ListRoom(props) {
  const id = props.match.params.id;
  const [data, setData] = useState([])
  const [value, setValue] = useState(0);
  const fetchData = async () => {
    try {
      const response = await buildingApi.read(id)
      setData(response.data.listRoomByFloor);
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
     <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Floor 1" {...a11yProps(0)} />
          <Tab label="Floor 2" {...a11yProps(1)} />
          <Tab label="Floor 3" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      {
        data.map(floor =>
        (

          <>
            <div key={floor.floorNumber}>{floor.floorNumber}</div>
            {
              floor.listRooms.map(room=>(
                <>
                 <div key={room._id}>{room.roomId}</div>
                </>
              ))
            }
          </>
        )
        )
      }
      
    </>



  )
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
ListRoom.propTypes = {

}

export default ListRoom

