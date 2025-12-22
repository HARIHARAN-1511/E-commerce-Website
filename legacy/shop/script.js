// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get all "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
  // Add click event listener to each button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get product information
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('h3').textContent;
      const productPrice = productCard.querySelector('.price').textContent;
      
      // Show alert with product information
      alert(`Product added to cart: ${productName} (${productPrice})`);
    });
  });
});
