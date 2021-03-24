import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import "./styleinfo.css";
import { getMenuListByWarungId, getDaysbyMenuId } from "../resource";
import MenuListPenjual from "../components/MenuListPenjual";

const { defaultAPIURL } = require("../config");

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
  },
  iconback: {
    margin: "3% 0 0 3%",
    backgroundColor: "#FDCB35",
  },
  info: {
    padding: "6.5% 0 13% 0",
  },
  cat: {
    display: "inline",
    padding: 0,
    backgroundColor: "#FDCB35",
    fontSize: "1.95vw",
    fontFamily: "Inter",
    fontWeight: "light",
    position: "relative",
    top: "3px",
    position: "relative",
    left: "18%",
  },
  title: {
    color: "#FDCB35",
    fontSize: "4.5vw",
    fontFamily: "Roboto Slab",
    fontWeight: "black",
    width: "73vw",
    margin: 0,
    paddingTop: "0.2vw",
    paddingBottom: "0.2vw",
    backgroundColor: "#08080C",
    borderRadius: "25px",
    textAlign: "center",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  detail: {
    width: "68vw",
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  boxdetail: {
    padding: 0,
    margin: 0,
    paddingTop: 0.3,
    paddingLeft: 6,
    fontSize: "1.17vw",
    fontFamily: "Inter",
    fontWeight: "light",
  },
  basket: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    border: "0.5px solid #C4C4C4",
    borderRadius: "5px",
    height: "641px",
  },
}));

const MenuCmsPage = (props) => {
  const [id, setID] = useState(0);
  const classes = useStyles();

  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    async function loadMenu() {
      try {
        setID(props.match.params.id);

        let responseMenu = await getMenuListByWarungId(id);
        if (responseMenu.status === 200) {
          setMenuList(responseMenu.data.values);
        }
      } catch (e) {
        console.log(e);
      }
    }
    loadMenu();
  }, [id, props.match.params.id]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12}>
            <MenuListPenjual data={menuList} onMenuClick={() => {}}/>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default MenuCmsPage;
