function printReceipt(barcodes) {
  var items = [];
  var allItems = loadAllItems();
  barcodes.forEach(function(barcode){
    var item = findItem(allItems,barcode);
    if(item){
      items.push(item);
    }
  });
  var itemCarts = getItemCart(items);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(itemCarts) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(itemCarts)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}
function getItemCart(items){
  var itemCarts = [];
  items.forEach(function(item){
    var itemCart = findItemCart(itemCarts,item.barcode);
    if(itemCart){
      itemCart.count++;
    }
    else{
      itemCarts.push(
        {
          subItem:item,
          count:1
        }
      );
    }
  });
  return itemCarts;
}
function findItemCart(items,barcode){
  var value;
  items.forEach(function(item){
    if(item.subItem.barcode === barcode){
      value = item;
      return false;
    }
  });
  return value;
}
function getSubTotal(count, price) {
  return count * price;
}

function getAmount(items) {
  var amount = 0;

  items.forEach(function(item) {
    amount += getSubTotal(item.count, item.subItem.price);
  });

  return amount;
}

function getItemsString(items) {

  var itemsString = '';
  items.forEach(function(item) {
    itemsString +=
      '名称：' + item.subItem.name +
      '，数量：' + item.count + item.subItem.unit +
      '，单价：' + formatPrice(item.subItem.price) +
      '(元)，小计：' + formatPrice(getSubTotal(item.count, item.subItem.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
function findItem(items,barcode){
  var value;
  for(var i = 0; i < items.length; i++){
    if(items[i].barcode === barcode)
    {
      value = items[i];
      break;
    }
  }
  return value;
}
