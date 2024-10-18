import { TextField } from "@mui/material";

// City input component; accepts state-related props
const CityInput = function ({ formValues, updateFormHandler, formValidity }) {
    // Handles typing in the city input field
    const handleTypingCity = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "45%" }}
            id="city"
            variant="filled"
            label="City"
            onChange={handleTypingCity}
            value={formValues.city}
            error={!formValidity.city && formValues.city.length > 0}
        />
    );
};

export default CityInput;
