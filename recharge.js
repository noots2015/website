<script>

$( document ).ready(function() { 
    $(this).find('input.addtocart').addClass('disabled').prop('disabled', true);
    
    console.log($(this).serialize());
    
    $.ajax({
      url     : $(this).attr('action'),
      type    : $(this).attr('method'),
      dataType: 'json',
      data    : $(this).serialize(),
      success : function( data ) {
		redirectToSubscriptionCheckout();
      },
      error   : function( xhr, err ) {
        $('input.addtocart').removeClass('disabled').prop('disabled', false);
        alert("Sorry, we couldn't add this subscription to your cart! Please refresh the page and try again.");
      }
    });
    return false;
  });

  function addItemToCart (variant_id, quantity, shipping_interval_frequency, shipping_interval_unit_type, subscription_id) {
    
    data = {
        "quantity": quantity,
        "id": variant_id,
        "properties[shipping_interval_frequency]": shipping_interval_frequency,
  	"properties[shipping_interval_unit_type]": shipping_interval_unit_type,
  	"properties[subscription_id]": subscription_id
      }
    jQuery.ajax({
        type: 'POST',
        url: '/cart/add.js',
        data: data,
        dataType: 'json',
        success: function() {
            window.location.href = '/cart';
        }
    });
  }

  addItemToCart(1 , 1, "1", "Months", "13814")
  
  function redirectToSubscriptionCheckout() {
    var myshopify_domain = 'noots-co.myshopify.com';
    var subscription_id = 13814;
    function get_cookie(k) { return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2] };
    var token = get_cookie('cart');
    var checkout_url = "https://shopifysubscriptions.com/r/checkout?" +
        "myshopify_domain=" + myshopify_domain +
        "&cart_token="      + token +
        "&subscription_id=" + subscription_id;

//     // Show overlay while we are redirecting
//     $('body').css("overflow", "hidden").append(
//       "<div style="z-index:9000;position:absolute;width:100%;height:100%;top:0;left:0;" +
//       "background-color:rgba(0,0,0,0.6);"></div>");
    window.location.href = checkout_url;
  }
</script>
