#!/usr/bin/env sh

# abort on errors
set -e

# cleanup previous build
rm -rdf dist || true

REPO_URL=$(git config --get remote.origin.url)

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -b main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
echo $(git config --get remote.origin.url)
git push -f ${REPO_URL} main:gh-pages

cd -