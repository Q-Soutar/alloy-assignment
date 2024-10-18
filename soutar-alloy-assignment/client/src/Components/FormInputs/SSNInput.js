import { TextField } from "@mui/material";

// Country dropdown component; accepts state-related props
const SSNInput = function ({ formValues, updateFormHandler, formValidity }) {
    /* Handles typing in the SSN input field
        - Checks length is no more than 9
        - Uses regex to check that it is only numerals 
            > The regex used here is different than what the parameters endpoint returns; curiously that regex didn't work and prevented text from being entered at all, so I needed to use a different one
            > for refernece:
            ---> (works) ^\d+$
            ---> (doesn't work) ^\\d{9}$
            > Happy to talk about why validation works totally differently on this one; tldr trying to emulate a very specific behavior I've seen in online forms before for SSNs
        - If valid, update the state
    */
    const handleTypingSSN = function (e) {
        // This is a tiny bit redundant to the form state's validation; as structured they cannot be combined, however (tldr SSN requires length 9, no more no less, putting the input validation in the state update handler results in you being unable to type anything at all because the form value is less than 9. There is probably a more elegant approach here, but for the sake of time I'm gonna leave it as is given it works fine)
        const length = e.target.value.length < 10;
        const num = /^\d+$/.test(e.target.value);
        if ((num && length) || e.target.value.length === 0) {
            updateFormHandler(e.target.id, e.target.value);
        }
    };
    return (
        <TextField
            sx={{ p: 1, width: "45%" }}
            id="ssn"
            type="password"
            variant="filled"
            label="Social Security Number"
            onChange={handleTypingSSN}
            value={formValues.ssn}
            error={!formValidity.ssn && formValues.ssn.length > 0}
        />
    );
};

export default SSNInput;
