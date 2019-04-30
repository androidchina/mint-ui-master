<template>
  <div>
    <mt-header title="日报">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="report_title">
      <div class="user_name">{{report_detail_json.reportDetail.member_name}}</div>
      <div class="report_time">{{report_detail_json.reportDetail.date}}</div>
      <div class="report_type">{{report_detail_json.reportDetail.type_name}}</div>
    </div>

    <div class="box-wrap">
      <div class="box_vertical_line">
        <div class="box_title">上门拜访</div>
        <div class="box_content">{{report_detail_json.reportDetail.out_visit_num}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">电话拜访</div>
        <div class="box_content">{{report_detail_json.reportDetail.in_visit_num}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">新增客户数</div>
        <div class="box_content">{{report_detail_json.reportDetail.add_customer_num}}</div>
      </div>
      <div class="box_vertical_line" v-if="!show_day_report">
        <div class="box_title">出差天数</div>
        <div class="box_content">{{report_detail_json.reportDetail.travel_days}}</div>
      </div>
    </div>
    <div class="box-wrap">
      <div class="box_vertical_line">
        <div class="box_title">费用</div>
        <div class="box_content">{{report_detail_json.reportDetail.money}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">回款金额</div>
        <div class="box_content">{{report_detail_json.reportDetail.back_money}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">新增销售</div>
        <div class="box_content">{{report_detail_json.reportDetail.add_money}}</div>
      </div>
    </div>

    <div>
      <img class="auditing_img" src="../../assets/img/report_auditing_show_no.png" alt="" v-if="show_auditing_img"/>
      <div class="title_blue" v-text="title_content">今日总结</div>
      <div class="report_content">{{report_detail_json.reportDetail.content}}</div>
    </div>

    <div class="title_blue">问题反馈</div>
    <div class="report_content">{{report_detail_json.reportDetail.feedback}}</div>

    <div class="title_blue" v-text="title_table" v-if="!show_day_report">下周计划</div>
    <div class="box-wrap" v-if="!show_day_report">
      <div class="box_vertical_line">
        <div class="box_title">上门拜访</div>
        <div class="box_content">{{report_detail_json.reportDetail.next_out_visit_num}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">电话拜访</div>
        <div class="box_content">{{report_detail_json.reportDetail.next_in_visit_num}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">新增客户数</div>
        <div class="box_content">{{report_detail_json.reportDetail.next_add_customer_num}}</div>
      </div>
    </div>
    <div class="box-wrap" v-if="!show_day_report">
      <div class="box_vertical_line">
        <div class="box_title">新增销售</div>
        <div class="box_content">{{report_detail_json.reportDetail.next_add_money}}</div>
      </div>
      <div class="box_vertical_line">
        <div class="box_title">回款金额</div>
        <div class="box_content">{{report_detail_json.reportDetail.next_back_money}}</div>
      </div>
    </div>

    <div class="title_blue" v-text="title_plan">明日计划</div>
    <div class="report_content">{{report_detail_json.reportDetail.next_plan}}</div>

    <div class="place_holder"></div>

    <div class="report_send">
      <span class="report_send_title">批阅人</span>
      <span>{{report_detail_json.reportDetail.leader_member_name}}</span>
    </div>

    <div class="report_send">
      <span class="report_send_title">抄送人</span>
      <span>{{report_detail_json.reportDetail.cc_member_name}}</span>
    </div>

    <div class="report_reply">
      <div class="report_praise" @click="praise">
        <div>
          <img class="img_praise" src="../../assets/img/report_praise.png"  alt=""/>点赞
        </div>
      </div>
      <div class="report_praise" @click="comment">
        <div>
          <img class="img_praise" src="../../assets/img/report_comment.png"  alt=""/>评论
        </div>
      </div>
      <div class="report_auditing" @click="auditing" v-if="show_auditing_btn">
        <div>
          <img class="img_praise" src="../../assets/img/report_auditing.png"  alt=""/>审核
        </div>
      </div>
    </div>

    <div class="box_comment" id="div_comment" v-if="show_comment">
      <mt-field placeholder="请输入评论内容" :attr="{maxlength: 50}" id="field_comment" v-model="comment_send">
        <mt-button class="btn_comment" plain size="small" type="primary" @click="sendComment">提交</mt-button>
      </mt-field>
    </div>

    <div class="praise_list" v-if="show_auditing_person">
      <img class="img_praise" src="../../assets/img/auditing_person.png"  alt=""/>已审核人：{{report_detail_json.reportDetail.verify_member_names}}
    </div>

    <div class="praise_list" v-if="show_praise_person">
      <img class="img_praise" src="../../assets/img/praise_heart.png"  alt=""/>点赞人：{{comment_json.praise_member_name}}
    </div>

    <div class="comment_list">
      <ul>
        <li v-for="comment_item in comment_json.reportComment">
          <span>{{comment_item.member_name}}</span>
          <span>：</span>
          <span>{{comment_item.content}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  import report_auditing_show from '../../assets/img/report_auditing_show.png';
  import report_auditing_show_no from '../../assets/img/report_auditing_show_no.png';


  export default {
    box_comment: '#box_comment',
    data () {
      return {
        report_type: 1, // 报告类型  1：日报   2：周边   3：月报
        title_content: '今日总结',
        title_plan: '明日计划',
        title_table: '下周计划',
        show_day_report: true, // 是否是日报
        show_auditing_btn: false, // 是否显示审批按钮
        show_auditing_img: false, // 是否显示审批图片
        show_auditing_person: false, // 是否显示已审批人
        show_praise_person: false, // 是否显示点赞
        show_comment: false,  // 是否显示评论框
        report_auditing_show_url: report_auditing_show,
        comment_send: '',
        is_read: '', // 是否已读
        report_detail_json: [
          {
            "message": "",
            "reportDetail": {
              "add_customer_num": 0,
              "add_customer_num_isok": 0,
              "add_money": 0,
              "add_money_isok": 0,
              "back_money": 0,
              "back_money_isok": 0,
              "cc_member_name": "",
              "comments": [

              ],
              "content": "",
              "date": "",
              "feedback": "",
              "in_visit_num": 0,
              "in_visit_num_isok": 0,
              "is_read": "7",
              "is_show_verfiy_button": false,
              "is_verify_report": false,
              "leader_member_id": 0,
              "leader_member_name": "",
              "member_name": "",
              "money": 0,
              "next_add_customer_num": 0,
              "next_add_money": 0,
              "next_back_money": 0,
              "next_in_visit_num": 0,
              "next_out_visit_num": 0,
              "next_plan": "",
              "out_visit_num": 0,
              "out_visit_num_isok": 0,
              "praise_member_name": "",
              "travel_days": 0,
              "type": 1,
              "type_name": "",
              "verify_member_names": ""
            },
            "resCode": ""
          }

        ],
        comment_json: [
          {
          "message": "",
          "praise": "",
          "praise_member_name": "",
          "reportComment": [],
          "resCode": ""
          }
        ],
        member_id: 'c746f99a3c1aaf7690470e3159d8b8cddbac0f4a2c7d251a29c8fa1d58504d663c8403d6a2ea7cabec77511a1d00915881a5ce15df0bf4cef257ffb1fa4b477412b59033baf396a8d9e441fa0b12faf01f85e741e3ec924dcae0145cedd05a170d6647c0a2ca0dfdaa059d6b32f7bea56548169f44755d80bd18dd5ab1715531',
        login_key:'d67cffe7dec3d0b0115a28890c784ec05f69adfe11cef9eb797ccf892407815f583e266ace1178e732c56bc62dc61413f046af1321a058fa7b17c99de4a7172505ae9f9685b3b074c7813e7c127757f97cabf7a2f80510fdba1854d60d0c63e4d856d5465e8a40f841a11d0228a0cb032b0bb4affe9ffe1f089745d0b4144f7e',
        report_id:''
      }
    },
    mounted: function () {
      this.report_id = this.$route.query.report_id;
      this.getReportList();
      this.getCommentList();
    },
    methods: {
      // 获取工作报告详情
      getReportList() {
        this.axios({
          method:'post',
          url:'http://scrm.southsurvey.com/tuplusapi/workReport/detail',
          data:this.qs.stringify({    //这里是发送给后台的数据
            member_id: this.member_id,
            login_key: this.login_key,
            report_id: this.report_id
          })
        }).then((response) =>{          //这里使用了ES6的语法
          console.log(response.data);       //请求成功返回的数据
          this.report_detail_json = response.data;
          this.show_auditing_btn = this.report_detail_json.reportDetail.is_show_verfiy_button;
          this.is_read = this.report_detail_json.reportDetail.is_read;
          this.report_type = this.report_detail_json.reportDetail.type;
          this.initView();
          this.initAuditing();
        }).catch((error) =>{
          console.log("error = " + error);       //请求失败返回的数据
          this.goErrorPage();
        })
      },

      // 获取评论列表
      getCommentList() {
        this.axios({
          method:'post',
          url:'http://scrm.southsurvey.com/tuplusapi/workReport/getComment',
          data:this.qs.stringify({
            member_id: this.member_id,
            login_key: this.login_key,
            report_id: this.report_id
          })
        }).then((response) =>{
          console.log(response.data);
          this.comment_json = response.data;
          if (this.comment_json.praise_member_name != null && this.comment_json.praise_member_name.length > 0) {
            this.show_praise_person = true;
          } else {
            this.show_praise_person = false;
          }
        }).catch((error) =>{
          console.log(error)
        })
      },
      // 点赞
      praise() {
        this.axios({
          method:'post',
          url:'http://scrm.southsurvey.com/tuplusapi/workReport/praise',
          data:this.qs.stringify({
            member_id: this.member_id,
            login_key: this.login_key,
            report_id: this.report_id
          })
        }).then((response) =>{
          console.log(response.data);
          this.comment_json = response.data;
          Toast(response.data.message);
          // 刷新点赞人
          this.getCommentList();
        }).catch((error) =>{
          console.log(error)
        })
      },
      comment() {
        //Toast('评论');
        this.show_comment = !this.show_comment;
        /*if (this.show){
          document.getElementById("div_comment").scrollIntoView();
        }*/


        /*//公钥
        var PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgh354h7NMxUb2iFNgR337SU/UxLKr7HBFihKYC/zFfoiqrdU3gs6kaB2VV0w4D3hmWeL2Dn9JxSBl/OXYpt+aREVTqSq5zfg5ARJBUFR89gfUkReONCevsl7OmWS+DoS48/7YW6jktwKViFrDcb6lqnhKYhmEu96maNrN9YB0ZQIDAQAB';

        console.log(PUBLIC_KEY);
        //使用公钥加密
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(PUBLIC_KEY);
        var name = encrypt.encrypt('hudi');
        var password = encrypt.encrypt('123456');
        var type = encrypt.encrypt('1');
        var date = encrypt.encrypt('2019-04-25');

        let a = this.encodeChange.base64toHex(name);
        let b = this.encodeChange.base64toHex(password);
        let c = this.encodeChange.base64toHex(type);
        let d = this.encodeChange.base64toHex(date);

        console.log('加密后数据name:%o', a);
        console.log('加密后数据password:%o', b);
        console.log('加密后数据password:%o', c);
        console.log('加密后数据password:%o', d);*/

        },
      // 审核
      auditing() {
        this.axios({
          method:'post',
          url:'http://scrm.southsurvey.com/tuplusapi/WorkReport/verify',
          data:this.qs.stringify({
            member_id: this.member_id,
            login_key: this.login_key,
            report_id: this.report_id,
            verify_result: "1"
          })
        }).then((response) =>{
          console.log(response.data);
          Toast(response.data.message);
        }).catch((error) =>{
          console.log(error);
        })
      },
      // 发送评论
      sendComment() {
        if (this.comment_send == null || this.comment_send.length == 0) {
          Toast("请输入评论内容");
        } else {
          this.axios({
            method:'post',
            url:'http://scrm.southsurvey.com/tuplusapi/workReport/comment',
            data:this.qs.stringify({
              member_id: this.member_id,
              login_key: this.login_key,
              report_id: this.report_id,
              content: this.comment_send
            })
          }).then((response) =>{
            console.log(response.data);
            this.comment_json = response.data;
            Toast(response.data.message);
            // 刷新评论列表
            this.getCommentList();
            this.show_comment = !this.show_comment;
          }).catch((error) =>{
            console.log(error)
          })
        }
      },

      // 初始化报告类型相关控件
      initView() {
        if (this.report_type == 1) { // 日报
          this.title_content = "今日总结";
          this.title_plan = "明日计划";
          this.show_day_report = true;
        } else if (this.report_type == 2) { // 周报
          this.title_content = "本周总结";
          this.title_table = "下周计划";
          this.title_plan = "下周计划描述";
          this.show_day_report = false;
        } else if (this.report_type == 3) { // 月报
          this.title_content = "本月总结";
          this.title_table = "下月计划";
          this.title_plan = "下月计划描述";
          this.show_day_report = false;
        }
      },

      // 初始化审核控件
      initAuditing() {
        this.show_auditing_img = false;
        if (this.is_read != null && this.is_read == "6") { // 未审核
          this.show_auditing_img = true;
          this.report_auditing_show_url = report_auditing_show_no;
        }
        if (this.is_read == "5") { // 已审核
          this.show_auditing_img = true;
          this.report_auditing_show_url = report_auditing_show;
        }

        if (this.report_detail_json.reportDetail.verify_member_names != null && this.report_detail_json.reportDetail.verify_member_names.length > 0) {
          this.show_auditing_person = true;
        } else {
          this.show_auditing_person = false;
        }
      },

      goErrorPage () {
        this.$router.push({path: '/ErrorPage'})
      }
    }
  }
</script>

<style scoped>
  .report_title {
    display: flex;
    flex-direction: row;
    line-height: 30px;
    font-size: 14px;
    border-bottom:solid 1px #eeeeee;
  }
  .user_name {
    margin-left: 10px;
    flex: 1;
  }
  .report_time {
    flex: 2;
    text-align: center;
  }
  .report_type {
    margin-right: 10px;
    flex: 1;
    text-align: end;
  }

  .box-wrap {
    display: flex;
    border-bottom: solid 1px #eeeeee;
    text-align: center;
  }
  .box_vertical_line {
    border-right: solid 1px #eeeeee;
    flex: 1;
  }
  .box_title {
    font-size: 14px;
    color: #878787;
    margin-top: 5px;
  }
  .box_content {
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .title_blue {
    font-size: 14px;
    color: #15aff4;
    background-color: #eef1f3;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .report_content {
    font-size: 14px;
    margin: 10px;
  }
  .place_holder {
    height: 15px;
    background-color: #eef1f3;
  }
  .report_send {
    display: flex;
    flex-direction: row;
    line-height: 30px;
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom:solid 1px #eeeeee;
    justify-content: space-between;
  }
  .report_send_title {
    font-size: 14px;
    color: #878787;
  }
  .report_reply {
    display: flex;
    line-height: 35px;
    font-size: 14px;
    background-color: #eef1f3;
  }
  .report_praise {
    flex: 1;
    text-align: center;
    border-right: solid 1px #dcdcdc;
  }
  .report_auditing {
    flex: 1;
    text-align: center;
  }
  .img_praise {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .praise_list {
    line-height: 35px;
    background-color: #d3d3d3;
    font-size: 13px;
    padding-left: 10px;
  }
  .comment_list {
    background-color: #d3d3d3;
    font-size: 13px;
    padding-left: 10px;
    padding-bottom: 10px;
    padding-right: 10px;
  }
  .auditing_img {
    width: 55px;
    height: 55px;
    float:right;
    margin-top: 5px;
    margin-right: 10px;
  }
  .box_comment {
    border: solid 1px #eeeeee;
    margin-top: 10px;
    margin-bottom: 10px;

  }
  .btn_comment {
    width: 60px;
    height: 30px;
    font-size: 13px;
  }
</style>
