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
        alert("Please login first!")
        history.push("/login")
      }
    };

    checkAuth();
  }, [history, isAuthenticated]);

  useEffect(() => {
    // check if current user is not an customer
      if (!roleUser) {
        alert("Unauthorized access! Not account customer")
        history.push("/")
      } 
  }, [roleUser,history])

  return (
    <>
      {isAuthenticated && roleUser && children}
    </>
  );
};

export default Authenticated;