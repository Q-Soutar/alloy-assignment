import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

// List of countries and 2-letter codes. Assignment constrains this to just the US however
const countryList = [{ countryName: "United States of America", code: "US" }];

// Country dropdown component; accepts state-related props
// List populated via map function of the array of states
const CountryDropdown = function ({ formValues, updateFormHandler }) {
    // Handles selection of country in dropdown
    const handleSelectCountry = function (e) {
        // Unclear on cause, but e.target.id returned undefined here; might stem from the menu item elements; gonna just directly use a string here
        updateFormHandler("country", e.target.value);
    };
    return (
        <FormControl sx={{ p: 1, width: "45%" }}>
            <InputLabel>Country</InputLabel>
            <Select
                id="country"
                defaultValue=""
                value={formValues.country}
                onChange={handleSelectCountry}
            >
                {countryList.map((country) => {
                    return (
                        <MenuItem
                            id={"country-" + country.code}
                            value={country.code}
                        >
                            {country.countryName}
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
};

export default CountryDropdown;
