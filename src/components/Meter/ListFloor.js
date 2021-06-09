import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import buildingApi from '../../api/buildingApi';
import styled from 'styled-components';
import io from "socket.io-client"
import ListCard from './ListCard';
import { SocketContext } from '../../context/socket';
import { FormControl, FormHelperText, InputLabel, makeStyles, NativeSelect } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function ListFloor({ buildingData, dataMeter }) {
  const classes = useStyles();
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [floorData, setFloorData] = useState([])
  const [floorSelect, setFloorSelect] = useState("0")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await buildingApi.read(buildingData._id)
        setData(response.data.listRoomByFloor);
        console.log('Fetch building successfully: ', response);
      } catch (error) {
        console.log('Failed to fetch building list: ', error);
      }
    };
    fetchData()
    setLoading(false)

  }, []);

  useEffect(() => {
    const getListRoom = () => {
      if (floorSelect == 0) {
        return data
      }
      const result = data.filter(floor => floor.floorNumber == floorSelect);
      return result
    }
    setFloorData(getListRoom());
  }, [data, floorSelect]);


  const handleFloorChange = (event) => {
    setFloorSelect(event.target.value)
  };



  return (
    <>
      <StyledSelect className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Floor
              </InputLabel>
        <NativeSelect
          value={floorSelect}
          onChange={handleFloorChange}
        >
          <option value="0">All</option>
          {
            data.map((floor, index) =>
            (
              <option key={index} value={floor.floorNumber}>{floor.floorNumber}</option>
            )
            )
          }
        </NativeSelect>
        <FormHelperText>Select Floor</FormHelperText>
      </StyledSelect>
      {
        !loading &&
        floorData.map((floor, index) => (
          floor.listRooms.length !== 0 && (
            <StyledFloor key={index}>
              <TextFloor>
                Floor {floor.floorNumber}
              </TextFloor>
              <ListCard listRooms={floor.listRooms} dataMeter={dataMeter} />
            </StyledFloor>
          )
        )
        )
      }
    </>
  )
}

ListFloor.propTypes = {
  buildingData: PropTypes.object
}
const StyledFloor = styled.div`
  border: 1px solid;
  padding:10px;
  margin-bottom: 20px;
`
const TextFloor = styled.h3`
  border-bottom: 1px solid;
`
const StyledSelect = styled(FormControl)`
  flex:1;
  width:200px !important;
  >div{
    width: 200px;
  }
`

export default ListFloor

