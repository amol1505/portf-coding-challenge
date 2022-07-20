import React, { useState } from "react";

import "./FilterBar.css";

function FilterBar() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [abvLevel, setAbvLevel] = useState(null);
  const [noInteger, setnoInteger] = useState(false);

  //function to update start date value

  function onStartDate(e) {
    if (e.target.value === "") {
      setStartDate(null);
    } else {
      setStartDate(e.target.value);
    }
  }
  //function to update end date value
  function onEndDate(e) {
    if (e.target.value === "") {
      setEndDate(null);
    } else {
      setEndDate(e.target.value);
    }
  }
  //function to update abv value
  function onAbvLevel(e) {
    setnoInteger(false);
    if (!isNaN(e.target.value)) {
      setAbvLevel(e.target.value);
    } else {
      setnoInteger(true);
    }
  }
  //error that will display if user doesnt provide integer for abv value
  const abvError = noInteger ? (
    <div className="response bad">
      <p>Please enter an integer</p>
    </div>
  ) : (
    ""
  );
  //provide props to parent (App)
  return {
    startDate,
    endDate,
    abvLevel,
    render: (
      <div>
        <div className="form-inline">
          <label htmlFor="startDateInput">Start Date </label>
          <input
            name="startDateInput"
            onChange={onStartDate}
            placeholder="MM-YYYY"
          />

          <label htmlFor="endDateInput">End Date </label>
          <input
            name="endDateInput"
            onChange={onEndDate}
            placeholder="MM-YYYY"
          />

          <label htmlFor="abvLevelInput">ABV Level </label>
          <input name="abvLevelInput" onChange={onAbvLevel} />
        </div>
        {abvError}
      </div>
    ),
  };
}

export default FilterBar;
