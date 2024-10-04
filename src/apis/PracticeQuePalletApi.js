import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const PracticeQuePalletApi = async () => {

  const payload = {
    payLoads: "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMkMD98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIoc2Zkd29qfWZ0MmVwY3ppe1p8Z2Q1ZGt5NHR5aWpbYmRncHRmPD8=",
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

  try {
    const response = await axios.post(
      'app/api/practiceQuePalletApiGeneric.php',
      payload,
      {
        headers: {
          "Content-Type": "application/json", "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    throw err; // Re-throw the error so it can be handled elsewhere
  }
  
}
