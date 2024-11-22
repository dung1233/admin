import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
    const location = useLocation();
    const item = location.state?.item; // Nhận menuItem từ MenuList
    const navigate = useNavigate(); 
    const [sizes, setSizes] = useState([]); // Danh sách kích thước hợp lệ
    const [variantId, setVariantId] = useState('');
    const [price, setPrice] = useState('');
    const [sizeId, setSizeId] = useState('');
    const [loading, setLoading] = useState(false); 
    const [variants, setVariants] = useState(item.itemVariants);
    const [sizeNumber, setSizeNumber] = useState(''); 
    // Gọi API lấy danh sách kích thước
    useEffect(() => {
        axios.get('https://t2305mpk320241031161932.azurewebsites.net/api/Sizes')
            .then(response => {
                setSizes(response.data); // Lưu danh sách kích thước vào state
            })
            .catch(error => {
                console.error("Error fetching sizes:", error);
            });
    }, []);

    const getSizeName = (sizeId) => {
        const size = sizes.find(s => s.sizeId === sizeId);
        return size ? size.sizeNumber : 'Unknown Size';
    };
    if (!item) return <p>Không tìm thấy sản phẩm. Vui lòng quay lại danh sách.</p>;
    const handleDeleteVariant = (variantId) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa biến thể này không?")) {
            setLoading(true); // Bắt đầu loading
            axios.delete(`https://t2305mpk320241031161932.azurewebsites.net/api/ItemVariants/${variantId}`)
                .then(response => {
                    console.log("Variant deleted successfully:", response.data);
                    setVariants(prevVariants => prevVariants.filter(variant => variant.variantId !== variantId));
                    navigate('/Menulist')
                })
                .catch(error => {
                    console.error("Error deleting variant:", error);
                })
                .finally(() => {
                    setLoading(false); // Kết thúc loading
                });
        }
    };
    

    const handleAddVariant = (e) => {
        e.preventDefault();
      
        // Tạo payload cho variant với tất cả các trường cần thiết
        const variantData = {
          price: parseFloat(price), // Giá sản phẩm
          sizeId: parseInt(sizeId), // ID kích cỡ
          menuItemNo: item.menuItemNo, // Số của món ăn
          sizeNumber: sizeNumber, // Thêm trường SizeNumber (ví dụ: kích cỡ sản phẩm)
          menuItemName: item.itemName, // Thêm trường MenuItemName (ví dụ: tên món ăn)
        };
      
        // Log để kiểm tra payload trước khi gửi
        console.log("Data being sent:", JSON.stringify(variantData, null, 2));
      
        // Gửi request thêm mới biến thể
        axios
          .post(
            "https://t2305mpk320241031161932.azurewebsites.net/api/ItemVariants",
            variantData
          )
          .then((response) => {
            console.log("Variant added successfully:", response.data);
            setVariantId("");
            setPrice("");
            setSizeId("");
            navigate("/Menulist");
          })
          .catch((error) => {
            if (error.response) {
              console.error("Server Response Data:", error.response.data); // Chi tiết phản hồi từ server
              console.error("Status Code:", error.response.status); // Mã trạng thái
              console.error("Headers:", error.response.headers); // Header phản hồi
              alert("Error: " + JSON.stringify(error.response.data, null, 2));
            } else if (error.request) {
              console.error("No response received:", error.request); // Không nhận được phản hồi
            } else {
              console.error("Error Message:", error.message); // Lỗi không liên quan đến request
            }
          });
      
        // Log để kiểm tra giá trị ID và No
        console.log("Selected Size ID:", sizeId);
        console.log("Selected Menu Item No:", item.menuItemNo);
      };
      

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
                            <div className="row invoice-preview">
                                {/* Invoice */}
                                <div className="col-xl-9 col-md-8 col-12 mb-md-0 mb-6">
                                    <div className="card invoice-preview-card p-sm-12 p-6">
                                        <div className="card-body invoice-preview-header rounded">
                                            <div className="d-flex justify-content-between flex-xl-row flex-md-column flex-sm-row flex-column align-items-xl-center align-items-md-start align-items-sm-center align-items-start">
                                                <div className="mb-xl-0 mb-6 text-heading">
                                                    <div className="text-center">
                                                        <img
                                                            src={item.imageURL}  // Đảm bảo `imageURL` có trong `item`
                                                            alt={item.itemName}
                                                            className="rounded"
                                                            style={{
                                                                width: '350px',
                                                                height: '250px',
                                                                objectFit: 'cover',
                                                                borderRadius: '10px',
                                                                border: '2px solid #ccc',
                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                                <div>
                                                    <h5 className="mb-6">{item.itemName}</h5>
                                                    <div className="mb-1 text-heading" style={{
                                                        width: '450px',
                                                        height: '100px',
                                                    }}>
                                                        <span>Description:</span>
                                                        <span className="fw-medium" tyle={{
                                                        }}>{item.description}</span>
                                                    </div>
                                                    <div className="text-heading">
                                                        <span>Price: </span>
                                                        <span className="fw-medium">{item.price}$</span>
                                                    </div>
                                                    <div className="text-heading">
                                                        <span> </span>
                                                        <span className="fw-medium"></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body px-0">
                                            <div className="row">

                                            </div>
                                        </div>
                                        <div className="table-responsive border border-bottom-0 border-top-0 rounded">
                                            <h4>All Product Variants:</h4>
                                            {item.itemVariants.length > 0 ? (
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Variant ID</th>
                                                            <th>Name</th>
                                                            <th>Size</th>
                                                            <th>Price</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                    {item.itemVariants.map((variant) => (
                    <tr key={variant.variantId}>
                        <td>{variant.variantId}</td>
                        <td>{item.itemName}</td>
                        <td>{getSizeName(variant.sizeId)}</td> {/* Hiển thị tên size */}
                        <td>${variant.price}</td>
                        <td>
                            <button onClick={() => handleDeleteVariant(variant.variantId)}>Delete</button>
                        </td>
                    </tr>
                ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>Không có biến thể nào cho sản phẩm này.</p>
                                            )}
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
                                                className="btn btn-success d-grid w-100"
                                                data-bs-toggle="offcanvas"
                                                data-bs-target="#addPaymentOffcanvas"
                                            >
                                                <span className="d-flex align-items-center justify-content-center text-nowrap">

                                                    Add Variant
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

                                </div>
                                <div className="offcanvas-body flex-grow-1">

                                    <form onSubmit={handleAddVariant}>
                                        <div className="mb-6">

                                        </div>
                                        <div className="mb-6">

                                            <label className="form-label" htmlFor="payment-date">
                                                Price
                                            </label>
                                            <input
                                                type="number"
                                                value={price}
                                                className="form-control"
                                                id="payment-note"
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                                placeholder="Price"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="form-label" htmlFor="payment-method">
                                                Size
                                            </label>
                                            <select
                                                value={sizeId}
                                                onChange={(e) => setSizeId(e.target.value)}
                                                required
                                                  className="form-control"
                                            >
                                                <option value="">Chọn kích thước</option>
                                                {sizes.map(size => (
                                                    <option key={size.sizeId} value={size.sizeId}>
                                                        {size.sizeNumber}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                       
                                        <div className="mb-6 d-flex flex-wrap">
                                        <button
    type="submit" // Đổi từ "button" sang "submit"
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
    )
}

export default Details