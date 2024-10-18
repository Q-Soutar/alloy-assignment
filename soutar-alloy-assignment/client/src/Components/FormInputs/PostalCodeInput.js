import { TextField } from "@mui/material";

// Post code input component; accepts state-related props
const PostalCodeInput = function ({
    formValues,
    updateFormHandler,
    formValidity
}) {
    /* Hadlse typgin in the postal code field
        - Checks the length is less than 10, to account for zip+4 codes
        - Runs regex to ensure it is only numerals
        - If valid, updates the state. 
        - Controlled component, no invalid characters
    */
    const handleTypingPostalCode = function (e) {
        const lengthCheck = e.target.value.length < 10;
        const numCheck = /^\d+$/.test(e.target.value);
        if ((numCheck && lengthCheck) || e.target.value.length === 0) {
            updateFormHandler(e.target.id, e.target.value);
        }
    };
    return (
        <TextField
            sx={{ p: 1, width: "45%" }}
            id="zip"
            variant="filled"
            label="Zip/Postal Code"
            onChange={handleTypingPostalCode}
            value={formValues.zip}
            error={!formValidity.zip && formValues.zip.length > 0}
        />
    );
};

export default PostalCodeInput;
