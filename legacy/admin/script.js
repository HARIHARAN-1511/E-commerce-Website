/* ==========================================
   Product Management Admin Dashboard
   ES6+ Vanilla JavaScript - No Frameworks
   ========================================== */

/* ==========================================
   1. INITIAL STATE & DATA MANAGEMENT
   ========================================== */

const STORAGE_KEYS = {
  PRODUCTS: 'admin_products',
  SETTINGS: 'admin_settings'
};

const DEFAULT_SETTINGS = {
  currencySymbol: '₹',
  lowStockThreshold: 5,
  accentColor: '#4a6cf7'
};

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Laptop',
    description: 'High-performance laptop for professionals',
    price: 45999,
    stock_quantity: 12,
    image_url: 'https://via.placeholder.com/300x200?text=Laptop',
    status: 'active'
  },
  {
    id: 2,
    name: 'Wireless Printer',
    description: 'Efficient wireless printing solution',
    price: 12499,
    stock_quantity: 3,
    image_url: 'https://via.placeholder.com/300x200?text=Printer',
    status: 'active'
  },
  {
    id: 3,
    name: 'Desktop Scanner',
    description: 'Professional-grade document scanner',
    price: 8999,
    stock_quantity: 8,
    image_url: 'https://via.placeholder.com/300x200?text=Scanner',
    status: 'active'
  },
  {
    id: 4,
    name: 'Office Copier',
    description: 'Fast and reliable office copier',
    price: 32999,
    stock_quantity: 2,
    image_url: 'https://via.placeholder.com/300x200?text=Copier',
    status: 'inactive'
  }
];

/* ==========================================
   2. STORAGE OPERATIONS (localStorage Wrapper)
   ========================================== */

const Storage = {
  /* Get all products from localStorage or initialize with sample data */
  getProducts() {
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      return JSON.parse(stored);
    }
    /* Initialize with sample products on first load */
    const products = SAMPLE_PRODUCTS;
    this.saveProducts(products);
    return products;
  },

  /* Save products to localStorage */
  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  },

  /* Get settings from localStorage or initialize defaults */
  getSettings() {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
  },

  /* Save settings to localStorage */
  saveSettings(settings) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }

  /* 
     REST API Stub - For Future Backend Integration
     Replace localStorage with these endpoints in production:
     
     GET /api/products - Fetch all products
     Response: { success: true, data: [...products] }
     
     POST /api/products - Create new product
     Body: { name, description, price, stock_quantity, image_url, status }
     Response: { success: true, data: { id, ...product } }
     
     PUT /api/products/{id} - Update product
     Body: { name, description, price, stock_quantity, image_url, status }
     Response: { success: true, data: {...updatedProduct} }
     
     DELETE /api/products/{id} - Delete product
     Response: { success: true, message: 'Product deleted' }
     
     Backend pseudo-code example:
     app.get('/api/products', (req, res) => {
       const products = database.query('SELECT * FROM products');
       res.json({ success: true, data: products });
     });
     
     app.post('/api/products', (req, res) => {
       const { name, price, stock_quantity } = req.body;
       if (!name || price < 0) return res.status(400).json({ error: 'Invalid data' });
       const id = database.insertProduct(req.body);
       res.json({ success: true, data: { id, ...req.body } });
     });
  */
};

/* ==========================================
   3. PRODUCT CRUD OPERATIONS
   ========================================== */

const ProductManager = {
  /* Get next available product ID */
  getNextId() {
    const products = Storage.getProducts();
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  },

  /* Create new product */
  createProduct(productData) {
    const products = Storage.getProducts();
    const newProduct = {
      id: this.getNextId(),
      ...productData
    };
    products.push(newProduct);
    Storage.saveProducts(products);
    return newProduct;
  },

  /* Get all products */
  getAllProducts() {
    return Storage.getProducts();
  },

  /* Get product by ID */
  getProductById(id) {
    const products = Storage.getProducts();
    return products.find(p => p.id === parseInt(id));
  },

  /* Update existing product */
  updateProduct(id, updates) {
    const products = Storage.getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    
    if (index === -1) {
      throw new Error('Product not found');
    }
    
    products[index] = { ...products[index], ...updates, id: products[index].id };
    Storage.saveProducts(products);
    return products[index];
  },

  /* Delete product by ID */
  deleteProduct(id) {
    const products = Storage.getProducts();
    const filtered = products.filter(p => p.id !== parseInt(id));
    
    if (filtered.length === products.length) {
      throw new Error('Product not found');
    }
    
    Storage.saveProducts(filtered);
  }
};

/* ==========================================
   4. DOM ELEMENTS CACHE
   ========================================== */

const DOM = {
  /* Navigation */
  navLinks: null,
  contentSections: null,
  
  /* Products Table */
  productsTable: null,
  productsTbody: null,
  emptyState: null,
  
  /* Modals */
  productModal: null,
  deleteModal: null,
  productForm: null,
  
  /* Form Fields */
  productName: null,
  productDescription: null,
  productPrice: null,
  productStock: null,
  productImage: null,
  productStatus: null,
  
  /* Filters & Sort */
  statusFilter: null,
  sortBy: null,
  
  /* Buttons */
  addProductBtn: null,
  addProductBtnEmpty: null,
  saveSettingsBtn: null,
  
  /* Settings */
  currencySymbolInput: null,
  lowStockThresholdInput: null,
  accentColorInput: null,
  settingsForm: null,
  
  /* Alerts */
  successMessage: null,
  
  /* Initialize all DOM references */
  init() {
    this.navLinks = document.querySelectorAll('.nav-link');
    this.contentSections = document.querySelectorAll('.content-section');
    
    this.productsTable = document.querySelector('.products-table');
    this.productsTbody = document.getElementById('products-tbody');
    this.emptyState = document.getElementById('empty-state');
    
    this.productModal = document.getElementById('product-modal');
    this.deleteModal = document.getElementById('delete-modal');
    this.productForm = document.getElementById('product-form');
    
    this.productName = document.getElementById('product-name');
    this.productDescription = document.getElementById('product-description');
    this.productPrice = document.getElementById('product-price');
    this.productStock = document.getElementById('product-stock');
    this.productImage = document.getElementById('product-image');
    this.productStatus = document.getElementById('product-status');
    
    this.statusFilter = document.getElementById('status-filter');
    this.sortBy = document.getElementById('sort-by');
    
    this.addProductBtn = document.getElementById('add-product-btn');
    this.addProductBtnEmpty = document.getElementById('empty-add-btn');
    this.saveSettingsBtn = document.querySelector('#settings-form .btn-primary');
    
    this.currencySymbolInput = document.getElementById('currency-symbol');
    this.lowStockThresholdInput = document.getElementById('low-stock-threshold');
    this.accentColorInput = document.getElementById('accent-color');
    this.settingsForm = document.getElementById('settings-form');
    
    this.successMessage = document.getElementById('success-message');
  }
};

/* ==========================================
   5. VALIDATION FUNCTIONS
   ========================================== */

const Validation = {
  /* Validate product form data */
  validateProduct(data) {
    const errors = [];
    
    if (!data.name || data.name.trim() === '') {
      errors.push('Product name is required');
    }
    
    if (data.price === '' || isNaN(data.price) || parseFloat(data.price) < 0) {
      errors.push('Price must be a valid positive number');
    }
    
    if (data.stock_quantity === '' || isNaN(data.stock_quantity) || parseInt(data.stock_quantity) < 0) {
      errors.push('Stock quantity must be a valid non-negative number');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  },

  /* Show validation errors as alert */
  showErrors(errors) {
    alert('Validation Errors:\n\n' + errors.join('\n'));
  }
};

/* ==========================================
   6. PRODUCT LIST RENDERING
   ========================================== */

const ProductRenderer = {
  /* Get filtered and sorted products */
  getFilteredAndSortedProducts() {
    let products = ProductManager.getAllProducts();
    const settings = Storage.getSettings();
    
    /* Apply status filter */
    const statusFilterValue = DOM.statusFilter.value;
    if (statusFilterValue) {
      products = products.filter(p => p.status === statusFilterValue);
    }
    
    /* Apply sorting */
    const sortValue = DOM.sortBy.value;
    products = this.sortProducts(products, sortValue);
    
    return products;
  },

  /* Sort products based on selected option */
  sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'stock-low':
        sorted.sort((a, b) => a.stock_quantity - b.stock_quantity);
        break;
      case 'stock-high':
        sorted.sort((a, b) => b.stock_quantity - a.stock_quantity);
        break;
      default:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return sorted;
  },

  /* Render all products to the table */
  render() {
    const products = this.getFilteredAndSortedProducts();
    const settings = Storage.getSettings();
    
    DOM.productsTbody.innerHTML = '';
    
    if (products.length === 0) {
      DOM.emptyState.classList.add('show');
      DOM.productsTable.style.display = 'none';
      return;
    }
    
    DOM.emptyState.classList.remove('show');
    DOM.productsTable.style.display = 'table';
    
    products.forEach(product => {
      const row = this.createProductRow(product, settings);
      DOM.productsTbody.appendChild(row);
    });
  },

  /* Create a single product table row */
  createProductRow(product, settings) {
    const row = document.createElement('tr');
    
    /* Determine if stock is low */
    const isLowStock = product.stock_quantity <= settings.lowStockThreshold;
    const stockClass = isLowStock ? 'stock-warning' : '';
    
    /* Status badge */
    const statusClass = product.status === 'active' ? 'status-active' : 'status-inactive';
    const statusText = product.status === 'active' ? 'Active' : 'Inactive';
    
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${this.escapeHtml(product.name)}</td>
      <td>${settings.currencySymbol}${product.price.toFixed(2)}</td>
      <td class="${stockClass}">${product.stock_quantity}</td>
      <td><span class="status-badge ${statusClass}">${statusText}</span></td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-sm btn-edit" data-id="${product.id}">Edit</button>
          <button class="btn btn-sm btn-delete" data-id="${product.id}">Delete</button>
        </div>
      </td>
    `;
    
    /* Attach event listeners */
    const editBtn = row.querySelector('.btn-edit');
    const deleteBtn = row.querySelector('.btn-delete');
    
    editBtn.addEventListener('click', () => Modal.openEditProduct(product.id));
    deleteBtn.addEventListener('click', () => Modal.openDeleteConfirm(product.id));
    
    return row;
  },

  /* Escape HTML to prevent XSS */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
};

/* ==========================================
   7. MODAL MANAGEMENT
   ========================================== */

const Modal = {
  currentEditingId: null,

  /* Open product modal for adding new product */
  openAddProduct() {
    this.currentEditingId = null;
    document.getElementById('modal-title').textContent = 'Add New Product';
    
    DOM.productForm.reset();
    DOM.productPrice.value = '';
    DOM.productStock.value = '';
    DOM.productStatus.value = 'active';
    
    DOM.productModal.classList.add('active');
  },

  /* Open product modal for editing existing product */
  openEditProduct(productId) {
    const product = ProductManager.getProductById(productId);
    
    if (!product) {
      alert('Product not found');
      return;
    }
    
    this.currentEditingId = productId;
    document.getElementById('modal-title').textContent = 'Edit Product';
    
    DOM.productName.value = product.name;
    DOM.productDescription.value = product.description;
    DOM.productPrice.value = product.price;
    DOM.productStock.value = product.stock_quantity;
    DOM.productImage.value = product.image_url;
    DOM.productStatus.value = product.status;
    
    DOM.productModal.classList.add('active');
  },

  /* Close product modal */
  closeProductModal() {
    DOM.productModal.classList.remove('active');
    DOM.productForm.reset();
    this.currentEditingId = null;
  },

  /* Open delete confirmation modal */
  openDeleteConfirm(productId) {
    const product = ProductManager.getProductById(productId);
    
    if (!product) {
      alert('Product not found');
      return;
    }
    
    document.getElementById('delete-message').textContent = 
      `Are you sure you want to delete "${product.name}"?`;
    
    const confirmBtn = document.getElementById('confirm-delete-btn');
    confirmBtn.onclick = () => this.confirmDelete(productId);
    
    DOM.deleteModal.classList.add('active');
  },

  /* Close delete modal */
  closeDeleteModal() {
    DOM.deleteModal.classList.remove('active');
  },

  /* Confirm and execute delete */
  confirmDelete(productId) {
    try {
      ProductManager.deleteProduct(productId);
      this.closeDeleteModal();
      ProductRenderer.render();
      UI.showSuccess('Product deleted successfully!');
    } catch (error) {
      alert('Error deleting product: ' + error.message);
    }
  }
};

/* ==========================================
   8. FORM HANDLING
   ========================================== */

const FormHandler = {
  /* Handle product form submission */
  handleProductSubmit(e) {
    e.preventDefault();
    
    const productData = {
      name: DOM.productName.value.trim(),
      description: DOM.productDescription.value.trim(),
      price: parseFloat(DOM.productPrice.value),
      stock_quantity: parseInt(DOM.productStock.value),
      image_url: DOM.productImage.value.trim(),
      status: DOM.productStatus.value
    };
    
    /* Validate data */
    const validation = Validation.validateProduct(productData);
    if (!validation.isValid) {
      Validation.showErrors(validation.errors);
      return;
    }
    
    try {
      if (Modal.currentEditingId) {
        /* Update existing product */
        ProductManager.updateProduct(Modal.currentEditingId, productData);
        UI.showSuccess('Product updated successfully!');
      } else {
        /* Create new product */
        ProductManager.createProduct(productData);
        UI.showSuccess('Product added successfully!');
      }
      
      Modal.closeProductModal();
      ProductRenderer.render();
    } catch (error) {
      alert('Error saving product: ' + error.message);
    }
  },

  /* Handle settings form submission */
  handleSettingsSubmit(e) {
    e.preventDefault();
    
    const settings = {
      currencySymbol: DOM.currencySymbolInput.value || '₹',
      lowStockThreshold: parseInt(DOM.lowStockThresholdInput.value) || 5,
      accentColor: DOM.accentColorInput.value || '#4a6cf7'
    };
    
    Storage.saveSettings(settings);
    UI.applyAccentColor(settings.accentColor);
    UI.showSuccess('Settings saved successfully!');
    ProductRenderer.render();
  }
};

/* ==========================================
   9. UI UTILITIES
   ========================================== */

const UI = {
  /* Show success message */
  showSuccess(message) {
    DOM.successMessage.textContent = message;
    DOM.successMessage.classList.add('show');
    
    setTimeout(() => {
      DOM.successMessage.classList.remove('show');
    }, 3000);
  },

  /* Apply accent color to CSS variables */
  applyAccentColor(color) {
    document.documentElement.style.setProperty('--accent-color', color);
  },

  /* Initialize navigation between sections */
  initNavigation() {
    DOM.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const section = link.getAttribute('data-section');
        
        /* Update active nav link */
        DOM.navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        /* Show active section */
        DOM.contentSections.forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
      });
    });
  },

  /* Initialize modal close buttons */
  initModalClosers() {
    const productModalClose = DOM.productModal.querySelector('.modal-close');
    const productModalCancel = DOM.productModal.querySelector('.modal-cancel');
    const deleteModalCancel = DOM.deleteModal.querySelector('.modal-cancel');
    
    productModalClose.addEventListener('click', () => Modal.closeProductModal());
    productModalCancel.addEventListener('click', () => Modal.closeProductModal());
    deleteModalCancel.addEventListener('click', () => Modal.closeDeleteModal());
    
    /* Close modal when clicking outside */
    DOM.productModal.addEventListener('click', (e) => {
      if (e.target === DOM.productModal) {
        Modal.closeProductModal();
      }
    });
    
    DOM.deleteModal.addEventListener('click', (e) => {
      if (e.target === DOM.deleteModal) {
        Modal.closeDeleteModal();
      }
    });
  }
};

/* ==========================================
   10. EVENT LISTENERS INITIALIZATION
   ========================================== */

const EventManager = {
  init() {
    /* Add product buttons */
    if (DOM.addProductBtn) {
      DOM.addProductBtn.addEventListener('click', () => Modal.openAddProduct());
    }
    if (DOM.addProductBtnEmpty) {
      DOM.addProductBtnEmpty.addEventListener('click', (e) => {
        e.preventDefault();
        Modal.openAddProduct();
      });
    }
    
    /* Product form submission */
    DOM.productForm.addEventListener('submit', (e) => FormHandler.handleProductSubmit(e));
    
    /* Settings form submission */
    DOM.settingsForm.addEventListener('submit', (e) => FormHandler.handleSettingsSubmit(e));
    
    /* Filter and sort changes */
    DOM.statusFilter.addEventListener('change', () => ProductRenderer.render());
    DOM.sortBy.addEventListener('change', () => ProductRenderer.render());
    
    /* Navigation */
    UI.initNavigation();
    
    /* Modal close buttons */
    UI.initModalClosers();
  }
};

/* ==========================================
   11. INITIALIZATION ON PAGE LOAD
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* Initialize DOM references */
  DOM.init();
  
  /* Load and apply settings */
  const settings = Storage.getSettings();
  DOM.currencySymbolInput.value = settings.currencySymbol;
  DOM.lowStockThresholdInput.value = settings.lowStockThreshold;
  DOM.accentColorInput.value = settings.accentColor;
  UI.applyAccentColor(settings.accentColor);
  
  /* Initialize event listeners */
  EventManager.init();
  
  /* Render initial product list */
  ProductRenderer.render();
});
