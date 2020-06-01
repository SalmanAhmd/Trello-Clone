import { CONSTANTS } from '../Actions';
import axios from 'axios'

const initialState = [
  // {
  //   title: "Trello Clone ..",
  //   id: '500',
  //   cards: [
  //     {
  //       id: '0',
  //       text: "Click To Edit"
  //     },
  //   ]
  // },
]

const listReducer = (state = initialState, action) => {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {

    case CONSTANTS.REFRESH:
      stateCopy = action.payload
      console.log({ stateCopy })
      return stateCopy;


    case CONSTANTS.RESET:
      stateCopy = initialState;
      return stateCopy;


    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: genListID(stateCopy)
      }
      updateDB([...state, newList])
      return [...state, newList]


    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: genCardID(stateCopy)
      }
      const newState = state.map(list => {
        if (list.id === action.payload.id)
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        else return list
      })
      updateDB(newState)
      return newState
    }


    case CONSTANTS.DRAG_HAPPENED:
      const { droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        type } = action.payload;
      const newState = [...state]

      //list drag
      if (type === 'list') {
        const list = newState.splice(droppableIndexStart, 1);
        newState.splice(droppableIndexEnd, 0, ...list);
        updateDB(newState)
        return newState;
      }
      // same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => parseInt(droppableIdStart) === list.id)
        const card = list.cards.splice(droppableIndexStart, 1)
        list.cards.splice(droppableIndexEnd, 0, ...card)
      }

      // different list
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = state.find(list => parseInt(droppableIdStart) === list.id)
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = state.find(list => parseInt(droppableIdEnd) === list.id);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }

      updateDB(newState)
      return newState


    case CONSTANTS.EDIT_CARD:
      for (let i in stateCopy) {
        if (stateCopy[i].id === action.payload.listID) {
          for (let j in stateCopy[i].cards) {
            if (stateCopy[i].cards[j].id === action.payload.id)
              stateCopy[i].cards[j].text = action.payload.text
          }
        }
      }
      updateDB(stateCopy)
      return stateCopy


    case CONSTANTS.EDIT_TITLE:
      for (let i in stateCopy) {
        if (stateCopy[i].id === action.payload.listID) {
          stateCopy[i].title = action.payload.text
        }
      }
      updateDB(stateCopy)
      return stateCopy


    case CONSTANTS.EDIT_STATUS:
      for (let i in stateCopy) {
        if (stateCopy[i].id === action.payload.listID) {
          for (let j in stateCopy[i].cards) {
            if (stateCopy[i].cards[j].id === action.payload.id)
              stateCopy[i].cards[j].status = action.payload.status
          }
        }
      }
      updateDB(stateCopy)
      return stateCopy

    default:
      return stateCopy;
  }
}

export default listReducer;

const updateDB = async (data) => {
  await axios.post('http://localhost:9091/trello/update', { trello: data });
}

const genListID = (data) => {
  let max = 501;
  for (let i in data) {
    if (data[i].id > max)
      max = data[i].id;
  }
  return max + 1;
}

const genCardID = (data) => {
  let max = 1;
  for (let i in data) {
    for (let j in data[i].cards)
      if (data[i].cards[j].id > max)
        max = data[i].cards[j].id;
  }
  return max + 1;
}