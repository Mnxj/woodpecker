##   Buffer(缓冲器)

### 1、概念

buffer是一个类似于数组的`对象`，用于表示固定长度的字节序列

buffer本质是一段内存空间，专门用来处理`二进制数据`


### 2、特点

1. buffer大小固定且无法调整
2. buffer性能较好，可以直接对计算机内存进行操作
3. 每个元素的大小为1字节（byte）


### 3、使用

#### 3-1 创建buffer

```js
// 1.alloc 分配
let buf = Buffer.alloc(10);
// console.log(buf)
// 2. allocUnsafe 所创建的会有,旧数据并不会清空旧数据 
// 速度比较快
let buf_2 = Buffer.allocUnsafe(10);
console.log(buf_2)
// 3.from 
let buf_3 = Buffer.from('hello')
console.log(buf_3) // ASCII码
```

#### 3-2 buffer与字符串的转化

```js
let buf_4 = Buffer.from([105,108,111,118,101,121,111,117]);
console.log(buf_4.toString()) //utf-8
//iloveyou

// []
let buf = Buffer.from('hello');
// console.log(buf[0].toString(2));//二进制表示 01101000
console.log(buf);
buf[0] = 95;
console.log(buf);

//溢出
let buf_3 = Buffer.from('hello');
buf_3[0] =361 ;// 最多8位2进制，超过会舍弃高位
//中文
let buf_4 = Buffer.from('你好');
console.log(buf_4);
```

## fs模块

### 一、文件写入

#### 1-1 writeFile/writeFileSync 写入

```js
//import fs module

const fs = require('fs');
// write to file
fs.writeFile('./座右铭.txt','三人行，则必有我师焉',err => {
    // err 写入失败：错误对象 写入成功:null
    if(err){
        console.log('写入失败')
        return;
    }
    console.log('写入成功')
});
// 宏任务 微任务!!!
// 同步写入
fs.writeFileSync('./data.txt','test')
```

#### 1-2 appendFile/ appendFileSync 追加写入

```js
//import fs module
const fs = require('fs');

//2、use appendFile
fs.appendFile('./座右铭.txt','\n择其善者而从之，则其不善者而改之',err => {
    // err 写入失败：错误对象 写入成功:null
    if(err){
        console.log('写入失败')
        return;
    }
    console.log('追加成功')
});
// fs.appendFileSync() 同步也可以
// fs.writeFile('./座右铭.txt','\n择其善者而从之，则其不善者而改之',{flag:'a'},err => {});
```

#### 1-3 createWriteStream 流式写入

```js
//import fs module
const fs = require('fs');
// create write stream
const ws = fs.createWriteStream('./观书有感.txt');
// 3。write
ws.write('半亩方塘一鉴开\n');
ws.write('天光云影共徘徊\n');
ws.write('间去哪得清如许\n');
ws.write('为有源头活水来\n');
ws.close;
```

> `程序打开一个文件是需要消耗资源的`，流式写入可以减少打开关闭文件的次数
>
> 流式写入方式适用于`大文件写入或者频繁写入`的场景，writeFile适合于写入频率较低的场景

1-5 写入文件的场景

`文件写入`在计算机中是一个非常常见的操作，下面的场景都用到了文件写入

- 下载文件
- 安装文件
- 保存程序日志，如git
- 编辑器保存文件
- 视频录制

> 当`需要持久化保存数据`的时候，应该想到文件写入

### 二、文件读取

#### 2-1 readFile/readFileSync 读取

```js
const fs = require('fs')
fs.readFile('./观书有感.txt',(err,data) => {
    if(err){
        console.log('读取失败')
        return;
    }
    console.log(data.toString())
});

// 同步读取
let data = fs.readFileSync('./观书有感.txt');
console.log('sync',data.toString())
```

#### 2-2 createReadStream 流式读取

```js
//import fs module
const fs = require('fs');
// create write stream
const rs = fs.createReadStream('./123.mp4');
// Binding data event 
rs.on('data', chuck => {
    console.log(chuck.length);
})

rs.on('end', ()=> {
    console.log('读取完成');
})
```

#### 2-3 读取文件的场景

- 电脑开机
- 程序运行
- 编辑器打开文件
- 查看图片
- 播放视频
- 播放音乐
- Git 查看日志
- 上传文件
- 查看聊天记录

#### 2-4 大文件复制 和性能检测

```js
let fs = require('fs');

// plan1
let data = fs.readFileSync('./123.mp4');
fs.writeFileSync('./124.mp4',data);
console.log(process.memoryUsage()) // 47611904字节 45m
// plan2
const rs = fs.createReadStream('./123.mp4');
const ws = fs.createWriteStream('./125.mp4');
// rs.on('data', chuck => {
//     ws.write(chuck);
// })

// rs.on('end', ()=> {
//     console.log('读取完成');
// })
rs.pipe(ws); //同上面的

console.log(process.memoryUsage()) // 30916608字节 29m 
```

### 三、文件移动与重命名

```js
const fs = require('fs')
// 不仅可以该名字还可以 移动位置
fs.rename('./座右铭.txt', './论语.txt', err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
});
```

### 四、文件删除

```js
// delete a file 
const fs = require('fs')
// case 1 unlink unlinkSync
fs.unlink('./观书有感.txt', err => {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
});

// case 2 rm rmSync
fs.rm('./论语.txt', err => {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
});
```

### 五、文件夹操作

```js
const fs = require('fs')
fs.mkdir('./html', err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
});

// 2-2  recursion(single)  recursive create 
fs.mkdir('./a/b/c',{recursive: true}, err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
});

// 2-3 read file folder
fs.readdir('./', (err,data)=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log(data)
})

// 2-4 delete file folder
fs.rmdir('./html', err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
})

fs.rmdir('./a',{recursive: true}, err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
})

// suggestion use 
fs.rm('./a',{recursive: true}, err=> {
    if(err){
        console.log('失败')
        return;
    }
    console.log('成功')
})
```

### 六、查看资源状态

```js
const fs = require('fs')
fs.stat('./123.mp4', (err,data) => {
    if(err){
        console.log('写入失败')
        return;
    }
    console.log(data)
    console.log(data.isFile())
    console.log(data.isDirectory());
});


  dev: 16777234,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 2773228,
  size: 16662865,
  blocks: 32552,
  atimeMs: 1691932694460.9746,
  mtimeMs: 1691932694459.5168,
  ctimeMs: 1691932741215.8293,
  birthtimeMs: 1691932688766.803,
  atime: 2023-08-13T13:18:14.461Z,  end 访问时间
  mtime: 2023-08-13T13:18:14.460Z,   end 更新时间
  ctime: 2023-08-13T13:19:01.216Z,		end 更新状态
  birthtime: 2023-08-13T13:18:08.767Z  创建时间
```

### 七、两种路径

```js
//writeFileSync 参照的是命令行的工作目录

const fs = require('fs')
//相对路径
fs.writeFileSync('./index.html', 'love');
fs.writeFileSync('index.html', 'love');
fs.writeFileSync('../index.html', 'love');
//绝对路径
fs.writeFileSync('D:index.html', 'love');
```

## path模块

```js
const fs =require('fs')
const path = require('path');
//write file  directory name获取路径的目录名
// fs.writeFileSync(__dirname + 'index..html', 'lover')

// resolve  解决
console.log(path.resolve(__dirname, './index.html'));
console.log(path.resolve(__dirname, 'index.html'));
console.log(path.resolve(__dirname, '/index.html', './test'));
///Users/clover/Desktop/my learn/code/path/index.html
// /Users/clover/Desktop/my learn/code/path/index.html
// /index.html/test

// sep 保存当前系统的分隔符
console.log(path.sep) // windows \ linux /

// parase 访问 文件的绝对路径 __dirname “全局变量”
console.log(__dirname);
let str = '/Users/clover/Desktop/my learn/code/path.js';
console.log(path.parse(str))
{
  root: '/',
  dir: '/Users/clover/Desktop/my learn/code',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}

// baseName 获取文件名
console.log(path.basename(str)); //path.js

// dirname 
console.log(path.dirname(str)); //Users/clover/Desktop/my learn/code

// extname
console.log(path.extname(str)); //.js

/Users/clover/Desktop/my learn/code/path



```

## Http

### Request


请求行：

- 请求方法： post get put delete
-  URL :协议名称(https、http)、主机名、端口号、路径、查询字符串
-  HTTP版本：3（2018）、2（2015）、1.1（1999）、1.0（1996）

请求头：MDN Headers查看

- User-Agent: 记录当前浏览器的平台和版本号
- Accept：处理的类型
- Accept-Encoding: 压缩方式
- Accept-Language: 支持的语言
- Connection: 链接方式
- Upgrade-Insecure-Requests: 升级https 提交交互的安全性

### Response

响应行同请求行

状态码：

- 1XX 信息相应
- 2XX 成功相应
- 3XX 重定向消息
- 4XX 客户端错误响应
- 5XX 服务端错误响应

响应头：

- Server 服务器所使用的技术
- Date 响应时间
- Content-Type 声明响应体 格式和字符串集
- Content-Length 记录响应体之间的长度（字节）

响应体：HTML,css,JavaScript,图片,视频,JSON

### IP

标识网络中的设备、进行通信。

#### IP的分类

- 本地回环IP地址
   - 127.0.0.1~127.255.255.254
- 局域网IP(私网IP)
   -  192.168.0.0~192.168.255.255
   - 172.16.0.0~172.31.255.255
   - 10.0.0.0~10.255.255.255
- 广域网IP（公网IP） 除上述以外

### 端口

> 是应用程序的数字标识，是实现不同主机应用程序之间的通信

### 代码

#### 创建HTTP服务

```js
const http = require('http');

const server = http.createServer((request,response) => {
    response.setHeader('content-type','text/html;charset=utf-8');
    response.end('你好');
})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})

//浏览器输入http://localhost:9000
```

#### 读取HTTP请求的报文

```js
const http = require('http');

const server = http.createServer((request,response) => {
    //获取
    console.log(request.method);
    console.log(request.url);
    console.log(request.httpVersion)
    console.log(request.headers)
		//获取请求体
    let body = '';
    request.on('data', chuck => {
        body += chuck;
    })
    request.on('end', ()=> {
        console.log(body);
        response.setHeader('content-type','text/html;charset=utf-8');
        response.end('你好');
    })
})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})

GET
/
1.1
{
  host: 'localhost:9000',
  'sec-fetch-site': 'none',
  connection: 'keep-alive',
  'upgrade-insecure-requests': '1',
  'sec-fetch-mode': 'navigate',
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5.2 Safari/605.1.15',
  'accept-language': 'en-US,en;q=0.9',
  'sec-fetch-dest': 'document',
  'accept-encoding': 'gzip, deflate'
}
```

#### 提取HTTP报文中URL的路径与查询字符串

```js
const http = require('http');
const url = require('url');

const server = http.createServer((request,response) => {
    let res = url.parse(request.url); //parse第二个参数变为true会让query变为对象方便提取
    console.log(res);
    response.end('url');
})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})

Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?id=1',
  query: 'id=1', // { id: '1' },
  pathname: '/search',
  path: '/search?id=1',
  href: '/search?id=1'
}
```

#### Request练习

```js
const http = require('http');

const server = http.createServer((request,response) => {
    let {method,url} = request;
    response.setHeader('content-type','text/html;charset=utf-8');
    let { pathname } = new URL(url,'http://127.0.0.1');
    if(method === 'GET' && pathname === '/login') {
        response.end('登录页面');
    } else if (method === 'GET' && pathname === '/reg') {
        response.end('注册页面');
    } else {
        response.end('404 not found');
    }
})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})
```

#### Response练习

```js
const http = require('http');

const server = http.createServer((request,response) => {
    response.end(`
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
     td {
        padding: 20px 40px;
     }
      table tr:nth-child(odd) {
        background: #afd;
      }
      table tr:nth-child(even) {
        background: #fcb;
      }
      table, td {
        border-collapse: collapse;
      }
    </style>
</head>
<body>
    <table border = "1">
    <tr><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td></tr>
    </table>
    <script>
      let tds = document.querySelectorAll('td');
      tds.forEach(item => {
        item.onclick = function() {
            this.style.background='#222';
        }
      })
    </script>
</body>
</html>
    `);

})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})
```

优化方案： 把html拆成单独的文件，然后使用fs包去读取

```js
const http = require('http');

const fs = require('fs');

const server = http.createServer((request,response) => {
    console.log(__dirname)
    const html = fs.readFileSync(__dirname+'/1.html');
    response.end(html);// 可以是buff 也可以是string

})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
     td {
        padding: 20px 40px;
     }
      table tr:nth-child(odd) {
        background: #afd;
      }
      table tr:nth-child(even) {
        background: #fcb;
      }
      table, td {
        border-collapse: collapse;
      }
    </style>
</head>
<body>
    <table border = "1">
    <tr><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td></tr>
    <tr><td></td><td></td><td></td></tr>
    </table>
    <script>
      let tds = document.querySelectorAll('td');
      tds.forEach(item => {
        item.onclick = function() {
            this.style.background='#222';
        }
      })
    </script>
</body>
</html>
```

#### 相对路径

相对路径在发送请求时，需要与当前页面URL路径进行计算，得到完整URL后，在发送请求

应用场景：

- a标签href
- Link 标签href
- Script 标签 src
- Img 标签src
- Video audio 标签 src
- Form 中的 action
- AJAX 请求中的URL

#### 设置MIME类型

媒体类型（通常为Multipurpose Internet Mail Extensions 或 MIME类型） 是一种标准，用来表示文档、文件或字节流的性质或格式。

```
mime 类型结构： [type]/[subType]
例如： text/html text/css image/jpeg image/png application/json
```

HTTP服务可以设置响应头Content-Type 来表明响应体的MIME类型，浏览器会根据该类型如何处理资源：

下面是常见对应的mime类型

```json
html:` text/html`
css: `text/css`
js: `text/javascript`
png: `image/png`
jpg: `image/jpeg`
gif: `image/gif`
mp4: `video/mp4`
mp3: `audio/mp3`
json: `application/json`
```

> 对于未知的资源类型，可以选择application/octet-stream类型，浏览器在遇到该类型的响应时，会对响应体内容进行独立存储，也就是我们常见的`下载`效果

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

let mime = {
    html:` text/html`,
css: `text/css`,
js: `text/javascript`,
png: `image/png`,
jpg: `image/jpeg`,
gif: `image/gif`,
mp4: `video/mp4`,
mp3: `audio/mp3`,
json: `application/json`
}

const server = http.createServer((request,response) => {
    let {pathname} = new URL(request.url,'http://127.0.0.1');
    let root = __dirname + '/page';
    let filePath = root + pathname;
    fs.readFile(filePath, (err, data)=> {
        if(err){
            response.setHeader('content-type','text/html;charset=utf-8');
            response.statusCode = 500;
            response.end('文件读取失败～');
            return;
        }
        let extension = path.extname(filePath).slice(1);
        let type = mime[extension];
        if(extension === 'html') {
            type += 'charset=utf-8';
        }
        if(!type){
            type = 'application/octet-stream';
        }
        response.setHeader('content-type',type);
        response.end(data);
    })
})

// listen 
server.listen(9000, () => {
    console.log('服务器已经启动...')
})
```

## Node.js 模块化

### 一、介绍

#### 1.1 什么是模块化与模块？

将一个复杂的程序文件依据一定规则（规范）拆分成多个文件的过程称之为`模块化`，其中拆分出的`每个文件是一个模块`吗，模块的内部数据是私有的，不过模块可以暴露内部数据以便其他模块使用

#### 1.2什么是模块化项目？

编码是按照模块一个一个编码的，整个项目就是一个模块化的项目

#### 1.3模块化好处

下面是模块化的一些好处：

1. 防止命名冲突
2. 高复用性
3. 高维护性

#### 1.4 模块暴露

```js
//me.js
function tiemo() {
    console.log('贴膜....')
}

function niejiao() {
    console.log('捏脚....')
}

module.exports = {
    tiemo,
    niejiao
}

// exports暴露数据
exports.niejiao = niejiao;
exports.tiemo = tiemo;

//index.js
const me = require('./me.js')

me.tiemo();
me.niejiao();
```

> exports = Module.exports = {}
>
> exports = 512 并不会改变module.exports 因为引用断了

require使用的一些注意事项：

1. 对于自己创建的模块，导入时路径建议写`相对路径`，且不能省略../和 ./
2. `js`和`json`文件导入时可以不用写后缀，c/c++编写的node拓展文件也可以不写后缀，但是一般用不到
3. 如果导入其他类型的文件，会以js文件进行处理
4. 如果导入的路径是个文件夹，则会首先检测该文件夹下packge.json文件中main属性对应的文件，如果main属性不存在，或者package.json不存在，则会检测文件夹下的index.js和index.json 如果还是没找到，就会报错
5. 导入node.js内置模块时，直接require模块的名字即可，无需加./和../

```js
# module
//package.json
{
    "main": "./app.js"
}
//app.js
module.exports = '我是一个模块'
//main.js
const app = require('./module')
console.log(app)
```

#### 导入模块的基本流程（require）

1、将相对路径转为绝对路径，定位目标文件

2、缓存检测

3、读取目标文件代码

4、包裹为一个函数并执行（立即执行函数）。通过arguments.callee.toString() 查看自执行函数

5、缓存模块的值

6、返回module.exports的值

```js
function require(file){
    let absolutePath = path.resolve(__dirname,file);
    if(caches[absolutePath]){
        return caches[absolutePath];
    }
    let code = fs.readFileSync(absolutePath).toString();
    //包装为一个函数，然后执行
    let module = {}
    let exports = module.exports = {};
    (function (exports, require, module, __filename, __dirname) {
        const test = {
            name: 123123
        }
        module.exports = test;
    })(exports, require, module, __filename, __dirname)
    caches[absolutePath] = module.exports;
    return module.exports;
}
```

### 二、管理发布包

#### 2.1创建与发布

1. 创建文件夹，并创建文件index.js，在文件中声明函数，使用module.exports暴露
2. npm初始化工具包，package.json填写包的信息（包名唯一）
3. 注册账号 https://www.npmjs.com/signup
4. 激活账户
5. 修改为官方的镜像（命令行中运行 nrm use npm）
6. 命令行下 npm login 填写用户信息
7. 命令行下 npm publish 提交包

#### 2.2 更新包

1. 更新包中的代码
2. 测试代码是否可以用
3. 修改package.json中的版本号
4. 发布更新

​			npm publish

#### 2.3删除包

Npm unpublish

>  删除条件
>
> 1、包的作者
>
> 2、发布小于24小时
>
> 3、大于24小时，没有其他包依赖，并且每周小于300下载量，并且只有一个维护者

#### 2.4拓展应用、

| 语言       | 包管理工具          |
| :--------- | ------------------- |
| PHP        | Composer            |
| Python     | Pip                 |
| Java       | Maven               |
| Go         | Go mod              |
| JAVAScript | npm/yarn/cnpm/other |
| Ruby       | rubyGems            |

操作系统语言：

| 操作系统 | 包管理工具 |
| :------- | ---------- |
| centos   | Yum        |
| Linux    | Apt        |
| Mac      | Home-brew  |
| windos   | Chocolaty  |

## Expross js

### 一、express介绍

基于 [Node.js](https://nodejs.org/en/) 平台，快速、开放、极简的 Web 开发框架

-> 简答来说，是一个封装好的工具包，封装了很多功能，便于我们开发WEB应用（HTTP服务）

### 二、express使用

```js
// import express
const express = require('express');
const {singers} = require('./singers');

// create application object
const app = express();

// create route
app.get('/home', (req, res)=> {
    res.end('hello express');
})

app.get('/request', (req, res)=> {
    console.log(req.method)
    console.log(req.url)
    console.log(req.httpVersion)
    console.log(req.headers)
    console.log(req.path)
    console.log(req.query)
    console.log(req.ip)
    console.log(req.get('host'))
    res.end('hello express');
})

app.get('/:id.html', (req, res)=> {
    console.log(req.params.id)
    res.setHeader('content-type','text/html;charset=utf-8');
    res.end('商品详情');
})

app.get('/singer/:id.html', (req, res)=> {
    let {id} = req.params
    // find id by array
    let reuslt = singers.find(item=> {
        if(item.id === Number(id)) return true;
    })
    console.log(reuslt)
    res.setHeader('content-type','text/html;charset=utf-8');
    res.send('商品详情');
})

app.get('/other', (req, res)=> {
    //跳转响应
    // res.redirect('http://www.baidu.com');
    //下载响应
    // res.download(__dirname + 'sdsd.json')
    //json响应
    // res.json({name: '说的是', age: 23});
    // 响应文件内容
    // res.sendFile(__dirname + './test.html');
})

app.get('/', (req, res)=> {
    res.end('home');
})

app.post('/login', (req, res)=> {
    res.end('login');
})

app.all('/test', (req, res)=> {
    res.end('test');
})

//match all methods
app.all('*', (req, res)=> {
    res.end('404 not found');
})

// listen port start the service
app.listen(3000, ()=> {
    console.log('3000端口正在启动.... ')
})
```

### 三、express中间件

#### 3.1 什么是中间件

中间件本质是一个会回掉函数

中间件函数 可以像路由回掉一样访问 请求对象，响应对象

#### 3.2中间件的作用

使用函数封装公共代码，简化代码

#### 3.4中间件的类型

- 全局中间件
- 路由中间件

#### 3.5定义全局中间件

每一个请求到达服务端之后都会执行中间件函数

```js
// import express
const express = require('express');
const fs = require('fs');
const path = require('path')

// create application object
const app = express();

function recordMIddleWare(req,res,next) {
    let {url,ip} = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip} \r\n`)
    next()
}

app.use(recordMIddleWare);

// create route
app.get('/home', (req, res)=> {
    res.send('前台首页');
})

app.get('/admin', (req, res)=> {
    res.send('后台首页');
})

//match all methods
app.all('*', (req, res)=> {
    res.end('404 not found');
})

// listen port start the service
app.listen(3000, ()=> {
    console.log('3000端口正在启动.... ')
})


//log
/home ::ffff:127.0.0.1 
/home ::ffff:127.0.0.1 
/home ::ffff:127.0.0.1 
/admin ::ffff:127.0.0.1 
/home ::ffff:127.0.0.1 
/home ::ffff:127.0.0.1 
/admin ::ffff:127.0.0.1 
/admin ::ffff:127.0.0.1 
/123123.html ::ffff:127.0.0.1 
```

#### 3.6路由中间件

```js
// import express
const express = require('express');

// create application object
const app = express();

let checkCodeMiddlware = (req, res, next) => {
    if(req.query.code === '521'){
        next();
    } else {
        res.send('暗号错误')
    }
}

// create route
app.get('/home', (req, res)=> {
    res.send('前台首页');
})

app.get('/admin', checkCodeMiddlware, (req, res)=> {
    res.send('后台首页');
})

app.get('/setting', checkCodeMiddlware, (req, res)=> {
    res.send('设置页面');
})

//match all methods
app.all('*', (req, res)=> {
    res.end('404 not found');
})

// listen port start the service
app.listen(3000, ()=> {
    console.log('3000端口正在启动.... ')
})
```

#### 3.7静态资源中间件

> 1、index.html文件为默认打开的资源
>
> 2、如果静态资源与路由规则同时匹配，谁先匹配谁就响应
>
> 3、路由响应动态资源，静态资源中间件响应静态资源

```js
// import express
const express = require('express');

// create application object
const app = express();

// create route

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
    res.send('前台首页');
})

// listen port start the service
app.listen(3000, ()=> {
    console.log('3000端口正在启动.... ')
})
```


## EJS模版引擎

### 一、什么是模版引擎

模版引擎是分离**用户界面和业务数据**的一种技术

### 二、什么是EJS

一个高效的javascript的版本引擎 =》 html,js

http://ejs.co/

### 三、实现

```js
const ejs = require('ejs');
const fs = require('fs');

// string
let china = '中国';
// let str = `我爱你 ${china}`
const str = fs.readFileSync('./01_index.html').toString();

let result = ejs.render(str, {china})
console.log(result)


//列表
const ejs = require('ejs'); 
const xiyou = ['唐僧','孙悟空','猪八戒','沙僧']

let result = ejs.render(`<url>
    <% xiyou.forEach(item => { %>
        <li> <%= item %></li>
    <% }) %>
</ul>`, {xiyou});
console.log(result)
```

## Node高级
### Node是单线程，如何让他在多核cpu上跑满

**使用集群模块（cluster）**：主进程负责监听端口，然后将接收到的请求分配给工作进程处理，从而实现多核利用。

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // 创建工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // 工作进程的逻辑
  http.createServer((req, res) => {
    res.end('Hello World!');
  }).listen(8080);
}
```

**使用进程池**：
可以自己实现进程池来分配任务到不同的进程中执行。

```js
const childProcess = require('child_process');

// 创建多个子进程
const processes = [];
for (let i = 0; i < 3; i++) {
  const proc = childProcess.fork('subprocess.js');
  processes.push(proc);
}

// 向子进程分配任务
function allocateTask(task) {
  const availableProc = processes.find(p =>!p.busy);
  if (availableProc) {
    availableProc.send(task);
    availableProc.busy = true;
  }
}
```

**将任务分割为多个小任务并行处理**：
把大型任务拆分成多个可独立运行的小任务，通过异步或并行执行来提高效率。

```js
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 定义处理单个数据项的函数
function processItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processed ${item}`);
      resolve();
    }, 100);
  });
}

// 将数据分割成小任务并并行处理
const tasks = data.map(item => processItem(item));
Promise.all(tasks).then(() => {
  console.log('All tasks completed');
});
```



### node消息驱动

1. **事件驱动模型 (Event-driven Model)**:

   - Node.js 的核心是基于事件驱动的异步 I/O 模型。
   - 通过使用内置的 `EventEmitter` 类,可以实现事件的发布和订阅,从而实现消息驱动的机制。

   ```ts
   const EventEmitter = require('events');
   
   class MessageEmitter extends EventEmitter {
     constructor() {
       super();
     }
   
     sendMessage(message) {
       this.emit('message', message);
     }
   }
   
   const messageEmitter = new MessageEmitter();
   messageEmitter.on('message', (message) => {
     console.log('Received message:', message);
   });
   
   messageEmitter.sendMessage('Hello, Node.js!');
   ```

2. **消息队列 (Message Queue)**:

   - 使用消息队列系统,如 RabbitMQ、Apache Kafka 等,可以实现生产者-消费者模式的消息驱动架构。
   - 生产者发送消息到队列,消费者从队列中获取并处理消息。

   ```ts
   const amqp = require('amqplib');
   
   async function sendMessage(message) {
     const connection = await amqp.connect('amqp://localhost');
     const channel = await connection.createChannel();
     await channel.assertQueue('myQueue');
     await channel.sendToQueue('myQueue', Buffer.from(message));
     console.log('Sent message:', message);
     await connection.close();
   }
   
   async function receiveMessage() {
     const connection = await amqp.connect('amqp://localhost');
     const channel = await connection.createChannel();
     await channel.assertQueue('myQueue');
     channel.consume('myQueue', (message) => {
       if (message !== null) {
         console.log('Received message:', message.content.toString());
         channel.ack(message);
       }
     });
   }
   
   sendMessage('Hello, RabbitMQ!');
   receiveMessage();
   ```

3. **发布-订阅模式 (Publish-Subscribe)**:

   - 使用发布-订阅模式可以实现一对多的消息驱动机制。
   - 发布者发布消息到主题(topic),订阅者订阅感兴趣的主题并接收消息。



   ```ts
   const redis = require('redis');
   
   const publisher = redis.createClient();
   const subscriber = redis.createClient();
   
   subscriber.on('message', (channel, message) => {
     console.log('Received message:', message);
   });
   
   subscriber.subscribe('myTopic');
   
   function publishMessage(message) {
     publisher.publish('myTopic', message);
     console.log('Published message:', message);
   }
   
   publishMessage('Hello, Redis Pub/Sub!');
   ```

### 说说Node中的EventEmitter? 如何实现⼀个EventEmitter?

```js
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
function callback() {
 console.log('触发了event事件！')
}
myEmitter.on('event', callback)
myEmitter.emit('event')
myEmitter.removeListener('event', callback);
```



Node 的 events 模块只提供了⼀个 EventEmitter 类，异步事件驱动架构的基本模式⸺观察者模式

关于其常⻅的⽅法如下：

• emitter.addListener/on(eventName, listener) ：添加类型为 eventName 的监听事件到事件数组

尾部

• emitter.prependListener(eventName, listener)：添加类型为 eventName 的监听事件到事件数组

头部

• emitter.emit(eventName[, ...args])：触发类型为 eventName 的监听事件

• emitter.removeListener/off(eventName, listener)：移除类型为 eventName 的监听事件

• emitter.once(eventName, listener)：添加类型为 eventName 的监听事件，以后只能执⾏⼀次并删除

• emitter.removeAllListeners([eventName])： 移除全部类型为 eventName 的监听事件

### 什么时候开始支持Es6 moudle

Node.js 从版本 13.2.0 ,将文件的后缀名改为.mjs，Node.js 会将其视为 ES 模块,"type":"module"**：

### 全局对象

• Class:Buffer 可以处理⼆进制以及⾮ Unicode 编码的数据

• process 进程对象，提供有关当前进程的信息和控制

• console• clearInterval、setInterval

• clearTimeout、setTimeout

• global



### 模块级别的全局对象

• __dirname. 获取当前⽂件所在的路径

• __filename 当前⽂件所在的路径和⽂件名称

• exports

• module

• require

### 怎么设计线程数

1. **CPU 核心数**: 通常情况下,线程池的大小应该与 CPU 的核心数量相匹配。这是因为线程池中的每个工作线程都会占用一个 CPU 核心。如果线程池过小,CPU 资源将无法得到充分利用;如果线程池过大,则会导致线程之间的切换开销增加,降低性能。
2. **任务类型**: 如线程池分为两部分:一部分用于处理 CPU 密集型任务,另一部分用于处理 I/O 密集型任务
4. **任务复杂度**: 如果应用程序中存在一些特别耗时的任务,可以考虑为这些任务单独设置一个较大的线程池,以避免其他任务被阻塞。

### nextTick 及其底层原理

`nextTick` 将回调推入事件队列，确保在 DOM 更新后执行。它通常使用微任务队列实现

### nodejs的异步模式

主要是通过回调函数、Promise 和 async/await 来实现的。

1. 回调函数：是 Node.js 中最基本的异步模式。当执行一个异步操作时，可以传递一个回调函数作为参数。当异步操作完成后，Node.js 会调用这个回调函数，并将结果作为参数传递给它。
2. Promise：是一种更优雅的异步编程模式。它通过 then 方法来指定异步操作成功和失败的回调函数。
3. async/await：是 ES7 中引入的异步编程模式。它是基于 Promise 实现的，可以让异步代码看起来像同步代码一样。

### Node Event 原理

是非阻塞 I/O 操作的核心。6 个

1. **定时器阶段（Timers）**：处理`setTimeout()`和`setInterval()`的回调函数。
2. **I/O回调阶段（I/O callbacks）**：处理一些上一轮循环中的少数未执行的I/O回调。
3. **闲置阶段（Idle, prepare）**：仅Node.js内部使用。
4. **轮询阶段（Poll）**：获取新的I/O事件，例如网络请求。这个阶段会持续到系统返回I/O事件或者达到设定的超时时间。
5. **检查阶段（Check）**：执行`setImmediate()`的回调函数。
6. **关闭事件回调阶段（Close callbacks）**：执行如`socket.on('close', ...)`的回调函数。

微任务对应有：

• next tick queue：process.nextTick

• other queue：Promise的then回调、queueMicrotask

宏任务对应有：

• timer queue：setTimeout、setInterval

• poll queue：IO事件

• check queue：setImmediate

• close queue：close事件

### node 事件循环机制

事件机制是基于观察者模式构建的,允许开发者在 Node.js 应用中实现异步编程。Node.js 的核心模块 `events` 提供了 `EventEmitter` 类，该类是 Node.js 事件系统的基础。

EventEmitter 类

`EventEmitter` 类是 Node.js 事件系统的核心，它允许对象发出事件，并允许其他对象监听这些事件。`EventEmitter` 类提供了以下关键方法：

- `on(eventName, listener)`：为指定事件添加一个监听器。
- `once(eventName, listener)`：为指定事件添加一个只执行一次的监听器。
- `emit(eventName, [arg1], [arg2], [...])`：触发指定事件，并传入参数给监听器。
- `removeListener(eventName, listener)`：移除指定事件的监听器。
- `removeAllListeners([eventName])`：移除所有事件的所有监听器。

### node高并发原理

因为它的异步非阻塞 I/O 和事件驱动的架构

1. **异步非阻塞 I/O**：N使用异步 I/O 操作来处理文件读取、网络请求等。
2. **事件循环**：事件循环会不断地检查是否有事件需要处理，例如 I/O 操作完成、定时器到期等。当事件发生时，相应的回调函数会被执行。这种机制使得 Node.js 能够高效地处理大量并发事件。
3. **单线程模型**： 采用单线程模型，避免了多线程编程中的线程切换和同步开销。
5. **高效的模块和库**：许多模块都是针对高并发场景进行优化的。例如，用于网络编程的 `http` 模块和用于数据库操作的各种数据库驱动。
6. 通过集群和分布式架构，以处理更高的并发量。



### Node 怎么做性能监控

日志监控 可以通过监控异常日志的变动，将新增的异常类型和数量反映出来 监控日志可以实现pv和uv的监控，通过pv/uv的监控，可以知道使用者们的使用习惯，预知访问高峰

响应时间 响应时间也是一个需要监控的点。一旦系统的某个子系统出现异常或者性能瓶颈将会导致系统的响应时间变长。响应时间可以在nginx一类的反向代理上监控，也可以通过应用自己产生访问日志来监控

进程监控 监控日志和响应时间都能较好地监控到系统的状态，但是它们的前提是系统是运行状态的，所以监控进程是比前两者更为紧要的任务。监控进程一般是检查操作系统中运行的应用进程数，比如对于采用多进程架构的web应用，就需要检查工作进程的数，如果低于低估值，就应当发出警报

磁盘监控 磁盘监控主要是监控磁盘的用量。由于写日志频繁的缘故，磁盘空间渐渐被用光。

内存监控 对于node而言，一旦出现内存泄漏，不是那么容易排查的。

cpu占用监控 服务器的cpu占用监控也是必不可少的项，cpu的使用分为用户态、内核态、IOWait等。如果用户态cpu使用率较高，说明服务器上的应用需要大量的cpu开销；如果内核态cpu使用率较高，说明服务器需要花费大量时间进行进程调度或者系统调用；IOWait使用率反映的是cpu等待磁盘I/O操作；cpu的使用率中，用户态小于70%，内核态小于35%且整体小于70%，处于正常范围。监控cpu占用情况，可以帮助分析应用程序在实际业务中的状况。合理设置监控阈值能够很好地预警

cpu load监控 cpu load又称cpu平均负载。它用来描述操作系统当前的繁忙程度，又简单地理解为cpu在单位时间内正在使用和等待使用cpu的平均任务数。它有3个指标，即1分钟的平均负载、5分钟的平均负载，15分钟的平均负载。cpu load过高说明进程数量过多，这在node中可能体现在用于进程模块反复启动新的进程。监控该值可以防止意外发生

I/O负载 I/O负载指的主要是磁盘I/O。反应的是磁盘上的读写情况，对于node编写的应用，主要是面向网络业务，是不太可能出现I/O负载过高的情况，大多数的I/O压力来自于数据库。不管node进程是否与数据库或其他I/O密集的应用共同处理相同的服务器，我们都应该监控该值防止意外情况

网络监控 虽然网络流量监控的优先级没有上述项目那么高，但还是需要对流量进行监控并设置流量上限值。

应用状态监控 除了这些硬性需要检测的指标之外，应用还应该提供一种机制来反馈其自身的状态信息，外部监控将会持续性地调用应用地反馈接口来检查它地健康状态。



### 要基于 Express、Koa 或 Next.js 编写高性能的 API 接口，可以考虑以下几点：

1. 优化路由：确保路由的设计简洁明了，避免复杂的嵌套和过多的中间件。使用合适的路由策略，如 RESTful API 设计原则，可以提高 API 的可读性和可维护性。
2. 数据验证和处理：对输入的数据进行验证和处理，确保数据的完整性和合法性。可以使用中间件或库来实现数据验证，避免在业务逻辑中处理无效数据。
3. 使用缓存：合理使用缓存可以提高 API 的响应速度。可以使用内存缓存或分布式缓存来存储经常访问的数据，减少数据库查询或计算的次数。
4. 错误处理：编写全面的错误处理机制，返回合适的错误状态码和错误信息。处理常见的错误情况，如数据库连接错误、数据验证错误等，并提供友好的错误提示。
5. 数据库优化：如果 API 涉及数据库操作，优化数据库查询和索引可以提高性能。确保数据库结构设计合理，避免不必要的查询和连接。
6. 并发处理：处理并发请求时，使用适当的并发控制机制，如锁、信号量等，避免数据竞争和不一致性。
7. 监控和性能分析：使用监控工具来监测 API 的性能指标，如响应时间、吞吐量等。分析性能数据，找出潜在的瓶颈并进行优化。
8. 代码优化：编写高效的代码，避免不必要的计算和内存分配。使用合适的数据结构和算法来提高性能。
9. 测试和优化：进行充分的测试，包括单元测试、集成测试和性能测试。根据测试结果进行优化和改进。

### nodejs项目的性能优化？

1. 代码优化

   - 确保代码的简洁性和高效性，避免不必要的计算和内存分配。
   - 使用合适的数据结构和算法，根据具体需求选择最优的解决方案。
   - 避免阻塞操作，尽量使用异步方式处理 I/O 和耗时任务。

2. 数据库优化

   - 优化数据库查询，使用索引、合适的查询语句和连接方式。
   - 考虑数据库的缓存策略，减少重复查询。
   - 对于大规模数据，可以考虑使用分片或分布式数据库。

3. 缓存

   - 使用缓存来存储频繁访问的数据，减少重复计算和数据库查询。
   - 可以使用内存缓存（如 Redis）或文件缓存等方式。

4. 并发和并行处理

   - 利用 Node.js 的异步特性，处理并发请求和任务。
   - 可以使用多进程或多线程来提高并行处理能力。

5. 错误处理

   - 正确处理错误情况，避免程序崩溃或出现异常。
   - 提供详细的错误日志，以便及时发现和解决问题。

6. 监控和性能分析

   - 使用监控工具来监测应用的性能指标，如响应时间、内存使用等。
   - 通过性能分析工具找出性能瓶颈，并进行针对性的优化。

7. 服务器配置优化

   - 根据项目的需求，合理配置服务器的硬件资源，如内存、CPU 等。
   - 调整服务器的参数，如线程池大小、文件描述符限制等。

8. 网络优化

   - 减少网络请求的次数和数据量，优化数据传输格式。
   - 使用 CDN 加速静态资源的加载。

9. 代码分割和懒加载

   - 将大型代码库分割成较小的模块，按需加载，提高初始加载速度。
   - 对于不常用的功能，可以采用懒加载的方式，延迟加载。

10. 安全考虑

   - 确保应用的安全性，防止常见的安全漏洞，如 SQL 注入、XSS 攻击等。
- 对用户输入进行验证和过滤。



### node如何保证稳定性、平稳降级、重启等

1. 使用进程管理器

进程管理器如 PM2、Forever 或 StrongLoop Process Manager（SLPM）可以用来管理 Node.js 应用的生命周期。这些工具可以自动重启崩溃的进程，确保应用的持续运行。

- **PM2**：提供了一个命令行界面，可以用来启动、停止、重启应用，以及监控应用的性能指标。
- **Forever**：是一个简单的命令行工具，用于确保一个或多个 Node.js 应用持续运行。
- **StrongLoop Process Manager**：是 IBM 提供的一个工具，它提供了监控、日志记录和负载均衡等功能。

2. 使用负载均衡

负载均衡器可以将流量分配到多个 Node.js 实例上，这样即使一个实例崩溃，其他实例仍然可以处理请求。常用的负载均衡器有 Nginx、HAProxy 和 AWS ELB。

3. 使用集群模式

Node.js 的 `cluster` 模块允许你创建多个工作进程来处理请求。主进程负责监听端口并分发请求到工作进程。如果一个工作进程崩溃，主进程可以重新启动一个新的工作进程。

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`Worker ${process.pid} started`);
}
```

4. 使用错误处理和日志记录

在代码中实现错误处理机制，确保应用能够优雅地处理异常情况。同时，使用日志记录库（如 Winston 或 Bunyan）来记录应用的运行状态和错误信息，便于问题的追踪和调试。

5. 使用健康检查

在负载均衡器或进程管理器中设置健康检查，定期检查应用的健康状态。如果检测到应用不健康，可以自动重启应用或将其从负载均衡中移除。

6. 使用蓝绿部署或滚动更新

在部署新版本的应用时，使用蓝绿部署或滚动更新策略，可以减少对用户的影响。这些策略允许你逐步将流量从旧版本转移到新版本，如果新版本出现问题，可以快速回滚到旧版本。

### 为什么说 Node.js 是非阻塞 I/O 的运行环境？

当发起 I/O 请求时，Node.js 会立即返回，不会等待 I/O 操作完成。会将 I/O 操作交给事件循环来处理。当 I/O 操作完成后，事件循环会通知 Node.js，然后会执行相应的回调函数。

### Node.js 的事件驱动模型？

1. **事件监听**：Node.js 应用程序可以监听各种事件，如文件读写、网络请求、定时器等。
2. **事件触发**：当事件发生时，如文件读取完成、网络请求响应到达、定时器时间到等，Node.js 会触发相应的事件。
3. **回调执行**：事件触发后，Node.js 会执行之前注册的回调函数。这些回调函数是异步执行的，不会阻塞其他代码的执行。
4. **事件循环**：事件循环是 Node.js 的核心，它负责监听和处理事件。事件循环会不断检查事件队列，当事件发生时，它会执行相应的回调函数。

### 什么是死锁，以及死锁产生的必要条件有哪些

发生在多任务或多进程的系统中，当两个或多个进程无限期地等待对方释放资源时，这些进程都无法向前推进，从而导致系统资源无法被有效利用，系统处于一种僵持状态

### Node 调起虚拟键盘

Node.js 本身不处理用户界面操作。如果使用 Electron，可以通过调用渲染进程的 API 来调起虚拟键盘。例如：

```js
// 在渲染进程中
document.getElementById('input').focus();
```