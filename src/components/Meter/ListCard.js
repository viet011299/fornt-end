import React from 'react'
import PropTypes from 'prop-types'
import MeterCard from './MeterCard';
import styled from 'styled-components';
function ListCard({ listRooms, dataMeter }) {
    console.log(dataMeter);
  const getDataMeter = (room, dataMeter, index) => {
    const dataRoom=  dataMeter[`${room._id}`]
    if (dataRoom) {
      return <MeterCard key={index} room={room} index={index} meterData={dataRoom}/>
    }
    return <MeterCard key={index} room={room} index={index} />
  }

  return (
    <>
      <StyledList>
        {listRooms.map(
          (room, index) =>
            getDataMeter(room, dataMeter, index)
        )}
      </StyledList>
    </>
  )
}

ListCard.propTypes = {
  listRooms: PropTypes.array
}
const StyledList = styled.div`
  display:flex;
  flex-wrap:wrap;
`
export default ListCard

