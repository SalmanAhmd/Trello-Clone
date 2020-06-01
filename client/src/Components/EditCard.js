import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

const EditCard = ({ id, text, getInput }) => {
  const [input, setInput] = useState(text);

  const submit = (e) => {
    setInput(e.target.value)
    getInput(e.target.value)
  }

  return (
    <TextField
      autoFocus id="outlined-secondary"
      fullWidth
      value={input}
      onChange={submit}

      color="secondary"
    />
  )
}

export default EditCard;