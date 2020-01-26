//replace card template function
module.exports = (temp, product) => {
  let output = temp.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%ProductNAmE%}/g, product.productName);
  output = output.replace(/{%quantity%}/g, product.quantity);
  output = output.replace(/{%price%}/g, product.price);
  output = output.replace(/{%NutrientName%}/g, product.nutrients);
  output = output.replace(/{%id%}/g, product.id);
  output = output.replace(/{%Productcountry%}/g, product.from);
  output = output.replace(/{%Description%}/g, product.description);
  output = output.replace(/{%From%}/g, product.from);

  if (!product.organic)
    output = output.replace(/{%Not_organic%}/g, 'not-organic');

  return output;
};
