import { TextField } from "@mui/material";

// Address line 1 component; accepts state-related props
const Line1Input = function ({ formValues, updateFormHandler, formValidity }) {
    // Handles typing in the input field
    const handleTypingLine1 = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "95%" }}
            id="line1"
            variant="filled"
            label="Address Line 1"
            onChange={handleTypingLine1}
            value={formValues.line1}
            error={!formValidity.line1 && formValues.line1.length > 0}
        />
    );
};

export default Line1Input;
