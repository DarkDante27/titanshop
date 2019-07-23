// functions

const productModal = () => {
  console.log('Im being fired')
  document.addEventListener("DOMContentLoaded", function(event) {

  const prodPageId = document.getElementById('product-page')
  if (prodPageId && document.referrer == ('https://titangoods.myshopify.com/' || 'https://titangoods.myshopify.com/cart') ) {

      const selected = document.querySelector('.variant-select');
      console.log(selected)

      selectTags = selected.getElementsByTagName("select");
      console.log(selectTags)
      for(let i = 0; i < selectTags.length; i++) {
     }

      const quantity = document.querySelector('.prod-quantity');
      const cartQuantity = document.querySelector('.cart-quantity')
      const cartData = document.querySelector('.cart-data').outerHTML
      const updatedData = cartData.replace("none;", "true;")

      if (quantity.innerText <= 0) {
        if (cartQuantity <= 0) {
          Swal.fire({
          title: `<strong>Sorry! this item is sold out</strong>`,
          type: 'error',
          html:
            `Your cart is empty.`,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!'
          })
        } else {
          Swal.fire({
          title: `<strong>Sorry! this item is sold out</strong>`,
          type: 'error',
          html:
            `Your Cart:` +
            `${updatedData}` ,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!'
        })
        }

      } else if (quantity.innerText < 5) {
         if (cartQuantity <= 0) {
          Swal.fire({
            title: `<strong>There are only <u>${quantity.innerText}</u> of ${selectTags[0][0].innerText.trim().split('-')[0]} left </strong>`,
          type: 'warning',
          html:
            '<b>Hurry! before stock runs out!</b>' +
            'Your cart is empty',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!'
          })
         } else {
          Swal.fire({
          title: `<strong>There are only <u>${quantity.innerText}</u> of ${selectTags[0][0].innerText.trim().split('-')[0]} left </strong>`,
          type: 'warning',
          html:
            `Your Cart:` +
            `${updatedData}` ,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!'
        })
         }

      } else {
        if (cartQuantity <= 0) {
          Swal.fire({
          title: `<strong>shit There are <u>${quantity.innerText}</u> of ${selectTags[0][0].innerText.trim().split('-')[0]} available </strong>`,
          type: 'info',
          html:
            'Your cart is empty',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Great!'
       })
       } else {
         Swal.fire({
          title: `<strong>There are <u>${quantity.innerText}</u> of ${selectTags[0][0].innerText.trim().split('-')[0]} available </strong>`,
          type: 'info',
          html:
            `Your Cart:` +
            `${updatedData}` ,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,
          confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Great!'
         })
       }
     }
   }
 });
}

const AddToCartAjax = () => {
    window.onload = function() {
      const cartButton = document.getElementById('AddToCart');
      if (cartButton) {
       cartButton.addEventListener('click', (e) => {
        e.preventDefault();
         const quantity = document.querySelector('#Quantity').value;
     const productVariant = document.querySelector('#productSelect').value;
         jQuery.post('/cart/add.js', $('form[action="/cart/add"]').serialize())
         .done(function( data, textStatus, jqXHR ) {
          Swal.fire(
       'Thank You!',
         'The Item has been adedd to the cart!',
         'success'
          )
          const sweetAlertOk = document.querySelector('.swal2-confirm')
          if (sweetAlertOk) {
            sweetAlertOk.addEventListener('click', (e) => {
              reloadAfterAdd();
            })
          }
       })
         .fail(function( jqXHR, textStatus, errorThrown ) {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Sorry, the item is sold out'
           })
         })
      });
    };
  }
}



const reloadAfterAdd = () => {
 location.reload(false);
}

// Calling javaScript functions

productModal();
AddToCartAjax();
