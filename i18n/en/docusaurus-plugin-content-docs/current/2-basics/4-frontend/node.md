## Buffer

### 1. Concept

`Buffer` is an array-like `object` representing a fixed-length byte sequence.

Essentially, a Buffer is a chunk of memory dedicated to handling `binary data`.


### 2. Characteristics

1. Fixed size — can't be resized
2. Good performance — operates directly on computer memory
3. Each element is 1 byte


### 3. Usage

#### 3-1 Creating buffers

```js
// 1. alloc — allocate
let buf = Buffer.alloc(10);
// console.log(buf)
// 2. allocUnsafe — may contain old data; doesn't clear
// Faster
let buf_2 = Buffer.allocUnsafe(10);
console.log(buf_2)
// 3. from
let buf_3 = Buffer.from('hello')
console.log(buf_3) // ASCII codes
```

#### 3-2 Buffer ↔ String conversion

```js
let buf_4 = Buffer.from([105,108,111,118,101,121,111,117]);
console.log(buf_4.toString()) // utf-8
// iloveyou

// []
let buf = Buffer.from('hello');
// console.log(buf[0].toString(2)); // binary: 01101000
console.log(buf);
buf[0] = 95;
console.log(buf);

// Overflow
let buf_3 = Buffer.from('hello');
buf_3[0] = 361; // max 8-bit binary; overflow drops high bits
// Chinese
let buf_4 = Buffer.from('你好');
console.log(buf_4);
```

## `fs` module

### 1. File writing

#### 1-1 `writeFile` / `writeFileSync`

```js
// import fs
const fs = require('fs');
// write to file
fs.writeFile('./motto.txt', 'When three walk together, one of them must be my teacher.', err => {
    // err = error object on failure, null on success
    if(err){
        console.log('write failed')
        return;
    }
    console.log('write succeeded')
});
// macrotask vs microtask!!
// sync write
fs.writeFileSync('./data.txt', 'test')
```

#### 1-2 `appendFile` / `appendFileSync` — append write

```js
const fs = require('fs');

// 2. appendFile
fs.appendFile('./motto.txt', '\nChoose the good and follow it; identify the bad and reform it.', err => {
    if(err){
        console.log('write failed')
        return;
    }
    console.log('append succeeded')
});
// fs.appendFileSync() also exists
// fs.writeFile('./motto.txt', '...', {flag:'a'}, err => {});
```

#### 1-3 `createWriteStream` — streaming write

```js
const fs = require('fs');
// create a write stream
const ws = fs.createWriteStream('./poem.txt');
// 3. write
ws.write('A half-acre square pond opens like a mirror\n');
ws.write('The sky's light and clouds drift across\n');
ws.write('How is it kept so clear and pure?\n');
ws.write('Because of the source water flowing in\n');
ws.close;
```

> Opening files costs resources — streaming reduces open/close overhead.
>
> Streaming is best for `large files or frequent writes`. `writeFile` suits infrequent writes.

1-5 File-writing use cases

`File writing` is very common in computing. Examples:

- Download files
- Install files
- Save program logs (e.g. git)
- Editor file saves
- Video recording

> When you need to `persist data`, think of file writing.

### 2. File reading

#### 2-1 `readFile` / `readFileSync`

```js
const fs = require('fs')
fs.readFile('./poem.txt', (err, data) => {
    if(err){
        console.log('read failed')
        return;
    }
    console.log(data.toString())
});

// sync read
let data = fs.readFileSync('./poem.txt');
console.log('sync', data.toString())
```

#### 2-2 `createReadStream` — streaming read

```js
const fs = require('fs');
const rs = fs.createReadStream('./123.mp4');
// Bind data event
rs.on('data', chuck => {
    console.log(chuck.length);
})

rs.on('end', () => {
    console.log('read complete');
})
```

#### 2-3 File-reading use cases

- Boot
- Program startup
- Editor opening files
- Viewing images
- Playing video
- Playing music
- Git log
- File upload
- View chat history

#### 2-4 Large file copy + perf check

```js
let fs = require('fs');

// plan 1
let data = fs.readFileSync('./123.mp4');
fs.writeFileSync('./124.mp4', data);
console.log(process.memoryUsage()) // 47611904 bytes ≈ 45MB
// plan 2
const rs = fs.createReadStream('./123.mp4');
const ws = fs.createWriteStream('./125.mp4');
// rs.on('data', chuck => {
//     ws.write(chuck);
// })

// rs.on('end', () => {
//     console.log('read complete');
// })
rs.pipe(ws); // same as above

console.log(process.memoryUsage()) // 30916608 bytes ≈ 29MB
```

### 3. Move / rename a file

```js
const fs = require('fs')
// Both rename and move
fs.rename('./motto.txt', './analects.txt', err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
});
```

### 4. Delete a file

```js
const fs = require('fs')
// case 1: unlink / unlinkSync
fs.unlink('./poem.txt', err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
});

// case 2: rm / rmSync
fs.rm('./analects.txt', err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
});
```

### 5. Folder operations

```js
const fs = require('fs')
fs.mkdir('./html', err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
});

// 2-2 recursive create
fs.mkdir('./a/b/c', {recursive: true}, err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
});

// 2-3 read folder
fs.readdir('./', (err, data) => {
    if(err){
        console.log('failed')
        return;
    }
    console.log(data)
})

// 2-4 delete folder
fs.rmdir('./html', err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
})

fs.rmdir('./a', {recursive: true}, err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
})

// Recommended
fs.rm('./a', {recursive: true}, err => {
    if(err){
        console.log('failed')
        return;
    }
    console.log('succeeded')
})
```

### 6. Inspect resource status

```js
const fs = require('fs')
fs.stat('./123.mp4', (err, data) => {
    if(err){
        console.log('write failed')
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
  atime: 2023-08-13T13:18:14.461Z,  // access time
  mtime: 2023-08-13T13:18:14.460Z,  // modify time
  ctime: 2023-08-13T13:19:01.216Z,	// status change time
  birthtime: 2023-08-13T13:18:08.767Z // creation time
```

### 7. Two kinds of paths

```js
// writeFileSync resolves relative to the working directory of the command line

const fs = require('fs')
// relative paths
fs.writeFileSync('./index.html', 'love');
fs.writeFileSync('index.html', 'love');
fs.writeFileSync('../index.html', 'love');
// absolute path
fs.writeFileSync('D:index.html', 'love');
```

## `path` module

```js
const fs = require('fs')
const path = require('path');
// __dirname gets the directory of the current file
// fs.writeFileSync(__dirname + 'index..html', 'lover')

// resolve
console.log(path.resolve(__dirname, './index.html'));
console.log(path.resolve(__dirname, 'index.html'));
console.log(path.resolve(__dirname, '/index.html', './test'));
// /Users/clover/Desktop/my learn/code/path/index.html
// /Users/clover/Desktop/my learn/code/path/index.html
// /index.html/test

// sep — system-specific separator
console.log(path.sep) // windows \, linux /

// parse — get parts of an absolute path; __dirname is a "global"
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

// basename — file name
console.log(path.basename(str)); // path.js

// dirname
console.log(path.dirname(str)); // Users/clover/Desktop/my learn/code

// extname
console.log(path.extname(str)); // .js

/Users/clover/Desktop/my learn/code/path



```

## HTTP

### Request


Request line:

- Method: POST, GET, PUT, DELETE
- URL: protocol (http/https), host, port, path, query string
- HTTP version: 3 (2018), 2 (2015), 1.1 (1999), 1.0 (1996)

Headers (see MDN Headers):

- User-Agent: browser platform and version
- Accept: types the client accepts
- Accept-Encoding: compression
- Accept-Language: supported languages
- Connection: connection mode
- Upgrade-Insecure-Requests: upgrade HTTP to HTTPS for safety

### Response

Status line — same as the request line.

Status codes:

- 1XX informational
- 2XX success
- 3XX redirection
- 4XX client error
- 5XX server error

Headers:

- Server — technology used
- Date — response time
- Content-Type — body format and charset
- Content-Length — body length in bytes

Body: HTML, CSS, JavaScript, images, videos, JSON

### IP

Identifies devices on a network for communication.

#### IP classes

- Loopback
   - 127.0.0.1 – 127.255.255.254
- Private (LAN)
   - 192.168.0.0 – 192.168.255.255
   - 172.16.0.0 – 172.31.255.255
   - 10.0.0.0 – 10.255.255.255
- Public — everything else

### Port

> Numeric identifier for an app — enables communication between apps on different hosts.

### Code

#### Creating an HTTP service

```js
const http = require('http');

const server = http.createServer((request, response) => {
    response.setHeader('content-type', 'text/html;charset=utf-8');
    response.end('Hello');
})

// listen
server.listen(9000, () => {
    console.log('Server started...')
})

// browser: http://localhost:9000
```

#### Reading the HTTP request

```js
const http = require('http');

const server = http.createServer((request, response) => {
    // headers / metadata
    console.log(request.method);
    console.log(request.url);
    console.log(request.httpVersion)
    console.log(request.headers)
    // read body
    let body = '';
    request.on('data', chuck => {
        body += chuck;
    })
    request.on('end', () => {
        console.log(body);
        response.setHeader('content-type', 'text/html;charset=utf-8');
        response.end('Hello');
    })
})

// listen
server.listen(9000, () => {
    console.log('Server started...')
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

#### Extract path and query from the URL

```js
const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
    let res = url.parse(request.url); // 2nd param true → query becomes object
    console.log(res);
    response.end('url');
})

// listen
server.listen(9000, () => {
    console.log('Server started...')
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

#### Request exercise

```js
const http = require('http');

const server = http.createServer((request, response) => {
    let {method, url} = request;
    response.setHeader('content-type', 'text/html;charset=utf-8');
    let { pathname } = new URL(url, 'http://127.0.0.1');
    if(method === 'GET' && pathname === '/login') {
        response.end('Login page');
    } else if (method === 'GET' && pathname === '/reg') {
        response.end('Register page');
    } else {
        response.end('404 not found');
    }
})

// listen
server.listen(9000, () => {
    console.log('Server started...')
})
```

#### Response exercise

```js
const http = require('http');

const server = http.createServer((request, response) => {
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
    console.log('Server started...')
})
```

Optimization: split the HTML into a file and read it with `fs`:

```js
const http = require('http');

const fs = require('fs');

const server = http.createServer((request, response) => {
    console.log(__dirname)
    const html = fs.readFileSync(__dirname + '/1.html');
    response.end(html); // can be Buffer or string

})

// listen
server.listen(9000, () => {
    console.log('Server started...')
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

#### Relative paths

Relative paths must be resolved against the current page URL when making requests, producing the complete URL before sending.

Use cases:

- `<a href>`
- `<link href>`
- `<script src>`
- `<img src>`
- `<video>`, `<audio>` `src`
- `<form action>`
- AJAX request URL

#### Setting MIME types

A media type (a.k.a. Multipurpose Internet Mail Extensions or MIME type) is a standard for describing the nature or format of a document, file, or byte stream.

```
MIME format: [type]/[subType]
Examples: text/html, text/css, image/jpeg, image/png, application/json
```

HTTP services can set the `Content-Type` response header to declare body type — the browser decides how to handle the resource.

Common MIME types:

```json
html: `text/html`
css: `text/css`
js: `text/javascript`
png: `image/png`
jpg: `image/jpeg`
gif: `image/gif`
mp4: `video/mp4`
mp3: `audio/mp3`
json: `application/json`
```

> For unknown resource types, use `application/octet-stream` — the browser stores the response body separately (the "download" effect).

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

let mime = {
    html: ` text/html`,
    css: `text/css`,
    js: `text/javascript`,
    png: `image/png`,
    jpg: `image/jpeg`,
    gif: `image/gif`,
    mp4: `video/mp4`,
    mp3: `audio/mp3`,
    json: `application/json`
}

const server = http.createServer((request, response) => {
    let {pathname} = new URL(request.url, 'http://127.0.0.1');
    let root = __dirname + '/page';
    let filePath = root + pathname;
    fs.readFile(filePath, (err, data) => {
        if(err){
            response.setHeader('content-type', 'text/html;charset=utf-8');
            response.statusCode = 500;
            response.end('Failed to read file~');
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
        response.setHeader('content-type', type);
        response.end(data);
    })
})

// listen
server.listen(9000, () => {
    console.log('Server started...')
})
```

## Node.js modularization

### 1. Intro

#### 1.1 What is modularization and a module?

Splitting a complex program file into multiple files following certain rules is called `modularization`. Each split file is a module. Module internals are private, but modules can expose internal data for other modules to use.

#### 1.2 What is a modular project?

The whole project is coded module-by-module — the entire project is a modular project.

#### 1.3 Benefits of modularization

1. Avoid name collisions
2. High reusability
3. High maintainability

#### 1.4 Module exports

```js
// me.js
function massage() {
    console.log('massaging....')
}

function pedicure() {
    console.log('pedicuring....')
}

module.exports = {
    massage,
    pedicure
}

// Or expose via exports
exports.pedicure = pedicure;
exports.massage = massage;

// index.js
const me = require('./me.js')

me.massage();
me.pedicure();
```

> `exports = module.exports = {}`
>
> `exports = 512` doesn't change `module.exports` because the reference was rebound.

`require` notes:

1. For your own modules, use `relative paths` and don't omit `../` or `./`.
2. `.js` and `.json` extensions can be omitted; native (.node) modules too — but rarely used.
3. Other file types are treated as JS.
4. If the path is a folder, first the folder's `package.json` `main` field is checked; if missing, falls back to `index.js` or `index.json` — error otherwise.
5. For built-in Node modules, require by name without `./` or `../`.

```js
// module
// package.json
{
    "main": "./app.js"
}
// app.js
module.exports = 'I am a module'
// main.js
const app = require('./module')
console.log(app)
```

#### How `require` works

1. Convert the relative path to an absolute path; locate the target file.
2. Cache check.
3. Read the target file's code.
4. Wrap it in a function and execute (immediately-invoked). Check `arguments.callee.toString()` to see the wrapper.
5. Cache the module's value.
6. Return `module.exports`.

```js
function require(file){
    let absolutePath = path.resolve(__dirname, file);
    if(caches[absolutePath]){
        return caches[absolutePath];
    }
    let code = fs.readFileSync(absolutePath).toString();
    // wrap in a function and execute
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

### 2. Managing published packages

#### 2.1 Create and publish

1. Create a folder with an `index.js`. Inside, define functions and expose with `module.exports`.
2. `npm init` to initialize; fill out `package.json` (unique package name).
3. Sign up at https://www.npmjs.com/signup.
4. Activate the account.
5. Switch to the official registry (`nrm use npm`).
6. `npm login` and fill in credentials.
7. `npm publish` to publish.

#### 2.2 Update a package

1. Update the code.
2. Test the code.
3. Bump the version in `package.json`.
4. Publish.

​			`npm publish`

#### 2.3 Delete a package

`npm unpublish`

>  Conditions:
>
> 1. You're the author
> 2. Published < 24 hours ago
> 3. > 24 hours: no other packages depend on it, fewer than 300 downloads/week, and only one maintainer

#### 2.4 Other tools

| Language    | Package manager       |
| :---------- | --------------------- |
| PHP         | Composer              |
| Python      | Pip                   |
| Java        | Maven                 |
| Go          | go mod                |
| JavaScript  | npm / yarn / cnpm / etc. |
| Ruby        | rubyGems              |

OS-level:

| OS       | Package manager |
| :------- | --------------- |
| CentOS   | yum             |
| Linux    | apt             |
| Mac      | Homebrew        |
| Windows  | Chocolatey      |

## Express.js

### 1. Intro

A fast, open, minimalist web framework on [Node.js](https://nodejs.org/en/).

→ Simply put, a wrapped toolset that wraps many features for building web apps (HTTP services).

### 2. Usage

```js
// import express
const express = require('express');
const {singers} = require('./singers');

// create the app
const app = express();

// routes
app.get('/home', (req, res) => {
    res.end('hello express');
})

app.get('/request', (req, res) => {
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

app.get('/:id.html', (req, res) => {
    console.log(req.params.id)
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.end('Product detail');
})

app.get('/singer/:id.html', (req, res) => {
    let {id} = req.params
    // look up id in the array
    let result = singers.find(item => {
        if(item.id === Number(id)) return true;
    })
    console.log(result)
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.send('Product detail');
})

app.get('/other', (req, res) => {
    // redirect
    // res.redirect('http://www.baidu.com');
    // download
    // res.download(__dirname + 'sdsd.json')
    // JSON response
    // res.json({name: 'foo', age: 23});
    // send file
    // res.sendFile(__dirname + './test.html');
})

app.get('/', (req, res) => {
    res.end('home');
})

app.post('/login', (req, res) => {
    res.end('login');
})

app.all('/test', (req, res) => {
    res.end('test');
})

// catch-all
app.all('*', (req, res) => {
    res.end('404 not found');
})

// listen
app.listen(3000, () => {
    console.log('Listening on port 3000...')
})
```

### 3. Express middleware

#### 3.1 What is middleware

Middleware is essentially a callback function.

Middleware functions can access the request and response objects, just like route callbacks.

#### 3.2 Purpose

Encapsulate common code, simplify code.

#### 3.4 Types

- Global middleware
- Route middleware

#### 3.5 Defining global middleware

Runs on every request reaching the server.

```js
const express = require('express');
const fs = require('fs');
const path = require('path')

const app = express();

function recordMiddleware(req, res, next) {
    let {url, ip} = req;
    fs.appendFileSync(path.resolve(__dirname, './access.log'), `${url} ${ip} \r\n`)
    next()
}

app.use(recordMiddleware);

app.get('/home', (req, res) => {
    res.send('frontend home');
})

app.get('/admin', (req, res) => {
    res.send('admin home');
})

app.all('*', (req, res) => {
    res.end('404 not found');
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})


// log
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

#### 3.6 Route middleware

```js
const express = require('express');

const app = express();

let checkCodeMiddleware = (req, res, next) => {
    if(req.query.code === '521'){
        next();
    } else {
        res.send('Wrong code')
    }
}

app.get('/home', (req, res) => {
    res.send('frontend home');
})

app.get('/admin', checkCodeMiddleware, (req, res) => {
    res.send('admin home');
})

app.get('/setting', checkCodeMiddleware, (req, res) => {
    res.send('settings page');
})

app.all('*', (req, res) => {
    res.end('404 not found');
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})
```

#### 3.7 Static file middleware

> 1. `index.html` is the default file served
>
> 2. If a static asset and route both match, the first match wins.
>
> 3. Routes serve dynamic content; the static middleware serves static assets.

```js
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('frontend home');
})

app.listen(3000, () => {
    console.log('Listening on port 3000...')
})
```


## EJS template engine

### 1. What is a template engine

A template engine separates the **user interface from business data**.

### 2. What is EJS

An efficient template engine for JavaScript ⇒ HTML, JS.

http://ejs.co/

### 3. Implementation

```js
const ejs = require('ejs');
const fs = require('fs');

// string
let china = 'China';
// let str = `I love you ${china}`
const str = fs.readFileSync('./01_index.html').toString();

let result = ejs.render(str, {china})
console.log(result)


// list
const ejs = require('ejs');
const characters = ['Tang Monk', 'Sun Wukong', 'Zhu Bajie', 'Sha Wujing']

let result = ejs.render(`<ul>
    <% characters.forEach(item => { %>
        <li> <%= item %></li>
    <% }) %>
</ul>`, {characters});
console.log(result)
```

## Node advanced
### Node is single-threaded — how do you saturate a multi-core CPU?

**Use the cluster module**: the master listens on a port and distributes requests to worker processes — utilizing multiple cores.

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Spawn worker processes
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  // Worker logic
  http.createServer((req, res) => {
    res.end('Hello World!');
  }).listen(8080);
}
```

**Use a process pool**:
You can roll your own process pool to assign tasks to child processes.

```js
const childProcess = require('child_process');

// Spawn multiple child processes
const processes = [];
for (let i = 0; i < 3; i++) {
  const proc = childProcess.fork('subprocess.js');
  processes.push(proc);
}

// Assign tasks to child processes
function allocateTask(task) {
  const availableProc = processes.find(p => !p.busy);
  if (availableProc) {
    availableProc.send(task);
    availableProc.busy = true;
  }
}
```

**Split tasks into smaller parallel tasks**:
Break large tasks into independently-runnable smaller ones; run them async or in parallel.

```js
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Process a single item
function processItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Processed ${item}`);
      resolve();
    }, 100);
  });
}

// Split into small tasks and run in parallel
const tasks = data.map(item => processItem(item));
Promise.all(tasks).then(() => {
  console.log('All tasks completed');
});
```



### Node messaging

1. **Event-driven model**:

   - Node's core is event-driven, async I/O.
   - Using the built-in `EventEmitter` class, you can publish and subscribe to events for messaging.

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

2. **Message Queue**:

   - Use queue systems like RabbitMQ, Apache Kafka — producer/consumer messaging architecture.
   - Producers send to a queue; consumers fetch and process.

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

3. **Pub/Sub**:

   - Pub/Sub enables one-to-many messaging.
   - Publishers publish to a topic; subscribers subscribe to topics of interest and receive messages.



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

### What is Node's EventEmitter? How would you implement one?

```js
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()
function callback() {
 console.log('event triggered!')
}
myEmitter.on('event', callback)
myEmitter.emit('event')
myEmitter.removeListener('event', callback);
```



Node's `events` module exposes an `EventEmitter` class — the basis of the async event-driven architecture (observer pattern).

Common methods:

• `emitter.addListener / on(eventName, listener)` — append a listener for `eventName`

• `emitter.prependListener(eventName, listener)` — prepend a listener

• `emitter.emit(eventName[, ...args])` — emit an event

• `emitter.removeListener / off(eventName, listener)` — remove a listener

• `emitter.once(eventName, listener)` — listener fires only once, then is removed

• `emitter.removeAllListeners([eventName])` — remove all listeners

### When did Node start supporting ES6 modules?

Since Node.js 13.2.0, files with the `.mjs` extension are treated as ES modules, or set `"type":"module"` in `package.json`.

### Global objects

• `Buffer` class — handles binary and non-Unicode data

• `process` — info and control about the current process

• `console`, `clearInterval`, `setInterval`

• `clearTimeout`, `setTimeout`

• `global`



### Module-scoped "globals"

• `__dirname` — directory of the current file

• `__filename` — full path to the current file

• `exports`

• `module`

• `require`

### How to size the thread pool

1. **CPU cores**: usually thread-pool size should match the CPU core count. Each worker thread occupies one core. Too small → underutilized CPU; too large → high context-switching overhead, lower performance.
2. **Task types**: e.g. split the pool into one part for CPU-bound and one for I/O-bound tasks.
4. **Task complexity**: if some tasks are particularly time-consuming, dedicate a larger pool to them so they don't block others.

### nextTick and its internals

`nextTick` pushes a callback onto the event queue, ensuring it runs after DOM updates. It's typically implemented using the microtask queue.

### Node.js async patterns

Mainly callbacks, Promises, and async/await.

1. Callbacks: the most basic async pattern. An async op takes a callback that's invoked when the op completes, with the result as args.
2. Promises: a more elegant async pattern. Use `then` to specify success/failure callbacks.
3. async/await: introduced in ES7. Built on Promises; lets async code look synchronous.

### Node event loop principle

The core of non-blocking I/O. 6 phases:

1. **Timers**: handle `setTimeout()` and `setInterval()` callbacks.
2. **I/O callbacks**: handle a few I/O callbacks from the previous loop.
3. **Idle, prepare**: internal Node only.
4. **Poll**: get new I/O events (e.g. network requests). Continues until I/O events arrive or timeout.
5. **Check**: execute `setImmediate()` callbacks.
6. **Close callbacks**: execute callbacks like `socket.on('close', ...)`.

Microtasks:

• next tick queue: `process.nextTick`
• other queue: Promise `then` callbacks, `queueMicrotask`

Macrotasks:

• timer queue: `setTimeout`, `setInterval`
• poll queue: I/O events
• check queue: `setImmediate`
• close queue: close events

### Node event loop mechanism

Built on the observer pattern. The `events` module provides the `EventEmitter` class, which is the foundation of Node's event system.

EventEmitter class

`EventEmitter` lets objects emit events and lets others subscribe. Key methods:

- `on(eventName, listener)`: add a listener for an event
- `once(eventName, listener)`: listener that fires once
- `emit(eventName, [args])`: trigger an event with arguments
- `removeListener(eventName, listener)`: remove a listener
- `removeAllListeners([eventName])`: remove all listeners

### Node high-concurrency principles

Thanks to async non-blocking I/O and event-driven architecture.

1. **Async non-blocking I/O**: Node uses async I/O for file reads, network requests, etc.
2. **Event loop**: continuously checks events — I/O completion, timer expiry. On event, runs the callback. Lets Node handle many concurrent events efficiently.
3. **Single-threaded model**: avoids thread switching and sync overhead.
5. **Efficient modules and libraries**: many modules are optimized for high concurrency — e.g. `http` and various DB drivers.
6. Use cluster/distributed architecture to handle higher concurrency.



### Node perf monitoring

Log monitoring — monitor exception logs to surface new error types and counts. Logs can also drive PV/UV monitoring — useful for understanding user habits and predicting peak access.

Response time — when subsystems have issues or bottlenecks, response time goes up. Monitor at a reverse proxy like Nginx, or via app-generated access logs.

Process monitoring — both log and response time monitoring require the system to be running. Process monitoring is even more critical. For multi-process web apps, monitor the worker process count and alert when below a threshold.

Disk monitoring — primarily disk usage. Frequent logging can fill the disk.

Memory monitoring — for Node, memory leaks aren't easy to track down.

CPU usage — server CPU monitoring is essential. Categories: user, kernel, IOWait. High user CPU → app is CPU-heavy. High kernel CPU → many process scheduling / syscalls. IOWait reflects waiting on disk I/O. Normal ranges: user < 70%, kernel < 35%, total < 70%. Monitor to understand the app's actual behavior.

CPU load — average CPU load over time. Describes how busy the OS is. Roughly the number of tasks running and waiting per unit time. Three values: 1m, 5m, 15m averages. High load means many processes — in Node, possibly process modules repeatedly spawning new processes.

I/O load — mainly disk I/O — reflects read/write activity. Node apps are mostly network-bound; heavy disk I/O usually comes from databases. Whether the Node process shares a server with the DB or not, monitor this to prevent surprises.

Network monitoring — though lower priority than the above, still monitor traffic and set thresholds.

App state monitoring — beyond hard metrics, the app should provide a way to report its own status. External monitoring continuously calls a feedback endpoint to check health.



### To build high-perf APIs in Express, Koa, or Next.js:

1. Optimize routing: keep routes simple, avoid excessive nesting and middleware. Use RESTful design principles for readability and maintainability.
2. Data validation and processing: validate and sanitize inputs at the entry point to ensure integrity. Use middleware or libraries — don't handle invalid data in business logic.
3. Caching: cache frequently-accessed data in memory or distributed cache (Redis) to reduce DB or computation.
4. Error handling: comprehensive error handling, return appropriate status codes and messages. Handle common errors — DB connection, validation — with friendly messages.
5. DB optimization: optimize queries and indexes. Sound DB schema design avoids unnecessary queries and joins.
6. Concurrency: use locks, semaphores to avoid races and inconsistency.
7. Monitoring and profiling: monitor perf metrics — response time, throughput. Analyze data to find bottlenecks.
8. Code optimization: efficient code, avoid unnecessary compute/memory. Use proper data structures and algorithms.
9. Testing and optimization: unit, integration, and perf tests; optimize based on results.

### Node.js project performance optimization

1. Code optimization

   - Keep code clean and efficient; avoid unnecessary computation and memory allocation.
   - Choose appropriate data structures and algorithms.
   - Avoid blocking operations; use async for I/O and heavy tasks.

2. Database optimization

   - Optimize queries — use indexes, sensible query patterns, proper join types.
   - Use DB caching to reduce repeated queries.
   - For large data, consider sharding or distributed DBs.

3. Caching

   - Cache frequently-accessed data to reduce repeated computation and DB queries.
   - Use in-memory cache (Redis) or file-based caching.

4. Concurrency and parallelism

   - Use Node's async features for concurrent requests and tasks.
   - Use multi-process or multi-thread to improve parallelism.

5. Error handling

   - Properly handle errors to avoid crashes.
   - Provide detailed error logs for diagnosis.

6. Monitoring and profiling

   - Use monitoring tools to track perf metrics — response time, memory usage.
   - Use profilers to find bottlenecks and optimize.

7. Server configuration

   - Configure hardware (memory, CPU) appropriately.
   - Tune server parameters — thread pool size, FD limits.

8. Network optimization

   - Reduce request count and payload sizes; optimize transmission formats.
   - Use CDN for static asset acceleration.

9. Code splitting and lazy loading

   - Split large codebases into smaller modules; load on demand.
   - Lazy-load infrequently-used features.

10. Security

    - Prevent common security vulns — SQL injection, XSS.
    - Validate and filter user input.



### Node — ensuring stability, graceful degradation, restarts

1. Process managers

PM2, Forever, StrongLoop Process Manager — manage Node app lifecycle. Auto-restart crashed processes to keep apps running.

- **PM2**: CLI to start/stop/restart apps and monitor perf metrics.
- **Forever**: a simple CLI tool to keep Node apps running.
- **StrongLoop Process Manager**: from IBM — provides monitoring, logging, load balancing.

2. Load balancing

A load balancer distributes traffic across multiple Node instances — even if one instance crashes, others handle requests. Common balancers: Nginx, HAProxy, AWS ELB.

3. Cluster mode

Node's `cluster` module lets you spawn multiple worker processes to handle requests. The master listens on a port and dispatches to workers. If a worker crashes, the master spawns a new one.

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

4. Error handling and logging

Implement error-handling so the app gracefully recovers from exceptions. Use logging libraries (Winston, Bunyan) to log app state and errors for tracing and debugging.

5. Health checks

Configure health checks in your load balancer or process manager — periodic checks. If unhealthy, auto-restart or remove from the load balancer.

6. Blue/green or rolling deploys

When deploying new versions, use blue/green or rolling updates to reduce user impact. These strategies gradually shift traffic — if the new version has issues, you can quickly roll back.

### Why is Node.js a non-blocking I/O runtime?

When an I/O request is initiated, Node returns immediately — it doesn't wait. It hands the I/O over to the event loop. When the I/O completes, the loop notifies Node to run the callback.

### Node.js event-driven model?

1. **Event listening**: Node apps can listen for many events — file I/O, network requests, timers.
2. **Event triggering**: when events occur — file read complete, network response arrives, timer fires — Node triggers events.
3. **Callback execution**: after an event fires, registered callbacks run async — non-blocking.
4. **Event loop**: the loop continuously checks the event queue; when events occur, it runs corresponding callbacks.

### What is deadlock; necessary conditions for deadlock

Occurs in multi-task / multi-process systems when two or more processes wait indefinitely for each other to release resources — no process makes progress; resources are stuck and the system is jammed.

### Node — invoking a virtual keyboard

Node itself doesn't handle UI. In Electron, you can call renderer-process APIs to invoke a virtual keyboard:

```js
// In the renderer process
document.getElementById('input').focus();
```

