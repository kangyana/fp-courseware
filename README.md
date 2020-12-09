<h1 align="center">📝函数式编程</h1>
<div align="center">
functional programming
</div>

[![cover](http://www.ruanyifeng.com/blogimg/asset/201204/bg2012040601.png)](SUMMARY.md)


## ⌨️为什么学习函数式编程

今天主题为functional 模式。函数式编程（Functional Programming）这一理念不论是在前端领域还是后端领域，都逐渐热门起来，现在不大量使用函数式编程技术的大型应用程序已经很罕见了，比如前端流行的 React（核心思路数据即视图），Vue3.0 的 Composition API ，Redux ，Lodash 等等前端框架和库

 * **你可能每天都在工作中使用到它。**

    这让你有机会在实际的程式开发过程中学以致用，而不是在空闲时间将一门深奥的FP 语言用在玩票性质的专案上。(Vue3.0 的 Composition API ，Redux ，Lodash)


 * **我们不必从头学习所有东西就能开始撰写程式。**

    在一个纯functional 的语言中，你必须使用monads 才能印出变数或读取DOM 节点。JavaScript 则简单多了，可以作弊走捷径。JavaScript 也更容易入门，因为他是一门混合模式的语言，你可以随时在感到吃力之时回去按你原有的习惯开发。

## ⌨️相见恨晚

让我们以一个简单的例子开始。这是一个海鸥（seagull）的应用程式。当鸟群合并（conjoin）后它们会变成更大的鸟群，繁殖（breed）则会增加他们的数量，所增加的数目为他们自身所繁殖出的数量。目前这不是物件导向的良好实践，只是为了强调这种赋值方式所造成的弊端。看看吧：

```js
var Flock = function(n) {
  this.seagulls = n;
};

Flock.prototype.conjoin = function(other) {
  this.seagulls += other.seagulls;
  return this;
};

Flock.prototype.breed = function(other) {
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c)
   .breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;
```

谁的手法会写出这么的令人退步三舍的程式？内部的可变状态相当的难以追踪，而且我的天啊，答案居然还是错的！正确答案应该是16，但是因为flock_a在计算过程中被永久改变了，可怜的flock_a。这是IT部门混乱的表现，非常粗暴的计算方式！

如果你看不懂这支程式，是没关系的，因为我也看不懂。重点是状态及可变值非常难追踪，即使这是一个小小的范例。

让我们试试另一种更functional 的方式：

```js
var conjoin = function(flock_x, flock_y) {
   return flock_x + flock_y;
};
var breed = function(flock_x, flock_y) {
   return flock_x * flock_y;
};

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = conjoin(
   breed(flock_b, conjoin(flock_a, flock_c)),
   breed(flock_a, flock_b)
);
```
很好，这次我们得到正确的答案。而且少了很多程式码。不过巢状function有点让人难以理解⋯这种写法更好，不过程式码肯定是越直白越好，所以让我们更深入探讨。了解之后，我们会发现我们只是很简单的进行相加（conjoin）及相乘（breed）。

除了两个function 的名称比较特殊外，其他没有任何难以理解之处。让我们重新命名这些function 来揭晓它们的真面目。

```js
var add = function(x, y) {
   return x + y;
};
var multiply = function(x, y) {
   return x * y;
};

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = add(
  multiply(flock_b, add(flock_a, flock_c)),
  multiply(flock_a, flock_b)
);
```

有的同学就会问了, 这样写好像并不优雅. 当然, 我们还可以写链式编程

```js
var Box = function (x) {
  return {
    map: function (f) {
      return Box(f(x))
    },
    fold: function (f) {
      return f(x)
    }
  }
}

var multiply = function (y) {
  return function (x) {
    return x * y
  }
};

var add = function (y) {
  return function (x) {
    return x + y
  }
}

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var flock_d = Box(flock_a).fold(multiply(flock_b))
var result = Box(flock_a)
				.map(add(flock_c))
				.map(multiply(flock_b))
				.fold(add(flock_d))

Box(a).map(func1).map(func2).map(func3)
```