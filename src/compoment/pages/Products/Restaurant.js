import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const  Restaurant = () => {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        // Gọi API để lấy danh sách nhà hàng
        axios.get('https://t2305mpk320241031161932.azurewebsites.net/api/Restaurant')
            .then(response => {
                setRestaurants(response.data); // Lưu dữ liệu vào state
                console.log("Restaurants data:", response.data);
            })
            .catch(error => {
                console.error("Error fetching restaurants:", error);
            });
    }, []);
    
    return (
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
                            <div className="app-ecommerce-category">
                                {/* Category List Table */}
                                <div className="card">
                                    <div className="card-datatable table-responsive">
                                        <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="card-header d-flex flex-wrap py-0 flex-column flex-sm-row">
                                                <div>
                                                    <div id="DataTables_Table_0_filter" className="dataTables_filter me-3 mb-sm-6 mb-0 ps-0">
                                                        <label>
                                                            <input type="search" className="form-control ms-0" placeholder="Search Category" aria-controls="DataTables_Table_0" />
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="d-flex justify-content-center justify-content-md-end align-items-baseline">
                                                    <div className="dt-action-buttons d-flex justify-content-center flex-md-row align-items-baseline pt-0">
                                                        <div className="dataTables_length" id="DataTables_Table_0_length">
                                                            <label>
                                                                <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" className="form-select ms-0">
                                                                    <option value="7">7</option>
                                                                    <option value="10">10</option>
                                                                    <option value="20">20</option>
                                                                    <option value="50">50</option>
                                                                    <option value="70">70</option>
                                                                    <option value="100">100</option>
                                                                </select>
                                                            </label>
                                                        </div>
                                                        <div className="dt-buttons btn-group flex-wrap">
                                                            <button className="btn btn-secondary add-new btn-primary ms-2" tabIndex="0" aria-controls="DataTables_Table_0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEcommerceCategoryList">
                                                                <span>
                                                                    <i className="bx bx-plus bx-sm me-0 me-sm-2"></i>
                                                                    <span className="d-none d-sm-inline-block">Add Category</span>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <table className="datatables-category-list table border-top dataTable no-footer dtr-column" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style={{ width: '1163px' }}>
                                                <thead>
                                                    <tr>
                                                        <th className="control sorting_disabled dtr-hidden" rowSpan="1" colSpan="1" aria-label="" style={{ width: '0px', display: 'none' }}></th>
                                                        <th className="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowSpan="1" colSpan="1" data-col="1" aria-label="" style={{ width: '18px' }}>
                                                            <input type="checkbox" className="form-check-input" />
                                                        </th>
                                                        <th className="sorting sorting_desc" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Categories: activate to sort column ascending" aria-sort="descending" style={{ width: '557px' }}>
                                                            Categories
                                                        </th>
                                                        <th className="text-nowrap text-sm-end sorting" tabIndex="0" aria-controls="DataTables_Table_0" rowSpan="1" colSpan="1" aria-label="Total Products : activate to sort column ascending" style={{ width: '151px' }}>
                                                            Address&nbsp;
                                                        </th>
                                                        <th className="text-nowrap text-sm-end sorting_disabled" rowSpan="1" colSpan="1" aria-label="Total Earning" style={{ width: '130px' }}>
                                                            Rating
                                                        </th>
                                                        <th className="text-lg-center sorting_disabled" rowspan="1" colspan="1" style={{ width: '127px' }} aria-label="Actions">Actions</th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                {restaurants.map((restaurant, index) => (
                    <tr key={restaurant.restaurantId} className={index % 2 === 0 ? 'even' : 'odd'}>
                        <td className="control" tabIndex="0" style={{ display: 'none' }}></td>
                        <td className="dt-checkboxes-cell">
                            <input type="checkbox" className="dt-checkboxes form-check-input" />
                        </td>
                        <td className="sorting_1">
                            <div className="d-flex align-items-center">
                                <div className="avatar-wrapper me-3 rounded-2 bg-label-secondary">
                                    <div className="avatar">
                                        <img
                                            src={restaurant.imageURL || 'default-image.jpg'} // Nếu không có ảnh, đặt ảnh mặc định
                                            alt="Restaurant"
                                            className="rounded-circle"
                                            width="50"
                                            height="50"
                                        />
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center">
                                    <span className="text-heading text-wrap fw-medium">{restaurant.restaurantName}</span>
                                    <span className="text-truncate mb-0 d-none d-sm-block">
                                        <small>{restaurant.description}</small>
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div className="text-sm-end">{restaurant.address}</div>
                        </td>
                        <td>
                            <div className="mb-0 text-sm-end">{restaurant.rating} ★</div>
                        </td>
                        <td>
                            <div className="d-flex align-items-sm-center justify-content-sm-center">
                                <button className="btn btn-icon">
                                    <i className="bx bx-edit bx-md"></i>
                                </button>
                                <button className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                    <i className="bx bx-dots-vertical-rounded bx-md"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end m-0">
                                    <Link to={{ pathname: "/Addvariant" }} className="dropdown-item">View</Link>
                                    <a href="javascript:void(0);" className="dropdown-item">Xóa</a>
                                </div>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
                                            </table>
                                            <div className="row">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">
                                                        Showing 1 to 7 of 14 entries
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
                                                        <ul className="pagination">
                                                            <li className="paginate_button page-item previous disabled" id="DataTables_Table_0_previous">
                                                                <a aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous" tabIndex="-1" className="page-link">
                                                                    <i className="bx bx-chevron-left bx-18px"></i>
                                                                </a>
                                                            </li>
                                                            <li className="paginate_button page-item active">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" aria-current="page" data-dt-idx="0" tabIndex="0" className="page-link">1</a>
                                                            </li>
                                                            <li className="paginate_button page-item">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="1" tabIndex="0" className="page-link">2</a>
                                                            </li>
                                                            <li className="paginate_button page-item next" id="DataTables_Table_0_next">
                                                                <a href="#" aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabIndex="0" className="page-link">
                                                                    <i className="bx bx-chevron-right bx-18px"></i>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ width: '1%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Offcanvas to add new customer */}
                                <div
                                    className="offcanvas offcanvas-end"
                                    tabIndex={-1}
                                    id="offcanvasEcommerceCategoryList"
                                    aria-labelledby="offcanvasEcommerceCategoryListLabel"
                                >
                                    {/* Offcanvas Header */}
                                    <div className="offcanvas-header py-6">
                                        <h5
                                            id="offcanvasEcommerceCategoryListLabel"
                                            className="offcanvas-title"
                                        >
                                            Add Category
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close text-reset"
                                            data-bs-dismiss="offcanvas"
                                            aria-label="Close"
                                        />
                                    </div>
                                    {/* Offcanvas Body */}
                                    <div className="offcanvas-body border-top">
                                        <form
                                            className="pt-0 fv-plugins-bootstrap5 fv-plugins-framework"
                                            id="eCommerceCategoryListForm"
                                            onsubmit="return true"
                                            noValidate="novalidate"
                                        >
                                            {/* Title */}
                                            <div className="mb-6 fv-plugins-icon-container">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-title"
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="ecommerce-category-title"
                                                    placeholder="Enter category title"
                                                    name="categoryTitle"
                                                    aria-label="category title"
                                                />
                                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                            </div>
                                            {/* Slug */}
                                            <div className="mb-6 fv-plugins-icon-container">
                                                <label className="form-label" htmlFor="ecommerce-category-slug">
                                                    Slug
                                                </label>
                                                <input
                                                    type="text"
                                                    id="ecommerce-category-slug"
                                                    className="form-control"
                                                    placeholder="Enter slug"
                                                    aria-label="slug"
                                                    name="slug"
                                                />
                                                <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                            </div>
                                            {/* Image */}
                                            <div className="mb-6">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-image"
                                                >
                                                    Attachment
                                                </label>
                                                <input
                                                    className="form-control"
                                                    type="file"
                                                    id="ecommerce-category-image"
                                                />
                                            </div>
                                            {/* Parent category */}
                                            <div className="mb-6 ecommerce-select2-dropdown">
                                                <label
                                                    className="form-label"
                                                    htmlFor="ecommerce-category-parent-category"
                                                >
                                                    Parent category
                                                </label>
                                                <div className="position-relative">
                                                    <select
                                                        id="ecommerce-category-parent-category"
                                                        className="select2 form-select select2-hidden-accessible"
                                                        data-placeholder="Select parent category"
                                                        data-select2-id="ecommerce-category-parent-category"
                                                        tabIndex={-1}
                                                        aria-hidden="true"
                                                    >
                                                        <option value="" data-select2-id={2}>
                                                            Select parent Category
                                                        </option>
                                                        <option value="Household">Household</option>
                                                        <option value="Management">Management</option>
                                                        <option value="Electronics">Electronics</option>
                                                        <option value="Office">Office</option>
                                                        <option value="Automotive">Automotive</option>
                                                    </select>
                                                    <span
                                                        className="select2 select2-container select2-container--default"
                                                        dir="ltr"
                                                        data-select2-id={1}
                                                        style={{ width: "336.8px" }}
                                                    >
                                                        <span className="selection">
                                                            <span
                                                                className="select2-selection select2-selection--single"
                                                                role="combobox"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                                tabIndex={0}
                                                                aria-disabled="false"
                                                                aria-labelledby="select2-ecommerce-category-parent-category-container"
                                                            >
                                                                <span
                                                                    className="select2-selection__rendered"
                                                                    id="select2-ecommerce-category-parent-category-container"
                                                                    role="textbox"
                                                                    aria-readonly="true"
                                                                >
                                                                    <span className="select2-selection__placeholder">
                                                                        Select parent category
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="select2-selection__arrow"
                                                                    role="presentation"
                                                                >
                                                                    <b role="presentation" />
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Description */}
                                            <div className="mb-6">
                                                <label className="form-label">Description</label>
                                                <div className="form-control p-0 py-1">
                                                    <div
                                                        className="comment-editor border-0 ql-container ql-snow"
                                                        id="ecommerce-category-description"
                                                    >
                                                        <div
                                                            className="ql-editor ql-blank"
                                                            data-gramm="false"
                                                            contentEditable="true"
                                                            data-placeholder="Write a Comment..."
                                                        >
                                                            <p>
                                                                <br />
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="ql-clipboard"
                                                            contentEditable="true"
                                                            tabIndex={-1}
                                                        />
                                                        <div className="ql-tooltip ql-hidden">
                                                            <a
                                                                className="ql-preview"
                                                                rel="noopener noreferrer"
                                                                target="_blank"
                                                                href="about:blank"
                                                            />
                                                            <input
                                                                type="text"
                                                                data-formula="e=mc^2"
                                                                data-link="https://quilljs.com"
                                                                data-video="Embed URL"
                                                            />
                                                            <a className="ql-action" />
                                                            <a className="ql-remove" />
                                                        </div>
                                                    </div>
                                                    <div className="comment-toolbar border-0 rounded ql-toolbar ql-snow">
                                                        <div className="d-flex justify-content-end">
                                                            <span className="ql-formats me-0">
                                                                <button className="ql-bold" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-italic" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={13}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={5}
                                                                            x2={11}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={8}
                                                                            x2={10}
                                                                            y1={14}
                                                                            y2={4}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-underline" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <path
                                                                            className="ql-stroke"
                                                                            d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"
                                                                        />{" "}
                                                                        <rect
                                                                            className="ql-fill"
                                                                            height={1}
                                                                            rx="0.5"
                                                                            ry="0.5"
                                                                            width={12}
                                                                            x={3}
                                                                            y={15}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="ql-list"
                                                                    value="ordered"
                                                                    type="button"
                                                                >
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={15}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke ql-thin"
                                                                            x1="2.5"
                                                                            x2="4.5"
                                                                            y1="5.5"
                                                                            y2="5.5"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-fill"
                                                                            d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke ql-thin"
                                                                            d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-stroke ql-thin"
                                                                            d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button
                                                                    className="ql-list"
                                                                    value="bullet"
                                                                    type="button"
                                                                >
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={6}
                                                                            x2={15}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={4}
                                                                            y2={4}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={9}
                                                                            y2={9}
                                                                        />{" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={3}
                                                                            x2={3}
                                                                            y1={14}
                                                                            y2={14}
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-link" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <line
                                                                            className="ql-stroke"
                                                                            x1={7}
                                                                            x2={11}
                                                                            y1={7}
                                                                            y2={11}
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-even ql-stroke"
                                                                            d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"
                                                                        />{" "}
                                                                        <path
                                                                            className="ql-even ql-stroke"
                                                                            d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                                <button className="ql-image" type="button">
                                                                    <svg viewBox="0 0 18 18">
                                                                        {" "}
                                                                        <rect
                                                                            className="ql-stroke"
                                                                            height={10}
                                                                            width={12}
                                                                            x={3}
                                                                            y={4}
                                                                        />{" "}
                                                                        <circle className="ql-fill" cx={6} cy={7} r={1} />{" "}
                                                                        <polyline
                                                                            className="ql-even ql-fill"
                                                                            points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                                                                        />{" "}
                                                                    </svg>
                                                                </button>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Status */}
                                            <div className="mb-6 ecommerce-select2-dropdown">
                                                <label className="form-label">Select category status</label>
                                                <div className="position-relative">
                                                    <select
                                                        id="ecommerce-category-status"
                                                        className="select2 form-select select2-hidden-accessible"
                                                        data-placeholder="Select category status"
                                                        data-select2-id="ecommerce-category-status"
                                                        tabIndex={-1}
                                                        aria-hidden="true"
                                                    >
                                                        <option value="" data-select2-id={4}>
                                                            Select category status
                                                        </option>
                                                        <option value="Scheduled">Scheduled</option>
                                                        <option value="Publish">Publish</option>
                                                        <option value="Inactive">Inactive</option>
                                                    </select>
                                                    <span
                                                        className="select2 select2-container select2-container--default"
                                                        dir="ltr"
                                                        data-select2-id={3}
                                                        style={{ width: "336.8px" }}
                                                    >
                                                        <span className="selection">
                                                            <span
                                                                className="select2-selection select2-selection--single"
                                                                role="combobox"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                                tabIndex={0}
                                                                aria-disabled="false"
                                                                aria-labelledby="select2-ecommerce-category-status-container"
                                                            >
                                                                <span
                                                                    className="select2-selection__rendered"
                                                                    id="select2-ecommerce-category-status-container"
                                                                    role="textbox"
                                                                    aria-readonly="true"
                                                                >
                                                                    <span className="select2-selection__placeholder">
                                                                        Select category status
                                                                    </span>
                                                                </span>
                                                                <span
                                                                    className="select2-selection__arrow"
                                                                    role="presentation"
                                                                >
                                                                    <b role="presentation" />
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true" />
                                                    </span>
                                                </div>
                                            </div>
                                            {/* Submit and reset */}
                                            <div className="mb-6">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary me-sm-3 me-1 data-submit"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    type="reset"
                                                    className="btn btn-label-danger"
                                                    data-bs-dismiss="offcanvas"
                                                >
                                                    Discard
                                                </button>
                                            </div>
                                            <input type="hidden" />
                                        </form>
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
    )
}

export default  Restaurant