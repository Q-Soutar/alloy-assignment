// Imports
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Birth date input component; accepts state-related props
const DOBInput = function ({ formValues, updateFormHandler, formValidity }) {
    // Handls updates to the date of birth
    const handleDOBUpdate = function (e) {
        // The event provided in onChange for this component is different; it only passes the dayjs object, it does not include the ID, therefore that must be hardcoded here unfortunately. (tradeoff is worth it though, dayjs makes the formatting a breeze)
        updateFormHandler("dob", e);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                sx={{ p: 1, width: "45%" }}
                id="dob"
                label="Date of Birth"
                value={formValues.dob}
                onChange={handleDOBUpdate}
            />
        </LocalizationProvider>
    );
};

export default DOBInput;
