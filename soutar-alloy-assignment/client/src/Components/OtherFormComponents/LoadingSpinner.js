import { CircularProgress, Grid2 } from "@mui/material";

// Loading spinner; uses Grid2 for alignments (Material does not like centering things)
const LoadingSpinner = function () {
    return (
        <Grid2 container alignItems={"center"}>
            <Grid2 item size={4} />
            <Grid2 item size={4} justifyContent={"center"} display="flex">
                <CircularProgress size="100px" sx={{ p: 2 }} />
            </Grid2>
            <Grid2 item size={4} />
        </Grid2>
    );
};
export default LoadingSpinner;
