import React, { Component } from 'react';
import { Icon, Button, Card } from '@material-ui/core';
import TextArea from "react-textarea-autosize";
import { connect } from 'react-redux';
import { addList, addCard } from '../Actions'

class TrelloActionButton extends Component {

  state = {
    formOpen: false,
    text: ""
  }

  renderAddButton = () => {
    const { list } = this.props
    const text = list ? "Add another list" : "Add another card"
    const textOpacity = list ? 1 : 0.5;
    const textColor = list ? "white" : "inherit";
    const textBackground = list ? "rgba(0,0,0,.15" : "inherit";

    return (
      <div
        onClick={this.openForm}
        style={{
          ...style.openForButtonGroup,
          opacity: textOpacity,
          color: textColor,
          backgroundColor: textBackground
        }}>
        <Icon>add</Icon>
        <p>{text}</p>
      </div>
    )
  }

  openForm = () => {
    this.setState({
      formOpen: true
    })
  }

  closeForm = e => {
    this.setState({
      formOpen: false
    })
  }

  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  }

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state
    text && dispatch(addList(text)) && this.resetText();
    return;
  }

  handleAddCard = () => {
    const { dispatch, listID } = this.props;
    const { text } = this.state
    text && dispatch(addCard(listID, text)) && this.resetText();
    return;
  }

  resetText = () => {
    this.setState({
      text: ""
    })
  }

  renderForm = () => {

    const { list } = this.props;
    const placeholder = list ? "Enter list title..." : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";

    return <div>
      <Card style={{
        minHeight: 80,
        minWidth: 272,
        padding: "6px 8px 2px"
      }}>
        <TextArea
          placeholder={placeholder}
          autoFocus
          onBlur={this.closeForm}
          value={this.state.text}
          onChange={this.handleChange}
          style={{
            overflow: "hidden",
            resize: "none",
            width: "100%",
            outline: "none",
            border: "none"
          }} />
      </Card>
      <div style={style.formButtonGroup}>
        <Button
          variant="contained"
          style={{ color: "white", backgroundColor: "#5aac44" }}
          onMouseDown={list ? this.handleAddList : this.handleAddCard} >
          {buttonTitle}
        </Button>
        <Icon style={{ marginLeft: 8, cursor: "pointer", }}>close</Icon>
      </div>
    </div>
  }

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton()
  }
}

const style = {
  openForButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    minWidth: 272,
    paddingLeft: 10
  },
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center"
  }
}


export default connect()(TrelloActionButton);