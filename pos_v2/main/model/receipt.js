function Receipt(cartItems) {
  var currentDate = new Date();
  var dataShow = new DataShow(currentDate);

  this.data = dataShow.formattedDateString;
  this.itemString = this.getItemsString(cartItems);
  this.salesItemString = this.getSalesItemString(cartItems);
  this.amount = this.formatPrice(this.getAmount(cartItems));
  this.salesAmount = this.formatPrice(this.getSalesAmount(cartItems));
  this.receipt = '***<没钱赚商店>收据***\n' +
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
Receipt.prototype.getItemsString = function (carItems) {
  var itemsString = '';
  var othis = this;
  carItems.forEach(function (item) {
    itemsString +=
      '名称：' + item.name +
      '，数量：' + item.count + item.unit +
      '，单价：' + othis.formatPrice(item.price) +
      '(元)，小计：' + othis.formatPrice(othis.getSubTotal(item.count - item.saleCount, item.price)) + '(元)\n';
  });

  return itemsString;
}

Receipt.prototype.getSalesItemString = function (carItems) {
  var itemsString = '';

  carItems.forEach(function (item) {
    if (item.saleCount != 0) {
      itemsString +=
        '名称：' + item.name +
        '，数量：' + item.saleCount + item.unit + '\n';
    }
  });

  return itemsString;
}

Receipt.prototype.getAmount = function (carItems) {
  var amount = 0;
  var othis = this;
  carItems.forEach(function (item) {
    amount += othis.getSubTotal(item.count - item.saleCount, item.price);
  });

  return amount;
}

Receipt.prototype.getSalesAmount = function (carItems) {
  var amount = 0;
  var othis = this;
  carItems.forEach(function (item) {
    if (item.saleCount !== 0) {
      amount += othis.getSubTotal(item.saleCount, item.price);
    }

  });

  return amount;
}

Receipt.prototype.getSubTotal = function (count, price) {
  return count * price;
}
Receipt.prototype.formatPrice = function (price) {
  return price.toFixed(2);
}

