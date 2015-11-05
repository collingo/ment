build:
	docker build -t ment:0.0.1 .

app:
	docker run -d \
		--name ment-app \
    --link ment-db:db \
		-p 8888:8888 \
		-v $(PWD)/src:/usr/src/app/src \
		ment:0.0.1

db:
	docker run -d \
		--name ment-db \
    -p 8080:8080 \
    rethinkdb

rm:
	docker rm -f ment-app

sh:
	docker exec -it ment-app sh

logs:
	docker logs -f ment-app

compile: css js

css:
	docker exec -it ment-app /usr/src/app/node_modules/.bin/stylus -o /usr/src/app/src/server/public/index.css /usr/src/app/src/app/index.styl

js:
	docker exec -it ment-app /usr/src/app/node_modules/.bin/browserify -t [ babelify --optional es7.classProperties ] -o /usr/src/app/src/server/public/index.js /usr/src/app/src/app/index.js
