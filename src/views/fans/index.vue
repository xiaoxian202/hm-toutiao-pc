<template>
    <div class="container-fans">
        <el-card>
            <div slot="header">
                <my-bread>粉丝管理</my-bread>
            </div>
            <!-- tabs标签页 -->
            <el-tabs v-model="activeName" type="card" >
                <el-tab-pane label="粉丝列表" name="fansList">
                    <!-- 列表 -->
                    <div class="fans-list">
                        <!-- key必须使用字符串或者数字，目前是对象（json-bigint转化的）
                        解决：转成字符串 -->
                        <div class="list-item" v-for="item in fans" :key="item.id.toString()">
                            <el-avatar :size="80" :src="item.photo"></el-avatar>
                            <p>{{item.name}}</p>
                            <el-button type="primary" plain>+ 关注</el-button>
                        </div>
                    </div>
                    <!-- 分页 -->
                    <el-pagination
                        background
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="reqParams.per_page"
                        :current-page="reqParams.page"
                        @current-change="changePage">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="粉丝画像" name="fansImage">
                    <div ref="bar" style="width:600px;height:400px">

                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script>
// 导入echarts
import echarts from 'echarts'
export default {
    name:'page-fans',
    data() {
        return {
            // 默认激活选项卡
            activeName:"fansImage",
            // 请求参数
            reqParams:{
                page:1,
                per_page:24
            },
            // 粉丝列表
            fans:[],
            // 总条数
            total:0

        }
    },
    created() {
        this.getFans()
    },
    mounted(){
        // 初始化柱状图,不能created中，因为要获取dom，created中是undif
        this.initBar()
    },
    methods:{
        // 获取粉丝列表
        async getFans() {
            const {data:{data}} = await this.$http.get('followers',{params:this.reqParams})
            this.total = data.total_count
            this.fans = data.results
        },
        // 切换页码
        changePage(newPage) {
            this.reqParams.page = newPage
            this.getFans()
        },
        // 初始化柱状图
        async initBar() {
            // 异常
            try {
                // 初始化echarts
                const myChart =  echarts.init(this.$refs.bar)
                // 定义图表配置
                const option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        // 坐标轴指示器，坐标轴触发有效
                        axisPointer: {   
                            // 默认为直线，可选为：'line' | 'shadow'        
                            type: 'shadow'        
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '直接访问',
                            type: 'bar',
                            barWidth: '60%',
                            // 刻度对应的数据
                            data: []
                        }
                    ]
                }
                // 获取数据，给options数据赋值
                const res = await this.$http.get('statistics/followers')
                console.log(res.data.data);
                const obj = res.data.data.age
                const xAxisData = []
                const seriesData = []
                for(const key in obj ) {
                    xAxisData.push(key)
                    seriesData.push(obj[key])
                }
                option.xAxis[0].data = xAxisData
                option.series[0].data = seriesData

                // 使用这个配置
                myChart.setOption(option)
            } catch (error) {
                this.$message.error('网络异常，请刷新重试')
            }
        }
    }
}
</script>

<style lang="less" scoped>
.fans-list {
    .list-item{
        width: 100px;
        height: 170px;
        border: 1px dashed #ddd;
        display: inline-block;
        margin-right: 40px;
        margin-top: 20px;
        text-align: center;
        padding-top: 10px;
        p{
            margin: 10px;
            font-size: 14px;
        }
    }
}
</style>