import axios from "axios";
import qs from "qs";
import {Toast} from 'mint-ui';
import { Indicator } from 'mint-ui';
//import app from "../main.js";


/****** 创建axios实例 ******/
const service = axios.create({
  baseURL: process.env.BASE_URL,  // api的base_url
  timeout: 10*1000 // 请求超时时间
});


/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {

  console.log("数据加载中……");
  Indicator.open('加载中');

  config.method === 'post'
    ? config.data = qs.stringify({...config.data})
    : config.params = {...config.params};
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
}, error => {  //请求错误处理

  Indicator.close();
  console.log("error1 = " +  error);
  Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
  response => {  //成功请求到数据
    Indicator.close();
    console.log("数据加载成功");

    if (response.data.resCode === "1") {
      return response.data;
    } else {
      Toast(response.data.message);
      return response.data;
    }
  },
  error => {  //响应错误处理
    if (error.toString().indexOf("timeout") != -1) {
      Toast("请求超时，请检查网络连接");
    } else if (error.response.status === 404) {
      Toast("请求地址不存在");
    } else if (error.response.status === 500) {
      Toast("服务器异常，请联系管理员");
    } else {
      Toast("请检查网络连接");
    }
    return Promise.reject(error)
  }
);
export default service;
