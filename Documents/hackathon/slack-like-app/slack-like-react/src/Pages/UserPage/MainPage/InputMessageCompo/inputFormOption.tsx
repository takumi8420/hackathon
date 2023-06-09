import * as React from 'react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonsMultiple() {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic']);

  const handleFormat = (
    event: React.MouseEvent<HTMLElement>,
    newFormats: string[],
  ) => {
    setFormats(newFormats);
  };

  return (
    <div style={{ height: "38px", width: "119px"}}>
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
      aria-label="text formatting"
      // style={{ height: "30px", width: "120px"}}
    >
      <ToggleButton value="bold" aria-label="bold" style={{ height: "40px", width: "40px"}}>
        <FormatBoldIcon />
      </ToggleButton>
      <ToggleButton value="italic" aria-label="italic" style={{ height: "40px", width: "40px"}}>
        <FormatItalicIcon />
      </ToggleButton>

      <ToggleButton value="underlined" aria-label="underlined" style={{ height: "40px", width: "40px"}}>
        <FormatUnderlinedIcon />
      </ToggleButton>

      {/* <ToggleButton value="color" aria-label="color" disabled style={{ height: "40px", width: "40px"}}>
        <FormatColorFillIcon />
        {/* <ArrowDropDownIcon /> */}
      {/* </ToggleButton> */} 
    </ToggleButtonGroup>
    </div>
  );
}