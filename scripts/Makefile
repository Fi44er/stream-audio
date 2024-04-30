# Makefile
build-proto:
	protoc --proto_path=$(proto_path) \
    --plugin=protoc-gen-ts_proto=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out=$(output_dir) \
    --ts_proto_opt=nestJs=true $(filename).proto \
    cp $(proto_path)/$(filename).proto $(output_dir)

start-all-services:
	@for dir in $$(find ../server/services -maxdepth 1 -type d); do \
	gnome-terminal -- bash -c "cd $${dir} && yarn start:dev"; \
	done; \
	gnome-terminal -- bash -c "cd ../server/gateway && yarn start:dev"