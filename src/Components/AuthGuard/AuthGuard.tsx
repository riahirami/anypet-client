import Signin from "pages/signin";
import Signup from "pages/signup";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "redux/hooks";
import { setUser } from "redux/slices/authSlice";
import { RootState } from "redux/store";
import { useLocation } from 'react-router-dom';
import { PATHS } from "routes/Path";


interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const authUser = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const showSignup = location.pathname == PATHS.SIGNUP;

  if (authUser.user) {
    return <>{children}</>;
  } else {
    return showSignup ? <Signup /> : <Signin />;
  }
};

export default AuthGuard;
