import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, TextField } from '@material-ui/core';
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
  const [isLoading, setIsLoading] = useState(false)

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

          if (error.response) {
            // Request made and server responded
            const errorMessage = error.response.data.message
            console.log(error.response.data);
            setIsLoading(false)
            setIsError(true)
            setError(errorMessage)
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            setIsLoading(false)
            setIsError(true)
            setError(error.message)
          }
        }
      };
      fetchData();
    }
  }, [])

  const handleSave = async function () {
    setIsLoading(true)
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

      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsLoading(false)
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsLoading(false)
        setIsError(true)
        setError(error.message)
      }
    }
  }
  const handleEdit = async function () {
    setIsLoading(true)
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
      if (error.response) {
        // Request made and server responded
        const errorMessage = error.response.data.message
        console.log(error.response.data);
        setIsLoading(false)
        setIsError(true)
        setError(errorMessage)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        setIsLoading(false)
        setIsError(true)
        setError(error.message)
      }
    }
  }

  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }
  const handleValueFloor = (e) => {
    let floor = e.target.value;

    if (floor === '' || /^[0-9\b]+$/.test(floor)) {
      console.log(floor);
      setNumberFloor(floor)
    }
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
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          placeholder="Number Floor"
          value={numberFloor}
          onChange={(e) => handleValueFloor(e)}
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
        {
          isLoading &&
          <CircularProgress style={{ marginBottom: "10px" }} />
        }

        {isError && (
          <StyledError>
            {error}
          </StyledError>
        )}
        {isAdd ?
          <StyledButton variant="contained" color="primary" onClick={() => { if (window.confirm('Are you sure you wish to save this item?')) handleSave() }}>Save </StyledButton> :
          <StyledButton variant="contained" color="primary" onClick={() => { if (window.confirm('Are you sure you wish to edit this item?')) handleEdit() }}>Edit </StyledButton>
        }

      </StyledGroupTextField>



    </div >
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
const StyledError = styled.div`
margin-bottom:10px;
font-size:18px;
color:red;
`
export default Detail

