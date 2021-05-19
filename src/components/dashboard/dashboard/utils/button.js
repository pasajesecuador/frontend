import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #254C70 30%, #346784 90%)',
    border: 0,
    borderRadius: 20,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 41,
    padding: '0 30px',
  },
});

export default function Btn(props) {
  const classes = useStyles();
  return <Button className={classes.root} onClick={props.onClick}>{props.label}</Button>;
}