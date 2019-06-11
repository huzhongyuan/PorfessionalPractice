<template>
  <div class="login">
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>登陆</span>
    <el-button style="float: right; padding: 3px 0" type="text" @click="rejest">去注册</el-button>
  </div>
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="userName">
        <el-input type="user" v-model="ruleForm2.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item class="verifyCodeBox" label="验证码" prop="verifyCode">
        <el-input v-model.number="ruleForm2.verifyCode"></el-input>
      </el-form-item>
      <img @click="changeCode" class="verifyCode" :src="verifyCodeURL" alt="" > -->
      <el-form-item style="margin-top:50px;">
        <el-button type="primary" @click="submitForm('ruleForm2')">登陆</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
</el-card>

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
      //验证码
    var checkverifyCode= (rule, value, callback) => {
      if (!value) {
        return callback(new Error("验证码不能为空"));
      }
      setTimeout(() => {
        let reg=/^[A-Za-z0-9]+$ /;    
        if (reg.test(value)) {
          callback(new Error("验证码错误"));
        } else {
            callback();
        }
      }, 500);
    };
    //用户名
    var user = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }
      setTimeout(() => {  
        let reg=/^[\u0391-\uFFE5]+$/;//汉字   
        // let reg=/^[0-9]*$/;  
        if (!reg.test(value)) {
          callback(new Error("请输入中文名"));
        } else {
            callback();
        }
      }, 500);
    };
    //密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm2: {
        userName: '',
        pass: "",
        verifyCode: "",
      },
      rules2: {
        userName: [{ validator: user, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
      },
      verifyCodeURL: '',//二维码链接
    };
  },
  methods: {
    Login () {
      let that = this;
        this.$axios
          .post(
             that.$url+"userLogin",
              that.$qs.stringify({
                userName: that.ruleForm2.userName,
                password: that.$md5(that.ruleForm2.pass),
              })
          )
          .then(res => {
            if (res.data.code == 1) {
              this.$store.commit('changeUserInfo', res.data.data);
              sessionStorage.setItem('userId', res.data.data.userId);
              sessionStorage.setItem('surname',res.data.data.userName)
              this.$router.push({path: '/home'})
            } else {
              alert(res.data.message);
            }
            
          });
    },
    submitForm(formName) {
      let that = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          that.Login(that);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    rejest () {
        this.$router.push({path: '/Rejest'})
    },
    //改变二维码
    changeCode () {
      this.verifyCode();
    },
    //获取二维码
    verifyCode() {
      this.$axios
        .get(
          this.$url + "/userSystem/verifyCode",
          {
            responseType: "arraybuffer",
          }
        )
        .then(res => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.verifyCodeURL = data;
        });
    }
  },
  mounted () {
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
    position: absolute;
    width: 100%;
    height: 100%;
    display:flex;
    justify-content: center;
    align-items: center;
    /* margin-top: 100px; */
    background-image: url(http://zuoyeimg.xueui.cn/o_1d1cs9ehi19pln4dlvgpl11hu6a_infinity_3.gif)
}
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    margin: 0px auto;
  }

  .verifyCode {
    margin-left: 100px;
    cursor: pointer;
  }
</style>
