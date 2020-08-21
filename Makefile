build:
	docker build -t grpcpapp:v0.1 .

# clean:
# 	docker rmi grpc-task_grpc-frontend grpc-task_grpc-client grpc-task_grpc-server
# 	docker rmi $(docker images |grep 'grpc-task_grpc')

run:
	make build
	docker-compose up --build