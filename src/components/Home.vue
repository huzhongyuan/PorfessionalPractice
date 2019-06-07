<template>
  <div>
    <el-container>
      <el-aside class="aside">
        <div class="asideBack">
                  <div class="searchBox">
          <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="搜索"
            @select="handleSelect"
            style="width:250px;"
          >
            <i class="el-icon-search el-input__icon search" slot="suffix" @click="handleIconClick"></i>
            <template slot-scope="{ item }">
              <div class="name">{{ item.value }}</div>
              <span class="addr">{{ item.address }}</span>
            </template>
          </el-autocomplete>
        </div>
        <div class="category">
          <div v-for="(item, index) in items" v-bind:key="item.id" class="categoryBox" @click="toExplore(index)">
            <i :class="item.icon" class="icon"></i>
            {{ item.text }}
            <div v-if="item.number" class="tips">{{ item.number }}</div>
          </div>
        </div>
        <div class="personCount" @click="toPersonal">
            <div class="auheader">
                <img :src="personInfo.img" alt="">
            </div>
            <div class="personIBox">
                <div class="personName">
                    {{ personInfo.name }}
                </div>
                <div class="personMoney">
                    {{ personInfo.money }}
                </div>
            </div>
        </div>
        </div>

      </el-aside>
      <el-main class="main" style="padding: 0 25px;">
        <div :is="currentView" v-on:func="changeNowmodel" v-on:toSoftwareInfo="toSoftwareInfo" v-on:toExplore="toExplore" v-on:AccountInfo="AccountInfo" ref="mychild"></div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Explore from "./Explore.vue";  //主页
import Singletype from "./Singletype.vue";  //软件List
import AccountInfo from "./AccountInfo.vue";  //账户详情
import Account from "./Account.vue";  //账户
import SoftwareInfo from "./SoftwareInfo.vue"; //软件详情

export default {
  name: "home",
  data() {
    return {
      currentView: "Account", // 默认选中第一项
      msg: "Welcome to Your Vue.js App",
      restaurants: [],
      state: "",
      items: [
        {
          text: "探索",
          id: 0,
          icon: "el-icon-star-on",
          number: 3
        },
        {
          text: "创作",
          id: 1
        },
        {
          text: "工作",
          id: 2
        }
      ],
      personInfo: {
          img: "https://github.com/huzhongyuan/img/blob/master/U0LE%60S05%251FQ0BD~R9Q$BQ3.jpg?raw=true",
          name: '杨雨涵',
          money: '124元',
          id: 1
      }
    };
  },
  components: {
    Explore,
    Singletype,
    Account,
    SoftwareInfo,
    AccountInfo,
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        { value: "三全鲜食（北新泾店）", address: "长宁区新渔路144号" },
        {
          value: "Hot honey 首尔炸鸡（仙霞路）",
          address: "上海市长宁区淞虹路661号"
        },
        {
          value: "新旺角茶餐厅",
          address: "上海市普陀区真北路988号创邑金沙谷6号楼113"
        },
        { value: "泷千家(天山西路店)", address: "天山西路438号" },
        {
          value: "胖仙女纸杯蛋糕（上海凌空店）",
          address: "上海市长宁区金钟路968号1幢18号楼一层商铺18-101"
        },
        { value: "贡茶", address: "上海市长宁区金钟路633号" },
        {
          value: "豪大大香鸡排超级奶爸",
          address: "上海市嘉定区曹安公路曹安路1685号"
        },
        {
          value: "茶芝兰（奶茶，手抓饼）",
          address: "上海市普陀区同普路1435号"
        },
        { value: "十二泷町", address: "上海市北翟路1444弄81号B幢-107" },
        { value: "星移浓缩咖啡", address: "上海市嘉定区新郁路817号" },
        { value: "阿姨奶茶/豪大大", address: "嘉定区曹安路1611号" },
        { value: "新麦甜四季甜品炸鸡", address: "嘉定区曹安公路2383弄55号" },
        {
          value: "Monica摩托主题咖啡店",
          address: "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F"
        },
        {
          value: "浮生若茶（凌空soho店）",
          address: "上海长宁区金钟路968号9号楼地下一层"
        },
        { value: "NONO JUICE  鲜榨果汁", address: "上海市长宁区天山西路119号" },
        { value: "CoCo都可(北新泾店）", address: "上海市长宁区仙霞西路" },
        {
          value: "快乐柠檬（神州智慧店）",
          address: "上海市长宁区天山西路567号1层R117号店铺"
        },
        {
          value: "Merci Paul cafe",
          address: "上海市普陀区光复西路丹巴路28弄6号楼819"
        },
        {
          value: "猫山王（西郊百联店）",
          address: "上海市长宁区仙霞西路88号第一层G05-F01-1-306"
        },
        { value: "枪会山", address: "上海市普陀区棕榈路" },
        { value: "纵食", address: "元丰天山花园(东门) 双流路267号" },
        { value: "钱记", address: "上海市长宁区天山西路" },
        { value: "壹杯加", address: "上海市长宁区通协路" },
        {
          value: "唦哇嘀咖",
          address: "上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元"
        },
        { value: "爱茜茜里(西郊百联)", address: "长宁区仙霞西路88号1305室" },
        {
          value: "爱茜茜里(近铁广场)",
          address:
            "上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺"
        },
        {
          value: "鲜果榨汁（金沙江路和美广店）",
          address: "普陀区金沙江路2239号金沙和美广场B1-10-6"
        },
        {
          value: "开心丽果（缤谷店）",
          address: "上海市长宁区威宁路天山路341号"
        },
        { value: "超级鸡车（丰庄路店）", address: "上海市嘉定区丰庄路240号" },
        { value: "妙生活果园（北新泾店）", address: "长宁区新渔路144号" },
        { value: "香宜度麻辣香锅", address: "长宁区淞虹路148号" },
        {
          value: "凡仔汉堡（老真北路店）",
          address: "上海市普陀区老真北路160号"
        },
        { value: "港式小铺", address: "上海市长宁区金钟路968号15楼15-105室" },
        { value: "蜀香源麻辣香锅（剑河路店）", address: "剑河路443-1" },
        { value: "北京饺子馆", address: "长宁区北新泾街道天山西路490-1号" },
        {
          value: "饭典*新简餐（凌空SOHO店）",
          address: "上海市长宁区金钟路968号9号楼地下一层9-83室"
        },
        {
          value: "焦耳·川式快餐（金钟路店）",
          address: "上海市金钟路633号地下一层甲部"
        },
        { value: "动力鸡车", address: "长宁区仙霞西路299弄3号101B" },
        { value: "浏阳蒸菜", address: "天山西路430号" },
        { value: "四海游龙（天山西路店）", address: "上海市长宁区天山西路" },
        {
          value: "樱花食堂（凌空店）",
          address: "上海市长宁区金钟路968号15楼15-105室"
        },
        { value: "壹分米客家传统调制米粉(天山店)", address: "天山西路428号" },
        {
          value: "福荣祥烧腊（平溪路店）",
          address: "上海市长宁区协和路福泉路255弄57-73号"
        },
        {
          value: "速记黄焖鸡米饭",
          address: "上海市长宁区北新泾街道金钟路180号1层01号摊位"
        },
        { value: "红辣椒麻辣烫", address: "上海市长宁区天山西路492号" },
        {
          value: "(小杨生煎)西郊百联餐厅",
          address: "长宁区仙霞西路88号百联2楼"
        },
        { value: "阳阳麻辣烫", address: "天山西路389号" },
        {
          value: "南拳妈妈龙虾盖浇饭",
          address: "普陀区金沙江路1699号鑫乐惠美食广场A13"
        }
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    handleIconClick(ev) {
      console.log(ev);
    },
    //转到探索
    toExplore (val = 0) {
        console.log(val)
        let that = this;
        if (val == 0) {
            that.currentView = "Explore";
        }
    },

    // 转到账户界面
    toPersonal() {
        let that = this;
        that.currentView = "Account";
    },
  //转到账户详情
      AccountInfo() {
        let that = this;
        that.currentView = "AccountInfo";
    },
    //转到软件详情
    toSoftwareInfo (val) {
      console.log(val);
      console.log(122354456)
      let that = this;
      that.currentView = 'SoftwareInfo'
    },

    //改变模块
    changeNowmodel () {
        let that = this;
        that.currentView = "Singletype";
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.aside {
  width: 300px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}
.asideBack {
  position: fixed;
  width: 300px;
  height: 100%;
    background-color: #e1dedf;
}
.main {
    overflow: hidden;
}
.searchBox {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 300px;
}

.my-autocomplete li {
  line-height: normal;
  padding: 7px;
}
.my-autocomplete .name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.my-autocomplete .addr {
  font-size: 12px;
  color: #b4b4b4;
}

.my-autocomplete .highlighted .addr {
  color: #ddd;
}
.search {
  cursor: pointer;
}
.category {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 5px;
  height: 500px;
  position: fixed;
  width:300px;
  top: 70px;
}

.categoryBox {
  display: flex;
  align-items: center;
  padding: 0px 25px;
  height: 50px;
  cursor: pointer;
}
.categoryBox:hover {
  background-color: #a8a5a6;
}
.icon {
  margin-right: 10px;
}

.tips {
  margin-left: 150px;
  height: 20px;
  width: 20px;
  background-color: #5f5e5c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  border-radius: 50%;
}
.personCount {
    position: fixed;
    bottom: 0px;
    width: 300px;
    height: 80px;
    display: flex;
    align-items: center;
    cursor: pointer;
}
.personCount:hover {
  background-color: #a8a5a6;
  color: white;
}
.auheader img{
    width: 45px;
    border-radius: 50%;
    margin-left: 20px;
}
.personIBox {
    margin-left: 15px;
    font-size: 14px;
}
</style>
