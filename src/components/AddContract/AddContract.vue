<template>
  <div>
    <mt-header :title="titleString" class="title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="div_title"  style="height: 10px; margin-top: 40px;"></div>
    <div class="box_item">
      <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
      <div class="box_title">合同类别</div>
      <span :class=" contractType==='' ? 'box_hint' : 'box_content' " @click="chooseContractType">{{contractName}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>

    <div class="div_title">客户</div>
    <div class="box_item">
      <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
      <div class="box_title">客户名称</div>
      <span :class=" customerId==='' ? 'box_hint' : 'box_content' " @click="chooseCustom">{{customerName}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >地址</div>
      <input class="input_content"  placeholder="点击填写" v-model="customerAddress"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">邮编</div>
      <input class="input_content"   placeholder="点击填写" v-model="customerPostalCode"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">联系电话</div>
      <input class="input_content"   placeholder="点击填写" v-model="customerPhone"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">传真</div>
      <input class="input_content"   placeholder="点击填写" v-model="customerFax"/>
      <div class="box_right"></div>
    </div>

    <div class="div_title">产品</div>
    <div v-for="item in productNums">
      <div class="box_item">
        <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
        <div class="box_title">产品名称</div>
        <span :class=" productId==='' ? 'box_hint' : 'box_content' " @click="chooseProduct">{{productName}}</span>
        <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
      </div>
      <div class="box_item">
        <div class="product_item" style="border-right: solid 1px #eeeeee;">
          <div class="box_left"></div>
          <div class="box_title">单位</div>
          <span :class=" productUnit==='' ? 'product_hint' : 'product_content' ">{{productUnit}}</span>
          <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
        </div>
        <div class="product_item">
          <div class="box_left"></div>
          <div class="box_title">数量</div>
          <div class="product_item"><input class="input_product"   placeholder="点击填写" v-model="productQuantity"> </div>
          <div class="box_right"></div>
        </div>
      </div>
      <div class="box_item">
        <div class="product_item" style="border-right: solid 1px #eeeeee;">
          <div class="box_left"></div>
          <div class="box_title">单价(元)</div>
          <div class="product_item"><input class="input_product"   placeholder="点击填写" v-model="productUnitPrice"> </div>
          <div class="box_right"></div>
        </div>
        <div class="product_item">
          <div class="box_left"></div>
          <div class="box_title">金额(元)</div>
          <div class="product_item"><input class="input_product"   placeholder="点击填写" v-model="productMoney"> </div>
          <div class="box_right"></div>
        </div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">备注</div>
        <input class="input_content"   placeholder="点击填写" v-model="productRemark"/>
        <div class="box_right"></div>
      </div>
    </div>
    <div class="box_item" @click="addProduct">
      <img class="add_product_img" src="../../assets/img/add_product.png" alt=""/>添加更多产品
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >总金额(元)</div>
      <span class="product_content" >{{productTotalMoney}}</span>
      <div class="box_right"></div>
    </div>

    <div class="div_title">货款支付</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">支付种类</div>
      <span :class=" paymentType==='点击选择' ? 'box_hint' : 'box_content' " @click="choosePaymentType">{{paymentType}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">支付方式</div>
      <span :class=" paymentMode==='点击选择' ? 'box_hint' : 'box_content' " @click="choosePaymentMode">{{paymentMode}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item" v-if="paymentType === '点击选择' || paymentType === '即时结清' || paymentType === '其他方式' ">
      <div class="box_left"></div>
      <div class="box_title">支付时间</div>
      <span :class=" paymentTime==='点击选择' ? 'box_hint' : 'box_content' " @click="choosePaymentTime">{{paymentTime}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item" v-if="paymentType === '限时结清' ">
      <div class="box_left"></div>
      <div class="box_title">支付时间</div>
      <div class="box_content">
        合同签订时 <input class="input_payment"  placeholder="点击填写" v-model="paymentDay"/> 天内
      </div>
      <div class="box_right"></div>
    </div>
    <div v-if="paymentType === '分期付款' ">
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">首付比例</div>
        <div class="box_content">
          合同签订时付 <input class="input_payment"  placeholder="点击填写" v-model="paymentRatio"/> %
        </div>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">首付金额</div>
        <div class="box_content">
          合同签订时付 <input class="input_payment"  placeholder="点击填写" v-model="paymentFirstMoney"/> 元
        </div>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">尾款支付</div>
        <div class="box_content">
          每月支付 <input class="input_payment"  placeholder="点击填写" v-model="installmentMoney"/> 元
        </div>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">结清时间</div>
        <span :class=" paymentTime==='点击选择' ? 'box_hint' : 'box_content' " @click="choosePaymentTime">{{paymentTime}}</span>
        <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
      </div>
    </div>


    <div class="div_title">商品交付</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货方式</div>
      <span :class=" deliveryMode==='点击选择' ? 'box_hint' : 'box_content' " @click="chooseDeliveryMode">{{deliveryMode}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货时间</div>
      <div class="box_content">
        合同签订时 <input class="input_payment"  placeholder="点击填写" v-model="deliveryTime"/> 天内
      </div>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货地点</div>
      <input class="input_content"  placeholder="点击填写" v-model="deliveryAddress"/>
      <div class="box_right"></div>
    </div>
    <div v-if="deliveryMode === '乙方代办第三方运输' ">
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">运输方式</div>
        <input class="input_content"  placeholder="点击填写" v-model="transportMode"/>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">联系人</div>
        <input class="input_content"  placeholder="点击填写" v-model="deliveryPerson"/>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">电话</div>
        <input class="input_content"  placeholder="点击填写" v-model="deliveryPhone"/>
        <div class="box_right"></div>
      </div>
      <div class="box_item">
        <div class="box_left"></div>
        <div class="box_title">额外费用</div>
        <div class="box_content">
          由 <input class="input_payment"  placeholder="点击选择" v-model="extraMoney" @click="chooseExtraMoney"/> 支付
        </div>
        <div class="box_right"></div>
      </div>
    </div>

    <div class="div_title">公司信息</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">公司名称</div>
      <span :class=" companyId==='' ? 'box_hint' : 'box_content' " @click="chooseCustom">{{companyName}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >地址</div>
      <input class="input_content"  placeholder="点击填写" v-model="companyAddress"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">邮编</div>
      <input class="input_content"   placeholder="点击填写" v-model="companyPostalCode"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">联系电话</div>
      <input class="input_content"   placeholder="点击填写" v-model="companyPhone"/>
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">传真</div>
      <input class="input_content"   placeholder="点击填写" v-model="companyFax"/>
      <div class="box_right"></div>
    </div>


    <!--弹框-->
    <mt-popup
      v-model="popupVisible1"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="changeContractType(0)">销售合同</div>
      <div class="popup_1_box1" @click="changeContractType(1)">项目合同</div>
      <div class="popup_1_box1" @click="changeContractType(2)">采购合同</div>
      <div class="popup_1_box2" @click="changeContractType(3)">租赁合同</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible2"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="changePaymentType(0)">即时结清</div>
      <div class="popup_1_box1" @click="changePaymentType(1)">限时结清</div>
      <div class="popup_1_box1" @click="changePaymentType(2)">分期付款</div>
      <div class="popup_1_box2" @click="changePaymentType(3)">其他方式</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible3"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="changePaymentMode(0)">现金</div>
      <div class="popup_1_box1" @click="changePaymentMode(1)">银行转账</div>
      <div class="popup_1_box1" @click="changePaymentMode(2)">电汇</div>
      <div class="popup_1_box2" @click="changePaymentMode(3)">支票</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible4"
      popup-transition="popup-fade"
      class="mint_popup_4">
      <div class="popup_1_box1" @click="changeDeliveryMode(0)">甲方自提自运</div>
      <div class="popup_1_box1" @click="changeDeliveryMode(1)">乙方送货</div>
      <div class="popup_1_box2" @click="changeDeliveryMode(2)">乙方代办第三方运输</div>
    </mt-popup>
    <mt-popup
      v-model="popupVisible5"
      popup-transition="popup-fade"
      class="mint_popup_1">
      <div class="popup_1_box1" @click="changeExtraMoney(0)">甲方</div>
      <div class="popup_1_box2" @click="changeExtraMoney(1)">乙方</div>
    </mt-popup>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  // TODO
  export default {
    data () {
      return {
        titleString: '合同登记',//标题
        popupVisible1: false,//选择合同类别

        contractId:'',//合同id
        contractNumber:'',//合同号
        creationTime:'',//创建时间
        modificationTime:'',//修改时间
        creatorName:'',//创建人姓名
        creatorId:'',//创建人id
        contractRemark:'',//合同备注
        contractType:'1001N8100000003DT7XO',//合同类别
        contractName:'销售合同',//合同类别名称
        // 销售合同、项目合同、采购合同、租赁合同
        // '1001N8100000003DT7XO', '1001N8100000003Q0HCZ','1001N8100000003DT7XQ','1001N8100000003DT7XP'
        //合同类别目前是固定的这四种

        customerId:'',//客户id
        customerName:'点击选择',//客户名称
        customerAddress:'',//地址
        customerPostalCode:'',//邮编
        customerPhone:'',//联系电话
        customerFax:'',//传真

        productId:'',//产品id
        productName:'点击选择',//产品名称
        productUnit:'个',//单位
        productQuantity:'',//数量
        productUnitPrice:'',//单价
        productMoney:'',//金额
        productRemark:'',//备注
        productTotalMoney:'',//总金额
        productNums:'1',// 产品条数

        paymentType:'点击选择',//支付种类
        paymentMode:'点击选择',//支付方式
        paymentTime:'点击选择',//支付时间
        paymentRatio:'',//首付比例
        paymentFirstMoney:'',//首付金额
        installmentMoney:'',//首付间隔金额
        paymentCompleteTime:'',//结清时间
        paymentDay:'',//合同签订后多少天内结清
        popupVisible2:false,//是否显示选择支付种类的弹框
        popupVisible3:false,//是否显示选择支付方式的弹框

        deliveryMode:'点击选择',//交货方式
        deliveryTime:'点击选择',//交货时间
        deliveryAddress:'',//交货地点
        transportMode:'',//运输方式
        deliveryPerson:'',//联系人
        deliveryPhone:'',//联系电话
        extraMoney:'',//额外费用由谁支付(甲方、乙方)
        popupVisible4:false,//是否显示选择交货方式的弹框
        popupVisible5:false,//额外费用由谁支付

        companyId:'',//公司id
        companyName:'点击选择',//公司名称
        companyAddress:'',//地址
        companyPostalCode:'',//邮编
        companyPhone:'',//联系电话
        companyFax:'',//传真

      }
    },

    created: function() {

    },
    methods: {
      // 选择合同类型
      chooseContractType() {
        this.popupVisible1 = true;
      },
      changeContractType(type) {
        this.popupVisible1 = false;
        if (type === 0) {
          this.contractName = '销售合同';
          this.contractId = '1001N8100000003DT7XO';
        } else if (type === 1) {
          this.contractName = '项目合同';
          this.contractId = '1001N8100000003Q0HCZ';
        } else if (type === 2) {
          this.contractName = '采购合同';
          this.contractId = '1001N8100000003DT7XQ';
        } else if (type === 3) {
          this.contractName = '租赁合同';
          this.contractId = '1001N8100000003DT7XP';
        }
      },

      // 选择客户
      chooseCustom() {
        this.customerId = '1';
        this.customerName = '广州金扬教育采购有限公司';
        Toast("选择客户");
      },
      // 选择产品
      chooseProduct() {
        Toast("选择产品");
      },
      // 添加更多产品条目
      addProduct() {
        this.productNums = this.productNums +1
      },

      // 选择支付方式
      choosePaymentType() {
        this.popupVisible2 = true;
      },
      changePaymentType(type) {
        this.popupVisible2 = false;
        this.paymentTime = '点击选择';
        if (type === 0) {
          this.paymentType = '即时结清';
        } else if (type === 1) {
          this.paymentType = '限时结清';
        } else if (type === 2) {
          this.paymentType = '分期付款';
        } else if (type === 3) {
          this.paymentType = '其他方式';
        }
      },
      // 选择支付方式
      choosePaymentMode() {
        this.popupVisible3 = true;
      },
      changePaymentMode(type) {
        this.popupVisible3 = false;
        if (type === 0) {
          this.paymentMode = '现金';
        } else if (type === 1) {
          this.paymentMode = '银行转账';
        } else if (type === 2) {
          this.paymentMode = '电汇';
        } else if (type === 3) {
          this.paymentMode = '支票';
        }
      },
      // 选择支付时间
      choosePaymentTime() {
        Toast("选择支付时间");
        this.paymentTime = '2019-07-17';
      },
      chooseDeliveryMode() {
        this.popupVisible4 = true;
      },
      changeDeliveryMode(type) {
        this.popupVisible4 = false;
        if (type === 0) {
          this.deliveryMode = '甲方自提自运';
          this.deliveryAddress = '乙方经营场所自行提货';
        } else if (type === 1) {
          this.deliveryMode = '乙方送货';
          this.deliveryAddress = '';
        } else if (type === 2) {
          this.deliveryMode = '乙方代办第三方运输';
          this.deliveryAddress = '';
        }
      },
      chooseExtraMoney() {
        this.popupVisible5 = true;
      },
      changeExtraMoney(type) {
        this.popupVisible5 = false;
        if (type === 0) {
          this.extraMoney = '甲方';
        } else if (type === 1) {
          this.extraMoney = '乙方';
        }
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

  .div_title{
    background-color: #eeeeee;
    border-bottom: solid 1px #eeeeee;
    height: 25px;
    line-height: 25px;
    font-size: 13px;
    padding-left: 11px;
    color: #15aff4;
  }
  .box_item {
    display: flex;
    background-color: white;
    border-bottom: solid 1px #eeeeee;
    line-height: 35px;
    height: 35px;
    padding-left: 5px;
    justify-content:center;
    align-items:center;
    font-size: 13px;
  }
  .box_left {
    display: flex;
    line-height: 35px;
    height: 35px;
    width: 6px;
    justify-content:center;
    align-items:center;
  }
  .box_img_left {
    width: 6px;
    height: 6px;
  }
  .box_title {
    flex: 1;
    font-size: 14px;
    color: #242424;
  }
  .box_hint {
    flex: 3;
    font-size: 14px;
    color: #757575;
  }
  .box_content {
    flex: 3;
    font-size: 14px;
    color: #242424;
  }

  .input_content{
    flex: 3;
    font-size: 14px;
    color: #242424;
    outline:none;
    border: none;
    background:transparent;
    text-align:left;
  }
  .box_right {
    display: flex;
    line-height: 35px;
    height: 35px;
    width: 25px;
    justify-content:center;
    align-items:center;
  }
  .box_img_right {
    width: 25px;
    height: 25px;
  }
  .product_item {
    display: flex;
    flex: 1;
    justify-content:center;
    align-items:center;
  }
  .product_hint {
    flex: 1;
    font-size: 14px;
    color: #757575;
    text-align:right;
  }
  .product_content {
    flex: 1;
    font-size: 14px;
    color: #242424;
    text-align:right;
  }
  .input_product{
    flex: 1;
    font-size: 14px;
    width: 70px;
    color: #242424;
    outline:none;
    border: none;
    background:transparent;
    text-align:right;
  }
  .add_product_img {
    width: 20px;
    height: 20px;
  }

  .input_payment{
    width: 70px;
    font-size: 13px;
    color: #242424;
    background:transparent;
    text-align:center;
  }

  .mint_popup_1 {
    width: 120px;
    border-radius: 8px;
  }
  .mint_popup_4 {
    width: 150px;
    border-radius: 8px;
  }
  .popup_1_box1 {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom:solid 1px #eeeeee;
  }
  .popup_1_box2 {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding-top: 8px;
    padding-bottom: 8px;
  }
</style>
