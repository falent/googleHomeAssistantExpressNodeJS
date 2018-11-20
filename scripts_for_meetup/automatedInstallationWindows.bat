echo on
echo " Before we start you need to ensure that Git is properly configured to handle line endings."
call git config --global core.autocrlf true

echo " Deleting local repository if exists"
call rmdir /Q /S C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

echo "Cloning our repository"
call git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

echo "going to your local repository"
call cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

echo "Create a new Docker network:"
call docker network create myNetwork

echo "delete docker image and container"
docker rm -f myAssistant && docker rmi -f falent/google_home_assistant_express_node_js_server:1

echo "Runing the ngrok Docker container in your terminal and do not close this tab!"
call start cmd.exe @cmd /k  "docker run --rm -it --network myNetwork wernight/ngrok ngrok http myAssistant:5000"

echo "Runing a Google Assistant Docker container"
docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1
@echo off