make install:
	npm ci
	npx simple-git-hooks

make start:
	npm run start

lint:
	npx eslint . --ext js,jsx

make build:
	npm run build

make test:
	npm run test

make eject:
	npm run eject

.PHONY: test
