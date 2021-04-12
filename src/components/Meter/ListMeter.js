import React from 'react'
import PropTypes from 'prop-types'
import MeterCard from './MeterCard'
import { Card, TextField } from '@material-ui/core'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

function ListMeter(props) {
  return (
    <>
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
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
        <MeterCard></MeterCard>
      </StyledListCard>
    </>
  )
}

ListMeter.propTypes = {

}
const StyledCard = styled(Card)`
  margin-bottom:20px;
`
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
`
const StyledListCard = styled.div`
  display:flex;
  flex-wrap:wrap;
  justify-content: space-evenly;
`
export default ListMeter

