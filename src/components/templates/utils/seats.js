import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Seats from '../assets/seatsIcon';
import clsx from 'clsx';

const useStyles = makeStyles({
  rootSeat: {
    display: 'flex',
    flexFlow: 'row wrap',
    margin: '25px auto',
    width: 300,
    borderRadius: 10,
    boxShadow: '0 1px 12px #4f4f4f'
  },
  rootSeatSide: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center',
    width: '45%',
    margin: '20px 10px 10px 0',
  },
  seatConrainer: {
    width: '30%',
    textAlign:'center',
    margin: 5,
    cursor: 'pointer',
    '&:hover': {
      '& path': {
        fill: '#46a800'
      }
    }
  },
  green: {
    '& path': {
      fill: '#46a800'
    }
  }
});

const seats = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
const seatsSecond = [16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

export default function SeatHook(props) {
  const classes = useStyles();
  return (
    <div className={classes.rootSeat}>
      <div className={classes.rootSeatSide}>
        {seats.map((k,i) => 
        <div className={clsx(classes.seatConrainer, [props.number === k ? classes.green : null])} 
          onClick={() => props.seatNumber(k)} key={i}><Seats /></div>
        )}
      </div>
      <div className={classes.rootSeatSide}>
        {seatsSecond.map((k,i) => 
        <div className={clsx(classes.seatConrainer, [props.number === k ? classes.green : null])}
          onClick={() => props.seatNumber(k)} key={i}><Seats /></div>
        )}
      </div>
    </div>
  );
}