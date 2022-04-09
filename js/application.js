// - [ ] Calculate and display the sub total price of each item.

var updateSubtotal = function(event) {
  var itemPrice = Number($(event.target).parent().siblings('.item-price').text());

  var itemQty = Number($(event.target).val());
  var subTotal = itemPrice * itemQty;
  $(event.target).parent().siblings('.item-subtotal').text(`$${subTotal}`);
};


// - [ ] Calculate and display the total price.


// ========== UPON DOMCONTENTLOAD: ===============

$(document).ready(function() {
  // -------- Update total price -------------------------------
    // Call function to update total price
  
  // --------Event listener for quantity input field------------
  var timeout;
  // When quantity is changed: update subtotal/show help text after 500ms
  $(document).on('input', 'input.quantity', function(event) {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if ((parseFloat($(event.target).val()) < 0)) {
        $(event.target).next().addClass('active');
      } else {
      // clearTimeout(timeout);
      updateSubtotal(event);
      $(event.target).next().removeClass('active');
      }
    }, 500);
  });

  // ------------Event listener for remove buttons ---------------

  // ------------Event listener for add item button --------------

});


