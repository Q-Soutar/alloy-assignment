import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    Typography
} from "@mui/material";

// List of states with 2-letter codes
const statesList = [
    { stateName: "Alabama", code: "AL" },
    { stateName: "Alaska", code: "AK" },
    { stateName: "Arizona", code: "AZ" },
    { stateName: "Arkansas", code: "AR" },
    { stateName: "California", code: "CA" },
    { stateName: "Colorado", code: "CO" },
    { stateName: "Connecticut", code: "CT" },
    { stateName: "Delaware", code: "DE" },
    { stateName: "District of Columbia", code: "DC" },
    { stateName: "Florida", code: "FL" },
    { stateName: "Georgia", code: "GA" },
    { stateName: "Guam", code: "GU" },
    { stateName: "Hawaii", code: "HI" },
    { stateName: "Idaho", code: "ID" },
    { stateName: "Illinois", code: "IL" },
    { stateName: "Indiana", code: "IN" },
    { stateName: "Iowa", code: "IA" },
    { stateName: "Kansas", code: "KS" },
    { stateName: "Kentucky", code: "KY" },
    { stateName: "Louisiana", code: "LA" },
    { stateName: "Maine", code: "ME" },
    { stateName: "Maryland", code: "MD" },
    { stateName: "Massachusetts", code: "MA" },
    { stateName: "Michigan", code: "MI" },
    { stateName: "Minnesota", code: "MN" },
    { stateName: "Mississippi", code: "MS" },
    { stateName: "Missouri", code: "MO" },
    { stateName: "Montana", code: "MT" },
    { stateName: "Nebraska", code: "NE" },
    { stateName: "Nevada", code: "NV" },
    { stateName: "New Hampshire", code: "NH" },
    { stateName: "New Jersey", code: "NJ" },
    { stateName: "New Mexico", code: "NM" },
    { stateName: "New York", code: "NY" },
    { stateName: "North Carolina", code: "NC" },
    { stateName: "North Dakota", code: "ND" },
    { stateName: "Ohio", code: "OH" },
    { stateName: "Oklahoma", code: "OK" },
    { stateName: "Oregon", code: "OR" },
    { stateName: "Pennsylvania", code: "PA" },
    { stateName: "Puerto Rico", code: "PR" },
    { stateName: "Rhode Island", code: "RI" },
    { stateName: "South Carolina", code: "SC" },
    { stateName: "South Dakota", code: "SD" },
    { stateName: "Tennessee", code: "TN" },
    { stateName: "Texas", code: "TX" },
    { stateName: "Utah", code: "UT" },
    { stateName: "Vermont", code: "VT" },
    { stateName: "Virginia", code: "VA" },
    { stateName: "Virgin Islands", code: "VI" },
    { stateName: "Washington", code: "WA" },
    { stateName: "West Virginia", code: "WV" },
    { stateName: "Wisconsin", code: "WI" },
    { stateName: "Wyoming", code: "WY" }
];

// State dropdown component; accepts state-related props
// List populated via map function of the array of states
const StateDropdown = function ({ formValues, updateFormHandler }) {
    // Selection handler
    const handleSelectState = function (e) {
        updateFormHandler("state", e.target.value);
    };
    return (
        <FormControl sx={{ p: 1, width: "45%" }}>
            <InputLabel>State / Territory</InputLabel>
            <Select
                id="state"
                defaultValue=""
                value={formValues.state}
                onChange={handleSelectState}
            >
                {statesList.map((usState) => {
                    return (
                        <MenuItem
                            id={"state-" + usState.code}
                            value={usState.code}
                        >
                            {usState.stateName}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default StateDropdown;
