# js eventbus 简单实现 (延伸的知识)
## bind call apply的区别  
 call和apply通过名字就是直接主动的宝宝，直接执行函数
 区别在于一个apply(context,[args]) 是一个数组
 call(context,arge0,arge1) 单个参数

 bind 绑定，一看就是依赋于别人的小公主，比较被动，是返回一个指定上下文包裹该函数的一个新函数，被调取的时候才执行

 并且最大特点绑定完上下文，就无法再次绑定

 eg:
  function test(){console.log(this)};

 let context1={id:1};
 let context2={id:2};
 var newTest=test.bind(context1).bind(context2);
 newTest.call(window);

 结果： {id: 1} 而不是 window对象

 
 ## 判断数组方法 
 es5
Array.isArray([])

最佳兼容方法
function isArray(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
}
 