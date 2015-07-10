function reWriteInput(inputs) {
  var count = {};
  for(var i = 0;i < inputs.length; i ++){
    if(inputs[i].indexOf('-') !== -1){
      count[inputs[i].slice(0,inputs[i].length-2)] = parseInt(inputs[i].slice(-1));
    }
    else{
      count[inputs[i]] = count[inputs[i]] + 1 || 1;
    }
  }
  var result =[];
  for(var bar in count){
    result.push({barcode:bar,count:count[bar]});
  }
  return result;
}
function getCount(printItem,sale){
  for(var i = 0; i < sale.barcodes.length; i++){
    if(printItem.barcode === sale.barcodes[i]){
      printItem.countSale = parseInt(printItem.count/3);
      break;
    }
    else
      printItem.countSale = 0;
  }
  return printItem;
}
function getPrintItem(input,all,sale){
  var printItem = all.filter(function(item){
    for(var x =0; x < input.length; x++){
      if(item.barcode === input[x].barcode){
        return true;
      }
    }
  });
  for(var i = 0; i< printItem.length; i ++){
    printItem[i].count = input[i].count;
    printItem[i] = getCount(printItem[i],sale);
  }
  return printItem;
}
function printDetail(inputs) {
  var item = ['名称：', '数量：', '单价：', '小计：'];
  var unit = '(元)';
  var text = '***<没钱赚商店>收据***\n';
  var totalPrice = 0;
  var totalSalePrice = 0;
  for (var i = 0; i < inputs.length; i++) {
    var price = (inputs[i].count - inputs[i].countSale) * inputs[i].price;
    var salePrice = inputs[i].countSale * inputs[i].price;
    totalPrice += price;
    totalSalePrice += salePrice;
    text += item[0] + inputs[i].name + '，' + item[1] + inputs[i].count + inputs[i].unit + '，' + item[2] +
      inputs[i].price.toFixed(2) + unit + '，' + item[3] + price.toFixed(2) + unit + '\n';
  }
  return {text: text, totalprice: totalPrice, totalsaleprice: totalSalePrice};
}
function print(inputs){
  var item=['名称：','数量：','单价：','小计：'];
  var unit='(元)';
  var detail = printDetail(inputs);
  detail.text += '----------------------\n' + '挥泪赠送商品：\n';
  for(var i = 0; i < inputs.length; i ++) {
    if(inputs[i].countSale != 0){
      detail.text += item[0] + inputs[i].name + '，' + item[1] + inputs[i].countSale + inputs[i].unit + '\n';
    }
  }
  detail.text += '----------------------\n'  + '总计：' +detail.totalprice.toFixed(2) + unit+ '\n' +'节省：'+detail.totalsaleprice.toFixed(2) +
  unit +'\n'+'**********************';
  return detail.text;
}
function printReceipt(inputs) {
  var inputItem = reWriteInput(inputs);
  var allItem = loadAllItems();
  var saleItem = loadPromotions()[0];
  var findItem = getPrintItem(inputItem,allItem,saleItem);
  var text = print(findItem);
  console.log(text);
}
