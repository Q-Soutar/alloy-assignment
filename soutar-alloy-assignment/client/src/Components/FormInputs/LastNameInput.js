import { TextField } from "@mui/material";

// Last name input component; accepts state-related props
const LastNameInput = function ({
    formValues,
    updateFormHandler,
    formValidity
}) {
    // Handles updates to the input
    const handleTypingLastName = function (e) {
        updateFormHandler(e.target.id, e.target.value);
    };
    return (
        <TextField
            sx={{ p: 1, width: "46%" }}
            id="lastName"
            variant="filled"
            label="Last Name"
            onChange={handleTypingLastName}
            value={formValues.lastName}
            error={!formValidity.lastName && formValues.lastName.length > 0}
        />
    );
};

export default LastNameInput;
