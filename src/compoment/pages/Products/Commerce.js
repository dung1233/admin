import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';



ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);



const Commerce = () => {
    // nút log out 
    const navigate = useNavigate(); // Sử dụng hook để điều hướng
    const token = localStorage.getItem('jwtToken')
    const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
    const [isNotificationDropdownOpen, setNotificationDropdownOpen] = useState(false);

    // Toggle user dropdown
    const toggleUserDropdown = () => {
        setUserDropdownOpen(!isUserDropdownOpen);
        // Đảm bảo các dropdown khác đóng lại khi mở dropdown này
        setNotificationDropdownOpen(false);
    };
    // Toggle notification dropdown
    const toggleNotificationDropdown = () => {
        setNotificationDropdownOpen(!isNotificationDropdownOpen);
        setUserDropdownOpen(false);
    };


    // Close all dropdowns when clicking outside
    const closeDropdowns = () => {
        setUserDropdownOpen(false);
        setNotificationDropdownOpen(false);
    };


    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('jwtToken'); // Lấy token từ localStorage
            console.log(token)

            // Xóa token và userName khỏi localStorage
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('userName');

            // Điều hướng về trang đăng nhập
            navigate('/login');
        } catch (error) {
            console.error('Lỗi khi đăng xuất:', error);
        }
    };
    const menuRef = useRef(null);
    const [menuState, setMenuState] = useState({
        dashboard: false,
        layouts: false,
        frontPages: false,
        ecommerce: false,
        settings: false,
        order: false,
        Customer: false,
        Settings: false,
        Users: false,
        View: false
    });

    const [chartData, setChartData] = useState(null); // Biểu đồ doanh thu
    const [orderChartData, setOrderChartData] = useState(null); // Biểu đồ tổng số đơn hàng
    const [view, setView] = useState("day"); // Chế độ hiển thị: 'day', 'week', 'month'
    const [mostOrderedItem, setMostOrderedItem] = useState(null); // Món ăn được đặt nhiều nhất
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder"
                );
                const orders = response.data;

                // Lấy dữ liệu cho biểu đồ doanh thu
                const revenueData = processData(orders, view, "revenue");
                setChartData({
                    labels: revenueData.labels,
                    datasets: [
                        {
                            label: "Revenue",
                            data: revenueData.data,
                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                        },
                    ],
                });

                // Lấy dữ liệu cho biểu đồ tổng số đơn hàng
                const orderData = processData(orders, view, "orders");
                setOrderChartData({
                    labels: orderData.labels,
                    datasets: [
                        {
                            label: "Total Orders",
                            data: orderData.data,
                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                        },
                    ],
                });
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchData();
    }, [view]);


    // Hàm chung để xử lý dữ liệu
    const processData = (orders, groupBy, type) => {
        const groupedData = orders.reduce((acc, order) => {
            let key;
            const date = new Date(order.orderDate);

            if (groupBy === "day") {
                key = date.toISOString().split("T")[0]; // YYYY-MM-DD
            } else if (groupBy === "week") {
                const year = date.getFullYear();
                key = `${year}-W${Math.ceil(
                    (date.getDate() + new Date(year, date.getMonth(), 1).getDay()) / 7
                )}`; // Tính tuần
            } else if (groupBy === "month") {
                key = `${date.getFullYear()}-${String(
                    date.getMonth() + 1
                ).padStart(2, "0")}`; // YYYY-MM
            }

            // Nhóm dữ liệu dựa trên type (Revenue hoặc Order Count)
            if (type === "revenue") {
                acc[key] = (acc[key] || 0) + order.totalCost; // Tổng doanh thu
            } else if (type === "orders") {
                acc[key] = (acc[key] || 0) + 1; // Tổng số đơn hàng
            }

            return acc;
        }, {});

        return {
            labels: Object.keys(groupedData),
            data: Object.values(groupedData),
        };
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Lấy danh sách đơn hàng
                const ordersResponse = await axios.get(
                    "https://t2305mpk320241031161932.azurewebsites.net/api/CustOrder"
                );
                const orders = ordersResponse.data;

                let allVariants = [];
                for (const order of orders) {
                    if (!order.orderId) continue;

                    try {
                        const orderDetailsResponse = await axios.get(
                            `https://t2305mpk320241031161932.azurewebsites.net/api/CustOrderDetail/by-order/${order.orderId}`
                        );
                        const orderDetails = orderDetailsResponse.data;

                        allVariants = allVariants.concat(
                            orderDetails.map((detail) => detail.variantId)
                        );
                    } catch (error) {
                        if (error.response && error.response.status === 404) {
                            console.warn(`No details found for orderId ${order.orderId}`);
                        } else {
                            console.error(
                                `Error fetching details for orderId ${order.orderId}:`,
                                error
                            );
                        }
                        continue;
                    }
                }

                const variantCount = allVariants.reduce((acc, variantId) => {
                    acc[variantId] = (acc[variantId] || 0) + 1;
                    return acc;
                }, {});

                const mostOrderedVariantId = Object.keys(variantCount).reduce((a, b) =>
                    variantCount[a] > variantCount[b] ? a : b
                );

                // Lấy `menuItemNo` từ API `ItemVariants`
                const variantResponse = await axios.get(
                    `https://t2305mpk320241031161932.azurewebsites.net/api/ItemVariants/${mostOrderedVariantId}`
                );
                const { menuItemNo } = variantResponse.data;

                // Lấy danh sách món ăn từ API `MenuItem/with-variants`
                const menuItemsResponse = await axios.get(
                    "https://t2305mpk320241031161932.azurewebsites.net/api/MenuItem/with-variants"
                );
                const menuItems = menuItemsResponse.data;

                // Tìm món ăn tương ứng với `menuItemNo`
                const menuItem = menuItems.find((item) => item.menuItemNo === menuItemNo);

                if (menuItem) {
                    setMostOrderedItem({
                        name: menuItem.itemName,
                        count: variantCount[mostOrderedVariantId],
                        imageURL: menuItem.imageURL,
                    });
                } else {
                    throw new Error("Menu item not found.");
                }
            } catch (error) {
                console.error("Error fetching most ordered item with image:", error);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return (
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">

                    <div className="layout-page">
                        {/* Navbar */}
                        <nav className="navbar navbar-expand-lg " style={{ lineHeight: '35px' }}>
                            <div className="container-fluid">
                                {/* Logo hoặc tên Navbar */}
                                <a className="navbar-brand" href="#"></a>

                                {/* Menu chính */}
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav ms-auto">
                                        {/* Dropdown thông báo */}
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                onClick={toggleNotificationDropdown}
                                                onBlur={closeDropdowns}
                                            >
                                                <i className="bx bx-bell bx-md"></i>
                                                <span className="badge rounded-pill bg-danger badge-dot">3</span>
                                            </a>
                                            <ul
                                                className={`dropdown-menu dropdown-menu-end ${isNotificationDropdownOpen ? 'show' : ''}`}
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <li><a className="dropdown-item" href="#">New message from John</a></li>
                                                <li><a className="dropdown-item" href="#">Server downtime alert</a></li>
                                                <li><a className="dropdown-item" href="#">Profile update request</a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">View all notifications</a></li>
                                            </ul>
                                        </li>

                                        {/* Dropdown cho avatar người dùng */}
                                        <li className="nav-item dropdown">
                                            <a
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                onClick={toggleUserDropdown}
                                                onBlur={closeDropdowns}
                                            >
                                                <img style={{ width: '20%' }}
                                                    src="../assets/img/avatars/1.png"
                                                    alt="User Avatar"
                                                    className="rounded-circle"
                                                />
                                            </a>

                                            {/* Menu dropdown người dùng */}
                                            <ul
                                                className={`dropdown-menu dropdown-menu-end ${isUserDropdownOpen ? 'show' : ''}`}
                                                aria-labelledby="navbarDropdown"
                                            >
                                                <li><a className="dropdown-item" href="#">My Profile</a></li>
                                                <li><a className="dropdown-item" href="#">Settings</a></li>
                                                <li><a className="dropdown-item" href="#">Billing Plan <span className="badge bg-danger ms-2">4</span></a></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><a className="dropdown-item" href="#">Log Out</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {/* / Navbar */}
                        {/* Content wrapper */}
                        <div className="content-wrapper">
                            {/* Content */}
                            <div className="container-xxl flex-grow-1 container-p-y">
                                <div className="row">
                                    <div className="col-md-12 col-xxl-4 mb-6">
                                        <div className="card h-100">
                                            <div className="d-flex align-items-end row">
                                                <div className="col-7">
                                                    <div className="card-body">
                                                        <h5 className="card-title mb-1 text-nowrap">
                                                            Congratulations Katie! 🎉
                                                        </h5>
                                                        <p className="card-subtitle text-nowrap mb-3">
                                                            Best seller of the month
                                                        </p>
                                                        <h5 className="card-title text-primary mb-0">$48.9k</h5>
                                                        <p className="mb-3">78% of target 🚀</p>

                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <div className="card-body pb-0 text-end">

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* New Visitors & Activity */}
                                    <div className="col-xxl-8 mb-6">
                                        <div className="card h-100">
                                            <div className="card-body row g-4 p-0">
                                                <div className="col-md-6 card-separator">
                                                    <div className="p-6">
                                                        <div className="card-title d-flex align-items-start justify-content-between">


                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <div>
                                                                <h2>Total Money Chart</h2>

                                                                {/* Chọn chế độ hiển thị */}
                                                                <div>
                                                                    <button style={{
                                                                        margin: '5px',
                                                                        backgroundColor: '#03c3ec',
                                                                        border: '1px solid white',
                                                                        borderRadius: '20px'
                                                                    }} onClick={() => setView("day")}> Day</button>
                                                                    <button style={{
                                                                        margin: '5px',
                                                                        backgroundColor: '#6265ef',
                                                                        border: '1px solid white',
                                                                        borderRadius: '20px'
                                                                    }} onClick={() => setView("week")}>Week</button>
                                                                    <button style={{
                                                                        margin: '5px',
                                                                        backgroundColor: 'rgb(194 163 255)',
                                                                        border: '1px solid white',
                                                                        borderRadius: '20px'
                                                                    }} onClick={() => setView("month")}>Month</button>
                                                                </div>

                                                                {/* Hiển thị biểu đồ */}
                                                                {chartData ? (
                                                                    <Bar
                                                                        data={chartData}
                                                                        options={{
                                                                            responsive: true,
                                                                            plugins: {
                                                                                legend: {
                                                                                    display: true,
                                                                                    position: "top",
                                                                                },
                                                                            },
                                                                            scales: {
                                                                                x: {
                                                                                    title: {
                                                                                        display: true,
                                                                                        text: view === "day" ? "Days" : view === "week" ? "Weeks" : "Months",
                                                                                    },
                                                                                },
                                                                                y: {
                                                                                    title: {
                                                                                        display: true,
                                                                                        text: "Revenue",
                                                                                    },
                                                                                    ticks: {
                                                                                        callback: (value) => `$${value}`, // Hiển thị giá trị tiền tệ
                                                                                    },
                                                                                },
                                                                            },
                                                                        }}
                                                                    />
                                                                ) : (
                                                                    <p>Loading chart...</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="p-6">
                                                        <div className="card-title d-flex align-items-start justify-content-between">

                                                        </div>
                                                        <div
                                                            className="d-flex justify-content-between"
                                                            style={{ position: "relative" }}
                                                        >

                                                            <div id="activityChart" style={{ minHeight: 120 }}>
                                                                <div
                                                                    id="apexcharts90pj98cf"
                                                                    className="apexcharts-canvas apexcharts90pj98cf apexcharts-theme-light"
                                                                    style={{ width: 300, height: 300 }}
                                                                >
                                                                    <h3>Total Order</h3>

                                                                    <div>
                                                                        <div>
                                                                            <button style={{
                                                                                margin: '5px',
                                                                                backgroundColor: '#03c3ec',
                                                                                border: '1px solid white',
                                                                                borderRadius: '20px'
                                                                            }} onClick={() => setView("day")}> Day</button>
                                                                            <button style={{
                                                                                margin: '5px',
                                                                                backgroundColor: '#6265ef',
                                                                                border: '1px solid white',
                                                                                borderRadius: '20px'
                                                                            }} onClick={() => setView("week")}>Week</button>
                                                                            <button style={{
                                                                                margin: '5px',
                                                                                backgroundColor: 'rgb(194 163 255)',
                                                                                border: '1px solid white',
                                                                                borderRadius: '20px'
                                                                            }} onClick={() => setView("month")}>Month</button>
                                                                        </div>


                                                                        {orderChartData ? (
                                                                            <Bar
                                                                                data={orderChartData}
                                                                                options={{
                                                                                    responsive: true,
                                                                                    plugins: {
                                                                                        legend: { display: true, position: "top" },
                                                                                    },
                                                                                    scales: {
                                                                                        x: { title: { display: true, text: "Time" } },
                                                                                        y: { title: { display: true, text: "Total Orders" } },
                                                                                    },
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <p>Loading orders chart...</p>
                                                                        )}
                                                                    </div>



                                                                </div>
                                                            </div>
                                                            <div className="resize-triggers">
                                                                <div className="expand-trigger">
                                                                    <div style={{ width: 328, height: 121 }} />
                                                                </div>
                                                                <div className="contract-trigger" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/ New Visitors & Activity */}
                                    <div className="col-lg-12 col-xxl-4">
                                        <div className="row">
                                            <div className="col-xxl-6 col-md-3 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="avatar flex-shrink-0">
                                                                <img
                                                                    src="../../assets/img/icons/unicons/wallet-info.png"
                                                                    alt="wallet info"
                                                                    className="rounded"
                                                                />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt6"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bx bx-dots-vertical-rounded text-muted" />
                                                                </button>
                                                                <div
                                                                    className="dropdown-menu dropdown-menu-end"
                                                                    aria-labelledby="cardOpt6"
                                                                >
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        View More
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Sales</p>
                                                        <h4 className="card-title mb-3">$4,679</h4>
                                                        <small className="text-success fw-medium">
                                                            <i className="bx bx-up-arrow-alt" /> +28.42%
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-3 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div
                                                        className="card-body pb-2"
                                                        style={{ position: "relative" }}
                                                    >
                                                        <span className="d-block fw-medium mb-1">Profit</span>
                                                        <h4 className="card-title mb-4">624k</h4>
                                                        <div id="profitChart" style={{ minHeight: 95 }}>
                                                            <div
                                                                id="apexcharts2ldv22il"
                                                                className="apexcharts-canvas apexcharts2ldv22il apexcharts-theme-light"
                                                                style={{ width: 124, height: 80 }}
                                                            >
                                                                <svg
                                                                    id="SvgjsSvg2236"
                                                                    width={124}
                                                                    height={80}
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    version="1.1"
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"

                                                                    className="apexcharts-svg"
                                                                    xmlns-data="ApexChartsNS"
                                                                    transform="translate(0, 0)"
                                                                    style={{ background: "transparent" }}
                                                                >
                                                                    <g
                                                                        id="SvgjsG2238"
                                                                        className="apexcharts-inner apexcharts-graphical"
                                                                        transform="translate(0, 0)"
                                                                    >
                                                                        <defs id="SvgjsDefs2237">
                                                                            <linearGradient
                                                                                id="SvgjsLinearGradient2241"
                                                                                x1={0}
                                                                                y1={0}
                                                                                x2={0}
                                                                                y2={1}
                                                                            >
                                                                                <stop
                                                                                    id="SvgjsStop2242"
                                                                                    stopOpacity="0.4"
                                                                                    stopColor="rgba(216,227,240,0.4)"
                                                                                    offset={0}
                                                                                />
                                                                                <stop
                                                                                    id="SvgjsStop2243"
                                                                                    stopOpacity="0.5"
                                                                                    stopColor="rgba(190,209,230,0.5)"
                                                                                    offset={1}
                                                                                />
                                                                                <stop
                                                                                    id="SvgjsStop2244"
                                                                                    stopOpacity="0.5"
                                                                                    stopColor="rgba(190,209,230,0.5)"
                                                                                    offset={1}
                                                                                />
                                                                            </linearGradient>
                                                                            <clipPath id="gridRectMask2ldv22il">
                                                                                <rect
                                                                                    id="SvgjsRect2246"
                                                                                    width={133}
                                                                                    height="58.70079907417298"
                                                                                    x="-4.5"
                                                                                    y="-2.5"
                                                                                    rx={0}
                                                                                    ry={0}
                                                                                    opacity={1}
                                                                                    strokeWidth={0}
                                                                                    stroke="none"
                                                                                    strokeDasharray={0}
                                                                                    fill="#fff"
                                                                                />
                                                                            </clipPath>
                                                                            <clipPath id="forecastMask2ldv22il" />
                                                                            <clipPath id="nonForecastMask2ldv22il" />
                                                                            <clipPath id="gridRectMarkerMask2ldv22il">
                                                                                <rect
                                                                                    id="SvgjsRect2247"
                                                                                    width={128}
                                                                                    height="57.70079907417298"
                                                                                    x={-2}
                                                                                    y={-2}
                                                                                    rx={0}
                                                                                    ry={0}
                                                                                    opacity={1}
                                                                                    strokeWidth={0}
                                                                                    stroke="none"
                                                                                    strokeDasharray={0}
                                                                                    fill="#fff"
                                                                                />
                                                                            </clipPath>
                                                                        </defs>
                                                                        <rect
                                                                            id="SvgjsRect2245"
                                                                            width="10.075"
                                                                            height="53.70079907417298"
                                                                            x={0}
                                                                            y={0}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            strokeDasharray={3}
                                                                            fill="url(#SvgjsLinearGradient2241)"
                                                                            className="apexcharts-xcrosshairs"
                                                                            y2="53.70079907417298"
                                                                            filter="none"
                                                                            fillOpacity="0.9"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2271"
                                                                            className="apexcharts-xaxis"
                                                                            transform="translate(0, 0)"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2272"
                                                                                className="apexcharts-xaxis-texts-g"
                                                                                transform="translate(0, -4)"
                                                                            >
                                                                                <text
                                                                                    id="SvgjsText2274"
                                                                                    fontFamily="Helvetica, Arial, sans-serif"
                                                                                    x="15.5"
                                                                                    y="82.70079907417298"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{
                                                                                        fontFamily: "Helvetica, Arial, sans-serif"
                                                                                    }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2275">Jan</tspan>
                                                                                    <title>Jan</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2277"
                                                                                    fontFamily="Helvetica, Arial, sans-serif"
                                                                                    x="46.5"
                                                                                    y="82.70079907417298"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{
                                                                                        fontFamily: "Helvetica, Arial, sans-serif"
                                                                                    }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2278">Apr</tspan>
                                                                                    <title>Apr</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2280"
                                                                                    fontFamily="Helvetica, Arial, sans-serif"
                                                                                    x="77.5"
                                                                                    y="82.70079907417298"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{
                                                                                        fontFamily: "Helvetica, Arial, sans-serif"
                                                                                    }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2281">Jul</tspan>
                                                                                    <title>Jul</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2283"
                                                                                    fontFamily="Helvetica, Arial, sans-serif"
                                                                                    x="108.5"
                                                                                    y="82.70079907417298"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{
                                                                                        fontFamily: "Helvetica, Arial, sans-serif"
                                                                                    }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2284">Oct</tspan>
                                                                                    <title>Oct</title>
                                                                                </text>
                                                                            </g>
                                                                        </g>
                                                                        <g id="SvgjsG2287" className="apexcharts-grid">
                                                                            <g
                                                                                id="SvgjsG2288"
                                                                                className="apexcharts-gridlines-horizontal"
                                                                                style={{ display: "none" }}
                                                                            >
                                                                                <line
                                                                                    id="SvgjsLine2290"
                                                                                    x1={0}
                                                                                    y1={0}
                                                                                    x2={124}
                                                                                    y2={0}
                                                                                    stroke="#e0e0e0"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2291"
                                                                                    x1={0}
                                                                                    y1="13.425199768543244"
                                                                                    x2={124}
                                                                                    y2="13.425199768543244"
                                                                                    stroke="#e0e0e0"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2292"
                                                                                    x1={0}
                                                                                    y1="26.85039953708649"
                                                                                    x2={124}
                                                                                    y2="26.85039953708649"
                                                                                    stroke="#e0e0e0"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2293"
                                                                                    x1={0}
                                                                                    y1="40.27559930562973"
                                                                                    x2={124}
                                                                                    y2="40.27559930562973"
                                                                                    stroke="#e0e0e0"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2294"
                                                                                    x1={0}
                                                                                    y1="53.70079907417298"
                                                                                    x2={124}
                                                                                    y2="53.70079907417298"
                                                                                    stroke="#e0e0e0"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2289"
                                                                                className="apexcharts-gridlines-vertical"
                                                                                style={{ display: "none" }}
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2296"
                                                                                x1={0}
                                                                                y1="53.70079907417298"
                                                                                x2={124}
                                                                                y2="53.70079907417298"
                                                                                stroke="transparent"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2295"
                                                                                x1={0}
                                                                                y1={1}
                                                                                x2={0}
                                                                                y2="53.70079907417298"
                                                                                stroke="transparent"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                            />
                                                                        </g>
                                                                        <g
                                                                            id="SvgjsG2248"
                                                                            className="apexcharts-bar-series apexcharts-plot-series"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2249"
                                                                                className="apexcharts-series"
                                                                                rel={1}
                                                                                seriesname="seriesx1"
                                                                                data-realindex={0}
                                                                            >
                                                                                <path
                                                                                    id="SvgjsPath2253"
                                                                                    d="M 5.425000000000001 50.70079907417298L 5.425000000000001 17.767719745397564Q 5.425000000000001 14.767719745397564 8.425 14.767719745397564L 7.5 14.767719745397564Q 10.5 14.767719745397564 10.5 17.767719745397564L 10.5 17.767719745397564L 10.5 50.70079907417298Q 10.5 53.70079907417298 7.5 53.70079907417298L 8.425 53.70079907417298Q 5.425000000000001 53.70079907417298 5.425000000000001 50.70079907417298z"
                                                                                    fill="rgba(113,221,55,0.85)"
                                                                                    fillOpacity={1}
                                                                                    stroke="#"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 5.425000000000001 50.70079907417298L 5.425000000000001 17.767719745397564Q 5.425000000000001 14.767719745397564 8.425 14.767719745397564L 7.5 14.767719745397564Q 10.5 14.767719745397564 10.5 17.767719745397564L 10.5 17.767719745397564L 10.5 50.70079907417298Q 10.5 53.70079907417298 7.5 53.70079907417298L 8.425 53.70079907417298Q 5.425000000000001 53.70079907417298 5.425000000000001 50.70079907417298z"
                                                                                    pathfrom="M 5.425000000000001 50.70079907417298L 5.425000000000001 50.70079907417298L 10.5 50.70079907417298L 10.5 50.70079907417298L 10.5 50.70079907417298L 10.5 50.70079907417298L 10.5 50.70079907417298L 5.425000000000001 50.70079907417298"
                                                                                    cy="14.767719745397564"
                                                                                    cx="33.925"
                                                                                    j={0}
                                                                                    val={58}
                                                                                    barheight="38.93307932877541"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2255"
                                                                                    d="M 36.425 50.70079907417298L 36.425 37.905519398212434Q 36.425 34.905519398212434 39.425 34.905519398212434L 38.5 34.905519398212434Q 41.5 34.905519398212434 41.5 37.905519398212434L 41.5 37.905519398212434L 41.5 50.70079907417298Q 41.5 53.70079907417298 38.5 53.70079907417298L 39.425 53.70079907417298Q 36.425 53.70079907417298 36.425 50.70079907417298z"
                                                                                    fill="rgba(113,221,55,0.85)"
                                                                                    fillOpacity={1}
                                                                                    stroke="#"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 36.425 50.70079907417298L 36.425 37.905519398212434Q 36.425 34.905519398212434 39.425 34.905519398212434L 38.5 34.905519398212434Q 41.5 34.905519398212434 41.5 37.905519398212434L 41.5 37.905519398212434L 41.5 50.70079907417298Q 41.5 53.70079907417298 38.5 53.70079907417298L 39.425 53.70079907417298Q 36.425 53.70079907417298 36.425 50.70079907417298z"
                                                                                    pathfrom="M 36.425 50.70079907417298L 36.425 50.70079907417298L 41.5 50.70079907417298L 41.5 50.70079907417298L 41.5 50.70079907417298L 41.5 50.70079907417298L 41.5 50.70079907417298L 36.425 50.70079907417298"
                                                                                    cy="34.905519398212434"
                                                                                    cx="64.925"
                                                                                    j={1}
                                                                                    val={28}
                                                                                    barheight="18.795279675960543"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2257"
                                                                                    d="M 67.425 50.70079907417298L 67.425 23.137799652814863Q 67.425 20.137799652814863 70.425 20.137799652814863L 69.5 20.137799652814863Q 72.5 20.137799652814863 72.5 23.137799652814863L 72.5 23.137799652814863L 72.5 50.70079907417298Q 72.5 53.70079907417298 69.5 53.70079907417298L 70.425 53.70079907417298Q 67.425 53.70079907417298 67.425 50.70079907417298z"
                                                                                    fill="rgba(113,221,55,0.85)"
                                                                                    fillOpacity={1}
                                                                                    stroke="#"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 67.425 50.70079907417298L 67.425 23.137799652814863Q 67.425 20.137799652814863 70.425 20.137799652814863L 69.5 20.137799652814863Q 72.5 20.137799652814863 72.5 23.137799652814863L 72.5 23.137799652814863L 72.5 50.70079907417298Q 72.5 53.70079907417298 69.5 53.70079907417298L 70.425 53.70079907417298Q 67.425 53.70079907417298 67.425 50.70079907417298z"
                                                                                    pathfrom="M 67.425 50.70079907417298L 67.425 50.70079907417298L 72.5 50.70079907417298L 72.5 50.70079907417298L 72.5 50.70079907417298L 72.5 50.70079907417298L 72.5 50.70079907417298L 67.425 50.70079907417298"
                                                                                    cy="20.137799652814863"
                                                                                    cx="95.925"
                                                                                    j={2}
                                                                                    val={50}
                                                                                    barheight="33.562999421358114"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2259"
                                                                                    d="M 98.425 50.70079907417298L 98.425 3Q 98.425 0 101.425 0L 100.5 0Q 103.5 0 103.5 3L 103.5 3L 103.5 50.70079907417298Q 103.5 53.70079907417298 100.5 53.70079907417298L 101.425 53.70079907417298Q 98.425 53.70079907417298 98.425 50.70079907417298z"
                                                                                    fill="rgba(113,221,55,0.85)"
                                                                                    fillOpacity={1}
                                                                                    stroke="#"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 98.425 50.70079907417298L 98.425 3Q 98.425 0 101.425 0L 100.5 0Q 103.5 0 103.5 3L 103.5 3L 103.5 50.70079907417298Q 103.5 53.70079907417298 100.5 53.70079907417298L 101.425 53.70079907417298Q 98.425 53.70079907417298 98.425 50.70079907417298z"
                                                                                    pathfrom="M 98.425 50.70079907417298L 98.425 50.70079907417298L 103.5 50.70079907417298L 103.5 50.70079907417298L 103.5 50.70079907417298L 103.5 50.70079907417298L 103.5 50.70079907417298L 98.425 50.70079907417298"
                                                                                    cy={0}
                                                                                    cx="126.92500000000001"
                                                                                    j={3}
                                                                                    val={80}
                                                                                    barheight="53.70079907417298"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <g
                                                                                    id="SvgjsG2251"
                                                                                    className="apexcharts-bar-goals-markers"
                                                                                    style={{ pointerEvents: "none" }}
                                                                                >
                                                                                    <g
                                                                                        id="SvgjsG2252"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2254"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2256"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2258"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2260"
                                                                                className="apexcharts-series"
                                                                                rel={2}
                                                                                seriesname="seriesx2"
                                                                                data-realindex={1}
                                                                            >
                                                                                <path
                                                                                    id="SvgjsPath2264"
                                                                                    d="M 15.5 50.70079907417298L 15.5 23.137799652814863Q 15.5 20.137799652814863 18.5 20.137799652814863L 17.575 20.137799652814863Q 20.575 20.137799652814863 20.575 23.137799652814863L 20.575 23.137799652814863L 20.575 50.70079907417298Q 20.575 53.70079907417298 17.575 53.70079907417298L 18.5 53.70079907417298Q 15.5 53.70079907417298 15.5 50.70079907417298z"
                                                                                    fill="#71dd3729"
                                                                                    fillOpacity={1}
                                                                                    stroke="a"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={1}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 15.5 50.70079907417298L 15.5 23.137799652814863Q 15.5 20.137799652814863 18.5 20.137799652814863L 17.575 20.137799652814863Q 20.575 20.137799652814863 20.575 23.137799652814863L 20.575 23.137799652814863L 20.575 50.70079907417298Q 20.575 53.70079907417298 17.575 53.70079907417298L 18.5 53.70079907417298Q 15.5 53.70079907417298 15.5 50.70079907417298z"
                                                                                    pathfrom="M 15.5 50.70079907417298L 15.5 50.70079907417298L 20.575 50.70079907417298L 20.575 50.70079907417298L 20.575 50.70079907417298L 20.575 50.70079907417298L 20.575 50.70079907417298L 15.5 50.70079907417298"
                                                                                    cy="17.137799652814863"
                                                                                    cx={44}
                                                                                    j={0}
                                                                                    val={50}
                                                                                    barheight="33.562999421358114"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2266"
                                                                                    d="M 46.5 50.70079907417298L 46.5 41.933079328775406Q 46.5 38.933079328775406 49.5 38.933079328775406L 48.575 38.933079328775406Q 51.575 38.933079328775406 51.575 41.933079328775406L 51.575 41.933079328775406L 51.575 50.70079907417298Q 51.575 53.70079907417298 48.575 53.70079907417298L 49.5 53.70079907417298Q 46.5 53.70079907417298 46.5 50.70079907417298z"
                                                                                    fill="#71dd3729"
                                                                                    fillOpacity={1}
                                                                                    stroke="a"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={1}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 46.5 50.70079907417298L 46.5 41.933079328775406Q 46.5 38.933079328775406 49.5 38.933079328775406L 48.575 38.933079328775406Q 51.575 38.933079328775406 51.575 41.933079328775406L 51.575 41.933079328775406L 51.575 50.70079907417298Q 51.575 53.70079907417298 48.575 53.70079907417298L 49.5 53.70079907417298Q 46.5 53.70079907417298 46.5 50.70079907417298z"
                                                                                    pathfrom="M 46.5 50.70079907417298L 46.5 50.70079907417298L 51.575 50.70079907417298L 51.575 50.70079907417298L 51.575 50.70079907417298L 51.575 50.70079907417298L 51.575 50.70079907417298L 46.5 50.70079907417298"
                                                                                    cy="35.933079328775406"
                                                                                    cx={75}
                                                                                    j={1}
                                                                                    val={22}
                                                                                    barheight="14.767719745397569"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2268"
                                                                                    d="M 77.5 50.70079907417298L 77.5 13.068899826407431Q 77.5 10.068899826407431 80.5 10.068899826407431L 79.575 10.068899826407431Q 82.575 10.068899826407431 82.575 13.068899826407431L 82.575 13.068899826407431L 82.575 50.70079907417298Q 82.575 53.70079907417298 79.575 53.70079907417298L 80.5 53.70079907417298Q 77.5 53.70079907417298 77.5 50.70079907417298z"
                                                                                    fill="#71dd3729"
                                                                                    fillOpacity={1}
                                                                                    stroke="a"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={1}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 77.5 50.70079907417298L 77.5 13.068899826407431Q 77.5 10.068899826407431 80.5 10.068899826407431L 79.575 10.068899826407431Q 82.575 10.068899826407431 82.575 13.068899826407431L 82.575 13.068899826407431L 82.575 50.70079907417298Q 82.575 53.70079907417298 79.575 53.70079907417298L 80.5 53.70079907417298Q 77.5 53.70079907417298 77.5 50.70079907417298z"
                                                                                    pathfrom="M 77.5 50.70079907417298L 77.5 50.70079907417298L 82.575 50.70079907417298L 82.575 50.70079907417298L 82.575 50.70079907417298L 82.575 50.70079907417298L 82.575 50.70079907417298L 77.5 50.70079907417298"
                                                                                    cy="7.068899826407431"
                                                                                    cx={106}
                                                                                    j={2}
                                                                                    val={65}
                                                                                    barheight="43.631899247765546"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2270"
                                                                                    d="M 108.5 50.70079907417298L 108.5 8.370079907417292Q 108.5 5.370079907417292 111.5 5.370079907417292L 110.575 5.370079907417292Q 113.575 5.370079907417292 113.575 8.370079907417292L 113.575 8.370079907417292L 113.575 50.70079907417298Q 113.575 53.70079907417298 110.575 53.70079907417298L 111.5 53.70079907417298Q 108.5 53.70079907417298 108.5 50.70079907417298z"
                                                                                    fill="#71dd3729"
                                                                                    fillOpacity={1}
                                                                                    stroke="a"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="round"
                                                                                    strokeWidth={5}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-bar-area"
                                                                                    index={1}
                                                                                    clipPath="url(#gridRectMask2ldv22il)"
                                                                                    pathto="M 108.5 50.70079907417298L 108.5 8.370079907417292Q 108.5 5.370079907417292 111.5 5.370079907417292L 110.575 5.370079907417292Q 113.575 5.370079907417292 113.575 8.370079907417292L 113.575 8.370079907417292L 113.575 50.70079907417298Q 113.575 53.70079907417298 110.575 53.70079907417298L 111.5 53.70079907417298Q 108.5 53.70079907417298 108.5 50.70079907417298z"
                                                                                    pathfrom="M 108.5 50.70079907417298L 108.5 50.70079907417298L 113.575 50.70079907417298L 113.575 50.70079907417298L 113.575 50.70079907417298L 113.575 50.70079907417298L 113.575 50.70079907417298L 108.5 50.70079907417298"
                                                                                    cy="2.370079907417292"
                                                                                    cx={137}
                                                                                    j={3}
                                                                                    val={72}
                                                                                    barheight="48.330719166755685"
                                                                                    barwidth="10.075"
                                                                                />
                                                                                <g
                                                                                    id="SvgjsG2262"
                                                                                    className="apexcharts-bar-goals-markers"
                                                                                    style={{ pointerEvents: "none" }}
                                                                                >
                                                                                    <g
                                                                                        id="SvgjsG2263"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2265"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2267"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                    <g
                                                                                        id="SvgjsG2269"
                                                                                        classname="apexcharts-bar-goals-groups"
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2250"
                                                                                className="apexcharts-datalabels"
                                                                                data-realindex={0}
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2261"
                                                                                className="apexcharts-datalabels"
                                                                                data-realindex={1}
                                                                            />
                                                                        </g>
                                                                        <line
                                                                            id="SvgjsLine2297"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2={124}
                                                                            y2={0}
                                                                            stroke="#b6b6b6"
                                                                            strokeDasharray={0}
                                                                            strokeWidth={1}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-ycrosshairs"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2298"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2={124}
                                                                            y2={0}
                                                                            strokeDasharray={0}
                                                                            strokeWidth={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-ycrosshairs-hidden"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2299"
                                                                            className="apexcharts-yaxis-annotations"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2300"
                                                                            className="apexcharts-xaxis-annotations"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2301"
                                                                            className="apexcharts-point-annotations"
                                                                        />
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2285"
                                                                        className="apexcharts-yaxis"
                                                                        rel={0}
                                                                        transform="translate(-8, 0)"
                                                                    >
                                                                        <g
                                                                            id="SvgjsG2286"
                                                                            className="apexcharts-yaxis-texts-g"
                                                                        />
                                                                    </g>
                                                                    <g id="SvgjsG2239" className="apexcharts-annotations" />
                                                                </svg>
                                                                <div
                                                                    className="apexcharts-legend"
                                                                    style={{ maxHeight: 40 }}
                                                                />
                                                                <div className="apexcharts-tooltip apexcharts-theme-light">
                                                                    <div
                                                                        className="apexcharts-tooltip-title"
                                                                        style={{
                                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                                            fontSize: 12
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className="apexcharts-tooltip-series-group"
                                                                        style={{ order: 1 }}
                                                                    >
                                                                        <span
                                                                            className="apexcharts-tooltip-marker"
                                                                            style={{ backgroundColor: "rgb(113, 221, 55)" }}
                                                                        />
                                                                        <div
                                                                            className="apexcharts-tooltip-text"
                                                                            style={{
                                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                                fontSize: 12
                                                                            }}
                                                                        >
                                                                            <div className="apexcharts-tooltip-y-group">
                                                                                <span className="apexcharts-tooltip-text-y-label" />
                                                                                <span className="apexcharts-tooltip-text-y-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-goals-group">
                                                                                <span className="apexcharts-tooltip-text-goals-label" />
                                                                                <span className="apexcharts-tooltip-text-goals-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-z-group">
                                                                                <span className="apexcharts-tooltip-text-z-label" />
                                                                                <span className="apexcharts-tooltip-text-z-value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="apexcharts-tooltip-series-group"
                                                                        style={{ order: 2 }}
                                                                    >
                                                                        <span
                                                                            className="apexcharts-tooltip-marker"
                                                                            style={{
                                                                                backgroundColor: "rgba(113, 221, 55, 0.16)"
                                                                            }}
                                                                        />
                                                                        <div
                                                                            className="apexcharts-tooltip-text"
                                                                            style={{
                                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                                fontSize: 12
                                                                            }}
                                                                        >
                                                                            <div className="apexcharts-tooltip-y-group">
                                                                                <span className="apexcharts-tooltip-text-y-label" />
                                                                                <span className="apexcharts-tooltip-text-y-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-goals-group">
                                                                                <span className="apexcharts-tooltip-text-goals-label" />
                                                                                <span className="apexcharts-tooltip-text-goals-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-z-group">
                                                                                <span className="apexcharts-tooltip-text-z-label" />
                                                                                <span className="apexcharts-tooltip-text-z-value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                                    <div className="apexcharts-yaxistooltip-text" />
                                                                </div>
                                                                <div
                                                                    className="apexcharts-toolbar"
                                                                    style={{ top: 0, right: 3 }}
                                                                >
                                                                    <div className="apexcharts-menu">
                                                                        <div
                                                                            className="apexcharts-menu-item exportSVG"
                                                                            title="Download SVG"
                                                                        >
                                                                            Download SVG
                                                                        </div>
                                                                        <div
                                                                            className="apexcharts-menu-item exportPNG"
                                                                            title="Download PNG"
                                                                        >
                                                                            Download PNG
                                                                        </div>
                                                                        <div
                                                                            className="apexcharts-menu-item exportCSV"
                                                                            title="Download CSV"
                                                                        >
                                                                            Download CSV
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="resize-triggers">
                                                            <div className="expand-trigger">
                                                                <div style={{ width: 173, height: 207 }} />
                                                            </div>
                                                            <div className="contract-trigger" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-3 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body pb-0">
                                                        <span className="d-block fw-medium mb-1">Expenses</span>
                                                    </div>
                                                    <div
                                                        id="expensesChart"
                                                        className="mb-2"
                                                        style={{ minHeight: "68.5px" }}
                                                    >
                                                        <div
                                                            id="apexchartsccljjq8ij"
                                                            className="apexcharts-canvas apexchartsccljjq8ij apexcharts-theme-light"
                                                            style={{ width: 172, height: "68.5px" }}
                                                        >
                                                            <svg
                                                                id="SvgjsSvg2302"
                                                                width={172}
                                                                height="68.5"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                version="1.1"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"

                                                                className="apexcharts-svg"
                                                                xmlns-data="ApexChartsNS"
                                                                transform="translate(0, 0)"
                                                                style={{ background: "transparent" }}
                                                            >
                                                                <g
                                                                    id="SvgjsG2304"
                                                                    className="apexcharts-inner apexcharts-graphical"
                                                                    transform="translate(11, 0)"
                                                                >
                                                                    <defs id="SvgjsDefs2303">
                                                                        <clipPath id="gridRectMaskccljjq8ij">
                                                                            <rect
                                                                                id="SvgjsRect2306"
                                                                                width={156}
                                                                                height={127}
                                                                                x={-3}
                                                                                y={-1}
                                                                                rx={0}
                                                                                ry={0}
                                                                                opacity={1}
                                                                                strokeWidth={0}
                                                                                stroke="none"
                                                                                strokeDasharray={0}
                                                                                fill="#fff"
                                                                            />
                                                                        </clipPath>
                                                                        <clipPath id="forecastMaskccljjq8ij" />
                                                                        <clipPath id="nonForecastMaskccljjq8ij" />
                                                                        <clipPath id="gridRectMarkerMaskccljjq8ij">
                                                                            <rect
                                                                                id="SvgjsRect2307"
                                                                                width={154}
                                                                                height={129}
                                                                                x={-2}
                                                                                y={-2}
                                                                                rx={0}
                                                                                ry={0}
                                                                                opacity={1}
                                                                                strokeWidth={0}
                                                                                stroke="none"
                                                                                strokeDasharray={0}
                                                                                fill="#fff"
                                                                            />
                                                                        </clipPath>
                                                                    </defs>
                                                                    <g id="SvgjsG2308" className="apexcharts-radialbar">
                                                                        <g id="SvgjsG2309">
                                                                            <g id="SvgjsG2310" className="apexcharts-tracks">
                                                                                <g
                                                                                    id="SvgjsG2311"
                                                                                    className="apexcharts-radialbar-track apexcharts-track"
                                                                                    rel={1}
                                                                                >
                                                                                    <path
                                                                                        id="apexcharts-radialbarTrack-0"
                                                                                        d="M 32.10365853658536 62.49999999999999 A 42.89634146341464 42.89634146341464 0 0 1 117.89634146341464 62.5"
                                                                                        fill="none"
                                                                                        fillOpacity={1}
                                                                                        stroke="#8592a329"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth="8.457926829268295"
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-radialbar-area"
                                                                                        data-pathorig="M 32.10365853658536 62.49999999999999 A 42.89634146341464 42.89634146341464 0 0 1 117.89634146341464 62.5"
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                            <g id="SvgjsG2313">
                                                                                <g
                                                                                    id="SvgjsG2317"
                                                                                    className="apexcharts-series apexcharts-radial-series"
                                                                                    seriesname="Progress"
                                                                                    rel={1}
                                                                                    data-realindex={0}
                                                                                >
                                                                                    <path
                                                                                        id="SvgjsPath2318"
                                                                                        d="M 32.10365853658536 62.49999999999999 A 42.89634146341464 42.89634146341464 0 0 1 107.860504008183 34.92676320643412"
                                                                                        fill="none"
                                                                                        fillOpacity="0.85"
                                                                                        stroke="rgba(105,108,255,0.85)"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth="8.719512195121954"
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
                                                                                        data-angle={140}
                                                                                        data-value={78}
                                                                                        index={0}
                                                                                        j={0}
                                                                                        data-pathorig="M 32.10365853658536 62.49999999999999 A 42.89634146341464 42.89634146341464 0 0 1 107.860504008183 34.92676320643412"
                                                                                    />
                                                                                </g>
                                                                                <circle
                                                                                    id="SvgjsCircle2314"
                                                                                    r="33.66737804878049"
                                                                                    cx={75}
                                                                                    cy="62.5"
                                                                                    className="apexcharts-radialbar-hollow"
                                                                                    fill="transparent"
                                                                                />
                                                                                <g
                                                                                    id="SvgjsG2315"
                                                                                    className="apexcharts-datalabels-group"
                                                                                    transform="translate(0, 0) scale(1)"
                                                                                    style={{ opacity: 1 }}
                                                                                >
                                                                                    <text
                                                                                        id="SvgjsText2316"
                                                                                        fontFamily="Public Sans"
                                                                                        x={75}
                                                                                        y="57.5"
                                                                                        textAnchor="middle"
                                                                                        dominantBaseline="auto"
                                                                                        fontSize="18px"
                                                                                        fontWeight={500}
                                                                                        fill="#384551"
                                                                                        className="apexcharts-text apexcharts-datalabel-value"
                                                                                        style={{ fontFamily: '"Public Sans"' }}
                                                                                    >
                                                                                        78%
                                                                                    </text>
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <line
                                                                        id="SvgjsLine2319"
                                                                        x1={0}
                                                                        y1={0}
                                                                        x2={150}
                                                                        y2={0}
                                                                        stroke="#b6b6b6"
                                                                        strokeDasharray={0}
                                                                        strokeWidth={1}
                                                                        strokeLinecap="butt"
                                                                        className="apexcharts-ycrosshairs"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2320"
                                                                        x1={0}
                                                                        y1={0}
                                                                        x2={150}
                                                                        y2={0}
                                                                        strokeDasharray={0}
                                                                        strokeWidth={0}
                                                                        strokeLinecap="butt"
                                                                        className="apexcharts-ycrosshairs-hidden"
                                                                    />
                                                                </g>
                                                                <g id="SvgjsG2305" className="apexcharts-annotations" />
                                                            </svg>
                                                            <div className="apexcharts-legend" />
                                                        </div>
                                                    </div>
                                                    <div className="p-4 pt-2">
                                                        <small className="d-block text-center">
                                                            $21k Expenses more than last month
                                                        </small>
                                                    </div>
                                                    <div className="resize-triggers">
                                                        <div className="expand-trigger">
                                                            <div style={{ width: 173, height: 199 }} />
                                                        </div>
                                                        <div className="contract-trigger" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-6 col-md-3 col-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="avatar flex-shrink-0">
                                                                <img
                                                                    src="../../assets/img/icons/unicons/cc-primary.png"
                                                                    alt="Credit Card"
                                                                    className="rounded"
                                                                />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt1"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bx bx-dots-vertical-rounded text-muted" />
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="cardOpt1">
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        View More
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Transactions</p>
                                                        <h4 className="card-title mb-3">$14,857</h4>
                                                        <small className="text-success fw-medium">
                                                            <i className="bx bx-up-arrow-alt" /> +28.14%
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Total Income */}
                                    <div className="col-md-12 col-xxl-8 mb-6">
                                        <div className="card h-100">
                                            <div className="row row-bordered g-0">
                                                <div className="col-md-8">
                                                    <div className="card-header d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="card-title mb-1">Total Income</h5>
                                                            <p className="card-subtitle">Yearly report overview</p>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="totalIncome"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded bx-lg text-muted" />
                                                            </button>
                                                            <div
                                                                className="dropdown-menu dropdown-menu-end"
                                                                aria-labelledby="totalIncome"
                                                            >
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last 28 Days
                                                                </a>
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last Month
                                                                </a>
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last Year
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body" style={{ position: "relative" }}>
                                                        <div id="totalIncomeChart" style={{ minHeight: 305 }}>
                                                            <div
                                                                id="apexchartsmn3bxesaj"
                                                                className="apexcharts-canvas apexchartsmn3bxesaj apexcharts-theme-light"
                                                                style={{ width: 462, height: 290 }}
                                                            >
                                                                <svg
                                                                    id="SvgjsSvg2322"
                                                                    width={462}
                                                                    height={290}
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    version="1.1"
                                                                    xmlnsXlink="http://www.w3.org/1999/xlink"

                                                                    className="apexcharts-svg apexcharts-zoomable"
                                                                    xmlns-data="ApexChartsNS"
                                                                    transform="translate(0, 0)"
                                                                    style={{ background: "transparent" }}
                                                                >
                                                                    <g
                                                                        id="SvgjsG2324"
                                                                        className="apexcharts-inner apexcharts-graphical"
                                                                        transform="translate(38.96249961853027, 15)"
                                                                    >
                                                                        <defs id="SvgjsDefs2323">
                                                                            <clipPath id="gridRectMaskmn3bxesaj">
                                                                                <rect
                                                                                    id="SvgjsRect2330"
                                                                                    width="417.12841796875"
                                                                                    height="249.700799074173"
                                                                                    x="-3.5"
                                                                                    y="-1.5"
                                                                                    rx={0}
                                                                                    ry={0}
                                                                                    opacity={1}
                                                                                    strokeWidth={0}
                                                                                    stroke="none"
                                                                                    strokeDasharray={0}
                                                                                    fill="#fff"
                                                                                />
                                                                            </clipPath>
                                                                            <clipPath id="forecastMaskmn3bxesaj" />
                                                                            <clipPath id="nonForecastMaskmn3bxesaj" />
                                                                            <clipPath id="gridRectMarkerMaskmn3bxesaj">
                                                                                <rect
                                                                                    id="SvgjsRect2331"
                                                                                    width="414.12841796875"
                                                                                    height="250.700799074173"
                                                                                    x={-2}
                                                                                    y={-2}
                                                                                    rx={0}
                                                                                    ry={0}
                                                                                    opacity={1}
                                                                                    strokeWidth={0}
                                                                                    stroke="none"
                                                                                    strokeDasharray={0}
                                                                                    fill="#fff"
                                                                                />
                                                                            </clipPath>
                                                                            <linearGradient
                                                                                id="SvgjsLinearGradient2336"
                                                                                x1={0}
                                                                                y1={0}
                                                                                x2={0}
                                                                                y2={1}
                                                                            >
                                                                                <stop
                                                                                    id="SvgjsStop2337"
                                                                                    stopOpacity="0.7"
                                                                                    stopColor="rgba(105,108,255,0.7)"
                                                                                    offset={0}
                                                                                />
                                                                                <stop
                                                                                    id="SvgjsStop2338"
                                                                                    stopOpacity="0.25"
                                                                                    stopColor="rgba(225,226,255,0.25)"
                                                                                    offset="0.95"
                                                                                />
                                                                                <stop
                                                                                    id="SvgjsStop2339"
                                                                                    stopOpacity="0.25"
                                                                                    stopColor="rgba(225,226,255,0.25)"
                                                                                    offset={1}
                                                                                />
                                                                            </linearGradient>
                                                                            <filter
                                                                                id="SvgjsFilter2341"
                                                                                filterUnits="userSpaceOnUse"
                                                                                width="200%"
                                                                                height="200%"
                                                                                x="-50%"
                                                                                y="-50%"
                                                                            >
                                                                                <feFlood
                                                                                    id="SvgjsFeFlood2342"
                                                                                    floodColor="#696cff"
                                                                                    floodOpacity="0.15"
                                                                                    result="SvgjsFeFlood2342Out"
                                                                                    in="SourceGraphic"
                                                                                />
                                                                                <feComposite
                                                                                    id="SvgjsFeComposite2343"
                                                                                    in="SvgjsFeFlood2342Out"
                                                                                    in2="SourceAlpha"
                                                                                    operator="in"
                                                                                    result="SvgjsFeComposite2343Out"
                                                                                />
                                                                                <feOffset
                                                                                    id="SvgjsFeOffset2344"
                                                                                    dx={2}
                                                                                    dy={14}
                                                                                    result="SvgjsFeOffset2344Out"
                                                                                    in="SvgjsFeComposite2343Out"
                                                                                />
                                                                                <feGaussianBlur
                                                                                    id="SvgjsFeGaussianBlur2345"
                                                                                    stdDeviation={3}
                                                                                    result="SvgjsFeGaussianBlur2345Out"
                                                                                    in="SvgjsFeOffset2344Out"
                                                                                />
                                                                                <feMerge
                                                                                    id="SvgjsFeMerge2346"
                                                                                    result="SvgjsFeMerge2346Out"
                                                                                    in="SourceGraphic"
                                                                                >
                                                                                    <feMergeNode
                                                                                        id="SvgjsFeMergeNode2347"
                                                                                        in="SvgjsFeGaussianBlur2345Out"
                                                                                    />
                                                                                    <feMergeNode
                                                                                        id="SvgjsFeMergeNode2348"
                                                                                        in="[object Arguments]"
                                                                                    />
                                                                                </feMerge>
                                                                                <feBlend
                                                                                    id="SvgjsFeBlend2349"
                                                                                    in="SourceGraphic"
                                                                                    in2="SvgjsFeMerge2346Out"
                                                                                    mode="normal"
                                                                                    result="SvgjsFeBlend2349Out"
                                                                                />
                                                                            </filter>
                                                                            <filter
                                                                                id="SvgjsFilter2351"
                                                                                filterUnits="userSpaceOnUse"
                                                                                width="200%"
                                                                                height="200%"
                                                                                x="-50%"
                                                                                y="-50%"
                                                                            >
                                                                                <feFlood
                                                                                    id="SvgjsFeFlood2352"
                                                                                    floodColor="#696cff"
                                                                                    floodOpacity="0.15"
                                                                                    result="SvgjsFeFlood2352Out"
                                                                                    in="SourceGraphic"
                                                                                />
                                                                                <feComposite
                                                                                    id="SvgjsFeComposite2353"
                                                                                    in="SvgjsFeFlood2352Out"
                                                                                    in2="SourceAlpha"
                                                                                    operator="in"
                                                                                    result="SvgjsFeComposite2353Out"
                                                                                />
                                                                                <feOffset
                                                                                    id="SvgjsFeOffset2354"
                                                                                    dx={2}
                                                                                    dy={14}
                                                                                    result="SvgjsFeOffset2354Out"
                                                                                    in="SvgjsFeComposite2353Out"
                                                                                />
                                                                                <feGaussianBlur
                                                                                    id="SvgjsFeGaussianBlur2355"
                                                                                    stdDeviation={3}
                                                                                    result="SvgjsFeGaussianBlur2355Out"
                                                                                    in="SvgjsFeOffset2354Out"
                                                                                />
                                                                                <feMerge
                                                                                    id="SvgjsFeMerge2356"
                                                                                    result="SvgjsFeMerge2356Out"
                                                                                    in="SourceGraphic"
                                                                                >
                                                                                    <feMergeNode
                                                                                        id="SvgjsFeMergeNode2357"
                                                                                        in="SvgjsFeGaussianBlur2355Out"
                                                                                    />
                                                                                    <feMergeNode
                                                                                        id="SvgjsFeMergeNode2358"
                                                                                        in="[object Arguments]"
                                                                                    />
                                                                                </feMerge>
                                                                                <feBlend
                                                                                    id="SvgjsFeBlend2359"
                                                                                    in="SourceGraphic"
                                                                                    in2="SvgjsFeMerge2356Out"
                                                                                    mode="normal"
                                                                                    result="SvgjsFeBlend2359Out"
                                                                                />
                                                                            </filter>
                                                                        </defs>
                                                                        <line
                                                                            id="SvgjsLine2329"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2={0}
                                                                            y2="246.700799074173"
                                                                            stroke="#b6b6b6"
                                                                            strokeDasharray={3}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-xcrosshairs"
                                                                            x={0}
                                                                            y={0}
                                                                            width={1}
                                                                            height="246.700799074173"
                                                                            fill="#b1b9c4"
                                                                            filter="none"
                                                                            fillOpacity="0.9"
                                                                            strokeWidth={1}
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2360"
                                                                            className="apexcharts-xaxis"
                                                                            transform="translate(0, 0)"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2361"
                                                                                className="apexcharts-xaxis-texts-g"
                                                                                transform="translate(0, -4)"
                                                                            >
                                                                                <text
                                                                                    id="SvgjsText2363"
                                                                                    fontFamily="Public Sans"
                                                                                    x={0}
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2364">Jan</tspan>
                                                                                    <title>Jan</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2366"
                                                                                    fontFamily="Public Sans"
                                                                                    x="37.284401633522734"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2367">Feb</tspan>
                                                                                    <title>Feb</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2369"
                                                                                    fontFamily="Public Sans"
                                                                                    x="74.56880326704545"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2370">Mar</tspan>
                                                                                    <title>Mar</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2372"
                                                                                    fontFamily="Public Sans"
                                                                                    x="111.85320490056817"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2373">Apr</tspan>
                                                                                    <title>Apr</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2375"
                                                                                    fontFamily="Public Sans"
                                                                                    x="149.13760653409088"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2376">May</tspan>
                                                                                    <title>May</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2378"
                                                                                    fontFamily="Public Sans"
                                                                                    x="186.4220081676136"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2379">Jun</tspan>
                                                                                    <title>Jun</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2381"
                                                                                    fontFamily="Public Sans"
                                                                                    x="223.70640980113632"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2382">Jul</tspan>
                                                                                    <title>Jul</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2384"
                                                                                    fontFamily="Public Sans"
                                                                                    x="260.99081143465907"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2385">Aug</tspan>
                                                                                    <title>Aug</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2387"
                                                                                    fontFamily="Public Sans"
                                                                                    x="298.2752130681818"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2388">Sep</tspan>
                                                                                    <title>Sep</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2390"
                                                                                    fontFamily="Public Sans"
                                                                                    x="335.55961470170456"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2391">Oct</tspan>
                                                                                    <title>Oct</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2393"
                                                                                    fontFamily="Public Sans"
                                                                                    x="372.8440163352273"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2394">Nov</tspan>
                                                                                    <title>Nov</title>
                                                                                </text>
                                                                                <text
                                                                                    id="SvgjsText2396"
                                                                                    fontFamily="Public Sans"
                                                                                    x="410.12841796875006"
                                                                                    y="275.700799074173"
                                                                                    textAnchor="middle"
                                                                                    dominantBaseline="auto"
                                                                                    fontSize="13px"
                                                                                    fontWeight={400}
                                                                                    fill="#a7acb2"
                                                                                    className="apexcharts-text apexcharts-xaxis-label "
                                                                                    style={{ fontFamily: '"Public Sans"' }}
                                                                                >
                                                                                    <tspan id="SvgjsTspan2397">Dec</tspan>
                                                                                    <title>Dec</title>
                                                                                </text>
                                                                            </g>
                                                                        </g>
                                                                        <g id="SvgjsG2412" className="apexcharts-grid">
                                                                            <g
                                                                                id="SvgjsG2413"
                                                                                className="apexcharts-gridlines-horizontal"
                                                                            >
                                                                                <line
                                                                                    id="SvgjsLine2415"
                                                                                    x1={0}
                                                                                    y1={0}
                                                                                    x2="410.12841796875"
                                                                                    y2={0}
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2416"
                                                                                    x1={0}
                                                                                    y1="49.3401598148346"
                                                                                    x2="410.12841796875"
                                                                                    y2="49.3401598148346"
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2417"
                                                                                    x1={0}
                                                                                    y1="98.6803196296692"
                                                                                    x2="410.12841796875"
                                                                                    y2="98.6803196296692"
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2418"
                                                                                    x1={0}
                                                                                    y1="148.0204794445038"
                                                                                    x2="410.12841796875"
                                                                                    y2="148.0204794445038"
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2419"
                                                                                    x1={0}
                                                                                    y1="197.3606392593384"
                                                                                    x2="410.12841796875"
                                                                                    y2="197.3606392593384"
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2420"
                                                                                    x1={0}
                                                                                    y1="246.700799074173"
                                                                                    x2="410.12841796875"
                                                                                    y2="246.700799074173"
                                                                                    stroke="#e4e6e8"
                                                                                    strokeDasharray={10}
                                                                                    strokeLinecap="butt"
                                                                                    className="apexcharts-gridline"
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2414"
                                                                                className="apexcharts-gridlines-vertical"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2422"
                                                                                x1={0}
                                                                                y1="246.700799074173"
                                                                                x2="410.12841796875"
                                                                                y2="246.700799074173"
                                                                                stroke="transparent"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2421"
                                                                                x1={0}
                                                                                y1={1}
                                                                                x2={0}
                                                                                y2="246.700799074173"
                                                                                stroke="transparent"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                            />
                                                                        </g>
                                                                        <g
                                                                            id="SvgjsG2332"
                                                                            className="apexcharts-area-series apexcharts-plot-series"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2333"
                                                                                className="apexcharts-series"
                                                                                seriesname="seriesx1"
                                                                                data-longestseries="true"
                                                                                rel={1}
                                                                                data-realindex={0}
                                                                            >
                                                                                <path
                                                                                    id="SvgjsPath2340"
                                                                                    d="M 0 246.700799074173L 0 130.75142350931168L 37.28440163352273 130.75142350931168L 74.56880326704545 59.20819177780149L 111.85320490056819 59.20819177780149L 149.1376065340909 150.4874874352455L 186.42200816761365 150.4874874352455L 223.70640980113637 207.2286712223053L 260.9908114346591 207.2286712223053L 298.2752130681818 111.01535958337783L 335.55961470170456 111.01535958337783L 372.8440163352273 14.80204794445035L 410.12841796875 14.80204794445035L 410.12841796875 246.700799074173M 410.12841796875 14.80204794445035z"
                                                                                    fill="url(#SvgjsLinearGradient2336)"
                                                                                    fillOpacity={1}
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="butt"
                                                                                    strokeWidth={0}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMaskmn3bxesaj)"
                                                                                    filter="url(#SvgjsFilter2341)"
                                                                                    pathto="M 0 246.700799074173L 0 130.75142350931168L 37.28440163352273 130.75142350931168L 74.56880326704545 59.20819177780149L 111.85320490056819 59.20819177780149L 149.1376065340909 150.4874874352455L 186.42200816761365 150.4874874352455L 223.70640980113637 207.2286712223053L 260.9908114346591 207.2286712223053L 298.2752130681818 111.01535958337783L 335.55961470170456 111.01535958337783L 372.8440163352273 14.80204794445035L 410.12841796875 14.80204794445035L 410.12841796875 246.700799074173M 410.12841796875 14.80204794445035z"
                                                                                    pathfrom="M -1 296.0409588890076L -1 296.0409588890076L 37.28440163352273 296.0409588890076L 74.56880326704545 296.0409588890076L 111.85320490056819 296.0409588890076L 149.1376065340909 296.0409588890076L 186.42200816761365 296.0409588890076L 223.70640980113637 296.0409588890076L 260.9908114346591 296.0409588890076L 298.2752130681818 296.0409588890076L 335.55961470170456 296.0409588890076L 372.8440163352273 296.0409588890076L 410.12841796875 296.0409588890076"
                                                                                />
                                                                                <path
                                                                                    id="SvgjsPath2350"
                                                                                    d="M 0 130.75142350931168L 37.28440163352273 130.75142350931168L 74.56880326704545 59.20819177780149L 111.85320490056819 59.20819177780149L 149.1376065340909 150.4874874352455L 186.42200816761365 150.4874874352455L 223.70640980113637 207.2286712223053L 260.9908114346591 207.2286712223053L 298.2752130681818 111.01535958337783L 335.55961470170456 111.01535958337783L 372.8440163352273 14.80204794445035L 410.12841796875 14.80204794445035"
                                                                                    fill="none"
                                                                                    fillOpacity={1}
                                                                                    stroke="#696cff"
                                                                                    strokeOpacity={1}
                                                                                    strokeLinecap="butt"
                                                                                    strokeWidth={3}
                                                                                    strokeDasharray={0}
                                                                                    className="apexcharts-area"
                                                                                    index={0}
                                                                                    clipPath="url(#gridRectMaskmn3bxesaj)"
                                                                                    filter="url(#SvgjsFilter2351)"
                                                                                    pathto="M 0 130.75142350931168L 37.28440163352273 130.75142350931168L 74.56880326704545 59.20819177780149L 111.85320490056819 59.20819177780149L 149.1376065340909 150.4874874352455L 186.42200816761365 150.4874874352455L 223.70640980113637 207.2286712223053L 260.9908114346591 207.2286712223053L 298.2752130681818 111.01535958337783L 335.55961470170456 111.01535958337783L 372.8440163352273 14.80204794445035L 410.12841796875 14.80204794445035"
                                                                                    pathfrom="M -1 296.0409588890076L -1 296.0409588890076L 37.28440163352273 296.0409588890076L 74.56880326704545 296.0409588890076L 111.85320490056819 296.0409588890076L 149.1376065340909 296.0409588890076L 186.42200816761365 296.0409588890076L 223.70640980113637 296.0409588890076L 260.9908114346591 296.0409588890076L 298.2752130681818 296.0409588890076L 335.55961470170456 296.0409588890076L 372.8440163352273 296.0409588890076L 410.12841796875 296.0409588890076"
                                                                                />
                                                                                <g
                                                                                    id="SvgjsG2334"
                                                                                    className="apexcharts-series-markers-wrap"
                                                                                    data-realindex={0}
                                                                                >
                                                                                    <g className="apexcharts-series-markers">
                                                                                        <circle
                                                                                            id="SvgjsCircle2428"
                                                                                            r={0}
                                                                                            cx={0}
                                                                                            cy={0}
                                                                                            className="apexcharts-marker wqzva6h33 no-pointer-events"
                                                                                            stroke="#ffffff"
                                                                                            fill="#696cff"
                                                                                            fillOpacity={1}
                                                                                            strokeWidth={2}
                                                                                            strokeOpacity="0.9"
                                                                                            default-marker-size={0}
                                                                                        />
                                                                                    </g>
                                                                                </g>
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2335"
                                                                                className="apexcharts-datalabels"
                                                                                data-realindex={0}
                                                                            />
                                                                        </g>
                                                                        <line
                                                                            id="SvgjsLine2423"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2="410.12841796875"
                                                                            y2={0}
                                                                            stroke="#b6b6b6"
                                                                            strokeDasharray={0}
                                                                            strokeWidth={1}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-ycrosshairs"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2424"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2="410.12841796875"
                                                                            y2={0}
                                                                            strokeDasharray={0}
                                                                            strokeWidth={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-ycrosshairs-hidden"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2425"
                                                                            className="apexcharts-yaxis-annotations"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2426"
                                                                            className="apexcharts-xaxis-annotations"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2427"
                                                                            className="apexcharts-point-annotations"
                                                                        />
                                                                        <rect
                                                                            id="SvgjsRect2429"
                                                                            width={0}
                                                                            height={0}
                                                                            x={0}
                                                                            y={0}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fefefe"
                                                                            className="apexcharts-zoom-rect"
                                                                        />
                                                                        <rect
                                                                            id="SvgjsRect2430"
                                                                            width={0}
                                                                            height={0}
                                                                            x={0}
                                                                            y={0}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fefefe"
                                                                            className="apexcharts-selection-rect"
                                                                        />
                                                                    </g>
                                                                    <rect
                                                                        id="SvgjsRect2328"
                                                                        width={0}
                                                                        height={0}
                                                                        x={0}
                                                                        y={0}
                                                                        rx={0}
                                                                        ry={0}
                                                                        opacity={1}
                                                                        strokeWidth={0}
                                                                        stroke="none"
                                                                        strokeDasharray={0}
                                                                        fill="#fefefe"
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2398"
                                                                        className="apexcharts-yaxis"
                                                                        rel={0}
                                                                        transform="translate(5.962499618530273, 0)"
                                                                    >
                                                                        <g
                                                                            id="SvgjsG2399"
                                                                            className="apexcharts-yaxis-texts-g"
                                                                        >
                                                                            <text
                                                                                id="SvgjsText2400"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="16.5"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2401">$6k</tspan>
                                                                                <title>$6k</title>
                                                                            </text>
                                                                            <text
                                                                                id="SvgjsText2402"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="65.8401598148346"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2403">$5k</tspan>
                                                                                <title>$5k</title>
                                                                            </text>
                                                                            <text
                                                                                id="SvgjsText2404"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="115.18031962966921"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2405">$4k</tspan>
                                                                                <title>$4k</title>
                                                                            </text>
                                                                            <text
                                                                                id="SvgjsText2406"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="164.52047944450382"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2407">$3k</tspan>
                                                                                <title>$3k</title>
                                                                            </text>
                                                                            <text
                                                                                id="SvgjsText2408"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="213.86063925933843"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2409">$2k</tspan>
                                                                                <title>$2k</title>
                                                                            </text>
                                                                            <text
                                                                                id="SvgjsText2410"
                                                                                fontFamily="Public Sans"
                                                                                x={20}
                                                                                y="263.200799074173"
                                                                                textAnchor="end"
                                                                                dominantBaseline="auto"
                                                                                fontSize="13px"
                                                                                fontWeight={400}
                                                                                fill="#a7acb2"
                                                                                className="apexcharts-text apexcharts-yaxis-label "
                                                                                style={{ fontFamily: '"Public Sans"' }}
                                                                            >
                                                                                <tspan id="SvgjsTspan2411">$1k</tspan>
                                                                                <title>$1k</title>
                                                                            </text>
                                                                        </g>
                                                                    </g>
                                                                    <g id="SvgjsG2325" className="apexcharts-annotations" />
                                                                </svg>
                                                                <div
                                                                    className="apexcharts-legend"
                                                                    style={{ maxHeight: 145 }}
                                                                />
                                                                <div className="apexcharts-tooltip apexcharts-theme-light">
                                                                    <div
                                                                        className="apexcharts-tooltip-title"
                                                                        style={{
                                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                                            fontSize: 12
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className="apexcharts-tooltip-series-group"
                                                                        style={{ order: 1 }}
                                                                    >
                                                                        <span
                                                                            className="apexcharts-tooltip-marker"
                                                                            style={{ backgroundColor: "rgb(105, 108, 255)" }}
                                                                        />
                                                                        <div
                                                                            className="apexcharts-tooltip-text"
                                                                            style={{
                                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                                fontSize: 12
                                                                            }}
                                                                        >
                                                                            <div className="apexcharts-tooltip-y-group">
                                                                                <span className="apexcharts-tooltip-text-y-label" />
                                                                                <span className="apexcharts-tooltip-text-y-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-goals-group">
                                                                                <span className="apexcharts-tooltip-text-goals-label" />
                                                                                <span className="apexcharts-tooltip-text-goals-value" />
                                                                            </div>
                                                                            <div className="apexcharts-tooltip-z-group">
                                                                                <span className="apexcharts-tooltip-text-z-label" />
                                                                                <span className="apexcharts-tooltip-text-z-value" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light">
                                                                    <div
                                                                        className="apexcharts-xaxistooltip-text"
                                                                        style={{
                                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                                            fontSize: 12
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                                    <div className="apexcharts-yaxistooltip-text" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="resize-triggers">
                                                            <div className="expand-trigger">
                                                                <div style={{ width: 511, height: 330 }} />
                                                            </div>
                                                            <div className="contract-trigger" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="card-header d-flex justify-content-between">
                                                        <div>
                                                            <h5 className="card-title mb-1">Favorite Food</h5>

                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn p-0"
                                                                type="button"
                                                                id="totalReport"
                                                                data-bs-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bx bx-dots-vertical-rounded bx-lg text-muted" />
                                                            </button>
                                                            <div
                                                                className="dropdown-menu dropdown-menu-end"
                                                                aria-labelledby="totalReport"
                                                            >
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last 28 Days
                                                                </a>
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last Month
                                                                </a>
                                                                <a className="dropdown-item" href="javascript:void(0);">
                                                                    Last Year
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card-body pt-lg-6">
                                                        <div className="report-list">
                                                            <div className="report-list-item rounded-2 mb-4">
                                                                <div className="d-flex align-items-center">
                                                                    {mostOrderedItem ? (
                                                                        <div className="report-list-icon shadow-xs me-4">
                                                                            <img
                                                                                src={mostOrderedItem.imageURL}
                                                                                alt={mostOrderedItem.name}
                                                                                width={80}
                                                                                height={70}

                                                                            />
                                                                        </div>
                                                                    ) : null}
                                                                    <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                                                                        {mostOrderedItem ? (
                                                                            <div className="d-flex flex-column">
                                                                                <div>
                                                                                    <p>
                                                                                        The most ordered item is <strong>{mostOrderedItem.name}</strong> with{" "}
                                                                                        <strong>{mostOrderedItem.count}</strong> orders.
                                                                                    </p>

                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <p>No data available.</p>
                                                                        )}
                                                                        {mostOrderedItem && (
                                                                            <small className="text-success"> + {mostOrderedItem.count}</small>
                                                                        )}
                                                                    </div>

                                                                </div>
                                                            </div>


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*/ Total Income */}
                                    </div>
                                    {/*/ Total Income */}
                                </div>
                                <div className="row">
                                    {/* Performance */}
                                    <div className="col-md-6 col-xxl-4 mb-6">
                                        <div className="card h-100">
                                            <div className="card-header d-flex align-items-center justify-content-between">
                                                <h5 className="card-title m-0 me-2">Performance</h5>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn p-0"
                                                        type="button"
                                                        id="performanceId"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bx bx-dots-vertical-rounded bx-lg text-muted" />
                                                    </button>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="performanceId"
                                                    >
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last 28 Days
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last Month
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last Year
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body" style={{ position: "relative" }}>
                                                <div className="row justify-content-between mb-5">
                                                    <div className="col-6">
                                                        <p className="mb-0">Earnings: $846.17</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="mb-0 text-end">Sales: 25.7M</p>
                                                    </div>
                                                </div>
                                                <div id="performanceChart" style={{ minHeight: 325 }}>
                                                    <div
                                                        id="apexchartsgmsywiag"
                                                        className="apexcharts-canvas apexchartsgmsywiag apexcharts-theme-light"
                                                        style={{ width: 322, height: 310 }}
                                                    >
                                                        <svg
                                                            id="SvgjsSvg2568"
                                                            width={322}
                                                            height={310}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            version="1.1"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"

                                                            className="apexcharts-svg"
                                                            xmlns-data="ApexChartsNS"
                                                            transform="translate(0, 0)"
                                                            style={{ background: "transparent" }}
                                                        >
                                                            <foreignObject x={0} y={0} width={322} height={310}>
                                                                <div
                                                                    className="apexcharts-legend apexcharts-align-center apx-legend-position-bottom"
                                                                    xmlns="http://www.w3.org/1999/xhtml"
                                                                    style={{
                                                                        inset: "auto 0px 1px",
                                                                        position: "absolute",
                                                                        maxHeight: 155
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="apexcharts-legend-series"
                                                                        rel={1}
                                                                        seriesname="Income"
                                                                        data-collapsed="false"
                                                                        style={{ margin: "2px 10px" }}
                                                                    >
                                                                        <span
                                                                            className="apexcharts-legend-marker"
                                                                            rel={1}
                                                                            data-collapsed="false"
                                                                            style={{
                                                                                background: "rgb(105, 108, 255) !important",
                                                                                color: "rgb(105, 108, 255)",
                                                                                height: 10,
                                                                                width: 10,
                                                                                left: "-5px",
                                                                                top: 0,
                                                                                borderWidth: 0,
                                                                                borderColor: "rgb(255, 255, 255)",
                                                                                borderRadius: 12
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className="apexcharts-legend-text"
                                                                            rel={1}
                                                                            i={0}
                                                                            data-default-text="Income"
                                                                            data-collapsed="false"
                                                                            style={{
                                                                                color: "rgb(170, 179, 191)",
                                                                                fontSize: 13,
                                                                                fontWeight: 400,
                                                                                fontFamily: "Helvetica, Arial, sans-serif"
                                                                            }}
                                                                        >
                                                                            Income
                                                                        </span>
                                                                    </div>
                                                                    <div
                                                                        className="apexcharts-legend-series"
                                                                        rel={2}
                                                                        seriesname="Earning"
                                                                        data-collapsed="false"
                                                                        style={{ margin: "2px 10px" }}
                                                                    >
                                                                        <span
                                                                            className="apexcharts-legend-marker"
                                                                            rel={2}
                                                                            data-collapsed="false"
                                                                            style={{
                                                                                background: "rgb(3, 195, 236) !important",
                                                                                color: "rgb(3, 195, 236)",
                                                                                height: 10,
                                                                                width: 10,
                                                                                left: "-5px",
                                                                                top: 0,
                                                                                borderWidth: 0,
                                                                                borderColor: "rgb(255, 255, 255)",
                                                                                borderRadius: 12
                                                                            }}
                                                                        />
                                                                        <span
                                                                            className="apexcharts-legend-text"
                                                                            rel={2}
                                                                            i={1}
                                                                            data-default-text="Earning"
                                                                            data-collapsed="false"
                                                                            style={{
                                                                                color: "rgb(170, 179, 191)",
                                                                                fontSize: 13,
                                                                                fontWeight: 400,
                                                                                fontFamily: "Helvetica, Arial, sans-serif"
                                                                            }}
                                                                        >
                                                                            Earning
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <style
                                                                    type="text/css"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            "\t\n    \t\n      .apexcharts-legend {\t\n        display: flex;\t\n        overflow: auto;\t\n        padding: 0 10px;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {\t\n        flex-wrap: wrap\t\n      }\t\n      .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        flex-direction: column;\t\n        bottom: 0;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {\t\n        justify-content: flex-start;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {\t\n        justify-content: center;  \t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {\t\n        justify-content: flex-end;\t\n      }\t\n      .apexcharts-legend-series {\t\n        cursor: pointer;\t\n        line-height: normal;\t\n      }\t\n      .apexcharts-legend.apx-legend-position-bottom .apexcharts-legend-series, .apexcharts-legend.apx-legend-position-top .apexcharts-legend-series{\t\n        display: flex;\t\n        align-items: center;\t\n      }\t\n      .apexcharts-legend-text {\t\n        position: relative;\t\n        font-size: 14px;\t\n      }\t\n      .apexcharts-legend-text *, .apexcharts-legend-marker * {\t\n        pointer-events: none;\t\n      }\t\n      .apexcharts-legend-marker {\t\n        position: relative;\t\n        display: inline-block;\t\n        cursor: pointer;\t\n        margin-right: 3px;\t\n        border-style: solid;\n      }\t\n      \t\n      .apexcharts-legend.apexcharts-align-right .apexcharts-legend-series, .apexcharts-legend.apexcharts-align-left .apexcharts-legend-series{\t\n        display: inline-block;\t\n      }\t\n      .apexcharts-legend-series.apexcharts-no-click {\t\n        cursor: auto;\t\n      }\t\n      .apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {\t\n        display: none !important;\t\n      }\t\n      .apexcharts-inactive-legend {\t\n        opacity: 0.45;\t\n      }"
                                                                    }}
                                                                />
                                                            </foreignObject>
                                                            <g
                                                                id="SvgjsG2570"
                                                                className="apexcharts-inner apexcharts-graphical"
                                                                transform="translate(12, 22)"
                                                            >
                                                                <defs id="SvgjsDefs2569">
                                                                    <clipPath id="gridRectMaskgmsywiag">
                                                                        <rect
                                                                            id="SvgjsRect2573"
                                                                            width="292.51875019073486"
                                                                            height={234}
                                                                            x={-2}
                                                                            y={0}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fff"
                                                                        />
                                                                    </clipPath>
                                                                    <clipPath id="forecastMaskgmsywiag" />
                                                                    <clipPath id="nonForecastMaskgmsywiag" />
                                                                    <clipPath id="gridRectMarkerMaskgmsywiag">
                                                                        <rect
                                                                            id="SvgjsRect2574"
                                                                            width="292.51875019073486"
                                                                            height={238}
                                                                            x={-2}
                                                                            y={-2}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fff"
                                                                        />
                                                                    </clipPath>
                                                                    <filter
                                                                        id="SvgjsFilter2582"
                                                                        width="200%"
                                                                        height="200%"
                                                                        x="-50%"
                                                                        y="-50%"
                                                                    >
                                                                        <feFlood
                                                                            id="SvgjsFeFlood2583"
                                                                            floodColor="#000000"
                                                                            floodOpacity="0.14"
                                                                            result="SvgjsFeFlood2583Out"
                                                                            in="SourceGraphic"
                                                                        />
                                                                        <feComposite
                                                                            id="SvgjsFeComposite2584"
                                                                            in="SvgjsFeFlood2583Out"
                                                                            in2="SourceAlpha"
                                                                            operator="in"
                                                                            result="SvgjsFeComposite2584Out"
                                                                        />
                                                                        <feOffset
                                                                            id="SvgjsFeOffset2585"
                                                                            dx={0}
                                                                            dy={6}
                                                                            result="SvgjsFeOffset2585Out"
                                                                            in="SvgjsFeComposite2584Out"
                                                                        />
                                                                        <feGaussianBlur
                                                                            id="SvgjsFeGaussianBlur2586"
                                                                            stdDeviation={6}
                                                                            result="SvgjsFeGaussianBlur2586Out"
                                                                            in="SvgjsFeOffset2585Out"
                                                                        />
                                                                        <feMerge
                                                                            id="SvgjsFeMerge2587"
                                                                            result="SvgjsFeMerge2587Out"
                                                                            in="SourceGraphic"
                                                                        >
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2588"
                                                                                in="SvgjsFeGaussianBlur2586Out"
                                                                            />
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2589"
                                                                                in="[object Arguments]"
                                                                            />
                                                                        </feMerge>
                                                                        <feBlend
                                                                            id="SvgjsFeBlend2590"
                                                                            in="SourceGraphic"
                                                                            in2="SvgjsFeMerge2587Out"
                                                                            mode="normal"
                                                                            result="SvgjsFeBlend2590Out"
                                                                        />
                                                                    </filter>
                                                                    <filter
                                                                        id="SvgjsFilter2608"
                                                                        width="200%"
                                                                        height="200%"
                                                                        x="-50%"
                                                                        y="-50%"
                                                                    >
                                                                        <feFlood
                                                                            id="SvgjsFeFlood2609"
                                                                            floodColor="#000000"
                                                                            floodOpacity="0.14"
                                                                            result="SvgjsFeFlood2609Out"
                                                                            in="SourceGraphic"
                                                                        />
                                                                        <feComposite
                                                                            id="SvgjsFeComposite2610"
                                                                            in="SvgjsFeFlood2609Out"
                                                                            in2="SourceAlpha"
                                                                            operator="in"
                                                                            result="SvgjsFeComposite2610Out"
                                                                        />
                                                                        <feOffset
                                                                            id="SvgjsFeOffset2611"
                                                                            dx={0}
                                                                            dy={6}
                                                                            result="SvgjsFeOffset2611Out"
                                                                            in="SvgjsFeComposite2610Out"
                                                                        />
                                                                        <feGaussianBlur
                                                                            id="SvgjsFeGaussianBlur2612"
                                                                            stdDeviation={6}
                                                                            result="SvgjsFeGaussianBlur2612Out"
                                                                            in="SvgjsFeOffset2611Out"
                                                                        />
                                                                        <feMerge
                                                                            id="SvgjsFeMerge2613"
                                                                            result="SvgjsFeMerge2613Out"
                                                                            in="SourceGraphic"
                                                                        >
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2614"
                                                                                in="SvgjsFeGaussianBlur2612Out"
                                                                            />
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2615"
                                                                                in="[object Arguments]"
                                                                            />
                                                                        </feMerge>
                                                                        <feBlend
                                                                            id="SvgjsFeBlend2616"
                                                                            in="SourceGraphic"
                                                                            in2="SvgjsFeMerge2613Out"
                                                                            mode="normal"
                                                                            result="SvgjsFeBlend2616Out"
                                                                        />
                                                                    </filter>
                                                                </defs>
                                                                <g id="SvgjsG2647" className="apexcharts-grid">
                                                                    <g
                                                                        id="SvgjsG2648"
                                                                        className="apexcharts-gridlines-horizontal"
                                                                        style={{ display: "none" }}
                                                                    >
                                                                        <line
                                                                            id="SvgjsLine2650"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2="288.51875019073486"
                                                                            y2={0}
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2651"
                                                                            x1={0}
                                                                            y1="58.5"
                                                                            x2="288.51875019073486"
                                                                            y2="58.5"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2652"
                                                                            x1={0}
                                                                            y1={117}
                                                                            x2="288.51875019073486"
                                                                            y2={117}
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2653"
                                                                            x1={0}
                                                                            y1="175.5"
                                                                            x2="288.51875019073486"
                                                                            y2="175.5"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2654"
                                                                            x1={0}
                                                                            y1={234}
                                                                            x2="288.51875019073486"
                                                                            y2={234}
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2649"
                                                                        className="apexcharts-gridlines-vertical"
                                                                        style={{ display: "none" }}
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2656"
                                                                        x1={0}
                                                                        y1={234}
                                                                        x2="288.51875019073486"
                                                                        y2={234}
                                                                        stroke="transparent"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2655"
                                                                        x1={0}
                                                                        y1={1}
                                                                        x2={0}
                                                                        y2={234}
                                                                        stroke="transparent"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                </g>
                                                                <g
                                                                    id="SvgjsG2575"
                                                                    className="apexcharts-radar-series apexcharts-plot-series"
                                                                    transform="translate(144.25937509536743, 117)"
                                                                >
                                                                    <polygon
                                                                        id="SvgjsPolygon2635"
                                                                        points="0,-118.45000021798269 102.5807092670453,-59.22500010899136 102.58070926704531,59.22500010899132 1.4505941362595578e-14,118.45000021798269 -102.58070926704528,59.225000108991395 -102.58070926704535,-59.22500010899127 "
                                                                        fill="none"
                                                                        stroke="#e4e6e8"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <polygon
                                                                        id="SvgjsPolygon2636"
                                                                        points="0,-88.83750016348702 76.93553195028397,-44.41875008174352 76.93553195028399,44.41875008174349 1.0879456021946685e-14,88.83750016348702 -76.93553195028396,44.41875008174355 -76.93553195028402,-44.418750081743454 "
                                                                        fill="none"
                                                                        stroke="#e4e6e8"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <polygon
                                                                        id="SvgjsPolygon2637"
                                                                        points="0,-59.225000108991345 51.29035463352265,-29.61250005449568 51.290354633522654,29.61250005449566 7.252970681297789e-15,59.225000108991345 -51.29035463352264,29.612500054495698 -51.290354633522675,-29.612500054495634 "
                                                                        fill="none"
                                                                        stroke="#e4e6e8"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <polygon
                                                                        id="SvgjsPolygon2638"
                                                                        points="0,-29.612500054495673 25.645177316761323,-14.80625002724784 25.645177316761327,14.80625002724783 3.6264853406488944e-15,29.612500054495673 -25.64517731676132,14.806250027247849 -25.645177316761337,-14.806250027247817 "
                                                                        fill="none"
                                                                        stroke="#e4e6e8"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <polygon
                                                                        id="SvgjsPolygon2639"
                                                                        points="0,0 0,0 0,0 0,0 0,0 0,0 "
                                                                        fill="none"
                                                                        stroke="#e4e6e8"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2629"
                                                                        x1={0}
                                                                        y1="-118.45000021798269"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2630"
                                                                        x1="102.5807092670453"
                                                                        y1="-59.22500010899136"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2631"
                                                                        x1="102.58070926704531"
                                                                        y1="59.22500010899132"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2632"
                                                                        x1="1.4505941362595578e-14"
                                                                        y1="118.45000021798269"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2633"
                                                                        x1="-102.58070926704528"
                                                                        y1="59.225000108991395"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2634"
                                                                        x1="-102.58070926704535"
                                                                        y1="-59.22500010899127"
                                                                        x2={0}
                                                                        y2={0}
                                                                        stroke="#e4e6e8"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <g id="SvgjsG2640" className="apexcharts-xaxis">
                                                                        <text
                                                                            id="SvgjsText2641"
                                                                            fontFamily="Public Sans"
                                                                            x={0}
                                                                            y="-128.45000021798268"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx={0}
                                                                            cy="-128.45000021798268"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            Jan
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2642"
                                                                            fontFamily="Public Sans"
                                                                            x="112.5807092670453"
                                                                            y="-59.22500010899136"
                                                                            textAnchor="start"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx="112.5807092670453"
                                                                            cy="-59.22500010899136"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            Feb
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2643"
                                                                            fontFamily="Public Sans"
                                                                            x="112.58070926704531"
                                                                            y="59.22500010899132"
                                                                            textAnchor="start"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx="112.58070926704531"
                                                                            cy="59.22500010899132"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            Mar
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2644"
                                                                            fontFamily="Public Sans"
                                                                            x="1.4505941362595578e-14"
                                                                            y="128.45000021798268"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx="1.4505941362595578e-14"
                                                                            cy="128.45000021798268"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            Apr
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2645"
                                                                            fontFamily="Public Sans"
                                                                            x="-112.58070926704528"
                                                                            y="59.225000108991395"
                                                                            textAnchor="end"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx="-112.58070926704528"
                                                                            cy="59.225000108991395"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            May
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2646"
                                                                            fontFamily="Public Sans"
                                                                            x="-112.58070926704535"
                                                                            y="-59.22500010899127"
                                                                            textAnchor="end"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-datalabel"
                                                                            cx="-112.58070926704535"
                                                                            cy="-59.22500010899127"
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            Jun
                                                                        </text>
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2577"
                                                                        className="apexcharts-series"
                                                                        data-longestseries="true"
                                                                        seriesname="Income"
                                                                        rel={1}
                                                                        data-realindex={0}
                                                                    >
                                                                        <path
                                                                            id="SvgjsPath2580"
                                                                            d="M 0 -76.99250014168875L 0 -76.99250014168875L 74.37101421860784 -42.93812507901873L 79.50004968196012 45.899375084468275L 1.4505941362595578e-14 118.45000021798269L -74.37101421860783 42.93812507901876L -61.54842556022721 -35.535000065394755Z"
                                                                            fill="none"
                                                                            fillOpacity={1}
                                                                            strokeOpacity={1}
                                                                            strokeLinecap="butt"
                                                                            strokeWidth={0}
                                                                            strokeDasharray={0}
                                                                            className="apexcharts-radar"
                                                                            index={0}
                                                                            pathto="M 0 -76.99250014168875L 0 -76.99250014168875L 74.37101421860784 -42.93812507901873L 79.50004968196012 45.899375084468275L 1.4505941362595578e-14 118.45000021798269L -74.37101421860783 42.93812507901876L -61.54842556022721 -35.535000065394755Z"
                                                                            pathfrom="M 0 0"
                                                                        />
                                                                        <path
                                                                            id="SvgjsPath2581"
                                                                            d="M 0 -76.99250014168875L 0 -76.99250014168875L 74.37101421860784 -42.93812507901873L 79.50004968196012 45.899375084468275L 1.4505941362595578e-14 118.45000021798269L -74.37101421860783 42.93812507901876L -61.54842556022721 -35.535000065394755Z"
                                                                            fill="rgba(105,108,255,1)"
                                                                            fillOpacity={1}
                                                                            strokeOpacity={1}
                                                                            strokeLinecap="butt"
                                                                            strokeWidth={0}
                                                                            strokeDasharray={0}
                                                                            className="apexcharts-radar"
                                                                            index={0}
                                                                            pathto="M 0 -76.99250014168875L 0 -76.99250014168875L 74.37101421860784 -42.93812507901873L 79.50004968196012 45.899375084468275L 1.4505941362595578e-14 118.45000021798269L -74.37101421860783 42.93812507901876L -61.54842556022721 -35.535000065394755Z"
                                                                            pathfrom="M 0 0"
                                                                            filter="url(#SvgjsFilter2582)"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2578"
                                                                            className="apexcharts-series-markers-wrap"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2592"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2591"
                                                                                    r={0}
                                                                                    cx={0}
                                                                                    cy="-76.99250014168875"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={0}
                                                                                    j={0}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2594"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2593"
                                                                                    r={0}
                                                                                    cx="74.37101421860784"
                                                                                    cy="-42.93812507901873"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={1}
                                                                                    j={1}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2596"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2595"
                                                                                    r={0}
                                                                                    cx="79.50004968196012"
                                                                                    cy="45.899375084468275"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={2}
                                                                                    j={2}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2598"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2597"
                                                                                    r={0}
                                                                                    cx="1.4505941362595578e-14"
                                                                                    cy="118.45000021798269"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={3}
                                                                                    j={3}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2600"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2599"
                                                                                    r={0}
                                                                                    cx="-74.37101421860783"
                                                                                    cy="42.93812507901876"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={4}
                                                                                    j={4}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2602"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2601"
                                                                                    r={0}
                                                                                    cx="-61.54842556022721"
                                                                                    cy="-35.535000065394755"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={5}
                                                                                    j={5}
                                                                                    index={0}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g className="apexcharts-series-markers">
                                                                                <circle
                                                                                    id="SvgjsCircle2662"
                                                                                    r={0}
                                                                                    cx={0}
                                                                                    cy={0}
                                                                                    className="apexcharts-marker w4s0q7sft"
                                                                                    stroke="#ffffff"
                                                                                    fill="#696cff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2603"
                                                                        className="apexcharts-series"
                                                                        data-longestseries="true"
                                                                        seriesname="Earning"
                                                                        rel={2}
                                                                        data-realindex={1}
                                                                    >
                                                                        <path
                                                                            id="SvgjsPath2606"
                                                                            d="M 0 -88.83750016348702L 0 -88.83750016348702L 66.67746102357944 -38.49625007084438L 61.54842556022718 35.53500006539479L 9.428861885687127e-15 76.99250014168875L -61.54842556022716 35.53500006539483L -102.58070926704535 -59.22500010899127Z"
                                                                            fill="none"
                                                                            fillOpacity={1}
                                                                            strokeOpacity={1}
                                                                            strokeLinecap="butt"
                                                                            strokeWidth={0}
                                                                            strokeDasharray={0}
                                                                            className="apexcharts-radar"
                                                                            index={1}
                                                                            pathto="M 0 -88.83750016348702L 0 -88.83750016348702L 66.67746102357944 -38.49625007084438L 61.54842556022718 35.53500006539479L 9.428861885687127e-15 76.99250014168875L -61.54842556022716 35.53500006539483L -102.58070926704535 -59.22500010899127Z"
                                                                            pathfrom="M 0 0"
                                                                        />
                                                                        <path
                                                                            id="SvgjsPath2607"
                                                                            d="M 0 -88.83750016348702L 0 -88.83750016348702L 66.67746102357944 -38.49625007084438L 61.54842556022718 35.53500006539479L 9.428861885687127e-15 76.99250014168875L -61.54842556022716 35.53500006539483L -102.58070926704535 -59.22500010899127Z"
                                                                            fill="rgba(3,195,236,0.85)"
                                                                            fillOpacity={1}
                                                                            strokeOpacity={1}
                                                                            strokeLinecap="butt"
                                                                            strokeWidth={0}
                                                                            strokeDasharray={0}
                                                                            className="apexcharts-radar"
                                                                            index={1}
                                                                            pathto="M 0 -88.83750016348702L 0 -88.83750016348702L 66.67746102357944 -38.49625007084438L 61.54842556022718 35.53500006539479L 9.428861885687127e-15 76.99250014168875L -61.54842556022716 35.53500006539483L -102.58070926704535 -59.22500010899127Z"
                                                                            pathfrom="M 0 0"
                                                                            filter="url(#SvgjsFilter2608)"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2604"
                                                                            className="apexcharts-series-markers-wrap"
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2618"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2617"
                                                                                    r={0}
                                                                                    cx={0}
                                                                                    cy="-88.83750016348702"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={0}
                                                                                    j={0}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2620"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2619"
                                                                                    r={0}
                                                                                    cx="66.67746102357944"
                                                                                    cy="-38.49625007084438"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={1}
                                                                                    j={1}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2622"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2621"
                                                                                    r={0}
                                                                                    cx="61.54842556022718"
                                                                                    cy="35.53500006539479"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={2}
                                                                                    j={2}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2624"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2623"
                                                                                    r={0}
                                                                                    cx="9.428861885687127e-15"
                                                                                    cy="76.99250014168875"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={3}
                                                                                    j={3}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2626"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2625"
                                                                                    r={0}
                                                                                    cx="-61.54842556022716"
                                                                                    cy="35.53500006539483"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={4}
                                                                                    j={4}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2628"
                                                                                className="apexcharts-series-markers"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2627"
                                                                                    r={0}
                                                                                    cx="-102.58070926704535"
                                                                                    cy="-59.22500010899127"
                                                                                    className="apexcharts-marker"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    rel={5}
                                                                                    j={5}
                                                                                    index={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                            <g className="apexcharts-series-markers">
                                                                                <circle
                                                                                    id="SvgjsCircle2663"
                                                                                    r={0}
                                                                                    cx={0}
                                                                                    cy={0}
                                                                                    className="apexcharts-marker wt4b2isal"
                                                                                    stroke="#ffffff"
                                                                                    fill="#03c3ec"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={1}
                                                                                    strokeOpacity={1}
                                                                                    default-marker-size={0}
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g id="SvgjsG2576" className="apexcharts-yaxis" />
                                                                    <g
                                                                        id="SvgjsG2579"
                                                                        className="apexcharts-datalabels"
                                                                        data-realindex={0}
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2605"
                                                                        className="apexcharts-datalabels"
                                                                        data-realindex={1}
                                                                    />
                                                                </g>
                                                                <line
                                                                    id="SvgjsLine2657"
                                                                    x1={0}
                                                                    y1={0}
                                                                    x2="288.51875019073486"
                                                                    y2={0}
                                                                    stroke="#b6b6b6"
                                                                    strokeDasharray={0}
                                                                    strokeWidth={1}
                                                                    strokeLinecap="butt"
                                                                    className="apexcharts-ycrosshairs"
                                                                />
                                                                <line
                                                                    id="SvgjsLine2658"
                                                                    x1={0}
                                                                    y1={0}
                                                                    x2="288.51875019073486"
                                                                    y2={0}
                                                                    strokeDasharray={0}
                                                                    strokeWidth={0}
                                                                    strokeLinecap="butt"
                                                                    className="apexcharts-ycrosshairs-hidden"
                                                                />
                                                                <g
                                                                    id="SvgjsG2659"
                                                                    className="apexcharts-yaxis-annotations"
                                                                />
                                                                <g
                                                                    id="SvgjsG2660"
                                                                    className="apexcharts-xaxis-annotations"
                                                                />
                                                                <g
                                                                    id="SvgjsG2661"
                                                                    className="apexcharts-point-annotations"
                                                                />
                                                            </g>
                                                            <g id="SvgjsG2571" className="apexcharts-annotations" />
                                                        </svg>
                                                        <div className="apexcharts-tooltip apexcharts-theme-light">
                                                            <div
                                                                className="apexcharts-tooltip-title"
                                                                style={{
                                                                    fontFamily: "Helvetica, Arial, sans-serif",
                                                                    fontSize: 12
                                                                }}
                                                            />
                                                            <div
                                                                className="apexcharts-tooltip-series-group"
                                                                style={{ order: 1 }}
                                                            >
                                                                <span
                                                                    className="apexcharts-tooltip-marker"
                                                                    style={{ backgroundColor: "rgb(105, 108, 255)" }}
                                                                />
                                                                <div
                                                                    className="apexcharts-tooltip-text"
                                                                    style={{
                                                                        fontFamily: "Helvetica, Arial, sans-serif",
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    <div className="apexcharts-tooltip-y-group">
                                                                        <span className="apexcharts-tooltip-text-y-label" />
                                                                        <span className="apexcharts-tooltip-text-y-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-goals-group">
                                                                        <span className="apexcharts-tooltip-text-goals-label" />
                                                                        <span className="apexcharts-tooltip-text-goals-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-z-group">
                                                                        <span className="apexcharts-tooltip-text-z-label" />
                                                                        <span className="apexcharts-tooltip-text-z-value" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className="apexcharts-tooltip-series-group"
                                                                style={{ order: 2 }}
                                                            >
                                                                <span
                                                                    className="apexcharts-tooltip-marker"
                                                                    style={{ backgroundColor: "rgb(3, 195, 236)" }}
                                                                />
                                                                <div
                                                                    className="apexcharts-tooltip-text"
                                                                    style={{
                                                                        fontFamily: "Helvetica, Arial, sans-serif",
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    <div className="apexcharts-tooltip-y-group">
                                                                        <span className="apexcharts-tooltip-text-y-label" />
                                                                        <span className="apexcharts-tooltip-text-y-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-goals-group">
                                                                        <span className="apexcharts-tooltip-text-goals-label" />
                                                                        <span className="apexcharts-tooltip-text-goals-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-z-group">
                                                                        <span className="apexcharts-tooltip-text-z-label" />
                                                                        <span className="apexcharts-tooltip-text-z-value" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                            <div className="apexcharts-yaxistooltip-text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="resize-triggers">
                                                    <div className="expand-trigger">
                                                        <div style={{ width: 371, height: 408 }} />
                                                    </div>
                                                    <div className="contract-trigger" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/ Performance */}
                                    {/* Conversion rate */}
                                    <div className="col-md-6 col-xxl-4 mb-6">
                                        <div className="card h-100">
                                            <div className="card-header d-flex justify-content-between">
                                                <div className="card-title mb-0">
                                                    <h5 className="mb-1 me-2">Conversion Rate</h5>
                                                    <p className="card-subtitle">Compared To Last Month</p>
                                                </div>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn text-muted p-0"
                                                        type="button"
                                                        id="conversionRate"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bx bx-dots-vertical-rounded bx-lg" />
                                                    </button>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="conversionRate"
                                                    >
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Select All
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Refresh
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Share
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body pt-4">
                                                <div
                                                    className="d-flex justify-content-between align-items-center mb-6"
                                                    style={{ position: "relative" }}
                                                >
                                                    <div className="d-flex flex-row align-items-center gap-2">
                                                        <h3 className="mb-0">8.72%</h3>
                                                        <small className="text-success">
                                                            <i className="bx bx-chevron-up bx-lg" />
                                                            4.8%
                                                        </small>
                                                    </div>
                                                    <div id="conversionRateChart" style={{ minHeight: 80 }}>
                                                        <div
                                                            id="apexcharts63tduewf"
                                                            className="apexcharts-canvas apexcharts63tduewf apexcharts-theme-light"
                                                            style={{ width: 140, height: 80 }}
                                                        >
                                                            <svg
                                                                id="SvgjsSvg2664"
                                                                width={140}
                                                                height={80}
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                version="1.1"
                                                                xmlnsXlink="http://www.w3.org/1999/xlink"

                                                                className="apexcharts-svg"
                                                                xmlns-data="ApexChartsNS"
                                                                transform="translate(0, 0)"
                                                                style={{ background: "transparent" }}
                                                            >
                                                                <g
                                                                    id="SvgjsG2666"
                                                                    className="apexcharts-inner apexcharts-graphical"
                                                                    transform="translate(0, 0)"
                                                                >
                                                                    <defs id="SvgjsDefs2665">
                                                                        <clipPath id="gridRectMask63tduewf">
                                                                            <rect
                                                                                id="SvgjsRect2671"
                                                                                width={141}
                                                                                height={85}
                                                                                x="-4.5"
                                                                                y="-2.5"
                                                                                rx={0}
                                                                                ry={0}
                                                                                opacity={1}
                                                                                strokeWidth={0}
                                                                                stroke="none"
                                                                                strokeDasharray={0}
                                                                                fill="#fff"
                                                                            />
                                                                        </clipPath>
                                                                        <clipPath id="forecastMask63tduewf" />
                                                                        <clipPath id="nonForecastMask63tduewf" />
                                                                        <clipPath id="gridRectMarkerMask63tduewf">
                                                                            <rect
                                                                                id="SvgjsRect2672"
                                                                                width={160}
                                                                                height={108}
                                                                                x={-14}
                                                                                y={-14}
                                                                                rx={0}
                                                                                ry={0}
                                                                                opacity={1}
                                                                                strokeWidth={0}
                                                                                stroke="none"
                                                                                strokeDasharray={0}
                                                                                fill="#fff"
                                                                            />
                                                                        </clipPath>
                                                                        <filter
                                                                            id="SvgjsFilter2685"
                                                                            filterUnits="userSpaceOnUse"
                                                                            width="200%"
                                                                            height="200%"
                                                                            x="-50%"
                                                                            y="-50%"
                                                                        >
                                                                            <feFlood
                                                                                id="SvgjsFeFlood2686"
                                                                                floodColor="#696cff"
                                                                                floodOpacity="0.15"
                                                                                result="SvgjsFeFlood2686Out"
                                                                                in="SourceGraphic"
                                                                            />
                                                                            <feComposite
                                                                                id="SvgjsFeComposite2687"
                                                                                in="SvgjsFeFlood2686Out"
                                                                                in2="SourceAlpha"
                                                                                operator="in"
                                                                                result="SvgjsFeComposite2687Out"
                                                                            />
                                                                            <feOffset
                                                                                id="SvgjsFeOffset2688"
                                                                                dx={5}
                                                                                dy={10}
                                                                                result="SvgjsFeOffset2688Out"
                                                                                in="SvgjsFeComposite2687Out"
                                                                            />
                                                                            <feGaussianBlur
                                                                                id="SvgjsFeGaussianBlur2689"
                                                                                stdDeviation={3}
                                                                                result="SvgjsFeGaussianBlur2689Out"
                                                                                in="SvgjsFeOffset2688Out"
                                                                            />
                                                                            <feMerge
                                                                                id="SvgjsFeMerge2690"
                                                                                result="SvgjsFeMerge2690Out"
                                                                                in="SourceGraphic"
                                                                            >
                                                                                <feMergeNode
                                                                                    id="SvgjsFeMergeNode2691"
                                                                                    in="SvgjsFeGaussianBlur2689Out"
                                                                                />
                                                                                <feMergeNode
                                                                                    id="SvgjsFeMergeNode2692"
                                                                                    in="[object Arguments]"
                                                                                />
                                                                            </feMerge>
                                                                            <feBlend
                                                                                id="SvgjsFeBlend2693"
                                                                                in="SourceGraphic"
                                                                                in2="SvgjsFeMerge2690Out"
                                                                                mode="normal"
                                                                                result="SvgjsFeBlend2693Out"
                                                                            />
                                                                        </filter>
                                                                    </defs>
                                                                    <line
                                                                        id="SvgjsLine2670"
                                                                        x1={0}
                                                                        y1={0}
                                                                        x2={0}
                                                                        y2={80}
                                                                        stroke="#b6b6b6"
                                                                        strokeDasharray={3}
                                                                        strokeLinecap="butt"
                                                                        className="apexcharts-xcrosshairs"
                                                                        x={0}
                                                                        y={0}
                                                                        width={1}
                                                                        height={80}
                                                                        fill="#b1b9c4"
                                                                        filter="none"
                                                                        fillOpacity="0.9"
                                                                        strokeWidth={1}
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2694"
                                                                        className="apexcharts-xaxis"
                                                                        transform="translate(0, 0)"
                                                                    >
                                                                        <g
                                                                            id="SvgjsG2695"
                                                                            className="apexcharts-xaxis-texts-g"
                                                                            transform="translate(0, -4)"
                                                                        />
                                                                    </g>
                                                                    <g id="SvgjsG2701" className="apexcharts-grid">
                                                                        <g
                                                                            id="SvgjsG2702"
                                                                            className="apexcharts-gridlines-horizontal"
                                                                            style={{ display: "none" }}
                                                                        >
                                                                            <line
                                                                                id="SvgjsLine2704"
                                                                                x1={0}
                                                                                y1={0}
                                                                                x2={132}
                                                                                y2={0}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2705"
                                                                                x1={0}
                                                                                y1={16}
                                                                                x2={132}
                                                                                y2={16}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2706"
                                                                                x1={0}
                                                                                y1={32}
                                                                                x2={132}
                                                                                y2={32}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2707"
                                                                                x1={0}
                                                                                y1={48}
                                                                                x2={132}
                                                                                y2={48}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2708"
                                                                                x1={0}
                                                                                y1={64}
                                                                                x2={132}
                                                                                y2={64}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2709"
                                                                                x1={0}
                                                                                y1={80}
                                                                                x2={132}
                                                                                y2={80}
                                                                                stroke="#e0e0e0"
                                                                                strokeDasharray={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-gridline"
                                                                            />
                                                                        </g>
                                                                        <g
                                                                            id="SvgjsG2703"
                                                                            className="apexcharts-gridlines-vertical"
                                                                            style={{ display: "none" }}
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2711"
                                                                            x1={0}
                                                                            y1={80}
                                                                            x2={132}
                                                                            y2={80}
                                                                            stroke="transparent"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2710"
                                                                            x1={0}
                                                                            y1={1}
                                                                            x2={0}
                                                                            y2={80}
                                                                            stroke="transparent"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                        />
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2673"
                                                                        className="apexcharts-line-series apexcharts-plot-series"
                                                                    >
                                                                        <g
                                                                            id="SvgjsG2674"
                                                                            className="apexcharts-series"
                                                                            seriesname="seriesx1"
                                                                            data-longestseries="true"
                                                                            rel={1}
                                                                            data-realindex={0}
                                                                        >
                                                                            <path
                                                                                id="SvgjsPath2684"
                                                                                d="M 0 70.93333333333334C 15.399999999999999 70.93333333333334 28.6 32 44 32C 59.4 32 72.6 58.66666666666667 88 58.66666666666667C 103.4 58.66666666666667 116.6 13.333333333333343 132 13.333333333333343"
                                                                                fill="none"
                                                                                fillOpacity={1}
                                                                                stroke="rgba(105,108,255,0.85)"
                                                                                strokeOpacity={1}
                                                                                strokeLinecap="butt"
                                                                                strokeWidth={5}
                                                                                strokeDasharray={0}
                                                                                className="apexcharts-line"
                                                                                index={0}
                                                                                clipPath="url(#gridRectMask63tduewf)"
                                                                                filter="url(#SvgjsFilter2685)"
                                                                                pathto="M 0 70.93333333333334C 15.399999999999999 70.93333333333334 28.6 32 44 32C 59.4 32 72.6 58.66666666666667 88 58.66666666666667C 103.4 58.66666666666667 116.6 13.333333333333343 132 13.333333333333343"
                                                                                pathfrom="M -1 144L -1 144L 44 144L 88 144L 132 144"
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2675"
                                                                                className="apexcharts-series-markers-wrap"
                                                                                data-realindex={0}
                                                                            >
                                                                                <g
                                                                                    id="SvgjsG2677"
                                                                                    className="apexcharts-series-markers"
                                                                                    clipPath="url(#gridRectMarkerMask63tduewf)"
                                                                                >
                                                                                    <circle
                                                                                        id="SvgjsCircle2678"
                                                                                        r={6}
                                                                                        cx={0}
                                                                                        cy="70.93333333333334"
                                                                                        className="apexcharts-marker no-pointer-events wl8cns1wk"
                                                                                        stroke="transparent"
                                                                                        fill="transparent"
                                                                                        fillOpacity={1}
                                                                                        strokeWidth={4}
                                                                                        strokeOpacity="0.9"
                                                                                        rel={0}
                                                                                        j={0}
                                                                                        index={0}
                                                                                        default-marker-size={6}
                                                                                    />
                                                                                    <circle
                                                                                        id="SvgjsCircle2679"
                                                                                        r={6}
                                                                                        cx={44}
                                                                                        cy={32}
                                                                                        className="apexcharts-marker no-pointer-events w4mouticd"
                                                                                        stroke="transparent"
                                                                                        fill="transparent"
                                                                                        fillOpacity={1}
                                                                                        strokeWidth={4}
                                                                                        strokeOpacity="0.9"
                                                                                        rel={1}
                                                                                        j={1}
                                                                                        index={0}
                                                                                        default-marker-size={6}
                                                                                    />
                                                                                </g>
                                                                                <g
                                                                                    id="SvgjsG2680"
                                                                                    className="apexcharts-series-markers"
                                                                                    clipPath="url(#gridRectMarkerMask63tduewf)"
                                                                                >
                                                                                    <circle
                                                                                        id="SvgjsCircle2681"
                                                                                        r={6}
                                                                                        cx={88}
                                                                                        cy="58.66666666666667"
                                                                                        className="apexcharts-marker no-pointer-events w2jd5pm7z"
                                                                                        stroke="transparent"
                                                                                        fill="transparent"
                                                                                        fillOpacity={1}
                                                                                        strokeWidth={4}
                                                                                        strokeOpacity="0.9"
                                                                                        rel={2}
                                                                                        j={2}
                                                                                        index={0}
                                                                                        default-marker-size={6}
                                                                                    />
                                                                                </g>
                                                                                <g
                                                                                    id="SvgjsG2682"
                                                                                    className="apexcharts-series-markers"
                                                                                    clipPath="url(#gridRectMarkerMask63tduewf)"
                                                                                >
                                                                                    <circle
                                                                                        id="SvgjsCircle2683"
                                                                                        r={6}
                                                                                        cx={132}
                                                                                        cy="13.333333333333343"
                                                                                        className="apexcharts-marker no-pointer-events we81f6etqg"
                                                                                        stroke="#696cff"
                                                                                        fill="#ffffff"
                                                                                        fillOpacity={1}
                                                                                        strokeWidth={4}
                                                                                        strokeOpacity="0.9"
                                                                                        rel={3}
                                                                                        j={3}
                                                                                        index={0}
                                                                                        default-marker-size={6}
                                                                                    />
                                                                                </g>
                                                                            </g>
                                                                        </g>
                                                                        <g
                                                                            id="SvgjsG2676"
                                                                            className="apexcharts-datalabels"
                                                                            data-realindex={0}
                                                                        />
                                                                    </g>
                                                                    <line
                                                                        id="SvgjsLine2712"
                                                                        x1={0}
                                                                        y1={0}
                                                                        x2={132}
                                                                        y2={0}
                                                                        stroke="#b6b6b6"
                                                                        strokeDasharray={0}
                                                                        strokeWidth={1}
                                                                        strokeLinecap="butt"
                                                                        className="apexcharts-ycrosshairs"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2713"
                                                                        x1={0}
                                                                        y1={0}
                                                                        x2={132}
                                                                        y2={0}
                                                                        strokeDasharray={0}
                                                                        strokeWidth={0}
                                                                        strokeLinecap="butt"
                                                                        className="apexcharts-ycrosshairs-hidden"
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2714"
                                                                        className="apexcharts-yaxis-annotations"
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2715"
                                                                        className="apexcharts-xaxis-annotations"
                                                                    />
                                                                    <g
                                                                        id="SvgjsG2716"
                                                                        className="apexcharts-point-annotations"
                                                                    />
                                                                </g>
                                                                <rect
                                                                    id="SvgjsRect2669"
                                                                    width={0}
                                                                    height={0}
                                                                    x={0}
                                                                    y={0}
                                                                    rx={0}
                                                                    ry={0}
                                                                    opacity={1}
                                                                    strokeWidth={0}
                                                                    stroke="none"
                                                                    strokeDasharray={0}
                                                                    fill="#fefefe"
                                                                />
                                                                <g
                                                                    id="SvgjsG2700"
                                                                    className="apexcharts-yaxis"
                                                                    rel={0}
                                                                    transform="translate(-18, 0)"
                                                                />
                                                                <g id="SvgjsG2667" className="apexcharts-annotations" />
                                                            </svg>
                                                            <div
                                                                className="apexcharts-legend"
                                                                style={{ maxHeight: 40 }}
                                                            />
                                                            <div className="apexcharts-tooltip apexcharts-theme-light">
                                                                <div
                                                                    className="apexcharts-tooltip-title"
                                                                    style={{
                                                                        fontFamily: "Helvetica, Arial, sans-serif",
                                                                        fontSize: 12
                                                                    }}
                                                                />
                                                                <div
                                                                    className="apexcharts-tooltip-series-group"
                                                                    style={{ order: 1 }}
                                                                >
                                                                    <span
                                                                        className="apexcharts-tooltip-marker"
                                                                        style={{ backgroundColor: "rgb(105, 108, 255)" }}
                                                                    />
                                                                    <div
                                                                        className="apexcharts-tooltip-text"
                                                                        style={{
                                                                            fontFamily: "Helvetica, Arial, sans-serif",
                                                                            fontSize: 12
                                                                        }}
                                                                    >
                                                                        <div className="apexcharts-tooltip-y-group">
                                                                            <span className="apexcharts-tooltip-text-y-label" />
                                                                            <span className="apexcharts-tooltip-text-y-value" />
                                                                        </div>
                                                                        <div className="apexcharts-tooltip-goals-group">
                                                                            <span className="apexcharts-tooltip-text-goals-label" />
                                                                            <span className="apexcharts-tooltip-text-goals-value" />
                                                                        </div>
                                                                        <div className="apexcharts-tooltip-z-group">
                                                                            <span className="apexcharts-tooltip-text-z-label" />
                                                                            <span className="apexcharts-tooltip-text-z-value" />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                                <div className="apexcharts-yaxistooltip-text" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="resize-triggers">
                                                        <div className="expand-trigger">
                                                            <div style={{ width: 323, height: 81 }} />
                                                        </div>
                                                        <div className="contract-trigger" />
                                                    </div>
                                                </div>
                                                <ul className="p-0 m-0">
                                                    <li className="d-flex mb-6">
                                                        <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <h6 className="mb-0 fw-normal">Impressions</h6>
                                                                <small>12.4k Visits</small>
                                                            </div>
                                                            <div className="user-progress">
                                                                <i className="bx bx-lg bx-up-arrow-alt text-success me-2" />{" "}
                                                                <span>12.8%</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mb-6">
                                                        <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <h6 className="mb-0 fw-normal">Added To Cart</h6>
                                                                <small>32 Product in cart</small>
                                                            </div>
                                                            <div className="user-progress">
                                                                <i className="bx bx-lg bx-down-arrow-alt text-danger me-2" />{" "}
                                                                <span>- 8.5% </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex mb-6">
                                                        <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <h6 className="mb-0 fw-normal">Checkout</h6>
                                                                <small>21 Products checkout</small>
                                                            </div>
                                                            <div className="user-progress">
                                                                <i className="bx bx-lg bx-up-arrow-alt text-success me-2" />{" "}
                                                                <span>9.12%</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li className="d-flex">
                                                        <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
                                                            <div className="me-2">
                                                                <h6 className="mb-0 fw-normal">Purchased</h6>
                                                                <small>12 Orders</small>
                                                            </div>
                                                            <div className="user-progress">
                                                                <i className="bx bx-lg bx-up-arrow-alt text-success me-2" />{" "}
                                                                <span>2.83%</span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/ Conversion rate */}
                                    <div className="col-md-12 col-xxl-4">
                                        <div className="row">
                                            <div className="col-12 col-sm-6 col-md-3 col-lg-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <div className="card-title d-flex align-items-start justify-content-between mb-4">
                                                            <div className="avatar flex-shrink-0">
                                                                <img
                                                                    src="../../assets/img/icons/unicons/computer.png"
                                                                    alt="computer"
                                                                    className="rounded"
                                                                />
                                                            </div>
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn p-0"
                                                                    type="button"
                                                                    id="cardOpt5"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-haspopup="true"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="bx bx-dots-vertical-rounded text-muted" />
                                                                </button>
                                                                <div
                                                                    className="dropdown-menu dropdown-menu-end"
                                                                    aria-labelledby="cardOpt5"
                                                                >
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        View More
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="mb-1">Revenue</p>
                                                        <h4 className="card-title mb-3">$42,389</h4>
                                                        <small className="text-success fw-medium">
                                                            <i className="bx bx-up-arrow-alt" /> +52.18%
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-3 col-lg-6 mb-6">
                                                <div className="card h-100">
                                                    <div className="card-body">
                                                        <span className="d-block fw-medium mb-1">Sales</span>
                                                        <h4 className="card-title mb-3">482k</h4>
                                                        <span className="badge bg-label-info mb-5">+34%</span>
                                                        <small className="d-block mb-1">Sales Target</small>
                                                        <div className="d-flex align-items-center">
                                                            <div className="progress w-75 me-2" style={{ height: 8 }}>
                                                                <div
                                                                    className="progress-bar bg-info shadow-none"
                                                                    style={{ width: "78%" }}
                                                                    role="progressbar"
                                                                    aria-valuenow={78}
                                                                    aria-valuemin={0}
                                                                    aria-valuemax={100}
                                                                />
                                                            </div>
                                                            <small>78%</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-12 mb-6">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <div
                                                            className="d-flex justify-content-between gap-6"
                                                            style={{ position: "relative" }}
                                                        >
                                                            <div className="d-flex align-items-start flex-column justify-content-between">
                                                                <div className="card-title">
                                                                    <h5 className="mb-0">Expenses</h5>
                                                                </div>
                                                                <div className="d-flex justify-content-between">
                                                                    <div className="mt-auto">
                                                                        <h4 className="mb-0">4,234</h4>
                                                                        <span className="text-danger text-nowrap fw-medium">
                                                                            <i className="bx bx-down-arrow-alt" /> 8.2%
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <span className="badge bg-label-secondary">
                                                                    2023 YEAR
                                                                </span>
                                                            </div>
                                                            <div id="expensesBarChart" style={{ minHeight: 205 }}>
                                                                <div
                                                                    id="apexchartsve1box9kk"
                                                                    className="apexcharts-canvas apexchartsve1box9kk apexcharts-theme-light"
                                                                    style={{ width: 208, height: 190 }}
                                                                >
                                                                    <svg
                                                                        id="SvgjsSvg2791"
                                                                        width={208}
                                                                        height={190}
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        version="1.1"
                                                                        xmlnsXlink="http://www.w3.org/1999/xlink"

                                                                        className="apexcharts-svg"
                                                                        xmlns-data="ApexChartsNS"
                                                                        transform="translate(0, 0)"
                                                                        style={{ background: "transparent" }}
                                                                    >
                                                                        <g
                                                                            id="SvgjsG2793"
                                                                            className="apexcharts-inner apexcharts-graphical"
                                                                            transform="translate(12, 20)"
                                                                        >
                                                                            <defs id="SvgjsDefs2792">
                                                                                <linearGradient
                                                                                    id="SvgjsLinearGradient2796"
                                                                                    x1={0}
                                                                                    y1={0}
                                                                                    x2={0}
                                                                                    y2={1}
                                                                                >
                                                                                    <stop
                                                                                        id="SvgjsStop2797"
                                                                                        stopOpacity="0.4"
                                                                                        stopColor="rgba(216,227,240,0.4)"
                                                                                        offset={0}
                                                                                    />
                                                                                    <stop
                                                                                        id="SvgjsStop2798"
                                                                                        stopOpacity="0.5"
                                                                                        stopColor="rgba(190,209,230,0.5)"
                                                                                        offset={1}
                                                                                    />
                                                                                    <stop
                                                                                        id="SvgjsStop2799"
                                                                                        stopOpacity="0.5"
                                                                                        stopColor="rgba(190,209,230,0.5)"
                                                                                        offset={1}
                                                                                    />
                                                                                </linearGradient>
                                                                                <clipPath id="gridRectMaskve1box9kk">
                                                                                    <rect
                                                                                        id="SvgjsRect2801"
                                                                                        width={192}
                                                                                        height={157}
                                                                                        x={-3}
                                                                                        y={-1}
                                                                                        rx={0}
                                                                                        ry={0}
                                                                                        opacity={1}
                                                                                        strokeWidth={0}
                                                                                        stroke="none"
                                                                                        strokeDasharray={0}
                                                                                        fill="#fff"
                                                                                    />
                                                                                </clipPath>
                                                                                <clipPath id="forecastMaskve1box9kk" />
                                                                                <clipPath id="nonForecastMaskve1box9kk" />
                                                                                <clipPath id="gridRectMarkerMaskve1box9kk">
                                                                                    <rect
                                                                                        id="SvgjsRect2802"
                                                                                        width={190}
                                                                                        height={159}
                                                                                        x={-2}
                                                                                        y={-2}
                                                                                        rx={0}
                                                                                        ry={0}
                                                                                        opacity={1}
                                                                                        strokeWidth={0}
                                                                                        stroke="none"
                                                                                        strokeDasharray={0}
                                                                                        fill="#fff"
                                                                                    />
                                                                                </clipPath>
                                                                            </defs>
                                                                            <rect
                                                                                id="SvgjsRect2800"
                                                                                width="7.44"
                                                                                height={155}
                                                                                x={0}
                                                                                y={0}
                                                                                rx={0}
                                                                                ry={0}
                                                                                opacity={1}
                                                                                strokeWidth={0}
                                                                                strokeDasharray={3}
                                                                                fill="url(#SvgjsLinearGradient2796)"
                                                                                className="apexcharts-xcrosshairs"
                                                                                y2={155}
                                                                                filter="none"
                                                                                fillOpacity="0.9"
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2828"
                                                                                className="apexcharts-xaxis"
                                                                                transform="translate(0, 0)"
                                                                            >
                                                                                <g
                                                                                    id="SvgjsG2829"
                                                                                    className="apexcharts-xaxis-texts-g"
                                                                                    transform="translate(0, -4)"
                                                                                />
                                                                            </g>
                                                                            <g id="SvgjsG2838" className="apexcharts-grid">
                                                                                <g
                                                                                    id="SvgjsG2839"
                                                                                    className="apexcharts-gridlines-horizontal"
                                                                                    style={{ display: "none" }}
                                                                                >
                                                                                    <line
                                                                                        id="SvgjsLine2841"
                                                                                        x1={0}
                                                                                        y1={0}
                                                                                        x2={186}
                                                                                        y2={0}
                                                                                        stroke="#e0e0e0"
                                                                                        strokeDasharray={0}
                                                                                        strokeLinecap="butt"
                                                                                        className="apexcharts-gridline"
                                                                                    />
                                                                                    <line
                                                                                        id="SvgjsLine2842"
                                                                                        x1={0}
                                                                                        y1="38.75"
                                                                                        x2={186}
                                                                                        y2="38.75"
                                                                                        stroke="#e0e0e0"
                                                                                        strokeDasharray={0}
                                                                                        strokeLinecap="butt"
                                                                                        className="apexcharts-gridline"
                                                                                    />
                                                                                    <line
                                                                                        id="SvgjsLine2843"
                                                                                        x1={0}
                                                                                        y1="77.5"
                                                                                        x2={186}
                                                                                        y2="77.5"
                                                                                        stroke="#e0e0e0"
                                                                                        strokeDasharray={0}
                                                                                        strokeLinecap="butt"
                                                                                        className="apexcharts-gridline"
                                                                                    />
                                                                                    <line
                                                                                        id="SvgjsLine2844"
                                                                                        x1={0}
                                                                                        y1="116.25"
                                                                                        x2={186}
                                                                                        y2="116.25"
                                                                                        stroke="#e0e0e0"
                                                                                        strokeDasharray={0}
                                                                                        strokeLinecap="butt"
                                                                                        className="apexcharts-gridline"
                                                                                    />
                                                                                    <line
                                                                                        id="SvgjsLine2845"
                                                                                        x1={0}
                                                                                        y1={155}
                                                                                        x2={186}
                                                                                        y2={155}
                                                                                        stroke="#e0e0e0"
                                                                                        strokeDasharray={0}
                                                                                        strokeLinecap="butt"
                                                                                        className="apexcharts-gridline"
                                                                                    />
                                                                                </g>
                                                                                <g
                                                                                    id="SvgjsG2840"
                                                                                    className="apexcharts-gridlines-vertical"
                                                                                    style={{ display: "none" }}
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2847"
                                                                                    x1={0}
                                                                                    y1={155}
                                                                                    x2={186}
                                                                                    y2={155}
                                                                                    stroke="transparent"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                />
                                                                                <line
                                                                                    id="SvgjsLine2846"
                                                                                    x1={0}
                                                                                    y1={1}
                                                                                    x2={0}
                                                                                    y2={155}
                                                                                    stroke="transparent"
                                                                                    strokeDasharray={0}
                                                                                    strokeLinecap="butt"
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2803"
                                                                                className="apexcharts-bar-series apexcharts-plot-series"
                                                                            >
                                                                                <g
                                                                                    id="SvgjsG2804"
                                                                                    className="apexcharts-series"
                                                                                    seriesname={2021}
                                                                                    rel={1}
                                                                                    data-realindex={0}
                                                                                >
                                                                                    <path
                                                                                        id="SvgjsPath2806"
                                                                                        d="M 5.58 72.5L 5.58 53.4375Q 5.58 48.4375 10.58 48.4375L 6.02 48.4375Q 11.02 48.4375 11.02 53.4375L 11.02 53.4375L 11.02 72.5Q 11.02 77.5 6.02 77.5L 10.58 77.5Q 5.58 77.5 5.58 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 5.58 72.5L 5.58 53.4375Q 5.58 48.4375 10.58 48.4375L 6.02 48.4375Q 11.02 48.4375 11.02 53.4375L 11.02 53.4375L 11.02 72.5Q 11.02 77.5 6.02 77.5L 10.58 77.5Q 5.58 77.5 5.58 72.5z"
                                                                                        pathfrom="M 5.58 72.5L 5.58 72.5L 11.02 72.5L 11.02 72.5L 11.02 72.5L 11.02 72.5L 11.02 72.5L 5.58 72.5"
                                                                                        cy="48.4375"
                                                                                        cx="23.18"
                                                                                        j={0}
                                                                                        val={15}
                                                                                        barheight="29.0625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2807"
                                                                                        d="M 24.18 72.5L 24.18 10.8125Q 24.18 5.8125 29.18 5.8125L 24.62 5.8125Q 29.62 5.8125 29.62 10.8125L 29.62 10.8125L 29.62 72.5Q 29.62 77.5 24.62 77.5L 29.18 77.5Q 24.18 77.5 24.18 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 24.18 72.5L 24.18 10.8125Q 24.18 5.8125 29.18 5.8125L 24.62 5.8125Q 29.62 5.8125 29.62 10.8125L 29.62 10.8125L 29.62 72.5Q 29.62 77.5 24.62 77.5L 29.18 77.5Q 24.18 77.5 24.18 72.5z"
                                                                                        pathfrom="M 24.18 72.5L 24.18 72.5L 29.62 72.5L 29.62 72.5L 29.62 72.5L 29.62 72.5L 29.62 72.5L 24.18 72.5"
                                                                                        cy="5.8125"
                                                                                        cx="41.78"
                                                                                        j={1}
                                                                                        val={37}
                                                                                        barheight="71.6875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2808"
                                                                                        d="M 42.78 72.5L 42.78 55.375Q 42.78 50.375 47.78 50.375L 43.22 50.375Q 48.22 50.375 48.22 55.375L 48.22 55.375L 48.22 72.5Q 48.22 77.5 43.22 77.5L 47.78 77.5Q 42.78 77.5 42.78 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 42.78 72.5L 42.78 55.375Q 42.78 50.375 47.78 50.375L 43.22 50.375Q 48.22 50.375 48.22 55.375L 48.22 55.375L 48.22 72.5Q 48.22 77.5 43.22 77.5L 47.78 77.5Q 42.78 77.5 42.78 72.5z"
                                                                                        pathfrom="M 42.78 72.5L 42.78 72.5L 48.22 72.5L 48.22 72.5L 48.22 72.5L 48.22 72.5L 48.22 72.5L 42.78 72.5"
                                                                                        cy="50.375"
                                                                                        cx="60.38"
                                                                                        j={2}
                                                                                        val={14}
                                                                                        barheight="27.125"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2809"
                                                                                        d="M 61.38 72.5L 61.38 24.375Q 61.38 19.375 66.38 19.375L 61.82000000000001 19.375Q 66.82000000000001 19.375 66.82000000000001 24.375L 66.82000000000001 24.375L 66.82000000000001 72.5Q 66.82000000000001 77.5 61.82000000000001 77.5L 66.38 77.5Q 61.38 77.5 61.38 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 61.38 72.5L 61.38 24.375Q 61.38 19.375 66.38 19.375L 61.82000000000001 19.375Q 66.82000000000001 19.375 66.82000000000001 24.375L 66.82000000000001 24.375L 66.82000000000001 72.5Q 66.82000000000001 77.5 61.82000000000001 77.5L 66.38 77.5Q 61.38 77.5 61.38 72.5z"
                                                                                        pathfrom="M 61.38 72.5L 61.38 72.5L 66.82000000000001 72.5L 66.82000000000001 72.5L 66.82000000000001 72.5L 66.82000000000001 72.5L 66.82000000000001 72.5L 61.38 72.5"
                                                                                        cy="19.375"
                                                                                        cx="78.98"
                                                                                        j={3}
                                                                                        val={30}
                                                                                        barheight="58.125"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2810"
                                                                                        d="M 79.98 72.5L 79.98 8.875Q 79.98 3.875 84.98 3.875L 80.42 3.875Q 85.42 3.875 85.42 8.875L 85.42 8.875L 85.42 72.5Q 85.42 77.5 80.42 77.5L 84.98 77.5Q 79.98 77.5 79.98 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 79.98 72.5L 79.98 8.875Q 79.98 3.875 84.98 3.875L 80.42 3.875Q 85.42 3.875 85.42 8.875L 85.42 8.875L 85.42 72.5Q 85.42 77.5 80.42 77.5L 84.98 77.5Q 79.98 77.5 79.98 72.5z"
                                                                                        pathfrom="M 79.98 72.5L 79.98 72.5L 85.42 72.5L 85.42 72.5L 85.42 72.5L 85.42 72.5L 85.42 72.5L 79.98 72.5"
                                                                                        cy="3.875"
                                                                                        cx="97.58000000000001"
                                                                                        j={4}
                                                                                        val={38}
                                                                                        barheight="73.625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2811"
                                                                                        d="M 98.58000000000001 72.5L 98.58000000000001 24.375Q 98.58000000000001 19.375 103.58000000000001 19.375L 99.02000000000001 19.375Q 104.02000000000001 19.375 104.02000000000001 24.375L 104.02000000000001 24.375L 104.02000000000001 72.5Q 104.02000000000001 77.5 99.02000000000001 77.5L 103.58000000000001 77.5Q 98.58000000000001 77.5 98.58000000000001 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 98.58000000000001 72.5L 98.58000000000001 24.375Q 98.58000000000001 19.375 103.58000000000001 19.375L 99.02000000000001 19.375Q 104.02000000000001 19.375 104.02000000000001 24.375L 104.02000000000001 24.375L 104.02000000000001 72.5Q 104.02000000000001 77.5 99.02000000000001 77.5L 103.58000000000001 77.5Q 98.58000000000001 77.5 98.58000000000001 72.5z"
                                                                                        pathfrom="M 98.58000000000001 72.5L 98.58000000000001 72.5L 104.02000000000001 72.5L 104.02000000000001 72.5L 104.02000000000001 72.5L 104.02000000000001 72.5L 104.02000000000001 72.5L 98.58000000000001 72.5"
                                                                                        cy="19.375"
                                                                                        cx="116.18"
                                                                                        j={5}
                                                                                        val={30}
                                                                                        barheight="58.125"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2812"
                                                                                        d="M 117.18 72.5L 117.18 43.75Q 117.18 38.75 122.18 38.75L 117.62 38.75Q 122.62 38.75 122.62 43.75L 122.62 43.75L 122.62 72.5Q 122.62 77.5 117.62 77.5L 122.18 77.5Q 117.18 77.5 117.18 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 117.18 72.5L 117.18 43.75Q 117.18 38.75 122.18 38.75L 117.62 38.75Q 122.62 38.75 122.62 43.75L 122.62 43.75L 122.62 72.5Q 122.62 77.5 117.62 77.5L 122.18 77.5Q 117.18 77.5 117.18 72.5z"
                                                                                        pathfrom="M 117.18 72.5L 117.18 72.5L 122.62 72.5L 122.62 72.5L 122.62 72.5L 122.62 72.5L 122.62 72.5L 117.18 72.5"
                                                                                        cy="38.75"
                                                                                        cx="134.78"
                                                                                        j={6}
                                                                                        val={20}
                                                                                        barheight="38.75"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2813"
                                                                                        d="M 135.78 72.5L 135.78 57.3125Q 135.78 52.3125 140.78 52.3125L 136.22 52.3125Q 141.22 52.3125 141.22 57.3125L 141.22 57.3125L 141.22 72.5Q 141.22 77.5 136.22 77.5L 140.78 77.5Q 135.78 77.5 135.78 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 135.78 72.5L 135.78 57.3125Q 135.78 52.3125 140.78 52.3125L 136.22 52.3125Q 141.22 52.3125 141.22 57.3125L 141.22 57.3125L 141.22 72.5Q 141.22 77.5 136.22 77.5L 140.78 77.5Q 135.78 77.5 135.78 72.5z"
                                                                                        pathfrom="M 135.78 72.5L 135.78 72.5L 141.22 72.5L 141.22 72.5L 141.22 72.5L 141.22 72.5L 141.22 72.5L 135.78 72.5"
                                                                                        cy="52.3125"
                                                                                        cx="153.38"
                                                                                        j={7}
                                                                                        val={13}
                                                                                        barheight="25.1875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2814"
                                                                                        d="M 154.38 72.5L 154.38 55.375Q 154.38 50.375 159.38 50.375L 154.82 50.375Q 159.82 50.375 159.82 55.375L 159.82 55.375L 159.82 72.5Q 159.82 77.5 154.82 77.5L 159.38 77.5Q 154.38 77.5 154.38 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 154.38 72.5L 154.38 55.375Q 154.38 50.375 159.38 50.375L 154.82 50.375Q 159.82 50.375 159.82 55.375L 159.82 55.375L 159.82 72.5Q 159.82 77.5 154.82 77.5L 159.38 77.5Q 154.38 77.5 154.38 72.5z"
                                                                                        pathfrom="M 154.38 72.5L 154.38 72.5L 159.82 72.5L 159.82 72.5L 159.82 72.5L 159.82 72.5L 159.82 72.5L 154.38 72.5"
                                                                                        cy="50.375"
                                                                                        cx="171.98"
                                                                                        j={8}
                                                                                        val={14}
                                                                                        barheight="27.125"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2815"
                                                                                        d="M 172.98 72.5L 172.98 37.9375Q 172.98 32.9375 177.98 32.9375L 173.42 32.9375Q 178.42 32.9375 178.42 37.9375L 178.42 37.9375L 178.42 72.5Q 178.42 77.5 173.42 77.5L 177.98 77.5Q 172.98 77.5 172.98 72.5z"
                                                                                        fill="rgba(105,108,255,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={0}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 172.98 72.5L 172.98 37.9375Q 172.98 32.9375 177.98 32.9375L 173.42 32.9375Q 178.42 32.9375 178.42 37.9375L 178.42 37.9375L 178.42 72.5Q 178.42 77.5 173.42 77.5L 177.98 77.5Q 172.98 77.5 172.98 72.5z"
                                                                                        pathfrom="M 172.98 72.5L 172.98 72.5L 178.42 72.5L 178.42 72.5L 178.42 72.5L 178.42 72.5L 178.42 72.5L 172.98 72.5"
                                                                                        cy="32.9375"
                                                                                        cx="190.57999999999998"
                                                                                        j={9}
                                                                                        val={23}
                                                                                        barheight="44.5625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                </g>
                                                                                <g
                                                                                    id="SvgjsG2816"
                                                                                    className="apexcharts-series"
                                                                                    seriesname={2020}
                                                                                    rel={2}
                                                                                    data-realindex={1}
                                                                                >
                                                                                    <path
                                                                                        id="SvgjsPath2818"
                                                                                        d="M 5.58 87.5L 5.58 141.4375Q 5.58 146.4375 10.58 146.4375L 6.02 146.4375Q 11.02 146.4375 11.02 141.4375L 11.02 141.4375L 11.02 87.5Q 11.02 82.5 6.02 82.5L 10.58 82.5Q 5.58 82.5 5.58 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 5.58 87.5L 5.58 141.4375Q 5.58 146.4375 10.58 146.4375L 6.02 146.4375Q 11.02 146.4375 11.02 141.4375L 11.02 141.4375L 11.02 87.5Q 11.02 82.5 6.02 82.5L 10.58 82.5Q 5.58 82.5 5.58 87.5z"
                                                                                        pathfrom="M 5.58 87.5L 5.58 87.5L 11.02 87.5L 11.02 87.5L 11.02 87.5L 11.02 87.5L 11.02 87.5L 5.58 87.5"
                                                                                        cy="136.4375"
                                                                                        cx="23.18"
                                                                                        j={0}
                                                                                        val={-33}
                                                                                        barheight="-63.9375"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2819"
                                                                                        d="M 24.18 87.5L 24.18 122.0625Q 24.18 127.0625 29.18 127.0625L 24.62 127.0625Q 29.62 127.0625 29.62 122.0625L 29.62 122.0625L 29.62 87.5Q 29.62 82.5 24.62 82.5L 29.18 82.5Q 24.18 82.5 24.18 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 24.18 87.5L 24.18 122.0625Q 24.18 127.0625 29.18 127.0625L 24.62 127.0625Q 29.62 127.0625 29.62 122.0625L 29.62 122.0625L 29.62 87.5Q 29.62 82.5 24.62 82.5L 29.18 82.5Q 24.18 82.5 24.18 87.5z"
                                                                                        pathfrom="M 24.18 87.5L 24.18 87.5L 29.62 87.5L 29.62 87.5L 29.62 87.5L 29.62 87.5L 29.62 87.5L 24.18 87.5"
                                                                                        cy="117.0625"
                                                                                        cx="41.78"
                                                                                        j={1}
                                                                                        val={-23}
                                                                                        barheight="-44.5625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2820"
                                                                                        d="M 42.78 87.5L 42.78 133.6875Q 42.78 138.6875 47.78 138.6875L 43.22 138.6875Q 48.22 138.6875 48.22 133.6875L 48.22 133.6875L 48.22 87.5Q 48.22 82.5 43.22 82.5L 47.78 82.5Q 42.78 82.5 42.78 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 42.78 87.5L 42.78 133.6875Q 42.78 138.6875 47.78 138.6875L 43.22 138.6875Q 48.22 138.6875 48.22 133.6875L 48.22 133.6875L 48.22 87.5Q 48.22 82.5 43.22 82.5L 47.78 82.5Q 42.78 82.5 42.78 87.5z"
                                                                                        pathfrom="M 42.78 87.5L 42.78 87.5L 48.22 87.5L 48.22 87.5L 48.22 87.5L 48.22 87.5L 48.22 87.5L 42.78 87.5"
                                                                                        cy="128.6875"
                                                                                        cx="60.38"
                                                                                        j={2}
                                                                                        val={-29}
                                                                                        barheight="-56.1875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2821"
                                                                                        d="M 61.38 87.5L 61.38 118.1875Q 61.38 123.1875 66.38 123.1875L 61.82000000000001 123.1875Q 66.82000000000001 123.1875 66.82000000000001 118.1875L 66.82000000000001 118.1875L 66.82000000000001 87.5Q 66.82000000000001 82.5 61.82000000000001 82.5L 66.38 82.5Q 61.38 82.5 61.38 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 61.38 87.5L 61.38 118.1875Q 61.38 123.1875 66.38 123.1875L 61.82000000000001 123.1875Q 66.82000000000001 123.1875 66.82000000000001 118.1875L 66.82000000000001 118.1875L 66.82000000000001 87.5Q 66.82000000000001 82.5 61.82000000000001 82.5L 66.38 82.5Q 61.38 82.5 61.38 87.5z"
                                                                                        pathfrom="M 61.38 87.5L 61.38 87.5L 66.82000000000001 87.5L 66.82000000000001 87.5L 66.82000000000001 87.5L 66.82000000000001 87.5L 66.82000000000001 87.5L 61.38 87.5"
                                                                                        cy="113.1875"
                                                                                        cx="78.98"
                                                                                        j={3}
                                                                                        val={-21}
                                                                                        barheight="-40.6875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2822"
                                                                                        d="M 79.98 87.5L 79.98 125.9375Q 79.98 130.9375 84.98 130.9375L 80.42 130.9375Q 85.42 130.9375 85.42 125.9375L 85.42 125.9375L 85.42 87.5Q 85.42 82.5 80.42 82.5L 84.98 82.5Q 79.98 82.5 79.98 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 79.98 87.5L 79.98 125.9375Q 79.98 130.9375 84.98 130.9375L 80.42 130.9375Q 85.42 130.9375 85.42 125.9375L 85.42 125.9375L 85.42 87.5Q 85.42 82.5 80.42 82.5L 84.98 82.5Q 79.98 82.5 79.98 87.5z"
                                                                                        pathfrom="M 79.98 87.5L 79.98 87.5L 85.42 87.5L 85.42 87.5L 85.42 87.5L 85.42 87.5L 85.42 87.5L 79.98 87.5"
                                                                                        cy="120.9375"
                                                                                        cx="97.58000000000001"
                                                                                        j={4}
                                                                                        val={-25}
                                                                                        barheight="-48.4375"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2823"
                                                                                        d="M 98.58000000000001 87.5L 98.58000000000001 118.1875Q 98.58000000000001 123.1875 103.58000000000001 123.1875L 99.02000000000001 123.1875Q 104.02000000000001 123.1875 104.02000000000001 118.1875L 104.02000000000001 118.1875L 104.02000000000001 87.5Q 104.02000000000001 82.5 99.02000000000001 82.5L 103.58000000000001 82.5Q 98.58000000000001 82.5 98.58000000000001 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 98.58000000000001 87.5L 98.58000000000001 118.1875Q 98.58000000000001 123.1875 103.58000000000001 123.1875L 99.02000000000001 123.1875Q 104.02000000000001 123.1875 104.02000000000001 118.1875L 104.02000000000001 118.1875L 104.02000000000001 87.5Q 104.02000000000001 82.5 99.02000000000001 82.5L 103.58000000000001 82.5Q 98.58000000000001 82.5 98.58000000000001 87.5z"
                                                                                        pathfrom="M 98.58000000000001 87.5L 98.58000000000001 87.5L 104.02000000000001 87.5L 104.02000000000001 87.5L 104.02000000000001 87.5L 104.02000000000001 87.5L 104.02000000000001 87.5L 98.58000000000001 87.5"
                                                                                        cy="113.1875"
                                                                                        cx="116.18"
                                                                                        j={5}
                                                                                        val={-21}
                                                                                        barheight="-40.6875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2824"
                                                                                        d="M 117.18 87.5L 117.18 122.0625Q 117.18 127.0625 122.18 127.0625L 117.62 127.0625Q 122.62 127.0625 122.62 122.0625L 122.62 122.0625L 122.62 87.5Q 122.62 82.5 117.62 82.5L 122.18 82.5Q 117.18 82.5 117.18 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 117.18 87.5L 117.18 122.0625Q 117.18 127.0625 122.18 127.0625L 117.62 127.0625Q 122.62 127.0625 122.62 122.0625L 122.62 122.0625L 122.62 87.5Q 122.62 82.5 117.62 82.5L 122.18 82.5Q 117.18 82.5 117.18 87.5z"
                                                                                        pathfrom="M 117.18 87.5L 117.18 87.5L 122.62 87.5L 122.62 87.5L 122.62 87.5L 122.62 87.5L 122.62 87.5L 117.18 87.5"
                                                                                        cy="117.0625"
                                                                                        cx="134.78"
                                                                                        j={6}
                                                                                        val={-23}
                                                                                        barheight="-44.5625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2825"
                                                                                        d="M 135.78 87.5L 135.78 114.3125Q 135.78 119.3125 140.78 119.3125L 136.22 119.3125Q 141.22 119.3125 141.22 114.3125L 141.22 114.3125L 141.22 87.5Q 141.22 82.5 136.22 82.5L 140.78 82.5Q 135.78 82.5 135.78 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 135.78 87.5L 135.78 114.3125Q 135.78 119.3125 140.78 119.3125L 136.22 119.3125Q 141.22 119.3125 141.22 114.3125L 141.22 114.3125L 141.22 87.5Q 141.22 82.5 136.22 82.5L 140.78 82.5Q 135.78 82.5 135.78 87.5z"
                                                                                        pathfrom="M 135.78 87.5L 135.78 87.5L 141.22 87.5L 141.22 87.5L 141.22 87.5L 141.22 87.5L 141.22 87.5L 135.78 87.5"
                                                                                        cy="109.3125"
                                                                                        cx="153.38"
                                                                                        j={7}
                                                                                        val={-19}
                                                                                        barheight="-36.8125"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2826"
                                                                                        d="M 154.38 87.5L 154.38 149.1875Q 154.38 154.1875 159.38 154.1875L 154.82 154.1875Q 159.82 154.1875 159.82 149.1875L 159.82 149.1875L 159.82 87.5Q 159.82 82.5 154.82 82.5L 159.38 82.5Q 154.38 82.5 154.38 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 154.38 87.5L 154.38 149.1875Q 154.38 154.1875 159.38 154.1875L 154.82 154.1875Q 159.82 154.1875 159.82 149.1875L 159.82 149.1875L 159.82 87.5Q 159.82 82.5 154.82 82.5L 159.38 82.5Q 154.38 82.5 154.38 87.5z"
                                                                                        pathfrom="M 154.38 87.5L 154.38 87.5L 159.82 87.5L 159.82 87.5L 159.82 87.5L 159.82 87.5L 159.82 87.5L 154.38 87.5"
                                                                                        cy="144.1875"
                                                                                        cx="171.98"
                                                                                        j={8}
                                                                                        val={-37}
                                                                                        barheight="-71.6875"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                    <path
                                                                                        id="SvgjsPath2827"
                                                                                        d="M 172.98 87.5L 172.98 120.125Q 172.98 125.125 177.98 125.125L 173.42 125.125Q 178.42 125.125 178.42 120.125L 178.42 120.125L 178.42 87.5Q 178.42 82.5 173.42 82.5L 177.98 82.5Q 172.98 82.5 172.98 87.5z"
                                                                                        fill="rgba(255,171,0,1)"
                                                                                        fillOpacity={1}
                                                                                        stroke="#ffffff"
                                                                                        strokeOpacity={1}
                                                                                        strokeLinecap="round"
                                                                                        strokeWidth={2}
                                                                                        strokeDasharray={0}
                                                                                        className="apexcharts-bar-area"
                                                                                        index={1}
                                                                                        clipPath="url(#gridRectMaskve1box9kk)"
                                                                                        pathto="M 172.98 87.5L 172.98 120.125Q 172.98 125.125 177.98 125.125L 173.42 125.125Q 178.42 125.125 178.42 120.125L 178.42 120.125L 178.42 87.5Q 178.42 82.5 173.42 82.5L 177.98 82.5Q 172.98 82.5 172.98 87.5z"
                                                                                        pathfrom="M 172.98 87.5L 172.98 87.5L 178.42 87.5L 178.42 87.5L 178.42 87.5L 178.42 87.5L 178.42 87.5L 172.98 87.5"
                                                                                        cy="115.125"
                                                                                        cx="190.57999999999998"
                                                                                        j={9}
                                                                                        val={-22}
                                                                                        barheight="-42.625"
                                                                                        barwidth="7.44"
                                                                                    />
                                                                                </g>
                                                                                <g
                                                                                    id="SvgjsG2805"
                                                                                    className="apexcharts-datalabels"
                                                                                    data-realindex={0}
                                                                                />
                                                                                <g
                                                                                    id="SvgjsG2817"
                                                                                    className="apexcharts-datalabels"
                                                                                    data-realindex={1}
                                                                                />
                                                                            </g>
                                                                            <line
                                                                                id="SvgjsLine2848"
                                                                                x1={0}
                                                                                y1={0}
                                                                                x2={186}
                                                                                y2={0}
                                                                                stroke="#b6b6b6"
                                                                                strokeDasharray={0}
                                                                                strokeWidth={1}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-ycrosshairs"
                                                                            />
                                                                            <line
                                                                                id="SvgjsLine2849"
                                                                                x1={0}
                                                                                y1={0}
                                                                                x2={186}
                                                                                y2={0}
                                                                                strokeDasharray={0}
                                                                                strokeWidth={0}
                                                                                strokeLinecap="butt"
                                                                                className="apexcharts-ycrosshairs-hidden"
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2850"
                                                                                className="apexcharts-yaxis-annotations"
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2851"
                                                                                className="apexcharts-xaxis-annotations"
                                                                            />
                                                                            <g
                                                                                id="SvgjsG2852"
                                                                                className="apexcharts-point-annotations"
                                                                            />
                                                                        </g>
                                                                        <g
                                                                            id="SvgjsG2837"
                                                                            className="apexcharts-yaxis"
                                                                            rel={0}
                                                                            transform="translate(-18, 0)"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2794"
                                                                            className="apexcharts-annotations"
                                                                        />
                                                                    </svg>
                                                                    <div
                                                                        className="apexcharts-legend"
                                                                        style={{ maxHeight: 95 }}
                                                                    />
                                                                    <div className="apexcharts-tooltip apexcharts-theme-light">
                                                                        <div
                                                                            className="apexcharts-tooltip-title"
                                                                            style={{
                                                                                fontFamily: "Helvetica, Arial, sans-serif",
                                                                                fontSize: 12
                                                                            }}
                                                                        />
                                                                        <div
                                                                            className="apexcharts-tooltip-series-group"
                                                                            style={{ order: 1 }}
                                                                        >
                                                                            <span
                                                                                className="apexcharts-tooltip-marker"
                                                                                style={{ backgroundColor: "rgb(105, 108, 255)" }}
                                                                            />
                                                                            <div
                                                                                className="apexcharts-tooltip-text"
                                                                                style={{
                                                                                    fontFamily: "Helvetica, Arial, sans-serif",
                                                                                    fontSize: 12
                                                                                }}
                                                                            >
                                                                                <div className="apexcharts-tooltip-y-group">
                                                                                    <span className="apexcharts-tooltip-text-y-label" />
                                                                                    <span className="apexcharts-tooltip-text-y-value" />
                                                                                </div>
                                                                                <div className="apexcharts-tooltip-goals-group">
                                                                                    <span className="apexcharts-tooltip-text-goals-label" />
                                                                                    <span className="apexcharts-tooltip-text-goals-value" />
                                                                                </div>
                                                                                <div className="apexcharts-tooltip-z-group">
                                                                                    <span className="apexcharts-tooltip-text-z-label" />
                                                                                    <span className="apexcharts-tooltip-text-z-value" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="apexcharts-tooltip-series-group"
                                                                            style={{ order: 2 }}
                                                                        >
                                                                            <span
                                                                                className="apexcharts-tooltip-marker"
                                                                                style={{ backgroundColor: "rgb(255, 171, 0)" }}
                                                                            />
                                                                            <div
                                                                                className="apexcharts-tooltip-text"
                                                                                style={{
                                                                                    fontFamily: "Helvetica, Arial, sans-serif",
                                                                                    fontSize: 12
                                                                                }}
                                                                            >
                                                                                <div className="apexcharts-tooltip-y-group">
                                                                                    <span className="apexcharts-tooltip-text-y-label" />
                                                                                    <span className="apexcharts-tooltip-text-y-value" />
                                                                                </div>
                                                                                <div className="apexcharts-tooltip-goals-group">
                                                                                    <span className="apexcharts-tooltip-text-goals-label" />
                                                                                    <span className="apexcharts-tooltip-text-goals-value" />
                                                                                </div>
                                                                                <div className="apexcharts-tooltip-z-group">
                                                                                    <span className="apexcharts-tooltip-text-z-label" />
                                                                                    <span className="apexcharts-tooltip-text-z-value" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                                        <div className="apexcharts-yaxistooltip-text" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="resize-triggers">
                                                                <div className="expand-trigger">
                                                                    <div style={{ width: 323, height: 206 }} />
                                                                </div>
                                                                <div className="contract-trigger" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Total Balance */}
                                    <div className="col-lg-5 col-xxl-4">
                                        <div className="card h-100">
                                            <div className="card-header d-flex align-items-center justify-content-between">
                                                <h5 className="card-title m-0 me-2">Total Balance</h5>
                                                <div className="dropdown">
                                                    <button
                                                        className="btn p-0"
                                                        type="button"
                                                        id="totalBalance"
                                                        data-bs-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        <i className="bx bx-dots-vertical-rounded bx-lg text-muted" />
                                                    </button>
                                                    <div
                                                        className="dropdown-menu dropdown-menu-end"
                                                        aria-labelledby="totalBalance"
                                                    >
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last 28 Days
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last Month
                                                        </a>
                                                        <a className="dropdown-item" href="javascript:void(0);">
                                                            Last Year
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body pb-0" style={{ position: "relative" }}>
                                                <div className="row">
                                                    <div className="col d-flex">
                                                        <div className="me-3">
                                                            <span className="badge rounded-2 bg-label-warning p-2">
                                                                <i className="bx bx-wallet bx-lg text-warning" />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0">$2.54k</h6>
                                                            <small>Wallet</small>
                                                        </div>
                                                    </div>
                                                    <div className="col d-flex">
                                                        <div className="me-3">
                                                            <span className="badge rounded-2 bg-label-secondary p-2">
                                                                <i className="bx bx-dollar bx-lg text-secondary" />
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0">$4.2k</h6>
                                                            <small>Paypal</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="totalBalanceChart" style={{ minHeight: 245 }}>
                                                    <div
                                                        id="apexchartsnfunkdgt"
                                                        className="apexcharts-canvas apexchartsnfunkdgt apexcharts-theme-light"
                                                        style={{ width: 322, height: 245 }}
                                                    >
                                                        <svg
                                                            id="SvgjsSvg2717"
                                                            width={322}
                                                            height={245}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            version="1.1"
                                                            xmlnsXlink="http://www.w3.org/1999/xlink"

                                                            className="apexcharts-svg apexcharts-zoomable"
                                                            xmlns-data="ApexChartsNS"
                                                            transform="translate(0, 0)"
                                                            style={{ background: "transparent" }}
                                                        >
                                                            <g
                                                                id="SvgjsG2719"
                                                                className="apexcharts-inner apexcharts-graphical"
                                                                transform="translate(10, 20)"
                                                            >
                                                                <defs id="SvgjsDefs2718">
                                                                    <clipPath id="gridRectMasknfunkdgt">
                                                                        <rect
                                                                            id="SvgjsRect2724"
                                                                            width="308.51875019073486"
                                                                            height="180.70079907417298"
                                                                            x={-4}
                                                                            y={-2}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fff"
                                                                        />
                                                                    </clipPath>
                                                                    <clipPath id="forecastMasknfunkdgt" />
                                                                    <clipPath id="nonForecastMasknfunkdgt" />
                                                                    <clipPath id="gridRectMarkerMasknfunkdgt">
                                                                        <rect
                                                                            id="SvgjsRect2725"
                                                                            width="328.51875019073486"
                                                                            height="204.70079907417298"
                                                                            x={-14}
                                                                            y={-14}
                                                                            rx={0}
                                                                            ry={0}
                                                                            opacity={1}
                                                                            strokeWidth={0}
                                                                            stroke="none"
                                                                            strokeDasharray={0}
                                                                            fill="#fff"
                                                                        />
                                                                    </clipPath>
                                                                    <filter
                                                                        id="SvgjsFilter2742"
                                                                        filterUnits="userSpaceOnUse"
                                                                        width="200%"
                                                                        height="200%"
                                                                        x="-50%"
                                                                        y="-50%"
                                                                    >
                                                                        <feFlood
                                                                            id="SvgjsFeFlood2743"
                                                                            floodColor="#ffab00"
                                                                            floodOpacity="0.15"
                                                                            result="SvgjsFeFlood2743Out"
                                                                            in="SourceGraphic"
                                                                        />
                                                                        <feComposite
                                                                            id="SvgjsFeComposite2744"
                                                                            in="SvgjsFeFlood2743Out"
                                                                            in2="SourceAlpha"
                                                                            operator="in"
                                                                            result="SvgjsFeComposite2744Out"
                                                                        />
                                                                        <feOffset
                                                                            id="SvgjsFeOffset2745"
                                                                            dx={5}
                                                                            dy={10}
                                                                            result="SvgjsFeOffset2745Out"
                                                                            in="SvgjsFeComposite2744Out"
                                                                        />
                                                                        <feGaussianBlur
                                                                            id="SvgjsFeGaussianBlur2746"
                                                                            stdDeviation={3}
                                                                            result="SvgjsFeGaussianBlur2746Out"
                                                                            in="SvgjsFeOffset2745Out"
                                                                        />
                                                                        <feMerge
                                                                            id="SvgjsFeMerge2747"
                                                                            result="SvgjsFeMerge2747Out"
                                                                            in="SourceGraphic"
                                                                        >
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2748"
                                                                                in="SvgjsFeGaussianBlur2746Out"
                                                                            />
                                                                            <feMergeNode
                                                                                id="SvgjsFeMergeNode2749"
                                                                                in="[object Arguments]"
                                                                            />
                                                                        </feMerge>
                                                                        <feBlend
                                                                            id="SvgjsFeBlend2750"
                                                                            in="SourceGraphic"
                                                                            in2="SvgjsFeMerge2747Out"
                                                                            mode="normal"
                                                                            result="SvgjsFeBlend2750Out"
                                                                        />
                                                                    </filter>
                                                                </defs>
                                                                <line
                                                                    id="SvgjsLine2723"
                                                                    x1={0}
                                                                    y1={0}
                                                                    x2={0}
                                                                    y2="176.70079907417298"
                                                                    stroke="#b6b6b6"
                                                                    strokeDasharray={3}
                                                                    strokeLinecap="butt"
                                                                    className="apexcharts-xcrosshairs"
                                                                    x={0}
                                                                    y={0}
                                                                    width={1}
                                                                    height="176.70079907417298"
                                                                    fill="#b1b9c4"
                                                                    filter="none"
                                                                    fillOpacity="0.9"
                                                                    strokeWidth={1}
                                                                />
                                                                <g
                                                                    id="SvgjsG2751"
                                                                    className="apexcharts-xaxis"
                                                                    transform="translate(0, 0)"
                                                                >
                                                                    <g
                                                                        id="SvgjsG2752"
                                                                        className="apexcharts-xaxis-texts-g"
                                                                        transform="translate(0, -4)"
                                                                    >
                                                                        <text
                                                                            id="SvgjsText2754"
                                                                            fontFamily="Public Sans"
                                                                            x={0}
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2755">Jan</tspan>
                                                                            <title>Jan</title>
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2757"
                                                                            fontFamily="Public Sans"
                                                                            x="60.10375003814696"
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2758">Feb</tspan>
                                                                            <title>Feb</title>
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2760"
                                                                            fontFamily="Public Sans"
                                                                            x="120.20750007629394"
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2761">Mar</tspan>
                                                                            <title>Mar</title>
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2763"
                                                                            fontFamily="Public Sans"
                                                                            x="180.31125011444092"
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2764">Apr</tspan>
                                                                            <title>Apr</title>
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2766"
                                                                            fontFamily="Public Sans"
                                                                            x="240.4150001525879"
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2767">May</tspan>
                                                                            <title>May</title>
                                                                        </text>
                                                                        <text
                                                                            id="SvgjsText2769"
                                                                            fontFamily="Public Sans"
                                                                            x="300.5187501907349"
                                                                            y="205.70079907417298"
                                                                            textAnchor="middle"
                                                                            dominantBaseline="auto"
                                                                            fontSize="13px"
                                                                            fontWeight={400}
                                                                            fill="#a7acb2"
                                                                            className="apexcharts-text apexcharts-xaxis-label "
                                                                            style={{ fontFamily: '"Public Sans"' }}
                                                                        >
                                                                            <tspan id="SvgjsTspan2770">Jun</tspan>
                                                                            <title>Jun</title>
                                                                        </text>
                                                                    </g>
                                                                </g>
                                                                <g id="SvgjsG2773" className="apexcharts-grid">
                                                                    <g
                                                                        id="SvgjsG2774"
                                                                        className="apexcharts-gridlines-horizontal"
                                                                        style={{ display: "none" }}
                                                                    >
                                                                        <line
                                                                            id="SvgjsLine2776"
                                                                            x1={0}
                                                                            y1={0}
                                                                            x2="300.51875019073486"
                                                                            y2={0}
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2777"
                                                                            x1={0}
                                                                            y1="35.34015981483459"
                                                                            x2="300.51875019073486"
                                                                            y2="35.34015981483459"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2778"
                                                                            x1={0}
                                                                            y1="70.68031962966919"
                                                                            x2="300.51875019073486"
                                                                            y2="70.68031962966919"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2779"
                                                                            x1={0}
                                                                            y1="106.02047944450378"
                                                                            x2="300.51875019073486"
                                                                            y2="106.02047944450378"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2780"
                                                                            x1={0}
                                                                            y1="141.36063925933837"
                                                                            x2="300.51875019073486"
                                                                            y2="141.36063925933837"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                        <line
                                                                            id="SvgjsLine2781"
                                                                            x1={0}
                                                                            y1="176.70079907417295"
                                                                            x2="300.51875019073486"
                                                                            y2="176.70079907417295"
                                                                            stroke="#e0e0e0"
                                                                            strokeDasharray={0}
                                                                            strokeLinecap="butt"
                                                                            className="apexcharts-gridline"
                                                                        />
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2775"
                                                                        className="apexcharts-gridlines-vertical"
                                                                        style={{ display: "none" }}
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2783"
                                                                        x1={0}
                                                                        y1="176.70079907417298"
                                                                        x2="300.51875019073486"
                                                                        y2="176.70079907417298"
                                                                        stroke="transparent"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                    <line
                                                                        id="SvgjsLine2782"
                                                                        x1={0}
                                                                        y1={1}
                                                                        x2={0}
                                                                        y2="176.70079907417298"
                                                                        stroke="transparent"
                                                                        strokeDasharray={0}
                                                                        strokeLinecap="butt"
                                                                    />
                                                                </g>
                                                                <g
                                                                    id="SvgjsG2726"
                                                                    className="apexcharts-line-series apexcharts-plot-series"
                                                                >
                                                                    <g
                                                                        id="SvgjsG2727"
                                                                        className="apexcharts-series"
                                                                        seriesname="seriesx1"
                                                                        data-longestseries="true"
                                                                        rel={1}
                                                                        data-realindex={0}
                                                                    >
                                                                        <path
                                                                            id="SvgjsPath2741"
                                                                            d="M 0 150.54908081119538C 21.036312513351437 150.54908081119538 39.06743752479554 98.95244748153686 60.10375003814697 98.95244748153686C 81.1400625514984 98.95244748153686 99.1711875629425 134.29260729637144 120.20750007629394 134.29260729637144C 141.24381258964536 134.29260729637144 159.27493760108945 53.010239722251896 180.3112501144409 53.010239722251896C 201.34756262779234 53.010239722251896 219.37868763923643 102.48646346302033 240.41500015258788 102.48646346302033C 261.4513126659393 102.48646346302033 279.4824376773834 24.738111870384216 300.51875019073486 24.738111870384216"
                                                                            fill="none"
                                                                            fillOpacity={1}
                                                                            stroke="rgba(255,171,0,0.85)"
                                                                            strokeOpacity={1}
                                                                            strokeLinecap="butt"
                                                                            strokeWidth={4}
                                                                            strokeDasharray={0}
                                                                            className="apexcharts-line"
                                                                            index={0}
                                                                            clipPath="url(#gridRectMasknfunkdgt)"
                                                                            filter="url(#SvgjsFilter2742)"
                                                                            pathto="M 0 150.54908081119538C 21.036312513351437 150.54908081119538 39.06743752479554 98.95244748153686 60.10375003814697 98.95244748153686C 81.1400625514984 98.95244748153686 99.1711875629425 134.29260729637144 120.20750007629394 134.29260729637144C 141.24381258964536 134.29260729637144 159.27493760108945 53.010239722251896 180.3112501144409 53.010239722251896C 201.34756262779234 53.010239722251896 219.37868763923643 102.48646346302033 240.41500015258788 102.48646346302033C 261.4513126659393 102.48646346302033 279.4824376773834 24.738111870384216 300.51875019073486 24.738111870384216"
                                                                            pathfrom="M -1 247.38111870384216L -1 247.38111870384216L 60.10375003814697 247.38111870384216L 120.20750007629394 247.38111870384216L 180.3112501144409 247.38111870384216L 240.41500015258788 247.38111870384216L 300.51875019073486 247.38111870384216"
                                                                        />
                                                                        <g
                                                                            id="SvgjsG2728"
                                                                            className="apexcharts-series-markers-wrap"
                                                                            data-realindex={0}
                                                                        >
                                                                            <g
                                                                                id="SvgjsG2730"
                                                                                className="apexcharts-series-markers"
                                                                                clipPath="url(#gridRectMarkerMasknfunkdgt)"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2731"
                                                                                    r={6}
                                                                                    cx={0}
                                                                                    cy="150.54908081119538"
                                                                                    className="apexcharts-marker no-pointer-events wuwtyby1n"
                                                                                    stroke="transparent"
                                                                                    fill="transparent"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={0}
                                                                                    j={0}
                                                                                    index={0}
                                                                                    default-marker-size={6}
                                                                                />
                                                                                <circle
                                                                                    id="SvgjsCircle2732"
                                                                                    r={6}
                                                                                    cx="60.10375003814697"
                                                                                    cy="98.95244748153686"
                                                                                    className="apexcharts-marker no-pointer-events wzlnfxm0k"
                                                                                    stroke="transparent"
                                                                                    fill="transparent"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={1}
                                                                                    j={1}
                                                                                    index={0}
                                                                                    default-marker-size={6}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2733"
                                                                                className="apexcharts-series-markers"
                                                                                clipPath="url(#gridRectMarkerMasknfunkdgt)"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2734"
                                                                                    r={6}
                                                                                    cx="120.20750007629394"
                                                                                    cy="134.29260729637144"
                                                                                    className="apexcharts-marker no-pointer-events wp1poupul"
                                                                                    stroke="transparent"
                                                                                    fill="transparent"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={2}
                                                                                    j={2}
                                                                                    index={0}
                                                                                    default-marker-size={6}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2735"
                                                                                className="apexcharts-series-markers"
                                                                                clipPath="url(#gridRectMarkerMasknfunkdgt)"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2736"
                                                                                    r={6}
                                                                                    cx="180.3112501144409"
                                                                                    cy="53.010239722251896"
                                                                                    className="apexcharts-marker no-pointer-events wrinu22if"
                                                                                    stroke="transparent"
                                                                                    fill="transparent"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={3}
                                                                                    j={3}
                                                                                    index={0}
                                                                                    default-marker-size={6}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2737"
                                                                                className="apexcharts-series-markers"
                                                                                clipPath="url(#gridRectMarkerMasknfunkdgt)"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2738"
                                                                                    r={6}
                                                                                    cx="240.41500015258788"
                                                                                    cy="102.48646346302033"
                                                                                    className="apexcharts-marker no-pointer-events w64bra7hf"
                                                                                    stroke="transparent"
                                                                                    fill="transparent"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={4}
                                                                                    j={4}
                                                                                    index={0}
                                                                                    default-marker-size={6}
                                                                                />
                                                                            </g>
                                                                            <g
                                                                                id="SvgjsG2739"
                                                                                className="apexcharts-series-markers"
                                                                                clipPath="url(#gridRectMarkerMasknfunkdgt)"
                                                                            >
                                                                                <circle
                                                                                    id="SvgjsCircle2740"
                                                                                    r={8}
                                                                                    cx="300.51875019073486"
                                                                                    cy="24.738111870384216"
                                                                                    className="apexcharts-marker no-pointer-events womr2mmw8"
                                                                                    stroke="#ffab00"
                                                                                    fill="#ffffff"
                                                                                    fillOpacity={1}
                                                                                    strokeWidth={4}
                                                                                    strokeOpacity="0.9"
                                                                                    rel={5}
                                                                                    j={5}
                                                                                    index={0}
                                                                                    default-marker-size={8}
                                                                                />
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                    <g
                                                                        id="SvgjsG2729"
                                                                        className="apexcharts-datalabels"
                                                                        data-realindex={0}
                                                                    />
                                                                </g>
                                                                <line
                                                                    id="SvgjsLine2784"
                                                                    x1={0}
                                                                    y1={0}
                                                                    x2="300.51875019073486"
                                                                    y2={0}
                                                                    stroke="#b6b6b6"
                                                                    strokeDasharray={0}
                                                                    strokeWidth={1}
                                                                    strokeLinecap="butt"
                                                                    className="apexcharts-ycrosshairs"
                                                                />
                                                                <line
                                                                    id="SvgjsLine2785"
                                                                    x1={0}
                                                                    y1={0}
                                                                    x2="300.51875019073486"
                                                                    y2={0}
                                                                    strokeDasharray={0}
                                                                    strokeWidth={0}
                                                                    strokeLinecap="butt"
                                                                    className="apexcharts-ycrosshairs-hidden"
                                                                />
                                                                <g
                                                                    id="SvgjsG2786"
                                                                    className="apexcharts-yaxis-annotations"
                                                                />
                                                                <g
                                                                    id="SvgjsG2787"
                                                                    className="apexcharts-xaxis-annotations"
                                                                />
                                                                <g
                                                                    id="SvgjsG2788"
                                                                    className="apexcharts-point-annotations"
                                                                />
                                                                <rect
                                                                    id="SvgjsRect2789"
                                                                    width={0}
                                                                    height={0}
                                                                    x={0}
                                                                    y={0}
                                                                    rx={0}
                                                                    ry={0}
                                                                    opacity={1}
                                                                    strokeWidth={0}
                                                                    stroke="none"
                                                                    strokeDasharray={0}
                                                                    fill="#fefefe"
                                                                    className="apexcharts-zoom-rect"
                                                                />
                                                                <rect
                                                                    id="SvgjsRect2790"
                                                                    width={0}
                                                                    height={0}
                                                                    x={0}
                                                                    y={0}
                                                                    rx={0}
                                                                    ry={0}
                                                                    opacity={1}
                                                                    strokeWidth={0}
                                                                    stroke="none"
                                                                    strokeDasharray={0}
                                                                    fill="#fefefe"
                                                                    className="apexcharts-selection-rect"
                                                                />
                                                            </g>
                                                            <rect
                                                                id="SvgjsRect2722"
                                                                width={0}
                                                                height={0}
                                                                x={0}
                                                                y={0}
                                                                rx={0}
                                                                ry={0}
                                                                opacity={1}
                                                                strokeWidth={0}
                                                                stroke="none"
                                                                strokeDasharray={0}
                                                                fill="#fefefe"
                                                            />
                                                            <g
                                                                id="SvgjsG2771"
                                                                className="apexcharts-yaxis"
                                                                rel={0}
                                                                transform="translate(-8, 0)"
                                                            >
                                                                <g id="SvgjsG2772" className="apexcharts-yaxis-texts-g" />
                                                            </g>
                                                            <g id="SvgjsG2720" className="apexcharts-annotations" />
                                                        </svg>
                                                        <div
                                                            className="apexcharts-legend"
                                                            style={{ maxHeight: "122.5px" }}
                                                        />
                                                        <div className="apexcharts-tooltip apexcharts-theme-light">
                                                            <div
                                                                className="apexcharts-tooltip-title"
                                                                style={{
                                                                    fontFamily: "Helvetica, Arial, sans-serif",
                                                                    fontSize: 12
                                                                }}
                                                            />
                                                            <div
                                                                className="apexcharts-tooltip-series-group"
                                                                style={{ order: 1 }}
                                                            >
                                                                <span
                                                                    className="apexcharts-tooltip-marker"
                                                                    style={{ backgroundColor: "rgb(255, 171, 0)" }}
                                                                />
                                                                <div
                                                                    className="apexcharts-tooltip-text"
                                                                    style={{
                                                                        fontFamily: "Helvetica, Arial, sans-serif",
                                                                        fontSize: 12
                                                                    }}
                                                                >
                                                                    <div className="apexcharts-tooltip-y-group">
                                                                        <span className="apexcharts-tooltip-text-y-label" />
                                                                        <span className="apexcharts-tooltip-text-y-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-goals-group">
                                                                        <span className="apexcharts-tooltip-text-goals-label" />
                                                                        <span className="apexcharts-tooltip-text-goals-value" />
                                                                    </div>
                                                                    <div className="apexcharts-tooltip-z-group">
                                                                        <span className="apexcharts-tooltip-text-z-label" />
                                                                        <span className="apexcharts-tooltip-text-z-value" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light">
                                                            <div
                                                                className="apexcharts-xaxistooltip-text"
                                                                style={{
                                                                    fontFamily: "Helvetica, Arial, sans-serif",
                                                                    fontSize: 12
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                                            <div className="apexcharts-yaxistooltip-text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="resize-triggers">
                                                    <div className="expand-trigger">
                                                        <div style={{ width: 371, height: 321 }} />
                                                    </div>
                                                    <div className="contract-trigger" />
                                                </div>
                                            </div>
                                            <hr className="m-0" />
                                            <div className="card-footer">
                                                <div className="d-flex justify-content-between">
                                                    <small className="text-body">
                                                        You have done 57.6% more sales.
                                                        <br />
                                                        Check your new badge in your profile.
                                                    </small>
                                                    <div>
                                                        <span className="badge bg-label-warning rounded-2 p-2">
                                                            <i className="bx bx-chevron-right bx-md text-warning" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/*/ Total Balance */}
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

export default Commerce;