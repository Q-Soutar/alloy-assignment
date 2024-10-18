import { TextField } from "@mui/material";

// first name input component; accepts state-related props
const FirstNameInput = function ({
    formValues,
    updateFormHandler,
    formValidity
}) {
    // Handlse updates to the input
    const handleTypingFirstName = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "46%" }}
            id="firstName"
            variant="filled"
            label="First Name"
            onChange={handleTypingFirstName}
            value={formValues.firstName}
            error={!formValidity.firstName && formValues.firstName.length > 0}
        />
    );
};

export default FirstNameInput;
