# Makefile
build-proto:
	@if [ "$(proto_path)" != "$(output_dir)" ]; then \
		cp $(proto_path)/$(filename).proto $(output_dir); \
	fi; \
	protoc --proto_path=$(proto_path) \
    --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=$(output_dir)/builds \
    --ts_proto_opt=nestJs=true $(filename).proto \
    

start-all-services:
	@for dir in $$(find ../server/services -maxdepth 1 -type d); do \
	gnome-terminal -- bash -c "cd $${dir} && yarn start:dev"; \
	done; \
	gnome-terminal -- bash -c "cd ../server/gateway && yarn start:dev"

change-all-prisma:
	@for dir in ../server/services/*/; do \
		cp ../database/prisma/schema.prisma "$${dir%/}/prisma" && \
		(cd "$${dir%/}" && npx prisma generate); \
    done