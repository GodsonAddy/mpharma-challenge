const dataTransformer = (drugs=[]) => {
    const items  = { meds: {}, prices: {} };
    for(let drug of drugs) {
      items.meds[drug.id] = { name: drug.name, id: drug.id, prices: [] }
      for(let price of drug.prices) {
        items.prices[price.id] = price;
        items.meds[drug.id].prices.push(price.id);
      }
    }
    return items;
}
export default dataTransformer;