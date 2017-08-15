# Demo Website
## Framework usage
* nodeJS
* ReactJS

## Installation
### in Production
```
./build.sh
./run.sh
```
### in Development workplace

```
# Step 1
# install npm
yum install -y npm
# or
brew install npm

# Step 2
# clone repo
git clone ssh://git@gitlab.emotibot.com:10022/deployment/demo-website.git

# Step 3
cd demo-website
npm install
```

## Development
### using webpack server
```
webpack-dev-server
# then open browser and go to link 'localhost:8090/webpack-dev-server/' or just 'localhost:8090'
```
### using node server
```
# build client static file
webpack

# in one terminal
npm start
# open other termianl and run
webpack --watch
# then open browser and go to link 'localhost:8080/'
```
## Add server config file
```
# in demo-server root directory
touch prod.env
```

Add these or configure on your own

```
PORT=8080
PUBLIC_FILES='/Users/yuhsianglin/server/demo_server/public_files'
```
# web-demo
