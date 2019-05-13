<template>
  <div>
    <!--<mt-header title="工作报告▼" class="title">
      <router-link slot="left" to="">
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link slot="right" to="">
        <mt-button  @click="addReport">新增</mt-button>
      </router-link>
    </mt-header>-->

    <myheader :title_name="title_name"  :title_btn_string="title_btn_string"></myheader>

    <div style="line-height: 40px; margin-top: 40px; text-align: center; background-color: #FF7F50">筛选</div>

    <div class="page-loadmore-wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-spinner v-show="InitialLoading" color="#26a2ff"></mt-spinner>

      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
        <div class="hot-list">
          <div class="hot-one hot-item" v-for="(report_item, index) in report_list_json" :key="index" v-if="report_list_json">
            <a href="javascript:;" class="show clearfix" @click="itemClick(report_item.id)">
              <div>
                <span class="report_type">{{report_item.type_name}}</span>
                <span class="report_date">[{{report_item.date}}]</span>
                <span class="report_member">{{report_item.member_name}}</span>
                <span class="report_status" v-if="report_item.is_read === 1"></span>
                <span class="report_status" v-else-if="report_item.is_read === 2">[未被审核]</span>
                <span class="report_status" v-else-if="report_item.is_read === 3"></span>
                <span class="report_status" v-else-if="report_item.is_read === 4">[未被阅]</span>
                <span class="report_status" v-else-if="report_item.is_read === 5"></span>
                <span class="report_status" v-else-if="report_item.is_read === 6">[未审核]</span>
                <span class="report_status" v-else-if="report_item.is_read === 7"></span>
                <span class="report_status" v-else-if="report_item.is_read === 8">[未阅]</span>
                <span class="report_status" v-else></span>
              </div>
              <div>
                <span class="report_member">{{report_item.create_time}}</span>
              </div>
            </a>
          </div>
        </div>

        <div slot="top" class="mint-loadmore-top" style="text-align:center">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
        </div>

        <div v-if="allLoaded" style="text-align:center;">没有更多数据了</div>

        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
            <mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
          </span>
        </div>

      </mt-loadmore>
    </div>

    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="changeType(0)">全部报告</div>
      <div class="popup_1_box1" @click="changeType(1)">我的报告</div>
      <div class="popup_1_box1" @click="changeType(2)">所有下属的报告</div>
      <div class="popup_1_box2" @click="changeType(3)">抄送给我的报告</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      popup-transition="popup-fade"
      class="mint_popup_2">
      <div class="popup_1_box1" @click="addReport(0)">日报</div>
      <div class="popup_1_box1" @click="addReport(1)">周报</div>
      <div class="popup_1_box2" @click="addReport(2)">月报</div>
    </mt-popup>

  </div>
</template>
<script>

  import {getReportList} from '../../axios/api.js';
  import { Toast } from 'mint-ui';
  export default {
      name: "ReportList2",
      data (){
        return {
          title_name: "全部报告▼",
          title_btn_string: "新增",
          InitialLoading: false,//初始加载
          allLoaded: false,//数据是否加载完毕
          popupVisible1: false,//标题弹框
          popupVisible2: false,//新增报告弹框
          bottomStatus: '',//底部上拉加载状态
          wrapperHeight: 0,//容器高度
          topStatus: '',//顶部下拉加载状态
          translate: 0,//
          moveTranslate: 0,
          page: 0,// 页码，默认一页30天   默认值为0，第一页
          report_type: 0, // 报告类型 ，默认值0  （ 0：全部报告  1：日报   2：周报   3：月报）
          data_source: 0, // 数据源，默认0    （ 0:全部报告  1：我的报告   2：所有下属的报告   3：抄送给我的报告）
          begin_time: "", // 开始时间
          end_time: "", // 结束时间
          name: "",  // 会员名称
          day_num: "", // 默认值为空   （1:近一周  2：近一个月   3：近三个月 传值时开始时间和结束时间需要传空）
          other_member_ids: "", // 下属ID
          sequence_type: "", // 0:按报告创建时间，由新到老排序；1：按报告日期，由新到老排序
          read_type: "", // 查看状态（0:全部，1:已审核，2:未审核，3:已阅，4:未阅）
          report_list_json: [],
          report_id:'',
        }
      },

      created: async function() {
        /*let windowWidth = document.documentElement.clientWidth;//获取屏幕宽度
        if(windowWidth >= 768){//这里根据自己的实际情况设置容器的高度
          this.wrapperHeight = document.documentElement.clientHeight - 105;
        }else{
          this.wrapperHeight = document.documentElement.clientHeight - 80;
        }*/
        this.wrapperHeight = document.documentElement.clientHeight;
        // 获取工作报告列表
        this.reportListRefresh();
      },

      methods: {
        name_click() {
          this.popupVisible1 = true;
        },
        btn_click() {
          this.popupVisible2 = true;
        },

        changeType(report_type) {
          this.popupVisible1 = false;
          if (report_type === 0) {
            this.title_name = "全部报告▼";
            this.data_source = 0;
          } else if (report_type === 1) {
            this.title_name = "我的报告▼";
            this.data_source = 1;
          } else if (report_type === 2) {
            this.title_name = "所有下属的报告▼";
            this.data_source = 2;
          } else if (report_type === 3) {
            this.title_name = "抄送给我的报告▼";
            this.data_source = 3;
          }
          this.reportListRefresh();

        },
        addReport(type) {
          this.popupVisible2 = false;
          if (type === 0) {
            Toast("新增日报");
          } else if (type === 1) {
            Toast("新增周报");
          } else if (type === 2) {
            Toast("新增月报");
          }
        },


        async reportListRefresh() {
          const params = {
            report_type: this.report_type, // 报告类型
            data_source: this.data_source, // 数据源  0:全部报告  1：我的报告   2：所有下属的报告   3：抄送给我的报告
            begin_time: this.begin_time, // 开始时间
            end_time: this.end_time, // 结束时间
            name: this.name,  // 会员名称
            page: this.page, // 第几页
            day_num: this.day_num,
            other_member_ids: this.other_member_ids, // 下属ID
            sequence_type: this.sequence_type, // 0:按报告创建时间，由新到老排序；1：按报告日期，由新到老排序
            read_type: this.read_type, // 查看状态（0:全部，1:已审核，2:未审核，3:已阅，4:未阅）
          };
          let res = await getReportList(params);
          if (res.resCode === "1"){
            this.report_list_json = res.data;
          } else {
            this.report_list_json = [];
          }
          this.handleTopChange("loadingEnd");//数据加载完毕 修改状态码
          this.$refs.loadmore.onTopLoaded();
        },

        async reportListLoadMore() {
          const params = {
            report_type: this.report_type, // 报告类型
            data_source: this.data_source, // 数据源
            begin_time: this.begin_time, // 开始时间
            end_time: this.end_time, // 结束时间
            name: this.name,  // 会员名称
            page: this.page, // 第几页
            day_num: this.day_num,
            other_member_ids: this.other_member_ids, // 下属ID
            sequence_type: this.sequence_type, // 0:按报告创建时间，由新到老排序；1：按报告日期，由新到老排序
            read_type: this.read_type, // 查看状态（0:全部，1:已审核，2:未审核，3:已阅，4:未阅）
          };
          let res = await getReportList(params);
          if (res.resCode === "1"){
            this.report_list_json = this.report_list_json.concat(res.data);
          } else {
            this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
          }
          this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
          this.$refs.loadmore.onBottomLoaded();
        },

        itemClick(report_id){
          this.$router.push({ name: 'ReportDetail', params: { report_id: report_id}});
        },

        handleBottomChange(status) {
          this.moveTranslate = 1;
          this.bottomStatus = status;
        },
        loadBottom() {
          console.log("page = " + this.page);
          this.handleBottomChange("loading");//上拉时 改变状态码
          this.page += 1;
          this.reportListLoadMore();
        },
        handleTopChange(status) {
          this.moveTranslate = 1;
          this.topStatus = status;
        },
        translateChange(translate) {
          const translateNum = +translate;
          this.translate = translateNum.toFixed(2);
          this.moveTranslate = (1 + translateNum / 70).toFixed(2);
        },
        loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
          this.handleTopChange("loading");//下拉时 改变状态码
          this.page = 0;
          this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
          this.reportListRefresh();
        },
      }
    }
</script>

<style scoped>
  .title {
    height: 40px;
    width: 100%;
    top: 0;
    position: fixed;
  }

  .page-loadmore-wrapper {
    overflow: scroll;
  }
  .hot-list {
    padding: 0 8px;
  }
  .hot-item {
    padding: 10px 0;
  }
  .hot-one {
    overflow: hidden;
    border-bottom: 1px dashed #ccc;
  }
  .hot-one a img {
    padding-right: 10px;
  }
  .hot-item a img {
    width: 135px;
    height: 90px;
  }
  .hot-one a h5 {
    margin-top: 2px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-bottom: 6px;
    font-size: 16px;
    color: #000;
  }
  .hot-one a p {
    font-size: 12px;
    color: #828282;
    margin: 0 0 3px;
  }
  .color_e85647 {
    color: #e85647;
  }
  div.hot-list>div:first-child .img-box {
    overflow: hidden;
  }
  div.hot-list>div:first-child img {
    width: 100%;
    height: auto;
    padding-right: 0;
  }

  .report_type{
    font-size: 13px;
  }
  .report_date{
    font-size: 13px;
    margin-left: 8px;
    margin-right: 8px;
  }
  .report_member{
    font-size: 13px;
    color: #a0a0a0;
  }
  .report_status {
    font-size: 13px;
    float:right;
    margin-right: 8px;
    color: red;
  }

  .mint_popup_1 {
    width: 120px;
    border-radius: 8px;
  }
  .mint_popup_2 {
    width: 90px;
    border-radius: 8px;
  }

  .popup_1_box1 {
    width: 100%;
    text-align: center;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom:solid 1px #eeeeee;
  }
  .popup_1_box2 {
    width: 100%;
    text-align: center;
    font-size: 13px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
