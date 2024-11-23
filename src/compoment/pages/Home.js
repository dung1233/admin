import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/Login/AuthContext'; // Import hook từ AuthContext

const Home = () => {
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
  //logout
  const { logout } = useAuth(); // Hàm logout từ AuthContext
  const navigate = useNavigate(); // Dùng để chuyển hướng

  // Hàm xử lý khi người dùng nhấn nút Logout
  const handleLogout = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
    logout(); // Gọi hàm logout để xóa token và trạng thái đăng nhập
    navigate('/login'); // Chuyển hướng người dùng tới trang Login
  };
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
                      href="/Chat"
                      target="_blank"
                      className="menu-link"
                    >
                      <div className="text-truncate" data-i18n="Logistics">
                        Chat
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
                        Inventory Managemen
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
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-4 me-xl-0 d-xl-none">
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
                  <div className="nav-item d-flex align-items-center">
                    <i className="bx bx-search bx-md" />
                    <input
                      type="text"
                      className="form-control border-0 shadow-none ps-1 ps-sm-2"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>
                {/* /Search */}
                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* Place this tag where you want the button to render. */}
                  <li className="nav-item lh-1 me-4">
                    <span />
                  </li>
                  {/* User */}
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow p-0"
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img
                                  src="../assets/img/avatars/1.png"
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
                        <a className="dropdown-item" href="#">
                          <i className="bx bx-user bx-md me-3" />
                          <span>My Profile</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          {" "}
                          <i className="bx bx-cog bx-md me-3" />
                          <span>Settings</span>{" "}
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
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
                        <a className="dropdown-item" onClick={handleLogout} >
                          <i className="bx bx-power-off bx-md me-3" />
                          <span>Log Out</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  {/*/ User */}
                </ul>
              </div>
            </nav>
            {/* / Navbar */}
            {/* Content wrapper */}
            <div className="content-wrapper">
              {/* Content */}
              <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-xxl-8 mb-6 order-0">
                    <div className="card">
                      <div className="d-flex align-items-start row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary mb-3">
                              Congratulations John! 🎉
                            </h5>
                            <p className="mb-6">
                              You have done 72% more sales today.
                              <br />
                              Check your new badge in your profile.
                            </p>
                            <a
                              href="javascript:;"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View Badges
                            </a>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-6">
                            <img
                              src="../assets/img/illustrations/man-with-laptop.png"
                              height={175}
                              className="scaleX-n1-rtl"
                              alt="View Badge User"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 order-1">
                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-6">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between mb-4">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/chart-success.png"
                                  alt="chart success"
                                  className="rounded"
                                />
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt3"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded text-muted" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="cardOpt3"
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
                            <p className="mb-1">Profit</p>
                            <h4 className="card-title mb-3">$12,628</h4>
                            <small className="text-success fw-medium">
                              <i className="bx bx-up-arrow-alt" /> +72.80%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-6 mb-6">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between mb-4">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/wallet-info.png"
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
                    </div>
                  </div>
                  {/* Total Revenue */}
                  <div className="col-12 col-xxl-8 order-2 order-md-3 order-xxl-2 mb-6">
                    <div className="card">
                      <div className="row row-bordered g-0">
                        <div className="col-lg-8">
                          <div className="card-header d-flex align-items-center justify-content-between">
                            <div className="card-title mb-0">
                              <h5 className="m-0 me-2">Total Revenue</h5>
                            </div>
                            <div className="dropdown">
                              <button
                                className="btn p-0"
                                type="button"
                                id="totalRevenue"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-vertical-rounded bx-lg text-muted" />
                              </button>
                              <div
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="totalRevenue"
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
                          <div
                            id="totalRevenueChart"
                            className="px-3"
                            style={{ minHeight: 332 }}
                          >
                            <div
                              id="apexcharts62s78r0n"
                              className="apexcharts-canvas apexcharts62s78r0n apexcharts-theme-light"
                              style={{ width: 486, height: 317 }}
                            >
                              <svg
                                id="SvgjsSvg1608"
                                width={486}
                                height={317}
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"

                                className="apexcharts-svg"
                                xmlns-data="ApexChartsNS"
                                transform="translate(0, 0)"
                                style={{ background: "transparent" }}
                              >
                                <foreignObject x={0} y={0} width={486} height={317}>
                                  <div
                                    className="apexcharts-legend apexcharts-align-left apx-legend-position-top"
                                    xmlns="http://www.w3.org/1999/xhtml"
                                    style={{
                                      right: 0,
                                      position: "absolute",
                                      left: 0,
                                      top: 4,
                                      maxHeight: "158.5px"
                                    }}
                                  >
                                    <div
                                      className="apexcharts-legend-series"
                                      rel={1}
                                      seriesname={2023}
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
                                          height: 8,
                                          width: 8,
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
                                        data-default-text={2023}
                                        data-collapsed="false"
                                        style={{
                                          color: "rgb(100, 110, 120)",
                                          fontSize: 13,
                                          fontWeight: 400,
                                          fontFamily: '"Public Sans"'
                                        }}
                                      >
                                        2023
                                      </span>
                                    </div>
                                    <div
                                      className="apexcharts-legend-series"
                                      rel={2}
                                      seriesname={2022}
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
                                          height: 8,
                                          width: 8,
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
                                        data-default-text={2022}
                                        data-collapsed="false"
                                        style={{
                                          color: "rgb(100, 110, 120)",
                                          fontSize: 13,
                                          fontWeight: 400,
                                          fontFamily: '"Public Sans"'
                                        }}
                                      >
                                        2022
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
                                  id="SvgjsG1610"
                                  className="apexcharts-inner apexcharts-graphical"
                                  transform="translate(55.65549278259277, 52)"
                                >
                                  <defs id="SvgjsDefs1609">
                                    <linearGradient
                                      id="SvgjsLinearGradient1614"
                                      x1={0}
                                      y1={0}
                                      x2={0}
                                      y2={1}
                                    >
                                      <stop
                                        id="SvgjsStop1615"
                                        stopOpacity="0.4"
                                        stopColor="rgba(216,227,240,0.4)"
                                        offset={0}
                                      />
                                      <stop
                                        id="SvgjsStop1616"
                                        stopOpacity="0.5"
                                        stopColor="rgba(190,209,230,0.5)"
                                        offset={1}
                                      />
                                      <stop
                                        id="SvgjsStop1617"
                                        stopOpacity="0.5"
                                        stopColor="rgba(190,209,230,0.5)"
                                        offset={1}
                                      />
                                    </linearGradient>
                                    <clipPath id="gridRectMask62s78r0n">
                                      <rect
                                        id="SvgjsRect1619"
                                        width="420.3445072174072"
                                        height="240.700799074173"
                                        x={-5}
                                        y={-3}
                                        rx={0}
                                        ry={0}
                                        opacity={1}
                                        strokeWidth={0}
                                        stroke="none"
                                        strokeDasharray={0}
                                        fill="#fff"
                                      />
                                    </clipPath>
                                    <clipPath id="forecastMask62s78r0n" />
                                    <clipPath id="nonForecastMask62s78r0n" />
                                    <clipPath id="gridRectMarkerMask62s78r0n">
                                      <rect
                                        id="SvgjsRect1620"
                                        width="414.3445072174072"
                                        height="238.700799074173"
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
                                    id="SvgjsRect1618"
                                    width="20.517225360870363"
                                    height="234.700799074173"
                                    x={0}
                                    y={0}
                                    rx={0}
                                    ry={0}
                                    opacity={1}
                                    strokeWidth={0}
                                    strokeDasharray={3}
                                    fill="url(#SvgjsLinearGradient1614)"
                                    className="apexcharts-xcrosshairs"
                                    y2="234.700799074173"
                                    filter="none"
                                    fillOpacity="0.9"
                                  />
                                  <g
                                    id="SvgjsG1640"
                                    className="apexcharts-xaxis"
                                    transform="translate(0, 0)"
                                  >
                                    <g
                                      id="SvgjsG1641"
                                      className="apexcharts-xaxis-texts-g"
                                      transform="translate(0, -4)"
                                    >
                                      <text
                                        id="SvgjsText1643"
                                        fontFamily="Public Sans"
                                        x="29.310321944100515"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1644">Jan</tspan>
                                        <title>Jan</title>
                                      </text>
                                      <text
                                        id="SvgjsText1646"
                                        fontFamily="Public Sans"
                                        x="87.93096583230155"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1647">Feb</tspan>
                                        <title>Feb</title>
                                      </text>
                                      <text
                                        id="SvgjsText1649"
                                        fontFamily="Public Sans"
                                        x="146.5516097205026"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1650">Mar</tspan>
                                        <title>Mar</title>
                                      </text>
                                      <text
                                        id="SvgjsText1652"
                                        fontFamily="Public Sans"
                                        x="205.1722536087036"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1653">Apr</tspan>
                                        <title>Apr</title>
                                      </text>
                                      <text
                                        id="SvgjsText1655"
                                        fontFamily="Public Sans"
                                        x="263.79289749690463"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1656">May</tspan>
                                        <title>May</title>
                                      </text>
                                      <text
                                        id="SvgjsText1658"
                                        fontFamily="Public Sans"
                                        x="322.41354138510565"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1659">Jun</tspan>
                                        <title>Jun</title>
                                      </text>
                                      <text
                                        id="SvgjsText1661"
                                        fontFamily="Public Sans"
                                        x="381.03418527330666"
                                        y="263.700799074173"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#a7acb2"
                                        className="apexcharts-text apexcharts-xaxis-label "
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        <tspan id="SvgjsTspan1662">Jul</tspan>
                                        <title>Jul</title>
                                      </text>
                                    </g>
                                  </g>
                                  <g id="SvgjsG1677" className="apexcharts-grid">
                                    <g
                                      id="SvgjsG1678"
                                      className="apexcharts-gridlines-horizontal"
                                    >
                                      <line
                                        id="SvgjsLine1680"
                                        x1={0}
                                        y1={0}
                                        x2="410.3445072174072"
                                        y2={0}
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine1681"
                                        x1={0}
                                        y1="46.9401598148346"
                                        x2="410.3445072174072"
                                        y2="46.9401598148346"
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine1682"
                                        x1={0}
                                        y1="93.8803196296692"
                                        x2="410.3445072174072"
                                        y2="93.8803196296692"
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine1683"
                                        x1={0}
                                        y1="140.8204794445038"
                                        x2="410.3445072174072"
                                        y2="140.8204794445038"
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine1684"
                                        x1={0}
                                        y1="187.7606392593384"
                                        x2="410.3445072174072"
                                        y2="187.7606392593384"
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                      <line
                                        id="SvgjsLine1685"
                                        x1={0}
                                        y1="234.700799074173"
                                        x2="410.3445072174072"
                                        y2="234.700799074173"
                                        stroke="#e4e6e8"
                                        strokeDasharray={7}
                                        strokeLinecap="butt"
                                        className="apexcharts-gridline"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG1679"
                                      className="apexcharts-gridlines-vertical"
                                    />
                                    <line
                                      id="SvgjsLine1687"
                                      x1={0}
                                      y1="234.700799074173"
                                      x2="410.3445072174072"
                                      y2="234.700799074173"
                                      stroke="transparent"
                                      strokeDasharray={0}
                                      strokeLinecap="butt"
                                    />
                                    <line
                                      id="SvgjsLine1686"
                                      x1={0}
                                      y1={1}
                                      x2={0}
                                      y2="234.700799074173"
                                      stroke="transparent"
                                      strokeDasharray={0}
                                      strokeLinecap="butt"
                                    />
                                  </g>
                                  <g
                                    id="SvgjsG1621"
                                    className="apexcharts-bar-series apexcharts-plot-series"
                                  >
                                    <g
                                      id="SvgjsG1622"
                                      className="apexcharts-series"
                                      seriesname={2023}
                                      rel={1}
                                      data-realindex={0}
                                    >
                                      <path
                                        id="SvgjsPath1624"
                                        d="M 19.051709263665334 130.8204794445038L 19.051709263665334 66.32819177780152Q 19.051709263665334 56.32819177780152 29.051709263665334 56.32819177780152L 23.5689346245357 56.32819177780152Q 33.5689346245357 56.32819177780152 33.5689346245357 66.32819177780152L 33.5689346245357 66.32819177780152L 33.5689346245357 130.8204794445038Q 33.5689346245357 140.8204794445038 23.5689346245357 140.8204794445038L 29.051709263665334 140.8204794445038Q 19.051709263665334 140.8204794445038 19.051709263665334 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 19.051709263665334 130.8204794445038L 19.051709263665334 66.32819177780152Q 19.051709263665334 56.32819177780152 29.051709263665334 56.32819177780152L 23.5689346245357 56.32819177780152Q 33.5689346245357 56.32819177780152 33.5689346245357 66.32819177780152L 33.5689346245357 66.32819177780152L 33.5689346245357 130.8204794445038Q 33.5689346245357 140.8204794445038 23.5689346245357 140.8204794445038L 29.051709263665334 140.8204794445038Q 19.051709263665334 140.8204794445038 19.051709263665334 130.8204794445038z"
                                        pathfrom="M 19.051709263665334 130.8204794445038L 19.051709263665334 130.8204794445038L 33.5689346245357 130.8204794445038L 33.5689346245357 130.8204794445038L 33.5689346245357 130.8204794445038L 33.5689346245357 130.8204794445038L 33.5689346245357 130.8204794445038L 19.051709263665334 130.8204794445038"
                                        cy="56.32819177780152"
                                        cx="74.67235315186636"
                                        j={0}
                                        val={18}
                                        barheight="84.49228766670228"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1625"
                                        d="M 77.67235315186636 130.8204794445038L 77.67235315186636 117.96236757411958Q 77.67235315186636 107.96236757411958 87.67235315186636 107.96236757411958L 82.18957851273672 107.96236757411958Q 92.18957851273672 107.96236757411958 92.18957851273672 117.96236757411958L 92.18957851273672 117.96236757411958L 92.18957851273672 130.8204794445038Q 92.18957851273672 140.8204794445038 82.18957851273672 140.8204794445038L 87.67235315186636 140.8204794445038Q 77.67235315186636 140.8204794445038 77.67235315186636 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 77.67235315186636 130.8204794445038L 77.67235315186636 117.96236757411958Q 77.67235315186636 107.96236757411958 87.67235315186636 107.96236757411958L 82.18957851273672 107.96236757411958Q 92.18957851273672 107.96236757411958 92.18957851273672 117.96236757411958L 92.18957851273672 117.96236757411958L 92.18957851273672 130.8204794445038Q 92.18957851273672 140.8204794445038 82.18957851273672 140.8204794445038L 87.67235315186636 140.8204794445038Q 77.67235315186636 140.8204794445038 77.67235315186636 130.8204794445038z"
                                        pathfrom="M 77.67235315186636 130.8204794445038L 77.67235315186636 130.8204794445038L 92.18957851273672 130.8204794445038L 92.18957851273672 130.8204794445038L 92.18957851273672 130.8204794445038L 92.18957851273672 130.8204794445038L 92.18957851273672 130.8204794445038L 77.67235315186636 130.8204794445038"
                                        cy="107.96236757411958"
                                        cx="133.2929970400674"
                                        j={1}
                                        val={7}
                                        barheight="32.85811187038422"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1626"
                                        d="M 136.2929970400674 130.8204794445038L 136.2929970400674 80.4102397222519Q 136.2929970400674 70.4102397222519 146.2929970400674 70.4102397222519L 140.81022240093776 70.4102397222519Q 150.81022240093776 70.4102397222519 150.81022240093776 80.4102397222519L 150.81022240093776 80.4102397222519L 150.81022240093776 130.8204794445038Q 150.81022240093776 140.8204794445038 140.81022240093776 140.8204794445038L 146.2929970400674 140.8204794445038Q 136.2929970400674 140.8204794445038 136.2929970400674 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 136.2929970400674 130.8204794445038L 136.2929970400674 80.4102397222519Q 136.2929970400674 70.4102397222519 146.2929970400674 70.4102397222519L 140.81022240093776 70.4102397222519Q 150.81022240093776 70.4102397222519 150.81022240093776 80.4102397222519L 150.81022240093776 80.4102397222519L 150.81022240093776 130.8204794445038Q 150.81022240093776 140.8204794445038 140.81022240093776 140.8204794445038L 146.2929970400674 140.8204794445038Q 136.2929970400674 140.8204794445038 136.2929970400674 130.8204794445038z"
                                        pathfrom="M 136.2929970400674 130.8204794445038L 136.2929970400674 130.8204794445038L 150.81022240093776 130.8204794445038L 150.81022240093776 130.8204794445038L 150.81022240093776 130.8204794445038L 150.81022240093776 130.8204794445038L 150.81022240093776 130.8204794445038L 136.2929970400674 130.8204794445038"
                                        cy="70.4102397222519"
                                        cx="191.91364092826842"
                                        j={2}
                                        val={15}
                                        barheight="70.4102397222519"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1627"
                                        d="M 194.91364092826842 130.8204794445038L 194.91364092826842 14.69401598148346Q 194.91364092826842 4.69401598148346 204.91364092826842 4.69401598148346L 199.43086628913878 4.69401598148346Q 209.43086628913878 4.69401598148346 209.43086628913878 14.69401598148346L 209.43086628913878 14.69401598148346L 209.43086628913878 130.8204794445038Q 209.43086628913878 140.8204794445038 199.43086628913878 140.8204794445038L 204.91364092826842 140.8204794445038Q 194.91364092826842 140.8204794445038 194.91364092826842 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 194.91364092826842 130.8204794445038L 194.91364092826842 14.69401598148346Q 194.91364092826842 4.69401598148346 204.91364092826842 4.69401598148346L 199.43086628913878 4.69401598148346Q 209.43086628913878 4.69401598148346 209.43086628913878 14.69401598148346L 209.43086628913878 14.69401598148346L 209.43086628913878 130.8204794445038Q 209.43086628913878 140.8204794445038 199.43086628913878 140.8204794445038L 204.91364092826842 140.8204794445038Q 194.91364092826842 140.8204794445038 194.91364092826842 130.8204794445038z"
                                        pathfrom="M 194.91364092826842 130.8204794445038L 194.91364092826842 130.8204794445038L 209.43086628913878 130.8204794445038L 209.43086628913878 130.8204794445038L 209.43086628913878 130.8204794445038L 209.43086628913878 130.8204794445038L 209.43086628913878 130.8204794445038L 194.91364092826842 130.8204794445038"
                                        cy="4.69401598148346"
                                        cx="250.53428481646944"
                                        j={3}
                                        val={29}
                                        barheight="136.12646346302034"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1628"
                                        d="M 253.53428481646944 130.8204794445038L 253.53428481646944 66.32819177780152Q 253.53428481646944 56.32819177780152 263.53428481646944 56.32819177780152L 258.0515101773398 56.32819177780152Q 268.0515101773398 56.32819177780152 268.0515101773398 66.32819177780152L 268.0515101773398 66.32819177780152L 268.0515101773398 130.8204794445038Q 268.0515101773398 140.8204794445038 258.0515101773398 140.8204794445038L 263.53428481646944 140.8204794445038Q 253.53428481646944 140.8204794445038 253.53428481646944 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 253.53428481646944 130.8204794445038L 253.53428481646944 66.32819177780152Q 253.53428481646944 56.32819177780152 263.53428481646944 56.32819177780152L 258.0515101773398 56.32819177780152Q 268.0515101773398 56.32819177780152 268.0515101773398 66.32819177780152L 268.0515101773398 66.32819177780152L 268.0515101773398 130.8204794445038Q 268.0515101773398 140.8204794445038 258.0515101773398 140.8204794445038L 263.53428481646944 140.8204794445038Q 253.53428481646944 140.8204794445038 253.53428481646944 130.8204794445038z"
                                        pathfrom="M 253.53428481646944 130.8204794445038L 253.53428481646944 130.8204794445038L 268.0515101773398 130.8204794445038L 268.0515101773398 130.8204794445038L 268.0515101773398 130.8204794445038L 268.0515101773398 130.8204794445038L 268.0515101773398 130.8204794445038L 253.53428481646944 130.8204794445038"
                                        cy="56.32819177780152"
                                        cx="309.15492870467045"
                                        j={4}
                                        val={18}
                                        barheight="84.49228766670228"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1629"
                                        d="M 312.15492870467045 130.8204794445038L 312.15492870467045 94.49228766670228Q 312.15492870467045 84.49228766670228 322.15492870467045 84.49228766670228L 316.67215406554084 84.49228766670228Q 326.67215406554084 84.49228766670228 326.67215406554084 94.49228766670228L 326.67215406554084 94.49228766670228L 326.67215406554084 130.8204794445038Q 326.67215406554084 140.8204794445038 316.67215406554084 140.8204794445038L 322.15492870467045 140.8204794445038Q 312.15492870467045 140.8204794445038 312.15492870467045 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 312.15492870467045 130.8204794445038L 312.15492870467045 94.49228766670228Q 312.15492870467045 84.49228766670228 322.15492870467045 84.49228766670228L 316.67215406554084 84.49228766670228Q 326.67215406554084 84.49228766670228 326.67215406554084 94.49228766670228L 326.67215406554084 94.49228766670228L 326.67215406554084 130.8204794445038Q 326.67215406554084 140.8204794445038 316.67215406554084 140.8204794445038L 322.15492870467045 140.8204794445038Q 312.15492870467045 140.8204794445038 312.15492870467045 130.8204794445038z"
                                        pathfrom="M 312.15492870467045 130.8204794445038L 312.15492870467045 130.8204794445038L 326.67215406554084 130.8204794445038L 326.67215406554084 130.8204794445038L 326.67215406554084 130.8204794445038L 326.67215406554084 130.8204794445038L 326.67215406554084 130.8204794445038L 312.15492870467045 130.8204794445038"
                                        cy="84.49228766670228"
                                        cx="367.77557259287147"
                                        j={5}
                                        val={12}
                                        barheight="56.32819177780152"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1630"
                                        d="M 370.77557259287147 130.8204794445038L 370.77557259287147 108.57433561115266Q 370.77557259287147 98.57433561115266 380.77557259287147 98.57433561115266L 375.29279795374185 98.57433561115266Q 385.29279795374185 98.57433561115266 385.29279795374185 108.57433561115266L 385.29279795374185 108.57433561115266L 385.29279795374185 130.8204794445038Q 385.29279795374185 140.8204794445038 375.29279795374185 140.8204794445038L 380.77557259287147 140.8204794445038Q 370.77557259287147 140.8204794445038 370.77557259287147 130.8204794445038z"
                                        fill="rgba(105,108,255,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={0}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 370.77557259287147 130.8204794445038L 370.77557259287147 108.57433561115266Q 370.77557259287147 98.57433561115266 380.77557259287147 98.57433561115266L 375.29279795374185 98.57433561115266Q 385.29279795374185 98.57433561115266 385.29279795374185 108.57433561115266L 385.29279795374185 108.57433561115266L 385.29279795374185 130.8204794445038Q 385.29279795374185 140.8204794445038 375.29279795374185 140.8204794445038L 380.77557259287147 140.8204794445038Q 370.77557259287147 140.8204794445038 370.77557259287147 130.8204794445038z"
                                        pathfrom="M 370.77557259287147 130.8204794445038L 370.77557259287147 130.8204794445038L 385.29279795374185 130.8204794445038L 385.29279795374185 130.8204794445038L 385.29279795374185 130.8204794445038L 385.29279795374185 130.8204794445038L 385.29279795374185 130.8204794445038L 370.77557259287147 130.8204794445038"
                                        cy="98.57433561115266"
                                        cx="426.3962164810725"
                                        j={6}
                                        val={9}
                                        barheight="42.24614383335114"
                                        barwidth="20.517225360870363"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG1631"
                                      className="apexcharts-series"
                                      seriesname={2022}
                                      rel={2}
                                      data-realindex={1}
                                    >
                                      <path
                                        id="SvgjsPath1633"
                                        d="M 19.051709263665334 160.8204794445038L 19.051709263665334 201.84268720378878Q 19.051709263665334 211.84268720378878 29.051709263665334 211.84268720378878L 23.5689346245357 211.84268720378878Q 33.5689346245357 211.84268720378878 33.5689346245357 201.84268720378878L 33.5689346245357 201.84268720378878L 33.5689346245357 160.8204794445038Q 33.5689346245357 150.8204794445038 23.5689346245357 150.8204794445038L 29.051709263665334 150.8204794445038Q 19.051709263665334 150.8204794445038 19.051709263665334 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 19.051709263665334 160.8204794445038L 19.051709263665334 201.84268720378878Q 19.051709263665334 211.84268720378878 29.051709263665334 211.84268720378878L 23.5689346245357 211.84268720378878Q 33.5689346245357 211.84268720378878 33.5689346245357 201.84268720378878L 33.5689346245357 201.84268720378878L 33.5689346245357 160.8204794445038Q 33.5689346245357 150.8204794445038 23.5689346245357 150.8204794445038L 29.051709263665334 150.8204794445038Q 19.051709263665334 150.8204794445038 19.051709263665334 160.8204794445038z"
                                        pathfrom="M 19.051709263665334 160.8204794445038L 19.051709263665334 160.8204794445038L 33.5689346245357 160.8204794445038L 33.5689346245357 160.8204794445038L 33.5689346245357 160.8204794445038L 33.5689346245357 160.8204794445038L 33.5689346245357 160.8204794445038L 19.051709263665334 160.8204794445038"
                                        cy="191.84268720378878"
                                        cx="74.67235315186636"
                                        j={0}
                                        val={-13}
                                        barheight="-61.02220775928498"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1634"
                                        d="M 77.67235315186636 160.8204794445038L 77.67235315186636 225.31276711120609Q 77.67235315186636 235.31276711120609 87.67235315186636 235.31276711120609L 82.18957851273672 235.31276711120609Q 92.18957851273672 235.31276711120609 92.18957851273672 225.31276711120609L 92.18957851273672 225.31276711120609L 92.18957851273672 160.8204794445038Q 92.18957851273672 150.8204794445038 82.18957851273672 150.8204794445038L 87.67235315186636 150.8204794445038Q 77.67235315186636 150.8204794445038 77.67235315186636 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 77.67235315186636 160.8204794445038L 77.67235315186636 225.31276711120609Q 77.67235315186636 235.31276711120609 87.67235315186636 235.31276711120609L 82.18957851273672 235.31276711120609Q 92.18957851273672 235.31276711120609 92.18957851273672 225.31276711120609L 92.18957851273672 225.31276711120609L 92.18957851273672 160.8204794445038Q 92.18957851273672 150.8204794445038 82.18957851273672 150.8204794445038L 87.67235315186636 150.8204794445038Q 77.67235315186636 150.8204794445038 77.67235315186636 160.8204794445038z"
                                        pathfrom="M 77.67235315186636 160.8204794445038L 77.67235315186636 160.8204794445038L 92.18957851273672 160.8204794445038L 92.18957851273672 160.8204794445038L 92.18957851273672 160.8204794445038L 92.18957851273672 160.8204794445038L 92.18957851273672 160.8204794445038L 77.67235315186636 160.8204794445038"
                                        cy="215.31276711120609"
                                        cx="133.2929970400674"
                                        j={1}
                                        val={-18}
                                        barheight="-84.49228766670228"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1635"
                                        d="M 136.2929970400674 160.8204794445038L 136.2929970400674 183.06662327785494Q 136.2929970400674 193.06662327785494 146.2929970400674 193.06662327785494L 140.81022240093776 193.06662327785494Q 150.81022240093776 193.06662327785494 150.81022240093776 183.06662327785494L 150.81022240093776 183.06662327785494L 150.81022240093776 160.8204794445038Q 150.81022240093776 150.8204794445038 140.81022240093776 150.8204794445038L 146.2929970400674 150.8204794445038Q 136.2929970400674 150.8204794445038 136.2929970400674 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 136.2929970400674 160.8204794445038L 136.2929970400674 183.06662327785494Q 136.2929970400674 193.06662327785494 146.2929970400674 193.06662327785494L 140.81022240093776 193.06662327785494Q 150.81022240093776 193.06662327785494 150.81022240093776 183.06662327785494L 150.81022240093776 183.06662327785494L 150.81022240093776 160.8204794445038Q 150.81022240093776 150.8204794445038 140.81022240093776 150.8204794445038L 146.2929970400674 150.8204794445038Q 136.2929970400674 150.8204794445038 136.2929970400674 160.8204794445038z"
                                        pathfrom="M 136.2929970400674 160.8204794445038L 136.2929970400674 160.8204794445038L 150.81022240093776 160.8204794445038L 150.81022240093776 160.8204794445038L 150.81022240093776 160.8204794445038L 150.81022240093776 160.8204794445038L 150.81022240093776 160.8204794445038L 136.2929970400674 160.8204794445038"
                                        cy="173.06662327785494"
                                        cx="191.91364092826842"
                                        j={2}
                                        val={-9}
                                        barheight="-42.24614383335114"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1636"
                                        d="M 194.91364092826842 160.8204794445038L 194.91364092826842 206.53670318527224Q 194.91364092826842 216.53670318527224 204.91364092826842 216.53670318527224L 199.43086628913878 216.53670318527224Q 209.43086628913878 216.53670318527224 209.43086628913878 206.53670318527224L 209.43086628913878 206.53670318527224L 209.43086628913878 160.8204794445038Q 209.43086628913878 150.8204794445038 199.43086628913878 150.8204794445038L 204.91364092826842 150.8204794445038Q 194.91364092826842 150.8204794445038 194.91364092826842 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 194.91364092826842 160.8204794445038L 194.91364092826842 206.53670318527224Q 194.91364092826842 216.53670318527224 204.91364092826842 216.53670318527224L 199.43086628913878 216.53670318527224Q 209.43086628913878 216.53670318527224 209.43086628913878 206.53670318527224L 209.43086628913878 206.53670318527224L 209.43086628913878 160.8204794445038Q 209.43086628913878 150.8204794445038 199.43086628913878 150.8204794445038L 204.91364092826842 150.8204794445038Q 194.91364092826842 150.8204794445038 194.91364092826842 160.8204794445038z"
                                        pathfrom="M 194.91364092826842 160.8204794445038L 194.91364092826842 160.8204794445038L 209.43086628913878 160.8204794445038L 209.43086628913878 160.8204794445038L 209.43086628913878 160.8204794445038L 209.43086628913878 160.8204794445038L 209.43086628913878 160.8204794445038L 194.91364092826842 160.8204794445038"
                                        cy="196.53670318527224"
                                        cx="250.53428481646944"
                                        j={3}
                                        val={-14}
                                        barheight="-65.71622374076844"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1637"
                                        d="M 253.53428481646944 160.8204794445038L 253.53428481646944 164.2905593519211Q 253.53428481646944 174.2905593519211 263.53428481646944 174.2905593519211L 258.0515101773398 174.2905593519211Q 268.0515101773398 174.2905593519211 268.0515101773398 164.2905593519211L 268.0515101773398 164.2905593519211L 268.0515101773398 160.8204794445038Q 268.0515101773398 150.8204794445038 258.0515101773398 150.8204794445038L 263.53428481646944 150.8204794445038Q 253.53428481646944 150.8204794445038 253.53428481646944 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 253.53428481646944 160.8204794445038L 253.53428481646944 164.2905593519211Q 253.53428481646944 174.2905593519211 263.53428481646944 174.2905593519211L 258.0515101773398 174.2905593519211Q 268.0515101773398 174.2905593519211 268.0515101773398 164.2905593519211L 268.0515101773398 164.2905593519211L 268.0515101773398 160.8204794445038Q 268.0515101773398 150.8204794445038 258.0515101773398 150.8204794445038L 263.53428481646944 150.8204794445038Q 253.53428481646944 150.8204794445038 253.53428481646944 160.8204794445038z"
                                        pathfrom="M 253.53428481646944 160.8204794445038L 253.53428481646944 160.8204794445038L 268.0515101773398 160.8204794445038L 268.0515101773398 160.8204794445038L 268.0515101773398 160.8204794445038L 268.0515101773398 160.8204794445038L 268.0515101773398 160.8204794445038L 253.53428481646944 160.8204794445038"
                                        cy="154.2905593519211"
                                        cx="309.15492870467045"
                                        j={4}
                                        val={-5}
                                        barheight="-23.4700799074173"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1638"
                                        d="M 312.15492870467045 160.8204794445038L 312.15492870467045 220.61875112972263Q 312.15492870467045 230.61875112972263 322.15492870467045 230.61875112972263L 316.67215406554084 230.61875112972263Q 326.67215406554084 230.61875112972263 326.67215406554084 220.61875112972263L 326.67215406554084 220.61875112972263L 326.67215406554084 160.8204794445038Q 326.67215406554084 150.8204794445038 316.67215406554084 150.8204794445038L 322.15492870467045 150.8204794445038Q 312.15492870467045 150.8204794445038 312.15492870467045 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 312.15492870467045 160.8204794445038L 312.15492870467045 220.61875112972263Q 312.15492870467045 230.61875112972263 322.15492870467045 230.61875112972263L 316.67215406554084 230.61875112972263Q 326.67215406554084 230.61875112972263 326.67215406554084 220.61875112972263L 326.67215406554084 220.61875112972263L 326.67215406554084 160.8204794445038Q 326.67215406554084 150.8204794445038 316.67215406554084 150.8204794445038L 322.15492870467045 150.8204794445038Q 312.15492870467045 150.8204794445038 312.15492870467045 160.8204794445038z"
                                        pathfrom="M 312.15492870467045 160.8204794445038L 312.15492870467045 160.8204794445038L 326.67215406554084 160.8204794445038L 326.67215406554084 160.8204794445038L 326.67215406554084 160.8204794445038L 326.67215406554084 160.8204794445038L 326.67215406554084 160.8204794445038L 312.15492870467045 160.8204794445038"
                                        cy="210.61875112972263"
                                        cx="367.77557259287147"
                                        j={5}
                                        val={-17}
                                        barheight="-79.79827168521882"
                                        barwidth="20.517225360870363"
                                      />
                                      <path
                                        id="SvgjsPath1639"
                                        d="M 370.77557259287147 160.8204794445038L 370.77557259287147 211.2307191667557Q 370.77557259287147 221.2307191667557 380.77557259287147 221.2307191667557L 375.29279795374185 221.2307191667557Q 385.29279795374185 221.2307191667557 385.29279795374185 211.2307191667557L 385.29279795374185 211.2307191667557L 385.29279795374185 160.8204794445038Q 385.29279795374185 150.8204794445038 375.29279795374185 150.8204794445038L 380.77557259287147 150.8204794445038Q 370.77557259287147 150.8204794445038 370.77557259287147 160.8204794445038z"
                                        fill="rgba(3,195,236,1)"
                                        fillOpacity={1}
                                        stroke="#ffffff"
                                        strokeOpacity={1}
                                        strokeLinecap="round"
                                        strokeWidth={6}
                                        strokeDasharray={0}
                                        className="apexcharts-bar-area"
                                        index={1}
                                        clipPath="url(#gridRectMask62s78r0n)"
                                        pathto="M 370.77557259287147 160.8204794445038L 370.77557259287147 211.2307191667557Q 370.77557259287147 221.2307191667557 380.77557259287147 221.2307191667557L 375.29279795374185 221.2307191667557Q 385.29279795374185 221.2307191667557 385.29279795374185 211.2307191667557L 385.29279795374185 211.2307191667557L 385.29279795374185 160.8204794445038Q 385.29279795374185 150.8204794445038 375.29279795374185 150.8204794445038L 380.77557259287147 150.8204794445038Q 370.77557259287147 150.8204794445038 370.77557259287147 160.8204794445038z"
                                        pathfrom="M 370.77557259287147 160.8204794445038L 370.77557259287147 160.8204794445038L 385.29279795374185 160.8204794445038L 385.29279795374185 160.8204794445038L 385.29279795374185 160.8204794445038L 385.29279795374185 160.8204794445038L 385.29279795374185 160.8204794445038L 370.77557259287147 160.8204794445038"
                                        cy="201.2307191667557"
                                        cx="426.3962164810725"
                                        j={6}
                                        val={-15}
                                        barheight="-70.4102397222519"
                                        barwidth="20.517225360870363"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG1623"
                                      className="apexcharts-datalabels"
                                      data-realindex={0}
                                    />
                                    <g
                                      id="SvgjsG1632"
                                      className="apexcharts-datalabels"
                                      data-realindex={1}
                                    />
                                  </g>
                                  <line
                                    id="SvgjsLine1688"
                                    x1={0}
                                    y1={0}
                                    x2="410.3445072174072"
                                    y2={0}
                                    stroke="#b6b6b6"
                                    strokeDasharray={0}
                                    strokeWidth={1}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs"
                                  />
                                  <line
                                    id="SvgjsLine1689"
                                    x1={0}
                                    y1={0}
                                    x2="410.3445072174072"
                                    y2={0}
                                    strokeDasharray={0}
                                    strokeWidth={0}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs-hidden"
                                  />
                                  <g
                                    id="SvgjsG1690"
                                    className="apexcharts-yaxis-annotations"
                                  />
                                  <g
                                    id="SvgjsG1691"
                                    className="apexcharts-xaxis-annotations"
                                  />
                                  <g
                                    id="SvgjsG1692"
                                    className="apexcharts-point-annotations"
                                  />
                                </g>
                                <g
                                  id="SvgjsG1663"
                                  className="apexcharts-yaxis"
                                  rel={0}
                                  transform="translate(17.655492782592773, 0)"
                                >
                                  <g id="SvgjsG1664" className="apexcharts-yaxis-texts-g">
                                    <text
                                      id="SvgjsText1665"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="53.5"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1666">30</tspan>
                                      <title>30</title>
                                    </text>
                                    <text
                                      id="SvgjsText1667"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="100.4401598148346"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1668">20</tspan>
                                      <title>20</title>
                                    </text>
                                    <text
                                      id="SvgjsText1669"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="147.3803196296692"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1670">10</tspan>
                                      <title>10</title>
                                    </text>
                                    <text
                                      id="SvgjsText1671"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="194.3204794445038"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1672">0</tspan>
                                      <title>0</title>
                                    </text>
                                    <text
                                      id="SvgjsText1673"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="241.2606392593384"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1674">-10</tspan>
                                      <title>-10</title>
                                    </text>
                                    <text
                                      id="SvgjsText1675"
                                      fontFamily="Public Sans"
                                      x={20}
                                      y="288.200799074173"
                                      textAnchor="end"
                                      dominantBaseline="auto"
                                      fontSize="13px"
                                      fontWeight={400}
                                      fill="#a7acb2"
                                      className="apexcharts-text apexcharts-yaxis-label "
                                      style={{ fontFamily: '"Public Sans"' }}
                                    >
                                      <tspan id="SvgjsTspan1676">-20</tspan>
                                      <title>-20</title>
                                    </text>
                                  </g>
                                </g>
                                <g id="SvgjsG1611" className="apexcharts-annotations" />
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
                              <div style={{ width: 511, height: 410 }} />
                            </div>
                            <div className="contract-trigger" />
                          </div>
                        </div>
                        <div className="col-lg-4 d-flex align-items-center">
                          <div
                            className="card-body px-xl-9"
                            style={{ position: "relative" }}
                          >
                            <div className="text-center mb-6">
                              <div className="btn-group">
                                <button type="button" className="btn btn-outline-primary">
                                  2023
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-outline-primary dropdown-toggle dropdown-toggle-split"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <span className="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul className="dropdown-menu">
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      2021
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      2020
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      href="javascript:void(0);"
                                    >
                                      2019
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div id="growthChart" style={{ minHeight: "154.875px" }}>
                              <div
                                id="apexchartsihy9w6mg"
                                className="apexcharts-canvas apexchartsihy9w6mg apexcharts-theme-light"
                                style={{ width: 202, height: "154.875px" }}
                              >
                                <svg
                                  id="SvgjsSvg1561"
                                  width={202}
                                  height="154.875"
                                  xmlns="http://www.w3.org/2000/svg"
                                  version="1.1"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"

                                  className="apexcharts-svg"
                                  xmlns-data="ApexChartsNS"
                                  transform="translate(0, 0)"
                                  style={{ background: "transparent" }}
                                >
                                  <g
                                    id="SvgjsG1563"
                                    className="apexcharts-inner apexcharts-graphical"
                                    transform="translate(-6, -25)"
                                  >
                                    <defs id="SvgjsDefs1562">
                                      <clipPath id="gridRectMaskihy9w6mg">
                                        <rect
                                          id="SvgjsRect1565"
                                          width={222}
                                          height={285}
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
                                      <clipPath id="forecastMaskihy9w6mg" />
                                      <clipPath id="nonForecastMaskihy9w6mg" />
                                      <clipPath id="gridRectMarkerMaskihy9w6mg">
                                        <rect
                                          id="SvgjsRect1566"
                                          width={220}
                                          height={287}
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
                                        id="SvgjsLinearGradient1571"
                                        x1={1}
                                        y1={0}
                                        x2={0}
                                        y2={1}
                                      >
                                        <stop
                                          id="SvgjsStop1572"
                                          stopOpacity={1}
                                          stopColor="rgba(105,108,255,1)"
                                          offset="0.3"
                                        />
                                        <stop
                                          id="SvgjsStop1573"
                                          stopOpacity="0.6"
                                          stopColor="rgba(255,255,255,0.6)"
                                          offset="0.7"
                                        />
                                        <stop
                                          id="SvgjsStop1574"
                                          stopOpacity="0.6"
                                          stopColor="rgba(255,255,255,0.6)"
                                          offset={1}
                                        />
                                      </linearGradient>
                                      <linearGradient
                                        id="SvgjsLinearGradient1582"
                                        x1={1}
                                        y1={0}
                                        x2={0}
                                        y2={1}
                                      >
                                        <stop
                                          id="SvgjsStop1583"
                                          stopOpacity={1}
                                          stopColor="rgba(105,108,255,1)"
                                          offset="0.3"
                                        />
                                        <stop
                                          id="SvgjsStop1584"
                                          stopOpacity="0.6"
                                          stopColor="rgba(105,108,255,0.6)"
                                          offset="0.7"
                                        />
                                        <stop
                                          id="SvgjsStop1585"
                                          stopOpacity="0.6"
                                          stopColor="rgba(105,108,255,0.6)"
                                          offset={1}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <g id="SvgjsG1567" className="apexcharts-radialbar">
                                      <g id="SvgjsG1568">
                                        <g id="SvgjsG1569" className="apexcharts-tracks">
                                          <g
                                            id="SvgjsG1570"
                                            className="apexcharts-radialbar-track apexcharts-track"
                                            rel={1}
                                          >
                                            <path
                                              id="apexcharts-radialbarTrack-0"
                                              d="M 73.83506097560974 167.17541022773656 A 68.32987804878049 68.32987804878049 0 1 1 142.16493902439026 167.17541022773656"
                                              fill="none"
                                              fillOpacity={1}
                                              stroke="rgba(255,255,255,0.85)"
                                              strokeOpacity={1}
                                              strokeLinecap="butt"
                                              strokeWidth="17.357317073170734"
                                              strokeDasharray={0}
                                              className="apexcharts-radialbar-area"
                                              data-pathorig="M 73.83506097560974 167.17541022773656 A 68.32987804878049 68.32987804878049 0 1 1 142.16493902439026 167.17541022773656"
                                            />
                                          </g>
                                        </g>
                                        <g id="SvgjsG1576">
                                          <g
                                            id="SvgjsG1581"
                                            className="apexcharts-series apexcharts-radial-series"
                                            seriesname="Growth"
                                            rel={1}
                                            data-realindex={0}
                                          >
                                            <path
                                              id="SvgjsPath1586"
                                              d="M 73.83506097560974 167.17541022773656 A 68.32987804878049 68.32987804878049 0 1 1 175.95555982735613 100.85758285229481"
                                              fill="none"
                                              fillOpacity="0.85"
                                              stroke="url(#SvgjsLinearGradient1582)"
                                              strokeOpacity={1}
                                              strokeLinecap="butt"
                                              strokeWidth="17.357317073170734"
                                              strokeDasharray={5}
                                              className="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
                                              data-angle={234}
                                              data-value={78}
                                              index={0}
                                              j={0}
                                              data-pathorig="M 73.83506097560974 167.17541022773656 A 68.32987804878049 68.32987804878049 0 1 1 175.95555982735613 100.85758285229481"
                                            />
                                          </g>
                                          <circle
                                            id="SvgjsCircle1577"
                                            r="54.65121951219512"
                                            cx={108}
                                            cy={108}
                                            className="apexcharts-radialbar-hollow"
                                            fill="transparent"
                                          />
                                          <g
                                            id="SvgjsG1578"
                                            className="apexcharts-datalabels-group"
                                            transform="translate(0, 0) scale(1)"
                                            style={{ opacity: 1 }}
                                          >
                                            <text
                                              id="SvgjsText1579"
                                              fontFamily="Public Sans"
                                              x={108}
                                              y={123}
                                              textAnchor="middle"
                                              dominantBaseline="auto"
                                              fontSize="15px"
                                              fontWeight={500}
                                              fill="#646e78"
                                              className="apexcharts-text apexcharts-datalabel-label"
                                              style={{ fontFamily: '"Public Sans"' }}
                                            >
                                              Growth
                                            </text>
                                            <text
                                              id="SvgjsText1580"
                                              fontFamily="Public Sans"
                                              x={108}
                                              y={99}
                                              textAnchor="middle"
                                              dominantBaseline="auto"
                                              fontSize="22px"
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
                                      id="SvgjsLine1587"
                                      x1={0}
                                      y1={0}
                                      x2={216}
                                      y2={0}
                                      stroke="#b6b6b6"
                                      strokeDasharray={0}
                                      strokeWidth={1}
                                      strokeLinecap="butt"
                                      className="apexcharts-ycrosshairs"
                                    />
                                    <line
                                      id="SvgjsLine1588"
                                      x1={0}
                                      y1={0}
                                      x2={216}
                                      y2={0}
                                      strokeDasharray={0}
                                      strokeWidth={0}
                                      strokeLinecap="butt"
                                      className="apexcharts-ycrosshairs-hidden"
                                    />
                                  </g>
                                  <g id="SvgjsG1564" className="apexcharts-annotations" />
                                </svg>
                                <div className="apexcharts-legend" />
                              </div>
                            </div>
                            <div className="text-center fw-medium my-6">
                              62% Company Growth
                            </div>
                            <div className="d-flex gap-3 justify-content-between">
                              <div className="d-flex">
                                <div className="avatar me-2">
                                  <span className="avatar-initial rounded-2 bg-label-primary">
                                    <i className="bx bx-dollar bx-lg text-primary" />
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>2023</small>
                                  <h6 className="mb-0">$32.5k</h6>
                                </div>
                              </div>
                              <div className="d-flex">
                                <div className="avatar me-2">
                                  <span className="avatar-initial rounded-2 bg-label-info">
                                    <i className="bx bx-wallet bx-lg text-info" />
                                  </span>
                                </div>
                                <div className="d-flex flex-column">
                                  <small>2022</small>
                                  <h6 className="mb-0">$41.2k</h6>
                                </div>
                              </div>
                            </div>
                            <div className="resize-triggers">
                              <div className="expand-trigger">
                                <div style={{ width: 275, height: 374 }} />
                              </div>
                              <div className="contract-trigger" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Total Revenue */}
                  <div className="col-12 col-md-8 col-lg-12 col-xxl-4 order-3 order-md-2">
                    <div className="row">
                      <div className="col-6 mb-6">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between mb-4">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/paypal.png"
                                  alt="paypal"
                                  className="rounded"
                                />
                              </div>
                              <div className="dropdown">
                                <button
                                  className="btn p-0"
                                  type="button"
                                  id="cardOpt4"
                                  data-bs-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  <i className="bx bx-dots-vertical-rounded text-muted" />
                                </button>
                                <div
                                  className="dropdown-menu dropdown-menu-end"
                                  aria-labelledby="cardOpt4"
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
                            <p className="mb-1">Payments</p>
                            <h4 className="card-title mb-3">$2,456</h4>
                            <small className="text-danger fw-medium">
                              <i className="bx bx-down-arrow-alt" /> -14.82%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-6">
                        <div className="card h-100">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between mb-4">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/cc-primary.png"
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
                      <div className="col-12 mb-6">
                        <div className="card">
                          <div className="card-body">
                            <div
                              className="d-flex justify-content-between align-items-center flex-sm-row flex-column gap-10"
                              style={{ position: "relative" }}
                            >
                              <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                <div className="card-title mb-6">
                                  <h5 className="text-nowrap mb-1">Profile Report</h5>
                                  <span className="badge bg-label-warning">
                                    YEAR 2022
                                  </span>
                                </div>
                                <div className="mt-sm-auto">
                                  <span className="text-success text-nowrap fw-medium">
                                    <i className="bx bx-up-arrow-alt" /> 68.2%
                                  </span>
                                  <h4 className="mb-0">$84,686k</h4>
                                </div>
                              </div>
                              <div id="profileReportChart" style={{ minHeight: 75 }}>
                                <div
                                  id="apexcharts0n0vwzan"
                                  className="apexcharts-canvas apexcharts0n0vwzan apexcharts-theme-light"
                                  style={{ width: 165, height: 75 }}
                                >
                                  <svg
                                    id="SvgjsSvg1694"
                                    width={165}
                                    height={75}
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.1"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"

                                    className="apexcharts-svg"
                                    xmlns-data="ApexChartsNS"
                                    transform="translate(0, 0)"
                                    style={{ background: "transparent" }}
                                  >
                                    <g
                                      id="SvgjsG1696"
                                      className="apexcharts-inner apexcharts-graphical"
                                      transform="translate(0, 0)"
                                    >
                                      <defs id="SvgjsDefs1695">
                                        <clipPath id="gridRectMask0n0vwzan">
                                          <rect
                                            id="SvgjsRect1701"
                                            width={166}
                                            height={80}
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
                                        <clipPath id="forecastMask0n0vwzan" />
                                        <clipPath id="nonForecastMask0n0vwzan" />
                                        <clipPath id="gridRectMarkerMask0n0vwzan">
                                          <rect
                                            id="SvgjsRect1702"
                                            width={161}
                                            height={79}
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
                                          id="SvgjsFilter1708"
                                          filterUnits="userSpaceOnUse"
                                          width="200%"
                                          height="200%"
                                          x="-50%"
                                          y="-50%"
                                        >
                                          <feFlood
                                            id="SvgjsFeFlood1709"
                                            floodColor="#ffab00"
                                            floodOpacity="0.15"
                                            result="SvgjsFeFlood1709Out"
                                            in="SourceGraphic"
                                          />
                                          <feComposite
                                            id="SvgjsFeComposite1710"
                                            in="SvgjsFeFlood1709Out"
                                            in2="SourceAlpha"
                                            operator="in"
                                            result="SvgjsFeComposite1710Out"
                                          />
                                          <feOffset
                                            id="SvgjsFeOffset1711"
                                            dx={5}
                                            dy={10}
                                            result="SvgjsFeOffset1711Out"
                                            in="SvgjsFeComposite1710Out"
                                          />
                                          <feGaussianBlur
                                            id="SvgjsFeGaussianBlur1712"
                                            stdDeviation={3}
                                            result="SvgjsFeGaussianBlur1712Out"
                                            in="SvgjsFeOffset1711Out"
                                          />
                                          <feMerge
                                            id="SvgjsFeMerge1713"
                                            result="SvgjsFeMerge1713Out"
                                            in="SourceGraphic"
                                          >
                                            <feMergeNode
                                              id="SvgjsFeMergeNode1714"
                                              in="SvgjsFeGaussianBlur1712Out"
                                            />
                                            <feMergeNode
                                              id="SvgjsFeMergeNode1715"
                                              in="[object Arguments]"
                                            />
                                          </feMerge>
                                          <feBlend
                                            id="SvgjsFeBlend1716"
                                            in="SourceGraphic"
                                            in2="SvgjsFeMerge1713Out"
                                            mode="normal"
                                            result="SvgjsFeBlend1716Out"
                                          />
                                        </filter>
                                      </defs>
                                      <line
                                        id="SvgjsLine1700"
                                        x1={0}
                                        y1={0}
                                        x2={0}
                                        y2={75}
                                        stroke="#b6b6b6"
                                        strokeDasharray={3}
                                        strokeLinecap="butt"
                                        className="apexcharts-xcrosshairs"
                                        x={0}
                                        y={0}
                                        width={1}
                                        height={75}
                                        fill="#b1b9c4"
                                        filter="none"
                                        fillOpacity="0.9"
                                        strokeWidth={1}
                                      />
                                      <g
                                        id="SvgjsG1717"
                                        className="apexcharts-xaxis"
                                        transform="translate(0, 0)"
                                      >
                                        <g
                                          id="SvgjsG1718"
                                          className="apexcharts-xaxis-texts-g"
                                          transform="translate(0, -4)"
                                        />
                                      </g>
                                      <g id="SvgjsG1726" className="apexcharts-grid">
                                        <g
                                          id="SvgjsG1727"
                                          className="apexcharts-gridlines-horizontal"
                                          style={{ display: "none" }}
                                        >
                                          <line
                                            id="SvgjsLine1729"
                                            x1={0}
                                            y1={0}
                                            x2={157}
                                            y2={0}
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine1730"
                                            x1={0}
                                            y1="18.75"
                                            x2={157}
                                            y2="18.75"
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine1731"
                                            x1={0}
                                            y1="37.5"
                                            x2={157}
                                            y2="37.5"
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine1732"
                                            x1={0}
                                            y1="56.25"
                                            x2={157}
                                            y2="56.25"
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                          <line
                                            id="SvgjsLine1733"
                                            x1={0}
                                            y1={75}
                                            x2={157}
                                            y2={75}
                                            stroke="#e0e0e0"
                                            strokeDasharray={0}
                                            strokeLinecap="butt"
                                            className="apexcharts-gridline"
                                          />
                                        </g>
                                        <g
                                          id="SvgjsG1728"
                                          className="apexcharts-gridlines-vertical"
                                          style={{ display: "none" }}
                                        />
                                        <line
                                          id="SvgjsLine1735"
                                          x1={0}
                                          y1={75}
                                          x2={157}
                                          y2={75}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                        <line
                                          id="SvgjsLine1734"
                                          x1={0}
                                          y1={1}
                                          x2={0}
                                          y2={75}
                                          stroke="transparent"
                                          strokeDasharray={0}
                                          strokeLinecap="butt"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG1703"
                                        className="apexcharts-line-series apexcharts-plot-series"
                                      >
                                        <g
                                          id="SvgjsG1704"
                                          className="apexcharts-series"
                                          seriesname="seriesx1"
                                          data-longestseries="true"
                                          rel={1}
                                          data-realindex={0}
                                        >
                                          <path
                                            id="SvgjsPath1707"
                                            d="M 0 71.25C 10.989999999999998 71.25 20.41 11.25 31.4 11.25C 42.39 11.25 51.81 58.125 62.8 58.125C 73.78999999999999 58.125 83.21000000000001 20.625 94.2 20.625C 105.19 20.625 114.61 35.625 125.6 35.625C 136.59 35.625 146.01 5.625 157 5.625"
                                            fill="none"
                                            fillOpacity={1}
                                            stroke="rgba(255,171,0,0.85)"
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={5}
                                            strokeDasharray={0}
                                            className="apexcharts-line"
                                            index={0}
                                            clipPath="url(#gridRectMask0n0vwzan)"
                                            filter="url(#SvgjsFilter1708)"
                                            pathto="M 0 71.25C 10.989999999999998 71.25 20.41 11.25 31.4 11.25C 42.39 11.25 51.81 58.125 62.8 58.125C 73.78999999999999 58.125 83.21000000000001 20.625 94.2 20.625C 105.19 20.625 114.61 35.625 125.6 35.625C 136.59 35.625 146.01 5.625 157 5.625"
                                            pathfrom="M -1 112.5L -1 112.5L 31.4 112.5L 62.8 112.5L 94.2 112.5L 125.6 112.5L 157 112.5"
                                          />
                                          <g
                                            id="SvgjsG1705"
                                            className="apexcharts-series-markers-wrap"
                                            data-realindex={0}
                                          >
                                            <g className="apexcharts-series-markers">
                                              <circle
                                                id="SvgjsCircle1741"
                                                r={0}
                                                cx={0}
                                                cy={0}
                                                className="apexcharts-marker wnpak99fb no-pointer-events"
                                                stroke="#ffffff"
                                                fill="#ffab00"
                                                fillOpacity={1}
                                                strokeWidth={2}
                                                strokeOpacity="0.9"
                                                default-marker-size={0}
                                              />
                                            </g>
                                          </g>
                                        </g>
                                        <g
                                          id="SvgjsG1706"
                                          className="apexcharts-datalabels"
                                          data-realindex={0}
                                        />
                                      </g>
                                      <line
                                        id="SvgjsLine1736"
                                        x1={0}
                                        y1={0}
                                        x2={157}
                                        y2={0}
                                        stroke="#b6b6b6"
                                        strokeDasharray={0}
                                        strokeWidth={1}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs"
                                      />
                                      <line
                                        id="SvgjsLine1737"
                                        x1={0}
                                        y1={0}
                                        x2={157}
                                        y2={0}
                                        strokeDasharray={0}
                                        strokeWidth={0}
                                        strokeLinecap="butt"
                                        className="apexcharts-ycrosshairs-hidden"
                                      />
                                      <g
                                        id="SvgjsG1738"
                                        className="apexcharts-yaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG1739"
                                        className="apexcharts-xaxis-annotations"
                                      />
                                      <g
                                        id="SvgjsG1740"
                                        className="apexcharts-point-annotations"
                                      />
                                    </g>
                                    <rect
                                      id="SvgjsRect1699"
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
                                      id="SvgjsG1725"
                                      className="apexcharts-yaxis"
                                      rel={0}
                                      transform="translate(-18, 0)"
                                    />
                                    <g
                                      id="SvgjsG1697"
                                      className="apexcharts-annotations"
                                    />
                                  </svg>
                                  <div
                                    className="apexcharts-legend"
                                    style={{ maxHeight: "37.5px" }}
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
                                  <div className="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light">
                                    <div className="apexcharts-yaxistooltip-text" />
                                  </div>
                                </div>
                              </div>
                              <div className="resize-triggers">
                                <div className="expand-trigger">
                                  <div style={{ width: 323, height: 140 }} />
                                </div>
                                <div className="contract-trigger" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {/* Order Statistics */}
                  <div className="col-md-6 col-lg-4 col-xl-4 order-0 mb-6">
                    <div className="card h-100">
                      <div className="card-header d-flex justify-content-between">
                        <div className="card-title mb-0">
                          <h5 className="mb-1 me-2">Order Statistics</h5>
                          <p className="card-subtitle">42.82k Total Sales</p>
                        </div>
                        <div className="dropdown">
                          <button
                            className="btn text-muted p-0"
                            type="button"
                            id="orederStatistics"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded bx-lg" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="orederStatistics"
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
                      <div className="card-body">
                        <div
                          className="d-flex justify-content-between align-items-center mb-6"
                          style={{ position: "relative" }}
                        >
                          <div className="d-flex flex-column align-items-center gap-1">
                            <h3 className="mb-1">8,258</h3>
                            <small>Total Orders</small>
                          </div>
                          <div
                            id="orderStatisticsChart"
                            style={{ minHeight: "117.55px" }}
                          >
                            <div
                              id="apexchartsr4o9p8ug"
                              className="apexcharts-canvas apexchartsr4o9p8ug apexcharts-theme-light"
                              style={{ width: 110, height: "117.55px" }}
                            >
                              <svg
                                id="SvgjsSvg1742"
                                width={110}
                                height="117.55"
                                xmlns="http://www.w3.org/2000/svg"
                                version="1.1"
                                xmlnsXlink="http://www.w3.org/1999/xlink"

                                className="apexcharts-svg"
                                xmlns-data="ApexChartsNS"
                                transform="translate(0, 0)"
                                style={{ background: "transparent" }}
                              >
                                <g
                                  id="SvgjsG1744"
                                  className="apexcharts-inner apexcharts-graphical"
                                  transform="translate(-7, 0)"
                                >
                                  <defs id="SvgjsDefs1743">
                                    <clipPath id="gridRectMaskr4o9p8ug">
                                      <rect
                                        id="SvgjsRect1746"
                                        width={130}
                                        height={153}
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
                                    <clipPath id="forecastMaskr4o9p8ug" />
                                    <clipPath id="nonForecastMaskr4o9p8ug" />
                                    <clipPath id="gridRectMarkerMaskr4o9p8ug">
                                      <rect
                                        id="SvgjsRect1747"
                                        width={125}
                                        height={152}
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
                                  <g id="SvgjsG1748" className="apexcharts-pie">
                                    <g
                                      id="SvgjsG1749"
                                      transform="translate(0, 0) scale(1)"
                                    >
                                      <circle
                                        id="SvgjsCircle1750"
                                        r="37.518292682926834"
                                        cx="60.5"
                                        cy="60.5"
                                        fill="transparent"
                                      />
                                      <g id="SvgjsG1751" className="apexcharts-slices">
                                        <g
                                          id="SvgjsG1752"
                                          className="apexcharts-series apexcharts-pie-series"
                                          seriesname="Electronic"
                                          rel={1}
                                          data-realindex={0}
                                        >
                                          <path
                                            id="SvgjsPath1753"
                                            d="M 60.5 10.475609756097555 A 50.024390243902445 50.024390243902445 0 0 1 110.52439024390245 60.5 L 98.01829268292684 60.5 A 37.518292682926834 37.518292682926834 0 0 0 60.5 22.981707317073166 L 60.5 10.475609756097555 z"
                                            fill="rgba(113,221,55,1)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={5}
                                            strokeDasharray={0}
                                            className="apexcharts-pie-area apexcharts-donut-slice-0"
                                            index={0}
                                            j={0}
                                            data-angle={90}
                                            data-startangle={0}
                                            data-strokewidth={5}
                                            data-value={50}
                                            data-pathorig="M 60.5 10.475609756097555 A 50.024390243902445 50.024390243902445 0 0 1 110.52439024390245 60.5 L 98.01829268292684 60.5 A 37.518292682926834 37.518292682926834 0 0 0 60.5 22.981707317073166 L 60.5 10.475609756097555 z"
                                            stroke="#ffffff"
                                          />
                                        </g>
                                        <g
                                          id="SvgjsG1754"
                                          className="apexcharts-series apexcharts-pie-series"
                                          seriesname="Sports"
                                          rel={2}
                                          data-realindex={1}
                                        >
                                          <path
                                            id="SvgjsPath1755"
                                            d="M 110.52439024390245 60.5 A 50.024390243902445 50.024390243902445 0 0 1 15.92794192413799 83.21059792599539 L 27.07095644310349 77.53294844449654 A 37.518292682926834 37.518292682926834 0 0 0 98.01829268292684 60.5 L 110.52439024390245 60.5 z"
                                            fill="rgba(105,108,255,1)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={5}
                                            strokeDasharray={0}
                                            className="apexcharts-pie-area apexcharts-donut-slice-1"
                                            index={0}
                                            j={1}
                                            data-angle={153}
                                            data-startangle={90}
                                            data-strokewidth={5}
                                            data-value={85}
                                            data-pathorig="M 110.52439024390245 60.5 A 50.024390243902445 50.024390243902445 0 0 1 15.92794192413799 83.21059792599539 L 27.07095644310349 77.53294844449654 A 37.518292682926834 37.518292682926834 0 0 0 98.01829268292684 60.5 L 110.52439024390245 60.5 z"
                                            stroke="#ffffff"
                                          />
                                        </g>
                                        <g
                                          id="SvgjsG1756"
                                          className="apexcharts-series apexcharts-pie-series"
                                          seriesname="Decor"
                                          rel={3}
                                          data-realindex={2}
                                        >
                                          <path
                                            id="SvgjsPath1757"
                                            d="M 15.92794192413799 83.21059792599539 A 50.024390243902445 50.024390243902445 0 0 1 12.923977684844871 45.04161328138981 L 24.817983263633657 48.90620996104236 A 37.518292682926834 37.518292682926834 0 0 0 27.07095644310349 77.53294844449654 L 15.92794192413799 83.21059792599539 z"
                                            fill="rgba(133,146,163,1)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={5}
                                            strokeDasharray={0}
                                            className="apexcharts-pie-area apexcharts-donut-slice-2"
                                            index={0}
                                            j={2}
                                            data-angle={45}
                                            data-startangle={243}
                                            data-strokewidth={5}
                                            data-value={25}
                                            data-pathorig="M 15.92794192413799 83.21059792599539 A 50.024390243902445 50.024390243902445 0 0 1 12.923977684844871 45.04161328138981 L 24.817983263633657 48.90620996104236 A 37.518292682926834 37.518292682926834 0 0 0 27.07095644310349 77.53294844449654 L 15.92794192413799 83.21059792599539 z"
                                            stroke="#ffffff"
                                          />
                                        </g>
                                        <g
                                          id="SvgjsG1758"
                                          className="apexcharts-series apexcharts-pie-series"
                                          seriesname="Fashion"
                                          rel={4}
                                          data-realindex={3}
                                        >
                                          <path
                                            id="SvgjsPath1759"
                                            d="M 12.923977684844871 45.04161328138981 A 50.024390243902445 50.024390243902445 0 0 1 60.491269096883734 10.475610518012587 L 60.4934518226628 22.98170788850944 A 37.518292682926834 37.518292682926834 0 0 0 24.817983263633657 48.90620996104236 L 12.923977684844871 45.04161328138981 z"
                                            fill="rgba(3,195,236,1)"
                                            fillOpacity={1}
                                            strokeOpacity={1}
                                            strokeLinecap="butt"
                                            strokeWidth={5}
                                            strokeDasharray={0}
                                            className="apexcharts-pie-area apexcharts-donut-slice-3"
                                            index={0}
                                            j={3}
                                            data-angle={72}
                                            data-startangle={288}
                                            data-strokewidth={5}
                                            data-value={40}
                                            data-pathorig="M 12.923977684844871 45.04161328138981 A 50.024390243902445 50.024390243902445 0 0 1 60.491269096883734 10.475610518012587 L 60.4934518226628 22.98170788850944 A 37.518292682926834 37.518292682926834 0 0 0 24.817983263633657 48.90620996104236 L 12.923977684844871 45.04161328138981 z"
                                            stroke="#ffffff"
                                          />
                                        </g>
                                      </g>
                                    </g>
                                    <g
                                      id="SvgjsG1760"
                                      className="apexcharts-datalabels-group"
                                      transform="translate(0, 0) scale(1)"
                                    >
                                      <text
                                        id="SvgjsText1761"
                                        fontFamily="Helvetica, Arial, sans-serif"
                                        x="60.5"
                                        y="77.5"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="13px"
                                        fontWeight={400}
                                        fill="#646e78"
                                        className="apexcharts-text apexcharts-datalabel-label"
                                        style={{
                                          fontFamily: "Helvetica, Arial, sans-serif"
                                        }}
                                      >
                                        Weekly
                                      </text>
                                      <text
                                        id="SvgjsText1762"
                                        fontFamily="Public Sans"
                                        x="60.5"
                                        y="59.5"
                                        textAnchor="middle"
                                        dominantBaseline="auto"
                                        fontSize="18px"
                                        fontWeight={500}
                                        fill="#384551"
                                        className="apexcharts-text apexcharts-datalabel-value"
                                        style={{ fontFamily: '"Public Sans"' }}
                                      >
                                        38%
                                      </text>
                                    </g>
                                  </g>
                                  <line
                                    id="SvgjsLine1763"
                                    x1={0}
                                    y1={0}
                                    x2={121}
                                    y2={0}
                                    stroke="#b6b6b6"
                                    strokeDasharray={0}
                                    strokeWidth={1}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs"
                                  />
                                  <line
                                    id="SvgjsLine1764"
                                    x1={0}
                                    y1={0}
                                    x2={121}
                                    y2={0}
                                    strokeDasharray={0}
                                    strokeWidth={0}
                                    strokeLinecap="butt"
                                    className="apexcharts-ycrosshairs-hidden"
                                  />
                                </g>
                                <g id="SvgjsG1745" className="apexcharts-annotations" />
                              </svg>
                              <div className="apexcharts-legend" />
                              <div className="apexcharts-tooltip apexcharts-theme-dark">
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
                                  style={{ order: 3 }}
                                >
                                  <span
                                    className="apexcharts-tooltip-marker"
                                    style={{ backgroundColor: "rgb(133, 146, 163)" }}
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
                                  style={{ order: 4 }}
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
                            </div>
                          </div>
                          <div className="resize-triggers">
                            <div className="expand-trigger">
                              <div style={{ width: 323, height: 119 }} />
                            </div>
                            <div className="contract-trigger" />
                          </div>
                        </div>
                        <ul className="p-0 m-0">
                          <li className="d-flex align-items-center mb-5">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-primary">
                                <i className="bx bx-mobile-alt" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Electronic</h6>
                                <small>Mobile, Earbuds, TV</small>
                              </div>
                              <div className="user-progress">
                                <h6 className="mb-0">82.5k</h6>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-5">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-success">
                                <i className="bx bx-closet" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Fashion</h6>
                                <small>T-shirt, Jeans, Shoes</small>
                              </div>
                              <div className="user-progress">
                                <h6 className="mb-0">23.8k</h6>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-5">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-info">
                                <i className="bx bx-home-alt" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Decor</h6>
                                <small>Fine Art, Dining</small>
                              </div>
                              <div className="user-progress">
                                <h6 className="mb-0">849k</h6>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="avatar flex-shrink-0 me-3">
                              <span className="avatar-initial rounded bg-label-secondary">
                                <i className="bx bx-football" />
                              </span>
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <h6 className="mb-0">Sports</h6>
                                <small>Football, Cricket Kit</small>
                              </div>
                              <div className="user-progress">
                                <h6 className="mb-0">99</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*/ Order Statistics */}
                  {/* Expense Overview */}
                  <div className="col-md-6 col-lg-4 order-1 mb-6">
                    <div className="card h-100">
                      <div className="card-header nav-align-top">
                        <ul className="nav nav-pills" role="tablist">
                          <li className="nav-item" role="presentation">
                            <button
                              type="button"
                              className="nav-link active"
                              role="tab"
                              data-bs-toggle="tab"
                              data-bs-target="#navs-tabs-line-card-income"
                              aria-controls="navs-tabs-line-card-income"
                              aria-selected="true"
                            >
                              Income
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              type="button"
                              className="nav-link"
                              role="tab"
                              aria-selected="false"
                              tabIndex={-1}
                            >
                              Expenses
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              type="button"
                              className="nav-link"
                              role="tab"
                              aria-selected="false"
                              tabIndex={-1}
                            >
                              Profit
                            </button>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="navs-tabs-line-card-income"
                            role="tabpanel"
                            style={{ position: "relative" }}
                          >
                            <div className="d-flex mb-6">
                              <div className="avatar flex-shrink-0 me-3">
                                <img
                                  src="../assets/img/icons/unicons/wallet.png"
                                  alt="User"
                                />
                              </div>
                              <div>
                                <p className="mb-0">Total Balance</p>
                                <div className="d-flex align-items-center">
                                  <h6 className="mb-0 me-1">$459.10</h6>
                                  <small className="text-success fw-medium">
                                    <i className="bx bx-chevron-up bx-lg" />
                                    42.9%
                                  </small>
                                </div>
                              </div>
                            </div>
                            <div id="incomeChart" style={{ minHeight: 232 }}>
                              <div
                                id="apexchartsyf33zvxd"
                                className="apexcharts-canvas apexchartsyf33zvxd apexcharts-theme-light"
                                style={{ width: 322, height: 232 }}
                              >
                                <svg
                                  id="SvgjsSvg1765"
                                  width={322}
                                  height={232}
                                  xmlns="http://www.w3.org/2000/svg"
                                  version="1.1"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"

                                  className="apexcharts-svg apexcharts-zoomable"
                                  xmlns-data="ApexChartsNS"
                                  transform="translate(0, 0)"
                                  style={{ background: "transparent" }}
                                >
                                  <g
                                    id="SvgjsG1767"
                                    className="apexcharts-inner apexcharts-graphical"
                                    transform="translate(10, 10)"
                                  >
                                    <defs id="SvgjsDefs1766">
                                      <clipPath id="gridRectMaskyf33zvxd">
                                        <rect
                                          id="SvgjsRect1772"
                                          width="301.6875"
                                          height="194.70079907417298"
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
                                      <clipPath id="forecastMaskyf33zvxd" />
                                      <clipPath id="nonForecastMaskyf33zvxd" />
                                      <clipPath id="gridRectMarkerMaskyf33zvxd">
                                        <rect
                                          id="SvgjsRect1773"
                                          width="322.6875"
                                          height="219.70079907417298"
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
                                      <linearGradient
                                        id="SvgjsLinearGradient1791"
                                        x1={0}
                                        y1={0}
                                        x2={0}
                                        y2={1}
                                      >
                                        <stop
                                          id="SvgjsStop1792"
                                          stopOpacity="0.5"
                                          stopColor="rgba(105,108,255,0.5)"
                                          offset={0}
                                        />
                                        <stop
                                          id="SvgjsStop1793"
                                          stopOpacity="0.25"
                                          stopColor="rgba(195,196,255,0.25)"
                                          offset="0.95"
                                        />
                                        <stop
                                          id="SvgjsStop1794"
                                          stopOpacity="0.25"
                                          stopColor="rgba(195,196,255,0.25)"
                                          offset={1}
                                        />
                                      </linearGradient>
                                    </defs>
                                    <line
                                      id="SvgjsLine1771"
                                      x1={0}
                                      y1={0}
                                      x2={0}
                                      y2="191.70079907417298"
                                      stroke="#b6b6b6"
                                      strokeDasharray={3}
                                      strokeLinecap="butt"
                                      className="apexcharts-xcrosshairs"
                                      x={0}
                                      y={0}
                                      width={1}
                                      height="191.70079907417298"
                                      fill="#b1b9c4"
                                      filter="none"
                                      fillOpacity="0.9"
                                      strokeWidth={1}
                                    />
                                    <g
                                      id="SvgjsG1797"
                                      className="apexcharts-xaxis"
                                      transform="translate(0, 0)"
                                    >
                                      <g
                                        id="SvgjsG1798"
                                        className="apexcharts-xaxis-texts-g"
                                        transform="translate(0, -4)"
                                      >
                                        <text
                                          id="SvgjsText1800"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x={0}
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1801">Jan</tspan>
                                          <title>Jan</title>
                                        </text>
                                        <text
                                          id="SvgjsText1803"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="49.11458333333333"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1804">Feb</tspan>
                                          <title>Feb</title>
                                        </text>
                                        <text
                                          id="SvgjsText1806"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="98.22916666666667"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1807">Mar</tspan>
                                          <title>Mar</title>
                                        </text>
                                        <text
                                          id="SvgjsText1809"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="147.34375000000003"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1810">Apr</tspan>
                                          <title>Apr</title>
                                        </text>
                                        <text
                                          id="SvgjsText1812"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="196.45833333333337"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1813">May</tspan>
                                          <title>May</title>
                                        </text>
                                        <text
                                          id="SvgjsText1815"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="245.5729166666667"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1816">Jun</tspan>
                                          <title>Jun</title>
                                        </text>
                                        <text
                                          id="SvgjsText1818"
                                          fontFamily="Helvetica, Arial, sans-serif"
                                          x="294.6875"
                                          y="220.70079907417298"
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
                                          <tspan id="SvgjsTspan1819">Jul</tspan>
                                          <title>Jul</title>
                                        </text>
                                      </g>
                                    </g>
                                    <g id="SvgjsG1822" className="apexcharts-grid">
                                      <g
                                        id="SvgjsG1823"
                                        className="apexcharts-gridlines-horizontal"
                                      >
                                        <line
                                          id="SvgjsLine1825"
                                          x1={0}
                                          y1={0}
                                          x2="294.6875"
                                          y2={0}
                                          stroke="#e4e6e8"
                                          strokeDasharray={8}
                                          strokeLinecap="butt"
                                          className="apexcharts-gridline"
                                        />
                                        <line
                                          id="SvgjsLine1826"
                                          x1={0}
                                          y1="47.925199768543244"
                                          x2="294.6875"
                                          y2="47.925199768543244"
                                          stroke="#e4e6e8"
                                          strokeDasharray={8}
                                          strokeLinecap="butt"
                                          className="apexcharts-gridline"
                                        />
                                        <line
                                          id="SvgjsLine1827"
                                          x1={0}
                                          y1="95.85039953708649"
                                          x2="294.6875"
                                          y2="95.85039953708649"
                                          stroke="#e4e6e8"
                                          strokeDasharray={8}
                                          strokeLinecap="butt"
                                          className="apexcharts-gridline"
                                        />
                                        <line
                                          id="SvgjsLine1828"
                                          x1={0}
                                          y1="143.77559930562973"
                                          x2="294.6875"
                                          y2="143.77559930562973"
                                          stroke="#e4e6e8"
                                          strokeDasharray={8}
                                          strokeLinecap="butt"
                                          className="apexcharts-gridline"
                                        />
                                        <line
                                          id="SvgjsLine1829"
                                          x1={0}
                                          y1="191.70079907417298"
                                          x2="294.6875"
                                          y2="191.70079907417298"
                                          stroke="#e4e6e8"
                                          strokeDasharray={8}
                                          strokeLinecap="butt"
                                          className="apexcharts-gridline"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG1824"
                                        className="apexcharts-gridlines-vertical"
                                      />
                                      <line
                                        id="SvgjsLine1831"
                                        x1={0}
                                        y1="191.70079907417298"
                                        x2="294.6875"
                                        y2="191.70079907417298"
                                        stroke="transparent"
                                        strokeDasharray={0}
                                        strokeLinecap="butt"
                                      />
                                      <line
                                        id="SvgjsLine1830"
                                        x1={0}
                                        y1={1}
                                        x2={0}
                                        y2="191.70079907417298"
                                        stroke="transparent"
                                        strokeDasharray={0}
                                        strokeLinecap="butt"
                                      />
                                    </g>
                                    <g
                                      id="SvgjsG1774"
                                      className="apexcharts-area-series apexcharts-plot-series"
                                    >
                                      <g
                                        id="SvgjsG1775"
                                        className="apexcharts-series"
                                        seriesname="seriesx1"
                                        data-longestseries="true"
                                        rel={1}
                                        data-realindex={0}
                                      >
                                        <path
                                          id="SvgjsPath1795"
                                          d="M 0 191.70079907417298L 0 138.98307932877543C 17.190104166666664 138.98307932877543 31.924479166666664 95.8503995370865 49.11458333333333 95.8503995370865C 66.3046875 95.8503995370865 81.0390625 134.19055935192108 98.22916666666666 134.19055935192108C 115.41927083333333 134.19055935192108 130.15364583333334 38.34015981483461 147.34375 38.34015981483461C 164.53385416666666 38.34015981483461 179.26822916666666 115.02047944450379 196.45833333333331 115.02047944450379C 213.64843749999997 115.02047944450379 228.3828125 71.88779965281486 245.57291666666666 71.88779965281486C 262.7630208333333 71.88779965281486 277.4973958333333 100.64291951394083 294.6875 100.64291951394083C 294.6875 100.64291951394083 294.6875 100.64291951394083 294.6875 191.70079907417298M 294.6875 100.64291951394083z"
                                          fill="url(#SvgjsLinearGradient1791)"
                                          fillOpacity={1}
                                          strokeOpacity={1}
                                          strokeLinecap="butt"
                                          strokeWidth={0}
                                          strokeDasharray={0}
                                          className="apexcharts-area"
                                          index={0}
                                          clipPath="url(#gridRectMaskyf33zvxd)"
                                          pathto="M 0 191.70079907417298L 0 138.98307932877543C 17.190104166666664 138.98307932877543 31.924479166666664 95.8503995370865 49.11458333333333 95.8503995370865C 66.3046875 95.8503995370865 81.0390625 134.19055935192108 98.22916666666666 134.19055935192108C 115.41927083333333 134.19055935192108 130.15364583333334 38.34015981483461 147.34375 38.34015981483461C 164.53385416666666 38.34015981483461 179.26822916666666 115.02047944450379 196.45833333333331 115.02047944450379C 213.64843749999997 115.02047944450379 228.3828125 71.88779965281486 245.57291666666666 71.88779965281486C 262.7630208333333 71.88779965281486 277.4973958333333 100.64291951394083 294.6875 100.64291951394083C 294.6875 100.64291951394083 294.6875 100.64291951394083 294.6875 191.70079907417298M 294.6875 100.64291951394083z"
                                          pathfrom="M -1 239.62599884271623L -1 239.62599884271623L 49.11458333333333 239.62599884271623L 98.22916666666666 239.62599884271623L 147.34375 239.62599884271623L 196.45833333333331 239.62599884271623L 245.57291666666666 239.62599884271623L 294.6875 239.62599884271623"
                                        />
                                        <path
                                          id="SvgjsPath1796"
                                          d="M 0 138.98307932877543C 17.190104166666664 138.98307932877543 31.924479166666664 95.8503995370865 49.11458333333333 95.8503995370865C 66.3046875 95.8503995370865 81.0390625 134.19055935192108 98.22916666666666 134.19055935192108C 115.41927083333333 134.19055935192108 130.15364583333334 38.34015981483461 147.34375 38.34015981483461C 164.53385416666666 38.34015981483461 179.26822916666666 115.02047944450379 196.45833333333331 115.02047944450379C 213.64843749999997 115.02047944450379 228.3828125 71.88779965281486 245.57291666666666 71.88779965281486C 262.7630208333333 71.88779965281486 277.4973958333333 100.64291951394083 294.6875 100.64291951394083"
                                          fill="none"
                                          fillOpacity={1}
                                          stroke="#696cff"
                                          strokeOpacity={1}
                                          strokeLinecap="butt"
                                          strokeWidth={3}
                                          strokeDasharray={0}
                                          className="apexcharts-area"
                                          index={0}
                                          clipPath="url(#gridRectMaskyf33zvxd)"
                                          pathto="M 0 138.98307932877543C 17.190104166666664 138.98307932877543 31.924479166666664 95.8503995370865 49.11458333333333 95.8503995370865C 66.3046875 95.8503995370865 81.0390625 134.19055935192108 98.22916666666666 134.19055935192108C 115.41927083333333 134.19055935192108 130.15364583333334 38.34015981483461 147.34375 38.34015981483461C 164.53385416666666 38.34015981483461 179.26822916666666 115.02047944450379 196.45833333333331 115.02047944450379C 213.64843749999997 115.02047944450379 228.3828125 71.88779965281486 245.57291666666666 71.88779965281486C 262.7630208333333 71.88779965281486 277.4973958333333 100.64291951394083 294.6875 100.64291951394083"
                                          pathfrom="M -1 239.62599884271623L -1 239.62599884271623L 49.11458333333333 239.62599884271623L 98.22916666666666 239.62599884271623L 147.34375 239.62599884271623L 196.45833333333331 239.62599884271623L 245.57291666666666 239.62599884271623L 294.6875 239.62599884271623"
                                        />
                                        <g
                                          id="SvgjsG1776"
                                          className="apexcharts-series-markers-wrap"
                                          data-realindex={0}
                                        >
                                          <g
                                            id="SvgjsG1778"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1779"
                                              r={6}
                                              cx={0}
                                              cy="138.98307932877543"
                                              className="apexcharts-marker no-pointer-events whjby2yge"
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
                                              id="SvgjsCircle1780"
                                              r={6}
                                              cx="49.11458333333333"
                                              cy="95.8503995370865"
                                              className="apexcharts-marker no-pointer-events ww9haysbhi"
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
                                            id="SvgjsG1781"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1782"
                                              r={6}
                                              cx="98.22916666666666"
                                              cy="134.19055935192108"
                                              className="apexcharts-marker no-pointer-events wk3of7rq6f"
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
                                            id="SvgjsG1783"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1784"
                                              r={6}
                                              cx="147.34375"
                                              cy="38.34015981483461"
                                              className="apexcharts-marker no-pointer-events w4tg3ohm7"
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
                                            id="SvgjsG1785"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1786"
                                              r={6}
                                              cx="196.45833333333331"
                                              cy="115.02047944450379"
                                              className="apexcharts-marker no-pointer-events wob3lwksu"
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
                                            id="SvgjsG1787"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1788"
                                              r={6}
                                              cx="245.57291666666666"
                                              cy="71.88779965281486"
                                              className="apexcharts-marker no-pointer-events wny6bbr74"
                                              stroke="transparent"
                                              fill="transparent"
                                              fillOpacity={1}
                                              strokeWidth={4}
                                              strokeOpacity="0.9"
                                              rel={5}
                                              j={5}
                                              index={0}
                                              default-marker-size={6}
                                            />
                                          </g>
                                          <g
                                            id="SvgjsG1789"
                                            className="apexcharts-series-markers"
                                            clipPath="url(#gridRectMarkerMaskyf33zvxd)"
                                          >
                                            <circle
                                              id="SvgjsCircle1790"
                                              r={6}
                                              cx="294.6875"
                                              cy="100.64291951394083"
                                              className="apexcharts-marker no-pointer-events wrtqxnhbv"
                                              stroke="#696cff"
                                              fill="#ffffff"
                                              fillOpacity={1}
                                              strokeWidth={4}
                                              strokeOpacity="0.9"
                                              rel={6}
                                              j={6}
                                              index={0}
                                              default-marker-size={6}
                                            />
                                          </g>
                                        </g>
                                      </g>
                                      <g
                                        id="SvgjsG1777"
                                        className="apexcharts-datalabels"
                                        data-realindex={0}
                                      />
                                    </g>
                                    <line
                                      id="SvgjsLine1832"
                                      x1={0}
                                      y1={0}
                                      x2="294.6875"
                                      y2={0}
                                      stroke="#b6b6b6"
                                      strokeDasharray={0}
                                      strokeWidth={1}
                                      strokeLinecap="butt"
                                      className="apexcharts-ycrosshairs"
                                    />
                                    <line
                                      id="SvgjsLine1833"
                                      x1={0}
                                      y1={0}
                                      x2="294.6875"
                                      y2={0}
                                      strokeDasharray={0}
                                      strokeWidth={0}
                                      strokeLinecap="butt"
                                      className="apexcharts-ycrosshairs-hidden"
                                    />
                                    <g
                                      id="SvgjsG1834"
                                      className="apexcharts-yaxis-annotations"
                                    />
                                    <g
                                      id="SvgjsG1835"
                                      className="apexcharts-xaxis-annotations"
                                    />
                                    <g
                                      id="SvgjsG1836"
                                      className="apexcharts-point-annotations"
                                    />
                                    <rect
                                      id="SvgjsRect1837"
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
                                      id="SvgjsRect1838"
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
                                    id="SvgjsRect1770"
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
                                    id="SvgjsG1820"
                                    className="apexcharts-yaxis"
                                    rel={0}
                                    transform="translate(-8, 0)"
                                  >
                                    <g
                                      id="SvgjsG1821"
                                      className="apexcharts-yaxis-texts-g"
                                    />
                                  </g>
                                  <g id="SvgjsG1768" className="apexcharts-annotations" />
                                </svg>
                                <div
                                  className="apexcharts-legend"
                                  style={{ maxHeight: 116 }}
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
                            <div className="d-flex align-items-center justify-content-center mt-6 gap-3">
                              <div
                                className="flex-shrink-0"
                                style={{ position: "relative" }}
                              >
                                <div id="expensesOfWeek" style={{ minHeight: "57.7px" }}>
                                  <div
                                    id="apexchartsnsz1c5hc"
                                    className="apexcharts-canvas apexchartsnsz1c5hc apexcharts-theme-light"
                                    style={{ width: 60, height: "57.7px" }}
                                  >
                                    <svg
                                      id="SvgjsSvg1589"
                                      width={60}
                                      height="57.7"
                                      xmlns="http://www.w3.org/2000/svg"
                                      version="1.1"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"

                                      className="apexcharts-svg"
                                      xmlns-data="ApexChartsNS"
                                      transform="translate(0, 0)"
                                      style={{ background: "transparent" }}
                                    >
                                      <g
                                        id="SvgjsG1591"
                                        className="apexcharts-inner apexcharts-graphical"
                                        transform="translate(-10, -10)"
                                      >
                                        <defs id="SvgjsDefs1590">
                                          <clipPath id="gridRectMasknsz1c5hc">
                                            <rect
                                              id="SvgjsRect1593"
                                              width={86}
                                              height={87}
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
                                          <clipPath id="forecastMasknsz1c5hc" />
                                          <clipPath id="nonForecastMasknsz1c5hc" />
                                          <clipPath id="gridRectMarkerMasknsz1c5hc">
                                            <rect
                                              id="SvgjsRect1594"
                                              width={84}
                                              height={89}
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
                                        <g
                                          id="SvgjsG1595"
                                          className="apexcharts-radialbar"
                                        >
                                          <g id="SvgjsG1596">
                                            <g
                                              id="SvgjsG1597"
                                              className="apexcharts-tracks"
                                            >
                                              <g
                                                id="SvgjsG1598"
                                                className="apexcharts-radialbar-track apexcharts-track"
                                                rel={1}
                                              >
                                                <path
                                                  id="apexcharts-radialbarTrack-0"
                                                  d="M 40 19.336585365853654 A 20.663414634146346 20.663414634146346 0 1 1 39.9963935538176 19.336585680575453"
                                                  fill="none"
                                                  fillOpacity={1}
                                                  stroke="rgba(228,230,232,0.85)"
                                                  strokeOpacity={1}
                                                  strokeLinecap="round"
                                                  strokeWidth="4.760097560975613"
                                                  strokeDasharray={0}
                                                  className="apexcharts-radialbar-area"
                                                  data-pathorig="M 40 19.336585365853654 A 20.663414634146346 20.663414634146346 0 1 1 39.9963935538176 19.336585680575453"
                                                />
                                              </g>
                                            </g>
                                            <g id="SvgjsG1600">
                                              <g
                                                id="SvgjsG1604"
                                                className="apexcharts-series apexcharts-radial-series"
                                                seriesname="seriesx1"
                                                rel={1}
                                                data-realindex={0}
                                              >
                                                <path
                                                  id="SvgjsPath1605"
                                                  d="M 40 19.336585365853654 A 20.663414634146346 20.663414634146346 0 1 1 23.28294639915962 52.1456503839557"
                                                  fill="none"
                                                  fillOpacity="0.85"
                                                  stroke="rgba(105,108,255,0.85)"
                                                  strokeOpacity={1}
                                                  strokeLinecap="round"
                                                  strokeWidth="4.907317073170734"
                                                  strokeDasharray={0}
                                                  className="apexcharts-radialbar-area apexcharts-radialbar-slice-0"
                                                  data-angle={234}
                                                  data-value={65}
                                                  index={0}
                                                  j={0}
                                                  data-pathorig="M 40 19.336585365853654 A 20.663414634146346 20.663414634146346 0 1 1 23.28294639915962 52.1456503839557"
                                                />
                                              </g>
                                              <circle
                                                id="SvgjsCircle1601"
                                                r="16.283365853658538"
                                                cx={40}
                                                cy={40}
                                                className="apexcharts-radialbar-hollow"
                                                fill="transparent"
                                              />
                                              <g
                                                id="SvgjsG1602"
                                                className="apexcharts-datalabels-group"
                                                transform="translate(0, 0) scale(1)"
                                                style={{ opacity: 1 }}
                                              >
                                                <text
                                                  id="SvgjsText1603"
                                                  fontFamily="Public Sans"
                                                  x={40}
                                                  y={45}
                                                  textAnchor="middle"
                                                  dominantBaseline="auto"
                                                  fontSize="12px"
                                                  fontWeight={400}
                                                  fill="#646e78"
                                                  className="apexcharts-text apexcharts-datalabel-value"
                                                  style={{ fontFamily: '"Public Sans"' }}
                                                >
                                                  $65
                                                </text>
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                        <line
                                          id="SvgjsLine1606"
                                          x1={0}
                                          y1={0}
                                          x2={80}
                                          y2={0}
                                          stroke="#b6b6b6"
                                          strokeDasharray={0}
                                          strokeWidth={1}
                                          strokeLinecap="butt"
                                          className="apexcharts-ycrosshairs"
                                        />
                                        <line
                                          id="SvgjsLine1607"
                                          x1={0}
                                          y1={0}
                                          x2={80}
                                          y2={0}
                                          strokeDasharray={0}
                                          strokeWidth={0}
                                          strokeLinecap="butt"
                                          className="apexcharts-ycrosshairs-hidden"
                                        />
                                      </g>
                                      <g
                                        id="SvgjsG1592"
                                        className="apexcharts-annotations"
                                      />
                                    </svg>
                                    <div className="apexcharts-legend" />
                                  </div>
                                </div>
                                <div className="resize-triggers">
                                  <div className="expand-trigger">
                                    <div style={{ width: 61, height: 59 }} />
                                  </div>
                                  <div className="contract-trigger" />
                                </div>
                              </div>
                              <div>
                                <h6 className="mb-0">Income this week</h6>
                                <small>$39k less than last week</small>
                              </div>
                            </div>
                            <div className="resize-triggers">
                              <div className="expand-trigger">
                                <div style={{ width: 323, height: 383 }} />
                              </div>
                              <div className="contract-trigger" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*/ Expense Overview */}
                  {/* Transactions */}
                  <div className="col-md-6 col-lg-4 order-2 mb-6">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between">
                        <h5 className="card-title m-0 me-2">Transactions</h5>
                        <div className="dropdown">
                          <button
                            className="btn text-muted p-0"
                            type="button"
                            id="transactionID"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded bx-lg" />
                          </button>
                          <div
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="transactionID"
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
                      <div className="card-body pt-4">
                        <ul className="p-0 m-0">
                          <li className="d-flex align-items-center mb-6">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/paypal.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Paypal</small>
                                <h6 className="fw-normal mb-0">Send money</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">+82.6</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-6">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/wallet.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Wallet</small>
                                <h6 className="fw-normal mb-0">Mac'D</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">+270.69</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-6">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/chart.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Transfer</small>
                                <h6 className="fw-normal mb-0">Refund</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">+637.91</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-6">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/cc-primary.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Credit Card</small>
                                <h6 className="fw-normal mb-0">Ordered Food</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">-838.71</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center mb-6">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/wallet.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Wallet</small>
                                <h6 className="fw-normal mb-0">Starbucks</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">+203.33</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                          <li className="d-flex align-items-center">
                            <div className="avatar flex-shrink-0 me-3">
                              <img
                                src="../assets/img/icons/unicons/cc-warning.png"
                                alt="User"
                                className="rounded"
                              />
                            </div>
                            <div className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                              <div className="me-2">
                                <small className="d-block">Mastercard</small>
                                <h6 className="fw-normal mb-0">Ordered Food</h6>
                              </div>
                              <div className="user-progress d-flex align-items-center gap-2">
                                <h6 className="fw-normal mb-0">-92.45</h6>
                                <span className="text-muted">USD</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/*/ Transactions */}
                </div>
              </div>
              {/* / Content */}
              {/* Footer */}
              <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl">
                  <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                    <div className="text-body">
                      © 2024 , made with ❤️ by
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
                        href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                        target="_blank"
                        className="footer-link"
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

export default Home;