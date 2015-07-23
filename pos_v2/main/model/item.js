function Item(barcode, name, unit, price) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;

}
Item.getItems = function (barcode) {
  var value;
  var allItems = loadAllItems();
  allItems.forEach(function (oneItem) {
    if (oneItem.barcode === barcode) {
      value = oneItem;
      return;
    }
  });

  return value;
};
