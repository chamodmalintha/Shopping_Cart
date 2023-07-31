import React, { useState } from "react";

export const Item = ({ product, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState("");

  return (
    <div className="item">
      <div className="product-card">
        <img src={product.imageURL} alt={product.name} />
      </div>
      <div className="product-card">
        <h2>{product.title}</h2>
        <h4>${product.price}.00</h4>
        <p>{product.description}</p>
        <p className="required">Size</p>
        <div>
          {product.sizeOptions &&
            product.sizeOptions.map((sizeObject) => (
              <>
                <button
                  key={sizeObject.id}
                  onClick={() => setSelectedSize(sizeObject.label)}
                >
                  {sizeObject.label}
                </button>{" "}
              </>
            ))}
        </div>
        <button
          onClick={() => onAddToCart(product, selectedSize)}
          className="add-to-cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
