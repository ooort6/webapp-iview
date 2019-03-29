<template>
<div>
<CheckboxGroup v-model="social">
        <Checkbox label="twitter">
            <Icon type="logo-twitter"></Icon>
            <span>Twitter</span>
        </Checkbox>
        <Checkbox label="facebook">
            <Icon type="logo-facebook"></Icon>
            <span>Facebook</span>
        </Checkbox>
        <Checkbox label="github">
            <Icon type="logo-github"></Icon>
            <span>Github</span>
        </Checkbox>
        <Checkbox label="snapchat">
            <Icon type="logo-snapchat"></Icon>
            <span>Snapchat</span>
        </Checkbox>
      
    </CheckboxGroup>
    
    <CheckboxGroup v-model="fruit">
        <Checkbox label="香蕉"></Checkbox>
        <Checkbox label="苹果"></Checkbox>
        <Checkbox label="西瓜"></Checkbox>
    </CheckboxGroup>



    <Slider v-model="value8" show-input></Slider>
    <Tree :data="data3" :load-data="loadData" show-checkbox></Tree>
        <Steps :current="3">
        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
        <Step title="已完成" content="这里是该步骤的描述信息"></Step>
        <Step title="进行中" content="我"></Step>
    </Steps>
 
   <p>当前正在进行第 {{ current + 1 }} 步</p>
    <Steps :current="current">
        <Step title="步骤1"></Step>
        <Step title="步骤2"></Step>
        <Step title="步骤3"></Step>
        <Step title="步骤4"></Step>
    </Steps>
     <Button type="primary" @click="next">Next step</Button>


<Scroll :on-reach-bottom="handleReachBottom">
        <Card dis-hover v-for="(item, index) in list1" :key="index" style="margin: 32px 0">
            Content {{ item }}
        </Card>
    </Scroll>
    <BackTop></BackTop>
    </div>
    
</template>
<script>
    export default {
        data () {
            return {
                 list1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                 data3: [
                    {
                        title: 'parent',
                        loading: false,
                        children: []
                    }
                ],
                 current: 0,
                value8: 25,
                social: ['facebook', 'github'],
                fruit: ['苹果']
            }
        },
         methods: {
               handleReachBottom () {
                return new Promise(resolve => {
                        const last = this.list1[this.list1.length - 1];
                        for (let i = 1; i < 11; i++) {
                            this.list1.push(last + i);
                        }
                        resolve();
                });
            },
               next () {
                if (this.current == 3) {
                    this.current = 0;
                } else {
                    this.current += 1;
                }
            },
            loadData (item, callback) {
               
                    const data = [
                        {
                            title: 'children',
                            loading: false,
                            children: []
                        },
                        {
                            title: 'children',
                            loading: false,
                            children: []
                        }
                    ];
                    callback(data);
              
            }
        }
    }
</script>