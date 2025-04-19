# Not So Boring Webshop UI

A single-page, no-framework frontend application that displays a list of products in an e-commerce layout. Built using pure HTML5, CSS3, and JavaScript.

## Features

- Displays 20 unique products using meme images from the Imgflip API.
- Each product card shows:
  - Image
  - Title
  - Short description
  - Price (in EUR)
  - Rating (e.g., 3/10)
- Pagination (10 products per page)
- Search functionality by product name
- Top-rated product highlighted at the center of the page
- Responsive and visually structured layout (3 cards per row)

## Tech Stack

- HTML5
- CSS3 (with Normalize.css reset)
- JavaScript
- [Imgflip Meme API](https://imgflip.com/api)

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zime-dube/not-so-boring-webshop-ui.git
   ## Usage
   
2. **Open the project:**
   - Navigate into the project folder.
   - Open `index.html` in your browser (you can use VS Code Live Server or double-click the file).

3. **Folder Structure**:
  not-so-boring-webshop-ui/
├── index.html     # Main HTML file
├── app.css        # CSS styles
├── app.js         # JavaScript logic
└── README.md      # Project documentation

4. **API Info**:
- Images are fetched from the [Imgflip API](https://imgflip.com/api).
- Only the first 20 memes are used for products.
- On load, 20 meme-based products are displayed.
- Use the search bar to find products by name.
- Use Prev/Next buttons to paginate through products (10 per page).
- The top-rated product is shown at the top of the page.
