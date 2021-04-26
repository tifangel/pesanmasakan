import React from "react"
import { useEffect } from "react"
import { useHistory } from 'react-router-dom'

const AuthenticatedUser = (props) => {
  const history = useHistory()
  const { children } = props
  const isAuthenticated = localStorage.getItem('token') ? true : false

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        alert("Please login first!")
        history.push("/login")
      }
    };

    checkAuth();
  }, [history, isAuthenticated]);

  return (
    <>
      {isAuthenticated && children}
    </>
  );
};

export default AuthenticatedUser;