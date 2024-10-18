// Imports
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import { Box, Button, Divider } from "@mui/material";
import { useState } from "react";
import dayjs from "dayjs";
import {
    StateDropdown,
    CountryDropdown,
    SSNInput,
    EmailInput,
    FirstNameInput,
    LastNameInput,
    Line1Input,
    Line2Input,
    CityInput,
    DOBInput
} from "./Components/FormInputs/Inputs";
import LoadingSpinner from "./Components/OtherFormComponents/LoadingSpinner";
import EvalResultDisplay from "./Components/OtherFormComponents/EvalResultDisplay";
import { checkField } from "./Components/Utils/ValidationFunctions";
import PostalCodeInput from "./Components/FormInputs/PostalCodeInput";

// Default state declarations
// Note: A more clever approach to this (given more time and control over the workflows in use) would be to define the form (its field and validation) from the parameters endpoint, and dynamically create the form fields based on the data returned from that endpoint. This might not work though for every field (such as the list of US states), but it could be used for quite a few of them. This also assumes that all of the fields listed in that endpoint have accurate/valid validation rules that could be used programmatically.
const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    dob: dayjs(),
    ssn: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: "",
    country: ""
};
const defaultValidity = {
    firstName: false,
    lastName: false,
    email: false,
    dob: false,
    ssn: false,
    line1: false,
    line2: true,
    city: false,
    state: false,
    zip: false,
    country: false
};

// Root function
function App() {
    // React state setup for form values, validity of form fields, and status of the application (and by extension the form itself)
    const [formValues, setFormValues] = useState(defaultForm);
    const [formValidity, setFormValidity] = useState(defaultValidity);
    const [applicationStatus, setApplicationStatus] = useState("form");

    // State update handler functions
    // Handle changes to the application status
    const applicationStatusHandler = function (newStatus) {
        setApplicationStatus(newStatus);
    };
    // Handle changes to the form; also performs validation checks.
    const updateFormHandler = function (field, value) {
        const fieldValidity = checkField(field, value);
        setFormValidity({
            ...formValidity,
            [field]: fieldValidity
        });
        setFormValues({
            ...formValues,
            [field]: value
        });
    };
    // Resets the form to default state
    const resetForm = function () {
        setFormValues(defaultForm);
    };
    /* Handlse form submission
      - Check all fields are valid
      - Build fetch request parameters (also performs the date formatting here; not ideal, but Material has a tantrum if you try to do this at any other point)
      - If the form is valid, make the fetch request
      - Includes a timer to prevent the loading spinner from instantly disappearing; purely aesthetic, but easier on the eyes
      - Checks whether the call was as success
      - In the switch statement it updates the form states to display the appropriate message
    */
    const submissionHandler = function () {
        const isValid = Object.keys(formValidity).every((k) => formValidity[k]);
        const evalURL = "/api/eval";
        const evalHeaders = new Headers();
        evalHeaders.append("Content-Type", "application/json");
        const evalBody = {
            ...formValues,
            dob: formValues.dob.format("YYYY-MM-DD")
        };
        const evalSetup = {
            method: "POST",
            body: JSON.stringify(evalBody),
            headers: evalHeaders
        };
        if (isValid) {
            applicationStatusHandler("loading");
            fetch(evalURL, evalSetup)
                .then((res) => {
                    return res.json();
                })
                .then((res) => {
                    setTimeout(() => {
                        if (res.errorState === "none") {
                            switch (res.message) {
                                case "Approved":
                                    applicationStatusHandler("success");
                                    break;
                                case "Manual Review":
                                    applicationStatusHandler("review");
                                    break;
                                case "Denied":
                                    applicationStatusHandler("denial");
                                    break;
                                default:
                                    applicationStatusHandler("error");
                            }
                        } else if (res.errorState === "handled error") {
                            applicationStatusHandler("error");
                            console.error(res);
                        } else {
                            applicationStatusHandler("error");
                            console.error(res);
                        }
                    }, 1000);
                })
                .catch((error) => {
                    setTimeout(() => {
                        applicationStatusHandler("error");
                    }, 1000);
                    console.error(error);
                });
        }
    };

    // App root component (includes form field, loading spinner, and results)
    return (
        // Container
        <Box sx={{ maxWidth: "50%", margin: "auto" }} alignItems="center">
            {applicationStatus === "form" && (
                <Box sx={{ maxWidth: "100%" }}>
                    {/* Form fields */}
                    <FirstNameInput
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <LastNameInput
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <br />
                    <EmailInput
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <br />
                    <DOBInput
                        sx={{ maxWidth: "75%" }}
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <SSNInput
                        sx={{ maxWidth: "25%" }}
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <br />
                    <Divider textAlign="left">Address</Divider>
                    <Line1Input
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <br />
                    <Line2Input
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <br />
                    <CityInput
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <StateDropdown
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                    />
                    <br />
                    <PostalCodeInput
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                        formValidity={formValidity}
                    />
                    <CountryDropdown
                        formValues={formValues}
                        updateFormHandler={updateFormHandler}
                    />
                    <br />
                    <Button
                        sx={{ p: 1, width: "95%" }}
                        variant="contained"
                        onClick={submissionHandler}
                    >
                        Submit
                    </Button>
                </Box>
            )}
            {/* Loading spinner and results display */}
            {applicationStatus === "loading" && <LoadingSpinner />}
            <EvalResultDisplay
                applicationStatus={applicationStatus}
                applicationStatusHandler={applicationStatusHandler}
                resetForm={resetForm}
            />
        </Box>
    );
}

export default App;
