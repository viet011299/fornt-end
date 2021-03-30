import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MeterCard from './MeterCard'
import { TextField } from '@material-ui/core'

function Meter(props) {
  return (
    <div>
      <h1>
        List Meter
      </h1>
      <TextField
          id="outlined-full-width"
          label="Search"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
        />
      <StyledListCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
      </StyledListCard>
    </div>
  )
}

Meter.propTypes = {

}
const StyledListCard = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content: space-evenly;
`
export default Meter

