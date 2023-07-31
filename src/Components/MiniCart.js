import React, { useEffect } from "react";

export const MiniCart = ({ isOpen, onClose, selectedProducts }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <button onClick={onClose}>Close</button>
          <ul>
            {selectedProducts.map((item, index) => (
              <li key={index}>
                <div className="item" style={{ marginBottom: "-100px" }}>
                  <div className="product-card">
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      style={{ width: "50px", height: "100px" }}
                    />
                  </div>
                  <div className="product-card">
                    <div>{item.title}</div>
                    <div>
                      {item.quantity} x ${item.price}.00
                    </div>
                    <div>Size: {item.size} </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
