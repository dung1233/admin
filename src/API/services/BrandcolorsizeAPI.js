import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const BrandcolorsizeAPI = () => {
    const [vendorOptions, setVendorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const fetchBrands = async () => {
    try {
      const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Brand');
      if (response.status === 200) {
        // Lưu dữ liệu vào state vendorOptions
        const options = response.data.map((brand) => ({
          value: brand.brandId,
          label: brand.name,
        }));
        setVendorOptions(options);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu brand:', error);
    }
  };

  // Gọi API Category
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Category');
      if (response.status === 200) {
        const options = response.data.map((category) => ({
          value: category.categoryId,
          label: category.name,
        }));
        setCategoryOptions(options);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu category:', error);
    }
  };

  // Gọi API Color (bạn cần URL API chính xác)
  const fetchColors = async () => {
    try {
      const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Color'); // Replace with correct URL
      if (response.status === 200) {
        const options = response.data.map((color) => ({
          value: color.colorId,
          label: color.colorName,
        }));
        setCollectionOptions(options);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu color:', error);
    }
  };

  // Gọi API Size
  const fetchSizes = async () => {
    try {
      const response = await axios.get('https://projectky320240926105522.azurewebsites.net/api/Size');
      if (response.status === 200) {
        const options = response.data.map((size) => ({
          value: size.sizeId,
          label: size.sizeName,
        }));
        setStatusOptions(options);
      }
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu size:', error);
    }
  };
  useEffect(() => {
    fetchBrands();
    fetchCategories();
    fetchColors();
    fetchSizes();
  }, []);
  return (
    <div>BrandcolorsizeAPI</div>
  )
}

export default BrandcolorsizeAPI