import { CONSTANTS } from '../Actions'

export const addCard = (id, text) => {
  return {
    type: CONSTANTS.ADD_CARD, payload: { id, text }
  }
}

export const editCard = (id, listID, text) => {
  return {
    type: CONSTANTS.EDIT_CARD, payload: { id, listID, text }
  }
}

export const editStatus = (id, listID, status) => {
  return {
    type: CONSTANTS.EDIT_STATUS, payload: { id, listID, status }
  }
}