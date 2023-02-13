import React, { useState } from "react";

import "./Filter.scss";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";

export default function Filter() {
  const [displayFilter, setDisplayFilter] = useState(false);

  const [age, setAge] = useState("");
  const [value, setValue] = useState([1900, 2023]);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleChangeValue = (event, newValue) => {
    setValue(newValue);
  };

  function handleClick() {
    setDisplayFilter((prev) => !prev);
  }

  function clickChip() {
    console.log("click chip");
  }
  return (
    <div className="filter-wrapper">
      <button className="filter--button" onClick={handleClick}>
        Filter
      </button>
      {displayFilter && (
        <div className="filter--options">
          <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Format</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>TV</MenuItem>
                <MenuItem value={20}>Movie</MenuItem>
                <MenuItem value={30}>OVA</MenuItem>
                <MenuItem value={30}>Special</MenuItem>
                <MenuItem value={30}>ONA</MenuItem>
                <MenuItem value={30}>Music</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Status</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Airing</MenuItem>
                <MenuItem value={20}>Complete</MenuItem>
                <MenuItem value={30}>Upcoming</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* <div className="year--selector">
            <div className="year year--begin">{value[0]}</div>
            <Slider
              // getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={handleChangeValue}
              valueLabelDisplay="auto"
              // getAriaValueText={valuetext}
              min={1900}
              max={2023}
            />
            <div className="year year--end">{value[1]}</div>
          </div> */}
          <div>
            <div>Genres</div>
            <Stack direction="row" spacing={1}>
              <Chip label="Clickable" color="error" onClick={clickChip} />
              <Chip label="Clickable" color="success" onClick={clickChip} />
              <Chip label="Clickable" onClick={clickChip} />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}
