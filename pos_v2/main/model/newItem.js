function NewItem(barcode, name, unit, price, count, saleCount) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.count = count ;
  this.saleCount = saleCount ;
}
