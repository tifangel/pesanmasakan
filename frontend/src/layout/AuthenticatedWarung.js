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
        alert("Silakan login terlebih dahulu!")
        history.push("/login")
      }
    };

    checkAuth();
  }, [history, isAuthenticated]);

  useEffect(() => {
    // check if current user is not an warung
      if (!roleWarung) {
        console.log("Unauthorized access!")
        history.push("/")
      } 
  }, [roleWarung,history])

  return (
    <>
      {roleWarung && children}
    </>
  );
};

export default AuthenticatedWarung;