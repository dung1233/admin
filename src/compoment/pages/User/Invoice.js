import React, { useEffect, useRef, useState } from 'react';

const Invoice = () => {
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
        View:false
    });


    // Hàm xử lý toggle cho từng menu
    const handleMenuToggle = (menuName) => {
        setMenuState((prevState) => ({
            ...prevState,
            [menuName]: !prevState[menuName], // Đảo ngược trạng thái của menu được click
        }));
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
                            <li className={`menu-item ${menuState.dashboard ? 'open' : ''}`}>
                                <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('dashboard'); }}>
                                    <i className="menu-icon tf-icons bx bx-home-smile"></i>
                                    <div className="text-truncate" data-i18n="Dashboards">Dashboards</div>
                                    <span className="badge rounded-pill bg-danger ms-auto">5</span>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item">
                                        <a href="index.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Analytics">Analytics</div>
                                        </a>
                                    </li>
                                    <li className="menu-item">
                                        <a href="https://demos.themeselection.com" target="_blank" className="menu-link">
                                            <div className="text-truncate" data-i18n="CRM">CRM</div>
                                        </a>
                                    </li>
                                    <li className="menu-item active">
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

                            <li className={`menu-item ${menuState.ecommerce ? 'open' : ''}`}>
                                <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('ecommerce'); }}>
                                    <i className="menu-icon tf-icons bx bx-cart-alt" />
                                    <div className="text-truncate" data-i18n="eCommerce">
                                        eCommerce
                                    </div>
                                </a>
                                <ul className="menu-sub">
                                    <li className="menu-item active">
                                        <a href="app-ecommerce-dashboard.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Dashboard">
                                                Dashboard
                                            </div>
                                        </a>
                                    </li>
                                    <li className={`menu-item ${menuState.frontPages ? 'open' : ''}`}>
                                        <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('frontPages'); }}>
                                            <div className="text-truncate" data-i18n="Products">
                                                Products
                                            </div>
                                        </a>
                                        <ul className="menu-sub">
                                            <li className="menu-item">
                                                <a href="/Product" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Product List">
                                                        Product List
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/Addproduct" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Add Product">
                                                        Add Product
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/Catenorylist" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Category List">
                                                        Category List
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item ${menuState.order ? 'open' : ''}`}>
                                        <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('order'); }}>
                                            <div className="text-truncate" data-i18n="Order">
                                                Order
                                            </div>
                                        </a>
                                        <ul className="menu-sub">
                                            <li className="menu-item">
                                                <a href="/Oderlist" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Order List">
                                                        Order List
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="/Oderdetails" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Order Details">
                                                        Order Details
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className={`menu-item ${menuState.Customer ? 'open' : ''}`}>
                                        <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('Customer'); }}>
                                            <div className="text-truncate" data-i18n="Customer">
                                                Customer
                                            </div>
                                        </a>
                                        <ul className="menu-sub">
                                            <li className="menu-item">
                                                <a href="/Customer" className="menu-link">
                                                    <div className="text-truncate" data-i18n="All Customers">
                                                        All Customers
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="javascript:void(0);" className="menu-link menu-toggle">
                                                    <div className="text-truncate" data-i18n="Customer Details">
                                                        Customer Details
                                                    </div>
                                                </a>
                                                <ul className="menu-sub">
                                                    <li className="menu-item">
                                                        <a
                                                            href="app-ecommerce-customer-details-overview.html"
                                                            className="menu-link"
                                                        >
                                                            <div className="text-truncate" data-i18n="Overview">
                                                                Overview
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="menu-item">
                                                        <a
                                                            href="app-ecommerce-customer-details-security.html"
                                                            className="menu-link"
                                                        >
                                                            <div className="text-truncate" data-i18n="Security">
                                                                Security
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="menu-item">
                                                        <a
                                                            href="app-ecommerce-customer-details-billing.html"
                                                            className="menu-link"
                                                        >
                                                            <div className="text-truncate" data-i18n="Address & Billing">
                                                                Address &amp; Billing
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="menu-item">
                                                        <a
                                                            href="app-ecommerce-customer-details-notifications.html"
                                                            className="menu-link"
                                                        >
                                                            <div className="text-truncate" data-i18n="Notifications">
                                                                Notifications
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="menu-item">
                                        <a href="app-ecommerce-manage-reviews.html" className="menu-link">
                                            <div className="text-truncate" data-i18n="Manage Reviews">
                                                Manage Reviews
                                            </div>
                                        </a>
                                    </li>

                                    <li className={`menu-item ${menuState.Settings ? 'open' : ''}`}>
                                        <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('Settings'); }}>
                                            <div className="text-truncate" data-i18n="Settings">
                                                Settings
                                            </div>
                                        </a>
                                        <ul className="menu-sub">
                                            <li className="menu-item">
                                                <a href="app-ecommerce-settings-detail.html" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Store Details">
                                                        Store Details
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="app-ecommerce-settings-payments.html" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Payments">
                                                        Payments
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="app-ecommerce-settings-checkout.html" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Checkout">
                                                        Checkout
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="app-ecommerce-settings-shipping.html" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Shipping & Delivery">
                                                        Shipping &amp; Delivery
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a href="app-ecommerce-settings-locations.html" className="menu-link">
                                                    <div className="text-truncate" data-i18n="Locations">
                                                        Locations
                                                    </div>
                                                </a>
                                            </li>
                                            <li className="menu-item">
                                                <a
                                                    href="app-ecommerce-settings-notifications.html"
                                                    className="menu-link"
                                                >
                                                    <div className="text-truncate" data-i18n="Notifications">
                                                        Notifications
                                                    </div>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    
                                </ul>
                                <li class="menu-item active open">
                                        <a href="javascript:void(0);" class="menu-link menu-toggle">
                                            <i class="menu-icon tf-icons bx bx-user"></i>
                                            <div class="text-truncate" data-i18n="Users">Users</div>
                                        </a>
                                        <ul class="menu-sub">
                                            <li class="menu-item active">
                                                <a href="app-user-list.html" class="menu-link">
                                                    <div class="text-truncate" data-i18n="List">List</div>
                                                </a>
                                            </li>

                                            <li className={`menu-item ${menuState.View? 'open' : ''}`}>
                                            <a href="#" className="menu-link menu-toggle" onClick={(e) => { e.preventDefault(); handleMenuToggle('View'); }}>
                                                    <div class="text-truncate" data-i18n="View">View</div>
                                                </a>
                                                <ul class="menu-sub">
                                                    <li class="menu-item">
                                                        <a href="/UserAc" class="menu-link">
                                                            <div class="text-truncate" data-i18n="Account">Account</div>
                                                        </a>
                                                    </li>
                                                    <li class="menu-item active open">
                                                        <a href="/Invoice" class="menu-link">
                                                            <div class="text-truncate" data-i18n="Security">Invoice</div>
                                                        </a>
                                                    </li>
                                                    {/* <li class="menu-item">
                                                        <a href="app-user-view-billing.html" class="menu-link">
                                                            <div class="text-truncate" data-i18n="Billing &amp; Plans">Billing &amp; Plans</div>
                                                        </a>
                                                    </li>
                                                    <li class="menu-item">
                                                        <a href="app-user-view-notifications.html" class="menu-link">
                                                            <div class="text-truncate" data-i18n="Notifications">Notifications</div>
                                                        </a>
                                                    </li>
                                                    <li class="menu-item">
                                                        <a href="app-user-view-connections.html" class="menu-link">
                                                            <div class="text-truncate" data-i18n="Connections">Connections</div>
                                                        </a>
                                                    </li> */}
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                            </li>


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
      <div className="row invoice-preview">
        {/* Invoice */}
        <div className="col-xl-9 col-md-8 col-12 mb-md-0 mb-6">
          <div className="card invoice-preview-card p-sm-12 p-6">
            <div className="card-body invoice-preview-header rounded">
              <div className="d-flex justify-content-between flex-xl-row flex-md-column flex-sm-row flex-column align-items-xl-center align-items-md-start align-items-sm-center align-items-start">
                <div className="mb-xl-0 mb-6 text-heading">
                  <div className="d-flex svg-illustration mb-6 gap-2 align-items-center">
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
                          <g
                            id="Brand-Logo"
                            transform="translate(-27.000000, -15.000000)"
                          >
                            <g
                              id="Icon"
                              transform="translate(27.000000, 15.000000)"
                            >
                              <g
                                id="Mask"
                                transform="translate(0.000000, 8.000000)"
                              >
                                <mask id="mask-2" fill="white">
                                  <use xlinkHref="#path-1" />
                                </mask>
                                <use fill="#696cff" xlinkHref="#path-1" />
                                <g id="Path-3" mask="url(#mask-2)">
                                  <use fill="#696cff" xlinkHref="#path-3" />
                                  <use
                                    fillOpacity="0.2"
                                    fill="#FFFFFF"
                                    xlinkHref="#path-3"
                                  />
                                </g>
                                <g id="Path-4" mask="url(#mask-2)">
                                  <use fill="#696cff" xlinkHref="#path-4" />
                                  <use
                                    fillOpacity="0.2"
                                    fill="#FFFFFF"
                                    xlinkHref="#path-4"
                                  />
                                </g>
                              </g>
                              <g
                                id="Triangle"
                                transform="translate(19.000000, 11.000000) rotate(-300.000000) translate(-19.000000, -11.000000) "
                              >
                                <use fill="#696cff" xlinkHref="#path-5" />
                                <use
                                  fillOpacity="0.2"
                                  fill="#FFFFFF"
                                  xlinkHref="#path-5"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                    <span className="app-brand-text demo fw-bold ms-50 lh-1">
                      sneat
                    </span>
                  </div>
                  <p className="mb-2">Office 149, 450 South Brand Brooklyn</p>
                  <p className="mb-2">San Diego County, CA 91905, USA</p>
                  <p className="mb-0">+1 (123) 456 7891, +44 (876) 543 2198</p>
                </div>
                <div>
                  <h5 className="mb-6">Invoice #86423</h5>
                  <div className="mb-1 text-heading">
                    <span>Date Issues:</span>
                    <span className="fw-medium">April 25, 2021</span>
                  </div>
                  <div className="text-heading">
                    <span>Date Due:</span>
                    <span className="fw-medium">May 25, 2021</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0">
              <div className="row">
                <div className="col-xl-6 col-md-12 col-sm-5 col-12 mb-xl-0 mb-md-6 mb-sm-0 mb-6">
                  <h6>Invoice To:</h6>
                  <p className="mb-1">Thomas shelby</p>
                  <p className="mb-1">Shelby Company Limited</p>
                  <p className="mb-1">Small Heath, B10 0HF, UK</p>
                  <p className="mb-1">718-986-6062</p>
                  <p className="mb-0">peakyFBlinders@gmail.com</p>
                </div>
                <div className="col-xl-6 col-md-12 col-sm-7 col-12">
                  <h6>Bill To:</h6>
                  <table>
                    <tbody>
                      <tr>
                        <td className="pe-4">Total Due:</td>
                        <td className="fw-medium">$12,110.55</td>
                      </tr>
                      <tr>
                        <td className="pe-4">Bank name:</td>
                        <td>American Bank</td>
                      </tr>
                      <tr>
                        <td className="pe-4">Country:</td>
                        <td>United States</td>
                      </tr>
                      <tr>
                        <td className="pe-4">IBAN:</td>
                        <td>ETD95476213874685</td>
                      </tr>
                      <tr>
                        <td className="pe-4">SWIFT code:</td>
                        <td>BR91905</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="table-responsive border border-bottom-0 border-top-0 rounded">
              <table className="table m-0">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Description</th>
                    <th>Cost</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-nowrap text-heading">
                      Vuexy Admin Template
                    </td>
                    <td className="text-nowrap">HTML Admin Template</td>
                    <td>$32</td>
                    <td>1</td>
                    <td>$32.00</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap text-heading">
                      Frest Admin Template
                    </td>
                    <td className="text-nowrap">Angular Admin Template</td>
                    <td>$22</td>
                    <td>1</td>
                    <td>$22.00</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap text-heading">
                      Apex Admin Template
                    </td>
                    <td className="text-nowrap">HTML Admin Template</td>
                    <td>$17</td>
                    <td>2</td>
                    <td>$34.00</td>
                  </tr>
                  <tr>
                    <td className="text-nowrap text-heading">
                      Robust Admin Template
                    </td>
                    <td className="text-nowrap">React Admin Template</td>
                    <td>$66</td>
                    <td>1</td>
                    <td>$66.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-responsive">
              <table className="table m-0 table-borderless">
                <tbody>
                  <tr>
                    <td className="align-top pe-6 ps-0 py-6 text-body">
                      <p className="mb-1">
                        <span className="me-2 h6">Salesperson:</span>
                        <span>Alfie Solomons</span>
                      </p>
                      <span>Thanks for your business</span>
                    </td>
                    <td className="px-0 py-6 w-px-100">
                      <p className="mb-2">Subtotal:</p>
                      <p className="mb-2">Discount:</p>
                      <p className="mb-2 border-bottom pb-2">Tax:</p>
                      <p className="mb-0">Total:</p>
                    </td>
                    <td className="text-end px-0 py-6 w-px-100 fw-medium text-heading">
                      <p className="fw-medium mb-2">$1800</p>
                      <p className="fw-medium mb-2">$28</p>
                      <p className="fw-medium mb-2 border-bottom pb-2">21%</p>
                      <p className="fw-medium mb-0">$1690</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className="mt-0 mb-6" />
            <div className="card-body p-0">
              <div className="row">
                <div className="col-12">
                  <span className="fw-medium text-heading">Note:</span>
                  <span>
                    It was a pleasure working with you and your team. We hope
                    you will keep us in mind for future freelance projects.
                    Thank You!
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Invoice */}
        {/* Invoice Actions */}
        <div className="col-xl-3 col-md-4 col-12 invoice-actions">
          <div className="card">
            <div className="card-body">
              <button
                className="btn btn-primary d-grid w-100 mb-4"
                data-bs-toggle="offcanvas"
                data-bs-target="#sendInvoiceOffcanvas"
              >
                <span className="d-flex align-items-center justify-content-center text-nowrap">
                  <i className="bx bx-paper-plane bx-sm me-2" />
                  Send Invoice
                </span>
              </button>
              <button className="btn btn-label-secondary d-grid w-100 mb-4">
                Download
              </button>
              <div className="d-flex mb-4">
                <a
                  className="btn btn-label-secondary d-grid w-100 me-4"
                  target="_blank"
                  href="./app-invoice-print.html"
                >
                  Print
                </a>
                <a
                  href="./app-invoice-edit.html"
                  className="btn btn-label-secondary d-grid w-100"
                >
                  Edit
                </a>
              </div>
              <button
                className="btn btn-success d-grid w-100"
                data-bs-toggle="offcanvas"
                data-bs-target="#addPaymentOffcanvas"
              >
                <span className="d-flex align-items-center justify-content-center text-nowrap">
                  <i className="bx bx-dollar bx-sm me-2" />
                  Add Payment
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* /Invoice Actions */}
      </div>
      {/* Offcanvas */}
      {/* Send Invoice Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        id="sendInvoiceOffcanvas"
        aria-hidden="true"
      >
        <div className="offcanvas-header mb-6 border-bottom">
          <h5 className="offcanvas-title">Send Invoice</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body pt-0 flex-grow-1">
          <form>
            <div className="mb-6">
              <label htmlFor="invoice-from" className="form-label">
                From
              </label>
              <input
                type="text"
                className="form-control"
                id="invoice-from"
                defaultValue="shelbyComapny@email.com"
                placeholder="company@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="invoice-to" className="form-label">
                To
              </label>
              <input
                type="text"
                className="form-control"
                id="invoice-to"
                defaultValue="qConsolidated@email.com"
                placeholder="company@email.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="invoice-subject" className="form-label">
                Subject
              </label>
              <input
                type="text"
                className="form-control"
                id="invoice-subject"
                defaultValue="Invoice of purchased Admin Templates"
                placeholder="Invoice regarding goods"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="invoice-message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                name="invoice-message"
                id="invoice-message"
                cols={3}
                rows={8}
                defaultValue={
                  "Dear Queen Consolidated,\n          Thank you for your business, always a pleasure to work with you!\n          We have generated a new invoice in the amount of $95.59\n          We would appreciate payment of this invoice by 05/11/2021"
                }
              />
            </div>
            <div className="mb-6">
              <span className="badge bg-label-primary">
                <i className="bx bx-link bx-xs" />
                <span className="align-middle">Invoice Attached</span>
              </span>
            </div>
            <div className="mb-6 d-flex flex-wrap">
              <button
                type="button"
                className="btn btn-primary me-4"
                data-bs-dismiss="offcanvas"
              >
                Send
              </button>
              <button
                type="button"
                className="btn btn-label-secondary"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Send Invoice Sidebar */}
      {/* Add Payment Sidebar */}
      <div
        className="offcanvas offcanvas-end"
        id="addPaymentOffcanvas"
        aria-hidden="true"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title">Add Payment</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body flex-grow-1">
          <div className="d-flex justify-content-between bg-lighter p-2 mb-4">
            <p className="mb-0">Invoice Balance:</p>
            <p className="fw-medium mb-0">$5000.00</p>
          </div>
          <form>
            <div className="mb-6">
              <label className="form-label" htmlFor="invoiceAmount">
                Payment Amount
              </label>
              <div className="input-group">
                <span className="input-group-text">$</span>
                <input
                  type="text"
                  id="invoiceAmount"
                  name="invoiceAmount"
                  className="form-control invoice-amount"
                  placeholder={100}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="payment-date">
                Payment Date
              </label>
              <input
                id="payment-date"
                className="form-control invoice-date flatpickr-input"
                type="text"
                readOnly="readonly"
              />
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="payment-method">
                Payment Method
              </label>
              <select className="form-select" id="payment-method">
                <option value="" selected="" disabled="">
                  Select payment method
                </option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Paypal">Paypal</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="form-label" htmlFor="payment-note">
                Internal Payment Note
              </label>
              <textarea
                className="form-control"
                id="payment-note"
                rows={2}
                defaultValue={""}
              />
            </div>
            <div className="mb-6 d-flex flex-wrap">
              <button
                type="button"
                className="btn btn-primary me-4"
                data-bs-dismiss="offcanvas"
              >
                Send
              </button>
              <button
                type="button"
                className="btn btn-label-secondary"
                data-bs-dismiss="offcanvas"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* /Add Payment Sidebar */}
      {/* /Offcanvas */}
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

export default Invoice