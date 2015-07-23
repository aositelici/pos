function Pos(tags, allItems, promotions) {
  this.tags = tags;
  this.allItems = allItems;
  this.promotions = promotions;
}

Pos.prototype.getCartItems = function () {
  var cartItems = [];
  var myThis = this;

  this.tags.forEach(function (tag) {
    var barcodeString = tag.split('-')[0];
    var count = tag.split('-')[1] || 1;
    var cartItem = myThis.findCartItem(cartItems, barcodeString);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
      var item = myThis.getItems(barcodeString);
      var cartItem = new CartItem(item.barcode, item.name, item.unit, item.price, count, 0);
      cartItems.push(cartItem);
    }
  });

  return cartItems;
};

Pos.prototype.findCartItem = function (cartItems, barcode) {
  var value;

  cartItems.forEach(function (cartItem) {
    if (cartItem.barcode === barcode) {
      value = cartItem;
      return false;
    }
  });

  return value;
};

Pos.prototype.getItems = function (barcode) {
  var value;

  this.allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      value = item;
      return;
    }
  });

  return value;
};

Pos.prototype.getPromotions = function (cartItems) {
  var myThis = this;

  cartItems.forEach(function (cartItem) {
    myThis.calculateSalesCount(myThis.promotions, cartItem);
  });
};

Pos.prototype.getBuyTwoGetOneFree = function (promotions) {
  for (var i = 0; i < promotions.length; i++) {
    var promotion = new Promotion(promotions[i].type, promotions[i].barcodes);
    if (promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      return promotion.barcodes;
    }
  }
};

Pos.prototype.sale = function (count) {
  return Math.floor(count / 3);
};

Pos.prototype.calculateSalesCount = function (promotions, cartItem) {
  var barcodes = this.getBuyTwoGetOneFree(promotions);
  for (var i = 0; i < barcodes.length; i++)
    if (cartItem.barcode === barcodes[i]) {
      cartItem.saleCount = this.sale(cartItem.count);
      break;
    }
};


