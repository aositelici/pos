function NewItem(barcode, name, unit, price, count, countsale) {
  this.barcode = barcode;
  this.name = name;
  this.unit = unit;
  this.price = price || 0.00;
  this.count = count || 0;
  this.countSale = countsale || 0;
}
