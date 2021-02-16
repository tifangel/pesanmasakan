import './InfoTambahan.css';

import Carousel from 'react-material-ui-carousel'
import {Paper, Button} from '@material-ui/core'

function InfoTambahan()
{
  const settings = {
    navButtonsAlwaysVisible: true,
    animation: "slide",
  }
  var items = [
      {
          name: "Random Name #1",
          description: "Probably the most random thing you have ever seen!"
      },
      {
          name: "Random Name #2",
          description: "Hello World!"
      }
  ]

  return (
      <Carousel {...settings}>
          {
              items.map( (item, i) => <Item key={i} item={item} /> )
          }
      </Carousel>
  )
}

function Item(props)
{
    return (
        <Paper variant="outlined">
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton" variant="outlined">
                Check it out!
            </Button>
        </Paper>
    )
}

export default InfoTambahan;
