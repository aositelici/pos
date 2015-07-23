function Receipt(cartItems,amount,salesAmounts,salesCounts) {
  var currentDate = new Date();
  var dataShow = new DataShow(currentDate);

  this.data = dataShow.formattedDateString;
  this.itemString = this.getItemsString(cartItems,salesAmounts);
  this.salesItemString = this.getSalesItemString(cartItems,salesCounts);
  this.amount = this.formatPrice(this.getAmount(amount,salesAmounts));
  this.salesAmount = this.formatPrice(this.getSalesAmount(salesAmounts));
}
Receipt.prototype.getItemsString = function (cartItems,salesAmounts) {
  var itemsString = '';
  var _this = this;

  for(var i = 0; i < cartItems.length; i++){
    itemsString +=
      '名称：' + cartItems[i].item.name +
      '，数量：' + cartItems[i].count + cartItems[i].item.unit +
      '，单价：' + _this.formatPrice(cartItems[i].item.price) +
      '(元)，小计：' + _this.formatPrice(cartItems[i].item.price*cartItems[i].count - salesAmounts[i]) + '(元)\n';
  }
  return itemsString;
}

Receipt.prototype.getSalesItemString = function (cartItems,salesCounts) {
  var itemsString = '';

  for(var i = 0; i < cartItems.length; i++){
    if (salesCounts[i] != 0) {
      itemsString +=
        '名称：' + cartItems[i].item.name +
        '，数量：' + salesCounts[i]+ cartItems[i].item.unit + '\n';
    }
  }

  return itemsString;
}

Receipt.prototype.getAmount = function (amount,salesAmounts) {
  return (amount-this.getSalesAmount(salesAmounts));
}

Receipt.prototype.getSalesAmount = function (salesAmounts) {
  var saleSumAmount = 0;

  for (var i = 0; i < salesAmounts.length; i++){
    saleSumAmount += salesAmounts[i];
  }
  return saleSumAmount;
}

Receipt.prototype.getSubTotal = function (count, price) {
  return count * price;
}
Receipt.prototype.formatPrice = function (price) {
  return price.toFixed(2);
}

Receipt.prototype.printReceipt = function () {
  return '***<没钱赚商店>收据***\n' +
    '打印时间：'
    + this.data + '\n' +
    '----------------------\n' +
    this.itemString +
    '----------------------\n' +
    '挥泪赠送商品：\n' +
    this.salesItemString +
    '----------------------\n' +
    '总计：' + this.amount + '(元)\n' +
    '节省：' + this.salesAmount + '(元)\n' +
    '**********************';
}
