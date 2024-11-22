import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import ReactQuill from 'react-quill';
import Select from 'react-select';
import { Navigate, useNavigate } from 'react-router-dom';

const Addproduct = () => {
  const [productName, setProductName] = useState("");
const [productType, setProductType] = useState("");
const [productPrice, setProductPrice] = useState("");
const [productDescription, setProductDescription] = useState("");
const [productImageUrl, setProductImageUrl] = useState("");
const [productIngredient, setProductIngredient] = useState("");
const [categories, setCategories] = useState([]); // Danh mục từ API
const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục được chọn


  // Lấy danh sách danh mục khi component được render
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://t2305mpk320241031161932.azurewebsites.net/api/Category"
        );
        setCategories(response.data); // Lưu danh sách danh mục
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Hàm xử lý khi admin chọn danh mục
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    const category = categories.find((cat) => cat.categoryId === parseInt(categoryId));
    setSelectedCategory(category);
  };

  // Hàm gửi dữ liệu
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Kiểm tra các trường bắt buộc
    if (!productType || !productImageUrl || !productName || !productDescription) {
      alert("Please fill all required fields: Type, ImageURL, ItemName, and Description.");
      return;
    }
  
    // Tạo payload
    const payload = {
      itemName: productName,
      price: parseFloat(productPrice),
      categoryId: parseInt(selectedCategory?.categoryId || 1), // Đảm bảo ID danh mục hợp lệ
      type: productType,
      description: productDescription,
      ingredient: productIngredient || "string",
      imageURL: productImageUrl,
    };
  
    console.log("Payload:", JSON.stringify(payload, null, 2)); // Log để kiểm tra
  
    try {
      const response = await axios.post(
        "https://t2305mpk320241031161932.azurewebsites.net/api/MenuItem",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
      Navigate('/Product')
    } catch (error) {
      if (error.response) {
        console.error("Error Response:", error.response.data);
        const errorMessages = Object.entries(error.response.data.errors || {})
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");
        alert("Error adding product:\n" + errorMessages);
      } else {
        console.error("Error:", error.message);
        alert("Failed to add product. Please try again.");
      }
    }
  };
  
  
  
  

  
  
  
  
  return (
    <div>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <div className="layout-page">
            {/* Navbar */}
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0   d-xl-none ">
                <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                  <i className="bx bx-menu bx-md" />
                </a>
              </div>
              {/* Search Small Screens */}
              <div className="navbar-search-wrapper search-input-wrapper d-none">
                <span
                  className="twitter-typeahead"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  <input
                    type="text"
                    className="form-control search-input container-xxl border-0 tt-input"
                    placeholder="Search..."
                    aria-label="Search..."
                    autoComplete="off"
                    spellCheck="false"
                    dir="auto"
                    style={{ position: "relative", verticalAlign: "top" }}
                  />
                  <pre
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      visibility: "hidden",
                      whiteSpace: "pre",
                      fontFamily:
                        '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                      fontSize: 15,
                      fontStyle: "normal",
                      fontVariant: "normal",
                      fontWeight: 400,
                      wordSpacing: 0,
                      letterSpacing: 0,
                      textIndent: 0,
                      textRendering: "auto",
                      textTransform: "none"
                    }}
                  />
                  <div
                    className="tt-menu navbar-search-suggestion ps"
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      zIndex: 100,
                      display: "none"
                    }}
                  >
                    <div className="tt-dataset tt-dataset-pages" />
                    <div className="tt-dataset tt-dataset-files" />
                    <div className="tt-dataset tt-dataset-members" />
                    <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                      <div
                        className="ps__thumb-x"
                        tabIndex={0}
                        style={{ left: 0, width: 0 }}
                      />
                    </div>
                    <div className="ps__rail-y" style={{ top: 0, right: 0 }}>
                      <div
                        className="ps__thumb-y"
                        tabIndex={0}
                        style={{ top: 0, height: 0 }}
                      />
                    </div>
                  </div>
                </span>
                <i className="bx bx-x bx-md search-toggler cursor-pointer" />
              </div>
            </nav>
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="app-ecommerce">
                  {/* Add Product */}
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                    <div className="d-flex flex-column justify-content-center">
                      <h4 className="mb-1">Add a new Product</h4>
                      <p className="mb-0">Orders placed across your store</p>
                    </div>
                    <div className="d-flex align-content-center flex-wrap gap-4">
                      <div className="d-flex gap-4">

                      </div>
                      <button type="submit" className="btn btn-primary">
                        Publish product
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    {/* First column*/}
                    <form onSubmit={handleSubmit}>
  <div className="col-12 col-lg-8">
    <div className="card mb-6">
      <div className="card-header">
        <h5 className="card-title mb-0">Product</h5>
      </div>
      <div className="card-body">
        {/* Tên sản phẩm */}
        <div className="mb-6">
          <label className="form-label" htmlFor="ecommerce-product-name">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="ecommerce-product-name"
            placeholder="Tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Loại sản phẩm và Giá */}
        <div className="row mb-6">
          <div className="col">
            <label className="form-label" htmlFor="ecommerce-product-sku">
              Type
            </label>
            <input
              type="text"
              className="form-control"
              id="ecommerce-product-sku"
              placeholder="Type"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </div>
          <div className="col">
            <label className="form-label" htmlFor="ecommerce-product-barcode">
              Price
            </label>
            <input
              type="number"
              className="form-control"
              id="ecommerce-product-barcode"
              placeholder="Giá"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Danh mục */}
        <div className="mb-6">
          <label className="form-label" htmlFor="category-select">
            Category
          </label>
          <select
            className="form-control"
            id="category-select"
            value={selectedCategory?.categoryId || ""}
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Mô tả */}
        <div>
          <label className="mb-1">Description</label>
          <ReactQuill
            theme="snow"
            placeholder="Mô tả sản phẩm"
            value={productDescription}
            onChange={setProductDescription}
            className="comment-editor border-0 pb-6"
          />
        </div>

        {/* URL ảnh */}
        <div className="card mb-6">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0 card-title">Image URL</h5>
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập URL ảnh sản phẩm"
              value={productImageUrl}
              onChange={(e) => setProductImageUrl(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1">Ingredient</label>
            <ReactQuill
              theme="snow"
              placeholder="Thành Phần Món Ăn"
              value={productIngredient}
              onChange={setProductIngredient}
              className="comment-editor border-0 pb-6"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="col-12 mt-4">
    <button type="submit" className="btn btn-primary">
      Submit
    </button>
  </div>
</form>

                    {/* /Organize Card */}
                  </div>
                  {/* /Second column */}
                </div>
              </div>
            </div>
            {/* / Content */}
            {/* Footer */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                  <div className="text-body">
                    © 2024, made with ❤️ by{" "}
                    <a
                      href="https://themeselection.com"
                      target="_blank"
                      className="footer-link"
                    >
                      ThemeSelection
                    </a>
                  </div>
                  <div className="d-none d-lg-inline-block">
                    <a
                      href="https://themeselection.com/license/"
                      className="footer-link me-4"
                      target="_blank"
                    >
                      License
                    </a>
                    <a
                      href="https://themeselection.com/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      More Themes
                    </a>
                    <a
                      href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/"
                      target="_blank"
                      className="footer-link me-4"
                    >
                      Documentation
                    </a>
                    <a
                      href="https://themeselection.com/support/"
                      target="_blank"
                      className="footer-link d-none d-sm-inline-block"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </div>
            </footer>
            {/* / Footer */}
            <div className="content-backdrop fade" />
          </div>
          {/* Content wrapper */}
        </div>


      </div>
    </div>
  )
}

export default Addproduct