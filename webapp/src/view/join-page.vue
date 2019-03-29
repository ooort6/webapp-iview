<template>
  <div>
    <Row :gutter="20">
      <i-col span="12">
        <Card title="jbone交流群" shadow>
          <img class="qq-group-img" :src="qqFans" alt="">
          <p class="qq-group-intro">本群为jbone交流群，知识分享，共同进步。</p>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import qqFans from '@/assets/images/qq-group.png'

export default {
  name: 'join_page',
  data () {
    return {
      qqFans,
    }
  },
  mounted() {
   this.action()
    console.log(1);
    //
  },
  methods:{
    action(){
      console.log(577)
      this.$axios.get('/user/getUserByName?username=jbone')
      // this.$axios.get('https://www.apiopen.top/weatherApi?city=%E6%88%90%E9%83%BD')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  }
}
</script>

<style>
.qq-group-img{
  display: block;
  margin: 0 auto;
  width: 240px;
}
.qq-group-intro{
  padding: 20px;
  font-size: 16px;
}
</style>
