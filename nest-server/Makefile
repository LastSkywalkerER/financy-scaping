build:
	docker build -t lastskywalkerer/qa-api:dev .
run:
	docker run --network=host --name qa-api --rm lastskywalkerer/qa-api:dev
stop:
	docker stop qa-api
clear:
	docker container prune && docker image prune && docker rmi lastskywalkerer/qa-api:dev
push:
	docker push lastskywalkerer/qa-api:dev
deploy:
	heroku container:push web --app nest-qa-api
release:
	heroku container:release web --app nest-qa-api