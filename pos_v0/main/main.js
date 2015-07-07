function print(input){
  var item=['名称：','数量：','单价：','小计：'];
  var unit='(元)';
  var totalPrice = input.count*input.price;
  var text = item[0] + input.name + '，' +item[1] + input.count + input.unit + '，' + item[2] +input.price.toFixed(2) + unit + '，'
  + item[3] + totalPrice.toFixed(2) + unit +'\n';
  return {text: text, totalprice: totalPrice};
}
function printReceipt(inputs) {
  var text = '***<没钱赚商店>收据***\n';
  var totalPrice = 0;
  for(var i = 0;i < inputs.length; i ++){
    text += print(inputs[i]).text;
    totalPrice += print(inputs[i]).totalprice;
  }
  text += '----------------------\n' + '总计：' + totalPrice.toFixed(2) + '(元)\n' +'**********************';
  console.log(text);
}
