import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    margin: 25,
    minWidth: 275,
    maxWidth: 300
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function SimpleCard({ lists }) {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let foo = params.get('text').toLowerCase();

  const classes = useStyles();
  let result = [];
  (function () {
    const regex = new RegExp(`${foo}`);
    for (let i in lists) {
      for (let j in lists[i].cards)
        if (regex.test((lists[i].cards[j].text).toLowerCase()))
          result.push({ title: lists[i].title, card: lists[i].cards[j] })
    }
    console.log({ result })
  })()

  return (
    <div style={{ display: "flex", justifyContent: "flex-start", flexWrap: "wrap" }}>
      {result.map((elem) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {elem.title}
            </Typography>
            <Typography variant="h5" component="h2">
              {elem.card.text}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {elem.card.status}
            </Typography>
          </CardContent>
        </Card>
      ))
      }
    </div>
  );
}

const mapstateToProps = state => ({
  lists: state.lists
});

export default connect(mapstateToProps)(SimpleCard)