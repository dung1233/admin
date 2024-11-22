import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Oderlist = () => {
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]); // Danh sách người dùng (nếu cần từ API khác)

    // Hàm gọi API để lấy dữ liệu đơn hàng
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        // Gọi API users nếu cần
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://example.com/api/Users'); // Thay bằng URL API người dùng
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchOrders();
        fetchUsers();
    }, []);

    
    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
               
                <div className="layout-page">
                    {/* Navbar */}
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
                            <a className="nav-item nav-link px-0 me-xl-6" href="javascript:void(0)">
                                <i className="bx bx-menu bx-md"></i>
                            </a>
                        </div>

                        
                    </nav>
                    {/* / Navbar */}
                    {/* Content wrapper */}
                    <div className="content-wrapper">
                        {/* Content */}
                        <div className="container-xxl flex-grow-1 container-p-y">
                            {/* Order List Widget */}
                            <div className="card mb-6">
                                <div className="card-widget-separator-wrapper">
                                    <div className="card-body card-widget-separator">
                                        <div className="row gy-4 gy-sm-1">
                                            <div className="col-sm-6 col-lg-3">
                                                <div className="d-flex justify-content-between align-items-start card-widget-1 border-end pb-4 pb-sm-0">
                                                    <div>
                                                        <h4 className="mb-0">56</h4>
                                                        <p className="mb-0">Pending Payment</p>
                                                    </div>
                                                    <span className="avatar w-px-40 h-px-40 me-sm-6">
                                                        <span className="avatar-initial bg-label-secondary rounded">
                                                            <i className="bx bx-calendar bx-lg text-heading" />
                                                        </span>
                                                    </span>
                                                </div>
                                                <hr className="d-none d-sm-block d-lg-none me-6" />
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <div className="d-flex justify-content-between align-items-start card-widget-2 border-end pb-4 pb-sm-0">
                                                    <div>
                                                        <h4 className="mb-0">12,689</h4>
                                                        <p className="mb-0">Completed</p>
                                                    </div>
                                                    <span className="avatar w-px-40 h-px-40 p-2 me-lg-6">
                                                        <span className="avatar-initial bg-label-secondary rounded">
                                                            <i className="bx bx-check-double bx-lg text-heading" />
                                                        </span>
                                                    </span>
                                                </div>
                                                <hr className="d-none d-sm-block d-lg-none" />
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <div className="d-flex justify-content-between align-items-start border-end pb-4 pb-sm-0 card-widget-3">
                                                    <div>
                                                        <h4 className="mb-0">124</h4>
                                                        <p className="mb-0">Refunded</p>
                                                    </div>
                                                    <span className="avatar w-px-40 h-px-40 p-2 me-sm-6">
                                                        <span className="avatar-initial bg-label-secondary rounded">
                                                            <i className="bx bx-wallet bx-lg text-heading" />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-sm-6 col-lg-3">
                                                <div className="d-flex justify-content-between align-items-start">
                                                    <div>
                                                        <h4 className="mb-0">32</h4>
                                                        <p className="mb-0">Failed</p>
                                                    </div>
                                                    <span className="avatar w-px-40 h-px-40 p-2">
                                                        <span className="avatar-initial bg-label-secondary rounded">
                                                            <i className="bx bx-error-alt bx-lg text-heading" />
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Order List Table */}
                            <div className="card">
                                <div className="card-datatable table-responsive">
                                    <div
                                        id="DataTables_Table_0_wrapper"
                                        className="dataTables_wrapper dt-bootstrap5 no-footer"
                                    >
                                        <div className="card-header py-0 d-flex flex-column flex-md-row align-items-center">
                                            <div>
                                                <div
                                                    id="DataTables_Table_0_filter"
                                                    className="dataTables_filter ms-n3 mb-0 mb-md-6"
                                                >
                                                    <label>
                                                        <input
                                                            type="search"
                                                            className="form-control"
                                                            placeholder="Search Order"
                                                            aria-controls="DataTables_Table_0"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-md-end gap-2 justify-content-center">
                                                <div
                                                    className="dataTables_length ms-n2"
                                                    id="DataTables_Table_0_length"
                                                >
                                                    <label>
                                                        <select
                                                            name="DataTables_Table_0_length"
                                                            aria-controls="DataTables_Table_0"
                                                            className="form-select"
                                                        >
                                                            <option value={10}>10</option>
                                                            <option value={40}>40</option>
                                                            <option value={60}>60</option>
                                                            <option value={80}>80</option>
                                                            <option value={100}>100</option>
                                                        </select>
                                                    </label>
                                                </div>
                                                <div className="dt-action-buttons pt-0">
                                                    <div className="dt-buttons btn-group flex-wrap">
                                                        <div className="btn-group">
                                                            <button
                                                                className="btn btn-secondary buttons-collection dropdown-toggle btn-label-secondary"
                                                                tabIndex={0}
                                                                aria-controls="DataTables_Table_0"
                                                                type="button"
                                                                aria-haspopup="dialog"
                                                                aria-expanded="false"
                                                            >
                                                                <span>
                                                                    <i className="bx bx-export bx-sm me-2" />
                                                                    Export
                                                                </span>
                                                            </button>
                                                        </div>{" "}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <table
                                            className="datatables-order table border-top dataTable no-footer dtr-column collapsed"
                                            id="DataTables_Table_0"
                                            aria-describedby="DataTables_Table_0_info"
                                            style={{ width: 1151 }}
                                        >
                                            <thead>
                                                <tr>
                                                    <th
                                                        className="control sorting_disabled"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 2 }}
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
                                                        className="sorting"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 49 }}
                                                        aria-label="order: activate to sort column ascending"
                                                    >
                                                        Order ID
                                                    </th>
                                                    <th
                                                        className="sorting sorting_asc"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 122 }}
                                                        aria-label="date: activate to sort column descending"
                                                        aria-sort="ascending"
                                                    >
                                                        User Name
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 253 }}
                                                        aria-label="customers: activate to sort column ascending"
                                                    >
                                                        Email
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 99 }}
                                                        aria-label="payment: activate to sort column ascending"
                                                    >
                                                        Price
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 111 }}
                                                        aria-label="status: activate to sort column ascending"
                                                    >
                                                        Status
                                                    </th>
                                                    <th
                                                        className="sorting"
                                                        tabIndex={0}
                                                        aria-controls="DataTables_Table_0"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 133 }}
                                                        aria-label="method: activate to sort column ascending"
                                                    >
                                                        Order Date
                                                    </th>
                                                   
                                                    <th
                                                        className="sorting_disabled dtr-hidden"
                                                        rowSpan={1}
                                                        colSpan={1}
                                                        style={{ width: 0 }}
                                                        aria-label="Actions"
                                                    >
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map((order) => {
                                                    // Tìm user tương ứng với userId từ đơn hàng
                                                    const user = users.find((u) => u.userId === order.userId);
                                                    return (
                                                        <tr key={order.orderId}>
                                                            <td></td>
                                                            <td></td>
                                                            <td>{order.orderId}</td>
                                                            <td>{user ?  user.name : order.name || 'Unknown'}</td>
                                                            <td>{user ? user.email : order.email || 'Unknown'}</td>
                                                            <td>{order.totalCost}</td>
                                                            <td><span
                                                                className={`badge px-2 ${order.status ==='Pending' ? 'badge bg-label-warning' :
                                                                        order.status === 'Cancelled'  ? 'badge bg-label-danger' :
                                                                        order.status === 'Order cancelled'  ? 'badge bg-label-danger' :
                                                                        order.status === 'Return Denied' ? 'badge bg-label-danger' :                                                                    
                                                                        order.status === 'Denied' ? 'badge bg-label-danger' :
                                                                        order.status === 'Return' ? 'badge bg-label-danger' :
                                                                                           'badge bg-label-success'
                                                                    }`}
                                                            >
                                                                {order.status}
                                                            </span></td>
                                                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                                           
                                                            <td className="dtr-hidden" >
                                                                <div className="d-flex justify-content-sm-start align-items-sm-center">
                                                                    <button className="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="bx bx-dots-vertical-rounded bx-md" />
                                                                    </button>
                                                                    <div className="dropdown-menu dropdown-menu-end m-0">
                                                                        <a>
                                                                            <Link
                                                                                 to={`/OrderDetails/${order.orderId}`}
                                                                                
                                                                                className="dropdown-item"
                                                                            >
                                                                                View
                                                                            </Link>
                                                                        </a>
                                                                       
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
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
                                                    Displaying 1 to 10 of 100 entries
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
                                                                data-dt-idx={9}
                                                                tabIndex={0}
                                                                className="page-link"
                                                            >
                                                                10
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
    )
}

export default Oderlist
