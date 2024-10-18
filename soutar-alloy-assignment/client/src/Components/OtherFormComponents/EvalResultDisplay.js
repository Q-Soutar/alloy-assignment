// Imports
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import GradingIcon from "@mui/icons-material/Grading";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import { Typography, Button, Grid2 } from "@mui/material";

// Variable containing info to display when response is received; keys should be self-explanatory; "form" and "loading" included to prevent undefined variable errors
const evalResults = {
    success: {
        message: "Congratulations, you've been approved!",
        icon: <DoneOutlineIcon sx={{ fontSize: 80, margin: "auto" }} />
    },
    review: {
        message:
            "Thank you for submitting - our team will review your information and get back to you with an update soon!",
        icon: <GradingIcon sx={{ fontSize: 80 }} />
    },
    denial: {
        message:
            "Thank you for your interest - unfortunately at this time we won't be able to approve your account.",
        icon: <InfoIcon sx={{ fontSize: 80 }} />
    },
    error: {
        message: "Uh-oh! Something went wrong. Please Try again later!",
        icon: <WarningIcon sx={{ fontSize: 80 }} />
    },
    form: {
        message: "",
        icon: ""
    },
    loading: {
        message: "",
        icon: ""
    }
};

/* Return button 
    - Returns user to the form
    - Resets the form state
*/
const ReturnButton = function ({ applicationStatusHandler, resetForm }) {
    return (
        <Button
            sx={{ ml: 4 }}
            variant="outlined"
            startIcon={<KeyboardBackspaceIcon />}
            onClick={() => {
                applicationStatusHandler("form");
                resetForm();
            }}
        >
            Done
        </Button>
    );
};

/* Result display component
    - Uses Grid2 for arrangement / centering
    - Checks the application status and conditionally displays the appropriate message. 
*/
const EvalResultDisplay = function ({
    applicationStatus,
    applicationStatusHandler,
    resetForm
}) {
    if (applicationStatus === "form" || applicationStatus === "loading") {
        return null;
    } else {
        return (
            <Grid2 container spacing={0}>
                <Grid2 item size={5} />
                <Grid2 item size={4}>
                    {evalResults[applicationStatus].icon}
                </Grid2>
                <Grid2 item size={3} />
                <Grid2 item size={12}>
                    <Typography align="center">
                        {evalResults[applicationStatus].message}
                    </Typography>
                </Grid2>
                <Grid2 item size={4} />
                <Grid2 item size={4}>
                    <ReturnButton
                        variant="outlined"
                        applicationStatusHandler={applicationStatusHandler}
                        resetForm={resetForm}
                    />
                </Grid2>
                <Grid2 item size={4} />
            </Grid2>
        );
    }
};

export default EvalResultDisplay;
