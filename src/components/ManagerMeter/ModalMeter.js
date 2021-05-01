import React, { useEffect, useState } from 'react'
import { Button, CircularProgress, FormControl, FormHelperText, IconButton, InputLabel, makeStyles, Modal, NativeSelect, TextField, Tooltip } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import { HighlightOff } from '@material-ui/icons';
import styled from 'styled-components';
import meterApi from '../../api/meterApi';

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
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
function ModalMeter({ meterData, fetchData, listBuilding }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const [error, setError] = useState("")
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [roomId, setRoomId] = useState("")
  const [buildingId, setBuildingId] = useState("")
  const [floor, setFloor] = useState(0)

  const [buildings, setBuildings] = useState([])
  const [floors, setFloors] = useState([])
  const [rooms, setRooms] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAllDefault();
  };

  const setAllDefault = () => {
    setRoomId("")
    setBuildingId("")
    setFloor(0)
    setBuildings([])
    setFloors([])
    setRooms([])
    setErrorDefault()
  }
  const setErrorDefault = () => {
    setError("")
    setIsError(false)
  }
  const handleBuilding = (e, setValue) => {
    setFloor(0)
    setRoomId("")
    setValue(e.target.value)

  }
  const handleFloor = (e, setValue) => {
    setRoomId("")
    setValue(e.target.value)
  }
  const handleValue = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleEdit = async function () {
    setIsLoading(true)
    try {
      const response = await meterApi.edit(
        meterData._id,
        {
          roomId: roomId,
          buildingId: buildingId,
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

  const putBuildings = (list) => {
    const dataBuildings = []
    list.forEach(item => {
      dataBuildings.push(item.building)
    })
    setBuildings(dataBuildings)
  }

  const putFloors = (buildingId) => {
    const building = listBuilding.filter(item => item.building._id === buildingId)
    console.log("building", listBuilding);
    const options = []
    if (building.length > 0) {
      for (let i = 1; i <= building[0].building.numberFloor; i++) {
        options.push(<option value={i} key={i}>{i}</option>);
      }
    }

    setFloors(options)
  }

  const putRooms = (buildingId, floor) => {
    const building = listBuilding.filter(item => item.building._id === buildingId)
    const options = []
    if (building.length > 0) {
      const listFloors = building[0].listRoomByFloor.filter(item => item.floorNumber == floor)
      const listRooms = listFloors[0].listRooms
      listRooms.forEach((room, index) => {
        options.push(<option value={room._id} key={index}>{room.roomName} {room.roomInfo}</option>);
      })
    }
    setRooms(options)
  }

  useEffect(() => {
    putBuildings(listBuilding)
    setBuildingId(meterData.buildingId ? meterData.buildingId : "")
    setFloor(meterData.floor ? meterData.floor : 0)
    setRoomId(meterData.roomId ? meterData.roomId : "")
    if (buildingId != "") {
      putFloors(buildingId)
    }
    if (floor != 0) {
      putRooms(buildingId, floor)
    }
  }, [listBuilding, meterData])

  useEffect(() => {
    setFloors([])
    if (buildingId != "") {
      putFloors(buildingId)
    }
  }, [buildingId])

  useEffect(() => {
    setRooms([])
    if (floor != 0) {
      putRooms(buildingId, floor)
    }
  }, [floor])


  return (
    <>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={handleOpen}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <StyledModal style={modalStyle} className={classes.paper}>

          <StyledNodalHeader>
            <StyledTextHeader> Edit Meter</StyledTextHeader>
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
              id="outlined"
              label="Meter Id"
              variant="outlined"
              placeholder="Meter Id"
              value={meterData.meterId}
              disabled
            />


            <StyledFormControl >
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Building
              </InputLabel>
              <NativeSelect
                value={buildingId}
                onChange={(e) => handleBuilding(e, setBuildingId)}
              >
                <option value="" hidden>Chose Building</option>
                {
                  buildings.map((building, index) =>
                    <option value={building._id} key={index}>{building.buildingName}</option>
                  )
                }
              </NativeSelect>
              <FormHelperText>Select Building</FormHelperText>
            </StyledFormControl>



            <StyledFormControl >
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Floor
              </InputLabel>
              <NativeSelect
                value={floor}
                onChange={(e) => handleFloor(e, setFloor)}
                disabled={buildingId === ""}
              >
                <option value={0} hidden>Chose Floor</option>
                {
                  floors.map(floor => floor)

                }
              </NativeSelect>
              <FormHelperText>Select Floor</FormHelperText>
            </StyledFormControl>
            <StyledFormControl >
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Room
              </InputLabel>
              <NativeSelect
                value={roomId}
                onChange={(e) => handleValue(e, setRoomId)}
                disabled={buildingId === "" || floor == 0}
              >
                <option value="" hidden>Chose Room</option>
                {
                  rooms.map(floor => floor)
                }
              </NativeSelect>
              <FormHelperText>Select Room</FormHelperText>
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
            <StyledButton variant="contained" color="primary" onClick={handleEdit}>Edit </StyledButton>
          </StyledGroupTextField>
        </StyledModal>

      </Modal>
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
  width:70%;
  margin: 20px auto !important;
`
const StyledTextField = styled(TextField)`
  width: 70%;
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


export default ModalMeter

