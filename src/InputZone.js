import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import './App.css';

export default function InputZone(props) {
  const { handleSendMessage } = props;
  function handleChatBoxKeyPress(event) {
    if (event.key === 'Enter') {
      const message = event.target.value;
      handleSendMessage(message);
    }
  }
  return (
    <Paper className="root">
      <InputBase
        className="input"
        placeholder="Enter Message..."
        inputProps={{ 'aria-label': 'Enter...' }}
        value={props.value}
        onKeyPress={handleChatBoxKeyPress}
        onChange={props.handleChange}

      />
      <IconButton className="iconButton" aria-label="Search">
        <SendIcon />
      </IconButton>
    </Paper>
  );
};
 