function printReceipt(tags) {
 /* var pos = new Pos(tags, loadAllItems(), loadPromotions());

  var cartItems = pos.getCartItems();
  pos.getPromotions(cartItems);

  var myReceipt = new Receipt(cartItems);

  console.log(myReceipt.printReceipt());*/
  var scanner = new Scanner();
  var cart = new Cart();

  var pos = new Pos(cart,scanner);
  var cartItems = pos.scan(tags);

  var promotions = loadPromotions();
  var amount = cart.calculateAmount();
  var salesCounts = PromotionCalculator.getSalesCounts(promotions,cartItems);
  var salesAmounts = PromotionCalculator.calculateSalesAmount(promotions,cartItems);
  var receipt = pos.printReceipt (cartItems,amount,salesAmounts,salesCounts);

  console.log(receipt);
}
