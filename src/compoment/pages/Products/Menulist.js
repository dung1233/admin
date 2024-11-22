import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Menulist = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Gọi API MenuItem
        axios.get('https://t2305mpk320241031161932.azurewebsites.net/api/MenuItem/with-variants')
            .then((response) => {
                console.log("Menu Items:", response.data);
                setMenuItems(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching menu items:", error);
                setLoading(false);
            });

        // Gọi API Category
        axios.get('https://t2305mpk320241031161932.azurewebsites.net/api/Category')
            .then((response) => {
                console.log("Categories:", response.data);
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    if (loading) return <p>Loading...</p>;

    // Hàm tìm tên danh mục dựa trên categoryId
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.categoryId === categoryId);
        return category ? category.categoryName : "Unknown Category";
    };
    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            axios.delete(`https://t2305mpk320241031161932.azurewebsites.net/api/MenuItem/${id}`)
                .then(response => {
                    console.log("Product deleted successfully:", response.data);
                    // Cập nhật lại danh sách menuItems sau khi xóa
                    setMenuItems(prevItems => prevItems.filter(item => item.menuItemNo !== id));
                })
                .catch(error => {
                    console.error("Error deleting product:", error);
                });
        }
    };

    return (
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">

                    <div className="layout-page" style={{ marginRight: '10%' }}>

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
                                {/* Product List Widget */}
                                <div className="card mb-6">

                                    <div className="card-widget-separator-wrapper">
                                        <div className="card-body card-widget-separator">
                                            <div className="row gy-4 gy-sm-1">
                                                {/* All Products */}
                                                <div className="col-sm-6 col-lg-3">
                                                    <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-4 pb-sm-0">
                                                        <div>
                                                            <p className="mb-1">All Product</p>
                                                            <h4 className="mb-1"></h4>
                                                            <p className="mb-0">
                                                                <span className="me-2">Total Products</span>
                                                            </p>
                                                        </div>
                                                        <span className="avatar me-sm-6">
                                                            <span className="avatar-initial rounded w-px-44 h-px-44">
                                                                <i className="bx bx-store-alt bx-lg text-heading" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* All Brands */}
                                                <div className="col-sm-6 col-lg-3">
                                                    <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-4 pb-sm-0">
                                                        <div>
                                                            <p className="mb-1">All Brand</p>
                                                            <h4 className="mb-1"></h4>
                                                            <p className="mb-0">
                                                                <span className="me-2">Total Brands</span>
                                                            </p>
                                                        </div>
                                                        <span className="avatar p-2 me-lg-6">
                                                            <span className="avatar-initial rounded w-px-44 h-px-44">
                                                                <i className="bx bx-laptop bx-lg text-heading" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* All Product Variants */}
                                                <div className="col-sm-6 col-lg-3">
                                                    <div className="d-flex justify-content-between align-items-start border-end pb-4 pb-sm-0 card-widget-3">
                                                        <div>
                                                            <p className="mb-1">All ProductVariant</p>
                                                            <h4 className="mb-1"></h4>
                                                            <p className="mb-0">Total Variants</p>
                                                        </div>
                                                        <span className="avatar p-2 me-sm-6">
                                                            <span className="avatar-initial rounded w-px-44 h-px-44">
                                                                <i className="bx bx-gift bx-lg text-heading" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Total Price */}
                                                <div className="col-sm-6 col-lg-3">
                                                    <div className="d-flex justify-content-between align-items-start">
                                                        <div>
                                                            <p className="mb-1">Total Price</p>
                                                            <h4 className="mb-1">$</h4>
                                                            <p className="mb-0">
                                                                <span className="me-2">Overall Value</span>
                                                            </p>
                                                        </div>
                                                        <span className="avatar p-2">
                                                            <span className="avatar-initial rounded w-px-44 h-px-44">
                                                                <i className="bx bx-wallet bx-lg text-heading" />
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Product List Table */}
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title">Filter</h5>
                                        <div className="d-flex justify-content-between align-items-center row pt-4 gap-6 gap-md-0 g-md-6">
                                            <div className="col-md-4 product_status">
                                                <select id="ProductStatus" className="form-select text-capitalize">
                                                    <option value="">Status</option>
                                                    <option value="Scheduled">Scheduled</option>
                                                    <option value="Publish">Publish</option>
                                                    <option value="Inactive">Inactive</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 product_category">
                                                <select id="ProductCategory" className="form-select text-capitalize">
                                                    <option value="">Category</option>
                                                    <option value="Household">Household</option>
                                                    <option value="Office">Office</option>
                                                    <option value="Electronics">Electronics</option>
                                                    <option value="Shoes">Shoes</option>
                                                    <option value="Accessories">Accessories</option>
                                                    <option value="Game">Game</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4 product_stock">
                                                <select id="ProductStock" className="form-select text-capitalize">
                                                    <option value=""> Stock </option>
                                                    <option value="Out_of_Stock">Out of Stock</option>
                                                    <option value="In_Stock">In Stock</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="card-datatable table-responsive">
                                        <div
                                            id="DataTables_Table_0_wrapper"
                                            className="dataTables_wrapper dt-bootstrap5 no-footer"
                                        >
                                            <div className="card-header d-flex border-top rounded-0 flex-wrap py-0 flex-column flex-md-row align-items-start">
                                                <div className="me-5 ms-n4 pe-5 mb-n6 mb-md-0">
                                                    <div id="DataTables_Table_0_filter" className="dataTables_filter">
                                                        <label>
                                                            <input
                                                                type="search"
                                                                className="form-control"
                                                                placeholder="Search Product"
                                                                aria-controls="DataTables_Table_0"
                                                            />
                                                        </label>
                                                    </div>

                                                </div>


                                            </div>
                                            <table
                                                className="datatables-products table dataTable no-footer dtr-column"
                                                id="DataTables_Table_0"
                                                aria-describedby="DataTables_Table_0_info"
                                                style={{ width: 1392 }}
                                            >
                                                <thead className="border-top">
                                                    <tr>
                                                        <th
                                                            className="control sorting_disabled dtr-hidden"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 0, display: "none" }}
                                                            aria-label=""
                                                        />
                                                        <th
                                                            className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 18 }}
                                                            data-col={1}
                                                            aria-label=""
                                                        >
                                                            <input type="checkbox" className="form-check-input" />
                                                        </th>
                                                        <th
                                                            className="sorting sorting_asc"
                                                            tabIndex={0}
                                                            aria-controls="DataTables_Table_0"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 436 }}
                                                            aria-label="product: activate to sort column descending"
                                                            aria-sort="ascending"
                                                        >
                                                            product
                                                        </th>
                                                        <th
                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="DataTables_Table_0"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 78 }}
                                                            aria-label="price: activate to sort column ascending"
                                                        >
                                                            Category
                                                        </th>


                                                        <th
                                                            className="sorting"
                                                            tabIndex={0}
                                                            aria-controls="DataTables_Table_0"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 78 }}
                                                            aria-label="price: activate to sort column ascending"
                                                        >
                                                            price
                                                        </th>




                                                        <th
                                                            className="sorting_disabled"
                                                            rowSpan={1}
                                                            colSpan={1}
                                                            style={{ width: 95 }}
                                                            aria-label="Actions"
                                                        >
                                                            Actions
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {menuItems.map((item) => (
                                                        <tr className="odd">
                                                            <td className="  control" tabIndex={0} style={{ display: "none" }} />
                                                            <td className="  dt-checkboxes-cell">
                                                                <input type="checkbox" className="dt-checkboxes form-check-input" />
                                                            </td>
                                                            <td className="sorting_1">
                                                                <div className="d-flex justify-content-start align-items-center product-name">
                                                                    <div className="avatar-wrapper">
                                                                        <div className="avatar avatar me-4 rounded-2 bg-label-secondary">
                                                                            <img
                                                                                src={item.imageURL}
                                                                                alt={item.itemName}
                                                                                className="rounded"
                                                                                width="50"
                                                                                height="50"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex flex-column">
                                                                        <h6 className="text-nowrap mb-0">{item.itemName}</h6>
                                                                        <small className="text-truncate d-none d-sm-block">
                                                                            {item.type}
                                                                        </small>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span>{getCategoryName(item.categoryId)}</span>
                                                            </td>
                                                            <td>
                                                                <span>${item.price}</span>
                                                            </td>

                                                            <td>
                                                                <div className="d-inline-block text-nowrap">
                                                                    <button className="btn btn-icon">
                                                                        <i className="bx bx-edit bx-md" />
                                                                    </button>
                                                                    <button
                                                                        className="btn btn-icon dropdown-toggle hide-arrow"
                                                                        data-bs-toggle="dropdown"
                                                                    >
                                                                        <i className="bx bx-dots-vertical-rounded bx-md" />
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-end m-0">
                                                                        <Link
                                                                            to={{ pathname: "/Details" }}
                                                                            state={{ item }}  // truyền `item` qua `state`
                                                                            className="dropdown-item"
                                                                        >
                                                                            View
                                                                        </Link>
                                                                        <a
                                                                            href="#"
                                                                            className="dropdown-item"
                                                                            onClick={() => handleDelete(item.menuItemNo)}
                                                                        >
                                                                            Xóa
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div
                                                        className="dataTables_info"
                                                        id="DataTables_Table_0_info"
                                                        role="status"
                                                        aria-live="polite"
                                                    >
                                                        Displaying 1 to 7 of 100 entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div
                                                        className="dataTables_paginate paging_simple_numbers"
                                                        id="DataTables_Table_0_paginate"
                                                    >
                                                        <ul className="pagination">
                                                            <li
                                                                className="paginate_button page-item previous disabled"
                                                                id="DataTables_Table_0_previous"
                                                            >
                                                                <a
                                                                    aria-controls="DataTables_Table_0"
                                                                    aria-disabled="true"
                                                                    role="link"
                                                                    data-dt-idx="previous"
                                                                    tabIndex={-1}
                                                                    className="page-link"
                                                                >
                                                                    <i className="bx bx-chevron-left bx-18px" />
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    aria-current="page"
                                                                    data-dt-idx={0}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    1
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx={1}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    2
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx={2}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    3
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx={3}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    4
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx={4}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    5
                                                                </a>
                                                            </li>
                                                            <li
                                                                className="paginate_button page-item disabled"
                                                                id="DataTables_Table_0_ellipsis"
                                                            >
                                                                <a
                                                                    aria-controls="DataTables_Table_0"
                                                                    aria-disabled="true"
                                                                    role="link"
                                                                    data-dt-idx="ellipsis"
                                                                    tabIndex={-1}
                                                                    className="page-link"
                                                                >
                                                                    …
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item ">
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx={14}
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    15
                                                                </a>
                                                            </li>
                                                            <li
                                                                className="paginate_button page-item next"
                                                                id="DataTables_Table_0_next"
                                                            >
                                                                <a
                                                                    href="#"
                                                                    aria-controls="DataTables_Table_0"
                                                                    role="link"
                                                                    data-dt-idx="next"
                                                                    tabIndex={0}
                                                                    className="page-link"
                                                                >
                                                                    <i className="bx bx-chevron-right bx-18px" />
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: "1%" }} />
                                            <div style={{ width: "1%" }} />
                                        </div>
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

        </div>
    )
}

export default Menulist