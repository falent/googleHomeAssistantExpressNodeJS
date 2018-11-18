#!/bin/bash
# A vary simple Bash script, by Tomasz Krajewski, preparing Linux environment for a debian linux distribution
green=`tput setaf 2`
red=`tput setaf 1`
reset=`tput sgr0`


name="gnome-terminal"
echo "${green}Installing $name ${reset}"
echo " "


if [ $(dpkg-query -W -f='${Status}' "$name" 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  apt-get install "$name";
else
	echo "$name is already installed"
fi


name="git"
echo "${green}Installing $name ${reset}"
echo " "


if [ $(dpkg-query -W -f='${Status}' "$name" 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  apt-get install "$name";
else
	echo "$name is already installed"
fi

name="webstorm"
echo "${green}Installing $name ${reset}"
echo " "

# install webstorm

if [ -d /home/$USER/Desktop/IDE/WebStorm ]; then
	echo "$name is already installed"
else
	echo "$name is already installed"
	mkdir ~/Desktop/IDE/
	cd ~/Desktop/IDE/
	wget https://download.jetbrains.com/webstorm/WebStorm-2017.3.4.tar.gz -O WebStorm.tar.gz
	tar xfz WebStorm.tar.gz -C ~/Desktop/IDE
	mv WebStorm-* WebStorm
	cd ~/Desktop/IDE/WebStorm/bin
fi

#install docker
name="docker"
echo "${green}Installing $name ${reset}"

if ! [ -x "$(command -v "$name")" ];
then
  	curl -fsSL https://get.docker.com | sh;
	usermod -aG docker $USER;
else
	echo "$name is already installed"
fi



#clone repository
echo "Cloning git repository"
git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git ~/Desktop/Template/Google_Assistant_universal_skill_template && cd ~/Desktop/Template/Google_Assistant_universal_skill_template && git pull

shortcutWebstorm = home/$USER/Desktop/webStorm.desktop


touch /home/$USER/Desktop/webStorm.desktop

echo "[Desktop Entry]
Type=Application
Exec=/home/alexa/Desktop/IDE/WebStorm/bin/webstorm.sh
GenericName=webstorm
Icon=/home/alexa/Desktop/IDE/WebStorm/bin/webstorm.svg
Name[en_US]=Webstorm" > /home/$USER/Desktop/webStorm.desktop

touch /home/$USER/Desktop/IDE/completedInstallation.txt;
rm /home/$USER/Desktop/IDE/WebStorm.tar.gz



sudo gnome-terminal \
--tab -e "bash -ic \"sleep 5s; sudo docker network create myNetwork ; exec bash\"" \
--tab -e "bash -ic \"sleep 10s; sudo docker run --rm -it --network myNetwork wernight/ngrok ngrok http myAssistant:5000; exec bash\"" \
--tab -e "bash -ic \"sleep 6s; sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1; exec bash\"" \



