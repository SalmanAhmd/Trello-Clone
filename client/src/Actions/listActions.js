import { CONSTANTS } from '../Actions'

export const addList = title => {
  return {
    type: CONSTANTS.ADD_LIST, payload: title
  }
}

export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart,
      draggableId,
      type,
    }
  };
};

export const editTitle = (listID, text) => {
  return {
    type: CONSTANTS.EDIT_TITLE, payload: { listID, text }
  }
}

export const refresh = data => {
  return {
    type: CONSTANTS.REFRESH, payload: data
  }
}

export const reset = () => {
  return {
    type: CONSTANTS.RESET
  }
}