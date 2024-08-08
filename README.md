# SwiftCart E-Commerce Website

## Introduction

SwiftCart is an e-commerce web application built using Vue.js. The application allows users to browse through products, view detailed information about each product, and sort and filter products based on categories and search queries. This project demonstrates the use of Vue.js for building dynamic and interactive web applications.

## Technologies Used

- **Vue.js**: The progressive JavaScript framework for building user interfaces.
- **Vue Router**: The official router for Vue.js, used for navigating between different pages of the application.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs.
- **Fake Store API**: An API used for fetching product data to simulate a real e-commerce backend.

## Project Structure

The project is organized as follows:

.src
├── components
│ ├── Header.vue
│ ├── Filter.vue
│ ├── Sort.vue
│ ├── ProductDetail.vue
│ └── ProductPage.vue
├── App.vue
├── main.js
├── router.js
└── style.css


## Setup Instructions

To set up and run the project locally, follow these steps:

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/Mokawane/SEEMOK507_BCL2407_GroupB_Jonas-Mokawane_JSF03.git
   cd swiftcart

2. **Install Dependencies**:
    ```sh
    npm install

3. **Start the Development Server**:
    ```sh
    npm run dev

## Usage Examples

### Navigating the Application

- **Home Page**: The default route (/) displays the list of products. Users can sort and filter products using the provided UI controls.
- **Product Detail Page**: Clicking on a product navigates to the product detail page (/product/:id) where detailed information about the product is displayed.

### Sorting and Filtering

- **Sorting**: Users can sort products by "Price: Low to High" or "Price: High to Low".
- **Filtering**: Users can filter products by categories fetched from the API. Additionally, they can search for products using the search bar.

### Code Examples

### Navigating the Application

- **Home Page**: The default route (/) displays the list of products.
    ```html
    <router-link to="/">Home</router-link>
    ```

- **Product Detail Page**: Clicking on a product navigates to the product detail page (/product/:id).
    ```html
    <router-link :to="`/product/${product.id}`">View Details</router-link>
    ```

### Sorting and Filtering

- **Sorting**: Users can sort products by "Price: Low to High" or "Price: High to Low".
    ```html
    <select @change="emitSort">
      <option value="default">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
    ```

- **Filtering**: Users can filter products by categories fetched from the API.
    ```html
    <ul>
      <li v-for="category in categories" :key="category" @click="handleCategorySelect(category)">
        {{ category }}
      </li>
    </ul>
    ```

- **Searching**: Users can search for products using the search bar.
    ```html
    <input v-model="searchQuery" @input="handleSearch" placeholder="Search products..." />
    ```
