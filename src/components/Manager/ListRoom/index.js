import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import buildingApi from '../../../api/buildingApi';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, InputLabel, NativeSelect } from '@material-ui/core';
import ListRoomOnFloor from './ListRoomOnFloor';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import ModalRoom from './ModalRoom';
import styled from 'styled-components'
import { objectLength } from '../../../helper/helper';

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
  // const [floorData, setFloorData] = useState({})

  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await buildingApi.read(id)
      setData(response.data.listRoomByFloor);
      setBuildingData(response.data.item)
      setLoading(false)
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };

  const handleFloorChange = (event) => {
    setFloorSelect(event.target.value)
  };

  const getListRoom = () => {
    const result = data.filter(data => data.floorNumber == floorSelect);
    return result[0]
  }

  useEffect(() => {
    fetchData()
  }, []);
  const floorData = getListRoom()

  return (
    <>
      <StyledLink
        to="/manager"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>
      {
        !loading &&
        (
          <>
            <h1>Building Name: {buildingData.buildingName} {buildingData.buildingInfo ? `- ${buildingData.buildingInfo}` : ''}</h1>
            <h3>Number Floor: {buildingData.numberFloor}</h3>
            <StyledSelectCreate>
              <StyledSelect className={classes.formControl}>
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Floor
              </InputLabel>
                <NativeSelect
                  value={floorSelect}
                  onChange={handleFloorChange}
                >
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
              <ModalRoom buildingData={buildingData} fetchData={fetchData} />
            </StyledSelectCreate>
            <ListRoomOnFloor floorData={floorData} floorSelect={floorSelect} buildingData={buildingData} fetchData={fetchData} />

          </>
        )
      }
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
const StyledSelectCreate = styled.div`
  display:flex;
  align-items: center;
`
const StyledSelect = styled(FormControl)`
  flex:1;
  width:200px !important;
  >div{
    width: 200px;
  }
`

ListRoom.propTypes = {

}

export default ListRoom

