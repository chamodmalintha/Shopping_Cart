import React, { useState, useEffect } from "react";
import axios from "axios";
import { Item } from "./Item";
import { ErrorMessage } from "./ErrorMessage";
import { MiniCart } from "./MiniCart";

export const ProductsPage = () => {
  const [productInfo, setProductInfo] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showMiniCart, setShowMiniCart] = useState(false);

  useEffect(() => {
    fetchProductInfo();
  }, []);

  const fetchProductInfo = async () => {
    try {
      const response = await axios.get(
        "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
      );
      setProductInfo(response.data);
    } catch (error) {
      console.error("Error fetching productInfo:", error);
    }
  };

  const handleAddToCart = (product, selectedSize) => {
    if (!selectedSize) {
      setErrorMessage("Please select a size before adding to cart.");
      return;
    }

    setErrorMessage("");

    const existingProduct =
      selectedProducts &&
      selectedProducts.find(
        (item) => item.id === product.id && item.size === selectedSize
      );

    if (existingProduct) {
      const updatedproductInfo =
        selectedProducts &&
        selectedProducts.map((item) =>
          item.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      setSelectedProducts(updatedproductInfo);
    } else {
      setSelectedProducts([
        ...selectedProducts,
        { ...product, size: selectedSize, quantity: 1 },
      ]);
    }
  };

  const totalQuantity = selectedProducts.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleCloseModal = () => {
    setShowMiniCart(false);
  };

  return (
    <div>
      <div className="header">
        <p onClick={() => setShowMiniCart(!showMiniCart)}>
          My Cart ( {totalQuantity} )
        </p>
        {showMiniCart && (
          <MiniCart
            isOpen={showMiniCart}
            onClose={handleCloseModal}
            selectedProducts={selectedProducts}
          />
        )}
      </div>
      <div className="product-list">
        {
          <Item
            key={productInfo.id}
            product={productInfo}
            onAddToCart={handleAddToCart}
          />
        }
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};
