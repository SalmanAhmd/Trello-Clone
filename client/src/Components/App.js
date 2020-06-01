import React, { Component } from 'react';
import TrelloList from './TrelloList';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import TrelloActionButton from './TrelloActionButton';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { sort, refresh, reset } from '../Actions';
import styled from 'styled-components';
import axios from 'axios';
import NavBar from './NavBar';
import Listing from './Listing';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const ListContainer = styled.div`
  display: flex;
  flex-direction: row
`
class App extends Component {

  componentDidMount = async () => {
    let data = await axios('http://localhost:9091/trello')
    this.props.dispatch(refresh(data.data.result.trello))
  }

  onDragEnd = (result) => {
    //reorderinglogic
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    this.props.dispatch(sort(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index,
      draggableId,
      type
    ))
  }

  resetBoard = async () => {
    let data = await axios.put('http://localhost:9091/trello')
    if (data.data.data.trello)
      this.props.dispatch(reset())
  }

  render() {

    const { lists } = this.props;

    return (
      <>
        <Router>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link to='/'><a href="/"><h1>HOME</h1></a></Link>
                <div style={{ marginTop: "25px" }}>
                  <NavBar />
                </div>
                <div>
                  <Button
                    variant="contained"
                    style={{ color: "white", backgroundColor: "#5aac44", margin: "25px" }}
                    onClick={this.resetBoard}
                  >
                    Reset Board
              </Button>
                </div>
              </div>
              <Switch>
                <Route exact path="/" >
                  <Droppable droppableId="all-list" direction="horizontal" type="list">
                    {provided => (
                      <ListContainer {...provided.droppableProps} ref={provided.innerRef}>
                        {lists.map((list, index) =>
                          <TrelloList
                            listID={list.id}
                            key={list.id}
                            title={list.title}
                            cards={list.cards}
                            index={index} />
                        )}
                        {provided.placeholder}
                        <TrelloActionButton list />
                      </ListContainer>
                    )}
                  </Droppable>
                </Route>
                <Route path="/search" component={Listing} />
              </Switch>
            </div>
          </DragDropContext>
        </Router>
      </>
    );
  }
}

const mapstateToProps = state => ({
  lists: state.lists
});

export default connect(mapstateToProps)(App);