import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, makeStyles, Modal, NativeSelect, TextField, Tooltip } from '@material-ui/core';
import styled from 'styled-components';
import { HighlightOff } from '@material-ui/icons';
import roomApi from '../../../api/roomApi';
import EditIcon from '@material-ui/icons/Edit';


function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    // border: '1px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalRoom({ roomData, buildingData, fetchData }) {
  const isEdit = roomData ? true : false

  const buildingProp = buildingData
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const [open, setOpen] = useState(false);

  const [roomName, setRoomName] = useState("")
  const [roomInfo, setRoomInfo] = useState("")
  const [building, setBuilding] = useState("")
  const [floor, setFloor] = useState(1)

  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAllDefault();
  };

  const setAllDefault = () => {
    setRoomName("")
    setRoomInfo("")
    setFloor(1)
    setBuilding(buildingProp._id)
    setErrorDefault()
  }
  const setErrorDefault = () => {
    setError("")
    setIsError(false)
  }
  const setData = (roomData) => {
    setRoomName(roomData.roomName)
    setRoomInfo(roomData.roomInfo)
    setFloor(roomData.floor)
    setBuilding(roomData.buildingId)
  }

  useEffect(() => {
    const setAllDefault = () => {
      setRoomName("")
      setRoomInfo("")
      setFloor(1)
      setBuilding(buildingProp._id)
    }
    const setData = (roomData) => {

      setRoomName(roomData.roomName)
      setRoomInfo(roomData.roomInfo)
      setFloor(roomData.floor)
      setBuilding(roomData.buildingId)
    }
    if (isEdit) {
      setData(roomData)
    } else {
      setAllDefault()
    }
  }, [roomData])

  const handleSave = async function () {
    setErrorDefault()
    setIsLoading(true)
    try {
      const response = await roomApi.create(
        {
          roomName: roomName,
          roomInfo: roomInfo,
          buildingId: building,
          floor: floor,
        }
      )
      await fetchData()
      setIsLoading(false)
      handleClose()
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
    setErrorDefault()
    setIsLoading(true)
    try {
      const response = await roomApi.edit(
        roomData._id,
        {
          roomName: roomName,
          roomInfo: roomInfo,
          buildingId: building,
          floor: floor,
        }
      )
      await fetchData()
      setIsLoading(false)
      handleClose()
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

  const options = []
  for (let i = 1; i <= buildingProp.numberFloor; i++) {
    options.push(<option value={i} key={i}>{i}</option>);
  }

  return (
    <>
      {
        !isEdit ?
          <StyledButtonCreate variant="contained" color="primary" onClick={handleOpen}> Create Room</StyledButtonCreate> :
          <Tooltip title="Edit">
            <IconButton size="small" color="primary" onClick={handleOpen}>
              <EditIcon />
            </IconButton>
          </Tooltip>
      }
      {open &&
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <StyledModal style={modalStyle} className={classes.paper}>

            <StyledNodalHeader>
              <StyledTextHeader> {!isEdit ? "Create Room" : "Edit Room"}</StyledTextHeader>
              <CloseModal onClick={handleClose}>
                <HighlightOff />
              </CloseModal>
            </StyledNodalHeader>

            <StyledGroupTextField>

              <StyledTextField
                required
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined-required"
                label="Room Name"
                variant="outlined"
                placeholder="Room Name"
                value={roomName}
                onChange={(e) => handleValue(e, setRoomName)}
              />

              <StyledTextField
                InputLabelProps={{
                  shrink: true,
                }}
                id="outlined"
                label="Room Info"
                variant="outlined"
                placeholder="Room Info"
                value={roomInfo}
                onChange={(e) => handleValue(e, setRoomInfo)}
              />
              <StyledFormControl >
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Building
             </InputLabel>
                <NativeSelect
                  value={building}
                  onChange={(e) => handleValue(e, setBuilding)}
                >
                  {<option value={buildingProp._id}>{buildingProp.buildingID} {buildingProp.buildingName} </option>}
                </NativeSelect>
                <FormHelperText>Select Building</FormHelperText>
              </StyledFormControl>

              <StyledFormControl >
                <InputLabel shrink htmlFor="age-native-label-placeholder">
                  Floor
             </InputLabel>
                <NativeSelect
                  value={floor}
                  onChange={(e) => handleValue(e, setFloor)}
                >
                  {
                    options
                  }
                </NativeSelect>
                <FormHelperText>Select Floor</FormHelperText>
              </StyledFormControl>
              {
                isLoading &&
                <CircularProgress style={{ marginBottom: "10px" }} />
              }

              {isError && (
                <StyledError>
                  {error}
                </StyledError>
              )}
              {!isEdit ?
                <StyledButton variant="contained" color="primary" onClick={handleSave}>Save </StyledButton> :
                <StyledButton variant="contained" color="primary" onClick={handleEdit}>Edit </StyledButton>
              }

            </StyledGroupTextField>
          </StyledModal>

        </Modal>
      }

    </>
  )
}

const StyledModal = styled.div`
  height:600px;
  overflow-y:scroll;
`

const StyledNodalHeader = styled.div`
display: flex;
align-items:center;
`
const StyledTextHeader = styled.h1`
  flex:1;
`

const CloseModal = styled.div`
  cursor: pointer;
`

const StyledFormControl = styled(FormControl)`
  width:100%;
  margin: 20px auto !important;
`
const StyledTextField = styled(TextField)`
  width: 100%;
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
const StyledButtonCreate = styled(Button)`
  height:40px;
  background-color: green !important;

`
const StyledError = styled.div`
margin-bottom:10px;
font-size:18px;
color:red;
`
export default ModalRoom

