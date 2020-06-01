import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Status from './Status';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import EditCard from './EditCard'
import { connect } from 'react-redux';
import { editCard } from '../Actions'

const CardConatainer = styled.div`
margin-bottom: 8px;
position: relative;
max-width: 100%;
word-wrap: break-word
`

class TrelloCard extends Component {

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
    let { id, listID } = this.props
    if (this.state.input === "") return
    this.props.dispatch(editCard(
      id, listID, this.state.input
    ))
  }

  submitInput = (data) => {
    this.setState({
      input: data
    })
  }

  render() {
    let { text, id, index, listID, status } = this.props
    return (
      <Draggable draggableId={String(id)} index={index}>
        {(provided) => (
          <CardConatainer onBlur={this.DoneEdit} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Card onClick={this.Edit}>
              <CardContent>
                <Typography style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between"
                }} gutterBottom>
                  {this.state.edit ?
                    <EditCard getInput={value => this.submitInput(value)} id={id} text={text} />
                    : text}
                  <Status sta_tus={status} id={id} listID={listID} />
                </Typography>
              </CardContent>
            </Card>
          </CardConatainer>
        )}
      </Draggable>
    )
  }
}

export default connect()(TrelloCard);