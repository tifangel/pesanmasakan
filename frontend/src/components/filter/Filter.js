import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import { distance, price, loadCategories, loadDistances, day } from './FilterParams';
import { filterDistance, filterPrice, filterCategory, filterDay } from './FilterFunctions';

function Filter(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 20,
      marginLeft: theme.spacing(5),
      marginRight: theme.spacing(5),
      flexShrink: 0,
    },
    params: {

    }
  }));

  var [category, setCategory] = useState([]);
  var [expanded, setExpanded] = useState(false);
  var [activeCat, setActiveCat] = useState([]);
  var [activeDist, setActiveDist] = useState([]);
  var [ticked, setTicked] = useState(0);

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
    var n = ticked;

    isChecked ? n++ : n--;
    setTicked(n);

    switch (id) {
      case 'category':
        var cat = activeCat;
        isChecked? cat.push(value) : cat.splice(cat.indexOf(value), 1);
        setActiveCat(cat);

        var f = props.original.filter(filterCategory(activeCat));
        chainFilters(n);
        return;

      case 'price':
        console.log("price");
        var f = filterPrice(value, props.original, props.current, isChecked);
        props.onFilter(f, n);
        return;

      case 'distance':
        var dist = activeDist;
        isChecked? dist.push(value) : dist.splice(dist.indexOf(value), 1);
        setActiveDist(dist);

        var f = props.original.filter(filterDistance(activeDist));
        chainFilters(n);
        return;

      case 'day':
        console.log("day");
        var f = filterDay(value, props.original, props.current, isChecked);
        props.onFilter(f, n);
        return;
    };
  }

  const chainFilters = (n) => {
    var f = props.original
      .filter(filterCategory(activeCat))
      .filter(filterDistance(activeDist));
    props.onFilter(f, n);
  }

  function mapToForm(list) {
    return (list.map((data, id) => {
      return (
        <FormControlLabel 
          control={ <Checkbox onChange={handleCheckbox()} id={data.name} value={data.value} />}
          label={data.label}
        />
      );
    }));
  }

  const classes = useStyles();
  return (
    <Accordion className={classes.root} expanded={expanded === 'panel'} onChange={handleAccordion('panel')} >
      <AccordionSummary>
        Filter
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
        <FormLabel>Distance</FormLabel>
          <FormGroup row={true} className="params">
            { mapToForm(distance) }
          </FormGroup>
          <FormLabel>Price</FormLabel>
          <FormGroup row={true} className="params">
            { mapToForm(price) }          
          </FormGroup>
          <FormLabel>Category</FormLabel>
          <FormGroup row={true} className="params">
            { mapToForm(category) }
          </FormGroup>
          <FormLabel>Day</FormLabel>
          <FormGroup row={true} className="params">
            { mapToForm(day) }  
          </FormGroup>
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
}

export default Filter;
