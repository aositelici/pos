function printReceipt(barcodes) {
  var items = [];
  var allItems = loadAllItems();
  items = getItems(allItems,barcodes);
  var cartItems = getCartItem(items);

  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getSalesItemString(cartItems)+
    '----------------------\n' +
  '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
  '节省：'+formatPrice(getSalesAmount(cartItems))+'(元)\n' +
  '**********************';

  console.log(receipt);
}
function getItems(allItems,barcodes){
  var items = [];
  barcodes.forEach(function(barcode){
    var item = findItem(allItems,barcode);
    var count =getHiddenCount(allItems,barcode);
    if(item){
      for(var i =0;i<count;i++){
        items.push(item);
      }
    }
  });
  return items;
}
function getCartItem(items){
  var itemCarts = [];
  items.forEach(function(item){
    var itemCart = findCartItem(itemCarts,item.barcode);

    if(itemCart){
      itemCart.count++;
    }
    else{
      if(item)
        itemCarts.push(
        {
          subItem:item,
          count:1,
          saleCount:0
        }
      );
    }
  });
  var saleItems = loadPromotions();
  itemCarts.forEach(function(itemCart){
    calculateSalesCount(saleItems,itemCart);
  })
  return itemCarts;
}
function calculateSalesCount(items,itemCart) {
  var barcodes = items[0].barcodes;
  for(var i =0; i < barcodes.length; i++)
   if(itemCart.subItem.barcode === barcodes[i]){
     itemCart.saleCount = parseInt(itemCart.count/3);
     break;
   }
}
function findCartItem(items,barcode){
  var value;
  items.forEach(function(item){
    if(item.subItem.barcode === barcode){
      value = item;
      return false;
    }
  });
  return value;
}
function getHiddenCount(items,barcode){
  var count = 1;
  items.forEach(function(item){
    if(item.barcode === barcode.slice(0,10)){
      if(barcode.indexOf('-') != -1) {
        count = parseInt(barcode.slice(-1));
      }
     return ;
    };
  });
  return count;
}
function getSubTotal(count, price) {
  return count * price;
}

function getAmount(items) {
  var amount = 0;

  items.forEach(function(item) {
    amount += getSubTotal(item.count-item.saleCount, item.subItem.price);
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
      '(元)，小计：' + formatPrice(getSubTotal(item.count-item.saleCount, item.subItem.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
function findItem(items,barcode){
  var value;
  items.forEach(function(item){
    if(item.barcode === barcode.slice(0,10))
    {
      value = item;
      return ;
    }
  })
  return value;
}

function  getSalesItemString(items){
  var itemsString = '';

  items.forEach(function(item) {
    if(item.saleCount!=0){
      itemsString +=
        '名称：' + item.subItem.name +
        '，数量：' + item.saleCount + item.subItem.unit +'\n';
    }
  });

  return itemsString;
}
function getSalesAmount(items){
  var amount = 0;

  items.forEach(function(item) {
    if(item.saleCount !== 0)
    {
      amount += getSubTotal(item.saleCount, item.subItem.price);
    }

  });

  return amount;
}
