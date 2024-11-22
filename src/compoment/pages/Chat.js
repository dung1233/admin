import React, { useEffect, useRef, useState } from 'react';

const Chat = () => {
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
                  <li className="menu-item ">
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
                  <li className="menu-item active">
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
                            id="layout-navbar" di
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
                                                <a className="dropdown-item" href="javascript:void(0);">
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
                                <div className="app-chat card overflow-hidden">
                                    <div className="row g-0">
                                        {/* Sidebar Left */}
                                        <div
                                            className="col app-chat-sidebar-left app-sidebar overflow-hidden"
                                            id="app-chat-sidebar-left"
                                        >
                                            <div className="chat-sidebar-left-user sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                                                <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                                                    <img
                                                        src="../../assets/img/avatars/1.png"
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <h5 className="mt-4 mb-0">John Doe</h5>
                                                <span>Admin</span>
                                                <i
                                                    className="bx bx-x bx-lg cursor-pointer close-sidebar"
                                                    data-bs-toggle="sidebar"
                                                    data-overlay=""
                                                    data-target="#app-chat-sidebar-left"
                                                />
                                            </div>
                                            <div className="sidebar-body px-6 pb-6 ps ps--active-y">
                                                <div className="my-6">
                                                    <label
                                                        htmlFor="chat-sidebar-left-user-about"
                                                        className="text-uppercase text-muted mb-1"
                                                    >
                                                        About
                                                    </label>
                                                    <textarea
                                                        id="chat-sidebar-left-user-about"
                                                        className="form-control chat-sidebar-left-user-about"
                                                        rows={3}
                                                        maxLength={120}
                                                        defaultValue={
                                                            "Hey there, we’re just writing to let you know that you’ve been subscribed to a repository on GitHub."
                                                        }
                                                    />
                                                </div>
                                                <div className="my-6">
                                                    <p className="text-uppercase text-muted mb-1">Status</p>
                                                    <div className="d-grid gap-2 pt-2 text-heading ms-2">
                                                        <div className="form-check form-check-success">
                                                            <input
                                                                name="chat-user-status"
                                                                className="form-check-input"
                                                                type="radio"
                                                                defaultValue="active"
                                                                id="user-active"
                                                                defaultChecked=""
                                                            />
                                                            <label className="form-check-label" htmlFor="user-active">
                                                                Online
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-warning">
                                                            <input
                                                                name="chat-user-status"
                                                                className="form-check-input"
                                                                type="radio"
                                                                defaultValue="away"
                                                                id="user-away"
                                                            />
                                                            <label className="form-check-label" htmlFor="user-away">
                                                                Away
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-danger">
                                                            <input
                                                                name="chat-user-status"
                                                                className="form-check-input"
                                                                type="radio"
                                                                defaultValue="busy"
                                                                id="user-busy"
                                                            />
                                                            <label className="form-check-label" htmlFor="user-busy">
                                                                Do not Disturb
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-secondary">
                                                            <input
                                                                name="chat-user-status"
                                                                className="form-check-input"
                                                                type="radio"
                                                                defaultValue="offline"
                                                                id="user-offline"
                                                            />
                                                            <label className="form-check-label" htmlFor="user-offline">
                                                                Offline
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="my-6">
                                                    <p className="text-uppercase text-muted mb-1">Settings</p>
                                                    <ul className="list-unstyled d-grid gap-4 ms-2 pt-2 text-heading">
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <i className="bx bx-lock-alt me-1" />
                                                                <span className="align-middle">Two-step Verification</span>
                                                            </div>
                                                            <div className="form-check form-switch mb-0 me-1">
                                                                <input
                                                                    type="checkbox"
                                                                    className="form-check-input"
                                                                    defaultChecked=""
                                                                />
                                                            </div>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <div>
                                                                <i className="bx bx-bell me-1" />
                                                                <span className="align-middle">Notification</span>
                                                            </div>
                                                            <div className="form-check form-switch mb-0 me-1">
                                                                <input type="checkbox" className="form-check-input" />
                                                            </div>
                                                        </li>
                                                        <li>
                                                            <i className="bx bx-user me-1" />
                                                            <span className="align-middle">Invite Friends</span>
                                                        </li>
                                                        <li>
                                                            <i className="bx bx-trash me-1" />
                                                            <span className="align-middle">Delete Account</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="d-flex mt-6">
                                                    <button
                                                        className="btn btn-primary w-100"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay=""
                                                        data-target="#app-chat-sidebar-left"
                                                    >
                                                        <i className="bx bx-log-out bx-sm me-2" />
                                                        Logout
                                                    </button>
                                                </div>
                                                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                                    <div
                                                        className="ps__thumb-x"
                                                        tabIndex={0}
                                                        style={{ left: 0, width: 0 }}
                                                    />
                                                </div>
                                                <div
                                                    className="ps__rail-y"
                                                    style={{ top: 0, height: 366, right: 0 }}
                                                >
                                                    <div
                                                        className="ps__thumb-y"
                                                        tabIndex={0}
                                                        style={{ top: 0, height: 221 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Sidebar Left*/}
                                        {/* Chat & Contacts */}
                                        <div
                                            className="col app-chat-contacts app-sidebar flex-grow-0 overflow-hidden border-end"
                                            id="app-chat-contacts"
                                        >
                                            <div className="sidebar-header px-6 border-bottom d-flex align-items-center">
                                                <div className="d-flex align-items-center me-6 me-lg-0">
                                                    <div
                                                        className="flex-shrink-0 avatar avatar-online me-4"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay="app-overlay-ex"
                                                        data-target="#app-chat-sidebar-left"
                                                    >
                                                        <img
                                                            className="user-avatar rounded-circle cursor-pointer"
                                                            src="../../assets/img/avatars/1.png"
                                                            alt="Avatar"
                                                        />
                                                    </div>
                                                    <div className="flex-grow-1 input-group input-group-merge rounded-pill">
                                                        <span className="input-group-text" id="basic-addon-search31">
                                                            <i className="bx bx-search bx-sm" />
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control chat-search-input"
                                                            placeholder="Search..."
                                                            aria-label="Search..."
                                                            aria-describedby="basic-addon-search31"
                                                        />
                                                    </div>
                                                </div>
                                                <i
                                                    className="bx bx-x bx-lg cursor-pointer position-absolute top-50 end-0 translate-middle d-lg-none d-block"
                                                    data-overlay=""
                                                    data-bs-toggle="sidebar"
                                                    data-target="#app-chat-contacts"
                                                />
                                            </div>
                                            <div className="sidebar-body ps ps--active-y">
                                                {/* Chats */}
                                                <ul
                                                    className="list-unstyled chat-contact-list py-2 mb-0"
                                                    id="chat-list"
                                                >
                                                    <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                                                        <h5 className="text-primary mb-0">Chats</h5>
                                                    </li>
                                                    <li className="chat-contact-list-item chat-list-item-0 d-none">
                                                        <h6 className="text-muted mb-0">No Chats Found</h6>
                                                    </li>
                                                    <li className="chat-contact-list-item mb-1">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar avatar-online">
                                                                <img
                                                                    src="../../assets/img/avatars/13.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                        Waldemar Mannering
                                                                    </h6>
                                                                    <small className="text-muted">5 Minutes</small>
                                                                </div>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Refer friends. Get rewards.
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                   
                                                </ul>
                                                {/* Contacts */}
                                                <ul
                                                    className="list-unstyled chat-contact-list mb-0 py-2"
                                                    id="contact-list"
                                                >
                                                    <li className="chat-contact-list-item chat-contact-list-item-title mt-0">
                                                        <h5 className="text-primary mb-0">Contacts</h5>
                                                    </li>
                                                    <li className="chat-contact-list-item contact-list-item-0 d-none">
                                                        <h6 className="text-muted mb-0">No Contacts Found</h6>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/4.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Natalie Maxwell
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    UI/UX Designer
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/5.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Jess Cook
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Business Analyst
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span className="avatar-initial rounded-circle bg-label-primary">
                                                                    LM
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Louie Mason
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Resource Manager
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/7.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Krystal Norton
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Business Executive
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/8.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Stacy Garrison
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Marketing Ninja
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span className="avatar-initial rounded-circle bg-label-success">
                                                                    CM
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Calvin Moore
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    UX Engineer
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/10.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Mary Giles
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Account Department
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/13.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Waldemar Mannering
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    AWS Support
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="avatar d-block flex-shrink-0">
                                                                <span className="avatar-initial rounded-circle bg-label-danger">
                                                                    AJ
                                                                </span>
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Amy Johnson
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Frontend Developer
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/4.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    Felecia Rower
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Cloud Engineer
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                    <li className="chat-contact-list-item mb-0">
                                                        <a className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 avatar">
                                                                <img
                                                                    src="../../assets/img/avatars/11.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="chat-contact-name text-truncate m-0 fw-normal">
                                                                    William Stephens
                                                                </h6>
                                                                <small className="chat-contact-status text-truncate">
                                                                    Backend Developer
                                                                </small>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                                    <div
                                                        className="ps__thumb-x"
                                                        tabIndex={0}
                                                        style={{ left: 0, width: 0 }}
                                                    />
                                                </div>
                                                <div
                                                    className="ps__rail-y"
                                                    style={{ top: 0, height: 490, right: 0 }}
                                                >
                                                    <div
                                                        className="ps__thumb-y"
                                                        tabIndex={0}
                                                        style={{ top: 0, height: 237 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Chat contacts */}
                                        {/* Chat History */}
                                        <div className="col app-chat-history">
                                            <div className="chat-history-wrapper">
                                                <div className="chat-history-header border-bottom">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex overflow-hidden align-items-center">
                                                            <i
                                                                className="bx bx-menu bx-lg cursor-pointer d-lg-none d-block me-4"
                                                                data-bs-toggle="sidebar"
                                                                data-overlay=""
                                                                data-target="#app-chat-contacts"
                                                            />
                                                            <div className="flex-shrink-0 avatar avatar-online">
                                                                <img
                                                                    src="../../assets/img/avatars/4.png"
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                    data-bs-toggle="sidebar"
                                                                    data-overlay=""
                                                                    data-target="#app-chat-sidebar-right"
                                                                />
                                                            </div>
                                                            <div className="chat-contact-info flex-grow-1 ms-4">
                                                                <h6 className="m-0 fw-normal">Felecia Rower</h6>
                                                                <small className="user-status text-body">
                                                                    NextJS developer
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex align-items-center">
                                                            <i className="bx bx-phone bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1" />
                                                            <i className="bx bx-video bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1" />
                                                            <i className="bx bx-search bx-md cursor-pointer d-sm-inline-flex d-none btn btn-icon text-secondary me-1" />
                                                            <div className="dropdown">
                                                                <button
                                                                    className="btn btn-icon text-secondary dropdown-toggle hide-arrow"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="true"
                                                                    id="chat-header-actions"
                                                                >
                                                                    <i className="bx bx-dots-vertical-rounded bx-md" />
                                                                </button>
                                                                <div
                                                                    className="dropdown-menu dropdown-menu-end"
                                                                    aria-labelledby="chat-header-actions"
                                                                >
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        View Contact
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Mute Notifications
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Block Contact
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Clear Chat
                                                                    </a>
                                                                    <a className="dropdown-item" href="javascript:void(0);">
                                                                        Report
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="chat-history-body ps ps--active-y">
                                                    <ul className="list-unstyled chat-history">
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            How can we help? We're here for you! 😄
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="bx bx-check-double bx-16px text-success me-1" />
                                                                        <small>10:00 AM</small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/1.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/4.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Hey John, I am looking for the best admin template.
                                                                        </p>
                                                                        <p className="mb-0">
                                                                            Could you please help me to find it out? 🤔
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            It should be Bootstrap 5 compatible.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>10:02 AM</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            sneat has all the components you'll ever need in a
                                                                            app.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="bx bx-check-double bx-16px text-success me-1" />
                                                                        <small>10:03 AM</small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/1.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/4.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">Looks clean and fresh UI. 😃</p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">
                                                                            It's perfect for my next project.
                                                                        </p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">How can I purchase it?</p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>10:05 AM</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">Thanks, you can purchase it.</p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="bx bx-check-double bx-16px text-success me-1" />
                                                                        <small>10:06 AM</small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/1.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/4.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">I will purchase it for sure. 👍</p>
                                                                    </div>
                                                                    <div className="chat-message-text mt-2">
                                                                        <p className="mb-0">Thanks.</p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>10:08 AM</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Great, Feel free to get in touch.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="bx bx-check-double bx-16px text-success me-1" />
                                                                        <small>10:10 AM</small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/1.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="user-avatar flex-shrink-0 me-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/4.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="chat-message-wrapper flex-grow-1">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Do you have design files for sneat?
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-muted mt-1">
                                                                        <small>10:15 AM</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                        <li className="chat-message chat-message-right">
                                                            <div className="d-flex overflow-hidden">
                                                                <div className="chat-message-wrapper flex-grow-1 w-50">
                                                                    <div className="chat-message-text">
                                                                        <p className="mb-0">
                                                                            Yes that's correct documentation file, Design files
                                                                            are included with the template.
                                                                        </p>
                                                                    </div>
                                                                    <div className="text-end text-muted mt-1">
                                                                        <i className="bx bx-check-double bx-16px me-1" />
                                                                        <small>10:15 AM</small>
                                                                    </div>
                                                                </div>
                                                                <div className="user-avatar flex-shrink-0 ms-4">
                                                                    <div className="avatar avatar-sm">
                                                                        <img
                                                                            src="../../assets/img/avatars/1.png"
                                                                            alt="Avatar"
                                                                            className="rounded-circle"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    <div className="ps__rail-x" style={{ left: 0, bottom: "-817px" }}>
                                                        <div
                                                            className="ps__thumb-x"
                                                            tabIndex={0}
                                                            style={{ left: 0, width: 0 }}
                                                        />
                                                    </div>
                                                    <div
                                                        className="ps__rail-y"
                                                        style={{ top: 817, height: 398, right: 0 }}
                                                    >
                                                        <div
                                                            className="ps__thumb-y"
                                                            tabIndex={0}
                                                            style={{ top: 267, height: 130 }}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Chat message form */}
                                                <div className="chat-history-footer shadow-xs">
                                                    <form className="form-send-message d-flex justify-content-between align-items-center ">
                                                        <input
                                                            className="form-control message-input border-0 me-4 shadow-none"
                                                            placeholder="Type your message here..."
                                                        />
                                                        <div className="message-actions d-flex align-items-center">
                                                            <i className="speech-to-text bx bx-microphone bx-md btn btn-icon cursor-pointer text-heading" />
                                                            <label htmlFor="attach-doc" className="form-label mb-0">
                                                                <i className="bx bx-paperclip bx-md cursor-pointer btn btn-icon mx-1 text-heading" />
                                                                <input type="file" id="attach-doc" hidden="" />
                                                            </label>
                                                            <button className="btn btn-primary d-flex send-msg-btn">
                                                                <span className="align-middle d-md-inline-block d-none">
                                                                    Send
                                                                </span>
                                                                <i className="bx bx-paper-plane bx-sm ms-md-2 ms-0" />
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Chat History */}
                                        {/* Sidebar Right */}
                                        <div
                                            className="col app-chat-sidebar-right app-sidebar overflow-hidden"
                                            id="app-chat-sidebar-right"
                                        >
                                            <div className="sidebar-header d-flex flex-column justify-content-center align-items-center flex-wrap px-6 pt-12">
                                                <div className="avatar avatar-xl avatar-online chat-sidebar-avatar">
                                                    <img
                                                        src="../../assets/img/avatars/4.png"
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <h5 className="mt-4 mb-0">Felecia Rower</h5>
                                                <span>NextJS Developer</span>
                                                <i
                                                    className="bx bx-x bx-lg cursor-pointer close-sidebar d-block"
                                                    data-bs-toggle="sidebar"
                                                    data-overlay=""
                                                    data-target="#app-chat-sidebar-right"
                                                />
                                            </div>
                                            <div className="sidebar-body p-6 pt-0 ps ps--active-y">
                                                <div className="my-6">
                                                    <p className="text-uppercase mb-1 text-muted">About</p>
                                                    <p className="mb-0">
                                                        It is a long established fact that a reader will be distracted
                                                        by the readable content .
                                                    </p>
                                                </div>
                                                <div className="my-6">
                                                    <p className="text-uppercase mb-1 text-muted">
                                                        Personal Information
                                                    </p>
                                                    <ul className="list-unstyled d-grid gap-4 mb-0 ms-2 py-2 text-heading">
                                                        <li className="d-flex align-items-center">
                                                            <i className="bx bx-envelope" />
                                                            <span className="align-middle ms-2">
                                                                josephGreen@email.com
                                                            </span>
                                                        </li>
                                                        <li className="d-flex align-items-center">
                                                            <i className="bx bx-phone-call" />
                                                            <span className="align-middle ms-2">+1(123) 456 - 7890</span>
                                                        </li>
                                                        <li className="d-flex align-items-center">
                                                            <i className="bx bx-time-five" />
                                                            <span className="align-middle ms-2">
                                                                Mon - Fri 10AM - 8PM
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="my-6">
                                                    <p className="text-uppercase text-muted mb-1">Options</p>
                                                    <ul className="list-unstyled d-grid gap-4 ms-2 py-2 text-heading">
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="bx bx-bookmark" />
                                                            <span className="align-middle ms-2">Add Tag</span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="bx bx-star" />
                                                            <span className="align-middle ms-2">Important Contact</span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="bx bx-image-alt" />
                                                            <span className="align-middle ms-2">Shared Media</span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="bx bx-trash" />
                                                            <span className="align-middle ms-2">Delete Contact</span>
                                                        </li>
                                                        <li className="cursor-pointer d-flex align-items-center">
                                                            <i className="bx bx-block" />
                                                            <span className="align-middle ms-2">Block Contact</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="d-flex mt-6">
                                                    <button
                                                        className="btn btn-danger w-100"
                                                        data-bs-toggle="sidebar"
                                                        data-overlay=""
                                                        data-target="#app-chat-sidebar-right"
                                                    >
                                                        Delete Contact
                                                        <i className="bx bx-trash bx-sm ms-2" />
                                                    </button>
                                                </div>
                                                <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
                                                    <div
                                                        className="ps__thumb-x"
                                                        tabIndex={0}
                                                        style={{ left: 0, width: 0 }}
                                                    />
                                                </div>
                                                <div
                                                    className="ps__rail-y"
                                                    style={{ top: 0, height: 369, right: 0 }}
                                                >
                                                    <div
                                                        className="ps__thumb-y"
                                                        tabIndex={0}
                                                        style={{ top: 0, height: 232 }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* /Sidebar Right */}
                                        <div className="app-overlay" />
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

export default Chat;