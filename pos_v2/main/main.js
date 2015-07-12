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
    var newInput = new ChangedInput(bar,count[bar]);
    result.push(newInput);
  }
  return result;
}
function getCount(printItem,sale,count){
  var countSale;
  sale.barcodes.forEach(function(bar){
    if(printItem.barcode === bar){
      countSale = parseInt(count/3);
    }
  });
  return countSale;
}
function getPrintItem(input,all,sale){
  var printItem = all.filter(function(item){
    for(var x in input){
      if(item.barcode === input[x].barcode){
        return true;
      }
    }
  });
  var i = 0;
  var fullItem = [];
  printItem.forEach(function(item){
    var count = input[i++].count;
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
  var dateDigitToString = function(num) {
    return num < 10 ? '0' + num : num;
  };
  var currentDate = new Date(),
    year = dateDigitToString(currentDate.getFullYear()),
    month = dateDigitToString(currentDate.getMonth() + 1),
    date = dateDigitToString(currentDate.getDate()),
    hour = dateDigitToString(currentDate.getHours()),
    minute = dateDigitToString(currentDate.getMinutes()),
    second = dateDigitToString(currentDate.getSeconds());
  var formattedDateString = year + '年' + month + '月' + date + '日 ' + hour + ':' + minute + ':' + second;
  return formattedDateString;
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
