FROM node:0.10-onbuild
MAINTAINER Nick Collings <nick@collingo.com>

CMD ["node", "./node_modules/babel/lib/_babel-node", "--optional", "es7.classProperties", "src/server"]
