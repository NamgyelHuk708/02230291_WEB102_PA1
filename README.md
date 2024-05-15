
# Product Management API
A simple Node.js API for managing products.

## Introduction
This API allows you to perform CRUD (Create, Read, Update, Delete) operations on a collection of products. It provides a straightforward way to manage product information, including the ability to retrieve a list of all products, get details of a specific product, create new products, update existing products, and delete products.

## API Endpoints
### GET /products
Features GET /products: Retrieve all product data
![alt text](<Screenshot 2024-05-15 222446.png>)

### GET /products/:id
GET /products/:id: Retrieve a specific product by ID.
![alt text](<Screenshot 2024-05-15 222839.png>)

### POST /products
POST /products: Create a new product.
![alt text](<Screenshot 2024-05-15 223251.png>)

### PUT /products/:id
PUT /products/:id: Update an existing product 5.
![alt text](<Screenshot 2024-05-15 223842.png>)

### PATCH /products/:id
PATCH /products/:id: Partially update an existing product.
![alt text](<Screenshot 2024-05-15 225123.png>)

### DELETE /products/:id
DELETE /products/:id: Delete a product.
![alt text](<Screenshot 2024-05-15 225314.png>)

![alt text](<Screenshot 2024-05-15 230259.png>)
Meaning our product was deleted.

## Persistent Data Management
- The products data is stored in a products.json file, allowing for persistent storage.
- The data is loaded into a global products variable for easy access and manipulation.
- The writeDataToFile function is used to automatically update the products.json file whenever changes are made to the products data.

## Error Handling and Reliability
- The server includes improved error handling to ensure stability and accurate responses during file operations and client interactions.

## Technologies Used
- Node.js
- HTTP module
- fs module

## License
This project is licensed under the MIT License.

This README.md structure closely matches the one you provided for your friend's Book Management API, with the necessary adjustments to fit the context of your Product Management API. Feel free to further customize and expand on this template as needed to accurately describe your project's features and functionality.