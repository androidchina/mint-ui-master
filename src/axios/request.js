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
  let member_id = "1bfa184fdf438e7371fb88a587dfbf9d08c3417bb9c46787c39968264e1819f86bd94e97ac7c917f7811eb2c85ea8dde74661eeeb9fc7dcc263eebe76806cd75bcf96ea20adbce9d2a18743de3d4b459ee5c3f56e8b3e7539164551e36a92fa0a01f6e76cf6762960ddbd4d6176e38a139713801e950ab82d06c00ee65dd25d8";
  let login_key = "6574a58d04bdfbda683e55b4afe24f1dcd256b8dc70f98a52d03eb58043aae071f151ad90825d86553d3a270e1d034b2d0289f1dab278788f28586abcf3ea2e56270fa84806d9708e320c707625b52379ee9aed338c136eebe63df74e414b119db506f667050c8160fcdcb81d395aa799576b20331398071b8d58ac6eba6fd50";

  config.method === 'post'
    ? config.data = qs.stringify({...config.data, member_id: member_id, login_key: login_key})
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
    Indicator.close();
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
