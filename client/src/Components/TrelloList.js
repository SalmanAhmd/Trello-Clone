import React, { Component } from 'react';
import TrelloCard from './TrelloCard';
import TrelloActionButton from './TrelloActionButton';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import EditCard from './EditCard'
import { connect } from 'react-redux';
import { editTitle } from '../Actions'

const ListContainer = styled.div`
  background-color: #dfe3e6;
  border-radius: 3px;
  min-width: 300px;
  padding: 8px;
  margin-right: 8px;
  height: 100%
`
class TrelloList extends Component {

  state = {
    edit: false,
    input: "",
  }

  Edit = () => {
    this.setState({
      edit: true
    })
  }

  DoneEdit = () => {
    this.setState({
      edit: false
    })
    let { listID } = this.props
    if (this.state.input === "") return
    this.props.dispatch(editTitle(
      listID, this.state.input
    ))
  }

  submitInput = (data) => {

    this.setState({
      input: data
    })
  }

  render() {
    const { title, cards, listID, index } = this.props

    return (
      <Draggable draggableId={String(listID)} index={index}>
        {provided => (
          <ListContainer {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
            <Droppable droppableId={String(listID)}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <h4 onBlur={this.DoneEdit} onClick={this.Edit}>{this.state.edit ? <EditCard getInput={value => this.submitInput(value)} id={listID} text={title} /> : title}</h4>
                  {cards.map((card, index) =>
                    <TrelloCard key={card.id} text={card.text} id={card.id} status={card.status} listID={listID} index={index} />
                  )}
                  {provided.placeholder}
                  <TrelloActionButton listID={listID} />
                </div>
              )}
            </Droppable>
          </ListContainer>
        )}
      </Draggable>
    )
  }
}

export default connect()(TrelloList);