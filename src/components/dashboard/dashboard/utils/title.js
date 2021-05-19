import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    position: 'relative',
    marginTop: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& h1': {
      fontWeight: 300,
    }
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
  btn: {
    background: 'linear-gradient(45deg, #282c34d4 30%, #2f5060 90%)',
    border: 0,
    borderRadius: 5,
    color: 'white',
    height: 38,
    padding: '10px 30px',
  },
})

export default function Title(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div>
        <h1>
          {props.label}
        </h1>
      </div>
      {props.add !== undefined && props.add ? (
        <div className={classes.buttonContainer}>
          <Button startIcon={<AddIcon />} className={classes.btn}>{props.btnlabel}</Button>
        </div>
      ) : null}
    </div>
  )
}
