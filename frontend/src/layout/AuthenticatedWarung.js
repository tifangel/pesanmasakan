import React from "react"
import { useEffect } from "react"
import { useHistory } from 'react-router-dom'

const AuthenticatedWarung = (props) => {
  const history = useHistory()
  const { children } = props
  const isAuthenticated = localStorage.getItem('token') ? true : false
  const roleWarung = localStorage.getItem('role') === "warung" ? true : false

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        alert("Please login first!")
        history.push("/login")
      }
    };

    checkAuth();
  }, [history, isAuthenticated]);

  useEffect(() => {
    // check if current user is not an warung
      if (!roleWarung) {
        alert("Unauthorized access! Not account warung")
        history.push("/")
      } 
  }, [roleWarung,history])

  return (
    <>
      {isAuthenticated && roleWarung && children}
    </>
  );
};

export default AuthenticatedWarung;