import React, { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

function DietGoalSelect() {
  const [goal, setGoal] = useState("");

  const handleChange = (event: any) => {
    setGoal(event.target.value);
  };

  return (
    <FormControl variant="outlined" style={{ minWidth: 200 }}>
      <InputLabel id="goal-select-label">מטרה דיאטה</InputLabel>
      <Select
        labelId="goal-select-label"
        id="goal-select"
        value={goal}
        onChange={handleChange}
        label="מטרה דיאטה"
      >
        <MenuItem value="">
          <em>בחרי מטרה</em>
        </MenuItem>
        <MenuItem value="ירידה במשקל">ירידה במשקל</MenuItem>
        <MenuItem value="העלאת מסת שריר">העלאת מסת שריר</MenuItem>
        <MenuItem value="אחר">אחר</MenuItem>
      </Select>
    </FormControl>
  );
}

export default DietGoalSelect;