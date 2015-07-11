function reWriteInput(inputs) {
  var count = {};
  inputs.forEach(function(input){
    if(input.indexOf('-') !== -1){
      count[input.slice(0,input.length-2)] = parseInt(input.slice(-1));
    }
    else{
      count[input] = count[input] + 1 || 1;
    }
  });
  var result =[];
  for(var bar in count){
    result.push({barcode:bar,count:count[bar]});
  }
  return result;
}
function getCount(printItem,sale){
  printItem.countSale = 0;
  sale.barcodes.forEach(function(bar){
    if(printItem.barcode === bar){
      printItem.countSale = parseInt(printItem.count/3);
      return printItem;
    }
  });
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
  var i = 0;
  printItem.forEach(function(item){
    item.count = input[i++].count;
    getCount(item,sale);
  });
  return printItem;
}
function partText(input){
  var price = (input.count - input.countSale) * input.price;
  var salePrice = input.countSale * input.price;
  var text = '名称：' + input.name + '，' + '数量：' + input.count + input.unit + '，' + '单价：' +
    input.price.toFixed(2) + '(元)' + '，' + '小计：' + price.toFixed(2) + '(元)' + '\n';
  return {text: text, price: price, saleprice: salePrice};
}
function printDetail1(inputs) {
  var text = '***<没钱赚商店>收据***\n';
  var totalPrice = 0;
  var totalSalePrice = 0;
  inputs.forEach(function(input){
    totalPrice += partText(input).price;
    totalSalePrice += partText(input).saleprice;
    text += partText(input).text;
  });
  return {text: text, totalprice: totalPrice, totalsaleprice: totalSalePrice};
}
function printDetail2(inputs) {
  var text = '';
  inputs.forEach(function(input){
    if(input.countSale){
      text += '名称：' + input.name + '，' + '数量：' + input.countSale + input.unit + '\n';
    }
  });
  return text;
}
function print(inputs){
  var detail = printDetail1(inputs);
  var text = detail.text;
  text += '----------------------\n'
    + '挥泪赠送商品：\n';
  text += printDetail2(inputs);
  text += '----------------------\n'
    + '总计：' +detail.totalprice.toFixed(2) + '(元)'+ '\n' +'节省：' +detail.totalsaleprice.toFixed(2) + '(元)'
    +'\n'+'**********************';
  return text;
}
function printReceipt(inputs) {
  var inputItem = reWriteInput(inputs);
  var allItem = loadAllItems();
  var saleItem = loadPromotions()[0];
  var findItem = getPrintItem(inputItem,allItem,saleItem);
  var text = print(findItem);
  console.log(text);
}
