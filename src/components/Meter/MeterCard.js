import React from 'react';
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

const colorCard = {
  "1": "#20E600",
  "0": "gray",
  "2": "#D81418"
}
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
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

function MeterCard({ meter, index }) {
  let history = useHistory();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShow = () => {
    history.push(`/meters/${meter.meterId}`);
  };

  return (
    <StyledCard className={classes.root} index={index}>
      <StyledCardHeader
        avatar={
          <HomeIcon />
        }
        title={`Room ${meter.roomName}`}
        subheader={meter.roomInfo}
        co
      />
      <CardContent>
        {index == 1 &&
          <>
            <Typography variant="h6">
              P: 45 W
        </Typography>
            <Typography variant="h6">
              Total P: 2800.50 W
        </Typography>
        
        <Typography variant="h6">
        Total Energy: 2.7 kWh
        </Typography>
          </>
        }
        {index == 2 &&
          <>
            <Typography variant="h6">
              P: 10000 W
            </Typography>
            <Typography variant="h6">
              Total P: 1000000 W
            </Typography>
            <Typography variant="h6">
              Total Energy: 2 kWh
            </Typography>
          </>
        }
        {index == 0 &&
          <>
            <Typography variant="h6">
              P: - W
        </Typography>
            <Typography variant="h6">
              Total P: - W
        </Typography>
            <Typography variant="h6">
            Total Energy: - kWh
        </Typography>
          </>
        }
        {index == 3 &&
          <>
            <Typography variant="h6">
              P: 0 W
        </Typography>
            <Typography variant="h6">
              Total P: 11100 W
        </Typography>
            <Typography variant="h6">
            Total Energy: 3.68 kWh
        </Typography>
          </>
        }

      </CardContent>
      <CardActions disableSpacing>
        {
          !meter.meterId &&
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
  meter: PropTypes.object
}
const StyledCard = styled(Card)`
  margin: 10px 20px;
  // background-color:#20E600 !important;
  background-color: ${props => colorCard[props.index]}!important;
`
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
`
const StyledCardHeader = styled(CardHeader)`
  background-color:silver;
`

export default MeterCard

