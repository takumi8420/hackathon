import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './addChannelIcon.css'

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">

      <Button variant="contained" className="custom-button">Add Channel</Button>

    </Stack>
  );
}