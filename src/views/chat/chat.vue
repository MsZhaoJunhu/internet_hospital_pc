<template>
    <div class="chat-room">
        <div class="chat-room-par">
            <div class="chat-room-left">
                <div class="chat-info-top">
                    <div>
                        <img :src="this.$store.state.Info.headImage||'../assets/images/userImg.png'" style="width: 66px;border-radius: 50%;" alt="">
                    </div>
                    <div>
                        <p>{{$store.state.Info.realName}}</p>
                        <p>主任医师</p>
                    </div>
                </div>
                <div class="chat-info-bottom">
                    <div :class="activeIndex==0?'active':''" @click="activeIndex=0;patientInfoBoolean=true;patientInfo={};chatUserInfo={};">
                        <span>正在接待</span>
                        <span class="after" v-show="userList.length">{{userList.length}}</span>
                    </div>
                    <div :class="activeIndex==1?'active':''" @click="activeIndex=1;patientInfoBoolean=true;patientInfo={};chatUserInfo={};">
                        <span>待接诊</span>
                        <span class="after" v-show="userList.length">{{userList2.length}}</span>
                    </div>
                </div>
                <div class="chat-user-list">
                    <div v-for="(item,index) in userList" v-show="activeIndex==0" :key="'userList-'+index" :class="index==activePatient?'chating':''" @click="doctorContentPatient(index,item.patientId)">
                        <div>
                            <img :src="item.img" v-show="item.img" alt="">
                            <img src="@/assets/images/perImg.png" v-show="!item.img" alt="">
                        </div>
                        <div>
                            <p>
                                <span>{{item.realName||'暂无'}}</span>&nbsp;&nbsp;
                                <span>{{item.age||'暂无'}}</span>&nbsp;&nbsp;
                                <span>{{item.sex==1?'男':'女'}}</span>
                            </p>
                            <i>{{item.lastMessage||'暂无...'}}</i>
                        </div>
                    </div>
                    <div v-for="(items,key) in userList2" v-show="activeIndex==1" :key="key" :class="key==activePatient?'chating':''" @click="doctorCheckPatient(key,items.patientId)">
                        <div>
                            <img :src="items.img" v-show="items.img" alt="">
                            <img src="@/assets/images/perImg.png" v-show="!items.img" alt="">
                        </div>
                        <div>
                            <p>
                                <span>{{items.realName||'暂无'}}</span>&nbsp;&nbsp;
                                <span>{{items.age||'暂无'}}</span>&nbsp;&nbsp;
                                <span>{{items.sex==1?'男':'女'}}</span>
                            </p>
                            <i>{{items.msg||'暂无...'}}</i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-room-right" v-show="patientInfoBoolean&&activeIndex==0">
                <div class="room-right-top" v-show="patientInfoBoolean&&chatUserInfo.realName">
                    <p>
                        <span>{{chatUserInfo.realName||'暂无'}}</span>
                        <span>{{chatUserInfo.age||'暂无'}}</span>
                        <span>{{chatUserInfo.sex==1?'男':'女'||'暂无'}}</span>
                    </p>
                    <a @click="routerToCF" v-show="interRecord">开处方</a>
                </div>
                <div class="room-msg-list" v-show="patientInfoBoolean&&chatUserInfo.realName">
                    <div class="room-msg-content">
                        <div class="msg-list">
                            <div v-for="(item,i) in msgList" :key="i" :class="item.user=='me'?'mepar':''">
                                <div :class="item.user=='me'?'me':''">
                                    <div>
                                        <img :src="item.img" alt="">
                                    </div>
                                    <div class="item-msg">
                                        <span v-show="item.type==1">{{item.msg}}</span>
                                        <img :src="item.msg" v-show="item.type==2" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="send-msg">
                            <div class="send-msg-functions">
                                <div @click="showEmoji">
                                    <img src="@/assets/images/expression.png" alt="">
                                </div>
                                <label>
                                    <img src="@/assets/images/file.png" alt="">
                                    <input type="file" accept="image/*"  style="display:none;" @change="upload_photo" ref="inputer">
                                </label>
                            </div>
                            <div v-show="fun" class="more_box">
                                <ul class="emoji-list" v-show="is_emoji">
                                    <li @click="emoji($event)">&#x1F600;</li>
                                    <li @click="emoji($event)">&#x1F601;</li>
                                    <li @click="emoji($event)">&#x1F602;</li>
                                    <li @click="emoji($event)">&#x1F603;</li>
                                    <li @click="emoji($event)">&#x1F604;</li>
                                    <li @click="emoji($event)">&#x1F605;</li>
                                    <li @click="emoji($event)">&#x1F606;</li>
                                    <li @click="emoji($event)">&#x1F607;</li>
                                    <li @click="emoji($event)">&#x1F608;</li>
                                    <li @click="emoji($event)">&#x1F609;</li>
                                    <li @click="emoji($event)">&#x1F60A;</li>
                                    <li @click="emoji($event)">&#x1F60B;</li>
                                    <li @click="emoji($event)">&#x1F60C;</li>
                                    <li @click="emoji($event)">&#x1F60D;</li>
                                    <li @click="emoji($event)">&#x1F60E;</li>
                                    <li @click="emoji($event)">&#x1F60F;</li>
                                    <li @click="emoji($event)">&#x1F610;</li>
                                    <li @click="emoji($event)">&#x1F611;</li>
                                    <li @click="emoji($event)">&#x1F612;</li>
                                    <li @click="emoji($event)">&#x1F613;</li>
                                    <li @click="emoji($event)">&#x1F614;</li>
                                    <li @click="emoji($event)">&#x1F615;</li>
                                    <li @click="emoji($event)">&#x1F616;</li>
                                    <li @click="emoji($event)">&#x1F617;</li>
                                    <li @click="emoji($event)">&#x1F618;</li>
                                    <li @click="emoji($event)">&#x1F619;</li>
                                    <li @click="emoji($event)">&#x1F61A;</li>
                                    <li @click="emoji($event)">&#x1F61B;</li>
                                    <li @click="emoji($event)">&#x1F61C;</li>
                                    <li @click="emoji($event)">&#x1F61D;</li>
                                    <li @click="emoji($event)">&#x1F61E;</li>
                                    <li @click="emoji($event)">&#x1F61F;</li>
                                    <li @click="emoji($event)">&#x1F620;</li>
                                    <li @click="emoji($event)">&#x1F621;</li>
                                    <li @click="emoji($event)">&#x1F622;</li>
                                    <li @click="emoji($event)">&#x1F623;</li>
                                    <li @click="emoji($event)">&#x1F624;</li>
                                    <li @click="emoji($event)">&#x1F625;</li>
                                    <li @click="emoji($event)">&#x1F626;</li>
                                    <li @click="emoji($event)">&#x1F627;</li>
                                    <li @click="emoji($event)">&#x1F628;</li>
                                    <li @click="emoji($event)">&#x1F629;</li>
                                    <li @click="emoji($event)">&#x1F62A;</li>
                                    <li @click="emoji($event)">&#x1F62B;</li>
                                    <li @click="emoji($event)">&#x1F62C;</li>
                                    <li @click="emoji($event)">&#x1F62D;</li>
                                    <li @click="emoji($event)">&#x1F62E;</li>
                                    <li @click="emoji($event)">&#x1F62F;</li>
                                    <li @click="emoji($event)">&#x1F630;</li>
                                    <li @click="emoji($event)">&#x1F631;</li>
                                    <li @click="emoji($event)">&#x1F632;</li>
                                    <li @click="emoji($event)">&#x1F633;</li>
                                    <li @click="emoji($event)">&#x1F634;</li>
                                    <li @click="emoji($event)">&#x1F635;</li>
                                    <li @click="emoji($event)">&#x1F636;</li>
                                    <li @click="emoji($event)">&#x1F637;</li>
                                    <li @click="emoji($event)">&#x1F638;</li>
                                    <li @click="emoji($event)">&#x1F639;</li>
                                    <li @click="emoji($event)">&#x1F63A;</li>
                                    <li @click="emoji($event)">&#x1F63B;</li>
                                    <li @click="emoji($event)">&#x1F63C;</li>
                                    <li @click="emoji($event)">&#x1F63D;</li>
                                    <li @click="emoji($event)">&#x1F63E;</li>
                                    <li @click="emoji($event)">&#x1F63F;</li>
                                    <li @click="emoji($event)">&#x1F640;</li>
                                    <li @click="emoji($event)">&#x1F641;</li>
                                    <li @click="emoji($event)">&#x1F642;</li>
                                    <li @click="emoji($event)">&#x1F643;</li>
                                    <li @click="emoji($event)">&#x1F644;</li>
                                    <li @click="emoji($event)">&#x1F916;</li>
                                    <li @click="emoji($event)">&#x1F917;</li>
                                    <li @click="emoji($event)">&#x1F920;</li>
                                    <li @click="emoji($event)">&#x1F921;</li>
                                    <li @click="emoji($event)">&#x1F922;</li>
                                    <li @click="emoji($event)">&#x1F923;</li>
                                    <li @click="emoji($event)">&#x1F924;</li>
                                    <li @click="emoji($event)">&#x1F925;</li>
                                    <li @click="emoji($event)">&#x1F927;</li>
                                    <li @click="emoji($event)">&#x1F928;</li>
                                    <li @click="emoji($event)">&#x1F929;</li>
                                    <li @click="emoji($event)">&#x1F92A;</li>
                                    <li @click="emoji($event)">&#x1F92B;</li>
                                    <li @click="emoji($event)">&#x1F92F;</li>
                                    <li @click="emoji($event)">&#x1F92C;</li>
                                    <li @click="emoji($event)">&#x1F92D;</li>
                                    <li @click="emoji($event)">&#x1F92E;</li>
                                </ul>
                            </div>
                            <textarea v-model="input_content" id="input" @keyup.enter="submit"></textarea>
                            <div class="send-msg-btn">
                                <button @click="submit">发  送</button>
                            </div>
                        </div>
                    </div>
                    <div class="room-msg-info">
                        <div class="room-user-topTitle">
                            <div :class="userTitleIndex==1?'titleActive':''" @click="userTitleIndex=1">病人详情</div>
                            <div :class="userTitleIndex==2?'titleActive':''" @click="userTitleIndex=2">电子病历</div>
                        </div>
                        <div v-show="userTitleIndex==1?true:false" class="msg-info-over">
                            <div class="room-user-name">
                                <span>{{chatUserInfo.realName||'暂无'}}</span>
                                <span>{{chatUserInfo.age||'暂无'}}</span>
                                <span>{{chatUserInfo.sex==1?'男':'女'||'暂无'}}</span>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>病情主诉</span>
                                </p>
                                <p>{{chatUserInfo.illnessDescription||'暂无'}}</p>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>病情照片</span>
                                </p>
                                <div class="room-user-conditionPic">
                                    <div v-for="(itemq,ind) in chatUserInfo.illnessImages" :key="ind">
                                        <img style="height: 100%;" :src="itemq" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="userTitleIndex==2?true:false" class="msg-info-over">
                            <div class="internet-illness">
                                <p>
                                    <span>{{chatUserInfo.realName||'暂无'}}</span>
                                    <span>{{chatUserInfo.age||'暂无'}}</span>
                                    <span>{{chatUserInfo.sex==1?'男':'女'||'暂无'}}</span>
                                </p>
                                <p>身份证号:{{chatUserInfo.idCard}}</p>
                                <p>看诊时间:{{chatUserInfo.startTime||'暂无'}}</p>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>基本信息</span>
                                </p>
                                <div class="user-info-time">
                                    <!-- <el-date-picker
                                    v-model="selectTime"
                                    type="datetime"
                                    disabled
                                    placeholder="就诊时间"> -->
                                    </el-date-picker>
                                    <input type="text" placeholder="科室" v-model="this.$store.state.Info.list[0].deptName" disabled>
                                </div>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>主诉</span>
                                </p>
                                <div class="now-illness">{{chatUserInfo.illnessDescription||'暂无'}}</div>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>现病史</span>
                                </p>
                                <div class="now-illness" :class="prescription?'pointerNone':''">
                                    <textarea cols="30" rows="10" :class="prescription?'pointerNone':''" v-model="nowIllness"></textarea>
                                </div>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>病情照片</span>
                                </p>
                                <div class="room-user-conditionPic">
                                    <div v-for="(itemq,ind) in chatUserInfo.illnessImages" :key="ind">
                                        <img style="height: 100%;" :src="itemq" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>诊断</span>
                                </p>
                                <div class="now-illness" :class="prescription?'pointerNone':''">
                                    <textarea cols="30" rows="10" :class="prescription?'pointerNone':''" v-model="diagnose" placeholder="诊断结果"></textarea>
                                </div>
                            </div>
                            <div class="room-user-condition">
                                <p>
                                    <span>诊疗措施</span>
                                </p>
                                <div class="now-illness">
                                    <textarea cols="30" rows="10" :class="prescription?'pointerNone':''" v-model="treatment" placeholder="诊疗措施"></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="positionBtn" v-show="userTitleIndex==2">
                            <button @click="createdInter" v-show="!prescription">生成电子病历</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-room-right" v-show="!patientInfoBoolean&&activeIndex==1">
                <div class="room-right-top">
                    <p>
                        <span>{{patientInfo.realName}}</span>
                        <span>{{patientInfo.age}}</span>
                        <span>{{patientInfo.sexName}}</span>
                    </p>
                    <p>2020-02-19 10:27</p>
                </div>
                <div class="patient-info-parent">
                    <p>{{patientInfo.illnessDescription}}</p>
                    <div class="patient-info-img">
                        <div v-for="(itemw,inde) in patientInfo.illnessImage" :key="inde">
                            <img :src="itemw"  alt="">
                        </div>
                    </div>
                </div>
                <button @click="connectChat(1,patientInfo.orderNo)">接诊</button>
                <button @click="connectChat(2,patientInfo.orderNo)">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
    data() {
        return {
            activeIndex:0,

            userList:[],

            userList2:[],

            msgList:[],

            input_content:"",

            userTitleIndex:1,

            fun: 0,

            is_emoji: 0,

            ws:null,

            activePatient:-1,

            activePatientId:1,

            patientInfoBoolean:true,

            patientInfo:{},

            paramsDetails:"",

            chatUserInfo:{},

            chatingList:[],

            chatList:[],

            isSend:false,

            // chatUserInfo.startTime
            selectTime:'',

            // this.$store.state.Info.list[0].hospitalName
            selectKS:'',

            ddepartment:[
                {value:"科室"}
            ],

            nowIllness:"",

            diagnose:"",

            treatment:"",

            websocket:"",

            interRecord:false,

            prescription:false,

            indexNumber:1,

        }
    },

    created () {
        const that = this;

        if ("WebSocket" in window){
            // 打开一个 web socket
            // that.ws = new WebSocket(`ws://192.168.199.215/Websocket/D`+that.$store.state.Info.id);
            that.ws = new WebSocket(`ws://122.112.206.233:9528/Websocket/D`+that.$store.state.Info.id);
                
            that.ws.onopen = function(){
                // Web Socket 已连接上，使用 send() 方法发送数据
                that.ws.send(JSON.stringify({
                    groupId:'D'+that.$store.state.Info.id,
                    sendId:'D'+that.$store.state.Info.id,
                    sendType:1,
                    receiveId:'P'+that.activePatientId,
                    receiveType:2,
                    type:'join',
                    content:"医生开始链接患者",
                }));
                console.log("连接成功...");
            };
                
            that.ws.onmessage = that.websocketonmessage;
                
            that.ws.onclose = function (ev) {
                console.log("WebSocket连接关闭");
                that.ws.close();
            }
        }else{
            console.log("您的浏览器不支持 WebSocket!");
        }

        that.getPatientUnderway();
        
        that.findWatingPatientList();

    },

    destroyed: function() {
        this.ws.onclose();
    },

    methods: {
        upload_photo: function(){
            const that = this;

            let inputDOM = that.$refs.inputer;

            let file = inputDOM.files;

            // 上传的图片
            console.log(file)

            // 上传图片接口尚未写
            // this.$post('/doctorShift/getDatePeriod', {
            //     imgUrL:'https://img.ivsky.com/img/tupian/t/201505/18/california-001.jpg'
            // }).then(res => {
            //     console.log(res)
            // })
            
            let httpImg = 'https://img.ivsky.com/img/tupian/t/201505/18/california-001.jpg'

            // 发送消息
            that.ws.send(JSON.stringify({
                    groupId:'D'+that.$store.state.Info.id,      //医生ID
                    sendId:'D'+that.$store.state.Info.id,       //发送者ID
                    // 固定1
                    sendType:1,                                 //发送者属性    1医生2患者
                    receiveId:'P'+that.activePatientId,                            //接收者ID
                    // 固定2
                    receiveType:2,                              //接收者属性    1医生2患者
                    // 根据
                    type:2,                                     //发送消息类型  1文本2图片
                    content:httpImg,                            //内容本体
                })
            )
        },

        refScroll(){
            this.$nextTick(() => {
                var container = document.querySelector('.msg-list')
                container.scrollTop = container.scrollHeight
            })
        },

        emoji(event) {
            let e = event.currentTarget
            this.input_content += e.innerText
            document.getElementById('input').focus()
            this.hide()
        },

        show() {
            this.fun = 1
        },

        showEmoji() {
            if (this.is_emoji == 0) {
                this.show()
                this.is_emoji = 1
            } else {
                this.hide()
            }
        },

        hide() {
            this.fun = 0
            this.is_emoji = 0
        },

        submit() {
            const that = this;

            let msgType = 1;

            if (that.input_content.length <= 0) {
                this.$message.error('消息内容不能为空!!!')
                return false;
            };

            // 判断是否包含图片
            // if(that.input_content){
            //     msgType=2
            // }

            // 发送消息
            that.ws.send(JSON.stringify({
                    groupId:'D'+that.$store.state.Info.id,      //医生ID
                    sendId:'D'+that.$store.state.Info.id,       //发送者ID
                    // 固定1
                    sendType:1,                                 //发送者属性    1医生2患者
                    receiveId:'P'+that.activePatientId,                            //接收者ID
                    // 固定2
                    receiveType:2,                              //接收者属性    1医生2患者
                    type:msgType,      
                    content:that.input_content,                 //内容本体
                })
            )

            that.msgList.push({
                type:msgType,
                user:'me',
                img:require('@/assets/images/userImg2.png'),
            	msg: that.input_content,
            })

            that.input_content = ''
            
            that.refScroll()
        },

        websocketonmessage(e){ //数据接收 
            const that = this;
            const redata = JSON.parse(e.data);
            //注意：长连接我们是后台直接1秒推送一条数据， 
            //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
            //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
            if(redata.type=='return'){
                // if(JSON.parse(redata.content).onlineCheck){
                    console.log('聊天对象在线')
                // }else{
                    // that.$message.error('请检查您的网络或者对方尚未上线!')
                //     that.websocketclose
                //     return ;
                // }
            }

            if(redata.type=='erro'){
                that.$message.error('请检查您的网络!')
            }

            if(redata.type=='permissionError'){
                that.$message.error('请检查您的网络!')
            }

            if(redata.type=='chatDenied'){
                that.$message.error('对方繁忙，暂时无法连接通信!')
            }

            if(redata.type=='offline'){
                that.$message.error('对方尚未上线，暂时无法连接通信!')
            }

            if(redata.type=='chatAccept'){

                const that = this;
                
                // 将患者从待就诊移入就诊中  需要接口  不用做  已用其他代替

                that.findWatingPatientList();
                // that.getPatientUnderway();
            
                that.$get("/patRegisteredUnderway/getPatientUnderway", {
                    hospId:1
                }).then(function(res) {
                    if (res.code == 200) {
                        that.chatingList=res.data
                    } else {
                        that.$message.error({
                            message: res.message,
                        });
                    }
                })
                .catch(function(res) {
                    console.log(res);
                });

            }

            if(redata.type=='complete'){
                
                // 调用接口将患者移入！已完成列表！中  需要接口  优先


                // 调节接口 刷新带就诊和就诊中列表
                that.getPatientUnderway();

            }

            if(redata.sendType==2){
                that.msgList.push({
                    type:redata.type,
                    user:'other',
                    img:require('@/assets/images/perImg.png'),
                    msg: redata.content,
                })
            }

            // if(redata.sendId==`D${that.$store.state.Info.id}`&&redata.sendType==1){
            //     that.msgList.push({
            //         type:redata.type,
            //         user:'me',
            //         img:require('@/assets/images/userImg2.png'),
            //         msg: redata.content,
            //     })
            // }



            that.refScroll()
        },

        websocketclose(e){ //关闭
            console.log("connection closed ( webscoket已经关闭)"); 
        },

        doctorContentPatient(i,id){
            const that = this;
            that.activePatient = i;
            that.activePatientId = id;
            that.patientInfoBoolean=true;
            that.ws.send(JSON.stringify({
                    groupId:'D'+that.$store.state.Info.id,     //医生ID
                    sendId:'D'+that.$store.state.Info.id,      //发送者ID
                    // 固定1
                    sendType:1,                                //发送者属性    1医生2患者
                    // this.activePatientId
                    receiveId:'P'+that.activePatientId,        //接收者ID
                    // 固定2
                    receiveType:2,                             //接收者属性    1医生2患者
                    type:'startTalk',                          //发送消息类型  1文本2图片
                    content:'点击了患者头像',                   //内容本体
                })
            )

            that.chatUserInfo=that.chatingList[i]

            console.log(that.chatUserInfo)

            that.$get(`/users/patCaseHistory/findByOrderNo/${that.chatingList[i].orderNo}`).then(function(res) {
                if(!(res.data==null)&&res.data.currentMedicalHistory){
                    that.nowIllness=res.data.currentMedicalHistory;
                    that.diagnose=res.data.preliminaryDiagnosis;
                    that.treatment=res.data.curePlan;
                    that.prescription=true
                    if(res.data.hasPrescript==1){
                        that.interRecord=false
                    }else{
                        that.interRecord=true
                    }
                }else{
                    that.nowIllness='';
                    that.diagnose='';
                    that.treatment='';
                    that.interRecord=false
                    that.prescription=false
                }
            })
            .catch(function(res) {
                console.log(res);
            });

            that.msgList=[]

            that.$get(`/patDoctorMessage/getHistoryMeseeage`,{
                index:that.indexNumber,
                receiverId:id,
                sendId:that.$store.state.Info.id
            }).then(function(res) {
                for(var i=0;i<res.data.length;i++){
                    that.msgList.unshift({
                        type:res.data[i].msgType,
                        user:res.data[i].senderId!=that.$store.state.Info.id?'other':'me',
                        img:res.data[i].senderId!=that.$store.state.Info.id?require('@/assets/images/perImg.png'):require('@/assets/images/userImg2.png'),
                        msg: res.data[i].content,
                    })
                }
                that.refScroll()
            })
            .catch(function(res) {
                console.log(res);
            });




        },

        doctorCheckPatient(i,id){
            const that = this;
            
            that.patientInfoBoolean=false;

            that.patientInfo=that.chatList[i]
            
        },

        connectChat(i,id){
            const that = this;
            that.$get("/patRegisteredWatingDiagnosis/watingList/Choose", {
                chooseType:i,
                orderNo:id
            }).then(function(res) {
                if (res.code == 200) {

                    that.getPatientUnderway();
                    
                    that.findWatingPatientList();

                } else {
                    that.$message.error({
                        message: res.message,
                    });
                }
            })
            .catch(function(res) {
                console.log(res);
            });

        },

        findWatingPatientList(){
            const that = this;
            that.$get("/patRegisteredWatingDiagnosis/findWatingPatientList", {
                hospId:1
            }).then(function(res) {
                if (res.code == 200) {
                    that.userList2=that.chatList=res.data
                    // that.$store.commit("indexNumber/SET_STATE", {'e':res.data.length});
                } else {
                    that.$message.error({
                        message: res.message,
                    });
                }
            })
            .catch(function(res) {
                console.log(res);
            });
        },

        getPatientUnderway(){
            const that = this;

            that.$get("/patRegisteredUnderway/getPatientUnderwayWithMessage", {
                hospId:1
            }).then(function(res) {
                if (res.code == 200) {

                    that.userList=that.chatingList=res.data

                    that.paramsDetails=that.$route.params
                    console.log('开始查询接受患者的订单号')
                    for(var i = 0; i < that.userList.length; i++){
                        if(that.userList[i].orderNo==that.paramsDetails.orderNo){
                            console.log('找到患者的订单号并且触发点击患者头像事件')
                            that.doctorContentPatient(i,that.paramsDetails.id);
                        }
                    }
                } else {
                    that.$message.error({
                        message: res.message,
                    });
                }
            })
            .catch(function(res) {
                console.log(res);
            });
        },
    
        createdInter(){
            const that = this;
            if(that.nowIllness==''||that.diagnose==""||that.treatment==""){
                that.$message.error('您尚有必要数据未填写!')
                return ;
            }

            that.$post("/users/patient/createCaseHistory", {
                orderNo:that.chatUserInfo.orderNo,
                chiefComplaint:that.chatUserInfo.illnessDescription,
                patientId:that.chatUserInfo.patientId,
                currentMedicalHistory:that.nowIllness,
                preliminaryDiagnosis:that.diagnose,
                curePlan:that.treatment,
                departmentName:this.$store.state.Info.list[0].deptName,
                hospId:1,
            }).then(function(res) {
                if (res.code == 200) {
                    that.$message.success('生成电子病历成功!')
                    that.interRecord=true;
                    that.prescription=true;
                } else {
                    that.$message.error({
                        message: res.message,
                    });
                }
            })
            .catch(function(res) {
                console.log(res);
            });
        },

        routerToCF(){
            const that = this
            that.$router.push({
                name:"openPrescription",
                query: {
                    obj: that.chatUserInfo,
                    details:[],
                }
            })
        }
    },  
}
</script>
<style scoped>
    .chat-room{
        padding: 20px 0 100px 0;
    }

    .chat-room-par{
        width: 100%;
        height: 800px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        box-sizing: border-box;
        border: 1px solid #eff0f2;
        border-radius: 5px;
        overflow: hidden;
    }

    .chat-room-left{
        width: 245px;
        height: 100%;
    }

    .chat-info-top{
        width: 100%;
        height: 107px;
        background: #5a75f6;
        padding: 19px 0 22px 17px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .chat-info-top>div:last-child{
        margin-left: 12px;
        color: #fff;
        font-size: 16px;
    }

    .chat-info-top>div:last-child>p:last-child{
        margin-top: 11px;
    }

    .chat-info-bottom{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-right: 1px solid #eff0f2;
    }

    .chat-info-bottom div{
        width: 50%;
        height: 57px;
        background: #fbfbfb;
        text-align: center;
        line-height: 56px;
        color: #898888;
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
        border-right: 1px solid #f2f2f2;
        position: relative;
    }

    .chat-info-bottom div .after{
        position: absolute;
        top: 5px;
        right: 26px;
        display: block;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        line-height: 15px;
        font-size: 8px;
        background: #46cf98;
        color: #fff;
    }

    .chat-info-bottom>div:last-child{
        border-right: 0;
    }

    .chat-info-bottom div.active{
        background: #ffffff;
        color: #5a75f6;
        border-bottom: 0;
    }

    .chat-info-bottom div.active .after{
        display: none;
    }

    .chat-user-list{
        border-right: 1px solid #eff0f2;
        box-sizing: border-box;
        background: #fff;
        height: calc(100% - 57px - 107px);
        overflow-y: auto;
    }

    .chat-user-list>div{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 17px 0 14px 11px;
        background: #fff;
    }

    .chat-user-list>div:hover{
        background: #f2f2f2;
        cursor: pointer;
    }

    .chat-user-list>div.chating{
        background: #f2f2f2;
    }

    .chat-user-list>div>div:first-child{
        margin-right: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .chat-user-list>div>div:last-child{
        width: 142px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
    }

    .chat-user-list i{
        font-style: normal;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }

    .chat-user-list div p span{
        font-size: 16px;
        color: #353535;
    }

    .chat-user-list div i{
        font-size: 14px;
        color: #898888;
        margin-top: 10px;
    }

    .chat-room-right{
        width: calc(100% - 245px);
        height: 100%;
        background: #fff;
    }

    .room-right-top{
        height: 68px;
        background: #fcfcfc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 29px 0 27px;
        border-bottom: 1px solid #eff0f2;
    }

    .room-right-top p span{
        font-size: 18px;
        color: #353535;
    }

    .room-right-top p span+span{
        margin-left: 22px;
    }

    .room-right-top a{
        display: block;
        width: 98px;
        height: 33px;
        line-height: 33px;
        border-radius: 33px;
        text-align: center;
        background: #ff5050;
        color: #fff;
    }

    .room-msg-list{
        height: 729px;
        display: flex;
        justify-content: flex-start;
    }

    .room-msg-content{
        width: 661px;
    }
    
    .room-msg-info{
        width: 292px;
        height: 100%;
        border-left: 1px solid #eff0f2;
        box-sizing: border-box;
    }

    .msg-list{
        height: 608px;
        box-sizing: border-box;
        border-bottom: 1px solid #eff0f2;
        padding: 30px 30px 8px 30px;
    }

    /* 设置滚动条的样式 */
    .msg-list::-webkit-scrollbar ,
    .chat-user-list::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .msg-list::-webkit-scrollbar-track ,
    .chat-user-list::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .msg-list::-webkit-scrollbar-thumb ,
    .chat-user-list::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgb(95, 95, 95);
        box-shadow: 8px 0 0 rgb(95, 95, 95) inset;
    }

    .msg-list::-webkit-scrollbar-thumb:hover ,
    .chat-user-list::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 rgb(95, 95, 95) inset;
        border-color: rgb(95, 95, 95);
    }

    .msg-list::-webkit-scrollbar-thumb:window-inactive ,
    .chat-user-list::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .msg-list::-webkit-scrollbar ,
    .chat-user-list::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .msg-list:hover::-webkit-scrollbar ,
    .chat-user-list:hover::-webkit-scrollbar {
        width: 5px;
    }

    .msg-list::-webkit-scrollbar-thumb ,
    .chat-user-list::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgb(231, 231, 231);
        box-shadow: 5px 0 0 rgb(231, 231, 231) inset;
    } 

    .msg-list  ,
    .chat-user-list{
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .msg-list>div>div{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 48px;
        width: 70%;
    }

    .msg-list>div>div>div:first-child{
        transform: translateY(-7px);
    }

    .msg-list .mepar{
        display: flex;
        justify-content: flex-end;
    }

    .msg-list div.me{
        flex-direction: row-reverse;
    }

    .item-msg{
        background: #dce1f7;
        padding: 16px 22px;
        line-height: 24px;
        font-size: 14px;
        border-radius: 7px;
        border-top-left-radius: 0;
        margin-left: 15px;
        white-space: pre-wrap;
        max-width: 80%;
    }

    .item-msg img{
        width: 100%;
    }


    .me .item-msg{
        border-radius: 7px;
        border-top-right-radius: 0;
        margin-left: 0;
        margin-right: 15px;
    }

    .send-msg{
        height: 121px;
        padding: 15px 25px;
        box-sizing: border-box;
        position: relative;
    }

    .send-msg-functions{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .send-msg-functions div+label{
        margin-left: 18px;
    }

    .send-msg-btn{
        position: absolute;
        z-index: 2;
        right: 20px;
        bottom: 20px;
    }

    .send-msg-btn button{
        width: 85px;
        height: 35px;
        border-radius: 5px;
        background: #5a75f6;
        color: #fff;
        border: 0;
        white-space: pre;
    }

    .send-msg textarea{
        width: 100%;
        box-sizing: border-box;
        border: 0;
        height: calc(100% - 24px);
        resize: none;
        outline: none;
        padding: 4px;
        color: #353535;
        line-height: 22px;
    }

    /* 设置滚动条的样式 */
    .send-msg textarea::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .send-msg textarea::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .send-msg textarea::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgb(95, 95, 95);
        box-shadow: 8px 0 0 rgb(95, 95, 95) inset;
    }

    .send-msg textarea::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 rgb(95, 95, 95) inset;
        border-color: rgb(95, 95, 95);
    }

    .send-msg textarea::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .send-msg textarea::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .send-msg textarea:hover::-webkit-scrollbar {
        width: 5px;
    }

    .send-msg textarea::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgb(231, 231, 231);
        box-shadow: 5px 0 0 rgb(231, 231, 231) inset;
    } 

    .send-msg textarea {
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .room-user-topTitle{
        display: flex;
    }

    .room-user-topTitle div{
        width: 50%;
        height: 47px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-top: 3px solid #fcfcfc;
        background: #fcfcfc;
        border-bottom: 1px solid #eff0f2;
        font-size: 16px;
        color: #5a5a5a;
    }

    .room-user-topTitle div+div{
        border-left: 1px solid #eff0f2;
    }

    .room-user-topTitle div.titleActive{
        border-top-color: #5a75f6;
        color: #5a75f6;
        background: #fff;
        border-bottom-color: #fff;
    }

    .room-user-name{
        width: 100%;
        height: 60px;
        padding-left: 18px;
        display: flex;
        align-items: center;
        font-size: 16px;
        box-sizing: border-box;
        color: #353535;
        border-bottom: 1px solid #eff0f2;
    }

    .room-user-name span+span,.internet-illness span+span{
        margin-left: 22px;
    }

    .room-user-condition{
        padding: 30px 20px 0 20px;
    }

    .room-user-condition .now-illness textarea{
        width: 100%;
        height: auto;
        border: 0;
        resize: none;
        background: none;
    }

    .room-user-condition p span{
        display: inline-block;
        padding-bottom: 16px;
        border-bottom: 2px solid #5a75f6;

    }

    .room-user-condition p+p{
        margin-top: 20px;
        font-size: 13px;
        color: #999999;
        line-height: 22px;
    }

    .room-user-conditionPic{
        display: flex;
        flex-wrap: wrap;
        margin-top: 28px;
    }

    .room-user-conditionPic div{
        width: 50%;
        height: 106px;
        display: flex;
        justify-content: center;
        align-items: flex-start;
    }

    .now-illness{
        padding: 18px 6px 23px 11px;
        border: 1px solid #e7e7e7;
        box-sizing: border-box;
        margin-top: 23px;
        font-size: 14px;
        color: #999999;
    }

    .internet-illness{
        width: 100%;
        padding: 25px 0 25px 18px;
        font-size: 16px;
        box-sizing: border-box;
        color: #353535;
        border-bottom: 1px solid #eff0f2;
    }

    .internet-illness p+p{
        margin-top: 15px;
    }

    .msg-info-over>div{
        width: 100%;
        box-sizing: border-box;
    }

    /* 设置滚动条的样式 */
    .msg-info-over::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .msg-info-over::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .msg-info-over::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgba(245, 27, 27, 0);
        box-shadow: 8px 0 0 green inset;
    }

    .msg-info-over::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 rgb(138, 138, 138) inset;
    }

    .msg-info-over::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .msg-info-over::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .msg-info-over:hover::-webkit-scrollbar {
        width: 10px;
    }

    .msg-info-over::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgba(0,0,0,0);
        box-shadow: 10px 0 0 rgb(216, 216, 216) inset;
    } 

    .msg-info-over {
        height: calc(100% - 51px - 60px);
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .more_box{
        position: absolute;
        top: -200px;
        left: -1px;
        background: #fff;
    }

    .emoji-list {
		width: 500px;
		display: flex;
		flex-wrap: wrap;
		height: 200px;
		overflow-y: auto;
		border: 1px solid rgba(0, 0, 0, .1);
		padding: 10px;
		padding-right: 0;
		box-sizing: border-box;
	}

	.emoji-list li {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		font-size: 20px;
	}


	/*滚动条样式*/
	.emoji-list::-webkit-scrollbar,
	#chat_box::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 4px;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 4px;
	}

	.emoji-list::-webkit-scrollbar-thumb,
	#chat_box::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		background: rgba(0, 0, 0, 0.2);
	}

	.emoji-list::-webkit-scrollbar-track,
	#chat_box::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
		-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0;
		background: rgba(0, 0, 0, 0.1);
	}

    .patient-info-parent{
        padding: 15px 29px 47px 27px;
    }

    .patient-info-parent p{
        color: #848484;
    }

    .patient-info-img{
        margin-top: 38px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .patient-info-img div{
        width: calc(100%/4);
        height: 160px;
    }

    .patient-info-img div img{
        height: 100%;
    }

    .patient-info-img div:nth-child(n+5){
        margin-top: 16px;
    }

    .patient-info-parent+button{
        margin-left: 27px;
        width: 128px;
        height: 35px;
        color: #fff;
        background: #5a75f6;
        border: 0;
        border-radius: 35px;
        cursor: pointer;
    }

    .patient-info-parent+button+button{
        margin-left: 27px;
        width: 128px;
        height: 35px;
        color: #666;
        background: #eaeaea;
        border: 0;
        border-radius: 35px;
        cursor: pointer;
    }

    .pointerNone{
        pointer-events: none;

        cursor: default;

        opacity: 0.6;
    }

    .user-info-time{
        margin-top: 9px;
    }

    .user-info-time /deep/ .el-input{
        width: 244px;
        height: 40px;
    }

    .user-info-time /deep/ input{
        width: 244px;
        height: 40px;
        border: 1px solid #d1d1d1;
        border-radius: 0;
    }
    
    .user-info-time input{
        margin-top: 7px;
        background: none;
        box-sizing: border-box;
        padding-left: 9px;
    }

    .positionBtn{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .positionBtn button{
        width: 151px;
        height: 33px;
        font-size: 16px;
        color: #fff;
        background: #38bff7;
        border-radius: 33px;
        border: 0;
        cursor: pointer;
        
    }

</style>