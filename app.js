// Sample words for random generation
const sampleNames = ['Notebook', 'Headset', 'Backpack', 'Charger', 'Tablet', 'Mouse', 'Keyboard', 'Camera', 'Smartwatch', 'Monitor'];
const sampleAdjectives = ['Super', 'Ultra', 'Mini', 'Pro', 'Hyper', 'Max', 'Lite', 'Elite', 'Compact', 'Turbo'];
const sampleDescriptions = [
  'This is a very fast and reliable product.',
  'Perfect for everyday use.',
  'Built with quality and durability in mind.',
  'Affordable and efficient.',
  'A great choice for tech lovers.',
];

let currentPage = 1;
const productsPerPage = 10;
let allProducts = [];

const generateProducts = () => {
  const products = [];
  for (let i = 0; i < 20; i++) {
    const name = `${sampleAdjectives[Math.floor(Math.random() * sampleAdjectives.length)]} ${sampleNames[Math.floor(Math.random() * sampleNames.length)]} ${2000 + i}`;
    const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
    const price = Math.floor(Math.random() * 1000) + 100; // 100 - 1100 EUR
    const rating = Math.floor(Math.random() * 10) + 1; // 1 - 10
    const image = `https://via.placeholder.com/300x200?text=Product+${i + 1}`;
    products.push({ name, description, price, rating, image });
  }
  return products;
};

const renderProducts = (page = 1) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = allProducts.slice(start, end);

  productsToShow.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>Price:</strong> €${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}/10</p>
    `;
    productList.appendChild(card);
  });

  updatePaginationButtons();
};

const updatePaginationButtons = () => {
  document.getElementById('prevBtn').disabled = currentPage === 1;
  document.getElementById('nextBtn').disabled = currentPage * productsPerPage >= allProducts.length;
};

const handleNext = () => {
  if (currentPage * productsPerPage < allProducts.length) {
    currentPage++;
    renderProducts(currentPage);
  }
};

const handlePrev = () => {
  if (currentPage > 1) {
    currentPage--;
    renderProducts(currentPage);
  }
};

const searchProducts = () => {
  const searchInputElement = document.getElementById('searchInput');
  const searchInput = searchInputElement.value.trim();

  if (!searchInput) {
    alert('Please enter a search term.');
    return;
  }

  const loading = document.getElementById('loading');
  loading.style.display = 'block';

  setTimeout(() => {
    // Simulate search logic
    const input = searchInput.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(input));
    currentPage = 1;
    renderFilteredProducts(filtered);

    loading.style.display = 'none';
  }, 1000); // Simulated delay
};

// Add the event listener for 'Enter' key
document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchProducts();
  }
});

const renderFilteredProducts = (filteredProducts) => {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  filteredProducts.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p><strong>Price:</strong> €${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}/10</p>
    `;
    productList.appendChild(card);
  });

  document.getElementById('prevBtn').disabled = true;
  document.getElementById('nextBtn').disabled = true;
};

const determineTopProduct = (productList) => {
  return productList.reduce((top, current) => (current.rating > top.rating ? current : top));
};

const renderTopProduct = () => {
  const topProduct = determineTopProduct(allProducts);
  const topProductContainer = document.getElementById('topProduct');
  topProductContainer.innerHTML = `
    <h2>Top Rated Product</h2>
    <div class="product-card">
      <img src="${topProduct.image}" alt="${topProduct.name}" />
      <h2>${topProduct.name}</h2>
      <p>${topProduct.description}</p>
      <p><strong>Price:</strong> €${topProduct.price}</p>
      <p><strong>Rating:</strong> ${topProduct.rating}/10</p>
    </div>
  `;
};

// Initialize on page load
window.onload = async () => {
  allProducts = await generateProductsWithMemes();
  renderProducts();
  renderTopProduct();
};

const fetchMemeImages = async () => {
  const response = await fetch('https://api.imgflip.com/get_memes');
  const data = await response.json();
  const memes = data.data.memes.slice(0, 20); // First 20 images
  return memes.map((meme, index) => ({
    name: meme.name || `Meme Product ${index + 1}`,
    image: meme.url
  }));
};

const generateProductsWithMemes = async () => {
  const memeData = await fetchMemeImages();
  const products = memeData.map((meme, i) => {
    const description = sampleDescriptions[Math.floor(Math.random() * sampleDescriptions.length)];
    const price = Math.floor(Math.random() * 1000) + 100; // 100 - 1100 EUR
    const rating = Math.floor(Math.random() * 10) + 1; // 1 - 10
    return {
      name: meme.name,
      image: meme.image,
      description,
      price,
      rating
    };
  });
  return products;
};
