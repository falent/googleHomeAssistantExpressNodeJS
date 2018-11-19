
:: Deleting local repository if exists

call rmdir /Q /S C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

:: Cloning our repository

call git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

:: going to your local repository

call cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

:: Create a new Docker network:

call docker network create myNetwork

:: Runing the ngrok Docker container in your terminal and do not close this tab!

call start cmd.exe @cmd /k  "docker run --rm -it --network myNetwork wernight/ngrok ngrok http myAssistant:5000"

:: Runing a Google Assistant Docker container
docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1
