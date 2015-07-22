function Pos(tags, allItems, promotions) {
  this.tags = tags;
  this.allItems = allItems;
  this.promotions = promotions;
  this.f = function (){};
}

Pos.prototype.getCartItems = function () {
  var cartItems = [];

  this.tags.forEach(function (tag) {
    var barcodeString = tag.split('-')[0];
    var count = tag.split('-')[1] || 1;
    this.f();
    var cartItem = this.findCartItem(cartItems, barcodeString);
    if (cartItem) {
      cartItem.count += count;
    }
    else {
      var item = this.getItems(barcodeString);
      var newItem = new NewItem(item.barcode, item.name, item.unit, item.price, count, 0);
      cartItems.push(newItem);
    }
  });

  return cartItems;
};

Pos.prototype.findCartItem = function(cartItems, barcode) {
  var value;

  cartItems.forEach(function (cartItem) {
    if (cartItem.barcode === barcode) {
      value = cartItem;
      return false;
    }
  });

  return value;
};





Pos.prototype.getItems =function ( barcode) {
  var value;

  this.allItems.forEach(function (item) {
    if (item.barcode === barcode) {
      value = item;
      return;
    }
  });

  return value;
};
Pos.prototype.getPromotions = function(cartItems) {
  cartItems.forEach(function (itemCart) {
    this.calculateSalesCount(this.promotions, itemCart);
  });
  //return cartItems;
};
Pos.prototype.getBuyTwoGetOneFree = function(promotions) {
  for(var i = 0; i < promotions.length-1; i++){
    var promotion = new Promotion(promotions[i].type,promotions[i].barcodes);
    if(promotion.type === 'BUY_TWO_GET_ONE_FREE') {
      return promotion.barcodes;
    }
  }
};
Pos.prototype.calculateSalesCount = function(promotions, itemCart) {
  var barcodes = this.getBuyTwoGetOneFree(promotions);
  for (var i = 0; i < barcodes.length; i++)
    if (itemCart.barcode === barcodes[i]) {
      itemCart.saleCount = sale(itemCart.count);
      break;
    }
};


