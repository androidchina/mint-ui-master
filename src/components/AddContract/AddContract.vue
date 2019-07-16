<template>
  <div>
    <mt-header :title="title_string" class="title">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="div_title"  style="height: 10px; margin-top: 40px;"></div>
    <div class="box_item">
      <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
      <div class="box_title">合同类别</div>
      <span :class=" type_id==='0' ? 'box_hint' : 'box_content' " @click="chooseType">{{type_name}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>

    <div class="div_title">客户</div>
    <div class="box_item">
      <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
      <div class="box_title">客户名称</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="chooseCustom">{{custom_name}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >地址</div>
      <input class="input_content"  placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">邮编</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">联系电话</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">传真</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>

    <div class="div_title">产品</div>
    <div class="box_item">
      <div class="box_left"><img class="box_img_left" src="../../assets/img/red_start.png" alt=""></div>
      <div class="box_title">产品名称</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="chooseProduct">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="product_item" style="border-right: solid 1px #eeeeee;">
        <div class="box_left"></div>
        <div class="box_title">单位</div>
        <span :class=" custom_id==='0' ? 'product_hint' : 'product_content' " @click="">{{hint_string}}</span>
        <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
      </div>
      <div class="product_item">
        <div class="box_left"></div>
        <div class="box_title">数量</div>
        <div class="product_item"><input class="input_product"   placeholder="点击填写"> </div>
        <div class="box_right"></div>
      </div>
    </div>
    <div class="box_item">
      <div class="product_item" style="border-right: solid 1px #eeeeee;">
        <div class="box_left"></div>
        <div class="box_title">单价(元)</div>
        <div class="product_item"><input class="input_product"   placeholder="点击填写"> </div>
        <div class="box_right"></div>
      </div>
      <div class="product_item">
        <div class="box_left"></div>
        <div class="box_title">金额(元)</div>
        <div class="product_item"><input class="input_product"   placeholder="点击填写"> </div>
        <div class="box_right"></div>
      </div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">备注</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <img class="add_product_img" src="../../assets/img/add_product.png" alt=""/>添加更多产品
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >总金额(元)</div>
      <span class="product_content" >10001.56</span>
      <div class="box_right"></div>
    </div>

    <div class="div_title">货款支付</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">支付种类</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">支付方式</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">支付时间</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>

    <div class="div_title">商品交付</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货方式</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货时间</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">交货地点</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="">{{hint_string}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>

    <div class="div_title">公司信息</div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">公司名称</div>
      <span :class=" custom_id==='0' ? 'box_hint' : 'box_content' " @click="chooseCustom">{{custom_name}}</span>
      <div class="box_right"><img class="box_img_right" src="../../assets/img/arrow_right.png" alt=""></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title" >地址</div>
      <input class="input_content"  placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">邮编</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">联系电话</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>
    <div class="box_item">
      <div class="box_left"></div>
      <div class="box_title">传真</div>
      <input class="input_content"   placeholder="点击填写" />
      <div class="box_right"></div>
    </div>



  </div>
</template>

<script>

  export default {
    data () {
      return {
        title_string: '合同登记',
        hint_string: '点击选择',
        type_id: '0',
        type_name: '点击选择',
        custom_id: '0',
        custom_name: '点击选择',
        custom_address: '',
        custom_email: '',
        custom_phone: '',
        custom_fax: '',
      }
    },

    created: async function() {

    },
    methods: {
      async chooseType() {
        this.type_id = '1';
        this.type_name = '销售合同'
      },
      async chooseCustom() {
        this.custom_id = '1';
        this.custom_name = '广州金扬教育采购有限公司'
      },
      async chooseProduct() {
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
</style>
