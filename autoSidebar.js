let sidebarTxt = '';
const path = require('path');
const fs = require('fs');
const curPath = path.resolve('./');
const taskQueue = [];

const NameMap = {
    '2code': '代码题',
    '1foundations': '基础',
    'front-end': '大前端',
    'java': 'java',
    'Interview-experience': '面试经验'
}

const PUBLIC = '/public';

function countCharacter(str) {
    const charCounts = str.split('').filter(char => char === '/').length;
    return charCounts;
  }

function walkSync(currentDirPath, prefixBlank, callback) {
    fs.readdirSync(currentDirPath).forEach(function (name) {
        const filePath = path.join(currentDirPath, name);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
            callback(filePath, stat);
        } else if (stat.isDirectory() && ".git" != path.basename(filePath) && '_' != path.basename(filePath).substr(0, 1)) {
            const relativeFilePath = filePath.substr(curPath.length);
            if (relativeFilePath !== PUBLIC) {
                const name = NameMap[path.basename(filePath)] || path.basename(filePath);
                sidebarTxt += prefixBlank + '* [' + name + '](' + relativeFilePath + '/index.md)\n';
                const level = countCharacter(relativeFilePath);
                taskQueue.push({
                    value: '* [' + name + '](' + relativeFilePath + '/index.md)',
                    key: relativeFilePath,
                    level
                });
                walkSync(filePath, prefixBlank + '  ', callback);
            }
        }
    });
}
walkSync(curPath, '', function (filePath, stat) {
    if (".md" == path.extname(filePath).toLowerCase()
        && '_' != path.basename(filePath).substr(0, 1)
        && 'README.md' != path.basename(filePath)) {
        var relativeFilePath = filePath.substr(curPath.length);
        //console.log("file:"+ path.basename(filePath).slice(1));
        var itemText = relativeFilePath.substr(1, relativeFilePath.length - 4);
        while (itemText.indexOf('/') > 0) {
            itemText = itemText.substr(itemText.indexOf('/') + 1);
            if (relativeFilePath.substr(-8, 8) == 'index.md') {
                sidebarTxt += '';
            }
            else {
                sidebarTxt += '  ';
            }
        }
        if (relativeFilePath.substr(-8, 8) == 'index.md') {
            sidebarTxt += '';
        } else {
            sidebarTxt += '- [' + itemText + '](' + relativeFilePath + ')\n';
            console.log('- [' + itemText + '](' + relativeFilePath + ')\n');
        }
    }
});

console.log(taskQueue);

fs.writeFile(path.resolve('./') + '/_sidebar.md', sidebarTxt, function (err) {
    if (err) {
        console.error(err);
    }
});