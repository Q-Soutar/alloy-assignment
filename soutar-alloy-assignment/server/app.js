// Express backend server
// Imports (there is a weird story around these, Node seems to hate doing the imports this wayt with an angry warning, but still lets it run. Tried it a more conventional way but that plain failed to run at all. Time constraints prevent proper investigation)
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

// Initiations
dotenv.config();
const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// Spin up the server
app.use(express.json());
app.listen(PORT, () => console.log(`running on port ${PORT}`));

// Static values for API requests
const workflowToken = process.env.WORKFLOW_TOKEN;
const workflowSecret = process.env.WORKFLOW_SECRET;
const tokenText = workflowToken + ":" + workflowSecret;
const alloyAuth = Buffer.from(tokenText, "utf8").toString("base64");

/* Evaluation Endpoint
    - Receives request
    - Parses body for necessary parameters
        - An immediate next step on this would be adding in some validation for the request to make sure it is valid
    - Reformats inbound data to match the Alloy API naming scheme
    - Fetch request to Alloy API
    - Parses response from Alloy; checks status codes and error messages
    - Sends reponse back to front-end depending on what the API responded with 
*/
app.post("/api/eval", (req, res) => {
    // API parameter endpoint indicates the workflow requires a phone number, but this wasn't included in the assignment doc so I ommitted it as a field
    const {
        firstName,
        lastName,
        email,
        dob,
        ssn,
        line1,
        line2,
        city,
        state,
        zip,
        country
    } = req.body;
    // In prod it wouldn't be a bad idea to run validation again here, just in case someone got clever and wanted to try and manually hit this endpoint manually. Won't do that for expediency sake, and also it would be fairly redundant to the validation done in the front-end.
    const alloyEvalEndpoint = "https://sandbox.alloy.co/v1/evaluations";
    const alloyReqBody = {
        name_first: firstName,
        name_last: lastName,
        email_address: email,
        birth_date: dob,
        document_ssn: ssn,
        address_line_1: line1,
        address_line_2: line2,
        address_city: city,
        address_state: state,
        address_postal_code: zip,
        address_country_code: country
    };
    fetch(alloyEvalEndpoint, {
        method: "POST",
        body: JSON.stringify(alloyReqBody),
        headers: {
            "Authorization": "Basic " + alloyAuth,
            "Content-Type": "application/json"
        }
    })
        .then((response) => {
            return response.json();
        })
        .then((alloyData) => {
            if (alloyData.summary !== undefined) {
                res.status(201).send({
                    message: alloyData.summary.outcome,
                    errorState: "none"
                });
            } else if (
                alloyData.status_code >= 400 &&
                alloyData.status_code <= 599
            ) {
                res.status(alloyData.status_code).send({
                    message:
                        "Error - refer to Alloy API documentation for more information",
                    errorState: "handled error",
                    minor_code: alloyData.error.minor_code,
                    type: alloyData.error.type,
                    message: alloyData.error.message
                });
            } else {
                res.status(500).send({
                    message: "Unhandled Error",
                    errorState: "unhandled error"
                });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send({
                message: "Unhandled Error",
                errorState: "unhandled error"
            });
        });
});

// Test endpoint to validate server is running
app.get("/api/devEnvTest", (req, res) => {
    console.log("Request received: /devEnvTest");
    res.status(200).send({
        field1: "val1",
        field2: "val2"
    });
});

/* SDK-based alternative
    - I had intended to do a commented version of this using the SDK instead, however it looks like there is a dedicated API key for that I don't have access to, plus some nuances to using the SDK I am not familiar with.
*/
