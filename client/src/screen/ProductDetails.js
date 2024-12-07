import React from 'react'
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
    const { id } = useParams(); // Capture the product ID from the URL
    // Use the ID to fetch and display the product details
    return (
      <div>
        <h1>Product ID: {id.name}</h1>
        {/* Display the product details here */}
      </div>
    );
}
