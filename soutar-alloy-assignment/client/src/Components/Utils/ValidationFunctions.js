/* Checks whether a given field is valid. 
    - Uses a case statement to determine which function to call. 
    - A more interesting approach here alluded to elsewhere is using a more dynamic validation scheme, where the rules exist as JS objects that are used as parameters in the function call (as opposed to a discrete function for each field)
*/
export const checkField = function (field, value) {
    switch (field) {
        case "firstName":
            return checkFirstName(value);
        case "lastName":
            return checkLastName(value);
        case "email":
            return checkEmail(value);
        case "dob":
            return checkDOB(value);
        case "ssn":
            return checkSSN(value);
        case "line1":
            return checkLine1(value);
        case "line2":
            return checkLine2(value);
        case "city":
            return checkCity(value);
        case "state":
            return checkState(value);
        case "zip":
            return checkZip(value);
        case "country":
            return checkCountry(value);
        default:
            return false;
    }
};
/* Validation functions; 
    - Names should be be descriptive  
    - Validation rules provided in each function
    - Several fields did not have strict validation rules. I tentatively put in length minimums and maximums to ensure:
        > A. users were entering data into the field in the first place
        > B. Prevent abuses by pasting a novel into the first name field 512 seemed like a reasonable upper limit. 
    - Optional fields do not have a minimum length specified
*/
const checkFirstName = function (value) {
    /*
    Validation rules: 
      - Length > 0
      - Length <= 512
  */
    return value.length > 0 && value.length <= 512;
};
const checkLastName = function (value) {
    /*
    Validation rules: 
      - Length > 0
      - Length <= 512
  */
    return value.length > 0 && value.length <= 512;
};
const checkLine1 = function (value) {
    /*
    Validation rules: 
      - Length > 0
      - Length <= 512
  */
    return value.length > 0 && value.length <= 512;
};
const checkLine2 = function (value) {
    /*
    Validation rules: 
      - Length <= 512
  */
    return value.length <= 512;
};
const checkCity = function (value) {
    /*
    Validation rules: 
      - Length <= 512
  */
    return value.length <= 512;
};
const checkState = function (value) {
    /*
    Validation rules: 
      - Not necessary in this context due to dropdown values; will essentially always be true
  */
    return true;
};
const checkCountry = function (value) {
    /*
    Validation rules: 
      - Not necessary in this context due to fixed value; will essentially always be true
  */
    return true;
};
const checkSSN = function (value) {
    /*
    Validation rules: 
      - Length == 9
      - All characters are numerals
    Validation rules are very similar to the input, but with the alteration that the length must be 9 to be valid for submission
  */
    const length = value.length == 9;
    const num = /^\d+$/.test(value);
    return length && num;
};
const checkEmail = function (value) {
    /*
      Validation rules: 
        - No whitespace
        - domain (@)
        - subdomain (.)
    */
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return validEmail;
};
const checkZip = function (value) {
    /* Validation rules:
        - Length < 10 (to account for zip+4 postal codes)
        - All characters are numerals
    */
    const lengthCheck = value.length < 10;
    const numCheck = /^\d+$/.test(value);
    return lengthCheck && numCheck;
};
const checkDOB = function (value) {
    /* Validation rules:
        - YYYY-MM-DD format
    Note: given that this is done by a date-picker and the input is controlled, it shouldn't be possible to get a false value in there. Ideally it would be nice to do a regex check, but one is not specified in the parameters endpoint and time constraints prevent developing that rgex personally. Since the field cannot be manually typed in, I feel confident that this would prevent an error in the case of the vaast majority of users. 
    */
    return true;
};
