import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Checkbox } from '@material-ui/core';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { distance, price, loadCategories, day } from './FilterParams';
import { filterDistance, filterPrice, filterCategory, filterDay } from './FilterFunctions';

function Filter(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20,
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      flexShrink: 0,
    },
    accordionTitle: {
      fontFamily: 'Roboto Slab',
      fontWeight : 'medium',
    },
  }));

  const classes = useStyles();

  var [category, setCategory] = useState([]);
  var [expanded, setExpanded] = useState(false);
  var [activeCat, setActiveCat] = useState([]);
  var [activeDist, setActiveDist] = useState([]);
  var [activePrice, setActivePrice] = useState([]);
  var [activeDay, setActiveDay] = useState([]);
  var [tickedW, setTickedW] = useState(0);
  var [tickedM, setTickedM] = useState(0);

  useEffect(() => {
    (async () => {
        var cat = await loadCategories();
        setCategory(cat);
      })();
    }, []
  );

  const handleAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    event.preventDefault();
  }

  const handleCheckbox = () => (event, isChecked) => {
    var id = event.target.id;
    var value = event.target.value;
    var w = tickedW;
    var m = tickedM;

    switch (id) {
      case 'category':
        var cat = activeCat;
        isChecked? cat.push(value) : cat.splice(cat.indexOf(value), 1);
        isChecked? w++ : w--;
        setActiveCat(cat);
        setTickedW(w);
        chainFilters(w, m);
        return;

      case 'price':
        var price = activePrice;
        isChecked? price.push(value) : price.splice(price.indexOf(value), 1);
        isChecked? m++ : m--;
        setActivePrice(price);
        setTickedM(m);
        chainFilters(w, m);
        return;

      case 'distance':
        var dist = activeDist;
        isChecked? dist.push(value) : dist.splice(dist.indexOf(value), 1);
        isChecked? w++ : w--;
        setActiveDist(dist);
        setTickedW(w);
        chainFilters(w, m);
        return;

      case 'day':
        var day = activeDay;
        isChecked? day.push(value) : day.splice(day.indexOf(value), 1);
        isChecked? m++ : m--;
        setActiveDay(day);
        setTickedM(m);
        chainFilters(w, m);
        return;
    };
  }

  const chainFilters = (nw, nm) => {
    var m = props.menu
      .filter(filterPrice(activePrice))
      .filter(filterDay(activeDay));
    var f = props.warung
      .filter(filterCategory(activeCat))
      .filter(filterDistance(activeDist));

    props.onFilter(f, m, nw, nm);
  }

  
  function mapToForm(list) {
    return (list.map((data, id) => {
      return (
        <FormControlLabel 
          label={data.label}
          control={ 
            <Checkbox
              style={{color: '#FDCB35'}} 
              onChange={handleCheckbox()} 
              id={data.name} value={data.value} data-testid={data.value} 
              disableRipple/>
          }
        />
      );
    }));
  }

  return (
    <Accordion className={classes.root} expanded={expanded === 'panel'} onChange={handleAccordion('panel')} elevation={0} >
      <AccordionSummary className={classes.root}>
        <Typography className={classes.accordionTitle}>Filter Results</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root} spacing={2}>
        <Grid container justify="space-between">
          <Grid item>
            <FormLabel>Distance</FormLabel>
            <FormGroup className="params">
              { mapToForm(distance) }
            </FormGroup>
          </Grid>
          <Grid item>
            <FormLabel>Price</FormLabel>
            <FormGroup className="params">
              { mapToForm(price) }          
            </FormGroup>            
          </Grid>
          <Grid item>
            <FormLabel>Category</FormLabel>
            <FormGroup className="params">
              { mapToForm(category) }
            </FormGroup>            
          </Grid>
          <Grid item>
            <FormLabel>Day</FormLabel>
            <Grid container>
              <Grid item>
                <FormGroup className="params">
                  { mapToForm(day.slice(0, 4)) }  
                </FormGroup>
              </Grid>
              <Grid item>
                <FormGroup className="params">
                  { mapToForm(day.slice(4, 8)) }  
                </FormGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Filter;
