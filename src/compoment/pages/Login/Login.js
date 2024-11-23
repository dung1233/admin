import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth(); // Dùng AuthContext
  const navigate = useNavigate();

  const validateLogin = () => {
    const errors = {};
    let isValid = true;

    if (!loginData.username) {
      errors.username = 'Vui lòng nhập username';
      isValid = false;
    }

    if (loginData.password.length < 6) {
      errors.password = 'Mật khẩu phải ít nhất 6 ký tự';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (validateLogin()) {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await axios.post(
          'https://t2305mpk320241031161932.azurewebsites.net/api/Auth/login',
          {
            username: loginData.username.toLowerCase(),
            password: loginData.password,
          },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { token } = response.data;

        login(token); // Lưu trạng thái đăng nhập
        navigate('/'); // Chuyển hướng tới trang chính
      } catch (error) {
        setErrorMessage('Sai thông tin đăng nhập. Vui lòng thử lại.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
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
            <h4 className="mb-1">Welcome to Sneat! 👋</h4>
            <form id="formAuthentication" className="mb-6" onSubmit={handleLoginSubmit}>
              <div className="mb-6">
                <label htmlFor="username" className="form-label">
                  Username hoặc Tên đăng nhập
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nhập username hoặc tên đăng nhập"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                />
                {loginErrors.username && <p style={{ color: 'red' }}>{loginErrors.username}</p>}
              </div>
              <div className="mb-6 form-password-toggle">
                <label className="form-label" htmlFor="password">
                  Password
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
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
