##微金所响应式布局
- 主要功能
  + 主要使用bootstrap实现响应式布局，完成微金所页面
- 开发环境
  + jquery
  + bootstrap
  + html5shiv
  + respond
  + isctoll
  + artTemplate
- 结构
  + 入口文件是 index.html
  + test.html是用来测试bootstrap组件的标准模板
  + 相关依赖放在lib文件夹中
  + 字体文件放在font文件夹中
###实现过程
- 在head中引入
  ```html
    <!--[if lt IE 9]>
    <script src="lib/html5shiv/html5shiv.min.js"></script>
    <script src="lib/respond/respond.min.js"></script>
    <![endif]--> 
  ```
是为了增加浏览器的兼容性
- 使用bootstrap的组件的时候，修改样式可以复制bootstrap中的源码到自己的index.css中来，然后替换掉class 引入自己的结构中去，或者可以在复制的源码前面加上自己当前模块的前缀。然后再浏览器中找到要修改的部分在自己css文件中的位置进行修改。
- 轮播图部分
  + 使用bootstrap的动态轮播图组件
  + 首先自己创建了一个json文件模拟数据库，用ajax动态的获取轮播图数据
  + 根据数据动态渲染，根据当前设备屏幕宽度判断
  + 准备数据，把数据转换成html格式的字符串（动态创建元素，字符串拼接，模版引擎）
  + 使用artTemplate模板引擎把字符渲染页面当中
  + 测试功能，页面尺寸发生改变重新渲染（使用JQ的resize属性）
  + 移动端的手势切换 touch
  + 优化页面性能 做数据的缓存
- 产品部分
  + 使用bootstrap的tab.js插件
  + 在移动端的时候，产品的标签页要实现滑动效果，使用了iscroll插件，
  + 初始化iscroll
  ```javascrip
      new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
      });
  ```
  + 这里设置 click:true，解决了标签页不能点击的Bug

