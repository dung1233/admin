import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import axios from 'axios';

const Oderdetails = () => {
    const { orderId } = useParams();
    const [orderDetails, setOrderDetails] = useState([]);
    const [custOrder, setCustOrder] = useState(null);
    const [restaurantName, setRestaurantName] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Định nghĩa hàm refreshOrderData
    const refreshOrderData = async () => {
        try {
            setLoading(true);
            if (!orderId) throw new Error('Invalid order ID.');

            // Gọi API để lấy danh sách order details
            const orderResponse = await axios.get(
                `https://t2305mpk320241031161932.azurewebsites.net/api/CustOrderDetail/by-order/${orderId}`
            );

            if (orderResponse.data && orderResponse.data.length > 0) {
                const details = await Promise.all(
                    orderResponse.data.map(async (detail) => {
                        const variantResponse = await axios.get(
                            `https://t2305mpk320241031161932.azurewebsites.net/api/ItemVariants/${detail.variantId}`
                        );
                        return {
                            ...detail,
                            menuItemName: variantResponse.data?.menuItemName || 'Unknown Item',
                            sizeNumber: variantResponse.data?.sizeNumber || 'N/A',
                        };
                    })
                );

                setOrderDetails(details);
                const custOrderData = orderResponse.data[0].custOrder;
                setCustOrder(custOrderData);

                if (custOrderData.restaurant_id) {
                    const restaurantResponse = await axios.get(
                        `https://t2305mpk320241031161932.azurewebsites.net/api/Restaurant/${custOrderData.restaurant_id}`
                    );
                    setRestaurantName(restaurantResponse.data?.restaurantName || 'Unknown');
                } else {
                    setRestaurantName('No restaurant assigned');
                }
            } else {
                throw new Error('No order details found.');
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch order details.');
        } finally {
            setLoading(false);
        }
    };

    // Sử dụng refreshOrderData trong useEffect
    useEffect(() => {
        refreshOrderData();
    }, [orderId]);

    // Sử dụng refreshOrderData trong confirmOrder
    const confirmOrder = async () => {
        try {
            await axios.put(
                `https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder/${orderId}/approve`
            );
            await refreshOrderData(); // Gọi hàm refresh sau khi approve
            alert('Order confirmed successfully!');
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to confirm order.');
        }
    };
    const prepareOrder = async () => {
        try {
            const response = await axios.put(
                `https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder/${custOrder.orderId}/prepare`
            );
            alert('Order status updated to Prepare.');
            setCustOrder((prev) => ({ ...prev, status: "Prepare" })); // Cập nhật trạng thái trong state
            
        } catch (error) {
            console.error('Error updating order to Prepare:', error);
            alert('Failed to update order status to Prepare.');
        }
    };
    const readyOrder = async () => {
        try {
            const response = await axios.put(
                `https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder/${custOrder.orderId}/ready`
            );
            alert('Order status updated to Ready.');
            setCustOrder((prev) => ({ ...prev, status: "Ready" })); // Cập nhật trạng thái trong state
        } catch (error) {
            console.error('Error updating order to Ready:', error);
            alert('Failed to update order status to Ready.');
        }
    };
    

    // Hiển thị trạng thái loading
    if (loading) {
        return <p>Loading...</p>;
    }

    // Hiển thị trạng thái lỗi
    if (error) {
        return <p>{error}</p>;
    }

    // Hiển thị nếu không có thông tin đơn hàng
    if (!custOrder) {
        return <p>No custOrder available.</p>;
    }

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
                                    _mstplaceholder={99723}
                                    _mstaria-label={99723}
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
                            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-6 row-gap-4">
                                <div className="d-flex flex-column justify-content-center">
                                    <div className="mb-1">
                                        <span className="h5">Order #32543 </span>
                                        <span className="badge bg-label-success me-1 ms-2">Paid</span>{" "}
                                        <span className="badge bg-label-info">Ready to Pickup</span>
                                    </div>
                                    <p className="mb-0">
                                        Aug 17, <span id="orderYear">2024</span>, 5:48 (ET)
                                    </p>
                                </div>
                                <div className="d-flex align-content-center flex-wrap gap-2">
                                    <button className="btn btn-label-danger delete-order">
                                        Delete Order
                                    </button>
                                </div>
                            </div>
                            {/* Order Details Table */}
                            <div className="row">
                                <div className="col-12 col-lg-8">
                                    <div className="card mb-6">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="card-title m-0">Order details</h5>
                                            <h6 className="m-0">
                                                <a href=" javascript:void(0)"></a>
                                            </h6>
                                        </div>
                                        <div className="card-datatable table-responsive">
                                            <div
                                                id="DataTables_Table_0_wrapper"
                                                className="dataTables_wrapper dt-bootstrap5 no-footer"
                                            >
                                                <table
                                                    className="datatables-order-details table border-top dataTable no-footer dtr-column"
                                                    id="DataTables_Table_0"
                                                    style={{ width: 918 }}
                                                >
                                                    <thead>
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
                                                                className="w-50 sorting_disabled"
                                                                rowSpan={1}
                                                                colSpan={1}
                                                                style={{ width: 359 }}
                                                                aria-label="products"
                                                                _mstaria-label={120744}
                                                            >
                                                                Name
                                                            </th>
                                                            <th
                                                                className="w-25 sorting_disabled"
                                                                rowSpan={1}
                                                                colSpan={1}
                                                                style={{ width: 156 }}
                                                                aria-label="price"
                                                                _mstaria-label={61646}
                                                            >
                                                                Category
                                                            </th>
                                                            <th
                                                                className="w-25 sorting_disabled"
                                                                rowSpan={1}
                                                                colSpan={1}
                                                                style={{ width: 156 }}
                                                                aria-label="price"
                                                                _mstaria-label={61646}
                                                            >
                                                                price
                                                            </th>
                                                            <th
                                                                className="w-25 sorting_disabled"
                                                                rowSpan={1}
                                                                colSpan={1}
                                                                style={{ width: 147 }}
                                                                aria-label="qty"
                                                                _mstaria-label={36504}
                                                            >
                                                                Size
                                                            </th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {orderDetails.map((detail, index) => (
                                                            <tr className="odd" key={index}>
                                                                <td className="dt-checkboxes-cell">
                                                                    <input type="checkbox" className="dt-checkboxes form-check-input" />
                                                                </td>
                                                                <td className="sorting_1">
                                                                    <div className="d-flex justify-content-start align-items-center text-nowrap">
                                                                        <div className="avatar-wrapper">

                                                                        </div>
                                                                        <div className="d-flex flex-column">
                                                                            {/* Hiển thị tên danh mục */}
                                                                            <h6 className="text-heading mb-0">
                                                                                {detail.menuItemName}
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td> {detail.category?.categoryName || 'Unknown'}</td>

                                                                <td>${detail.price || 'N/A'}</td>
                                                                <td>{detail.sizeNumber}</td> {/* Hiển thị sizeNumber */}

                                                                {/* Hiển thị số lượng bàn */}
                                                                <td>

                                                                </td>
                                                                {/* Hiển thị tổng giá */}
                                                                <td>

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>



                                                </table>
                                                <div style={{ width: "1%" }} />
                                            </div>
                                            <div className="d-flex justify-content-end align-items-center m-6 mb-2">

                                                <div className="order-calculations">
                                                    <div className="d-flex justify-content-start">
                                                        <h6 className="w-px-100 mb-0">Total:</h6>
                                                        <h6 className="mb-0">${custOrder?.totalCost || 'N/A'}</h6>

                                                    </div>
                                                    <div className="d-flex justify-content-start">

                                                        <h6 className="w-px-100 mb-0">DepositCost:</h6>
                                                        <h6 className="mb-0">${custOrder?.depositCost || 'N/A'}</h6>
                                                    </div>
                                                </div>

                                                <div style={{ display: "flex", justifyContent: 'center', margin: '15px' }}>

                                                </div>


                                            </div>

                                        </div>
                                        <div>
                                        </div> {/* <h4>Order ID: {orderDetails.orderId}</h4>
      <p>Status: {orderDetails.status}</p>
      {returnId ? (
        <div>
          <p>Return ID: {returnId}</p>
          <p>Reason for Return: {returnReason ? returnReason : 'Loading reason...'}</p>
        </div>
      ) : (
        <p>No return request found for this order.</p>
      )}
    </div> */}

{custOrder.status === "Pending" && (
    <div style={{ display: "flex", justifyContent: 'center', margin: '15px' }}>
        <button
            className="btn btn-success"
            onClick={confirmOrder} // Xác nhận đơn hàng
        >
            Confirm Order
        </button>
    </div>
)}

{custOrder.status === "Approved" && (
    <div style={{ display: "flex", justifyContent: 'center', margin: '15px' }}>
   
        <button
            className="btn btn-warning"
            onClick={prepareOrder} // Chuyển trạng thái thành 'Prepare'
        >
            Prepare Order
        </button>
    </div>
)}

{custOrder.status === "Preparing" && (
    <div style={{ display: "flex",textAlign:'center', margin: '15px', flexDirection:'column',alignItems:'center' }}>
        <p>The order is being prepared.</p>
        <button style={{width:'100px',height:'50px'}}
            className="btn btn-primary"
            onClick={readyOrder} // Chuyển trạng thái thành 'Ready'
        >
            Ready Order
        </button>
    </div>
)}

{custOrder.status === "Ready" && (
    <p>The order is ready for delivery.</p>
)}






                                    </div>


                                </div>


                                <div className="col-12 col-lg-4">
                                    <div className="card mb-6">
                                        <div className="card-header">
                                            <h5 className="card-title m-0">Customer details</h5>
                                        </div>
                                        <div className="card-body">
                                            <div className="d-flex justify-content-start align-items-center mb-6">
                                                <div className="avatar me-3">
                                                </div>
                                                <div className="d-flex flex-column">
                                                    <a
                                                        href="app-user-view-account.html"
                                                        className="text-body text-nowrap"
                                                    >
                                                        <h6 className="mb-0"></h6>
                                                    </a>
                                                    <span></span>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start align-items-center mb-6">
                                                <span className="avatar rounded-circle bg-label-success me-3 d-flex align-items-center justify-content-center">
                                                    <i className="bx bx-cart bx-lg" />
                                                </span>
                                                <h6 className="text-nowrap mb-0"></h6>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <h6 className="mb-1">Contact info</h6>
                                                <h6 className="mb-1">
                                                    <a
                                                        href=" javascript:void(0)"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#editUser"
                                                    >
                                                        
                                                    </a>
                                                </h6>
                                            </div>
                                            <p className=" mb-1">Email:{custOrder?.email || 'N/A'}</p>
                                            <p className=" mb-0">Mobile: {custOrder?.phone || 'N/A'} </p>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <div className="card-header d-flex justify-content-between">
                                            <h5 className="card-title m-0">Restaurant</h5>
                                            <h6 className="m-0">
                                                <a
                                                    href=" javascript:void(0)"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#addNewAddress"
                                                >
                                                    
                                                </a>
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                <br />
                                                <p className=" mb-1">Restaurant: <td>{restaurantName}</td> </p>
                                                <p className=" mb-1">Time: {custOrder?.eventTime || 'N/A'} </p>
                                               
                                            </p>
                                        </div>
                                    </div>
                                    <div className="card mb-6">
                                        <div className="card-header d-flex justify-content-between pb-2">
                                            <h5 className="card-title m-0">Booking Table vs Note </h5>
                                            <h6 className="m-0">
                                                <a
                                                    href=" javascript:void(0)"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#addNewAddress"
                                                >
                                                    
                                                </a>
                                            </h6>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-6">
                                                <br />

                                                <p className=" mb-1">Số Người: {custOrder?.noOfPeople || 'N/A'} </p>
                                                <p className=" mb-1">Số Bàn: {custOrder?.noOfTable || 'N/A'}</p>
                                                <p className=" mb-1">Note: {custOrder?.orderNote || 'N/A'}</p>

                                            </p>
                                            {/* <h5 className="mb-1">Mastercard</h5>
                                                <p className="mb-0">Card Number: ******4291</p> */}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* Edit User Modal */}
                            <div
                                className="modal fade"
                                id="editUser"
                                tabIndex={-1}
                                style={{ display: "none" }}
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg modal-simple modal-edit-user">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                _mstaria-label={59709}
                                            />
                                            <div className="text-center mb-6">
                                                <h4 className="mb-2">Edit User Information</h4>
                                                <p>Updating user details will receive a privacy audit.</p>
                                            </div>
                                            <form className="row g-6" onsubmit="false">
                                                <div className="col-12 col-md-6">
                                                    <label
                                                        className="form-label"
                                                        htmlFor="modalEditUserFirstName"
                                                    >
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalEditUserFirstName"
                                                        name="modalEditUserFirstName"
                                                        className="form-control"
                                                        placeholder="John"
                                                        defaultValue="John"
                                                        _mstplaceholder={44746}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserLastName">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalEditUserLastName"
                                                        name="modalEditUserLastName"
                                                        className="form-control"
                                                        placeholder="Doe"
                                                        defaultValue="Doe"
                                                        _mstplaceholder={29549}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label" htmlFor="modalEditUserName">
                                                        Username
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalEditUserName"
                                                        name="modalEditUserName"
                                                        className="form-control"
                                                        placeholder="johndoe007"
                                                        defaultValue="johndoe007"
                                                        _mstplaceholder={125879}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserEmail">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalEditUserEmail"
                                                        name="modalEditUserEmail"
                                                        className="form-control"
                                                        placeholder="example@domain.com"
                                                        defaultValue="example@domain.com"
                                                        _mstplaceholder={360750}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserStatus">
                                                        Status
                                                    </label>
                                                    <div className="position-relative">
                                                        <div className="position-relative">
                                                            <select
                                                                id="modalEditUserStatus"
                                                                name="modalEditUserStatus"
                                                                className="select2 form-select select2-hidden-accessible"
                                                                aria-label="Default select example"
                                                                tabIndex={-1}
                                                                aria-hidden="true"
                                                                data-select2-id="modalEditUserStatus"
                                                                _mstaria-label={455182}
                                                            >
                                                                <option selected="" data-select2-id={15}>
                                                                    Status
                                                                </option>
                                                                <option value={1}>Active</option>
                                                                <option value={2}>Inactive</option>
                                                                <option value={3}>Suspended</option>
                                                            </select>
                                                            <span
                                                                className="select2 select2-container select2-container--default"
                                                                dir="ltr"
                                                                data-select2-id={14}
                                                                style={{ width: "auto" }}
                                                            >
                                                                <span className="selection">
                                                                    <span
                                                                        className="select2-selection select2-selection--single"
                                                                        role="combobox"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        tabIndex={0}
                                                                        aria-disabled="false"
                                                                        aria-labelledby="select2-modalEditUserStatus-container"
                                                                    >
                                                                        <span
                                                                            className="select2-selection__rendered"
                                                                            id="select2-modalEditUserStatus-container"
                                                                            role="textbox"
                                                                            aria-readonly="true"
                                                                            title="Status"
                                                                        >
                                                                            Status
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
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditTaxID">
                                                        Tax ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalEditTaxID"
                                                        name="modalEditTaxID"
                                                        className="form-control modal-edit-tax-id"
                                                        placeholder="123 456 7890"
                                                        defaultValue="123 456 7890"
                                                        _mstplaceholder={78975}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserPhone">
                                                        Phone Number
                                                    </label>
                                                    <div className="input-group">
                                                        <span className="input-group-text">US (+1)</span>
                                                        <input
                                                            type="text"
                                                            id="modalEditUserPhone"
                                                            name="modalEditUserPhone"
                                                            className="form-control phone-number-mask"
                                                            placeholder="202 555 0111"
                                                            defaultValue="202 555 0111"
                                                            _mstplaceholder={74906}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserLanguage">
                                                        Language
                                                    </label>
                                                    <div className="position-relative">
                                                        <div className="position-relative">
                                                            <select
                                                                id="modalEditUserLanguage"
                                                                name="modalEditUserLanguage"
                                                                className="select2 form-select select2-hidden-accessible"
                                                                multiple=""
                                                                tabIndex={-1}
                                                                aria-hidden="true"
                                                                data-select2-id="modalEditUserLanguage"
                                                            >
                                                                <option value="">Select</option>
                                                                <option
                                                                    value="english"
                                                                    selected=""
                                                                    data-select2-id={26}
                                                                >
                                                                    English
                                                                </option>
                                                                <option value="spanish">Spanish</option>
                                                                <option value="french">French</option>
                                                                <option value="german">German</option>
                                                                <option value="dutch">Dutch</option>
                                                                <option value="hebrew">Hebrew</option>
                                                                <option value="sanskrit">Sanskrit</option>
                                                                <option value="hindi">Hindi</option>
                                                            </select>
                                                            <span
                                                                className="select2 select2-container select2-container--default"
                                                                dir="ltr"
                                                                data-select2-id={25}
                                                                style={{ width: "auto" }}
                                                            >
                                                                <span className="selection">
                                                                    <span
                                                                        className="select2-selection select2-selection--multiple"
                                                                        role="combobox"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        tabIndex={-1}
                                                                        aria-disabled="false"
                                                                    >
                                                                        <ul className="select2-selection__rendered">
                                                                            <li
                                                                                className="select2-selection__choice"
                                                                                title="English"
                                                                                data-select2-id={27}
                                                                            >
                                                                                <span
                                                                                    className="select2-selection__choice__remove"
                                                                                    role="presentation"
                                                                                >
                                                                                    ×
                                                                                </span>
                                                                                <font _mstmutation={1}>English</font>
                                                                            </li>
                                                                            <li className="select2-search select2-search--inline">
                                                                                <input
                                                                                    className="select2-search__field"
                                                                                    type="search"
                                                                                    tabIndex={0}
                                                                                    autoComplete="off"
                                                                                    autoCorrect="off"
                                                                                    autoCapitalize="none"
                                                                                    spellCheck="false"
                                                                                    role="searchbox"
                                                                                    aria-autocomplete="list"
                                                                                    placeholder=""
                                                                                    style={{ width: "0.75em" }}
                                                                                />
                                                                            </li>
                                                                        </ul>
                                                                    </span>
                                                                </span>
                                                                <span className="dropdown-wrapper" aria-hidden="true" />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalEditUserCountry">
                                                        Country
                                                    </label>
                                                    <div className="position-relative">
                                                        <div className="position-relative">
                                                            <select
                                                                id="modalEditUserCountry"
                                                                name="modalEditUserCountry"
                                                                className="select2 form-select select2-hidden-accessible"
                                                                data-allow-clear="true"
                                                                tabIndex={-1}
                                                                aria-hidden="true"
                                                                data-select2-id="modalEditUserCountry"
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="Australia">Australia</option>
                                                                <option value="Bangladesh">Bangladesh</option>
                                                                <option value="Belarus">Belarus</option>
                                                                <option value="Brazil">Brazil</option>
                                                                <option value="Canada">Canada</option>
                                                                <option value="China">China</option>
                                                                <option value="France">France</option>
                                                                <option value="Germany">Germany</option>
                                                                <option value="India" selected="" data-select2-id={54}>
                                                                    India
                                                                </option>
                                                                <option value="Indonesia">Indonesia</option>
                                                                <option value="Israel">Israel</option>
                                                                <option value="Italy">Italy</option>
                                                                <option value="Japan">Japan</option>
                                                                <option value="Korea">Korea, Republic of</option>
                                                                <option value="Mexico">Mexico</option>
                                                                <option value="Philippines">Philippines</option>
                                                                <option value="Russia">Russian Federation</option>
                                                                <option value="South Africa">South Africa</option>
                                                                <option value="Thailand">Thailand</option>
                                                                <option value="Turkey">Turkey</option>
                                                                <option value="Ukraine">Ukraine</option>
                                                                <option value="United Arab Emirates">
                                                                    United Arab Emirates
                                                                </option>
                                                                <option value="United Kingdom">United Kingdom</option>
                                                                <option value="United States">United States</option>
                                                            </select>
                                                            <span
                                                                className="select2 select2-container select2-container--default"
                                                                dir="ltr"
                                                                data-select2-id={53}
                                                                style={{ width: "auto" }}
                                                            >
                                                                <span className="selection">
                                                                    <span
                                                                        className="select2-selection select2-selection--single"
                                                                        role="combobox"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        tabIndex={0}
                                                                        aria-disabled="false"
                                                                        aria-labelledby="select2-modalEditUserCountry-container"
                                                                    >
                                                                        <span
                                                                            className="select2-selection__rendered"
                                                                            id="select2-modalEditUserCountry-container"
                                                                            role="textbox"
                                                                            aria-readonly="true"
                                                                            title="India"
                                                                        >
                                                                            <span
                                                                                className="select2-selection__clear"
                                                                                title="Remove all items"
                                                                                data-select2-id={55}
                                                                            >
                                                                                ×
                                                                            </span>
                                                                            <font _mstmutation={1}>India</font>
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
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch my-2 ms-2">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="editBillingAddress"
                                                            defaultChecked=""
                                                        />
                                                        <label
                                                            htmlFor="editBillingAddress"
                                                            className="switch-label"
                                                        >
                                                            Use as a billing address?
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <button type="submit" className="btn btn-primary me-3">
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="reset"
                                                        className="btn btn-label-secondary"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        _mstaria-label={59709}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*/ Edit User Modal */}
                            {/* Add New Address Modal */}
                            <div
                                className="modal fade"
                                id="addNewAddress"
                                tabIndex={-1}
                                style={{ display: "none" }}
                                aria-hidden="true"
                            >
                                <div className="modal-dialog modal-lg modal-simple modal-add-new-address">
                                    <div className="modal-content">
                                        <div className="modal-body">
                                            <button
                                                type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                                _mstaria-label={59709}
                                            />
                                            <div className="text-center mb-6">
                                                <h4 className="address-title mb-2">Add New Address</h4>
                                                <p className="address-subtitle">
                                                    Add new address for express delivery
                                                </p>
                                            </div>
                                            <form
                                                id="addNewAddressForm"
                                                className="row g-6 fv-plugins-bootstrap5 fv-plugins-framework"
                                                onsubmit="return false"
                                                noValidate="novalidate"
                                            >
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-md mb-md-0 mb-4">
                                                            <div className="form-check custom-option custom-option-icon checked">
                                                                <label
                                                                    className="form-check-label custom-option-content"
                                                                    htmlFor="customRadioHome"
                                                                >
                                                                    <span className="custom-option-body">
                                                                        <i className="bx bx-home" />
                                                                        <span className="custom-option-title">Home</span>
                                                                        <small> Delivery time (9am – 9pm) </small>
                                                                    </span>
                                                                    <input
                                                                        name="customRadioIcon"
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        defaultValue=""
                                                                        id="customRadioHome"
                                                                        defaultChecked=""
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="col-md mb-md-0 mb-4">
                                                            <div className="form-check custom-option custom-option-icon">
                                                                <label
                                                                    className="form-check-label custom-option-content"
                                                                    htmlFor="customRadioOffice"
                                                                >
                                                                    <span className="custom-option-body">
                                                                        <i className="bx bx-briefcase" />
                                                                        <span className="custom-option-title">
                                                                            {" "}
                                                                            Office{" "}
                                                                        </span>
                                                                        <small> Delivery time (9am – 5pm) </small>
                                                                    </span>
                                                                    <input
                                                                        name="customRadioIcon"
                                                                        className="form-check-input"
                                                                        type="radio"
                                                                        defaultValue=""
                                                                        id="customRadioOffice"
                                                                    />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-md-6 fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="modalAddressFirstName">
                                                        First Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressFirstName"
                                                        name="modalAddressFirstName"
                                                        className="form-control"
                                                        placeholder="John"
                                                        _mstplaceholder={44746}
                                                    />
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                                </div>
                                                <div className="col-12 col-md-6 fv-plugins-icon-container">
                                                    <label className="form-label" htmlFor="modalAddressLastName">
                                                        Last Name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressLastName"
                                                        name="modalAddressLastName"
                                                        className="form-control"
                                                        placeholder="Doe"
                                                        _mstplaceholder={29549}
                                                    />
                                                    <div className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback" />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label" htmlFor="modalAddressCountry">
                                                        Country
                                                    </label>
                                                    <div className="position-relative">
                                                        <div className="position-relative">
                                                            <select
                                                                id="modalAddressCountry"
                                                                name="modalAddressCountry"
                                                                className="select2 form-select select2-hidden-accessible"
                                                                data-allow-clear="true"
                                                                tabIndex={-1}
                                                                aria-hidden="true"
                                                                data-select2-id="modalAddressCountry"
                                                            >
                                                                <option value="" data-select2-id={82}>
                                                                    Select
                                                                </option>
                                                                <option value="Australia">Australia</option>
                                                                <option value="Bangladesh">Bangladesh</option>
                                                                <option value="Belarus">Belarus</option>
                                                                <option value="Brazil">Brazil</option>
                                                                <option value="Canada">Canada</option>
                                                                <option value="China">China</option>
                                                                <option value="France">France</option>
                                                                <option value="Germany">Germany</option>
                                                                <option value="India">India</option>
                                                                <option value="Indonesia">Indonesia</option>
                                                                <option value="Israel">Israel</option>
                                                                <option value="Italy">Italy</option>
                                                                <option value="Japan">Japan</option>
                                                                <option value="Korea">Korea, Republic of</option>
                                                                <option value="Mexico">Mexico</option>
                                                                <option value="Philippines">Philippines</option>
                                                                <option value="Russia">Russian Federation</option>
                                                                <option value="South Africa">South Africa</option>
                                                                <option value="Thailand">Thailand</option>
                                                                <option value="Turkey">Turkey</option>
                                                                <option value="Ukraine">Ukraine</option>
                                                                <option value="United Arab Emirates">
                                                                    United Arab Emirates
                                                                </option>
                                                                <option value="United Kingdom">United Kingdom</option>
                                                                <option value="United States">United States</option>
                                                            </select>
                                                            <span
                                                                className="select2 select2-container select2-container--default"
                                                                dir="ltr"
                                                                data-select2-id={81}
                                                                style={{ width: "auto" }}
                                                            >
                                                                <span className="selection">
                                                                    <span
                                                                        className="select2-selection select2-selection--single"
                                                                        role="combobox"
                                                                        aria-haspopup="true"
                                                                        aria-expanded="false"
                                                                        tabIndex={0}
                                                                        aria-disabled="false"
                                                                        aria-labelledby="select2-modalAddressCountry-container"
                                                                    >
                                                                        <span
                                                                            className="select2-selection__rendered"
                                                                            id="select2-modalAddressCountry-container"
                                                                            role="textbox"
                                                                            aria-readonly="true"
                                                                        >
                                                                            <span className="select2-selection__placeholder">
                                                                                Select value
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
                                                </div>
                                                <div className="col-12 ">
                                                    <label className="form-label" htmlFor="modalAddressAddress1">
                                                        Address Line 1
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressAddress1"
                                                        name="modalAddressAddress1"
                                                        className="form-control"
                                                        placeholder="12, Business Park"
                                                        _mstplaceholder={266383}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label" htmlFor="modalAddressAddress2">
                                                        Address Line 2
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressAddress2"
                                                        name="modalAddressAddress2"
                                                        className="form-control"
                                                        placeholder="Mall Road"
                                                        _mstplaceholder={107406}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalAddressLandmark">
                                                        Landmark
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressLandmark"
                                                        name="modalAddressLandmark"
                                                        className="form-control"
                                                        placeholder="Nr. Hard Rock Cafe"
                                                        _mstplaceholder={256789}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalAddressCity">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressCity"
                                                        name="modalAddressCity"
                                                        className="form-control"
                                                        placeholder="Los Angeles"
                                                        _mstplaceholder={152503}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalAddressLandmark">
                                                        State
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressState"
                                                        name="modalAddressState"
                                                        className="form-control"
                                                        placeholder="California"
                                                        _mstplaceholder={154310}
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6">
                                                    <label className="form-label" htmlFor="modalAddressZipCode">
                                                        Zip Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="modalAddressZipCode"
                                                        name="modalAddressZipCode"
                                                        className="form-control"
                                                        placeholder={99950}
                                                        _mstplaceholder={31538}
                                                    />
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-check form-switch my-2 ms-2">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id="billingAddress"
                                                        />
                                                        <label htmlFor="billingAddress" className="switch-label">
                                                            Use as a billing address?
                                                        </label>
                                                    </div>
                                                </div>
                                                <div className="col-12 text-center">
                                                    <button type="submit" className="btn btn-primary me-3">
                                                        Submit
                                                    </button>
                                                    <button
                                                        type="reset"
                                                        className="btn btn-label-secondary"
                                                        data-bs-dismiss="modal"
                                                        aria-label="Close"
                                                        _mstaria-label={59709}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <input type="hidden" />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*/ Add New Address Modal */}
                        </div>
                        {/* / Content */}
                        {/* Footer */}
                        <footer className="content-footer footer bg-footer-theme">
                            <div className="container-xxl">
                                <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                                    <div className="text-body">
                                        © <font _mstmutation={1}>2024, made with ❤️ by </font>
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

export default Oderdetails