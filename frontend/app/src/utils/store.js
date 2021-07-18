import React, { createContext, useState } from 'react';

export const StoreContext = createContext(null);
export const StoreProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileId, setProfileId] = useState('');
  const [glojectOpen, setGlojectOpen] = useState(false);
  const [glojectId, setGlojectId] = useState('');
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const store = {
    loggedInContext: [loggedIn, setLoggedIn],
    profileOpenContext: [profileOpen, setProfileOpen],
    profileIdContext: [profileId, setProfileId],
    glojectOpenContext: [glojectOpen, setGlojectOpen],
    glojectIdContext: [glojectId, setGlojectId],
    signupContext: [signupOpen, setSignupOpen],
    loginContext: [loginOpen, setLoginOpen],
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
