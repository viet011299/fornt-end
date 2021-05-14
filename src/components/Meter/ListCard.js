import React from 'react'
import PropTypes from 'prop-types'
import MeterCard from './MeterCard';
import styled from 'styled-components';
function ListCard({ listRooms, dataMeter }) {
    console.log(dataMeter);
  const getDataMeter = (room, dataMeter, index) => {
    const fill = dataMeter.filter(data => data.meter.roomId === room._id)
    if (fill.length > 0) {
      return <MeterCard key={index} room={room} index={index} meterData={fill[0]} />
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

