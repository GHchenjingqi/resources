# 数组原型方法学习
>之前总是使用数组的一些常用的方法，例如：push,slice,shift，unshift,pop...，根本没去观察数组原型上自带的方法都有哪些，今天无意中打印了一个空Array数组，发现其原型Array下面有将近35个方法和一个length属性。

### arr.at()
定义：获取访问指定索引的元素值，可以接受负数，从尾部开始索引。
```
let arr = ["1",3,"4","苹果"]
console.log(arr.at(2)); //4
console.log(arr.at(-2)); //4
```
at()方法虽然新颖，但是很多人会问，这不是和属性访问器 arr[2] 效果一样嘛？为什么还新增一个方法？
答案是肯定的，属性访问方法不接收负值，当我们需要从尾部获取时，就很不方便了，at()方法恰好解决了这样的问题。

### arr.cancat(arr1,arr2,arr3)
定义：连接多个数组，返回一个组合后的数组。
```
let arr1 = [1];
let arr2 = [1,3,4,"a"];
let arr3 = arr1.concat(arr2);//[1, 1, 3, 4, 'a']
```
这样我们就实现数组拼接组合，当然若拼接的第一个数组是[]空数组，就实现了一个数组拷贝，这也是数组拷贝的一个方法，而且是深拷贝哦。

### arr.constructor()
定义：属性返回对创建此对象的数组函数的引用。
```
let arr = [1,2];
let res = arr.constructor();// []
```
注意，这里的constructor()是数组的引用，并不是指向构造函数constructor，一个带括号一个不带。
所有数组的constructor()引用值都是 "[]"。

### arr.copyWithin(target,start,end)
定义：用于从数组的指定位置拷贝元素到数组的另一个指定位置中。
```
let arr = [1,2,3,4,5,6,7,8];
let res = arr.copyWithin(2,0);// [1, 2,   1, 2, 3, 4, 5, 6]
let res = arr.copyWithin(2,0,2);// [1, 2,   1, 2,   5, 6, 7, 8]
```
注意：copyWithin会导致原数组变化，返回被改变后的数组，而不是新数组。
理解这个方法也简单，target参数时插入指定位置，start是拷贝开始位置，end是拷贝截止，不设置end就从start到默认最后。

### arr.entries()
定义：返回一个数组的迭代对象，该对象包含数组的键值对 (key/value)，通过next().value 方法获取迭代的键值对。
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.entries(); // Array Iterator {}
console.log(res.next().value);//[0, '1']
console.log(res.next().value);//[0, '2']
console.log(res.next().value);//[0, '3']
```

### arr.every()
定义：用于检测数组所有元素是否都符合指定条件，返回布尔值。
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.every(item =>{
	return Number(item)  > 0
}); // true
```

### arr.fill(val,start,end)
定义：用于使用固定值填充数组。
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.fill(0,2);//['1', '2', 0, 0, 0, 0, 0, 0]
let res = arr.fill(0,2,6); //['1', '2', 0, 0, 0, 0, '7', '8']
```
注意：end默认是到最后位置，省略之后就填充到最后。

### arr.filter()
定义：返回数组中符合条件的元素。
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.filter(item =>{
	return Number(item)  > 6
}); // ['7', '8']
```

### arr.find()
定义：返回数组中满足条件的第一个元素，如果没有符合条件的元素返回 undefined
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.find(item =>{
	return Number(item)  > 6
}); // 7
```
注意：不是返回所有满足元素，二是第一个，后面可能还有第二个...

### arr.findIndex()
定义：返回数组中满足条件的第一个元素索引值，如果没有符合条件的元素返回 -1
```
let arr = ["1","2","3","4","5","6","7","8"];
let res = arr.findIndex(item =>{
	return Number(item)  > 6
}); // 6
```

### arr.flat(number)
定义：所有元素与遍历到的子数组中的元素合并为一个新数组返回。俗称，拍扁数组。
number是深度，默认是1，也就是二维数组。任意深度用Infinity
```
let arr = [1, 2, [3, 4]];
arr.flat();//[1, 2, 3, 4]

let arr1 = [1, 2, [3, 4, [5, 6]]];
arr1.flat(Infinity);//[1, 2, 3, 4, 5, 6]
```
注意，flat()默认只能拍扁二维数组，更深的就会拍扁失败。就需要改变number的值。

### arr.flatMap()
定义：映射每个元素，然后将结果压缩成一个新数组。有点类似map，对比如下：
```
let arr = [1,3,5,7]
let res =arr.map(x => [x * 2]); 
console.log(res);//[[2],[6],[10],[14]]

let res1 =arr.flatMap(x => [x * 2])
console.log(res1);//[2, 6, 10, 14]
```

### arr.forEach()
定义：遍历循环数组每一项，然后执行回调。
```
let arr = ["1","2","3","4","5","6","7","8"];
arr.forEach(function (item,index){
	arr[index] = item * 2
}); // [2, 4, 6, 8, 10, 12, 14, 16]
```
注意：forEach没有返回值，不能用表达式方式，表达式会得到undefined

### arr.from()
定义：用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。
```
let arr = Array.from("study");//['s', 't', 'u', 'd', 'y']
let arr1 = Array.from(new Set([1,2,4]));//[1,2,4]
```
注意：必须是带length属性的对象，使用之前可以判断length是否存在。

### arr.includes()
定义：用来判断一个数组是否包含一个指定的值，返回布尔值。
```
let arr = [1,2,5,"a"];
console.log(arr.includes(5)); //true
```
可以用来优化if多条件判断语句，避免多个||或语句判断。

### arr.indexOf()
定义：返回数组中某个指定的元素位置。不存在返回 -1
```
let arr = [1,2,5,"a"];
console.log(arr.indexOf(5)); // 2
```
可以用来判断是否包含一个元素

### arr.isArray()
定义：判断是否是数组，返回布尔值。
```
let arr = [1,2,5,"a"];
console.log(Array.isArray(arr)); // true
```

### arr.join(separator)
定义：用于把数组中的所有元素转换一个字符串。separator是分隔符，可为空。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.join("|"); // Banana|Orange|Apple|Mango
```

### arr.keys()
定义：创建一个数组迭代对象， 该对象包含了数组的键。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.keys(); //  Array Iterator
console.log(res.next().value); // 0
console.log(res.next().value); // 1
console.log(res.next().value); // 2
```

### arr.lastIndexOf()
定义：返回一个指定的元素在数组中最后出现的位置。没有找到返回 -1
```
let arr = [1,2,5,"a"];
console.log(arr.lastIndexOf(5)); // 1
```

### arr.map()
定义：返回一个每一项被处理过的新数组。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.map((item,index)=>{
 	return item+"_"+index;
});// ['Banana_0', 'Orange_1', 'Apple_2', 'Mango_3']
```

### arr.pop()
定义：删除数组最后一项，并返回这个元素。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.pop();
console.log(arr);//['Banana', 'Orange', 'Apple']
console.log(res);//Mango
```
注意，原数组已经被改变！！！返回的结果是删除的部分。

### arr.push()
定义：向数组的末尾添加一个或多个元素，并返回新的长度。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.push("橘子","柚子");
console.log(arr);//['Banana', 'Orange', 'Apple', 'Mango', '橘子', '柚子']
console.log(res);//6
```

### arr.reduce(function(total, currentValue, currentIndex, arr), initialValue)
定义：接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。

回调函数参数：total——累计值 currentValue-当前元素  currentIndex-当前元素的索引  arr—— 当前数组  initialValue——total的初始值
```
let arr = [1,2,3,4,5];
let res = arr.reduce((total,item)=>{
 	return total+item;
}); // 15
let res1 = arr.reduce((total,item)=>{
 	return total+item;
},10); // 25
```
reduce()多用于数组求和，求乘积。

### arr.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)
定义：和 reduce() 功能是一样的，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。

回调函数参数：total——累计值 currentValue-当前元素  currentIndex-当前元素的索引  arr—— 当前数组  initialValue——total的初始值
```
let arr = [1,2,3,4,5];
let res = arr.reduceRight((total,item)=>{
 	return total-item;
}); // -5
let res1 = arr.reduceRight((total,item)=>{
 	return total-item;
},100); // 85
```

### arr.reverse()
定义：颠倒数组中元素的顺序。
```
let arr = [1,2,3,4,5];
let res = arr.reverse(); //[5, 4, 3, 2, 1]
```

### arr.shift()
定义：删除数组的第一个元素，并返回这个元素。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.shift();
console.log(arr);//['Orange', 'Apple', 'Mango']
console.log(res);//Banana
```

### arr.slice(start,end)
定义：截取数组中的一部分，并返回这部分，不改变原数组。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.slice(1,3);//['Orange', 'Apple']
let res = arr.slice(-2);;//['Apple', 'Mango']
```

### arr.some()
定义：判断数组中是否有满足条件的任意一项。返回布尔值，有一个满足就返回true。
```
let arr = [1,2,3,4,5];
let res = arr.some(item =>{
 	return item >=5
});//true
```

### arr.sort()
定义：用于对数组的元素进行排序。
```
let arr = [1,2,11,20,3,4,5];
let res = arr.sort((a,b) =>{
 	return a-b;//升序
});//[1, 2, 3, 4, 5, 11, 20]
let res1 = arr.sort((a,b) =>{
 	return b-a;//降序
});//[20, 11, 5, 4, 3, 2, 1]
```

### arr.splice(index,number,item1,item2)
定义：用于添加或删除数组中的元素。删除时候并返回删除的内容。
参数：index - 添加删除位置  number - 删除数量  item —— 添加的元素
```
let arr = [1,2,3,4,5,6,7,8];
//删除
let res = arr.splice(2,6);
console.log(arr);// [1, 2]
console.log(res);// [3, 4, 5, 6, 7, 8]
//删除并新增
let res = arr.splice(2,1,30,100);
console.log(arr);// [1, 2, 30, 100, 4, 5, 6, 7, 8]
console.log(res);//[3]
```

### arr.toString()
定义：数组转字符串，以","分割。
```
let arr = [1,2,3,4,5,6,7,8];
let res = arr.toString();
console.log(res);//1,2,3,4,5,6,7,8
```

### arr.unshift()
定义：向数组的开头添加一个或更多元素，并返回新的长度。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.unshift("Lemon","Pineapple");
console.log(arr);// ['Lemon', 'Pineapple', 'Banana', 'Orange', 'Apple', 'Mango']
console.log(res);// 6
```

### arr.values()
定义：用于从数组创建一个包含数组值的可迭代对象。和keys一样，不过是以value值组成的数组。
```
let arr = ["Banana", "Orange", "Apple", "Mango"];
let res = arr.values();// Array Iterator
console.log(res.next().value);// Banana
console.log(res.next().value);// Orange
console.log(res.next().value);// Apple
```

### arr.length
定义：数组的长度，空数组length为0。

以上就是数组的全部方法了，目前截止到ES6，扩展到了35个方法，死记硬背也不好弄，关键还是理解，这些方法比较灵活。
例如：
- 转字符串：toString 或 join
- 获取数组：at 或 属性访问器
- 添加删除数组：pop,push,slice,shift,unshift,splice
- 拷贝数组：concat,copyWithin
- 遍历数组：some,map,filter,reduce,reduceRight,every,forEach
- 排序倒序：sort,reverse
- 查找元素：find,indexOf,includes,lastIndexOf,findIndex
- 可迭代：keys,values,entries
- 其他方法：fill,flat,flatMap,from,isArray

好了，继续复习吧！希望大家都不要依靠框架，还是以基础为主，前端目前都开始卷框架了，已经偏离了方向。吾日三省吾身，不进则退！—— 陈小知

