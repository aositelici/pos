/*function ChangedInput(barcode, count){
  this.barcode = barcode;
  this.count = count ;
}
function NewItem(barcode, name, unit, price, count, countsale) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.count = count ;
  this.countSale = countsale || 0;
}
function PrintDetail(text,price,saleprice){
  this.text = text;
  this.price = price;
  this.saleprice = saleprice;
}*/
function reWriteInput(inputs) {
  var count = {};
  inputs.forEach(function(input){
    if(_.includes(input,'-')){
      count[input.slice(0,input.length-2)] = parseInt(input.slice(-1));
    }
    else{
      count[input] = count[input] + 1 || 1;
    }
  });
  var result =[];
  for(var bar in count){
    var newInput = new ChangedInput(bar,count[bar]);
    result.push(newInput);
  }
  return result;
}
function getCount(printItem,sale,count){
  var countSale;
  if(_.includes(sale.barcodes,printItem.barcode)){
    countSale = parseInt(count/3);
  }
  return countSale;
}
function getPrintItem(input,all,sale){
  var printItem = all.filter(function(item){
    return ((_.pluck(input, 'barcode')).indexOf(item.barcode) !== -1);
  });
  var fullItem = [];
  printItem.forEach(function(item){
    var count = input[_.findIndex(printItem,item)].count;
    var countSale = getCount(item,sale,count);
    var fullOne = new NewItem(item.barcode,item.name, item.unit, item.price,count,countSale);
    fullItem.push(fullOne);
  });
  return fullItem;
}
function partText(input){
  var price = (input.count - input.countSale) * input.price;
  var salePrice = input.countSale * input.price;
  var text = '名称：' + input.name + '，' + '数量：' + input.count + input.unit + '，' + '单价：' +
    input.price.toFixed(2) + '(元)' + '，' + '小计：' + price.toFixed(2) + '(元)' + '\n';
  var printDetail = new PrintDetail(text, price, salePrice);
  return printDetail;
}
function datashow(){
  var date = moment().format('YYYY年MM月DD日 HH:mm:ss');
  return date;
}
function printDetail1(inputs) {
  var text = '***<没钱赚商店>收据***\n' +
    '打印时间：' + datashow() + '\n' +
    '----------------------\n';
  var price = 0;
  var salePrice = 0;
  inputs.forEach(function(input){
    price += partText(input).price;
    salePrice += partText(input).saleprice;
    text += partText(input).text;
  });
  var printDetail = new PrintDetail(text, price, salePrice);
  return printDetail;
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
    + '总计：' +detail.price.toFixed(2) + '(元)'+ '\n' +'节省：' +detail.saleprice.toFixed(2) + '(元)'
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

