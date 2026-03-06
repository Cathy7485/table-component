#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# 部署到 https://cathy7485.github.io
# git push -f git@github.com:cathy7485/cathy7485.github.io.git master

# 部署到 https://cathy7485.github.io/table-component
git push -f https://github.com/Cathy7485/table-component.git main:gh-pages

cd -