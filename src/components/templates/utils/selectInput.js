import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
  rootSelect: {
    background: '#ffffff',
    width: '100%',
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: 4,
    fontSize: '1rem',
    color: 'rgba(0, 0, 0, 0.54)',
    height: 56,
    padding: '0 10px',
    outline: 'none',
  },
});

export default function Select(props) {
  const styledSelect = useStyles();
  return(
    <select className={styledSelect.rootSelect} {...props}>
      {props.variants.map((value, index) =>
        <option key={index} value={value.key}>{value.value}</option>
      )}
    </select>
  );
}