
# How to build your first google Assistant action (skill)?

In this short tutorial we will show you how to write a very simple google assistant skill and develop it on your local machine. We are going to use Docker to avoid any additional installations and ensure that all of us starts with the same code in the same environment (less problems for all of us. For those who don't know how docker works it is a good example) Don't worry although we use docker you will edit your code only locally because we implemented a mount option (shared folder).

When you finish your developing you can easily upload your code to any https server. At the end of this tutorial we will show you how to do it with Heroku and Firebase. After that you can publish your first skill. Of course our solution will work with any Https node.js server provider (AWS, Azure, Openshift etc. )

## Requirements
As it was mentioned at the beginning we will work with docker. You need to use also an google account.

### Docker installation
#### Linux
https://docs.docker.com/install/linux/docker-ce/ubuntu/
#### Windows
As new version requires hiperView feature we decided to use docker Toolbox:
https://download.docker.com/win/stable/DockerToolbox.exe

### Google Account
Please create a new google account or use what exists.
https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp

### Node.js IDE
We will use webstorm
https://www.jetbrains.com/webstorm/download/
but you can use any of your favourite JS/Node.js IDE

## "Interaction Model" Configuration

We will use dialogFlow and google actions to configure our "interaction model" and publish it for google assistant. Interaction model is a voice logic which needs to be defined in google actions and dialogflow.

### I. Google Actions
An action in this case you can imagine as a part of voice programm (voice skill) that extends the functionality of the Google Assistant. To start your voice action you need an invocation name. In our case we will create a weather action (skill) and we can start it by saying "OK google, talk to [your defined invocation name]". After that google will call your external fulfillment to start a conversation with the user. The fulfilment is based upon your deployed web application.

The voice interactions are transformed from audio to text and backward till a conversation between the user and google assistant reaches its end.

![https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png](https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png)
Source: https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png

#### I.1 Create a new project
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need a google account to log in. Click a plus button (add / import project) and after that create a project with the given name.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg?w=840&h=540)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg)

#### I.2
At the next page choose "skip".

#### I.3 Define the invocation name
In actions invocation define the invocation name for your skill. Click on save.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png?w=840&h=593)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png)

Congratulations, you created your first project, but the simulator is not active yet.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png?w=840&h=789)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png)

The reason is that there is no voice logic behind it. That means there are no interactions defined between google assistant and the end user for  your skill. To create the interaction logic we will go to the dialogflow which we described in the next step.

### II. DialogFlow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. We need it to translate human voice calls into JSON objects that can be consumed by  our backend code and backwards to tranlate the responses from our backend to voice Phrases. You define how all this works within a Dialogflow agent.

#### II.1 How does dialogFlow work?

1. A user starts voice interaction or text interaction saying/texting
*OK Google, talk to [your definded invocation name]*

2. Google calls dialogFlow looking for defined logic. 

3. Dialoglow looks for a user's intention (what user wanted to do):

	a) If the whole logic is defined in dialogflow, dialogflow calls actions and actions return answer to user
    
	or
    
	b) DialogFlow calls your external code and returns answer comming and proccesed from you code to google actions 	and it to your end user
	
In the next step open the Dialoglow interface:  [https://console.dialogflow.com](https://console.dialogflow.com) 

![](https://lh3.googleusercontent.com/p-ErkiJR_C8AAppI3qefIA0Oqwdq5ib0NtjgiVhY0Wg7sGzYM9lxUMLEcR1krkag5_pdZIdtR_kpCdF1NQH6EqJQP0vKV9WemqP_qmkpt3RtYiGBYtN4Bg8Zfwc41GcXtS2IcG7BWbddn8L2bV2sno1xusprTI7uNzHGiBbv1l6EgYtBPJCIl3E_g4U_Vkvn2kqPVoOlJnCBAx1cTc-1dznIwbfDIxcvtfAGY5KmRmq11fAf74qJ3zysdl1YE7bc2i9AIfosIQuvfi7XASiqhnWCgZ5zxOhXd3sy8Gn8Dej1xV4cUY1sacszlDkVYKQEEiscsIzeaSxy-B58S5-sMTvhh7Xg-M4_KjUkyimawULa09OTkfC9lmAzXuG61r7E-nkKSOe0Iqompr1PjhV1d5Td6_p29MK5jra9zECaafM9DPdqhaKg_IWIiAvD-LuRe_d9o79D-dAJjMOXJW1ItaKlhbp7ctDsrVlF_gnqFSweNffF8oGJRGlOkSYVip-6gFDMnzK7cwFzezXS9BO8_xyfsAYAwNvwIJr5AH319dDh_pysXJbCjHJ4nhfDkzCqlVGpXXAlg3GcTPxepfNgcnFzqxFIXnvC1Wim3NaGYgYEKOKsXpH7KNLBzJjGcCrOGQg_W4J7EB3y99zLsBi2l9F1vquIrNOlYlwrtHPpMYYwrh-xgXgmzsqPmNkUJsce6kR9XLgx3DzRA9CH=w1188-h591-no)


#### II.2  

Create a new agent where you configure your interaction model for your skill. ** Please keep in mind to import your created project (GOOGLE PROJECT) from google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

![](https://lh3.googleusercontent.com/So8pgbym02Gu8W1noyXNd5Bk5L_pFs-yNf497XxvusvyUvhNz5UPbcb3KFoWvT8W-Y-HmXuGPFXDFKK8O-ifYahPz2fCifPUvd7hd-s3FVp-7ld5dgqRv9S-9BEUAgLa0T2eQA-6h_MJxlzDmoz-8LUHffgedaDrJ009ge-QoK1TdO5FEKrM_x69AmFEiiPV_MSOYJaKpXAEvhgIfS6ivtU6y6sm5-rNqwxbzgEi7Njibo2ZJ_h47Bt0IpMNxI4JSZzlkNhibdTt7LWQELwl3AaU_jpYUDzkZ1SXeNEMQTnpDSugcutVJcJ7qkifwKc0y9muN0C6-gmg7G8RP1f8thv3glb9zLUdvpo8qyhpS8Fyja1NkIE130jnI1noM9qFk0PgWI8B0kptfyY9n8gg_XfcrmNiEteiq48D-2DJX_Thjnt0CdsvHnQsxfLETjx0l8-HJyJEuf4u-ixVVM7ukAMmPkI-QLlytJquji2nZNFvB44uT2THiYa-W-OHbyn3YSlCMXtDaOryekauJwfiCRhIp-eWSFhMjaBNFiFiJT826WPxJee_Rd8QVh4_D2atFjItFK7dXmmeF0u-qWMzrq7c9EdnhKh48Hx-ZlbZL0_n9T3MEOufFuXV25Le0UR7a71KeSlwN2iNORjyvvnjL0kpP3d_qLwadcLsTiHEKkpsTC-r5Wy0peuERMz6-X5naCXp4J1Fi3_l7mD0PILI1bCJxCMZJXT0e71U=w1440-h468-no)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### II.3 Add your first intent
Intents are anticipated user intentions about what users might want to talk with the voice assistant in an action. For a weather action possible intents would be questions about the temperature or precipitation. Intents are triggered by predefined utterances and key words from the user. Possible questions about the weather could be "Will it rain today?" or a keyword might be "temperature". Utterances like these are defined as training phrases in an intent of your action.  To  see how its configured click on Intentions in Dialogflow. Select the default welcome intent. Here you have listed several training phrases that invoke the welcome intent. Under Responses you see what the google assistant could  answer to the user utterances. that triggered the welcome intent.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

#### II.4
If you want to use your own code for an intent you need to enable one option on the buttom of your intent.

Swip „Enable webhook call for this intent“ and click „save“  button

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)

#### II.5
Add a new Intent for example "nameIntent". This intent we will integrate with our code.
In the traning phases add f.e "My name is Christina". DialogFlow will instantly recognise it as traning phrase that cointains a name parametr. Your parametr name will be called "given-name" and all entitieties are defined by Google. During our meeting we will show how to build user defined entitites.

We won't define responses in that case because we want to have more control how google assistent answers. so we will do it with our code. Please click on enable fulfillment and "Enable webhook call for this intent".


#### II.6
Add an additional Intent. It will be responsible for getting us a weather information. You can call this intent as
„getWeatherForcastIntent“.

In this intent page, add some traning phrases:

> Tell me the weather for Essen
> 
> Berlin

DialogFlow will automatically recognise it as  @sys.geo-city (it will be our parametr). If not please click on Essen word and define it as @sys.geo-city entity. It means with this entity you could ask for any city weather.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png?w=840&h=313)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png)

Please keep in mind that we will fullfill this intent by webhook. Enable it as you have done in II.4 point. Please save  your intent.

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

Please be sure that you started "docker quickstart terminal". All Docker commands you can execute in cmd terminal.

### 4. Docker Containers

Please do all steps in that order which is described below :) We will create 2 containers which will be connected to each other in one docker virtual network.

Our simplified architecture looks like that:

![](https://lh3.googleusercontent.com/-K-UcRiRJgzjwR2b8v4sE2h3TZyhPznsM8cB86G37KGJdBKz3KUB2L6hG_UJclx0irdxsGzog0gOpkgE-5nNogmkVImDqgcB7vUnoo6bfhjeEQwNKxjZOm43J33u9sLBWUmVwteZNYDiZ2su3PvJ9D7-UNWsOronF4WBGCBoK4A5RriYA-0r46Jru6OcAxgnX0QDiOG78j9l0g4r3AR-DdOSVrqxPWdOMdL3EfNDO-M5W1fDtpynYuySaffC-ADorUOYDZVNsRGBnSxRuIurYLABdIGxs5-KYn0Gs2Qc_syYO35Sxn7DSTdiiVvyY7Neqa3FRr1Yu5AXWdLh0y1WBfNQicXF7cx5FvCUU-0clalgXM8XB18jp8evF3-d79UWDLNT43-2QYri1OmRSK72MygtrkFETsMMT6r-dsjQpwIgjQQublTmGfN4HcDmzTUjqO_vcMR6C4EOk5bavZUzv-3YMWVkSk2vDtjPSjnHtfRezNHguwSERvQhiwV2KDxw3XIq67xVbfkGdORIKTEzwNyapl55lnOwc_8TNJkgtlXJ02qOFjq7uF9mzCi-gW3saHQnkXjXLEQl1vmktVij5MreGlIfnPO99hMSspf5BGM7R7MqoPaTvI_aIkJGKlHSYd5DuFqhobgYNUSMcx3ioep99fGxJP2WVNOGlVxoXtJ9GCR4fYiMTgMDJufmkE0KoqcVi_qtBqbcfkaK=w1175-h387-no)

Ngrok is a gateway which communicates in Internet with Goole Assistant requests/respons. Our node.js action (skill) app is closed in docker container but we shared with it our local code. It means node.js app reacts on our local code changes instantly.

#### IV.1  Project configuration<div id='id-project-configuration'/>

#### Linux
Open your terminal and execute following commands:

1. Clone our repository
`$ git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  ~/Desktop/Template/Google_Assistant_universal_skill_template `

2. Go to the cloned git repository:
`$ cd ~/Desktop/Template/Google_Assistant_universal_skill_template`

3. Create a new Docker network in a terminal tab:
`$ sudo docker network create myNetwork`

4. Run the _ngrok_ Docker container in your terminal **and do not close this tab!**
`$ sudo docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new tab and run an _Google Assistant_ Docker container:
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

#### Windows

You can use a batch script in your command line to do all steps automatically.

If you put this curl command to your cmd terminal, batch script will execute all [commands](#id-commands) that you could do manually ;)
`curl https://raw.githubusercontent.com/falent/googleHomeAssistantExpressNodeJS/master/scripts_for_meetup/automatedInstallationWindows.bat > automatedInstallationWindows.bat && automatedInstallationWindows.bat`

Please keep in mind that you should execute this script only once. If you close window or you want reload npm modules please use these [commands](#id-commands-restart)

The content of the batch script file you can see here. I put comments what they are doing.
https://github.com/falent/googleHomeAssistantExpressNodeJS/blob/master/scripts_for_meetup/automatedInstallationWindows.bat



**OR**<div id='id-commands'/>

We encourage you to do all stepps by yourself in cmd consol because you can understand better what we are going to do :)

1. Before we start you need to ensure that Git is properly configured to handle line endings.
`git config --global core.autocrlf true`

2. Clone our repository. Your repository will be saved automatically in your Documents in catalog googleHomeAssistantExpressNodeJS.
`git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS `

3. Go to the cloned git repository:
`cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS`

4. Create a new Docker network:
`docker network create myNetwork`

4. Run the _ngrok_ Docker container in your cmd terminal **and do not close this tab!**
`docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new cmd window and run an _Google Assistant_ Docker container:
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

The last docker command means: please run me a container and share with it my local catalog where googleHomeAssistantExpressNodeJS app is. It is sharing your local app (:/) to skill catalog with your docker container, catalog named skill. Please do not change any path because it is right. After that we add created network so that all containers can talk to each other and we define a name of our container: "myAssistant". The docker image is downloaded from docker hub falent/google_home_assistant_express_node_js_server:1 (https://hub.docker.com/r/falent/google_home_assistant_express_node_js_server/)

#### IV.2  Output
you should see a such output if our myAssistant container works property.

![enter image description here](https://lh3.googleusercontent.com/5V5vOys_GXe4zhktu61BtRz9Avm9HQhu5-V01z4xTL6pqU2FKdi3bW9lidgpakwRjeWTMkYUHKM3jK2plhqBTkaAZ0bjKIfdpHQZsxYx5drrR7g9bHOqhDy5f1XmicWXOMigPRim5Wh6N1bezZGgXYvztdCwUvVrxgkrOg6ejwnE5f-jiwWU7lFpf2ZLeRhBZfkKdFq5ZsoZ9CFjSMUwxrMaHxefsGEZ4peLuUXJrzvlKd5d5NOmjbVKI652F_Q3UQwqFIbzKMO00FPrdHXN6P9e3v_ysseJK9jBZIW_ZJ0sugpHrKG15y8COJr4VGIbob8ZAUSeQc2_yACTSomqz_7jub035dtzDiI6ed66uqiNBMEsf69XTXXzAJF-OawtzJg3GzGAIwKaftZllOURCF5sFEI75KUozU-P5y-44N3LWm9JeCyAdCMJ8vSnmeLa7m5t229K8r7-mnc4-cKtY0fuUMI5zGJalrZUZMA7imn1NRnOldWmGUhcFcPSr4awqYLXckvwTXOSOoAN0lHOM36hKV-sndD15nWdzI-_CLMAydSaiQxBACdE-hsnvxX0vX-me8L3yrcRZdO1UYycIznafp4cevYmdWK0fYm9NwMqGKlmAWV4TY4Je7FTYuDcoSKOIqeHy2RrDAFwQ4oK1w0mWq14S4sHYiWfvLgIzTSXCuYDeKDV_RrK8KYfmOV3DeB5ZnfbEEX22bAQ=w1916-h446-no)
## OPTIONAL STEPS
In this section you could find optional steps if you wish to restart your docker or rebuild everything

### Restart (in case of new module installations or if you want to start your container app)<div id='id-commands-restart'/>
Our solution is based on nodemon which is kind of watcher and it reloads your skill everytime you made code changes. You save a lot time because of that ;) However it can happen that you wish to add more npm modules https://www.npmjs.com/ to your skill. In that case you need to restart your container. Npm modules are installed only at the start of your container. Of course if you close window with your myAssistant container to start it again you only need that commands below:

#### Linux
`$ sudo docker restart myAssistant && sudo docker container logs  --follow  myAssistant`

#### Windows
`docker restart myAssistant && docker container logs  --follow  myAssistant`

### Rebuild your image
In case we change something in our meetup event or you want to have a most current version... After executing this command go to [Project configuration](#id-project-configuration)

#### Linux
`$ rm -r ~/Desktop/Template/Google_Assistant_universal_skill_template && sudo docker rm myAssistant && sudo docker rmi falent/google_home_assistant_express_node_js_server:1 `

#### Windows
`rmdir /Q /S C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS && docker rm myAssistant && docker rmi falent/google_home_assistant_express_node_js_server:1`


### 4. Dialogflow
#### IV.1 Ngrok address
Please copy **https** address from ngrok docker.

![enter image description here](https://lh3.googleusercontent.com/lxynDDtaZzBgyqMiyW5twybVpWpWg5yEJ0Qt0ujyPqUUoh-npvxaTC8qyu2FnIiz_LP7oMEGqWA)
#### IV.2 Dialogflow endpoint<div id='id-dialogflow-endpoint'/>
enable Webhook in Dialogflow,  put your copied https address and click „save“
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png?w=840&h=354)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png)

[https://7bf316ed.ngrok.io/](https://5f04bf42.ngrok.io/bikebuddy-8448e/us-central1/myApp)


At the end you go to Integrations in DialogFlow and choose Google Assistant integrations. You need to add "implicit invocation" with your created intents.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png?w=840&h=505)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png)

Set up explicit invocation as welcomeIntent

Now you can test your app clicking on the buttom "Test" link.

Please remember that if you use on your computer at least 2 google accounts that the one you are logged to DialogFlow will be the first one you are logged in or to be secure that everything works stay logged in the browser only with a one account.

# How to test your skill?

1. Open your DialogFlow interface with your skill and go to integrations --> Google Assistant. When pop up window is opened go choose "TEST"

![enter image description here](https://lh3.googleusercontent.com/f0SmNm1IG10wCkpkOprvIu7Bp0Oz4ZXDZplxpV1ptFzWI5kK_XNh1GddmtkIRqrciL_jLs4YLas)
You will be taken to Google Actions simulator.

Just click on you suggested input. In my case it is "Talk to Tomasz skill". In your case will be "Talk to {your defined in google actions skill invocation name}"

![enter image description here](https://lh3.googleusercontent.com/d1lgHJtXF6o8LOA77GKGP5QQrXvde0DFrc7noDSDUcuWxrc59Sri9UPxWoVBKIP98_VIOQy-QrI)
Your skill will answer:
*Okay. Let's get the test version of tomasz skill.Hi! What is your name?*
We defined only one traning phrase in a dialogFlow. It was "my name is {your name}"

![enter image description here](https://lh3.googleusercontent.com/WAfnxThlWu4emdK-Qec_4gdiVJmQGqIEvCWdXxt5aOyEdfO77jpisZBEP5k7j6Z80So5ZRW0vrc)
So lets answer our assistant and write into input in our simulator:
*My name is Thomas

If you configured everything propertly...

you will get a such output:
*Hello Thomas For what city do you want to get weather, my dear Thomas*

In your ngrok container in your local machine you will get a query:

![enter image description here](https://lh3.googleusercontent.com/cTrEJQ-2FDM8jYkAgrLYtUH0pEeBRVPH1lzEWsHJfcdFAbEfx1FGVyliuAmO-vC8QlbTAnznYdA)

and in your google assistant container you will see first logs

![enter image description here](https://lh3.googleusercontent.com/zbdLvOCCRUeWIcRCBnVlOdGbGc5FNw_RTm9DzI-ZOPE4CNAATp_jfaKigyLccg3FkBUW_TlwIqs)

You can test your action with your private google home:
try to test it with it saying:
Ok google, talk to {your defined in google actions skill invocation name}

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

