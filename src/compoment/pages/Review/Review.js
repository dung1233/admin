import React, { useEffect, useRef, useState } from 'react';

const Review = () => {
    const menuRef = useRef(null);

    // Thay đổi trạng thái ban đầu của isDashboardOpen từ localStorage (nếu có)
    const [isDashboardOpen, setDashboardOpen] = useState(() => {
        const savedState = localStorage.getItem('isDashboardOpen');
        return savedState === 'true'; // Chuyển đổi chuỗi sang boolean
    });

    // Hàm xử lý khi nhấn vào menu Dashboards
    const handleDashboardToggle = () => {
        const newState = !isDashboardOpen;
        setDashboardOpen(newState);
        localStorage.setItem('isDashboardOpen', newState); // Lưu trạng thái vào localStorage
    };

    useEffect(() => {
        const menuInner = menuRef.current;

        // Kiểm tra nếu nội dung vượt quá chiều cao của container
        if (menuInner.scrollHeight > menuInner.clientHeight) {
            menuInner.style.overflowY = 'auto';
        } else {
            menuInner.style.overflowY = 'hidden';
        }

        // Xử lý lại khi kích thước cửa sổ thay đổi
        const handleResize = () => {
            if (menuInner.scrollHeight > menuInner.clientHeight) {
                menuInner.style.overflowY = 'auto';
            } else {
                menuInner.style.overflowY = 'hidden';
            }
        };

        window.addEventListener('resize', handleResize);

        // Cleanup event listener
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <div>
            <div className="layout-wrapper layout-content-navbar">
                <div className="layout-container">
                    <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme" data-bg-class="bg-menu-theme">
                        <div className="app-brand demo">
                            <a href="index.html" className="app-brand-link">
                                <span className="app-brand-logo demo">
                                    <svg
                                        width={25}
                                        viewBox="0 0 25 42"
                                        version="1.1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                    >
                                        <defs>
                                            <path
                                                d="M13.7918663,0.358365126 L3.39788168,7.44174259 C0.566865006,9.69408886 -0.379795268,12.4788597 0.557900856,15.7960551 C0.68998853,16.2305145 1.09562888,17.7872135 3.12357076,19.2293357 C3.8146334,19.7207684 5.32369333,20.3834223 7.65075054,21.2172976 L7.59773219,21.2525164 L2.63468769,24.5493413 C0.445452254,26.3002124 0.0884951797,28.5083815 1.56381646,31.1738486 C2.83770406,32.8170431 5.20850219,33.2640127 7.09180128,32.5391577 C8.347334,32.0559211 11.4559176,30.0011079 16.4175519,26.3747182 C18.0338572,24.4997857 18.6973423,22.4544883 18.4080071,20.2388261 C17.963753,17.5346866 16.1776345,15.5799961 13.0496516,14.3747546 L10.9194936,13.4715819 L18.6192054,7.984237 L13.7918663,0.358365126 Z"
                                                id="path-1"
                                            />
                                            <path
                                                d="M5.47320593,6.00457225 C4.05321814,8.216144 4.36334763,10.0722806 6.40359441,11.5729822 C8.61520715,12.571656 10.0999176,13.2171421 10.8577257,13.5094407 L15.5088241,14.433041 L18.6192054,7.984237 C15.5364148,3.11535317 13.9273018,0.573395879 13.7918663,0.358365126 C13.5790555,0.511491653 10.8061687,2.3935607 5.47320593,6.00457225 Z"
                                                id="path-3"
                                            />
                                            <path
                                                d="M7.50063644,21.2294429 L12.3234468,23.3159332 C14.1688022,24.7579751 14.397098,26.4880487 13.008334,28.506154 C11.6195701,30.5242593 10.3099883,31.790241 9.07958868,32.3040991 C5.78142938,33.4346997 4.13234973,34 4.13234973,34 C4.13234973,34 2.75489982,33.0538207 2.37032616e-14,31.1614621 C-0.55822714,27.8186216 -0.55822714,26.0572515 -4.05231404e-15,25.8773518 C0.83734071,25.6075023 2.77988457,22.8248993 3.3049379,22.52991 C3.65497346,22.3332504 5.05353963,21.8997614 7.50063644,21.2294429 Z"
                                                id="path-4"
                                            />
                                            <path
                                                d="M20.6,7.13333333 L25.6,13.8 C26.2627417,14.6836556 26.0836556,15.9372583 25.2,16.6 C24.8538077,16.8596443 24.4327404,17 24,17 L14,17 C12.8954305,17 12,16.1045695 12,15 C12,14.5672596 12.1403557,14.1461923 12.4,13.8 L17.4,7.13333333 C18.0627417,6.24967773 19.3163444,6.07059163 20.2,6.73333333 C20.3516113,6.84704183 20.4862915,6.981722 20.6,7.13333333 Z"
                                                id="path-5"
                                            />
                                        </defs>
                                        <g
                                            id="g-app-brand"
                                            stroke="none"
                                            strokeWidth={1}
                                            fill="none"
                                            fillRule="evenodd"
                                        >
                                            <g id="Brand-Logo" transform="translate(-27.000000, -15.000000)">
                                                <g id="Icon" transform="translate(27.000000, 15.000000)">
                                                    <g id="Mask" transform="translate(0.000000, 8.000000)">
                                                        <mask id="mask-2" fill="white">
                                                            <use xlinkHref="#path-1" />
                                                        </mask>
                                                        <use fill="#696cff" xlinkHref="#path-1" />
                                                        <g id="Path-3" mask="url(#mask-2)">
                                                            <use fill="#696cff" xlinkHref="#path-3" />
                                                            <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-3" />
                                                        </g>
                                                        <g id="Path-4" mask="url(#mask-2)">
                                                            <use fill="#696cff" xlinkHref="#path-4" />
                                                            <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-4" />
                                                        </g>
                                                    </g>
                                                    <g
                                                        id="Triangle"
                                                        transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                                                    >
                                                        <use fill="#696cff" xlinkHref="#path-5" />
                                                        <use fillOpacity="0.2" fill="#FFFFFF" xlinkHref="#path-5" />
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <span className="app-brand-text demo menu-text fw-bold ms-2">sneat</span>
                            </a>

                            <a href="javascript:void(0);" className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                                <i className="bx bx-chevron-left bx-sm d-flex align-items-center justify-content-center"></i>
                            </a>
                        </div>

                        <div className="menu-inner-shadow" style={{ display: "none" }}></div>

                        {/* Menu Inner */}
                        <ul className="menu-inner py-1" ref={menuRef} style={{ maxHeight: "700px" }}>
                            <li className={`menu-item ${isDashboardOpen ? 'open' : ''}`}>
                                <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleDashboardToggle(); }}>
                                    <i className="menu-icon tf-icons bx bx-home-smile"></i>
                                    <div className="text-truncate" data-i18n="Dashboards">Dashboards</div>
                                    <span className="badge rounded-pill bg-danger ms-auto">5</span>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item active">
                                        <a href="index.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Analytics">Analytics</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="https://demos.themeselection.com" target="_blank" className="menu-link">
                                            <div className="text-truncate" data-i18n="CRM">CRM</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="/Commerce"
                                            target="_blank"
                                            className="menu-link"
                                        >
                                            <div className="text-truncate" data-i18n="eCommerce">
                                                eCommerce
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/app-logistics-dashboard.html"
                                            target="_blank"
                                            className="menu-link"
                                        >
                                            <div className="text-truncate" data-i18n="Logistics">
                                                Logistics
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="app-academy-dashboard.html"
                                            target="_blank"
                                            className="menu-link"
                                        >
                                            <div className="text-truncate" data-i18n="Academy">
                                                Academy
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            {/* Layouts */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-layout" />
                                    <div className="text-truncate" data-i18n="Layouts">
                                        Layouts
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="layouts-without-menu.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Without menu">
                                                Without menu
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="layouts-without-navbar.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Without navbar">
                                                Without navbar
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="layouts-fluid.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Fluid">
                                                Fluid
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="layouts-container.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Container">
                                                Container
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="layouts-blank.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Blank">
                                                Blank
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* Front Pages */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-store" />
                                    <div className="text-truncate" data-i18n="Front Pages">
                                        Front Pages
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/front-pages/landing-page.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Landing">
                                                Landing
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/front-pages/pricing-page.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Pricing">
                                                Pricing
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/front-pages/payment-page.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Payment">
                                                Payment
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/front-pages/checkout-page.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Checkout">
                                                Checkout
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/front-pages/help-center-landing.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Help Center">
                                                Help Center
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* Apps & Pages */}
                            {/* <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Apps &amp; Pages</span>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/app-email.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-envelope" />
                                    <div className="text-truncate" data-i18n="Email">
                                        Email
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/app-chat.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-chat" />
                                    <div className="text-truncate" data-i18n="Chat">
                                        Chat
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/app-calendar.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-calendar" />
                                    <div className="text-truncate" data-i18n="Calendar">
                                        Calendar
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/app-kanban.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-grid" />
                                    <div className="text-truncate" data-i18n="Kanban">
                                        Kanban
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* Pages */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-dock-top" />
                                    <div className="text-truncate" data-i18n="Account Settings">
                                        Account Settings
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="pages-account-settings-account.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Account">
                                                Account
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="pages-account-settings-notifications.html"
                                            className="menu-link"
                                        >
                                            <div className="text-truncate" data-i18n="Notifications">
                                                Notifications
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="pages-account-settings-connections.html"
                                            className="menu-link"
                                        >
                                            <div className="text-truncate" data-i18n="Connections">
                                                Connections
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-lock-open-alt" />
                                    <div className="text-truncate" data-i18n="Authentications">
                                        Authentications
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="auth-login-basic.html" className="menu-link" target="_blank">
                                            <div className="text-truncate" data-i18n="Basic">
                                                Login
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="auth-register-basic.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Basic">
                                                Register
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a
                                            href="auth-forgot-password-basic.html"
                                            className="menu-link"
                                            target="_blank"
                                        >
                                            <div className="text-truncate" data-i18n="Basic">
                                                Forgot Password
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-cube-alt" />
                                    <div className="text-truncate" data-i18n="Misc">
                                        Misc
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="pages-misc-error.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Error">
                                                Error
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="pages-misc-under-maintenance.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Under Maintenance">
                                                Under Maintenance
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* Components */}
                            {/* <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Components</span>
                            </li> */}
                            {/* Cards */}
                            {/* <li className="menu-item">
                                <a href="cards-basic.html" className="menu-link">
                                    <i className="menu-icon tf-icons bx bx-collection" />
                                    <div className="text-truncate" data-i18n="Basic">
                                        Cards
                                    </div>
                                </a>
                            </li> */}
                            {/* User interface */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0)" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-box" />
                                    <div className="text-truncate" data-i18n="User interface">
                                        User interface
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="ui-accordion.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Accordion">
                                                Accordion
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-alerts.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Alerts">
                                                Alerts
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-badges.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Badges">
                                                Badges
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-buttons.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Buttons">
                                                Buttons
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-carousel.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Carousel">
                                                Carousel
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-collapse.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Collapse">
                                                Collapse
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-dropdowns.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Dropdowns">
                                                Dropdowns
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-footer.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Footer">
                                                Footer
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-list-groups.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="List Groups">
                                                List groups
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-modals.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Modals">
                                                Modals
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-navbar.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Navbar">
                                                Navbar
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-offcanvas.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Offcanvas">
                                                Offcanvas
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-pagination-breadcrumbs.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Pagination & Breadcrumbs">
                                                Pagination &amp; Breadcrumbs
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-progress.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Progress">
                                                Progress
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-spinners.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Spinners">
                                                Spinners
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-tabs-pills.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Tabs & Pills">
                                                Tabs &amp; Pills
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-toasts.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Toasts">
                                                Toasts
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-tooltips-popovers.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Tooltips & Popovers">
                                                Tooltips &amp; Popovers
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="ui-typography.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Typography">
                                                Typography
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* Extended components */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0)" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-copy" />
                                    <div className="text-truncate" data-i18n="Extended UI">
                                        Extended UI
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="extended-ui-perfect-scrollbar.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Perfect Scrollbar">
                                                Perfect Scrollbar
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="extended-ui-text-divider.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Text Divider">
                                                Text Divider
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="menu-item">
                                <a href="icons-boxicons.html" className="menu-link">
                                    <i className="menu-icon tf-icons bx bx-crown" />
                                    <div className="text-truncate" data-i18n="Boxicons">
                                        Boxicons
                                    </div>
                                </a>
                            </li> */}
                            {/* Forms & Tables */}
                            {/* <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Forms &amp; Tables</span>
                            </li> */}
                            {/* Forms */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-detail" />
                                    <div className="text-truncate" data-i18n="Form Elements">
                                        Form Elements
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="forms-basic-inputs.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Basic Inputs">
                                                Basic Inputs
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="forms-input-groups.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Input groups">
                                                Input groups
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* <li className="menu-item">
                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                    <i className="menu-icon tf-icons bx bx-detail" />
                                    <div className="text-truncate" data-i18n="Form Layouts">
                                        Form Layouts
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="form-layouts-vertical.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Vertical Form">
                                                Vertical Form
                                            </div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="form-layouts-horizontal.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Horizontal Form">
                                                Horizontal Form
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li> */}
                            {/* Form Validation */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/form-validation.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-list-check" />
                                    <div className="text-truncate" data-i18n="Form Validation">
                                        Form Validation
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* Tables */}
                            {/* <li className="menu-item">
                                <a href="tables-basic.html" className="menu-link">
                                    <i className="menu-icon tf-icons bx bx-table" />
                                    <div className="text-truncate" data-i18n="Tables">
                                        Tables
                                    </div>
                                </a>
                            </li> */}
                            {/* Data Tables */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/html/vertical-menu-template/tables-datatables-basic.html"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-grid" />
                                    <div className="text-truncate" data-i18n="Datatables">
                                        Datatables
                                    </div>
                                    <div className="badge rounded-pill bg-label-primary text-uppercase fs-tiny ms-auto">
                                        Pro
                                    </div>
                                </a>
                            </li> */}
                            {/* Misc */}
                            {/* <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">Misc</span>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-support" />
                                    <div className="text-truncate" data-i18n="Support">
                                        Support
                                    </div>
                                </a>
                            </li> */}
                            {/* <li className="menu-item">
                                <a
                                    href="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/documentation/"
                                    target="_blank"
                                    className="menu-link"
                                >
                                    <i className="menu-icon tf-icons bx bx-file" />
                                    <div className="text-truncate" data-i18n="Documentation">
                                        Documentation
                                    </div>
                                </a>
                            </li> */}
                            <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                <div className="ps__thumb-x" tabIndex={0} style={{ left: 0, width: 0 }} />
                            </div>
                            <div className="ps__rail-y" style={{ top: 0, height: 254, right: 4 }}>
                                <div
                                    className="ps__thumb-y"
                                    tabIndex={0}
                                    style={{ top: 0, height: 44 }}
                                />
                            </div>
                        </ul>
                    </aside>
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
    <div
      className="navbar-nav-right d-flex align-items-center"
      id="navbar-collapse"
    >
      {/* Search */}
      <div className="navbar-nav align-items-center">
        <div className="nav-item navbar-search-wrapper mb-0">
          <a
            className="nav-item nav-link search-toggler px-0"
            href="javascript:void(0);"
          >
            <i className="bx bx-search bx-md" />
            <span className="d-none d-md-inline-block text-muted fw-normal ms-4">
              Search (Ctrl+/)
            </span>
          </a>
        </div>
      </div>
      {/* /Search */}
      <ul className="navbar-nav flex-row align-items-center ms-auto">
        {/* Language */}
        <li className="nav-item dropdown-language dropdown me-2 me-xl-0">
          <a
            className="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <i className="bx bx-globe bx-md" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a
                className="dropdown-item active"
                href="javascript:void(0);"
                data-language="en"
                data-text-direction="ltr"
              >
                <span>English</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="javascript:void(0);"
                data-language="fr"
                data-text-direction="ltr"
              >
                <span>French</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="javascript:void(0);"
                data-language="ar"
                data-text-direction="rtl"
              >
                <span>Arabic</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="javascript:void(0);"
                data-language="de"
                data-text-direction="ltr"
              >
                <span>German</span>
              </a>
            </li>
          </ul>
        </li>
        {/* /Language */}
        {/* Style Switcher */}
        <li className="nav-item dropdown-style-switcher dropdown me-2 me-xl-0">
          <a
            className="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <i className="bx bx-md bx-sun" />
          </a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-styles">
            <li>
              <a
                className="dropdown-item active"
                href="javascript:void(0);"
                data-theme="light"
              >
                <span>
                  <i className="bx bx-sun bx-md me-3" />
                  Light
                </span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="javascript:void(0);"
                data-theme="dark"
              >
                <span>
                  <i className="bx bx-moon bx-md me-3" />
                  Dark
                </span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="javascript:void(0);"
                data-theme="system"
              >
                <span>
                  <i className="bx bx-desktop bx-md me-3" />
                  System
                </span>
              </a>
            </li>
          </ul>
        </li>
        {/* / Style Switcher*/}
        {/* Quick links  */}
        <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown me-2 me-xl-0">
          <a
            className="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <i className="bx bx-grid-alt bx-md" />
          </a>
          <div className="dropdown-menu dropdown-menu-end p-0">
            <div className="dropdown-menu-header border-bottom">
              <div className="dropdown-header d-flex align-items-center py-3">
                <h6 className="mb-0 me-auto">Shortcuts</h6>
                <a
                  href="javascript:void(0)"
                  className="dropdown-shortcuts-add py-2"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  aria-label="Add shortcuts"
                  data-bs-original-title="Add shortcuts"
                >
                  <i className="bx bx-plus-circle text-heading" />
                </a>
              </div>
            </div>
            <div className="dropdown-shortcuts-list scrollable-container ps">
              <div className="row row-bordered overflow-visible g-0">
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-calendar bx-26px text-heading" />
                  </span>
                  <a href="app-calendar.html" className="stretched-link">
                    Calendar
                  </a>
                  <small>Appointments</small>
                </div>
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-food-menu bx-26px text-heading" />
                  </span>
                  <a href="app-invoice-list.html" className="stretched-link">
                    Invoice App
                  </a>
                  <small>Manage Accounts</small>
                </div>
              </div>
              <div className="row row-bordered overflow-visible g-0">
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-user bx-26px text-heading" />
                  </span>
                  <a href="app-user-list.html" className="stretched-link">
                    User App
                  </a>
                  <small>Manage Users</small>
                </div>
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-check-shield bx-26px text-heading" />
                  </span>
                  <a href="app-access-roles.html" className="stretched-link">
                    Role Management
                  </a>
                  <small>Permission</small>
                </div>
              </div>
              <div className="row row-bordered overflow-visible g-0">
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-pie-chart-alt-2 bx-26px text-heading" />
                  </span>
                  <a href="index.html" className="stretched-link">
                    Dashboard
                  </a>
                  <small>User Dashboard</small>
                </div>
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-cog bx-26px text-heading" />
                  </span>
                  <a
                    href="pages-account-settings-account.html"
                    className="stretched-link"
                  >
                    Setting
                  </a>
                  <small>Account Settings</small>
                </div>
              </div>
              <div className="row row-bordered overflow-visible g-0">
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-help-circle bx-26px text-heading" />
                  </span>
                  <a href="pages-faq.html" className="stretched-link">
                    FAQs
                  </a>
                  <small>FAQs &amp; Articles</small>
                </div>
                <div className="dropdown-shortcuts-item col">
                  <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                    <i className="bx bx-window-open bx-26px text-heading" />
                  </span>
                  <a href="modal-examples.html" className="stretched-link">
                    Modals
                  </a>
                  <small>Useful Popups</small>
                </div>
              </div>
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
          </div>
        </li>
        {/* Quick links */}
        {/* Notification */}
        <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
          <a
            className="nav-link dropdown-toggle hide-arrow"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span className="position-relative">
              <i className="bx bx-bell bx-md" />
              <span className="badge rounded-pill bg-danger badge-dot badge-notifications border" />
            </span>
          </a>
          <ul className="dropdown-menu dropdown-menu-end p-0">
            <li className="dropdown-menu-header border-bottom">
              <div className="dropdown-header d-flex align-items-center py-3">
                <h6 className="mb-0 me-auto">Notification</h6>
                <div className="d-flex align-items-center h6 mb-0">
                  <span className="badge bg-label-primary me-2">8 New</span>
                  <a
                    href="javascript:void(0)"
                    className="dropdown-notifications-all p-2"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    aria-label="Mark all as read"
                    data-bs-original-title="Mark all as read"
                  >
                    <i className="bx bx-envelope-open text-heading" />
                  </a>
                </div>
              </div>
            </li>
            <li className="dropdown-notifications-list scrollable-container ps">
              <ul className="list-group list-group-flush">
                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <img
                          src="../../assets/img/avatars/1.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">Congratulation Lettie 🎉</h6>
                      <small className="mb-1 d-block text-body">
                        Won the monthly best seller gold badge
                      </small>
                      <small className="text-muted">1h ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-danger">
                          CF
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">Charles Franklin</h6>
                      <small className="mb-1 d-block text-body">
                        Accepted your connection
                      </small>
                      <small className="text-muted">12hr ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <img
                          src="../../assets/img/avatars/2.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">New Message ✉️</h6>
                      <small className="mb-1 d-block text-body">
                        You have new message from Natalie
                      </small>
                      <small className="text-muted">1h ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-success">
                          <i className="bx bx-cart" />
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">
                        Whoo! You have new order 🛒{" "}
                      </h6>
                      <small className="mb-1 d-block text-body">
                        ACME Inc. made new order $1,154
                      </small>
                      <small className="text-muted">1 day ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <img
                          src="../../assets/img/avatars/9.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">
                        Application has been approved 🚀{" "}
                      </h6>
                      <small className="mb-1 d-block text-body">
                        Your ABC project application has been approved.
                      </small>
                      <small className="text-muted">2 days ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-success">
                          <i className="bx bx-pie-chart-alt" />
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">
                        Monthly report is generated
                      </h6>
                      <small className="mb-1 d-block text-body">
                        July monthly financial report is generated{" "}
                      </small>
                      <small className="text-muted">3 days ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <img
                          src="../../assets/img/avatars/5.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">Send connection request</h6>
                      <small className="mb-1 d-block text-body">
                        Peter sent you connection request
                      </small>
                      <small className="text-muted">4 days ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <img
                          src="../../assets/img/avatars/6.png"
                          alt=""
                          className="rounded-circle"
                        />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">New message from Jane</h6>
                      <small className="mb-1 d-block text-body">
                        Your have new message from Jane
                      </small>
                      <small className="text-muted">5 days ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
                <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar">
                        <span className="avatar-initial rounded-circle bg-label-warning">
                          <i className="bx bx-error" />
                        </span>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="small mb-0">CPU is running high</h6>
                      <small className="mb-1 d-block text-body">
                        CPU Utilization Percent is currently at 88.63%,
                      </small>
                      <small className="text-muted">5 days ago</small>
                    </div>
                    <div className="flex-shrink-0 dropdown-notifications-actions">
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-read"
                      >
                        <span className="badge badge-dot" />
                      </a>
                      <a
                        href="javascript:void(0)"
                        className="dropdown-notifications-archive"
                      >
                        <span className="bx bx-x" />
                      </a>
                    </div>
                  </div>
                </li>
              </ul>
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
            </li>
            <li className="border-top">
              <div className="d-grid p-4">
                <a
                  className="btn btn-primary btn-sm d-flex"
                  href="javascript:void(0);"
                >
                  <small className="align-middle">View all notifications</small>
                </a>
              </div>
            </li>
          </ul>
        </li>
        {/*/ Notification */}
        {/* User */}
        <li className="nav-item navbar-dropdown dropdown-user dropdown">
          <a
            className="nav-link dropdown-toggle hide-arrow p-0"
            href="javascript:void(0);"
            data-bs-toggle="dropdown"
          >
            <div className="avatar avatar-online">
              <img
                src="../../assets/img/avatars/1.png"
                alt=""
                className="w-px-40 h-auto rounded-circle"
              />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a
                className="dropdown-item"
                href="pages-account-settings-account.html"
              >
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-online">
                      <img
                        src="../../assets/img/avatars/1.png"
                        alt=""
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0">John Doe</h6>
                    <small className="text-muted">Admin</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div className="dropdown-divider my-1" />
            </li>
            <li>
              <a className="dropdown-item" href="pages-profile-user.html">
                <i className="bx bx-user bx-md me-3" />
                <span>My Profile</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="pages-account-settings-account.html"
              >
                <i className="bx bx-cog bx-md me-3" />
                <span>Settings</span>
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                href="pages-account-settings-billing.html"
              >
                <span className="d-flex align-items-center align-middle">
                  <i className="flex-shrink-0 bx bx-credit-card bx-md me-3" />
                  <span className="flex-grow-1 align-middle">Billing Plan</span>
                  <span className="flex-shrink-0 badge rounded-pill bg-danger">
                    4
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="dropdown-divider my-1" />
            </li>
            <li>
              <a className="dropdown-item" href="pages-pricing.html">
                <i className="bx bx-dollar bx-md me-3" />
                <span>Pricing</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="pages-faq.html">
                <i className="bx bx-help-circle bx-md me-3" />
                <span>FAQ</span>
              </a>
            </li>
            <li>
              <div className="dropdown-divider my-1" />
            </li>
            <li>
              <a
                className="dropdown-item"
                href="auth-login-cover.html"
                target="_blank"
              >
                <i className="bx bx-power-off bx-md me-3" />
                <span>Log Out</span>
              </a>
            </li>
          </ul>
        </li>
        {/*/ User */}
      </ul>
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
      <div className="row mb-6 g-6">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body row widget-separator g-0">
              <div className="col-sm-5 border-shift border-end pe-sm-6">
                <h3 className="text-primary d-flex align-items-center gap-2 mb-2">
                  4.89
                  <i className="bx bxs-star bx-30px" />
                </h3>
                <p className="h6 mb-2">Total 187 reviews</p>
                <p className="pe-2 mb-2">
                  All reviews are from genuine customers
                </p>
                <span className="badge bg-label-primary mb-4 mb-sm-0">
                  +5 This week
                </span>
                <hr className="d-sm-none" />
              </div>
              <div className="col-sm-7 gap-2 text-nowrap d-flex flex-column justify-content-between ps-sm-6 pt-2 py-sm-2">
                <div className="d-flex align-items-center gap-2">
                  <small>5 Star</small>
                  <div
                    className="progress w-100 bg-label-primary"
                    style={{ height: 8 }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "85%" }}
                      aria-valuenow="61.50"
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <small className="w-px-20 text-end">124</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <small>4 Star</small>
                  <div
                    className="progress w-100 bg-label-primary"
                    style={{ height: 8 }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "50%" }}
                      aria-valuenow={24}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <small className="w-px-20 text-end">40</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <small>3 Star</small>
                  <div
                    className="progress w-100 bg-label-primary"
                    style={{ height: 8 }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "35%" }}
                      aria-valuenow={12}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <small className="w-px-20 text-end">12</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <small>2 Star</small>
                  <div
                    className="progress w-100 bg-label-primary"
                    style={{ height: 8 }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "18%" }}
                      aria-valuenow={7}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <small className="w-px-20 text-end">7</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <small>1 Star</small>
                  <div
                    className="progress w-100 bg-label-primary"
                    style={{ height: 8 }}
                  >
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "10%" }}
                      aria-valuenow={2}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                  <small className="w-px-20 text-end">2</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body row">
              <div className="col-sm-5">
                <div className="mb-12">
                  <h5 className="mb-2 text-nowrap">Reviews statistics</h5>
                  <p className="mb-0">
                    {" "}
                    <span className="me-2">12 New reviews</span>{" "}
                    <span className="badge bg-label-success">+8.4%</span>
                  </p>
                </div>
                <div>
                  <h6 className="mb-2 fw-normal">
                    <span className="text-success me-1">87%</span>Positive
                    reviews
                  </h6>
                  <small>Weekly Report</small>
                </div>
              </div>
              <div
                className="col-sm-7 d-flex justify-content-sm-end align-items-end"
                style={{ position: "relative" }}
              >
                <div id="reviewsChart" style={{ minHeight: 175 }}>
                  <div
                    id="apexchartsk95hv1b5k"
                    className="apexcharts-canvas apexchartsk95hv1b5k apexcharts-theme-light"
                    style={{ width: 190, height: 160 }}
                  >
                    <svg
                      id="SvgjsSvg1146"
                      width={190}
                      height={160}
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns-svgjs="http://svgjs.dev"
                      className="apexcharts-svg"
                      xmlns-data="ApexChartsNS"
                      transform="translate(0, 0)"
                      style={{ background: "transparent" }}
                    >
                      <g
                        id="SvgjsG1148"
                        className="apexcharts-inner apexcharts-graphical"
                        transform="translate(22, 5)"
                      >
                        <defs id="SvgjsDefs1147">
                          <linearGradient
                            id="SvgjsLinearGradient1151"
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={1}
                          >
                            <stop
                              id="SvgjsStop1152"
                              stopOpacity="0.4"
                              stopColor="rgba(216,227,240,0.4)"
                              offset={0}
                            />
                            <stop
                              id="SvgjsStop1153"
                              stopOpacity="0.5"
                              stopColor="rgba(190,209,230,0.5)"
                              offset={1}
                            />
                            <stop
                              id="SvgjsStop1154"
                              stopOpacity="0.5"
                              stopColor="rgba(190,209,230,0.5)"
                              offset={1}
                            />
                          </linearGradient>
                          <clipPath id="gridRectMaskk95hv1b5k">
                            <rect
                              id="SvgjsRect1156"
                              width={162}
                              height="127.72999999999999"
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
                          <clipPath id="forecastMaskk95hv1b5k" />
                          <clipPath id="nonForecastMaskk95hv1b5k" />
                          <clipPath id="gridRectMarkerMaskk95hv1b5k">
                            <rect
                              id="SvgjsRect1157"
                              width={162}
                              height="131.73"
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
                          id="SvgjsRect1155"
                          width="9.028571428571428"
                          height="127.72999999999999"
                          x={0}
                          y={0}
                          rx={0}
                          ry={0}
                          opacity={1}
                          strokeWidth={0}
                          strokeDasharray={3}
                          fill="url(#SvgjsLinearGradient1151)"
                          className="apexcharts-xcrosshairs"
                          y2="127.72999999999999"
                          filter="none"
                          fillOpacity="0.9"
                        />
                        <g
                          id="SvgjsG1176"
                          className="apexcharts-xaxis"
                          transform="translate(0, 0)"
                        >
                          <g
                            id="SvgjsG1177"
                            className="apexcharts-xaxis-texts-g"
                            transform="translate(0, -4)"
                          >
                            <text
                              id="SvgjsText1179"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="11.285714285714286"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1180">M</tspan>
                              <title>M</title>
                            </text>
                            <text
                              id="SvgjsText1182"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="33.85714285714286"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1183">T</tspan>
                              <title>T</title>
                            </text>
                            <text
                              id="SvgjsText1185"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="56.42857142857144"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1186">W</tspan>
                              <title>W</title>
                            </text>
                            <text
                              id="SvgjsText1188"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x={79}
                              y="156.73"
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
                              <tspan id="SvgjsTspan1189">T</tspan>
                              <title>T</title>
                            </text>
                            <text
                              id="SvgjsText1191"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="101.57142857142857"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1192">F</tspan>
                              <title>F</title>
                            </text>
                            <text
                              id="SvgjsText1194"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="124.14285714285715"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1195">S</tspan>
                              <title>S</title>
                            </text>
                            <text
                              id="SvgjsText1197"
                              fontFamily="Helvetica, Arial, sans-serif"
                              x="146.71428571428575"
                              y="156.73"
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
                              <tspan id="SvgjsTspan1198">S</tspan>
                              <title>S</title>
                            </text>
                          </g>
                        </g>
                        <g id="SvgjsG1201" className="apexcharts-grid">
                          <g
                            id="SvgjsG1202"
                            className="apexcharts-gridlines-horizontal"
                            style={{ display: "none" }}
                          >
                            <line
                              id="SvgjsLine1204"
                              x1={0}
                              y1={0}
                              x2={158}
                              y2={0}
                              stroke="#e0e0e0"
                              strokeDasharray={0}
                              strokeLinecap="butt"
                              className="apexcharts-gridline"
                            />
                            <line
                              id="SvgjsLine1205"
                              x1={0}
                              y1="31.932499999999997"
                              x2={158}
                              y2="31.932499999999997"
                              stroke="#e0e0e0"
                              strokeDasharray={0}
                              strokeLinecap="butt"
                              className="apexcharts-gridline"
                            />
                            <line
                              id="SvgjsLine1206"
                              x1={0}
                              y1="63.864999999999995"
                              x2={158}
                              y2="63.864999999999995"
                              stroke="#e0e0e0"
                              strokeDasharray={0}
                              strokeLinecap="butt"
                              className="apexcharts-gridline"
                            />
                            <line
                              id="SvgjsLine1207"
                              x1={0}
                              y1="95.79749999999999"
                              x2={158}
                              y2="95.79749999999999"
                              stroke="#e0e0e0"
                              strokeDasharray={0}
                              strokeLinecap="butt"
                              className="apexcharts-gridline"
                            />
                            <line
                              id="SvgjsLine1208"
                              x1={0}
                              y1="127.72999999999999"
                              x2={158}
                              y2="127.72999999999999"
                              stroke="#e0e0e0"
                              strokeDasharray={0}
                              strokeLinecap="butt"
                              className="apexcharts-gridline"
                            />
                          </g>
                          <g
                            id="SvgjsG1203"
                            className="apexcharts-gridlines-vertical"
                            style={{ display: "none" }}
                          />
                          <line
                            id="SvgjsLine1210"
                            x1={0}
                            y1="127.72999999999999"
                            x2={158}
                            y2="127.72999999999999"
                            stroke="transparent"
                            strokeDasharray={0}
                            strokeLinecap="butt"
                          />
                          <line
                            id="SvgjsLine1209"
                            x1={0}
                            y1={1}
                            x2={0}
                            y2="127.72999999999999"
                            stroke="transparent"
                            strokeDasharray={0}
                            strokeLinecap="butt"
                          />
                        </g>
                        <g
                          id="SvgjsG1158"
                          className="apexcharts-bar-series apexcharts-plot-series"
                        >
                          <g
                            id="SvgjsG1159"
                            className="apexcharts-series"
                            rel={1}
                            seriesname="seriesx1"
                            data-realindex={0}
                          >
                            <path
                              id="SvgjsPath1163"
                              d="M 6.771428571428572 122.72999999999999L 6.771428571428572 111.44166666666666Q 6.771428571428572 106.44166666666666 11.771428571428572 106.44166666666666L 10.8 106.44166666666666Q 15.8 106.44166666666666 15.8 111.44166666666666L 15.8 111.44166666666666L 15.8 122.72999999999999Q 15.8 127.72999999999999 10.8 127.72999999999999L 11.771428571428572 127.72999999999999Q 6.771428571428572 127.72999999999999 6.771428571428572 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 6.771428571428572 122.72999999999999L 6.771428571428572 111.44166666666666Q 6.771428571428572 106.44166666666666 11.771428571428572 106.44166666666666L 10.8 106.44166666666666Q 15.8 106.44166666666666 15.8 111.44166666666666L 15.8 111.44166666666666L 15.8 122.72999999999999Q 15.8 127.72999999999999 10.8 127.72999999999999L 11.771428571428572 127.72999999999999Q 6.771428571428572 127.72999999999999 6.771428571428572 122.72999999999999z"
                              pathfrom="M 6.771428571428572 122.72999999999999L 6.771428571428572 122.72999999999999L 15.8 122.72999999999999L 15.8 122.72999999999999L 15.8 122.72999999999999L 15.8 122.72999999999999L 15.8 122.72999999999999L 6.771428571428572 122.72999999999999"
                              cy="106.44166666666666"
                              cx="29.342857142857145"
                              j={0}
                              val={20}
                              barheight="21.28833333333333"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1165"
                              d="M 29.342857142857145 122.72999999999999L 29.342857142857145 90.15333333333334Q 29.342857142857145 85.15333333333334 34.34285714285714 85.15333333333334L 33.371428571428574 85.15333333333334Q 38.371428571428574 85.15333333333334 38.371428571428574 90.15333333333334L 38.371428571428574 90.15333333333334L 38.371428571428574 122.72999999999999Q 38.371428571428574 127.72999999999999 33.371428571428574 127.72999999999999L 34.34285714285714 127.72999999999999Q 29.342857142857145 127.72999999999999 29.342857142857145 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 29.342857142857145 122.72999999999999L 29.342857142857145 90.15333333333334Q 29.342857142857145 85.15333333333334 34.34285714285714 85.15333333333334L 33.371428571428574 85.15333333333334Q 38.371428571428574 85.15333333333334 38.371428571428574 90.15333333333334L 38.371428571428574 90.15333333333334L 38.371428571428574 122.72999999999999Q 38.371428571428574 127.72999999999999 33.371428571428574 127.72999999999999L 34.34285714285714 127.72999999999999Q 29.342857142857145 127.72999999999999 29.342857142857145 122.72999999999999z"
                              pathfrom="M 29.342857142857145 122.72999999999999L 29.342857142857145 122.72999999999999L 38.371428571428574 122.72999999999999L 38.371428571428574 122.72999999999999L 38.371428571428574 122.72999999999999L 38.371428571428574 122.72999999999999L 38.371428571428574 122.72999999999999L 29.342857142857145 122.72999999999999"
                              cy="85.15333333333334"
                              cx="51.91428571428572"
                              j={1}
                              val={40}
                              barheight="42.57666666666666"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1167"
                              d="M 51.91428571428572 122.72999999999999L 51.91428571428572 68.865Q 51.91428571428572 63.864999999999995 56.91428571428572 63.864999999999995L 55.94285714285715 63.864999999999995Q 60.94285714285715 63.864999999999995 60.94285714285715 68.865L 60.94285714285715 68.865L 60.94285714285715 122.72999999999999Q 60.94285714285715 127.72999999999999 55.94285714285715 127.72999999999999L 56.91428571428572 127.72999999999999Q 51.91428571428572 127.72999999999999 51.91428571428572 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 51.91428571428572 122.72999999999999L 51.91428571428572 68.865Q 51.91428571428572 63.864999999999995 56.91428571428572 63.864999999999995L 55.94285714285715 63.864999999999995Q 60.94285714285715 63.864999999999995 60.94285714285715 68.865L 60.94285714285715 68.865L 60.94285714285715 122.72999999999999Q 60.94285714285715 127.72999999999999 55.94285714285715 127.72999999999999L 56.91428571428572 127.72999999999999Q 51.91428571428572 127.72999999999999 51.91428571428572 122.72999999999999z"
                              pathfrom="M 51.91428571428572 122.72999999999999L 51.91428571428572 122.72999999999999L 60.94285714285715 122.72999999999999L 60.94285714285715 122.72999999999999L 60.94285714285715 122.72999999999999L 60.94285714285715 122.72999999999999L 60.94285714285715 122.72999999999999L 51.91428571428572 122.72999999999999"
                              cy="63.864999999999995"
                              cx="74.4857142857143"
                              j={2}
                              val={60}
                              barheight="63.864999999999995"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1169"
                              d="M 74.4857142857143 122.72999999999999L 74.4857142857143 47.57666666666667Q 74.4857142857143 42.57666666666667 79.4857142857143 42.57666666666667L 78.51428571428572 42.57666666666667Q 83.51428571428572 42.57666666666667 83.51428571428572 47.57666666666667L 83.51428571428572 47.57666666666667L 83.51428571428572 122.72999999999999Q 83.51428571428572 127.72999999999999 78.51428571428572 127.72999999999999L 79.4857142857143 127.72999999999999Q 74.4857142857143 127.72999999999999 74.4857142857143 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 74.4857142857143 122.72999999999999L 74.4857142857143 47.57666666666667Q 74.4857142857143 42.57666666666667 79.4857142857143 42.57666666666667L 78.51428571428572 42.57666666666667Q 83.51428571428572 42.57666666666667 83.51428571428572 47.57666666666667L 83.51428571428572 47.57666666666667L 83.51428571428572 122.72999999999999Q 83.51428571428572 127.72999999999999 78.51428571428572 127.72999999999999L 79.4857142857143 127.72999999999999Q 74.4857142857143 127.72999999999999 74.4857142857143 122.72999999999999z"
                              pathfrom="M 74.4857142857143 122.72999999999999L 74.4857142857143 122.72999999999999L 83.51428571428572 122.72999999999999L 83.51428571428572 122.72999999999999L 83.51428571428572 122.72999999999999L 83.51428571428572 122.72999999999999L 83.51428571428572 122.72999999999999L 74.4857142857143 122.72999999999999"
                              cy="42.57666666666667"
                              cx="97.05714285714286"
                              j={3}
                              val={80}
                              barheight="85.15333333333332"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1171"
                              d="M 97.05714285714286 122.72999999999999L 97.05714285714286 26.28833333333334Q 97.05714285714286 21.28833333333334 102.05714285714286 21.28833333333334L 101.08571428571429 21.28833333333334Q 106.08571428571429 21.28833333333334 106.08571428571429 26.28833333333334L 106.08571428571429 26.28833333333334L 106.08571428571429 122.72999999999999Q 106.08571428571429 127.72999999999999 101.08571428571429 127.72999999999999L 102.05714285714286 127.72999999999999Q 97.05714285714286 127.72999999999999 97.05714285714286 122.72999999999999z"
                              fill="rgba(113,221,55,0.85)"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 97.05714285714286 122.72999999999999L 97.05714285714286 26.28833333333334Q 97.05714285714286 21.28833333333334 102.05714285714286 21.28833333333334L 101.08571428571429 21.28833333333334Q 106.08571428571429 21.28833333333334 106.08571428571429 26.28833333333334L 106.08571428571429 26.28833333333334L 106.08571428571429 122.72999999999999Q 106.08571428571429 127.72999999999999 101.08571428571429 127.72999999999999L 102.05714285714286 127.72999999999999Q 97.05714285714286 127.72999999999999 97.05714285714286 122.72999999999999z"
                              pathfrom="M 97.05714285714286 122.72999999999999L 97.05714285714286 122.72999999999999L 106.08571428571429 122.72999999999999L 106.08571428571429 122.72999999999999L 106.08571428571429 122.72999999999999L 106.08571428571429 122.72999999999999L 106.08571428571429 122.72999999999999L 97.05714285714286 122.72999999999999"
                              cy="21.28833333333334"
                              cx="119.62857142857143"
                              j={4}
                              val={100}
                              barheight="106.44166666666665"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1173"
                              d="M 119.62857142857143 122.72999999999999L 119.62857142857143 47.57666666666667Q 119.62857142857143 42.57666666666667 124.62857142857143 42.57666666666667L 123.65714285714287 42.57666666666667Q 128.65714285714287 42.57666666666667 128.65714285714287 47.57666666666667L 128.65714285714287 47.57666666666667L 128.65714285714287 122.72999999999999Q 128.65714285714287 127.72999999999999 123.65714285714287 127.72999999999999L 124.62857142857143 127.72999999999999Q 119.62857142857143 127.72999999999999 119.62857142857143 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 119.62857142857143 122.72999999999999L 119.62857142857143 47.57666666666667Q 119.62857142857143 42.57666666666667 124.62857142857143 42.57666666666667L 123.65714285714287 42.57666666666667Q 128.65714285714287 42.57666666666667 128.65714285714287 47.57666666666667L 128.65714285714287 47.57666666666667L 128.65714285714287 122.72999999999999Q 128.65714285714287 127.72999999999999 123.65714285714287 127.72999999999999L 124.62857142857143 127.72999999999999Q 119.62857142857143 127.72999999999999 119.62857142857143 122.72999999999999z"
                              pathfrom="M 119.62857142857143 122.72999999999999L 119.62857142857143 122.72999999999999L 128.65714285714287 122.72999999999999L 128.65714285714287 122.72999999999999L 128.65714285714287 122.72999999999999L 128.65714285714287 122.72999999999999L 128.65714285714287 122.72999999999999L 119.62857142857143 122.72999999999999"
                              cy="42.57666666666667"
                              cx="142.20000000000002"
                              j={5}
                              val={80}
                              barheight="85.15333333333332"
                              barwidth="9.028571428571428"
                            />
                            <path
                              id="SvgjsPath1175"
                              d="M 142.20000000000002 122.72999999999999L 142.20000000000002 68.865Q 142.20000000000002 63.864999999999995 147.20000000000002 63.864999999999995L 146.22857142857146 63.864999999999995Q 151.22857142857146 63.864999999999995 151.22857142857146 68.865L 151.22857142857146 68.865L 151.22857142857146 122.72999999999999Q 151.22857142857146 127.72999999999999 146.22857142857146 127.72999999999999L 147.20000000000002 127.72999999999999Q 142.20000000000002 127.72999999999999 142.20000000000002 122.72999999999999z"
                              fill="#71dd3729"
                              fillOpacity={1}
                              strokeOpacity={1}
                              strokeLinecap="round"
                              strokeWidth={0}
                              strokeDasharray={0}
                              className="apexcharts-bar-area"
                              index={0}
                              clipPath="url(#gridRectMaskk95hv1b5k)"
                              pathto="M 142.20000000000002 122.72999999999999L 142.20000000000002 68.865Q 142.20000000000002 63.864999999999995 147.20000000000002 63.864999999999995L 146.22857142857146 63.864999999999995Q 151.22857142857146 63.864999999999995 151.22857142857146 68.865L 151.22857142857146 68.865L 151.22857142857146 122.72999999999999Q 151.22857142857146 127.72999999999999 146.22857142857146 127.72999999999999L 147.20000000000002 127.72999999999999Q 142.20000000000002 127.72999999999999 142.20000000000002 122.72999999999999z"
                              pathfrom="M 142.20000000000002 122.72999999999999L 142.20000000000002 122.72999999999999L 151.22857142857146 122.72999999999999L 151.22857142857146 122.72999999999999L 151.22857142857146 122.72999999999999L 151.22857142857146 122.72999999999999L 151.22857142857146 122.72999999999999L 142.20000000000002 122.72999999999999"
                              cy="63.864999999999995"
                              cx="164.7714285714286"
                              j={6}
                              val={60}
                              barheight="63.864999999999995"
                              barwidth="9.028571428571428"
                            />
                            <g
                              id="SvgjsG1161"
                              className="apexcharts-bar-goals-markers"
                              style={{ pointerEvents: "none" }}
                            >
                              <g
                                id="SvgjsG1162"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1164"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1166"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1168"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1170"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1172"
                                classname="apexcharts-bar-goals-groups"
                              />
                              <g
                                id="SvgjsG1174"
                                classname="apexcharts-bar-goals-groups"
                              />
                            </g>
                          </g>
                          <g
                            id="SvgjsG1160"
                            className="apexcharts-datalabels"
                            data-realindex={0}
                          />
                        </g>
                        <line
                          id="SvgjsLine1211"
                          x1={0}
                          y1={0}
                          x2={158}
                          y2={0}
                          stroke="#b6b6b6"
                          strokeDasharray={0}
                          strokeWidth={1}
                          strokeLinecap="butt"
                          className="apexcharts-ycrosshairs"
                        />
                        <line
                          id="SvgjsLine1212"
                          x1={0}
                          y1={0}
                          x2={158}
                          y2={0}
                          strokeDasharray={0}
                          strokeWidth={0}
                          strokeLinecap="butt"
                          className="apexcharts-ycrosshairs-hidden"
                        />
                        <g
                          id="SvgjsG1213"
                          className="apexcharts-yaxis-annotations"
                        />
                        <g
                          id="SvgjsG1214"
                          className="apexcharts-xaxis-annotations"
                        />
                        <g
                          id="SvgjsG1215"
                          className="apexcharts-point-annotations"
                        />
                      </g>
                      <g
                        id="SvgjsG1199"
                        className="apexcharts-yaxis"
                        rel={0}
                        transform="translate(-8, 0)"
                      >
                        <g
                          id="SvgjsG1200"
                          className="apexcharts-yaxis-texts-g"
                        />
                      </g>
                      <g id="SvgjsG1149" className="apexcharts-annotations" />
                    </svg>
                    <div
                      className="apexcharts-legend"
                      style={{ maxHeight: 80 }}
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
                  </div>
                </div>
                <div className="resize-triggers">
                  <div className="expand-trigger">
                    <div style={{ width: 386, height: 176 }} />
                  </div>
                  <div className="contract-trigger" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* review List Table */}
      <div className="card">
        <div className="card-datatable table-responsive">
          <div
            id="DataTables_Table_0_wrapper"
            className="dataTables_wrapper dt-bootstrap5 no-footer"
          >
            <div className="card-header d-flex align-items-md-center align-items-start py-0 flex-wrap flex-md-row flex-column">
              <div className="me-5 ms-n4">
                <div
                  id="DataTables_Table_0_filter"
                  className="dataTables_filter mb-0 mb-md-6"
                >
                  <label>
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search Review"
                      aria-controls="DataTables_Table_0"
                    />
                  </label>
                </div>
              </div>
              <div className="dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-start align-items-sm-center justify-content-md-end pt-0 gap-sm-4 gap-6 flex-wrap flex-sm-row flex-column mb-6 mb-sm-0">
                <div
                  className="dataTables_length ms-n2 me-n2 mb-0 mb-sm-6"
                  id="DataTables_Table_0_length"
                >
                  <label>
                    <select
                      name="DataTables_Table_0_length"
                      aria-controls="DataTables_Table_0"
                      className="form-select"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </label>
                </div>
                <div className="review_filter">
                  <select id="Review" className="form-select">
                    <option value=""> All </option>
                    <option value="Pending" className="text-capitalize">
                      Pending
                    </option>
                    <option value="Published" className="text-capitalize">
                      Published
                    </option>
                  </select>
                </div>
                <div className="mx-0 me-md-n3 mt-sm-0">
                  <div className="dt-buttons btn-group flex-wrap">
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary buttons-collection dropdown-toggle btn-label-secondary me-3"
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
              className="datatables-review table border-top dataTable no-footer dtr-column"
              id="DataTables_Table_0"
              aria-describedby="DataTables_Table_0_info"
              style={{ width: 1390 }}
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
                    className="sorting sorting_asc"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 247 }}
                    aria-label="Product: activate to sort column descending"
                    aria-sort="ascending"
                  >
                    Product
                  </th>
                  <th
                    className="text-nowrap sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 211 }}
                    aria-label="Reviewer: activate to sort column ascending"
                  >
                    Reviewer
                  </th>
                  <th
                    className="sorting_disabled"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 391 }}
                    aria-label="Review"
                  >
                    Review
                  </th>
                  <th
                    className="sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 89 }}
                    aria-label="Date: activate to sort column ascending"
                  >
                    Date
                  </th>
                  <th
                    className="text-nowrap sorting"
                    tabIndex={0}
                    aria-controls="DataTables_Table_0"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 75 }}
                    aria-label="Status: activate to sort column ascending"
                  >
                    Status
                  </th>
                  <th
                    className="sorting_disabled"
                    rowSpan={1}
                    colSpan={1}
                    style={{ width: 59 }}
                    aria-label="Actions"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="odd">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-9.png"
                            alt="Product-9"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Air Jordan
                        </span>
                        <small>
                          Air Jordan is a line of basketball shoes produced by
                          Nike
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/5.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Gisela Leppard</span>
                        </a>
                        <small className="text-nowrap">
                          gleppard8@yandex.ru
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "38.6364%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">Ut mauris</p>
                      <small className="text-break pe-3">
                        Fusce consequat. Nulla nisl. Nunc nisl.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Apr 20, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="even">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-13.png"
                            alt="Product-13"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Amazon Fire TV
                        </span>
                        <small>
                          4K UHD smart TV, stream live TV without cable
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <span className="avatar-initial rounded-circle bg-label-info">
                            TV
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Tracey Ventham</span>
                        </a>
                        <small className="text-nowrap">
                          tventhamc@thetimes.co.uk
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "59.0909%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        At nunc commodo placerat praesent
                      </p>
                      <small className="text-break pe-3">
                        Aenean fermentum. Donec ut mauris eget massa tempor
                        convallis. Nulla neque libero, convallis eget, eleifend
                        luctus, ultricies eu, nibh.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Mar 17, 2021</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="odd">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-15.png"
                            alt="Product-15"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Apple iPad
                        </span>
                        <small>10.2-inch Retina Display, 64GB</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/10.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Jabez Heggs</span>
                        </a>
                        <small className="text-nowrap">jheggse@nba.com</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "18.1818%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">Ac consequat</p>
                      <small className="text-break pe-3">
                        Curabitur at ipsum ac tellus semper interdum. Mauris
                        ullamcorper purus sit amet nulla. Quisque arcu libero,
                        rutrum ac, lobortis vel, dapibus at, diam.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Apr 21, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="even">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-5.png"
                            alt="Product-5"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Apple Watch Series 7
                        </span>
                        <small>
                          Starlight Aluminum Case with Starlight Sport Band.
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/9.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Ethel Zanardii</span>
                        </a>
                        <small className="text-nowrap">
                          ezanardii4@mapy.cz
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "18.1818%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Etiam faucibus cursus
                      </p>
                      <small className="text-break pe-3">
                        Cras non velit nec nisi vulputate nonummy. Maecenas
                        tincidunt lacus at velit. Vivamus vel nulla eget eros
                        elementum pellentesque.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Jun 12, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-warning" text-capitalize="">
                      Pending
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="odd">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-16.png"
                            alt="Product-16"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          BANGE Anti Theft Backpack
                        </span>
                        <small>
                          Smart Business Laptop Fits 15.6 Inch Notebook
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/3.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Micaela Rowesby</span>
                        </a>
                        <small className="text-nowrap">
                          mrowesbyf@surveymonkey.com
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "18.1818%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Mattis egestas metus
                      </p>
                      <small className="text-break pe-3">
                        Morbi porttitor lorem id ligula. Suspendisse ornare
                        consequat lectus. In est risus, auctor sed, tristique
                        in, tempus sit amet, sem.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Dec 11, 2021</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="even">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-18.png"
                            alt="Product-18"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Canon EOS Rebel T7
                        </span>
                        <small>
                          18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <span className="avatar-initial rounded-circle bg-label-primary">
                            EB
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Emery Breitling</span>
                        </a>
                        <small className="text-nowrap">
                          ebreitlingh@friendfeed.com
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "100%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Nec nisi vulputate
                      </p>
                      <small className="text-break pe-3">
                        Proin interdum mauris non ligula pellentesque ultrices.
                        Phasellus id sapien in sapien iaculis congue. Vivamus
                        metus arcu, adipiscing molestie, hendrerit at, vulputate
                        vitae, nisl.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Dec 1, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-warning" text-capitalize="">
                      Pending
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="odd">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-3.png"
                            alt="Product-3"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Dohioue Wall Clock
                        </span>
                        <small>
                          Modern 10 Inch Battery Operated Wall Clocks
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/9.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Francyne Coulthurst</span>
                        </a>
                        <small className="text-nowrap">
                          fcoulthurst2@upenn.edu
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "38.6364%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Neque libero convallis
                      </p>
                      <small className="text-break pe-3">
                        Phasellus in felis. Donec semper sapien a libero. Nam
                        dui.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Aug 10, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="even">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-2.png"
                            alt="Product-2"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Echo Dot (4th Gen)
                        </span>
                        <small>Echo Dot Smart speaker with Alexa</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/13.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Stacey Hallgalley</span>
                        </a>
                        <small className="text-nowrap">
                          shallgalley1@google.nl
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "100%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">Libero ut</p>
                      <small className="text-break pe-3">
                        Aliquam quis turpis eget elit sodales scelerisque.
                        Mauris sit amet eros. Suspendisse accumsan tortor quis
                        turpis.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Mar 21, 2021</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="odd">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-19.png"
                            alt="Product-19"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          Honiway Wall Mirror
                        </span>
                        <small>
                          Decorative 12 inch Rustic Wood Mirror Sunburst Boho
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <img
                            src="../../assets/img/avatars/12.png"
                            alt="Avatar"
                            className="rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Wilona Fields</span>
                        </a>
                        <small className="text-nowrap">
                          wfieldsi@columbia.edu
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "18.1818%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Parturient montes nascetur ridiculus
                      </p>
                      <small className="text-break pe-3">
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Proin risus. Praesent lectus.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Mar 30, 2020</span>
                  </td>
                  <td>
                    <span className="badge bg-label-success" text-capitalize="">
                      Published
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr className="even">
                  <td
                    className="  control"
                    tabIndex={0}
                    style={{ display: "none" }}
                  />
                  <td className="  dt-checkboxes-cell">
                    <input
                      type="checkbox"
                      className="dt-checkboxes form-check-input"
                    />
                  </td>
                  <td className="sorting_1">
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar me-4 rounded-2 bg-label-secondary">
                          <img
                            src="../../assets/img/ecommerce-images/product-4.png"
                            alt="Product-4"
                            className="rounded"
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <span className="fw-medium text-nowrap text-heading">
                          INZCOU Running Shoes
                        </span>
                        <small>
                          Lightweight Tennis Shoes Non Slip Gym Workout Shoes
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex justify-content-start align-items-center customer-name">
                      <div className="avatar-wrapper">
                        <div className="avatar avatar-sm me-4">
                          <span className="avatar-initial rounded-circle bg-label-info">
                            NM
                          </span>
                        </div>
                      </div>
                      <div className="d-flex flex-column">
                        <a href="app-ecommerce-customer-details-overview.html">
                          <span className="fw-medium">Nate De Mitris</span>
                        </a>
                        <small className="text-nowrap">nde3@intel.com</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div
                        className="read-only-ratings ps-0 mb-1 jq-ry-container"
                        readOnly="readonly"
                        style={{ width: 132 }}
                      >
                        <div className="jq-ry-group-wrapper">
                          <div className="jq-ry-normal-group jq-ry-group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="gray"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                          <div
                            className="jq-ry-rated-group jq-ry-group"
                            style={{ width: "59.0909%" }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24px"
                              height="24px"
                              viewBox="0 0 22 22"
                              fill="#f39c12"
                              style={{ marginLeft: 3 }}
                            >
                              <path d="M20.1188 8.41458C20.0611 8.24488 19.9551 8.09576 19.8137 7.98564C19.6723 7.87552 19.5017 7.80922 19.3231 7.79492L14.0972 7.37967L11.8358 2.37375C11.7637 2.21252 11.6466 2.07558 11.4985 1.97945C11.3503 1.88333 11.1776 1.83213 11.001 1.83203C10.8244 1.83193 10.6515 1.88295 10.5033 1.97891C10.3551 2.07487 10.2378 2.21168 10.1656 2.37283L7.90417 7.37967L2.67826 7.79492C2.50268 7.80883 2.33482 7.87303 2.19477 7.97984C2.05472 8.08665 1.9484 8.23155 1.88854 8.3972C1.82869 8.56284 1.81782 8.74223 1.85724 8.9139C1.89666 9.08556 1.98471 9.24223 2.11084 9.36517L5.97276 13.1299L4.60693 19.0443C4.56545 19.2233 4.57874 19.4106 4.64508 19.582C4.71141 19.7534 4.82772 19.9009 4.97891 20.0053C5.1301 20.1098 5.3092 20.1664 5.49296 20.1678C5.67672 20.1692 5.85666 20.1153 6.00943 20.0132L11.0007 16.6857L15.9919 20.0132C16.1481 20.1168 16.3322 20.1702 16.5196 20.1661C16.707 20.162 16.8886 20.1006 17.04 19.9902C17.1915 19.8798 17.3055 19.7256 17.3667 19.5485C17.4279 19.3713 17.4335 19.1797 17.3825 18.9993L15.7059 13.1327L19.8639 9.39084C20.1362 9.14517 20.2361 8.762 20.1188 8.41458Z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <p className="h6 mb-1 text-truncate">
                        Accumsan tellus nisi eu
                      </p>
                      <small className="text-break pe-3">
                        Praesent id massa id nisl venenatis lacinia. Aenean sit
                        amet justo. Morbi ut odio.
                      </small>
                    </div>
                  </td>
                  <td>
                    <span className="text-nowrap">Dec 18, 2021</span>
                  </td>
                  <td>
                    <span className="badge bg-label-warning" text-capitalize="">
                      Pending
                    </span>
                  </td>
                  <td>
                    <div className="text-xxl-center">
                      <div className="dropdown">
                        <a
                          href="javascript:;"
                          className="btn btn-icon dropdown-toggle hide-arrow p-0"
                          data-bs-toggle="dropdown"
                        >
                          <i className="bx bx-dots-vertical-rounded bx-md" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-end">
                          <a href="javascript:;" className="dropdown-item">
                            Download
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Edit
                          </a>
                          <a href="javascript:;" className="dropdown-item">
                            Duplicate
                          </a>
                          <div className="dropdown-divider" />
                          <a
                            href="javascript:;"
                            className="dropdown-item delete-record text-danger"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
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
                  Showing 1 to 10 of 100 entries
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

export default Review;