<template>
  <div class="home">
    <div class="banner">
      <Carousel
        autoplay
        :autoplay-speed="6000"
        arrow="always"
        trigger="hover"
        loop
        radius-dot
        easing
      >
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/static/image/baiqiang.jpg" alt>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/static/image/yun.jpg" alt>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/static/image/wanshu.jpg" alt>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div class="demo-carousel">
            <img src="@/static/image/siyouhua.jpg" alt>
          </div>
        </CarouselItem>
      </Carousel>
    </div>
    <!--轮播 -->
    <!-- 主体 -->
    <div class="index-container">
      <div class="index-adv-center">
        <div class="section-box">
          <div class="section-box-adv" style="height:auto;">
            <ul class="index-center-wrapper">
              <li>
                <span class="phone_wraper">
                  <img
                    src="https://fms.res.meizu.com/dms/2019/03/11/e4fd82cd-8b0d-479f-aa3b-8c8d4d39c94c.jpg"
                    alt
                  >
                  <em>魅族 Note9</em>
                  <p>立即购买</p>
                </span>
              </li>
              <li>
                <span class="phone_wraper">
                  <img
                    src="https://fms.res.meizu.com/dms/2019/02/22/a0dfe03a-573f-456c-809c-bffc39dd6d69.png"
                    alt
                  >
                  <em>魅族 X8</em>
                  <p>最高直降300</p>
                </span>
              </li>
              <li>
                <span class="phone_wraper">
                  <img
                    src="https://fms.res.meizu.com/dms/2019/03/07/8c83fffb-4928-47a4-b07f-cc881a457ab5.jpg"
                    alt
                  >
                  <em>以旧换新</em>
                  <p>免费寄件 专业检测</p>
                </span>
              </li>
              <li class="last">
                <span class="phone_wraper">
                  <img
                    src="https://fms.res.meizu.com/dms/2019/03/06/ae14a6e7-22e9-4d2e-89cc-9ab6e15daa86.jpg"
                    alt
                  >
                  <em>魅族 Note9</em>
                  <p>延保活动登记</p>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- one -->
      <div class="index-phone-center">
        <div class="section-box section-phone-box">
          <div class="section-title" style="margin-top:-40px">
            <h3>中易迅产品</h3>
						 <p >针对各行业业务特性,打造个性化行业解决方案</p>
          </div>
          <div class="section-box-adv" style="background:#f4f4f4">
           
            <Row :gutter="16" style="width:1200px;margin:0 auto;margin-top:2%">
              <Col span="6">
                <Card :bordered="false" style="height:268px;padding-top:30px">
                  <div style="text-align:center">
                    <img src="@/static/image/86e4ba99a7e.png">
                    <h2>验证码通知短信></h2>
                     <i>极速验证5秒到</i>
                    <Button type="primary" style="width:118px;height:36px">快速接入</Button>
                  </div>
                </Card>
              </Col>
              <Col span="6">
                <Card :bordered="false" style="height:268px;padding-top:30px">
                  <div style="text-align:center">
                    <img src="@/static/image/86e4ba99a7e.png">
                    <h2>验证码通知短信></h2>
                   <i>极速验证5秒到</i>
                    <Button type="primary" style="width:118px;height:36px">快速接入</Button>
                  </div>
                </Card>
              </Col>
              <Col span="6">
                <Card :bordered="false" style="height:268px;padding-top:30px">
                  <div style="text-align:center">
                    <img src="@/static/image/86e4ba99a7e.png">
                    <h2>验证码通知短信></h2>
                    <i>极速验证5秒到</i>
                    <Button type="primary" style="width:118px;height:36px">快速接入</Button>
                  </div>
                </Card>
              </Col>
              <Col span="6">
                <Card :bordered="false" style="height:268px;padding-top:30px">
                  <div style="text-align:center">
                    <img src="@/static/image/86e4ba99a7e.png">
                    <h2>验证码通知短信></h2>
                    <i>极速验证5秒到</i>
                    <Button type="primary" style="width:118px;height:36px">快速接入</Button>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
          <div class="section-box-row">
            <div class="index-center-wrapper">
              <ul>
                <li
                  class="goods-box"
                  v-for="item in phonelist"
                  :key="item.main_id"
                  @click="phoneDetails(item)"
                >
                  <span class="box-img">
                    <img class="goods-img" :src="item.homeUrl" alt>
                    <span class="box-info">
                      <span class="goods-name">{{item.productName}}</span>
                      <span class="goods-desc">{{item.productDesc}}</span>
                      <span class="goods-price">
                        <i>￥</i>
                        {{item.price}}
                        <em></em>
                      </span>
                    </span>
                    <span class="product-sign blue">领券</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- 声学 -->
      <div class="index-phone-center">
        <div class="section-box section-phone-box" style="background:#fff">
          <div class="section-title">
            <h3>选择中易迅通讯的优势</h3>
            <p>针对各行业特性，打造标准化行业解决方案</p>
          </div>
          <div class="section-box-adv" style="height:590px">
            <Row :gutter="16" style="width:1200px;margin:0 auto;margin-top:2%">
              <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
               <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
							  <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
            </Row>
						  <Row :gutter="16" style="width:1200px;margin:0 auto;margin-top:2%">
              <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
               <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
							  <Col span="8">
                <Card dis-hover :bordered="false">
                  <div style="text-align:center">
                    <img
                      src="@/static/image/shandian.jpg"
                      style="width:80px;height:180px;float:left"
                      alt
                    >
                    <h3
                      style="float:left;margin-left:50px;margin-right:150px;margin-bottom:20px"
                    >快速到达</h3>
                    <p>“5秒到”开创一个时代</p>
                    <p>高并发解决方案</p>
                    <p>免审核+智能拦截，网关提交＜2秒</p>
                    <p>独立端口，专享通道</p>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
         
        </div>
      </div>
      <!-- 智能配件 -->
     <div class="box-img-black">
			 
		 </div>

      <!-- 生活周边 -->
    
        
         
        
    </div>
    <BackTop></BackTop>
  </div>
</template>
<style lang="scss" scoped>

.home {
	height: 10000px;
  padding-top: 60px;
  background: #f4f4f4;
  .banner {
    width: 100%;

    img {
      display: block;
      width: 100%;
      height: 500px;
    }
  }
  .index-adv-center {
    margin-bottom: 50px;
	}
	
  .section-box {
    margin-bottom: 0px;
    .box-img {
      display: block;
      width: 100%;
      height: 100%;
      text-align: center;
      background-repeat: no-repeat;
      background-position: center;
		}
		
    a {
      position: relative;
    }
    .section-title {
      padding-top: 20px;

      font-size: 30px;
      text-align: center;
      margin-bottom: 10px;
      h3 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        font-size: 16px;
        color: #888;
        margin-bottom: 18px;
      }
		}
		
    .section-box-adv {
      height: 350px;
      padding-bottom: 45px;
      background-color: #fff;
      border-bottom: 1px solid #eee;
			overflow: hidden;

      p {
        text-align: left;
        margin-left: 120px;
        font-size: 14px;
        color: #888;
        margin-bottom: 18px;
			}
			i {
				display: block;
        text-align: center;
        font-size: 14px;
        color: #888;
        margin-bottom: 18px;
      }
      h2 {
        font-size: 18px;
        margin: 18px;
        color: #20273c;
        margin-bottom: 8px;
      }
      .box-img {
				width: 100%;
				
      }
      ul {
        overflow: hidden;
        width: 1240px;
        margin: auto;
        li {
          text-align: center;
          float: left;
          position: relative;
          width: 25%;
          padding-top: 45px;
          .box-img {
            display: block;
            width: 100%;
            height: 100%;
            text-align: center;
            background-repeat: no-repeat;
            background-position: center;
          }
          .phone_wraper {
            position: relative;
            img {
              height: 130px;
              &:hover {
                cursor: pointer;
                opacity: 0.9;
                position: relative;
                animation: mymove 1s linear 0s infinite alternate;
                -webkit-animation: mymove 1s linear 0s infinite alternate;
              }
              @keyframes mymove {
                from {
                  bottom: 0px;
                }
                to {
                  bottom: 20px;
                }
              }

              @-webkit-keyframes mymove /*Safari and Chrome*/ {
                from {
                  bottom: 0px;
                }
                to {
                  bottom: 20px;
                }
              }
            }

            em {
              font-style: normal;
              display: block;
              color: #333;
              font-size: 20px;
            }
            p {
              font-size: 14px;
              color: #999;
            }
          }
        }
        .last {
          margin-right: 0;
        }
      }
    }
    .section-box-row {
      width: 100%;
      .index-center-wrapper {
        width: 1240px;
        margin: auto;
        ul {
          width: 101%;
          display: flex;
          flex-wrap: wrap;
          li {
            width: 303px;
            height: 375px;
            position: relative;
            margin: 5px;
            background-color: #fff;
            overflow: hidden;
            transition: all 0.3s ease;
            .section-item-box {
              height: 100%;
              display: block;
              position: relative;
              .serction-item-goods {
                position: relative;
                display: block;
                width: 100%;
                height: 100%;
                text-align: center;
                background-repeat: no-repeat;
                background-position: center;
                img {
                  height: 230px;
                  margin-top: 30px;
                }
              }
            }
            &:hover {
              cursor: pointer;
              transition: all 0.3s linear;
              box-shadow: 2px 4px 5px #ccc;
              transform: translateY(-4px);
            }
          }
          .box-info {
            position: absolute;
            z-index: 10;
            top: 270px;
            left: 0;
            width: 100%;
            text-align: center;
            span {
              display: block;
            }
            .goods-name {
              color: #333;
              font-size: 16px;
              margin-bottom: 2px;
            }
            .goods-desc {
              color: #999;
              font-size: 14px;
            }
            .goods-price {
              position: relative;
              display: inline-block;
              color: #c00;
              font-size: 22px;
              padding-left: 14px;
              i {
                position: absolute;
                left: 0;
                font-size: 14px;
                bottom: 3px;
              }
            }
          }
          .goods-img {
            height: 230px;
            margin-top: 30px;
          }
          .product-sign {
            position: absolute;
            top: 30px;
            left: 30px;
            display: block;
            background-image: linear-gradient(120deg, #2e74f6, #56bdf9);
            width: 60px;
            height: 60px;
            line-height: 60px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            border-radius: 50%;
          }
        }
      }
    }
	}
	.box-img-black{
		height: 200px;
		background:url("../../static/image/choose-bottom-bg.png") 50% 50%;
	}
}
</style>
