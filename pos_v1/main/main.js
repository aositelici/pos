function printReceipt(barcodes) {
  var cartItems = getCartItems(barcodes);
  getPromotions(cartItems);
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(cartItems) +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    getSalesItemString(cartItems) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(cartItems)) + '(元)\n' +
    '节省：' + formatPrice(getSalesAmount(cartItems)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getItems( barcode) {
  var allItems = loadAllItems();
  var value;
  allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      value = item;
      return;
    }
  })
  return value;
}

function getCartItems(barcodes) {
  var cartItems = [];
  var allItems = loadAllItems();
  barcodes.forEach(function (barcode) {
    var barcodeString = barcode.split('-')[0];
    var count = barcode.split('-')[1] || 1;
    var cartItem = findCartItem(cartItems, barcodeString);
    //console.log(cartItem);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
        var item = getItems(barcodeString);
        cartItems.push({
            subItem:item,
            count: count,
            saleCount: 0
          });
      }


  });
  return cartItems;
}

function getPromotions(cartItems) {
  var saleItems = loadPromotions();
  cartItems.forEach(function (itemCart) {
    calculateSalesCount(saleItems, itemCart);
  });
}

function findCartItem(cartItems, barcode) {
  var value;
  cartItems.forEach(function (cartItem) {
   if (cartItem.subItem.barcode === barcode) {
   value = cartItem;
   return false;
   }
  });
  return value;
}

function calculateSalesCount(items, itemCart) {
  var barcodes = items[0].barcodes;
  for (var i = 0; i < barcodes.length; i++)
    if (itemCart.subItem.barcode === barcodes[i]) {
      itemCart.saleCount = sale(itemCart.count);
      break;
    }
}

function sale(count) {
  return Math.floor(count / 3);
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(items) {
  var amount = 0;

  items.forEach(function (item) {
    amount += getSubTotal(item.count - item.saleCount, item.subItem.price);
  });

  return amount;
}

function getItemsString(items) {
  var itemsString = '';
  items.forEach(function (item) {
    itemsString +=
      '名称：' + item.subItem.name +
      '，数量：' + item.count + item.subItem.unit +
      '，单价：' + formatPrice(item.subItem.price) +
      '(元)，小计：' + formatPrice(getSubTotal(item.count - item.saleCount, item.subItem.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}


function getSalesItemString(items) {
  var itemsString = '';

  items.forEach(function (item) {
    if (item.saleCount != 0) {
      itemsString +=
        '名称：' + item.subItem.name +
        '，数量：' + item.saleCount + item.subItem.unit + '\n';
    }
  });

  return itemsString;
}
function getSalesAmount(items) {
  var amount = 0;

  items.forEach(function (item) {
    if (item.saleCount !== 0) {
      amount += getSubTotal(item.saleCount, item.subItem.price);
    }

  });

  return amount;
}
