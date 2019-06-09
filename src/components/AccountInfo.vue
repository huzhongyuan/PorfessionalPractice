<template>
  <div>
    <!-- 账户信息头部 -->
    <div class="title">
      <div class="titleI">账户信息</div>
      <div class="safeLink">
        <i class="el-icon-warning"></i>
        <div class="span">安全连接</div>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 摘要 -->
    <div class="abstract">
      <div class="abstractTitle">摘要</div>
      <div class="abstractContent" v-for="(item , index) in abstractDes" v-bind:key="index">
        <div class="abstractContentL">{{ item.des }}</div>
        <div class="abstractContentM">{{ item.info }}</div>
        <div class="abstractContentR" @click="changeAabstract(item, index)">{{ item.operate }}</div>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- ID账户 -->
    <div class="abstract">
      <div class="abstractTitle">ID账户</div>
      <div class="abstractContent" v-for="(item , index) in IDcount" v-bind:key="index">
        <div class="abstractContentL">{{ item.des }}</div>
        <div class="abstractContentM">{{ item.info }}</div>
        <div class="abstractContentR" @click="recharge(item , index)">{{ item.operate }}</div>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 管理 -->
    <div class="abstract">
      <div class="abstractTitle">管理</div>
      <div class="abstractContent" v-for="(item , index) in manages" v-bind:key="index">
        <div class="abstractContentL">{{ item.des }}</div>
        <div class="abstractContentM">{{ item.info }}</div>
        <div class="abstractContentR" @click="changeManages(item, index)">{{ item.operate }}</div>
      </div>
    </div>
    <!-- 分割线 -->
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "SoftwareInfo",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      abstractDes: [
        {
          des: "ID: ",
          info: "1224556222",
          operate: "在xxx编辑"
        },
        {
          des: "付款信息: ",
          info: "没有信息记录",
          operate: "管理付款方式"
        },
        {
          des: "账单寄送地址: ",
          info: "啦啦啦啦啦啦啦",
          operate: "编辑"
        },
        {
          des: "国家或地区: ",
          info: "中国大陆",
          operate: "更改国家或地区"
        }
      ],
      IDcount: [
        {
          des: "",
          info: "为账号快速充值",
          operate: "为账号充值"
        }
      ],
      manages: [
        {
          des: "昵称",
          info: "xxxxxx",
          operate: "更改昵称"
        },
        {
          des: "订阅",
          info: "1",
          operate: ""
        }
      ]
    };
  },
  methods: {
    //加载个人信息
    loadPersonInfo() {
      let that = this;
      that.$axios
        .get(that.$url + "user")
        .then(function(response) {
          console.log(response);
          that.abstractDes[0].info = response.data[0]._id;
          that.manages[0].info = response.data[0].userName;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changeAabstract(item, index) {
      let that = this;
      //console.log(item, index)
      this.$prompt("更改" + item.des, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        ///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "不能为空"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的" + item.des + "是: " + value
          });
          //   console.log(item[index].info);
          //   console.log(index);
          that.abstractDes[index].info = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //充值
    recharge(item, index) {
      let that = this;
      //console.log(item, index)
      this.$prompt("输入你要充值的金额", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[0-9]/,
        ///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "请输入数字"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的充值的金额为: " + value
          });
          //   console.log(item[index].info);
          //   console.log(index);
          that.manages[index].info = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    changeManages(item, index) {
      let that = this;
      //console.log(item, index)
      this.$prompt("更改" + item.des, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /\S/,
        ///[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "不能为空"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的" + item.des + "是: " + value
          });
          //   console.log(item[index].info);
          //   console.log(index);
          that.manages[index].info = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    }
  },
  mounted() {
    this.loadPersonInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 头部信息 */
.title {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}
.titleI {
  font-size: 25px;
}
.safeLink {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.safeLink:hover {
  color: #0080ff;
}
.safeLink i {
  margin-right: 5px;
}
.abstractTitle {
  font-size: 20px;
}

/* 摘要 */
.abstract {
  position: relative;
  width: 100%;
  height: 100%;
}
.abstractContent {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.abstractContentL {
  position: relative;
  width: 25%;
  display: flex;
  justify-content: flex-end;
  padding-right: 2%;
  color: #8b8b8b;
}
.abstractContentM {
  position: relative;
  width: 40%;
  padding-left: 1%;
  color: #404040;
}

.abstractContentR {
  position: relative;
  width: 10%;
  display: flex;
  justify-content: flex-start;
  color: #246cc0;
  cursor: pointer;
}
</style>
