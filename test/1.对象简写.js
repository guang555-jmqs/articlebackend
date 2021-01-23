let name = '01驱动器';
let obj1 = {
    name:name,
    getName:function(){
        return this.name;
    }
}

// 等价于
let obj2 = {
    name,
    getName(){
        return this.name
    }
}

let obj3 = {
    name,
    getName(){
        return this.name
    }
}
// 不可以箭头函数 因为箭头函数的this指向父级的上下文
// let obj4={
//     name,
//     getName :()=>{
//         return this.name
//     }
// }
console.log(obj1.getName())
console.log(obj2.getName())
console.log(obj3.getName())
// console.log(obj4.getName())