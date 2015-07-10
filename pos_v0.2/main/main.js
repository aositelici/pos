function reWriteInput(inputs) {
  var count = {};
  for(var i = 0;i < inputs.length; i ++){
      count[inputs[i]] = count[inputs[i]] + 1 || 1;
    }
  var result =[];
  for(var bar in count){
    result.push({barcode:bar,count:count[bar]});
  }
  return result;
  }

function print(input){
  var item=['名称：','数量：','单价：','小计：'];
  var unit='(元)';
  var totalPrice = input.count*input.price;
  var text = item[0] + input.name + '，' +item[1] + input.count + input.unit + '，' + item[2] +input.price.toFixed(2) + unit + '，'
    + item[3] + totalPrice.toFixed(2) + unit +'\n';
  return {text: text, totalprice: totalPrice};
}

function getPrintIterm(input,all){
  var printItem = all.filter(function(item){
    for(var x =0; x < input.length; x++){
      if(item.barcode === input[x].barcode){
        return true;
      }
    }
  });
  for(var i = 0; i< printItem.length; i ++){
    printItem[i].count = input[i].count;
  }
  return printItem;
}

function printReceipt(inputs) {
  var text = '***<没钱赚商店>收据***\n';
  var totalPrice = 0;
  var inputItem = reWriteInput(inputs);
  var allItem = loadAllItems();
  var findItem = getPrintIterm(inputItem,allItem);
  for(var i = 0; i < findItem.length; i ++){
    text += print(findItem[i]).text;
    totalPrice += print(findItem[i]).totalprice;
  }
  text += '----------------------\n' + '总计：' + totalPrice.toFixed(2) + '(元)\n' +'**********************';
  console.log(text);
}