function printReceipt(tags) {
  var pos = new Pos(tags,loadAllItems(),loadPromotions());
  var cartItems = pos.getCartItems();
  pos.getPromotions(cartItems);
  console.log(cartItems);
  var myReceipt = new Receipt (cartItems);
  console.log(myReceipt.receipt );
}
