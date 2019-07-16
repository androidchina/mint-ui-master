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
  let member_id = "dadfe9194680d0893e052708ce690d7b1f72fe95fd475476a7d0dc841d1782549e9715ff9940aae3f7e621c43039aefd4a7f0a6898e337415adba6ae26a21ccc5c0065c162bd493bd8cf494eead14ee3e2593cfeca4b73ccdec77947251c8d858654bf9b600fcd7b7480f38478fc6da47a2e8e5ea71ea0395b1e20167a82c942";
  let login_key = "0a5db699af51765f263091d6cea7caecb81e9bd846daf8b0625ceea80ed1d7ccb9c7b352dc3fb0296ef5983c3605d1b06abc2867524ec38708fe1f8ebbbfd28320de6b8293d9b664eb17a4e3618b0d58e958fd83d6e1119b10c1373811526910cb7a065616d98aa041d1630595975cf2f257e8078ecc0480360aa3b852c371f4";

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
