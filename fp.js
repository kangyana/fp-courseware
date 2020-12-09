// /**
//  * 群(构造函数)
//  * 海鸥（seagull）
//  * @param {number} n 海鸥的数量
//  */
// var Flock = function (n) {
//   this.seagulls = n;
// };
// /**
//  * 群的合并功能
//  * 合并（conjoin）后它们会变成更大的鸟群
//  * @param {flock} other 其他群实例
//  */
// Flock.prototype.conjoin = function (other) {
//   this.seagulls += other.seagulls;
//   return this;
// };
// /**
//  * 群的合并功能
//  * 繁殖（breed）则会增加他们的数量，所增加的数目为他们自身所繁殖出的数量。
//  * @param {flock} other 其他群实例
//  */
// Flock.prototype.breed = function (other) {
//   this.seagulls = this.seagulls * other.seagulls;
//   return this;
// };
// // 群a, 4只海鸥
// var flock_a = new Flock(4);
// // 群b，2只海鸥
// var flock_b = new Flock(2);
// // 群c，0只海鸥
// var flock_c = new Flock(0);
// // 预计答案：群a与群c合并(4+0=4), 再和群b繁殖(4*2=8), 再和群d合并(8+4*2=16)
// // 正确答案：群a与群c合并(4+0=4), 再和群b繁殖(4*2=8), 再和群d合并(16+8*2=32), 因为群a在计算过程中被永久的改变了
// var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).seagulls;

// var add = function (x, y) {
//   return x + y;
// };
// var multiply = function (x, y) {
//   return x * y;
// };
// var flock_a = 4;
// var flock_b = 2;
// var flock_c = 0;
// var result = add(multiply(flock_b, add(flock_a, flock_c)), multiply(flock_a, flock_b));

// var Box = function (x) {
//   return {
//     map: function (f) {
//       return Box(f(x))
//     },
//     fold: function (f) {
//       return f(x)
//     }
//   }
// }

// var multiply = function (y) {
//   return function (x) {
//     return x * y
//   }
// };

// var add = function (y) {
//   return function (x) {
//     return x + y
//   }
// }

// var flock_a = 4;
// var flock_b = 2;
// var flock_c = 0;

// var flock_d = Box(flock_a).fold(multiply(flock_b))
// var result = Box(flock_a).map(add(flock_c)).map(multiply(flock_b)).fold(add(flock_d))
// console.log(result)