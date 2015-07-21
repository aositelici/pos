function printReceipt(items) {
  var receipt =
    '***<没钱赚商店>收据***\n' +
    getItemsString(items) +
    '----------------------\n' +
    '总计：' + formatPrice(getAmount(items)) + '(元)\n' +
    '**********************';

  console.log(receipt);
}

function getSubTotal(count, price) {
  return count * price;
}

function getAmount(items) {
  var amount = 0;

  items.forEach(function(item) {
    amount += getSubTotal(item.count, item.price);
  });

  return amount;
}

function getItemsString(items) {
  var itemsString = '';

  items.forEach(function(item) {
    itemsString +=
      '名称：' + item.name +
      '，数量：' + item.count + item.unit +
      '，单价：' + formatPrice(item.price) +
      '(元)，小计：' + formatPrice(getSubTotal(item.count, item.price)) + '(元)\n';
  });

  return itemsString;
}

function formatPrice(price) {
  return price.toFixed(2);
}
