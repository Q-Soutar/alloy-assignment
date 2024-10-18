import { TextField } from "@mui/material";

// Address line 2 component; accepts state-related props
const Line2Input = function ({ formValues, updateFormHandler, formValidity }) {
    // Handles typing in the input field
    const handleTypingLine2 = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "95%" }}
            id="line2"
            variant="filled"
            label="Address Line 2"
            onChange={handleTypingLine2}
            value={formValues.line2}
            error={!formValidity.line2 && formValues.line2.length > 0}
        />
    );
};

export default Line2Input;
