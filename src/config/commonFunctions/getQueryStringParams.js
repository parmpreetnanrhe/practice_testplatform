
const queryString = window.location.search.substring(1); // Removes the "?"
// Split into key-value pairs
const requestURL = queryString.split("&");
const urlStingDataObj = {};
requestURL.forEach((item) => {
  const [key, value] = item.split("=");
  urlStingDataObj[key] = value || ""; 
});
 
export const urlStringObj = urlStingDataObj;
