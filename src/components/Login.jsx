import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { login, loginFacebook } from "../utils/fetchFromAPI.js";
import ReactFacebookLogin from "react-facebook-login";

const Login = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {}, []);

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        <form className="row g-3 text-white">
          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">
              Password
            </label>
            <input className="form-control" id="pass" />
          </div>
          <div className="col-12">
            <button
              onClick={() => {
                let email = document.querySelector("#email").value;
                let password = document.querySelector("#pass").value;

                let dataLogin = { email, password };

                login(dataLogin)
                  .then((res) => {
                    alert("Đăng nhập thành công");
                    navigate("/");
                    window.location.reload();
                    localStorage.setItem("LOGIN_USER", res.data);
                  })
                  .catch((err) => {
                    alert(err?.response?.data?.message);
                  });
              }}
              type="button"
              className="btn btn-primary"
            >
              Login
            </button>
            <br />
            <ReactFacebookLogin
              appId="309983708499174"
              fields="name, email"
              callback={(res) => {
                console.log(res);
                let { name, email, id } = res;
                let model = {
                  fullName: name,
                  email,
                  faceAppId: id,
                };

                loginFacebook(model)
                  .then((res) => {
                    console.log(res);
                    alert(res.message);
                    navigate("/");
                    window.location.reload();
                    localStorage.setItem("LOGIN_USER", JSON.stringify(res));
                  })
                  .catch((err) => {
                    console.log(err);
                    alert("Đăng nhập thất bại");
                  });
              }}
            />
            <div>
              <a
                className="text-white"
                href="#"
                onClick={() => {
                  navigate("/forgetpass");
                }}
              >
                Quên mật khẩu
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
