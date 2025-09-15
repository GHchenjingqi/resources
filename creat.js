import fs from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 直接使用resolve拼接__dirname和mds相关路径，不需要手动处理斜杠
const BASE_URL = resolve(__dirname, './mds/statics/');
const PATH_LIST_FILE = resolve(__dirname, './mds/pathList.js');

// 生成路径列表文件
const allFiles = fs.readdirSync(BASE_URL);
const content = `export const pathList = ${JSON.stringify(allFiles)};`;
fs.writeFileSync(PATH_LIST_FILE, content);