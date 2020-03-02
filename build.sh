#!/usr/bin/env sh

# mac设置文件权限
# sudo chmod -R 777 blog
# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@gitee.com:tanyplzu/front-end.git master:gh-pages

cd -
