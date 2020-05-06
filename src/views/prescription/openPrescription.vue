<template>
    <div class="open-prescription-parent">
        <div class="open-prescription-left">
            <div class="more-menu">
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="selectMenu" :unique-opened="true">
                    <el-submenu index="1">
                        <template slot="title">
                            <div class="menu-icon">
                                <!-- <img src="@/assets/images/userSetting.png" alt=""> -->
                            </div>
                            <span>西成药</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                心血管系统类药物
                            </el-menu-item>
                            <el-menu-item index="1-3">
                                血液系统类药物
                            </el-menu-item>
                            <el-menu-item index="1-4">
                                呼吸系统类药物
                            </el-menu-item>
                            <el-menu-item index="1-5">
                                消化系统类药物
                            </el-menu-item>
                            <el-menu-item index="1-6">
                                泌尿系统类药物
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <div class="menu-icon">
                                <!-- <img src="@/assets/images/userSetting.png" alt=""> -->
                            </div>
                            <span>中成药</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                解表中成药
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                清热中成药
                            </el-menu-item>
                            <el-menu-item index="2-3">
                                温里中成药
                            </el-menu-item>
                            <el-menu-item index="2-4">
                                理气中成药
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <div class="menu-icon">
                                <!-- <img src="@/assets/images/userSetting.png" alt=""> -->
                            </div>
                            <span>中草药</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="3-3">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="3-4">
                                抗感染类药物
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <div class="menu-icon">
                                <!-- <img src="@/assets/images/userSetting.png" alt=""> -->
                            </div>
                            <span>中药配方</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="4-1">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="4-2">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="4-3">
                                抗感染类药物
                            </el-menu-item>
                            <el-menu-item index="4-4">
                                抗感染类药物
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="open-prescription-right">
            <div class="prescription-details-top" style="pointer-events:none;">
                <span>患者信息</span>
                <input class="fill-search-name" type="text" v-model="paramsMe.realName" placeholder="请输入姓名">
                <div class="select-search-gender">
                    <span>性别:</span>
                    <el-radio v-model="radio" label="1">男</el-radio>
                    <el-radio v-model="radio" label="0">女</el-radio>
                </div>
                <input class="fill-search-name" type="text" v-model="paramsMe.age" placeholder="请输入年龄">
                <input class="fill-search-name" type="text" v-model="paramsMe.idCard" placeholder="请输入身份证号">
                <button class="create-patient" @click="createPatient">新 建 患 者</button>
            </div>
            <div class="prescription-details-bottom">
                <div class="details-bottom-left">
                    <div class="search-medicine">
                        <input type="text" v-model="searchValue" placeholder="请输入您要搜索的药品名称">
                        <button @click="search">搜 索</button>
                    </div>
                    <div class="search-medicine-name">
                        <table>
                            <tr class="search-medicine-title">
                                <td class="medicine-name">名称</td>
                                <td class="medicine-name-pro">商品名</td>
                                <td class="medicine-type">类别</td>
                                <td class="medicine-model">剂型</td>
                                <td class="medicine-packing">包装数量</td>
                                <td class="medicine-packing-company">包装单位</td>
                                <td class="medicine-content">含量</td>
                                <td class="medicine-content-company">含量单位</td>
                                <td class="medicine-capacity">容量</td>
                                <td class="medicine-capacity-company">容量单位</td>
                            </tr>
                        </table>
                        <table class="table-overflow">
                            <tr v-for="(item,i) in medicine" :key="i" @click="chooseDrugs(item)">
                                <td class="medicine-name">{{item.sysDrugCommonName||'暂无'}}</td>
                                <td class="medicine-name-pro">{{item.sysDrugName||'暂无'}}</td>
                                <td class="medicine-type">{{item.sysDrugTypeCode||'暂无'}}</td>
                                <td class="medicine-model">{{item.dosageForm||'暂无'}}</td>
                                <td class="medicine-packing">{{item.packingQuantity||'暂无'}}</td>
                                <td class="medicine-packing-company">{{item.packingUnit||'暂无'}}</td>
                                <td class="medicine-content">{{item.content||'暂无'}}</td>
                                <td class="medicine-content-company">{{item.contentUnit||'暂无'}}</td>
                                <td class="medicine-capacity">{{item.capacity||'暂无'}}</td>
                                <td class="medicine-capacity-company">{{item.capacityUnit||'暂无'}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="search-medicine-details">
                        <table>
                            <tr class="details-title">
                                <td class="details-type">类别</td>
                                <td class="details-content">处方内容</td>
                                <td class="details-number">数量</td>
                                <td class="details-volume">单量</td>
                                <td class="details-implement">执行科室</td>
                                <td class="details-usage">用法</td>
                                <td class="details-frequency">执行频次</td>
                                <td class="details-entrust">医生嘱托</td>
                            </tr>
                        </table>
                        <table class="table-overflow table-secend">
                            <tr v-for="(item,i) in details" :key="i">
                                <td class="details-type">{{item.type}}</td>
                                <td class="details-content">{{item.temporaryContent}}</td>
                                <td class="details-number">{{item.drugNumber}}</td>
                                <td class="details-volume">{{item.temporaryVolume}}</td>
                                <td class="details-implement">{{item.implement}}</td>
                                <td class="details-usage">{{item.drugUsage}}</td>
                                <td class="details-frequency">{{item.temporaryFrequency}}</td>
                                <td class="details-entrust">{{item.exhort}}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="search-medicine-btns">
                        <button @click="makeSure">确 认</button>
                        <button @click="closeVue">关 闭</button>
                    </div>
                </div>
                <div class="details-bottom-right">
                    <div>
                        <input type="text" v-model="temporaryType" placeholder="类别" disabled>
                    </div>
                    <div>
                        <input type="text" v-model="temporaryImplement" placeholder="执行科室" disabled>
                    </div>
                    <div>
                        <input type="text" v-model="temporaryContent" placeholder="药品名" disabled>
                    </div>
                    <div>
                        <input type="text" v-model="temporaryFrequency" placeholder="频次">
                    </div>
                    <div>
                        <input type="text" v-model="temporaryVolume" placeholder="单次用量">
                    </div>
                    <div>
                        <input type="number" v-model="temporaryNumber" placeholder="药品总数量">
                    </div>
                    <div>
                        <input type="text" v-model="temporaryUsage" placeholder="用法">
                    </div>
                    <div>
                        <input type="text" v-model="temporaryEntrust" placeholder="医生嘱托">
                    </div>
                    <div style="display: none;">
                        <input type="text" v-model="value" placeholder="医生嘱托">
                    </div>
                    <div class="details-bottom-btn">
                        <button @click="sureDrugs">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            radio:"",

            medicine:[],

            temporaryStorage:false,

            temporaryType:"",

            temporaryImplement:"",

            temporaryContent:"",

            temporaryFrequency:"",

            temporaryVolume:"",

            temporaryNumber:"",

            temporaryUsage:"",

            temporaryEntrust:"",

            id:"",

            details:[],

            searchValue:"",

            paramsMe:"",

            value:"",

        }
    },

    mounted () {
        this.paramsMe = this.$route.query.obj
        this.radio = this.$route.query.obj.sex+''
        this.details=this.$route.query.details||[]

        
    },

    methods: {
        
        selectMenu(k) {
            
        },

        createPatient(){
            console.log('点击了新建患者')
        },

        makeSure(){
            const that = this
            if(that.details.length>0){
                that.$router.push({
                    name:'details',
                    query: {
                        obj: that.paramsMe,
                        detail:that.details
                    }}
                )
            }else{
                that.$message.error('您尚未选择任何药物不能开具处方!')
            }
        },

        chooseDrugs(item){
            console.log(item)
            this.temporaryType="尚未有类别";
            this.temporaryImplement=this.$store.state.Info.list[0].deptName;
            this.temporaryContent=item.sysDrugCommonName;
            this.temporaryFrequency='';
            this.temporaryVolume='';
            this.temporaryNumber='';
            this.temporaryUsage='';
            this.temporaryEntrust='';
            this.id=item.sysDrugId;
            this.value=item.packingUnit;
        },

        sureDrugs(){
            if(this.temporaryType==''||this.temporaryImplement==''||this.temporaryContent==''||this.temporaryFrequency==''||this.temporaryVolume==''||this.temporaryNumber==''||this.temporaryUsage==''||this.temporaryEntrust==''){
                this.$message.error('您尚未填写完必要信息!请填写完之后再试!')
                return ;
            }else{
                this.details.push({
                    type:this.temporaryType,
                    implement:this.temporaryImplement,
                    drugId:this.id,
                    temporaryContent:this.temporaryContent,
                    drugExplain:this.temporaryFrequency+''+this.temporaryVolume,
                    temporaryFrequency:this.temporaryFrequency,
                    temporaryVolume:this.temporaryVolume,
                    drugUsage:this.temporaryUsage,
                    drugNumber:this.temporaryNumber,
                    exhort:this.temporaryEntrust,
                    value:this.value
                })
                this.temporaryType="";
                this.temporaryImplement='';
                this.temporaryContent='';
                this.temporaryFrequency='';
                this.temporaryVolume='';
                this.temporaryNumber='';
                this.temporaryUsage='';
                this.temporaryEntrust='';
                this.value='';

            }
        },

        closeVue(){
            history.back(-1)
        },

        getScroll(event) {
            // 滚动条距离底部的距离scrollBottom
            let scrollBottom =
                event.target.scrollHeight -
                event.target.scrollTop -
                event.target.clientHeight;
            // if (this.finished && scrollBottom < 40) {
            //  操作
            // }
        },

        search(){
            const that = this;
            that.$get("sysConfDrug/findDrugBycondition",{
                condition:that.searchValue
            }).then(function(res) {
                console.log(res)
                that.medicine=res.data
            })
            .catch(function(res) {
                // 请求失败处理
                console.log(res);
            });
        },
    }
}
</script>
<style scoped>
    .open-prescription-parent{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 21px 0 30px 0;
        height: 770px;
    }

    .open-prescription-left{
        width: 157px;
        height: 770px;
        background: #fff;
    }

    .more-menu{
        /* max-height: 450px; */
        overflow: auto;
        height: 770px;
    }

    /* 设置滚动条的样式 */
    .more-menu::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .more-menu::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .more-menu::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgba(0, 0, 0, 0);
        box-shadow: 8px 0 0 green inset;
    }

    .more-menu::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 #666 inset;
    }

    .more-menu::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .more-menu::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .more-menu:hover::-webkit-scrollbar {
        width: 10px;
    }

    .more-menu::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgba(131, 131, 131, 0);
        box-shadow: 10px 0 0 rgb(194, 194, 194) inset;
    } 

    .more-menu {
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .more-menu {
        /* margin-left: calc(100vw - 100%); */
    }

    .more-menu /deep/ .el-menu-vertical-demo{
        border: 0;
    }

    .more-menu /deep/ .el-menu-item{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
    }

    .more-menu /deep/ .el-menu-item.is-active{
        background: #afb4d0;
        color: #ffffff;
    }

    .more-menu /deep/ .el-submenu__title{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .more-menu /deep/ .el-menu-item-group ul{
        background: #f9fafe;
    }

    .more-menu /deep/ .el-menu-item-group ul li{
        min-width: 157px;
        width: 100%;
        padding: 0 0 0 26px !important;
        box-sizing: border-box;
    }

    .more-menu /deep/ .el-menu-item-group__title{
        display: none;
    }

    .open-prescription-right{
        width: 1039px;
        height: 770px;
    }

    .prescription-details-top{
        height: 58px;
        margin-bottom: 4px;
        padding: 0 22px;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #fff;
    }

    .prescription-details-top span{
        color: #5a75f6;
        margin-right: 8px;
        font-size:18px;
    }

    .fill-search-name{
        width: 141px;
        height: 36px;
        box-sizing: border-box;
        border:1px solid #e6e6e6;
        padding-left: 12px;
        color: #5a5a5a;
        margin-right: 17px;
        outline: none;
    }

    .select-search-gender{
        margin-right: 23px;
    }

    .select-search-gender span{
        font-size: 14px;
        color: #5a5a5a;
        margin-right: 5px;
    }

    .select-search-gender /deep/ span+.el-radio{
        margin-right: 9px;
    }

    .select-search-gender /deep/ .el-radio__label{
        padding-left: 7px;
    }

    .fill-search-name+.fill-search-name{
        margin-left: 2px;
        width: 252px;
    }

    .create-patient{
        margin-left: 33px;
        width: 152px;
        height: 39px;
        border-radius: 39px;
        border: 0;
        background: #5d76f7;
        color: #fff;
        cursor: pointer;
        outline: none;
        display: none;
    }

    .prescription-details-bottom{
        height: 708px;
        padding: 0 14px 0 24px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        background: #fff;
    }

    .details-bottom-left{
        width: 814px;
        height: 100%;
        padding-top: 22px;
        box-sizing: border-box;
        border-right: 1px solid #e9ebf5;
    }   

    .search-medicine{
        margin-bottom: 20px;
    }

    .search-medicine input{
        width: 624px;
        height: 45px;
        box-sizing: border-box;
        padding-left: 18px;
        border: 1px solid #e6e6e6;
        border-radius: 5px;
        outline: none;
        margin-right: 8px;
    }

    .search-medicine button{
        width:137px;
        height: 45px;
        background: #5a75f6;
        border: 0;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }

    .search-medicine-name table{
        /*设置相邻单元格的边框间的距离*/
        border-spacing: 0;
        /*表格设置合并边框模型*/
        border-collapse: collapse;
        border: 1px solid #f4f5fa;
        border-top: 0;
    }

    .search-medicine-name td{
        text-align: center;
        height: 50px;
        font-size: 14px;
        color: #5a5a5a;
    }

    .search-medicine-name tr:nth-child(odd){
        background: #f8f8f8;
    }
    
    .search-medicine-title{
        background: #f4f5fa !important;
    }

    .search-medicine-title td{
        color: #414d86;
    }

    .medicine-name{
        width: 110px;
    }

    .medicine-name-pro{
        width: 97px;
    }

    .medicine-type{
        width: 58px
    }

    .medicine-model{
        width: 62px;
    }

    .medicine-packing{
        width: 78px;
    }

    .medicine-packing-company{
        width: 85px;
    }

    .medicine-content{
        width: 57px;
    }

    .medicine-content-company{
        width: 83px;
    }

    .medicine-capacity{
        width: 55px;
    }

    .medicine-capacity-company{
        width: 86px;
    }

    .search-medicine-details{
        margin-top: 13px;
    }

    .search-medicine-details table{
        /*设置相邻单元格的边框间的距离*/
        border-spacing: 0;
        /*表格设置合并边框模型*/
        border-collapse: collapse;
        border: 1px solid #f4f5fa;
        border-top: 0;
    }

    .search-medicine-details td{
        font-size: 14px;
        color: #5a5a5a;
        height: 50px;
        text-align: center;
    }

    .details-title td{
        background: #f4f5fa !important;
        color: #414d86;
    }
    
    .search-medicine-details tr:nth-child(odd){
        background: #f8f8f8;
    }

    .details-type{
        width: 106px;
    }    

    .details-content{
        width: 138px;
    }
    
    .details-number{
        width: 72px;
    }

    .details-volume{
        width: 63px;
    }

    .details-implement{
        width: 96px;
    }

    .details-usage{
        width: 63px;
    }

    .details-frequency{
        width: 94px;
    }

    .details-entrust{
        width: 139px;
    }

    .table-overflow{
        display: block;
        width: 772px;
        height: 253px;
        overflow-y: auto;
    }

    /* 设置滚动条的样式 */
    .table-overflow::-webkit-scrollbar {
        width: 10px;
    }

    /* 滚动槽 */
    .table-overflow::-webkit-scrollbar-track {
        border-radius: 8px;
    }

    /* 滚动条滑块 */
    .table-overflow::-webkit-scrollbar-thumb {
        border-radius: 8px;
        border: 2px solid rgba(0, 0, 0, 0);
        box-shadow: 8px 0 0 green inset;
    }

    .table-overflow::-webkit-scrollbar-thumb:hover {
        box-shadow: 8px 0 0 #666 inset;
    }

    .table-overflow::-webkit-scrollbar-thumb:window-inactive {
        display: none;
    }

    .table-overflow::-webkit-scrollbar {
        width: 0px;
        height: 0px;
    }

    .table-overflow:hover::-webkit-scrollbar {
        width: 10px;
    }

    .table-overflow::-webkit-scrollbar-thumb {
        border-radius: 10px;
        border: 2px solid rgba(131, 131, 131, 0);
        box-shadow: 10px 0 0 rgb(194, 194, 194) inset;
    } 

    .table-overflow {
        overflow-y: overlay;
        word-wrap: break-word;
    }

    .table-overflow {
        /* margin-left: calc(100vw - 100%); */
    }

    .search-medicine-btns{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 45px;
    }
    
    .search-medicine-btns button{
        width: 152px;
        height: 39px;
        color: #fff;
        background: #0ae5c0;
        border: 0;
        border-radius: 39px;
        cursor: pointer;
    }
    .search-medicine-btns button:first-child{
        background: #53bff6;
        margin-right: 39px;
    }

    .table-secend{
        width: 772px;
        height: 150px;
    }
    
    .details-bottom-right{
        width: 211px;
        height: 100%;
        padding: 22px 0 0 14px;
        box-sizing: border-box;
    } 

    .details-bottom-right div{
        width: 100%;
        height: 36px;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
        padding: 0 13px;
        color: #5a5a5a;
        font-size: 14px;
        line-height: 36px;
    }
    
    .details-bottom-right div+div{
        margin-top: 11px;
    }

    .details-bottom-right input{
        outline: none;
        border: 0;
        background: none;
    }

    .details-bottom-right .details-bottom-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0;
        padding: 0;
    }

    .details-bottom-btn button{
        width: 100px;
        height: 30px;
        border-radius: 30px;
        border: 0;
        background: #53bff6;
        color: #fff;
        cursor: pointer;
    }

    input[type='number']{-moz-appearance:textfield;}
　　input[type=number]::-webkit-inner-spin-button,
　　input[type=number]::-webkit-outer-spin-button {-webkit-appearance: none;margin: 0;}

</style>