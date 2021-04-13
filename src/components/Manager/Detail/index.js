import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import buildingApi from '../../../api/buildingApi';



function Detail(props) {
  const id = props.match.params.id;
  const isAdd = (id == "create") ? true : false
  const [buildingId, setBuildingId] = useState("")
  const [numberFloor, setNumberFloor] = useState("")
  const [buildingName, setBuildingName] = useState("")
  const [error, setError] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!isAdd) {
      const fetchData = async () => {
        try {
          const response = await buildingApi.read(id)
          const item = response.data.item
          setBuildingId(item.buildingID ? item.buildingID : "")
          setNumberFloor(item.numberFloor ? item.numberFloor : "")
          setBuildingName(item.buildingName ? item.buildingName : "")
          console.log('Fetch building successfully: ', response);
        } catch (error) {
          console.log('Failed to fetch building list: ', error);
        }
      };
      fetchData();
    }
  }, [])

  const handleSave = async function () {
    try {
      const response = await buildingApi.create(
        {
          buildingID: buildingId,
          numberFloor: numberFloor,
          buildingName: buildingName
        }
      )
      history.push("/managers")
    } catch (error) {
      console.log(error);
    }
  }
  const handleEdit = async function () {
    try {
      const response = await buildingApi.edit(
        id,
        {
          buildingID: buildingId,
          numberFloor: numberFloor,
          buildingName: buildingName
        }
      )
      history.push("/managers")
    } catch (error) {
      console.log(error);
    }
  }
  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }
  return (
    <div>
      <StyledLink
        to="/managers"
      >
        <ArrowBack style={{ marginRight: '10px' }} /> Back
      </StyledLink>

      <StyledGroupTextField>
        <h1>{isAdd ? "Create Building" : "Edit Building"}</h1>
        <StyledTextField
          required
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-required"
          label="Building Id"
          variant="outlined"
          placeholder="Building Id"
          value={buildingId}
          onChange={(e) => handleValue(e, setBuildingId)}
        />

        <StyledTextField
          id="outlined-number"
          label="Number Floor"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          placeholder="Number Floor"
          value={numberFloor}
          onChange={(e) => handleValue(e, setNumberFloor)}
        />
        <StyledTextField
          InputLabelProps={{
            shrink: true,
          }}
          id="outlined-required"
          label="Building Name"
          variant="outlined"
          placeholder="Building Name"
          value={buildingName}
          onChange={(e) => handleValue(e, setBuildingName)}
        />
        <StyledTextField
          required
          error
          id="outlined-error-helper-text"
          label="Error"
          helperText="Incorrect entry."
          variant="outlined"
        />

        {isAdd ?
          <StyledButton variant="contained" color="primary" onClick={handleSave}>Save </StyledButton> :
          <StyledButton variant="contained" color="primary" onClick={handleEdit}>Edit </StyledButton>
        }
      </StyledGroupTextField>



    </div>
  )
}

Detail.propTypes = {

}
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
  text-align: start;
  display: flex;
  align-items: center;
`
const StyledTextField = styled(TextField)`
  width: 50%;
  margin: 20px auto !important;
`
const StyledGroupTextField = styled.div`
  display:flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`
const StyledButton = styled(Button)`
  width: 25%;
`
export default Detail

