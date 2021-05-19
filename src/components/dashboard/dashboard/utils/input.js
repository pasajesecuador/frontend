import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    background: '#ffffff',
    borderRadius: 10,
    boxShadow: '0 0 3px 0px #b0b0b0',
    border: '2px solid #BEC8F7',
    width: '100%',
    height: 45,
    padding: '0 20px',
    color: '#4f4f4f',
    fontWeight: 600,
    fontFamily: `'Open Sans', sans-serif`,
    fontSize: 16,
    boxSizing: 'border-box',
    '&:focus': {
      outline: 'none'
    }
  },
});

export default function Input(props) {
  const classes = useStyles();

  return <input className={classes.root} {...props} />;
}