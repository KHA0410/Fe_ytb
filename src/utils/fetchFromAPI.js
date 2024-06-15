import axios from "axios";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_IMAGE = "http://localhost:8080/public/img/";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    token: localStorage.getItem("LOGIN_USER"),
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};

export const getVideo = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video`, options);
  return data.data;
};

export const getVideoType = async () => {
  const { data } = await axios.get(`${BASE_URL}/video/get-video-type`);
  return data.data;
};

export const getVideoByType = async (typeId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-by-type/${typeId}`
  );
  return data.data;
};

export const getVideoById = async (videoId) => {
  const { data } = await axios.get(
    `${BASE_URL}/video/get-video-by-id/${videoId}`
  );
  return data.data;
};

export const signup = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/signup`, model);
  return data;
};

export const login = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login`, model);
  return data;
};

export const loginFacebook = async (model) => {
  const { data } = await axios.post(`${BASE_URL}/user/login-facebook`, model);
  return data;
};

export const getUser = async () => {
  const { data } = await axios.get(`${BASE_URL}/user/get-user`);
  return data.data;
};

export const checkEmail = async (email) => {
  console.log(email);
  const data = await axios.post(`${BASE_URL}/user/check-email/${email}`);
  return data.data;
};

export const checkCode = async (code) => {
  const data = await axios.post(`${BASE_URL}/user/check-code/${code}`);
  return data.data;
};

export const changePass = async (model) => {
  const data = await axios.put(`${BASE_URL}/user/change-pass`, model);
  return data.data;
};

//Bắt lỗi hết token để tự refresh Token
export const refToken = async () => {
  const data = await axios.post(`${BASE_URL}/user/refresh-token`, "", options);
  return data.data;
};

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    console.log(err.response.data.data.name);
    if (err.response.data.data.name == "TokenExpiredError") {
      refToken()
        .then((res) => {
          localStorage.setItem("LOGIN_USER", res.data);
        })
        .catch((err) => {
          // console.log(err);
          // localStorage.removeItemItem("LOGIN_USER");
        })
        .finally(() => {
          // window.location.reload();
        });
    }
    return Promise.reject(err);
  }
);

export const uploadCloudApi = async (formData) => {
  const data = await axios.post(
    `https://api.cloudinary.com/v1_1/duebu0fbg/upload`,
    formData
  );
  return data.data;
};

export const uploadAvatar = async (formData) => {
  const data = await axios.post(
    `${BASE_URL}/user/upload-avatar`,
    formData,
    options
  );
  return data.data;
};

export const compressImg = async (formData) => {
  const data = await axios.post(
    `${BASE_URL}/user/compress-img`,
    formData,
    options
  );
  return data.data;
};
