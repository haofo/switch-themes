export let variable = [{
  name: 'lg-font-size',
  value: '42px'
}, {
  name: 'primary-font-size',
  value: '32px'
}, {
  name: 'normal-font-size',
  value: '28px'
}, {
  name: 'sm-font-size',
  value: '24px'
}, {
  name: 'primary-color-bg',
  value: '#f4f4f4'
}, {
  name: 'font-weight-normal',
  value: '400'
}, {
  name: 'font-weight-medium',
  value: '500'
}, {
  name: 'font-weight-bold',
  value: '600'
}, {
  name: 'gap-sm',
  value: '12px'
}, {
  name: 'gap-md',
  value: '20px'
}, {
  name: 'gap-lg',
  value: '32px'
}, {
  name: 'font-family-normal',
  value: '-apple-system, "Helvetica Neue", Arial, "PingFang SC", "Hiragino Sans GB", STHeiti, "Microsoft YaHei", "Microsoft JhengHei", "Source Han Sans SC", "Noto Sans CJK SC", "Source Han Sans CN", "Noto Sans SC", "Source Han Sans TC", "Noto Sans CJK TC", "WenQuanYi Micro Hei", SimSun, sans-serif'
}, {
  name: 'color-header',
  value: '#007bff'
}, {
  name: 'banner-bg',
  value: '#5fc3e4'
}, {
  name: 'banner-img',
  value: 'linear-gradient(120deg, #dac248, #37a5ca)'
}]
export let css = `.header {
  line-height: 88px;
  text-align: center;
  box-shadow: 0 2px 12px #ccc;
  backface-visibility: hidden;
  z-index: 99;
  background-color: #fff;
}
.header h1 {
  padding: 0;
  margin: 0;
  font-size: primary-font-size;
  color: color-header;
}
.header .back {
  position: absolute;
  top: 19px;
  left: 15px;
  width: 46px;
  color: color-header;
}
.banner {
  padding: 15px;
  color: #fff;
  text-align: center;
  background-color: banner-bg;
  background-image: banner-img;
}
.banner .tit {
  font-size: 56px;
}
.banner .tit-sub {
  font-size: primary-font-size;
  opacity: 0.7;
}
.banner .tit-desc {
  font-size: normal-font-size;
  opacity: 0.8;
}
.banner .banner-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: gap-sm;
}
.banner .banner-btn {
  font-size: normal-font-size;
  color: #fff;
  border: 1px solid #fefefe;
  width: 200px;
  height: 70px;
}
.switch-theme {
  background-color: #fff;
  margin: gap-lg 0;
}
.switch-theme .content {
  padding: 0 gap-md;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: normal-font-size;
}
.switch-theme .content button {
  width: 150px;
  height: 60px;
  color: #fff;
}
.switch-theme .content.violet button {
  background-color: #a948da;
}
.main {
  padding: 30px 20px;
}
.main .btn-wrapper {
  padding: 50px 0;
}
.main .tips {
  font-size: normal-font-size;
}
`
