.PHONY: build
build:
	npm run build

.PHONY: publish
publish: build
	git add build
	git commit build -m "update"
	git push
