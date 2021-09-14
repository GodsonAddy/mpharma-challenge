import { ADD_PRODUCT, EDIT_DRUG, LOADING, ADD_DRUG, EDIT_PRICE, DELETE_DRUG } from "../actions/product";

const intialState = {
  loading: false,
  drugs: {},
  prices: {}
}
const productReducer = (state=intialState, action) => {
  switch(action.type) {
    case EDIT_DRUG:{
      const { data: { id, name } } = action;
      return { ...state, drugs: { ...state.drugs, [id]: {...state.drugs[id], name} } }
    }
    case EDIT_PRICE:{
      const { data: { id, price } } = action;
      return { ...state, prices: { ...state.prices, [id]: {...state.prices[id], price} } }
    }
    case ADD_PRODUCT:{
      const { data: { meds, prices } } = action;
      return { ...state, drugs: meds, prices, loading: false };
    }
    case ADD_DRUG:{
      const { data: { id, name } } = action;
      return { ...state, drugs: { ...state.drugs, [id]: {...state.drugs[id], name, prices: [] } } }
    }
    case DELETE_DRUG:{
      const { id } = action;
      const newDrugList = { ...state.drugs }
      delete newDrugList[id]
      return { ...state, drugs: newDrugList }
    }
    case LOADING:
      return { ...state, loading: true }
    default:
      return state;
  }

}
export default productReducer;