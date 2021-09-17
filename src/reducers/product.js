import { ADD_PRODUCT, EDIT_DRUG, LOADING, ADD_DRUG, EDIT_PRICE, DELETE_DRUG, ADD_PRICE } from "../actions/product";
import { format } from "date-fns";

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
      return { ...state, drugs: { ...state.drugs, [id]: {...state.drugs[id], name,id, prices: [] } } }
    }
    case DELETE_DRUG:{
      const { id } = action;
      const newDrugList = { ...state.drugs }
      delete newDrugList[id]
      return { ...state, drugs: newDrugList }
    }
    case ADD_PRICE:{
      const { data: { drugId, price, priceId } } = action;
      const drug = state.drugs[drugId];
      const drugPrices = drug.prices;
      const newPrice = { id: priceId, price, disabled: true, date: format(new Date(), "MM-dd-yyyy HH:mm") }
      drugPrices.push(priceId);
      console.log('newDrug::', drug, drugPrices)
      console.log('drugId::price:::', drugId, price)
      console.log('new Pric', newPrice)
      // return state;

      return {
        ...state,
          drugs: { ...state.drugs, [drugId]: {...state.drugs[drugId], prices: drugPrices } },
          prices: { ...state.prices, [priceId]: { ...newPrice } }
      }
    }
    case LOADING:
      return { ...state, loading: true }
    default:
      return state;
  }

}

export default productReducer;