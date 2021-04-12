import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function MeterCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <StyledCard className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Id Meter
          </Typography>
        <Typography variant="h5" component="h2">
          Name meter
          </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Info meter
        </Typography>
      </CardContent>
      <CardActions>
        <StyledLink
          to="/meters/1"
        >
          Show
        </StyledLink>
      </CardActions>
    </StyledCard>
  )
}

MeterCard.propTypes = {

}
const StyledCard = styled(Card)`
  margin-bottom:20px;
`
const StyledLink = styled(Link)`
  color:#0085FF;
  text-decoration: none;
`
export default MeterCard

