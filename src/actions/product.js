import { v4 as uuidv4 } from 'uuid';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const ADD_DRUG = 'ADD_DRUG';
export const EDIT_DRUG = 'EDIT_DRUG';
export const EDIT_PRICE = 'EDIT_PRICE';
export const LOADING = 'LOADING';
export const DELETE_DRUG = 'DELETE_DRUG';
export const ADD_PRICE = 'ADD_PRICE';

export const AddProduct = (data) => {
  return (dispatch) => {
    return dispatch({
      type: ADD_PRODUCT,
      data
    })
  }
}
export const EditPrice = (data) => {
  return (dispatch) => {
    return dispatch({
      type: EDIT_PRICE,
      data
    })
  }
}
export const EditProduct = (data) => {
    return (dispatch) => {
      return dispatch({
        type: EDIT_DRUG,
        data
      })
    }
  }
  
  export const AddDrug = (name) => {
    return (dispatch) => {
      return dispatch({
        type: ADD_DRUG,
        data: { name, id: uuidv4()}
      })
    }
}
export const DeleteDrugItem = (id) => {
  return (dispatch) => {
    return dispatch({
      type: DELETE_DRUG,
      id
    })
  }
}
export const loadingDrug = () => {
    return dispatch => {
      return dispatch({
        type: LOADING
      })
    }
}

export const addPrice = (drugId, price, priceId) => {
    return dispatch => {
      return dispatch({
        type: ADD_PRICE,
        data: { drugId, price, priceId }
      })
    }
}