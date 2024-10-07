import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const PracticeQuePalletApi = async (payLoads) => {
  // Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCIgNj98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=

  // const payLoads = "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMhNj98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=";

  // const payLoads = "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMkMD98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=";
  const payload = {
    payLoads: payLoads,
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
  };
//   const toQueryString = (obj) => {
//     return Object.keys(obj)
//         .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
//         .join('&');
// };

// // Usage
// const queryString = toQueryString(params);
  try {
    const response = await axios.post(
      'app/api/practiceQuePalletApiGeneric.php',
      payload,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // or 'application/json' if the server expects JSON
          "Access-Control-Allow-Origin": "*",
        },
        body: "dev=10&platform=android&app_flag=11&app_type=mycoach&client_id=5480&version=93&device_id=587831233a4827f7&device_details=MANUFACTURER%3Dsamsung%20MODEL%3DSM-E225F%20RELEASE%3D13%20SDK%3DTIRAMISUDevice%20Id%20TP1A.220624.014&user_type=0&user_idd=496956&user_id=496956&beta_idd=496956&beta_id=496956&cms_id=496956&payLoads=" + payLoads,
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }

}
