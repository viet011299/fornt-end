import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, FormControl, FormHelperText, InputLabel, makeStyles, Modal, NativeSelect, Select, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HighlightOff } from '@material-ui/icons';
import roomApi from '../../../api/roomApi';



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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [roomId, setRoomId] = useState("")
  const [roomName, setRoomName] = useState("")
  const [building, setBuilding] = useState("")
  const [floor, setFloor] = useState(1)
  const [smartMeter, setSmartMeter] = useState("")

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
    setRoomId("")
    setRoomName("")
    setSmartMeter("")
    setFloor(1)
    setBuilding(buildingProp._id)
  }
  const setData = (roomData) => {
    setRoomId(roomData.roomId)
    setRoomName(roomData.roomName)
    setSmartMeter(roomData.smartMeter)
    setFloor(roomData.floor)
    setBuilding(roomData.buildingId)
  }
  useEffect(() => {
    if (isEdit) {
      setData(roomData)
    } else {
      setAllDefault()
    }
  }, [])
  const handleSave = async function () {
    console.log({
      roomId: roomId,
      roomName: roomName,
      buildingId: building,
      floor: floor,
      smartMeter: smartMeter
    });
    try {
      const response = await roomApi.create(
        {
          roomId: roomId,
          roomName: roomName,
          buildingId: building,
          floor: floor,
          smartMeter: smartMeter
        }
      )
      await fetchData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  }

  const handleEdit = async function () {
    try {
      const response = await roomApi.edit(
        roomData._id,
        {
          roomId: roomId,
          roomName: roomName,
          buildingId: building,
          floor: floor,
          smartMeter: smartMeter
        }
      )
      await fetchData()
      handleClose()
    } catch (error) {
      console.log(error);
    }
  }

  const options = []
  for (let i = 1; i <= buildingProp.numberFloor; i++) {
    options.push(<option value={i}>{i}</option>);
  }


  return (
    <>
      {
        !isEdit ?
          <StyledButtonCreate variant="contained" color="primary" onClick={handleOpen}> Create Room</StyledButtonCreate> :
          <Button variant="contained" color="primary" style={{ marginLeft: "10px" }} onClick={handleOpen}>
            Edit
           </Button>
      }
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
              label="Room Id"
              variant="outlined"
              placeholder="Room Id"
              value={roomId}
              onChange={(e) => handleValue(e, setRoomId)}
            />

            <StyledTextField
              InputLabelProps={{
                shrink: true,
              }}
              id="outlined"
              label="Room Name"
              variant="outlined"
              placeholder="Room Name"
              value={roomName}
              onChange={(e) => handleValue(e, setRoomName)}
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

            <StyledFormControl >
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Smart Meter
              </InputLabel>
              <NativeSelect
                value={smartMeter}
                onChange={(e) => handleValue(e, setSmartMeter)}
              >
                <option> </option>
                <option>E3 </option>
              </NativeSelect>
              <FormHelperText>Select Smart Meter</FormHelperText>
            </StyledFormControl>
            <StyledTextField
              required
              error
              id="outlined-error-helper-text"
              label="Error"
              helperText="Incorrect entry."
              variant="outlined"
            />
            {!isEdit ?
              <StyledButton variant="contained" color="primary" onClick={handleSave}>Save </StyledButton> :
              <StyledButton variant="contained" color="primary" onClick={handleEdit}>Edit </StyledButton>
            }

          </StyledGroupTextField>
        </StyledModal>

      </Modal>
    </>
  )
}

ModalRoom.propTypes = {

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
export default ModalRoom

