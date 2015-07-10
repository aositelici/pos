function getcount(inputs, i) {
  var count = 1;
  for (var x = i + 1; x < inputs.length; x ++) {
    if (inputs[x].barcode === inputs[i].barcode) {
      count++;
    }
    else {
      break;
    }
  }
  return count;
}
function print(input ,count){
  var item=['名称：','数量：','单价：','小计：'];
  var unit='(元)';
  var totalPrice = count*input.price;
  var text = item[0] + input.name + '，' +item[1] + count + input.unit + '，' + item[2] +input.price.toFixed(2) + unit + '，'
    + item[3] + totalPrice.toFixed(2) + unit +'\n';
  return {text: text, totalprice: totalPrice};
}
function printReceipt(inputs) {
  var text = '***<没钱赚商店>收据***\n';
  var totalPrice = 0;
  for(var i = 0;i < inputs.length; i+=number){
    var number = getcount(inputs,i);
    text += print(inputs[i],number).text;
    totalPrice += print(inputs[i],number).totalprice;
  }
  text += '----------------------\n' + '总计：' + totalPrice.toFixed(2) + '(元)\n' +'**********************';
  console.log(text);
}
