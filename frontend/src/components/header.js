import React from "react";
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

export default function AppHeader({ username }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: "#08080C" }}>
          <EmojiNatureIcon className={classes.yellow} />
          <Typography variant="h6" className={classes.title}>
            HaniBee
          </Typography>
          {username ? (
            <Typography>
              Hello, {username}!
            </Typography>
          ) : (
            <Button color="inherit" className={classes.yellow}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
