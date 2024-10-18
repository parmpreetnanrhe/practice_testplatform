import axios from 'axios';

export const SubmitApi = async (questionsDataLoadedArr) => {
  const jsonString = JSON.stringify(questionsDataLoadedArr);
  const payLoads = btoa(jsonString);
  const BASE_API_URL = process.env.REACT_APP_API_URL
  const payload = {
    dev: 10,
    platform: "android",
    app_flag: 11,
    app_type: "mycoach",
    client_id: 5480,
    version: 93,
    device_id: "587831233a4827f7",
    device_details: "MANUFACTURER=samsung MODEL=SM-E225F RELEASE=13 SDK=TIRAMISUDevice Id TP1A.220624.014",
    user_type: 0,
    user_idd: 496956,
    user_id: 496956, 
    beta_idd: 496956,
    beta_id: 496956, 
    cms_id: 496956,
    payLoads
  };
  const queryString = Object.keys(payload)
    .map(key => `${key}=${payload[key]}`)
    .join('&');
 
  try {
    const response = await axios.post(
      `${BASE_API_URL}/app/api/practiceQueSubmitApiGeneric.php`,
      queryString, 
      { 
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // or 'application/json' if the server expects JSON 
        }, 
      }
    );
    // Return the data instead of setting state
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }
};
