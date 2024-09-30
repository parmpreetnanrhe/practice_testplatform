import React, { createContext, useReducer ,useState } from 'react'

export const UserInfoAuthContext = createContext(null);

export default function UserInfoContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(false);
  const isUserLogin = () => {
    return setUserInfo(false);
  }

  const isUserLogout = () => {
    return setUserInfo(false);
  }

  return (
    <UserInfoAuthContext.Provider value={{ userInfo, isUserLogin, isUserLogout }}>
      {children}
    </UserInfoAuthContext.Provider>
  )
}
