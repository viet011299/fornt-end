import React from 'react'
import PropTypes from 'prop-types'
import MeterCard from './MeterCard';
import styled from 'styled-components';
function ListCard({ listRooms }) {
  return (
    <>
      <StyledList>
        {listRooms.map(
          (meter, index) =>
            <MeterCard key={index} meter={meter} index={index}/>
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

