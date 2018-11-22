
# How to build your first Google Assistant action (skill)?

In this short tutorial we will show you how to write a simple Google assistant skill and develop it on your local machine. We are going to use Docker to avoid any additional installations and ensure that all of us starts with the same code in the same environment (less problems for all of us. For those who don't know how Docker works it is a good example) Don't worry although we use Docker you will edit your code only locally because we implemented a mount option (shared folder).

When you finish your developing you can easily upload your code to any https server. At the end of this tutorial we will show you how to do it with Heroku and Firebase. After that you can publish your first skill. Of course our solution will also work with any other Https node.js server provider like AWS, Azure or Openshift. 

## Requirements
As it was mentioned at the beginning we will work with Docker.  So you just need the Docker toolbox and a Google account. 

### Docker installation
#### Linux
https://docs.docker.com/install/linux/docker-ce/ubuntu/
#### Windows
As new version requires hiperView feature we decided to use Docker Toolbox:
https://download.docker.com/win/stable/DockerToolbox.exe

### Google Account
Please create a new Google account or use an existing one.
https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp

### Node.js IDE
We will use webstorm
https://www.jetbrains.com/webstorm/download/
but you can use any of your favourite JS/Node.js IDE

## "Interaction Model" Configuration

We will use dialogFlow and Google actions to configure our interaction model and publish it for the Google assistant. The interaction model is a voice logic which needs to be defined in Google actions and dialogflow.

### I. Google Actions
Yo can imagine an action as a part of voice programm (voice skill) that extends the functionality of the Google Assistant. To start your voice action you need an invocation name. In our case we will create a weather action (skill) and we can start it by saying "OK Google, talk to [your defined invocation name]". After that Google will call your external fulfillment  to start a conversation with the user. The fulfilment is based upon your deployed web application.

The voice interactions are transformed from audio to text and backward till a conversation between the user and Google assistant reaches its end.

![https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png](https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png)
Source: https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png

#### I.1 Create a new project
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need a Google account to log in. Click a plus button (add / import project) and after that create a project with the given name.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg?w=840&h=540)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg)

#### I.2
At the next page choose "skip".

#### I.3 Define the invocation name
In actions invocation define the invocation name for your skill. Click on save.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png?w=840&h=593)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png)

Congratulations, you created your first project, but the simulator is not active yet.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png?w=840&h=789)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png)

The reason is that there is no voice logic behind it. That means there are no interactions defined between Google assistant and the end user for  your skill. To create the interaction logic we will go to dialogflow which we will describe in the next step.

### II. DialogFlow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. We need it to translate human voice calls into JSON objects that can be consumed by  our backend code and backwards to tranlate the responses from our backend to voice phrases. You define how all this works within a Dialogflow agent.

#### II.1 How does Dialogflow work?

1. A user starts voice interaction or text interaction saying/texting
*OK Google, talk to [your definded invocation name]*

2. Google calls Dialogflow looking for a defined logic to the invocation name. 

3. Dialoglow looks for a user's intention (what a user wants to do):

	a) If the whole logic is defined in Dialogflow, Dialogflow calls actions and actions returns the answer to the user
    
	or
    
	b) DialogFlow calls your external code and returns an answer proccesed from your code to Google actions which returns it to your end user
	
In the next step open the Dialoglow interface:  [https://console.dialogflow.com](https://console.dialogflow.com) 

![](https://lh3.googleusercontent.com/p-ErkiJR_C8AAppI3qefIA0Oqwdq5ib0NtjgiVhY0Wg7sGzYM9lxUMLEcR1krkag5_pdZIdtR_kpCdF1NQH6EqJQP0vKV9WemqP_qmkpt3RtYiGBYtN4Bg8Zfwc41GcXtS2IcG7BWbddn8L2bV2sno1xusprTI7uNzHGiBbv1l6EgYtBPJCIl3E_g4U_Vkvn2kqPVoOlJnCBAx1cTc-1dznIwbfDIxcvtfAGY5KmRmq11fAf74qJ3zysdl1YE7bc2i9AIfosIQuvfi7XASiqhnWCgZ5zxOhXd3sy8Gn8Dej1xV4cUY1sacszlDkVYKQEEiscsIzeaSxy-B58S5-sMTvhh7Xg-M4_KjUkyimawULa09OTkfC9lmAzXuG61r7E-nkKSOe0Iqompr1PjhV1d5Td6_p29MK5jra9zECaafM9DPdqhaKg_IWIiAvD-LuRe_d9o79D-dAJjMOXJW1ItaKlhbp7ctDsrVlF_gnqFSweNffF8oGJRGlOkSYVip-6gFDMnzK7cwFzezXS9BO8_xyfsAYAwNvwIJr5AH319dDh_pysXJbCjHJ4nhfDkzCqlVGpXXAlg3GcTPxepfNgcnFzqxFIXnvC1Wim3NaGYgYEKOKsXpH7KNLBzJjGcCrOGQg_W4J7EB3y99zLsBi2l9F1vquIrNOlYlwrtHPpMYYwrh-xgXgmzsqPmNkUJsce6kR9XLgx3DzRA9CH=w1188-h591-no)


#### II.2  

Create a new agent where you configure the interaction model for your skill. ** Please keep in mind to import your created project (Google PROJECT) from Google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

![](https://lh3.googleusercontent.com/So8pgbym02Gu8W1noyXNd5Bk5L_pFs-yNf497XxvusvyUvhNz5UPbcb3KFoWvT8W-Y-HmXuGPFXDFKK8O-ifYahPz2fCifPUvd7hd-s3FVp-7ld5dgqRv9S-9BEUAgLa0T2eQA-6h_MJxlzDmoz-8LUHffgedaDrJ009ge-QoK1TdO5FEKrM_x69AmFEiiPV_MSOYJaKpXAEvhgIfS6ivtU6y6sm5-rNqwxbzgEi7Njibo2ZJ_h47Bt0IpMNxI4JSZzlkNhibdTt7LWQELwl3AaU_jpYUDzkZ1SXeNEMQTnpDSugcutVJcJ7qkifwKc0y9muN0C6-gmg7G8RP1f8thv3glb9zLUdvpo8qyhpS8Fyja1NkIE130jnI1noM9qFk0PgWI8B0kptfyY9n8gg_XfcrmNiEteiq48D-2DJX_Thjnt0CdsvHnQsxfLETjx0l8-HJyJEuf4u-ixVVM7ukAMmPkI-QLlytJquji2nZNFvB44uT2THiYa-W-OHbyn3YSlCMXtDaOryekauJwfiCRhIp-eWSFhMjaBNFiFiJT826WPxJee_Rd8QVh4_D2atFjItFK7dXmmeF0u-qWMzrq7c9EdnhKh48Hx-ZlbZL0_n9T3MEOufFuXV25Le0UR7a71KeSlwN2iNORjyvvnjL0kpP3d_qLwadcLsTiHEKkpsTC-r5Wy0peuERMz6-X5naCXp4J1Fi3_l7mD0PILI1bCJxCMZJXT0e71U=w1440-h468-no)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### II.3 Add your first intent
Intents are anticipated user intentions about what users might want to talk with the voice assistant in an action. For a weather action possible intents would be questions about the temperature or precipitation. Intents are triggered by predefined utterances and key words from the user. Possible questions about the weather could be "Will it rain today?" or a keyword might be "temperature". Utterances like these are defined as training phrases in an intent of your action.  To  see how its configured click on Intentions in Dialogflow. Select the default welcome intent. Here you have listed several training phrases that invoke the welcome intent. Under Responses you see what the Google assistant could  answer to the user utterances that triggered the welcome intent.


[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

#### II.4
If you want to use your own code for an intent you need to enable one option on the buttom of your intent.

Swip „Enable webhook call for this intent“ and click „save“  button

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)

#### II.5
Add a new intent for example "nameIntent". We will integrate this intent in our code.
In the traning phrases add f.e "My name is Christina". Dialogflow will instantly recognise it as a traning phrase that contains a name parameter. Your parameter name will be called "given-name" and all entities are defined by Google. During our meeting we will show how to build user defined entities.

We won't define responses in that case because we want to have more control how Google assistent answers. So we will do it with our code. Please click on Fulfillment and "Enable webhook call for this intent".


#### II.6
Add an additional intent. It will be responsible for getting us a weather information. Name this intent
„getWeatherForcastIntent“.

In this intent page, add some traning phrases:

> Tell me the weather for Essen
> 
> Berlin

DialogFlow will automatically recognise it as  @sys.geo-city (it will be our parameter). If not please click on Essen word and define it as @sys.geo-city entity. It means with this entity you can ask for any city the weather.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png?w=840&h=313)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png)

Please keep in mind that we will fulfill this intent by webhook. Enable it as you have done in II.4 point. Please save  your intent. 

## Installations

### 3. Docker

#### Docker Installation
If you use Windows install [Docker Tools](https://download.docker.com/win/stable/DockerToolbox.exe) on your machine or if you use docker under linux [Docker CE (Community Edition)](https://docs.docker.com/engine/installation/#desktop) to test your Docker installation execute the following command:

linux:

`$ sudo docker run hello-world`

windows:

`docker run hello-world`

If you don't see in windows this output:

`Hello from Docker! This message shows that your installation appears to be working correctly.`

Please be sure that you started "Docker quickstart terminal". You can  execute all Docker commands in a cmd terminal.

### 4. Docker Containers

Please do all steps in the order they are described below :) We will create 2 containers which will be connected to each other in one Docker virtual network.

Our simplified architecture looks like that:

![](https://lh3.googleusercontent.com/-K-UcRiRJgzjwR2b8v4sE2h3TZyhPznsM8cB86G37KGJdBKz3KUB2L6hG_UJclx0irdxsGzog0gOpkgE-5nNogmkVImDqgcB7vUnoo6bfhjeEQwNKxjZOm43J33u9sLBWUmVwteZNYDiZ2su3PvJ9D7-UNWsOronF4WBGCBoK4A5RriYA-0r46Jru6OcAxgnX0QDiOG78j9l0g4r3AR-DdOSVrqxPWdOMdL3EfNDO-M5W1fDtpynYuySaffC-ADorUOYDZVNsRGBnSxRuIurYLABdIGxs5-KYn0Gs2Qc_syYO35Sxn7DSTdiiVvyY7Neqa3FRr1Yu5AXWdLh0y1WBfNQicXF7cx5FvCUU-0clalgXM8XB18jp8evF3-d79UWDLNT43-2QYri1OmRSK72MygtrkFETsMMT6r-dsjQpwIgjQQublTmGfN4HcDmzTUjqO_vcMR6C4EOk5bavZUzv-3YMWVkSk2vDtjPSjnHtfRezNHguwSERvQhiwV2KDxw3XIq67xVbfkGdORIKTEzwNyapl55lnOwc_8TNJkgtlXJ02qOFjq7uF9mzCi-gW3saHQnkXjXLEQl1vmktVij5MreGlIfnPO99hMSspf5BGM7R7MqoPaTvI_aIkJGKlHSYd5DuFqhobgYNUSMcx3ioep99fGxJP2WVNOGlVxoXtJ9GCR4fYiMTgMDJufmkE0KoqcVi_qtBqbcfkaK=w1175-h387-no)

Ngrok is a gateway that communicates with Google Assistants requests/responses via https. Our node.js action (skill) app is deployed in a Docker container and is shared with our javascript files in our local directory. Thus we can change the code locally and the deployed app reacts instantly to the changes. 

#### IV.1  Project configuration<div id='id-project-configuration'/>

#### Linux
Open your terminal and execute the following commands:

1. Clone our repository from github
`$ git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  ~/Desktop/Template/Google_Assistant_universal_skill_template `

2. Go to the cloned git repository:
`$ cd ~/Desktop/Template/Google_Assistant_universal_skill_template`

3. Create a new Docker network in a terminal tab:
`$ sudo docker network create myNetwork`

4. Run the _ngrok_ Docker container in your terminal **and do not close this tab!**
`$ sudo docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new tab and run an Google Assistant_Docker container:
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

#### Windows

You can use a batch script in your command line to do all steps automatically.

If you put this curl command to your cmd terminal, batch script will execute all [commands](#id-commands) that you could do manually ;)

`curl https://raw.githubusercontent.com/falent/googleHomeAssistantExpressNodeJS/master/scripts_for_meetup/automatedInstallationWindows.bat > automatedInstallationWindows.bat && automatedInstallationWindows.bat`

Please keep in mind that you should execute this script only once. If you close the window or you want reload npm modules please use these [commands](#id-commands-restart)

You can see the content of the batch script file here. I put comments to explain what they are doing.
https://github.com/falent/googleHomeAssistantExpressNodeJS/blob/master/scripts_for_meetup/automatedInstallationWindows.bat



**OR**<div id='id-commands'/>

We encourage you to do all stepps by yourself in cmd consol because you can understand better what we are going to do :)

1. Before we start you need to ensure that Git is properly configured to handle line endings.
`git config --global core.autocrlf true`

2. Clone our repository. Your repository will be saved automatically in your Documents in the directory GoogleHomeAssistantExpressNodeJS.
`git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS`

3. Go to the cloned git repository:
`cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS`

4. Create a new Docker network:
`docker network create myNetwork`

4. Run the _ngrok_ Docker container in your cmd terminal **and do not close this tab!**
`docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new cmd window and run an _Google Assistant_ Docker container:
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

The last Docker command means: Run a container and share it with my local directory where GoogleHomeAssistantExpressNodeJS app is. Your local directory is binded to the skill directory in your Docker container. Please do not change the path. Otherwise it might not work. Our deployed web app to the created network myNetwork is named myAssistant. The Docker image for our container myAssistant will be downloaded from Docker hub falent/Google_home_assistant_express_node_js_server:1. (https://hub.Docker.com/r/falent/Google_home_assistant_express_node_js_server/)

#### IV.2  Output
You will see the following output if your created myAssistant container works properly.

![enter image description here](https://lh3.googleusercontent.com/5V5vOys_GXe4zhktu61BtRz9Avm9HQhu5-V01z4xTL6pqU2FKdi3bW9lidgpakwRjeWTMkYUHKM3jK2plhqBTkaAZ0bjKIfdpHQZsxYx5drrR7g9bHOqhDy5f1XmicWXOMigPRim5Wh6N1bezZGgXYvztdCwUvVrxgkrOg6ejwnE5f-jiwWU7lFpf2ZLeRhBZfkKdFq5ZsoZ9CFjSMUwxrMaHxefsGEZ4peLuUXJrzvlKd5d5NOmjbVKI652F_Q3UQwqFIbzKMO00FPrdHXN6P9e3v_ysseJK9jBZIW_ZJ0sugpHrKG15y8COJr4VGIbob8ZAUSeQc2_yACTSomqz_7jub035dtzDiI6ed66uqiNBMEsf69XTXXzAJF-OawtzJg3GzGAIwKaftZllOURCF5sFEI75KUozU-P5y-44N3LWm9JeCyAdCMJ8vSnmeLa7m5t229K8r7-mnc4-cKtY0fuUMI5zGJalrZUZMA7imn1NRnOldWmGUhcFcPSr4awqYLXckvwTXOSOoAN0lHOM36hKV-sndD15nWdzI-_CLMAydSaiQxBACdE-hsnvxX0vX-me8L3yrcRZdO1UYycIznafp4cevYmdWK0fYm9NwMqGKlmAWV4TY4Je7FTYuDcoSKOIqeHy2RrDAFwQ4oK1w0mWq14S4sHYiWfvLgIzTSXCuYDeKDV_RrK8KYfmOV3DeB5ZnfbEEX22bAQ=w1916-h446-no)
## OPTIONAL STEPS
In this section you will  find optional steps if you wish to restart your Docker or rebuild everything

### Restart (in case of new module installations or if you want to start your container app)<div id='id-commands-restart'/>
Our solution is based on nodemon which is kind of a watcher and it reloads your skill everytime you made code changes. You save a lot of time because of that ;) However it can happen that you wish to add more npm modules https://www.npmjs.com/ to your skill. In that case you need to restart your container. Npm modules are installed only at the start of your container. To restart  your container type the following in a cmd terminal:

#### Linux
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

#### Windows
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

### New docker containers
Imagine you would like to add to your docker environment a database. With our solution it is very simple! Just start any database docker container and place it in our docker network. For example: 

##### MongoDB
You need only start a new container:

`sudo docker run -it --name mongo_database --network myNetwork bitnami/mongodb:latest`

your database is listening in port 27017. The name of container is "mongo_database" so to request our database from node.js you need to call this addresse:
`mongodb://mongo_database:27017`

##### MySQL
You need only start a new container:

`sudo docker run -it --name=mysql1 --network myNetwork -d mysql/mysql-server:5.7`

check what generated password is:

`docker logs mysql1 2>&1`

and login to shell to create a new table

`docker exec -it mysql1 mysql -uroot -p`


### 4. Dialogflow
#### IV.1 Ngrok address
Please copy **https** address from ngrok Docker.

![enter image description here](https://lh3.googleusercontent.com/lxynDDtaZzBgyqMiyW5twybVpWpWg5yEJ0Qt0ujyPqUUoh-npvxaTC8qyu2FnIiz_LP7oMEGqWA)
#### IV.2 Dialogflow endpoint<div id='id-dialogflow-endpoint'/>
enable Webhook in Dialogflow,  put your copied https address and click „save“
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png?w=840&h=354)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png)

[https://7bf316ed.ngrok.io/](https://5f04bf42.ngrok.io/bikebuddy-8448e/us-central1/myApp)


At the end you go to Integrations in Dialogflow and choose Google Assistant integrations. You need to add "implicit invocation" with your created intents.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png?w=840&h=505)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png)

Set up explicit invocation as welcomeIntent

Now you can test your app clicking on the buttom "Test" link.


# How to test your skill?

1. Open Dialogflow interface with your skill and go to integrations --> Google Assistant. When pop up window is opened go choose "TEST"

![enter image description here](https://lh3.googleusercontent.com/f0SmNm1IG10wCkpkOprvIu7Bp0Oz4ZXDZplxpV1ptFzWI5kK_XNh1GddmtkIRqrciL_jLs4YLas)
You will be taken to Google Actions simulator.

Just click on your suggested input. In my case it is "Talk to Tomasz skill". In your case it will be "Talk to {your defined in Google actions skill invocation name}"

![enter image description here](https://lh3.googleusercontent.com/d1lgHJtXF6o8LOA77GKGP5QQrXvde0DFrc7noDSDUcuWxrc59Sri9UPxWoVBKIP98_VIOQy-QrI)
Your skill will answer:
*Okay. Let's get the test version of tomasz skill.Hi! What is your name?*
We defined only one traning phrase in a dialogFlow. It was "my name is {your name}"

![enter image description here](https://lh3.googleusercontent.com/WAfnxThlWu4emdK-Qec_4gdiVJmQGqIEvCWdXxt5aOyEdfO77jpisZBEP5k7j6Z80So5ZRW0vrc)
So lets answer our assistant and write input in our simulator:
*My name is Thomas

If you configured everything propertly...

you will get such output:
*Hello Thomas For what city do you want to get weather, Thomas*

In your ngrok container in your local machine you will get a query:

![enter image description here](https://lh3.googleusercontent.com/cTrEJQ-2FDM8jYkAgrLYtUH0pEeBRVPH1lzEWsHJfcdFAbEfx1FGVyliuAmO-vC8QlbTAnznYdA)

and in your Google assistant container you will see first logs

![enter image description here](https://lh3.googleusercontent.com/zbdLvOCCRUeWIcRCBnVlOdGbGc5FNw_RTm9DzI-ZOPE4CNAATp_jfaKigyLccg3FkBUW_TlwIqs)

You can test your action with your private Google home:
try to test it with saying:
Ok Google, talk to {your defined in Google actions skill invocation name}

# Instructions for a quick deployment to Heroku

Sign up for [Heroku](https://signup.heroku.com/dc) (it's for free).

## Linux

1. Install heroku client, for example in ubuntu
```bash
  $ (wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh)
  ```
2. login to the client
```bash
  $ heroku login
  ```
3. Create your app in heroku server
```bash
  $ heroku apps:create --region eu
  ```
4. Set npm config to false
```bash
  $ heroku config:set NPM_CONFIG_PRODUCTION=false
  ```
5. Clean all gits files
```bash
  $ sudo rm -rf .git
  ```
6. Init a clean git repository
```bash
  $ sudo rm -rf .git
  ```
7. Init a clean git repository
```bash
  $ git init
  ```
8. Add and commit all files
```bash
  $ git add . && git commit -m "my first commit"
  ```
9. Push your files to heroku
```bash
  $ git push heroku master
  ```

After pushing you will get your heroku app https address. Please copy it and paste to [endpoint](#id-dialogflow-endpoint) 

   11. Start webapplication in heroku
```bash
  $ heroku ps:scale web=1
  ```
   12. You can see logs output
```bash
  $ heroku logs --tail
  ```

## Windows
the steps are the same. You need only install heroku for windows https://devcenter.heroku.com/articles/heroku-cli#download-and-install

# Instructions for a quick deployment to Firebase
TO DO
Sign up for [Firebase](https://firebase.google.com/) (it's for free).
https://www.youtube.com/watch?v=LOeioOKUKI8

# Some References for Google Assistant actions developing
https://www.npmjs.com/ - npm is the package manager for JavaScript and the world’s largest software registry

https://codelabs.developers.google.com/?cat=Assistant – Google Labs how to build actions (skills) in Node.js for google assistant

https://github.com/falent/googleHomeAssistantExpressNodeJS - Our tutorial for google assistant

https://github.com/falent/GoogleAssistantTutorial - our tutorial and code snippets

https://www.tutorialspoint.com/nodejs/ - Node.js Tutorial

https://dialogflow.com/docs/getting-started - Official DialogFlow documentation

