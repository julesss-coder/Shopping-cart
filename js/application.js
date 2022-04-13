// ============= Get subtotal price of single item ========

var updateSubtotal = function(element) {
  var itemPrice = Number($(element).find('.item-price').text());
  var itemQty = Number($(element).find('.quantity').val());
  var subTotal = itemPrice * itemQty;
  $(element).find('.item-subtotal').text(`$${subTotal}`);
  return subTotal;
}



// ============= Get total price ===========

var updateTotalPrice = function() {
  var subtotalPricesArray = [];

  $('.item').each(function(index, element) {
    var subtotal = updateSubtotal(element);
    subtotalPricesArray.push(subtotal);
  });

  var subtotal = subtotalPricesArray.reduce(function(acc, cur) {
    return acc + cur;
  }, 0);

  $('#total-price').text(`$${subtotal}`);
};

// ========== Add item =====================

var addItem = function() {
  var itemName = $('.add-item-name').val();
  var itemPrice = Number($('.add-item-price').val());

  // add the new item to shopping list
  $('.add-item').before(`<div class="row item">
  <div class="col-xs-3 item-name">${itemName}</div>
  <div class="col-xs-2 col-sm-3 item-price">${itemPrice}</div>
  <div class="col-xs-2 col-sm-3 item-quantity">
    <input type="number" class="quantity" value="0" min="0">
    <small class="help-block">Only numbers >= 0 allowed.</small>
  </div>
  <div class="col-xs-3 col-sm-1">
    <button class="remove-button">Remove</button>
  </div>
  <div class="col-xs-2 item-subtotal">$--.--</div>
</div>`);
};

var checkItemValidity = function() {
  // if item-name input field empty:
  if ($('.add-item-name').val() === '') {
    $('.add-item-help-block-1').addClass('active');
    return false;
  // if item amount === 0 OR if item amount is not a number OR if item-amount input field empty:
  } else if ($('.add-item-price').val() === 0 || isNaN($('.add-item-price').val()) || $('.add-item-price').val() === '') {
    $('.add-item-help-block-2').addClass('active');
      return false;
  // if item entry is valid:
  } else if ($('.add-item-name').val() !== '' && Number($('.add-item-price').val()) > 0) {
    // Hide helper texts under input fields again
    $('.add-item').find('.active').each(function(index, element) {
      $(element).removeClass('active');
    });
    return true;
  }
};


// ========== Remove item ===================

var removeItem = function(event) {
  $(event.target).parent().parent().remove();
};

//============ Update column titles ===========

var updateColumnTitles = function() {
  if ($('.item').length === 0) {
    $('.column-titles').addClass('hide-titles');
  } else if ($('.item').length === 1) {
    $('.column-titles').removeClass('hide-titles');
  }
};


// ========== UPON DOMCONTENTLOAD: ===============

$(document).ready(function() {
  updateTotalPrice();

  // =========== Event listener for quantity input field =============

  // V.1, using regular event handler (works)

  // var timeout;
  // When quantity is changed: update subtotal/show help text after 500ms
  // $(document).on('input', 'input.quantity', function(event) {
  //   clearTimeout(timeout);
  //   timeout = setTimeout(function() {
  //     if ((parseFloat($(event.target).val()) < 0)) {
  //       $(event.target).next().addClass('active');
  //     } else {
  //     updateSubtotal($(event.target).parent().parent());
  //     updateTotalPrice();
  //     $(event.target).next().removeClass('active');
  //     }
  //   }, 500);
  // });

  // V.2, using underscore's debounce function
  $(document).on('input', 'input.quantity', _.debounce(function(event) {
    if ((parseFloat($(event.target).val()) < 0)) {
        $(event.target).next().addClass('active');
      } else {
    updateSubtotal($(event.target).parent().parent());
    updateTotalPrice();
    $(event.target).next().removeClass('active');
    }
  }, 500));



  // ============== Event listener for remove buttons ===============

  $(document).on('click', function(event) {
    var target = $(event.target);
    if (target.is($('.remove-button'))) {
      removeItem(event);
      updateColumnTitles();
      updateTotalPrice();
    }
  });

  // ============== Event listener for add item button ================


  // Add item by clicking "Add" button:
  $('.add-item-button').on('click', function() {
    // if user entry is valid:
    if (checkItemValidity() === true) {
      addItem();
      updateColumnTitles();
      updateSubtotal();
      updateTotalPrice();
      $('.add-item-name').val('');
      $('.add-item-price').val('');
    }
  });

  // Also add item by hitting Enter:
  $('.add-item').on('keyup', function(event) {
    if (event.key === 'Enter') {
      if (checkItemValidity() === true) {
        addItem();
        updateColumnTitles();
        updateSubtotal();
        updateTotalPrice();
        $('.add-item-name').val('');
        $('.add-item-price').val('');
      }
    }
  });
});


