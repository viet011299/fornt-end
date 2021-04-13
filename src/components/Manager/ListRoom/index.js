import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import buildingApi from '../../../api/buildingApi';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FormControl, FormHelperText, InputLabel, NativeSelect, styled } from '@material-ui/core';
import ListRoomOnFloor from './ListRoomOnFloor';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function ListRoom(props) {
  const id = props.match.params.id;
  const classes = useStyles();

  const [data, setData] = useState([])
  const [buildingData, setBuildingData] = useState({})
  const [floorSelect, setFloorSelect] = useState(1)
  const fetchData = async () => {
    try {
      const response = await buildingApi.read(id)
      setData(response.data.listRoomByFloor);
      setBuildingData(response.data.item)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };
  const handleFloorChange = (event) => {
    setFloorSelect(event.target.value)
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
     <StyledLink
        to="/managers"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
      <h1>Building Id: {buildingData.buildingID}</h1>
      <h3>Number Floor: {buildingData.numberFloor}</h3>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Floor
        </InputLabel>
        <NativeSelect
          value={floorSelect}
          onChange={handleFloorChange}
        >
          {
            data.map(floor =>
              (
                <>
                  <option key={floor.floorNumber} value={floor.floorNumber}>{floor.floorNumber}</option>
                </>
              )
            )
          }
        </NativeSelect>
        <FormHelperText>Select Floor</FormHelperText>
      </FormControl>
      <ListRoomOnFloor />
    </>
  )
}

const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
  text-align: start;
  display: flex;
  align-items: center;
`

ListRoom.propTypes = {

}

export default ListRoom

