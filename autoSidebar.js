let sidebarTxt = '';
const path = require('path');
const fs = require('fs');
const curPath = path.resolve('./');
const taskQueue = [];
const relativeFilePathFilter = [
    '/.idea',
    '/public',
    '/node_modules',
    '/.husky',
];

const SIDE_BAR = '/_sidebar.md'

const NameMap = {
    '2code': '代码题',
    '1foundations': '基础',
    'front-end': '大前端',
    '3scene-questions': '场景题',
    'back-end': '后端',
    'network': '网络',
    'test': '测试',
    'data-base': '数据库',
    'Interview-experience': '面试经验',
    'leet-code':'力扣'
}

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
            if (relativeFilePathFilter.every(value => value !== relativeFilePath)) {
                const name = NameMap[path.basename(filePath)] || path.basename(filePath);
                const level = countCharacter(relativeFilePath);
                taskQueue.push({
                    value: '- [' + name + '](' + relativeFilePath + '/index.md)',
                    filePath: relativeFilePath + '/index.md',
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
        var itemText = relativeFilePath.substr(1, relativeFilePath.length - 4);
        while (itemText.indexOf('/') > 0) {
            itemText = itemText.substr(itemText.indexOf('/') + 1);
        }
        if (relativeFilePath.substr(-8, 8) !== 'index.md') {
            const level = countCharacter(relativeFilePath);
            taskQueue.push({
                value: '- [' + itemText + '](' + relativeFilePath + ')',
                key: relativeFilePath,
                level
            });
        }
    }
});

function writeFile(filePath, text) {
    fs.writeFile(path.resolve('./') + filePath, text, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

//
while (taskQueue.length > 0) {
    const item = taskQueue.shift();
    if (item.filePath) {
        const validItem = taskQueue.filter(value => value.key.startsWith(item.key) && value.level === item.level + 1)
            .map(value => ' '.repeat(value.level - 1) + value.value.replace('*', '-')).join('\n');
        writeFile(item.filePath, validItem)
    }
    sidebarTxt+='  '.repeat(item.level - 1) + item.value+'\n';
}
writeFile(SIDE_BAR, sidebarTxt)