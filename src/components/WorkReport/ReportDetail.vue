<template>
  <div  v-if="report_detail_json.reportDetail">
    <mt-header :title="report_detail_json.reportDetail.type_name" class="title">
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
      <img class="auditing_img" src="../../assets/img/report_auditing_show.png" alt="" v-if="report_detail_json.reportDetail.is_read === '5'"/>
      <img class="auditing_img" src="../../assets/img/report_auditing_show_no.png" alt="" v-else-if="report_detail_json.reportDetail.is_read === '6'"/>

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

    <div>
      <ul>
        <li class="comment_list" v-for="comment_item in comment_json.reportComment">
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
  import {getReportDetail, getCommentList, reportPraise, sendComment, reportAuditing} from '../../axios/api.js';


  export default {
    box_comment: '#box_comment',
    data () {
      return {
        that: this,
        report_type: 1, // 报告类型  1：日报   2：周边   3：月报
        title_content: '今日总结',
        title_plan: '明日计划',
        title_table: '下周计划',
        show_day_report: true, // 是否是日报
        show_auditing_person: false, // 是否显示已审批人
        show_praise_person: false, // 是否显示点赞
        show_comment: false,  // 是否显示评论框
        report_auditing_show_url: report_auditing_show,
        comment_send: '',
        report_detail_json: [],
        comment_json: [],
        report_id:''
      }
    },

    created: async function() {
      this.report_id = this.$route.params.report_id;
      console.log('加密前 report_id:%o', this.report_id);
      //公钥
      let PUBLIC_KEY = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgh354h7NMxUb2iFNgR337SU/UxLKr7HBFihKYC/zFfoiqrdU3gs6kaB2VV0w4D3hmWeL2Dn9JxSBl/OXYpt+aREVTqSq5zfg5ARJBUFR89gfUkReONCevsl7OmWS+DoS48/7YW6jktwKViFrDcb6lqnhKYhmEu96maNrN9YB0ZQIDAQAB';

      //使用公钥加密
      let encrypt = new JSEncrypt();
      encrypt.setPublicKey(PUBLIC_KEY);
      let report_id = encrypt.encrypt("" + this.report_id);

      this.report_id = this.encodeChange.base64toHex(report_id);

      console.log('加密后 report_id:%o', this.report_id);

      this.getReportDetail();
      this.getCommentList();
    },
    methods: {
      // 获取工作报告详情
      async getReportDetail() {
        const params = {
          report_id: this.report_id
        };
        let res = await getReportDetail(params);
        this.report_detail_json = res;
        this.report_type = this.report_detail_json.reportDetail.type;
        this.initView();
        this.initAuditing();
      },

      // 获取评论列表
      async getCommentList() {
        const params = {
          report_id: this.report_id
        };
        let res = await getCommentList(params);
        this.comment_json = res;
        if (this.comment_json.praise_member_name != null && this.comment_json.praise_member_name.length > 0) {
          this.show_praise_person = true;
        } else {
          this.show_praise_person = false;
        }
        this.initAuditing();
      },
      // 点赞
      async praise() {
        const params = {
          report_id: this.report_id
        };
        let res = await reportPraise(params);
        Toast(res.message);
        // 刷新点赞人
        this.getCommentList();
      },

      comment() {
        //Toast('评论');
        this.show_comment = !this.show_comment;
        },
      // 审核
      async auditing() {
        const params = {
          report_id: this.report_id,
          verify_result: "1"
        };
        let res = await reportAuditing(params);
        Toast(res.message);
        // 刷新审核人
        this.getReportDetail();
        this.getCommentList();
      },
      // 发送评论
      async sendComment() {
        if (this.comment_send == null || this.comment_send.length == 0) {
          Toast("请输入评论内容");
        } else {
          const params = {
            report_id: this.report_id,
            content: this.comment_send
          };
          let res = await sendComment(params);
          this.comment_json = res;
          Toast(res.message);
          // 刷新评论列表
          this.getCommentList();
          this.show_comment = !this.show_comment;
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
        if (this.report_detail_json.reportDetail.verify_member_names != null && this.report_detail_json.reportDetail.verify_member_names.length > 0) {
          this.show_auditing_person = true;
        } else {
          this.show_auditing_person = false;
        }
        if (this.report_detail_json.reportDetail.is_read === "6") {
          this.show_auditing_btn = true;
        } else {
          this.show_auditing_btn = false;
        }
      },

      goErrorPage () {
        this.$router.push({path: '/ErrorPage'})
      }
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
  .report_title {
    display: flex;
    flex-direction: row;
    line-height: 30px;
    font-size: 14px;
    margin-top: 40px;
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
    padding: 10px;
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
