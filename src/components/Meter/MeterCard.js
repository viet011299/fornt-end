import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { red } from '@material-ui/core/colors';
import { } from '@material-ui/icons';
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom';
import { Tooltip, Typography } from '@material-ui/core';
import { MinuteDaysThanNow } from 'helper/helper'

const colorCard = {
  "normal": "white",
  "danger": "#D81418",
  "warning": "#FFBA42"
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function MeterCard({ room, meterData, index }) {
  let history = useHistory();
  const classes = useStyles();
  const handleShow = () => {
    history.push(`/meters/${meterData.meter.meterId}`);
  };
  const [isWarning, setIsWarning] = useState(false)
  const timeCurrent = useRef(null)
  timeCurrent.current = meterData ? meterData.timeCurrent : new Date()
  useEffect(() => {
    const intervalId = setInterval(() => {
      check()
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])
  
  const check = () => {
    if (MinuteDaysThanNow(timeCurrent.current, 5)) {
      setIsWarning(true)
    } else {
      setIsWarning(false)
    }
  }
  return (
    <StyledCard className={classes.root} meterData={meterData} isWarning={isWarning}>
      <StyledCardHeader
        avatar={
          <HomeIcon />
        }
        title={`Room ${room.roomName}`}
        subheader={room.roomInfo}
      />
      <CardContent>
        {meterData ?
          <>
            <Typography variant="h6">
              U: {meterData.v} V
        </Typography>
            <Typography variant="h6">
              I: {meterData.a} A
        </Typography>
            <Typography variant="h6">
              P: {meterData.w} W
        </Typography>

            <Typography variant="h6">
            Total Energy: {meterData.kWh} kWh
        </Typography>

            <Typography variant="h6">
              Day Energy: {meterData.totalkWh} kWh
        </Typography>
          </> :
          <>
            <Typography variant="h6">
              U: - V
        </Typography>
            <Typography variant="h6">
              I: - A
        </Typography>
            <Typography variant="h6">
              P: - W
            </Typography>

            <Typography variant="h6">
              Energy: - kWh
              </Typography>

            <Typography variant="h6">
              Day Energy: - kWh
            </Typography>
          </>
        }
      </CardContent>
      <CardActions disableSpacing>
        {
          meterData &&
          <Tooltip title="View">
            <IconButton aria-label="add to favorites" onClick={handleShow}>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        }
      </CardActions>
    </StyledCard>
  )
}

MeterCard.propTypes = {
  room: PropTypes.object
}
const StyledCard = styled(Card)`
  margin: 10px 20px;
  // background-color:#20E600 !important;
  background-color: ${props => props.meterData && colorCard[props.meterData.status]}!important;
  background-color: ${props => props.isWarning && colorCard["warning"]}!important;
  background-color: ${props => !props.meterData && "gray"}!important;
  min-height: 100px;
`
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
`
const StyledCardHeader = styled(CardHeader)`
  background-color:silver;
`

export default MeterCard

