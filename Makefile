build:
	docker build -t ment:0.0.1 .

run:
	docker run -d --name ment -p 8888:8888 ment:0.0.1

rm:
	docker rm -f ment

sh:
	docker exec -it ment sh

logs:
	docker logs -f ment

compile: css js

css:
	docker exec -it ment /usr/src/app/node_modules/.bin/stylus -o /usr/src/app/src/server/public/index.css /usr/src/app/src/app/index.styl

js:
	docker exec -it ment /usr/src/app/node_modules/.bin/browserify -t babelify -o /usr/src/app/src/server/public/index.js /usr/src/app/src/app/index.js
