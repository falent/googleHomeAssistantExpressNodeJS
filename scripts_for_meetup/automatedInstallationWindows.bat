echo on
echo " Before we start you need to ensure that Git is properly configured to handle line endings."
git config --global core.autocrlf true

if exist "C:\Program Files\Docker Toolbox\start.sh" goto ok
ECHO Press any key to exit
PAUSE >NUL
EXIT /B

:ok
call "C:\Program Files\Git\bin\bash.exe" --login -i "C:\Program Files\Docker Toolbox\start.sh" docker run hello-world
IF exist "C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS" ( cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS & git pull) ELSE ( git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS )


echo "Create a new Docker network:"
call "C:\Program Files\Git\bin\bash.exe" --login -i "C:\Program Files\Docker Toolbox\start.sh" docker network create myNetwork


echo "Runing the ngrok Docker container in your terminal and do not close this tab!"
start cmd.exe @cmd /c call "C:\Program Files\Git\bin\bash.exe" --login -i "C:\Program Files\Docker Toolbox\start.sh" docker run --rm -it --network myNetwork wernight/ngrok ngrok http myAssistant:5000

echo "Runing a Google Assistant Docker container"
call "C:\Program Files\Git\bin\bash.exe" --login -i "C:\Program Files\Docker Toolbox\start.sh" docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server





