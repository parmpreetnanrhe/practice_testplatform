import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { PracticeQuesPalletContextProvider } from '../contexts/PracticeQuesPalletContext';
import TestStartTimer from '../components/TestStartTimer';

export const PracticeQuePalletApiGeneric = ({ setPalletQueData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const payload = {
    payLoads: "Y2twbGZPaHpgcG56fDokIiUjOCEvZHRmcE52PD8kOCMkMD98em17ekl+bGFxOiU0ZGZtYX1uenxmRXdtYXpvR3s+an9rbWJna3Ane2p1YXt7dFxreWIodnB0cWRgcGF9cyV/ZmJ4bHxRbnFtOGZ5fjNyYnNxVXBjYGJhdTMl",
    dev: 10,
    platform: "android",
    app_flag: 11,
    app_type: "mycoach",
    client_id: 2095,
    version: 93,
    device_id: "587831233a4827f7",
    device_details: "MANUFACTURER=samsung MODEL=SM-E225F RELEASE=13 SDK=TIRAMISUDevice Id TP1A.220624.014",
    user_type: 0,
    user_idd: 6185167,
    user_id: 6185167,
    beta_idd: 6185167,
    beta_id: 6185167,
    cms_id: 6185167,
  };


  useEffect(() => {
    const fetchData = async () => {
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
        setPalletQueData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setPalletQueData]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; 
}
