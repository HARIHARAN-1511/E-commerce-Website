// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Navigation functionality
  const navLinks = document.querySelectorAll('.sidebar-nav a, .mobile-nav-menu a');
  const contentSections = document.querySelectorAll('.content-section');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(item => item.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Show corresponding section
      const targetSection = this.getAttribute('data-section');
      
      contentSections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetSection) {
          section.classList.add('active');
        }
      });
      
      // Close mobile menu if open
      if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
      }
    });
  });
  
  // Accent color preview
  const accentColorInput = document.getElementById('accent-color');
  const previewButton = document.querySelector('.preview-button');
  
  if (accentColorInput && previewButton) {
    // Set initial color
    previewButton.style.backgroundColor = accentColorInput.value;
    
    // Update on color change
    accentColorInput.addEventListener('input', function() {
      previewButton.style.backgroundColor = this.value;
    });
  }
  
  // Settings form submission
  const settingsForm = document.getElementById('settings-form');
  
  if (settingsForm) {
    settingsForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const bannerImage = document.getElementById('banner-image').files[0] ? 
                          document.getElementById('banner-image').files[0].name : 'No file selected';
      const shippingThreshold = document.getElementById('shipping-threshold').value;
      const accentColor = document.getElementById('accent-color').value;
      
      // Log values to console
      console.log('Settings saved:');
      console.log('Banner Image:', bannerImage);
      console.log('Free Shipping Threshold:', shippingThreshold);
      console.log('Accent Color:', accentColor);
      
      // Show success message (could be enhanced with a proper notification system)
      alert('Settings saved successfully!');
    });
  }
});
