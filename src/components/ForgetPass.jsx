import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  changePass,
  checkCode,
  checkEmail,
  login,
  loginFacebook,
} from "../utils/fetchFromAPI.js";
import ReactFacebookLogin from "react-facebook-login";
import { SatelliteAlt } from "@mui/icons-material";

const ForgetPass = () => {
  useEffect(() => {}, []);
  const [tour, setTour] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="p-5 " style={{ minHeight: "100vh" }}>
      <div className=" d-flex justify-content-center">
        {tour == 0 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="col-12">
              <button
                onClick={() => {
                  let txtemail = document.querySelector("#email").value;
                  console.log(txtemail);

                  checkEmail(txtemail).then((res) => {
                    console.log(res);
                    if (res.data == true) {
                      localStorage.setItem("EMAIL-FORGETPASS", txtemail);
                      setTour(1);
                    } else {
                      alert("Email không đúng");
                    }
                  });
                }}
              >
                Tiếp theo
              </button>
            </div>
          </form>
        )}
        {/* Nhập code */}
        {tour == 1 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập code
              </label>
              <input className="form-control" id="code" />
            </div>
            <div className="col-12">
              <button
                onClick={() => {
                  let txtcode = document.querySelector("#code").value;
                  console.log(txtcode);
                  checkCode(txtcode)
                    .then((res) => {
                      console.log(res);
                      if (res.data == true) {
                        setTour(2);
                      } else {
                        alert("Code sai");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                Xác minh
              </button>
            </div>
          </form>
        )}
        {/* Đổi Pass */}
        {tour == 2 && (
          <form className="row g-3 text-white">
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">
                Nhập mật khẩu mới
              </label>
              <input className="form-control" id="pass" />
            </div>
            <div className="col-12">
              <button
                onClick={() => {
                  let email = localStorage.getItem("EMAIL-FORGETPASS");
                  console.log(email);

                  let password = document.querySelector("#pass").value;

                  let dataChage = {
                    email,
                    password,
                  };

                  changePass(dataChage).then((res) => {
                    console.log(res.data);
                    if (res.data == true) {
                      alert("Đổi thành công");
                      navigate("/login");
                    }
                  });
                }}
              >
                Đổi mật khẩu
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgetPass;
