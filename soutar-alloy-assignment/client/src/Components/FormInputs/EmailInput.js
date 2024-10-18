import { TextField } from "@mui/material";

// Email input component; accepts state-related props
const EmailInput = function ({ formValues, updateFormHandler, formValidity }) {
    /* Handles typing in the email field
        - Validatin is handled at by the updateFormHandler and it's validation utilities. 
    */
    const handleTypingEmail = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "95%" }}
            id="email"
            variant="filled"
            label="Email Address"
            onChange={handleTypingEmail}
            value={formValues.email}
            error={!formValidity.email && formValues.email.length > 0}
        />
    );
};

export default EmailInput;
