import React, { useState, useEffect } from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import { useAppContext } from "../lib/contextLib"
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import EmojiNatureIcon from "@material-ui/icons/EmojiNature";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 12,
    color: "#FDCB35",
  },
  yellow: {
    color: "#FDCB35",
  },
}));

export default function AppHeader() {
  const classes = useStyles();
  let history = useHistory();
  const { userHasAuthenticated, user } = useAppContext();
  const [pageUser, setPageUser] = useState({})
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  useEffect(() => {
      if (user) {
          setPageUser(user)
      }
  }, [user])

  async function handleLogout() {
      // sign out
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      userHasAuthenticated(false);
      alert("logout was successful")
      history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#08080C" }}>
          <EmojiNatureIcon className={classes.yellow} />
          <Typography variant="h6" className={classes.title}>
            HaniBee
          </Typography>
          {isAuthenticated ? (
            <>
            <Typography>
              Hello, {pageUser.nama}
            </Typography>
            <Button 
                color="inherit" 
                className={classes.yellow}
                onClick={handleLogout}
            >
              Logout
            </Button>
            </>
          ) : (
            <Button 
                color="inherit" 
                className={classes.yellow}
                onClick={() => {
                  history.push("/login")
                }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
