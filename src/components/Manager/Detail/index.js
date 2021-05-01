import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { ArrowBack } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import buildingApi from '../../../api/buildingApi';



function Detail(props) {
  const id = props.match.params.id;
  const isAdd = (id === "create") ? true : false
  const [buildingName, setBuildingName] = useState("")
  const [numberFloor, setNumberFloor] = useState("")
  const [buildingInfo, setBuildingInfo] = useState("")
  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const history = useHistory()

  const setErrorDefault = () => {
    setError("")
    setIsError(false)
  }

  useEffect(() => {
    if (!isAdd) {
      const fetchData = async () => {
        try {
          const response = await buildingApi.read(id)
          const item = response.data.item
          setBuildingName(item.buildingName ? item.buildingName : "")
          setNumberFloor(item.numberFloor ? item.numberFloor : "")
          setBuildingInfo(item.buildingInfo ? item.buildingInfo : "")
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
          buildingName: buildingName,
          numberFloor: numberFloor,
          buildingInfo: buildingInfo
        }
      )
      history.push("/manager")
    } catch (error) {
      
      console.log(error);
    }
  }
  const handleEdit = async function () {
    try {
      const response = await buildingApi.edit(
        id,
        {
          buildingName: buildingName,
          numberFloor: numberFloor,
          buildingInfo: buildingInfo
        }
      )
      history.push("/manager")
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
        to="/manager"
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
          label="Building Name"
          variant="outlined"
          placeholder="Building Name"
          value={buildingName}
          onChange={(e) => handleValue(e, setBuildingName)}
        />

        <StyledTextField
          required
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
          label="Building Info"
          variant="outlined"
          placeholder="Building Info"
          value={buildingInfo}
          onChange={(e) => handleValue(e, setBuildingInfo)}
        />
        {/* <StyledTextField
          required
          error
          id="outlined-error-helper-text"
          label="Error"
          helperText="Incorrect entry."
          variant="outlined"
        /> */}

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

