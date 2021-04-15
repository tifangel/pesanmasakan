import React from "react"
import { useEffect } from "react"
import { useHistory } from 'react-router-dom'

const Authenticated = (props) => {
  const history = useHistory()
  const { children } = props
  const isAuthenticated = localStorage.getItem('token') ? true : false
  const roleUser = localStorage.getItem('role') === "customer" ? true : false

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
    // check if current user is not an customer
      if (!roleUser) {
        console.log("Unauthorized access!")
        history.push("/")
      } 
  }, [roleUser,history])

  return (
    <>
      {isAuthenticated && children}
    </>
  );
};

export default Authenticated;