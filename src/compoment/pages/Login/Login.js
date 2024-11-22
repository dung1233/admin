import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra hợp lệ form đăng nhập
  const validateLogin = () => {
    let errors = { email: '', password: '' };
    let isValid = true;

    if (!validateEmail(loginData.email)) {
      errors.email = 'Định dạng email không hợp lệ';
      isValid = false;
    }
    if (loginData.password.length < 6) {
      errors.password = 'Mật khẩu phải ít nhất 6 ký tự';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  // Xử lý form đăng nhập
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (validateLogin()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://projectky320240926105522.azurewebsites.net/api/Admin/login',
          loginData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Send cookies along with the request
          }
        );

        const data = response.data;
        console.log("Dữ liệu đăng nhập thành công:", data);

        // Alert success message
        window.alert("Đăng nhập thành công!");
        
       
 
        // Optionally, navigate to the home page or dashboard
        navigate("/Commerce");
        // Force reloading the page to ensure all state is updated and cleared
        window.location.reload();
      } catch (error) {
        if (error.response) {
          // Check for specific error codes and display detailed messages
          if (error.response.status === 401) {
            // Unauthorized: Incorrect credentials
            window.alert('Sai tài khoản hoặc mật khẩu.');
          } else if (error.response.status === 403) {
            // Forbidden: User does not have permission
            window.alert('Bạn không có quyền truy cập. Vui lòng liên hệ với quản trị viên.');
          } else {
            // Any other error status or unknown error
            window.alert('Đăng nhập thất bại: ' + error.response.data.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
          }
          console.error("Lỗi đăng nhập:", error.response.data);
        } else {
          window.alert('Đăng nhập thất bại. Vui lòng thử lại.');
          console.error("Lỗi đăng nhập:", error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div>
      
      <div className="authentication-wrapper authentication-cover">
        <div className="authentication-inner row m-0">
          <div className="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div className="w-100 d-flex justify-content-center">
              <img
                src="/assets/img/boy-with-rocket-light.png"
                className="img-fluid"
                alt="Login image"
                width={700}
              />
            </div>
          </div>
          <div className="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-12 p-6">
            <div className="w-px-400 mx-auto mt-12 pt-5">
              <h4 className="mb-1">Welcome to sneat! 👋</h4>
              <form id="formAuthentication" className="mb-6" onSubmit={handleLoginSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="form-label">
                    Email hoặc Tên đăng nhập
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Nhập email hoặc tên đăng nhập"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  {loginErrors.email && <p style={{ color: 'red' }}>{loginErrors.email}</p>}
                </div>
                <div className="mb-6 form-password-toggle">
                  <label className="form-label" htmlFor="password">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="············"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  {loginErrors.password && <p style={{ color: 'red' }}>{loginErrors.password}</p>}
                </div>
                <button className="btn btn-primary d-grid w-100" disabled={isLoading}>
                  {isLoading ? 'Log In...' : 'Log In'}
                </button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
