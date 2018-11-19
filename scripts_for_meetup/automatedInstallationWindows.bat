:: Setting for your git that shell scripts won't be changed by windows formattig. Our shell script 
:: was written in Linux. You can always got back to default git setting typing after event
:: git config --global core.autocrlf false

call git config --global core.autocrlf true

:: Cloning our repository

call git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

:: going to your local repository

call cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS

:: Create a new Docker network:

call docker network create myNetwork

:: Runing the ngrok Docker container in your terminal and do not close this tab!

call start cmd.exe @cmd /k  "docker run --rm -it --network myNetwork wernight/ngrok ngrok http myAssistant:5000"

:: Runing a Google Assistant Docker container
call docker run -v /C/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1
