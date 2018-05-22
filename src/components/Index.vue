<template>
    <main class="main">
        <section class="section" v-if="unjoin">
            <div class="joinrule">
              1.每周日发起打卡活动;<br>
              2.使用1nas即可参与打卡;<br>
              3.每周日结算上次活动奖励;<br>
              4.一周打卡五次即可获取奖励分红;<br>
              5.一周打卡未超过5次者失去分红权利;<br>
              6.每位参与者的币自动进入奖励池，用于坚持成功者的分红奖励;<br> 
            </div>
            <div class="joinBtn" v-if="isSunday" @click="joinMethod">参与打卡</div>
            <div class="waitjoinBtn" v-if="noSunday">周日开放</div>
        </section>
        <section class="section" v-if="joined">
          <div class="biword">自律，给我自由</div>
          <div class="totalNum">总打卡人数: {{totalNum}}</div>
          <div class="signinNum">打卡人数: {{signNum}}</div>
          <div class="signin" @click="signinOp">打卡</div>
        </section>
        <modal v-if="showModal" @close="showModal = false">
            <div class="modal-mask">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <!-- <div class="close" @click="closeLetter"></div> -->
                        <div class="success">{{successWord}}</div>
                    </div>
                </div>
            </div>
        </modal>
        <!-- <modal v-if="showModal1" @close="showModal1 = false">
            <div class="modal-mask1">
                <div class="modal-wrapper1">
                    <div class="modal-container1">
                        <div class="success">{{successWord}}</div>
                    </div>
                </div>
            </div>
        </modal> -->
        <modal v-if="installModel" @close="installModel = false">
            <div class="modal-mask1">
                <div class="modal-wrapper1">
                    <div class="modal-container1">
                      <div class="installtext">星云钱包插件未安装，请先安装<a href="https://github.com/ChengOrangeJu/WebExtensionWallet">星云钱包</a>插件</div>
                    </div>
                </div>
            </div>
        </modal>
    </main>
</template>


<script>
import { $http } from "../../lib/fetch";
// require('../server.js');
import {savePromise, searchPromise} from "../server.js";
export default {
  name: "professlover",
  data() {
    return {
      showModal: false,
      // showModal1: false,
      unjoin: false,
      joined: true,
      isSunday: true,
      noSunday: false,
      installModel: false,
      passport: '',
      password:'',
      loadtext:'请导入钱包',
      isloaded: false,
      totalNum: 0,
      signNum: 0,
      successWord: '打卡成功,继续加油!'
    };
  },
  mounted() {
    // let account = createAccount();
    let dayNum = (new Date()).getDay();
    if(dayNum === 7) {
      this.isSunday = true;
      this.noSunday = false;
    }else {
      this.isSunday = false;
      this.noSunday = true;
    }
    
  },
  methods: {
   
    joinMethod() {
      if(typeof(webExtensionWallet) === "undefined") {
        this.installModel = true;
      }

      console.log('-----joined');
    },
    //签到操作
    signinOp() {
      console.log('=========');
      this.showModal = true;
      setTimeout(() => {
        this.showModal = false;
      },3000)
    },

    previewFiles(event) {
      console.log('66666');
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.onloadend = (evt) => {
        this.passport = evt.target.result;  //获取账户信息

      };
      this.loadtext = file.name;
      this.isloaded = true;
      reader.readAsText(file);

    },
    closeXinfeng() {
      this.showModal1 = false;
    }
  }
};
</script>

<style>
@font-face{
    font-family: 'fangzheng';
    src : url('../font/FangZhengSuXinShiLiuKaiJianTi-1.ttf');
}
.main {
  width: 100%;
}

.section {
  /* border: 1px solid blue; */
  background: url('../assets/main.jpeg') no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -300px;
  margin-left: -200px;
  width: 400px;
  height: 600px;
}
.joinrule {
  position: absolute;
  width: 300px;
  height: 300px;
  word-wrap:break-word;
  /* border: 1px solid red; */
  left: 50%;
  margin-left: -150px;
  top: 60px;
  color: #1C1C1C;
  font-family: 'fangzheng';
  font-size: 20px;
  font-weight: 600;
  text-align: left;
}
.joinBtn {
  position: absolute;
  width: 120px;
  left: 50%;
  margin-left: -60px;
  height: 40px;
  bottom: 100px;
  line-height: 40px;
  text-align: center;
  /* border: 1px solid red; */
  background: url('../assets/button.png') no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  font-family: 'fangzheng';
  font-weight: bolder;
  cursor: pointer;
}
.waitjoinBtn {
   position: absolute;
  width: 120px;
  left: 50%;
  margin-left: -60px;
  height: 40px;
  bottom: 100px;
  line-height: 40px;
  text-align: center;
  /* border: 1px solid red; */
  background: url('../assets/button1.png') no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  font-family: 'fangzheng';
  font-weight: bolder;
  cursor: url('../assets/noclick.png'), auto;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 375px;
    height: 500px;
  margin: 0px auto;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.close {
    width: 35px;
    height: 35px;
    position: absolute;
    top: 10px;
    right: 10px;
    background: url("../assets/close.png") no-repeat center center;
    background-size: cover;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
.close:hover, .close:active {
    background: url("../assets/close1.png") no-repeat center center;
    background-size: cover;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}


.modal-mask1 {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper1 {
  display: table-cell;
  vertical-align: middle;
}

.modal-container1 {
  width: 546px;
  height:350px;
  margin: 0px auto;
  transition: all 0.3s ease;
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.installtext {
  position: absolute;
  width: 600px;
  left: 50%;
  margin-left: -300px;
  height: 100px;
  top: 50%;
  background-color: #2F4F4F;
  margin-top: -50px;
  line-height: 100px;
  text-align: center;
  font-family: 'fangzheng';
  font-weight: bolder;
  color: #FFD700;
  font-size: 24px;
}

.close1 {
  position: absolute;
  top:10px;
  right: 10px;
   width: 35px;
    height: 35px;
    background: url("../assets/close.png") no-repeat center center;
    background-size: cover;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
.close1:hover, .close1:active {
    background: url("../assets/close1.png") no-repeat center center;
    background-size: cover;
    -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}
.biword {
  position: absolute;
  width: 300px;
  height: 50px;
  left: 50%;
  margin-left: -150px;
  top:100px;
  font-family: 'fangzheng';
  font-size: 34px;
  text-align: center;
  font-weight: bolder;
  line-height: 50px;

}
.totalNum {
  position: absolute;
  width: 300px;
  height: 50px;
  left: 50%;
  margin-left: -150px;
  font-family: 'fangzheng';
  top:200px;
  font-size: 24px;
  font-weight: bolder;
  text-align: center;
  line-height: 50px;
}
.signinNum {
  position: absolute;
  width: 300px;
  height: 50px;
  left: 50%;
  margin-left: -150px;
  top:300px;
  font-family: 'fangzheng';
  font-size: 24px;
  font-weight: bolder;
  text-align: center;
  line-height: 50px;
}
.signin {
  position: absolute;
  width: 120px;
  left: 50%;
  margin-left: -60px;
  height: 40px;
  bottom: 100px;
  line-height: 40px;
  text-align: center;
  /* border: 1px solid red; */
  background: url('../assets/button2.png') no-repeat center center;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  font-family: 'fangzheng';
  font-weight: bolder;
  cursor: pointer;
}
.success {
  position: absolute;
  width: 400px;
  left: 50%;
  margin-left: -200px;
  height: 100px;
  top: 50%;
  background-color: #2F4F4F;
  margin-top: -50px;
  line-height: 100px;
  text-align: center;
  font-family: 'fangzheng';
  font-weight: bolder;
  color: #FFD700;
  font-size: 40px;
}

</style>