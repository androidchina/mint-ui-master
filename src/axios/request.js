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
  let member_id = "aef672f1fe9581461185eada4a720240442e1ecbfb599ebba3c2ea6aa4ac614cdf606d2b1b80a2aa82dbd9ccd56db9e0431c886773a107501ee11d369d4e92f5afc19374258d4d6dc3c56fabd21b81d0338f77cd2a17fac1866524e4e64900a85875b453c131680c1071f15703622fb81051c245dd72ab761e522d91990b0e78";
  let login_key = "9c486ad0e5d91a45e7285c284623c704f306db90e14510107cb07e1e620758f04d208a397bed21e81dae9df7bb4f2dfebdb63e5ad72721fa10366ada28bf896ceb9b8446f540220cc6b3462eab5c096b0ab8add8566f88c84f6e6cdd696428e7ac3b8d6c03a0fa6ed75e402404d058a92b469992eae937e504830dfc032180dc";

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
