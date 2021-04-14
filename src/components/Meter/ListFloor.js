import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import buildingApi from '../../api/buildingApi';
import styled from 'styled-components';

import ListCard from './ListCard';

function ListFloor({ buildingData }) {
  const idBuilding = buildingData._id

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [floorData, setFloorData] = useState([])
  const [floorSelect, setFloorSelect] = useState(0)

  useEffect(async () => {
    await fetchData()
    setLoading(false)
  }, []);

  useEffect(async () => {
    setFloorData(getListRoom());
  }, [data, floorSelect]);

  const getListRoom = () => {
    if (floorSelect == 0) {
      return data
    }
    const result = data.filter(floor => floor.floorNumber == floorSelect);
    return result
  }

  const fetchData = async () => {
    try {
      const response = await buildingApi.read(idBuilding)
      setData(response.data.listRoomByFloor);
      console.log('Fetch building successfully: ', response);
    } catch (error) {
      console.log('Failed to fetch building list: ', error);
    }
  };
  return (
    <>
      {
        !loading &&
        floorData.map((floor, index) => (
          floor.listRooms.length != 0 && (
            <StyledFloor key={index}>
              <TextFloor>
                Floor {floor.floorNumber}
              </TextFloor>
              <ListCard listRooms={floor.listRooms} />
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
const TextFloor = styled.h4`
  border-bottom: 1px solid;
`

export default ListFloor

