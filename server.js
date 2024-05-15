const http = require('http');
const fs = require('fs');

// Constants
const PORT = 3000;
const DATA_FILE = 'products.json';

// Load product data from the JSON file
let products = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// Helper function to write data to the JSON file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data to file:', err);
  }
}

// Create the HTTP server
const server = http.createServer((req, res) => {
  const { url, method } = req;
  const [, , resourceId] = url.split('/');

  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'GET' && url === '/products') {
    // GET /products: Retrieve a list of all products
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(products));
  } else if (method === 'GET' && resourceId) {
    // GET /products/:id: Retrieve a specific product by its ID
    const product = products.find(p => p.id === resourceId);
    if (product) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(product));
    } else {
      res.statusCode = 404;
      res.end('Product not found');
    }
  } else if (method === 'POST' && url === '/products') {
    // POST /products: Create a new product
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const newProduct = JSON.parse(body);
        newProduct.id = Date.now().toString(); // Generate a unique ID for the new product
        products.push(newProduct);
        writeDataToFile(products);
        res.statusCode = 201;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ message: 'Product created successfully', product: newProduct }));
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid request body');
      }
    });
  } else if (method === 'PUT' && resourceId) {
    // PUT /products/:id: Update an existing product by its ID
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const updatedProduct = JSON.parse(body);
        const index = products.findIndex(p => p.id === resourceId);
        if (index !== -1) {
          updatedProduct.id = resourceId;
          products[index] = updatedProduct;
          writeDataToFile(products);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Product updated successfully', product: updatedProduct }));
        } else {
          res.statusCode = 404;
          res.end('Product not found');
        }
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid request body');
      }
    });
  } else if (method === 'PATCH' && resourceId) {
    // PATCH /products/:id: Partial update of an existing product by its ID
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const partialUpdate = JSON.parse(body);
        const index = products.findIndex(p => p.id === resourceId);
        if (index !== -1) {
          products[index] = { ...products[index], ...partialUpdate };
          writeDataToFile(products);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Product updated successfully', product: updatedProduct }));
        } else {
          res.statusCode = 404;
          res.end('Product not found');
        }
      } catch (err) {
        res.statusCode = 400;
        res.end('Invalid request body');
      }
    });
  } else if (method === 'DELETE' && resourceId) {
    // DELETE /products/:id: Delete a product by its ID
    const index = products.findIndex(p => p.id === resourceId);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      writeDataToFile(products);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Product deleted successfully', product: deletedProduct }));
    } else {
      res.statusCode = 404;
      res.end('Product not found');
    }
  } else {
    // Handle unsupported requests
    res.statusCode = 404;
    res.end('Not found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});