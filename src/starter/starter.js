const fs = require('fs');
const path = require("path");

let projectPath = path.resolve('./');
// index 文件初始化
let indexPath = __dirname + "/.springboot4js.js";
fs.writeFileSync(indexPath, `require('@babel/register')\r\n`, { flag: 'w' });

// 遍历所有文件，查找出所有使用注解的文件
let excludePaths = [indexPath, projectPath + "/node_modules"];

const build = (dir) => {
    const decoratorFiles = [];
    const files = fs.readdirSync(dir);
    for (let file of files) {
        file = dir + "/" + file;
        if (excludePaths.indexOf(file) !== -1) {
            continue;
        }
        const stats = fs.statSync(file);
        if (stats.isDirectory()) {
            build(file)
        } else if (file.endsWith(".js")) {
            let content = fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
            if (/@application\(.*\)[\s\t]*[\r\n]/.test(content)) {
                fs.writeFileSync(indexPath, `require('${file.replace(/\\/g, "/")}')\r\n`, { flag: 'a+' });
            } else if (/@[a-zA-Z0-9]+\(.*\)[\s\t]*[\r\n]/.test(content)) {
                decoratorFiles.push(file);
            }
        }
    }

    for (const file of decoratorFiles) {
        fs.writeFileSync(indexPath, `require('${file.replace(/\\/g, "/")}')\r\n`, { flag: 'a+' });
    }
}

build(projectPath);
require(indexPath);
