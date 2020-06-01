import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { editStatus } from '../Actions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function SimpleSelect({ id, listID, dispatch, sta_tus }) {
  const classes = useStyles();
  const [status, setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
    dispatch(editStatus(id, listID, event.target.value))
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={sta_tus || status}
          onChange={handleChange}
          label="Status">
          <MenuItem selected value="Pending">Pending</MenuItem>
          <MenuItem value="In-Progress">In-Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Cancelled">Cancelled</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default connect()(SimpleSelect)