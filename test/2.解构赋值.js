let res = {errcode:0,data:{a:10,b:100}}

// 深层解构
let {errcode,data:{a,b}}=res;

console.log(errcode);//0
console.log(a);//10
console.log(b);//100

// 函数的形参是对象 也可以解构
function foo({age,name}){
    console.log(age,name);
    
}

foo({age:'2009',name:'decade'})

