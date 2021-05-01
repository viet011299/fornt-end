import React from 'react'
import styled from 'styled-components';
import ScrollableTabsButtonAuto from './ScrollableTabsButtonAuto'

function ListMeter(props) {
  return (
    <>
      <StyledHeader>
        List Meter
    </StyledHeader>
      <ScrollableTabsButtonAuto />
    </>
  )
}

ListMeter.propTypes = {
}
const StyledHeader = styled.h1`
  text-align: center;
`
export default ListMeter

