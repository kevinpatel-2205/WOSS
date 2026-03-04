import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewPdf() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/pdf")
      .then((res) => setItems(res.data))
      .catch((error) => {
        console.error("Failed to load items:", error);
      });
  }, []);

  const getPreviewUrl = (item) => item.imageUrl || item.pdfUrl;

  const getDownloadUrl = (item) => {
    if (item.downloadUrl) return item.downloadUrl;
    const previewUrl = getPreviewUrl(item);
    return previewUrl?.replace("/upload/", "/upload/fl_attachment/");
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <img
            src={getPreviewUrl(item)}
            alt={item.name}
            width="700"
            style={{ maxWidth: "100%", height: "auto", border: "1px solid #ddd" }}
          />
          <br />
          <a href={getPreviewUrl(item)} target="_blank" rel="noreferrer">
            Open Image
          </a>
          <br />

          <a href={getDownloadUrl(item)} target="_blank" rel="noreferrer">
            <button>Download</button>
          </a>
        </div>
      ))}
    </div>
  );
}

export default ViewPdf;
