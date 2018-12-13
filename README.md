
# Feedback
Give us a feedback after the meetup here. It is anonymous.
[feedback formular](https://goo.gl/forms/50s8xC0SMah77JpU2)

# Tutorial
Our short tutorial https://github.com/falent/GoogleAssistantTutorial

# How to build your first Google Assistant Action?

In this short tutorial we will show you how to write a simple Google assistant action and develop it on your local machine. We are going to use Docker to avoid any additional installation steps and ensure that all of us start with the same code in the same environment (less problems for all of us. For those who don't know how Docker works it is a good introduction) Don't worry although we use Docker you will edit your code only locally because we implemented a mount option (shared folder).

When you finish your developing you can easily upload your code to any https node.js server (Heroku, Firebase, AWS, Azure or Openshift). At the end of this tutorial we will show you how to do it with Heroku and Firebase. Of course our solution will also work with any other Https node.js server provider


# Table of Contents
1. [Requirements](#id-requirements)

	1.1 [Docker installation](#id-docker-installation)

	1.2 [Google Account](#id-google-account)

	1.3 [Node.js IDE](#id-node)

2. ["Interaction Model" Configuration](#id-model)

	2.1  [Google Actions](#id-google-actions)

	2.2  [Dialogflow](#id-dialogflow)

	2.3  [Create a new agent](#id-agent)

3. [Docker environment for our app](#id-docker-environment-for-our-app)

	3.1  [Docker Containers](#id-docker-containers)

	3.2  [Project configuration](#id-project-configuration)

	3.3  [Output](#id-output)

4. [Optional Steps](#id-optional-steps)

	4.1 [Restart Containers](#id-restart-containers)

	4.2 [Additional docker containers](#id-additional-docker-containers)

	4.3 [Debugging your app](#id-debug)

5. [Dialogflow fullfilment](#id-dialogflow-fullfilment)

6. [How to test your skill?](#id-how-to-test-your-skill)

7. [Deployment](#id-deployment)

	7.1 [Heroku](#id-heroku)

	7.2 [Firebase functions](#id-firebase-functions)

8. [References for Google Assistant actions developing](#id-references)



<div id='id-requirements'/>

## 1. Requirements
We will work with Docker. So you need Docker and a Google account.

Check permissions in your google account:
[google permissions](https://myaccount.google.com/activitycontrols)
The following have to be activated:

 - Web & App Activity
 - Device Information
 - Voice & Audio Activity
 
<div id='id-docker-installation'/>

### 1.1 Docker installation

#### 1.1.1 Linux
https://docs.docker.com/install/linux/docker-ce/ubuntu/

#### 1.1.2 Windows
For Windows we recommend to use Docker Toolbox, because you do not need to activate Hyper-V for it <sup>[1](#id-hyper)</sup>
https://download.docker.com/win/stable/DockerToolbox.exe

See requirements to install Docker Toolbox:
https://docs.docker.com/toolbox/toolbox_install_windows/

<div id='id-google-account'/>

### 1.2 Google Account
Please use an existing one or create a new Google account.
https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp

<div id='id-node'/>

### 1.3 Node.js IDE
We will use webstorm
https://www.jetbrains.com/webstorm/download/
but you can use any of your favourite JS/Node.js IDE like visual studio or atom or notepad.

<div id='id-model'/>

## 2. "Interaction Model" Configuration

We will use Dialogflow and Google Actions to configure our interaction model and publish it for the Google assistant. The interaction model is a voice logic which needs to be defined in Google Actions and Dialogflow.

<div id='id-google-actions'/>

### 2.1 Google Actions
You can imagine an action as a part of a voice programm that extends the functionality of the Google Assistant. To start your voice action you need an invocation name. (if you already programmed Alexa, action is like an alexa's skill).

In our case we will create a change rate action and we can start it by saying "OK Google, talk to [your defined invocation name]". After that Google will call your external fulfillment  to start a conversation with the user. The fulfilment is based upon your deployed application.

The voice interactions are transformed from audio to text and backward till a conversation between the user and Google assistant reaches its end (for example by saying stop).

![https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png](https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png)
Source: https://codelabs.developers.google.com/codelabs/actions-1/img/dbd725edb3a93e79.png

#### 2.1.1 Create a new project
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need a Google account to log in.
Click a plus button (add / import project) and after that create a project and give it a name.
![enter image description here](https://lh3.googleusercontent.com/ZAw2ND1s0AalDA4kfGUOQULAaZoT_ioMJHHKjtNOMb2NQ3mqmi7H09LJCyEwEn-QAFtHnHuZHaIe)

**At the next page choose "skip".**

#### 2.1.2 Define the invocation name
In Actions Invocation define the invocation name for your action. Click on save.

![enter image description here](https://lh3.googleusercontent.com/B3O1zyFQ8Ikx8FomVS_FdebuN-Q010I9B3B4ni5mZwFJnGdr5Ezaz05oaalmrjzvTfJ972ZPVWRS)

Till now there are no interactions defined between Google assistant and the end user of your action. To create the interaction logic we will go to Dialogflow.

<div id='id-dialogflow'/>

### 2.2 Dialogflow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. We need it to translate human voice calls into JSON objects that can be consumed by  our backend code and backwards to tranlate the responses from our backend to voice phrases. You define how all this works within a Dialogflow agent.

#### 2.2.1 How does Dialogflow work?

1. A user starts voice interaction or text interaction saying/texting
*OK Google, talk to [your definded invocation name]*

2. Google calls Dialogflow using google actions and looks for a defined agent for the invocation name.

3. Dialoglow checks if user intention is correponding to one of the training phrases. If Dialogflow detects a suitable intent there are two ways to call the logic behind the intent:

	a) If the whole logic is defined in Dialogflow, Dialogflow will send a response to the user

	or

	b) Dialogflow calls your external code and returns an answer processed from your code to Google Actions which returns it to your end user


[![](https://lh3.googleusercontent.com/cl0A2laq_UEcrg1d4lMTpUmRNauWVgKZM_qVurP-Z1ptZY53ZUR9TOBtFZghAU2SLwL5x7YTdu6IwMvdmjIb30pyg40DRO2aJ4NDaCDM2bogmL9Y5vWhEySeTG7U45uOez9nkOieoUQKClwT6vfT4F9zwBHbwR2lghxexRBqZTXk2cm57cZq1X4NNZXaFNIwZ2bh2_m2FfWvQMnEL4lQ6tttQ3KqPHzkhzvXV7SYRhTH42AItqNS5HEoRKsIQ2s1pCNRe52wz4YIqZZpaIKWWzI_D4Hyx_dTxIomstMzaOJY97oR5Vfq6Bhx8z6DPmwRRRSYgN62FoIRQAjc8UB0ADOrJHEW-SV0S75jlth5d8sjiUBaxf8OgZjfxEDlc63k4tFTnH5iaISuzMSx8RPDg0XkhCwhxKHLhjbF_bZ23mWwsh2FFi2qYut9lIxnozeFo13ufvQkytQvjzM5u4x-MQlv3F1c3ljO-bIttJFkg1WekCq8X1G_KHZ5bJb51oykaqf_5yRV79xPOYVUUSbhqKR0Ff-R7YDitdQioKCARa9QByZ75VomxIgow2F2bAXgsSxx2Lc4QrjASYEmAr-WpYnED6by0fxyYuHAXDaCFDhFhw08NvdA7n8C_Vn7Nb0_eu2k298SI5yKbpXRM5Jf8XZ1NOf7iBzJQJyAYVlHtv2Jl5SFGkEJ3Pgo48Qb6LjqIgb83lPOD02FTe9bPw=w1231-h612-no)](https://lh3.googleusercontent.com/cl0A2laq_UEcrg1d4lMTpUmRNauWVgKZM_qVurP-Z1ptZY53ZUR9TOBtFZghAU2SLwL5x7YTdu6IwMvdmjIb30pyg40DRO2aJ4NDaCDM2bogmL9Y5vWhEySeTG7U45uOez9nkOieoUQKClwT6vfT4F9zwBHbwR2lghxexRBqZTXk2cm57cZq1X4NNZXaFNIwZ2bh2_m2FfWvQMnEL4lQ6tttQ3KqPHzkhzvXV7SYRhTH42AItqNS5HEoRKsIQ2s1pCNRe52wz4YIqZZpaIKWWzI_D4Hyx_dTxIomstMzaOJY97oR5Vfq6Bhx8z6DPmwRRRSYgN62FoIRQAjc8UB0ADOrJHEW-SV0S75jlth5d8sjiUBaxf8OgZjfxEDlc63k4tFTnH5iaISuzMSx8RPDg0XkhCwhxKHLhjbF_bZ23mWwsh2FFi2qYut9lIxnozeFo13ufvQkytQvjzM5u4x-MQlv3F1c3ljO-bIttJFkg1WekCq8X1G_KHZ5bJb51oykaqf_5yRV79xPOYVUUSbhqKR0Ff-R7YDitdQioKCARa9QByZ75VomxIgow2F2bAXgsSxx2Lc4QrjASYEmAr-WpYnED6by0fxyYuHAXDaCFDhFhw08NvdA7n8C_Vn7Nb0_eu2k298SI5yKbpXRM5Jf8XZ1NOf7iBzJQJyAYVlHtv2Jl5SFGkEJ3Pgo48Qb6LjqIgb83lPOD02FTe9bPw=w1231-h612-no)


In the next step open the Dialoflow interface:  [https://console.dialogflow.com](https://console.dialogflow.com)

<div id='id-agent'/>

### 2.3  Create a new agent

Create a new agent where you configure the interaction model for your action. ** Please keep in mind to import your created project (Google PROJECT) from Google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

![](https://lh3.googleusercontent.com/So8pgbym02Gu8W1noyXNd5Bk5L_pFs-yNf497XxvusvyUvhNz5UPbcb3KFoWvT8W-Y-HmXuGPFXDFKK8O-ifYahPz2fCifPUvd7hd-s3FVp-7ld5dgqRv9S-9BEUAgLa0T2eQA-6h_MJxlzDmoz-8LUHffgedaDrJ009ge-QoK1TdO5FEKrM_x69AmFEiiPV_MSOYJaKpXAEvhgIfS6ivtU6y6sm5-rNqwxbzgEi7Njibo2ZJ_h47Bt0IpMNxI4JSZzlkNhibdTt7LWQELwl3AaU_jpYUDzkZ1SXeNEMQTnpDSugcutVJcJ7qkifwKc0y9muN0C6-gmg7G8RP1f8thv3glb9zLUdvpo8qyhpS8Fyja1NkIE130jnI1noM9qFk0PgWI8B0kptfyY9n8gg_XfcrmNiEteiq48D-2DJX_Thjnt0CdsvHnQsxfLETjx0l8-HJyJEuf4u-ixVVM7ukAMmPkI-QLlytJquji2nZNFvB44uT2THiYa-W-OHbyn3YSlCMXtDaOryekauJwfiCRhIp-eWSFhMjaBNFiFiJT826WPxJee_Rd8QVh4_D2atFjItFK7dXmmeF0u-qWMzrq7c9EdnhKh48Hx-ZlbZL0_n9T3MEOufFuXV25Le0UR7a71KeSlwN2iNORjyvvnjL0kpP3d_qLwadcLsTiHEKkpsTC-r5Wy0peuERMz6-X5naCXp4J1Fi3_l7mD0PILI1bCJxCMZJXT0e71U=w1440-h468-no)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### 2.3.1 Add your first intent
Intents are anticipated user intentions about what users might want to talk with the voice assistant in an action. For an exchange rate action possible intents would be questions about the exchange rate from a source currency like Euro to a target currency like Dollar. Intents are triggered by predefined training phrases and key words from the user. Possible questions about exchange rates could be "What is 50 Euro in Dollar?". To  see how its configured click on Intentions in Dialogflow. Select the default welcome intent. Here you have listed several training phrases that invoke the default welcome intent. Under responses you see what the Google assistant could  answer to the user utterances that triggered the default welcome intent.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

To add a new intent click on the plus button. Then define its name, training phrases and entities. Entities are variables for common key words the user might say. For example in our exchange rate voice app these are the currencies. To see how it works, add a new intent, name it getExChangeRateIntent, add a training phrase and type a currency name for example Euro in the training phrase field. Click enter and you see the currency will be textmarked and is resolved to the entity currency. Now every currency the user might say will be resolved to the currency type. Type in *Change 50 Euro to Dollar*. Now edit the parameter names to adress the currencies as fields in your app. Set 50 as @sys.number entity, name it amount then name the first currency currencyBase and  the second currencyTarget.

![enter image description here](https://lh3.googleusercontent.com/P1eqVPkx98lISrcxFx_MaZSRQuO7M4l1goSlkZ6YdKsRD83TtokOKb281br2tDcjol43u1PJrdPL)


#### 2.3.2 Add traning phrases
 You can define responses to the traning phrases in an intent in Dialogflow. **But we use our own code** so we will define the responses in our web application code. For that we need to enable one option on the buttom of our intent. **Swipe „Enable webhook call for this intent“ and click the „save“ button.**

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)

#### 2.3.3 Add Follow-Up Intents
Add a Follow-Up Intent. This will trigger when the user answers *Yes* to the Question "Do you like to change more?" in the assitants response of the getExchangeRateIntent. To do so, click on Intents, hover over the getExchangeRateIntent and click on *follow-up intent*, choose *yes*. Create a *getExchangeRateIntent - yes* Intent. Add just one response. "What do you want to change?". Do not enable webhook call for this intent. This intent will be resolved only in dialogflow. Click *save*. 
Add a second Follow-Up Intent for the getExchangeRateIntent. This will be triggered, when the User rejects the assitants question. It will mark the end of the conversation and Google Assistant will left the conversation. Add a response like "Bye, till next time". Like the follow-up yes intent it will be resolved only in dialogflow, so do not enable webhook call for this intent. 

#### 2.3.4 Add the starting point of the conversation
Define a starting point of the conversation. Create a new intent and name it *welcomeIntent*. Add *Google Assitant Welcome* to the Events. This defines our welcomeIntent as the starting point of the conversation. Under Fulfilment enable webhook call for this intent. Every content of this intent is defined in our web application. So we do not need training phrases or responses in dialogflow. Do not forget to enable webhook call for this intent. 

#### 2.3.5
Below you see a dialog sample for our action:

![enter image description here](https://lh3.googleusercontent.com/ErRJFoN4My0YR5NrcqcWvNQ9xKpIuos3N8Lei6ByBbMkM-jQOc2mQur7GaLqryA4ZkE8zlLPZ24A)

<div id='id-docker-environment-for-our-app'/>

## 3. Docker environment for our app

If you use Windows install [Docker Tools](https://download.docker.com/win/stable/DockerToolbox.exe) on your machine or if you use docker under linux [Docker CE (Community Edition)](https://docs.docker.com/engine/installation/#desktop) to test your Docker installation execute the following command:

linux:

`$ sudo docker run hello-world`

windows:

`docker run hello-world`

If you don't see his output  in windows:

`Hello from Docker! This message shows that your installation appears to be working correctly.`

Please be sure that you started "Docker quickstart terminal". You can  execute all Docker commands in a windows cmd terminal.

<div id='id-docker-containers'/>

### 3.1 Docker Containers

Please do all steps **in the order they are described below** :) We will create 2 containers which will be connected to each other in one Docker virtual network.

Our simplified architecture looks like that:

![](https://lh3.googleusercontent.com/-K-UcRiRJgzjwR2b8v4sE2h3TZyhPznsM8cB86G37KGJdBKz3KUB2L6hG_UJclx0irdxsGzog0gOpkgE-5nNogmkVImDqgcB7vUnoo6bfhjeEQwNKxjZOm43J33u9sLBWUmVwteZNYDiZ2su3PvJ9D7-UNWsOronF4WBGCBoK4A5RriYA-0r46Jru6OcAxgnX0QDiOG78j9l0g4r3AR-DdOSVrqxPWdOMdL3EfNDO-M5W1fDtpynYuySaffC-ADorUOYDZVNsRGBnSxRuIurYLABdIGxs5-KYn0Gs2Qc_syYO35Sxn7DSTdiiVvyY7Neqa3FRr1Yu5AXWdLh0y1WBfNQicXF7cx5FvCUU-0clalgXM8XB18jp8evF3-d79UWDLNT43-2QYri1OmRSK72MygtrkFETsMMT6r-dsjQpwIgjQQublTmGfN4HcDmzTUjqO_vcMR6C4EOk5bavZUzv-3YMWVkSk2vDtjPSjnHtfRezNHguwSERvQhiwV2KDxw3XIq67xVbfkGdORIKTEzwNyapl55lnOwc_8TNJkgtlXJ02qOFjq7uF9mzCi-gW3saHQnkXjXLEQl1vmktVij5MreGlIfnPO99hMSspf5BGM7R7MqoPaTvI_aIkJGKlHSYd5DuFqhobgYNUSMcx3ioep99fGxJP2WVNOGlVxoXtJ9GCR4fYiMTgMDJufmkE0KoqcVi_qtBqbcfkaK=w1175-h387-no)

Ngrok is a gateway that communicates with Google Assistants requests/responses via https. Our node.js action (skill) app is deployed in a Docker container and we share app code from our localhost with it. Thus we can change the code locally and the deployed app reacts instantly to the changes thanks to the npm package nodemon.

<div id='id-project-configuration'/>

### 3.2  Project configuration

#### 3.2.1 Linux
Open your terminal and execute the following commands:

1. Clone our repository from github
`$ git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  ~/Desktop/Template/Google_Assistant_universal_skill_template `

2. Create a new Docker network in a terminal tab:
`$ sudo docker network create myNetwork`

3. Run the _ngrok_ Docker container in your terminal **and do not close this tab!**
`$ sudo docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

4. Open a new tab and run our Google Assistant Docker container. The Docker image is downloaded from my Docker Hub account falent:
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server`

#### 3.2.2 Windows

You can use a batch script in your command line to do all steps automatically.

If you put this curl command to your cmd terminal, batch script will execute all [commands](#id-commands) that you could do manually ;)

`curl https://raw.githubusercontent.com/falent/googleHomeAssistantExpressNodeJS/master/scripts_for_meetup/automatedInstallationWindows.bat > automatedInstallationWindows.bat && automatedInstallationWindows.bat`

Please keep in mind that you should execute this script only once. If you close the window or you want to reload npm modules please use these [commands](#id-commands-restart)

You can see the content of the batch script file here. I put comments to explain what they are doing.
https://github.com/falent/googleHomeAssistantExpressNodeJS/blob/master/scripts_for_meetup/automatedInstallationWindows.bat



**OR**<div id='id-commands'/>

We encourage you to do all steps by yourself in a windows cmd console because you can understand better what we are going to do :)

1. Before we start you need to ensure that Git is properly configured to handle line endings.
`git config --global core.autocrlf true`

2. Clone our repository. Your repository will be saved automatically in your Documents in the directory googleHomeAssistantExpressNodeJS.
`git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\ga\googleHomeAssistantExpressNodeJS`

3. Create a new Docker network:
`docker network create myNetwork`

4. Run the _ngrok_ Docker container in your cmd terminal **and do not close this tab!**
`docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new cmd window and run an _Google Assistant_ Docker container in your created network.
`docker run -v //c/Users/%username%/Documents/ga/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server`

To build the container named myAssistant a docker image is downloaded from the Docker Hub account *falent/google_home_assistant_express_node_js_server*.

(https://hub.docker.com/r/falent/google_home_assistant_express_node_js_server/)

The Docker command -v creates a shared directory, the flag -v means: Create a directory in the docker container and share my local directory googleHomeAssistantExpressNodeJS with it. With a shared directory we can edit our files locally and share it automatically with our directory in the docker container.

<div id='id-output'/>

#### 3.3  Output
You will see the following output if your created myAssistant container works properly.

![enter image description here](https://lh3.googleusercontent.com/5V5vOys_GXe4zhktu61BtRz9Avm9HQhu5-V01z4xTL6pqU2FKdi3bW9lidgpakwRjeWTMkYUHKM3jK2plhqBTkaAZ0bjKIfdpHQZsxYx5drrR7g9bHOqhDy5f1XmicWXOMigPRim5Wh6N1bezZGgXYvztdCwUvVrxgkrOg6ejwnE5f-jiwWU7lFpf2ZLeRhBZfkKdFq5ZsoZ9CFjSMUwxrMaHxefsGEZ4peLuUXJrzvlKd5d5NOmjbVKI652F_Q3UQwqFIbzKMO00FPrdHXN6P9e3v_ysseJK9jBZIW_ZJ0sugpHrKG15y8COJr4VGIbob8ZAUSeQc2_yACTSomqz_7jub035dtzDiI6ed66uqiNBMEsf69XTXXzAJF-OawtzJg3GzGAIwKaftZllOURCF5sFEI75KUozU-P5y-44N3LWm9JeCyAdCMJ8vSnmeLa7m5t229K8r7-mnc4-cKtY0fuUMI5zGJalrZUZMA7imn1NRnOldWmGUhcFcPSr4awqYLXckvwTXOSOoAN0lHOM36hKV-sndD15nWdzI-_CLMAydSaiQxBACdE-hsnvxX0vX-me8L3yrcRZdO1UYycIznafp4cevYmdWK0fYm9NwMqGKlmAWV4TY4Je7FTYuDcoSKOIqeHy2RrDAFwQ4oK1w0mWq14S4sHYiWfvLgIzTSXCuYDeKDV_RrK8KYfmOV3DeB5ZnfbEEX22bAQ=w1916-h446-no)

<div id='id-optional-steps'/>

## 4 OPTIONAL STEPS
In this section you will find optional steps if you wish to restart your Docker or rebuild everything. You can go directly to the 5th step.

<div id='id-restart-containers'/>

### 4.1 Restart (in case of new module installations or if you want to start your container app)<div id='id-commands-restart'/>
Our solution is based on nodemon which is kind of a watcher and it reloads your skill everytime you made code changes. You save a lot of time because of that ;) However it can happen that you wish to add more npm modules https://www.npmjs.com/ to your skill. In that case you need to restart your container. Npm modules are installed only at the start of your container. To restart  your container type the following in a cmd terminal:

#### 4.1.1 Linux
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server`

#### 4.1.2 Windows
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server`

<div id='id-additional-docker-containers'/>

### 4.2 Additional docker containers
Imagine you would like to add a database to your Docker environment or any microservice app. With our solution it is very simple! Just start any database Docker container and place it in our Docker network. For example:

#### 4.2.1 MongoDB
You only need to start a new container:

`sudo docker run -it --name mongo_database --network myNetwork bitnami/mongodb:latest`

Your database is listening on port 27017. The name of the container will be "mongo_database". To request your database from node.js you need to call this address:
`mongodb://mongo_database:27017`

#### 4.2.2 MySQL
You only need to start a new container:

`sudo docker run -it --name=mysql1 --network myNetwork -d mysql/mysql-server:5.7`

check what generated password is:

`docker logs mysql1 2>&1`

and login to shell to create a new table

`docker exec -it mysql1 mysql -uroot -p`


<div id='id-debug'/>

### 4.3 Debugging

You can dubug our node.js app. 
#### 4.3.2 Linux
Execute in terminal:

`sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it -p 9229:9229 -w /skill/functions --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server /bin/sh -c 'npm i && nodemon --inspect-brk=0.0.0.0:9229 start.js'`

and connect your IDE with debug mode with localhost port 9229

#### 4.3.1 Windows
In cmd terminal write:

`docker-machine ip default`

You will get an ip address. In my case it was: **192.168.99.101**

open your docker container using:

`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it -p 9229:9229 -w /skill/functions  --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server /bin/sh -c "npm i && nodemon --inspect-brk=0.0.0.0:9229 start.js"`

you should see that debugger is listening


![enter image description here](https://lh3.googleusercontent.com/4QaawDJjYH1UZtxRL88bOsLdtdjUtKdmr0fE7m9yenAVTzQ1vKKUJgRfshqco2RG1rGjOWjfcall)

Open for example WebStorm or any JS IDE supporting debug mode and connect to the debugger

In Webstorm click in the buttom toolbar Run-->Edit Configurations
Please choose from templates: "Attach to Node.js/Chrome"
In the host add ip address of your docker-machine. In my case **192.168.99.101**

![enter image description here](https://lh3.googleusercontent.com/tHxcCnHN6wc4Qg7FM-WqsBrnUpqaXrEpYsRyWY2_eBYy3N3OulflFn_eTtg_ikTJHSbdrFal3Ij7sr84XyTCXsed59h8yDthnsG5olrGG4t78vrcINhxuGEBs9p_62vWZlMstMaEAwh6oo8UEj60UAueE-Z3AJ427lJKXaNhYXVDIDn-XRa0svnhyeqoSfqvOZqZiJGmNVaKQ9JIWvAZsJvCyy2gwWAabP-7BvYCxu5oW4vCn9e6tFlCPxY8qPUhAU7LeJJH4d4wZ1T8kWpvf_G6lkOhheXjMgdaammQYd3PgcUtpCE8XbxaMq45rhknXX8Z-f-XgmKkoSjbTors2BhAq7vWWY2_Nwlwks18Mfvn2nyEUe1cTHqEnoUj3oQCJTeuMH9cPzpwyE67GGM0Pl1QZpnlIZv__HWMPa9O00rwITVflVUr09DcECKaNARjNW8OVM8SMoe9A-QBn49YTUObZ_MSPu1BX_xRpW9GdJ-BzqztrbaMQR9hAMbGxGP6B_n6iD0TWC92QkjeV0zqkVFBX4YKzoOWQxSV15agUYKPCFM2KpG_rJ1YtnWPCNOMR0PjJUzzdz44bdu0vh_60N78ZP1OV6j8BkXymOrdBvtTxv_X7uKtrtpJF1VgcbZzzPE9ahnGTlYRvtUAgJNw0zfNSkoxcvddE8MolHNTYk7b1Hq0BDk2G4bQvfOgPFhm_oGIEavzkz7uGR3hlA=w1346-h841-no)
and click apply and **+** button in the left button corner

![enter image description here](https://lh3.googleusercontent.com/Bss0hviB3jsPljLWRodBulNb3aOZE0X3SXwf1-Bf5K7VgeQOCh1xwi3yVPmp3_IMKrDIKZgu27_zH3orh3Vlwn-QexQFPzlcamP-zihZpuleaKa-MFy4Or0285VnWtkc1M_9Xj9Xbg6AJY4gnA1vEHPAi8HobQT8X2l13P796INCRhjd7hqNs442qsgJKXwjkLCX1Y04__FRHOE3ywH26rdg8u3-KVefsfAQgE5hcDRWsq5sq-TLM7nSaz0-AsK9_3uNiyHlT_mIsGMSYcqVEO1usyIAhUJe79DEPGHjUM0ONqorHKzaw9L1oXMDgxCkoLVKxnGAj_Ccu-X6mxRxj8cU0ExTHoBQtD5yZ2lVWP-N4R4RuUeLJ_Wo4ZPg0AxU3zP_A5PXHIUqTBptF1d199URQOV7ps68KbeiRhvUffWLwyzcaId--yLsDXn9ID1ZEUSSHiH8W8ztxZlMKx1ENjTTcIKPED8j911t_o-vEiiycjjIU_nq6bkHywFy3oUqjcsb98Hw2LwEIBo7Hb2HyXAwNQbhgXlpzIvcC_6qbogGVr3gxUSf8itbZPP5wffnGJ9T8huAZw-MdVbIPhd_c6A47wft9uu_RCn_Ya1Anrd99fEfkgUH6LLbpfDiDYdEYX31F6j2W5oEGCptzva-0DO24S2YIvwNrsoGa62yy8LfNd5gZ0ebDZMxZ-nrFW1doFTQoyLLprb2mrFtNw=w1145-h299-no)

Now if you click Run-->You can run your defined debug process

You can add your first breakpoint clicking to a choosen line and start conversation from DialogFlow.
You can see your debugged code in the WebStorm console.

![enter image description here](https://lh3.googleusercontent.com/_RGQbo9Hw3Bk53SgNFH1lZLYbi5eK8TVmbhsf9Le6bQZmJ7AYCCOFPsHgzvzyFWcxLlghsqm0tmvEp2aiakwebuLx-SEW0onBDdr9w96--Fdd5C9Ja-Qx3tu1eLd6REIFdm7robfx2PLEa4jOyyttmlfxyPMx30D2h5EAAt4APUu0rYMKcHMIxNz171Wrqy4iMcoPpSMV-8PuqEwklViBkVZvi0xrsDyyxnFQlghBYqwfyg7go57TwIPTfbxnPYJDJxivy_XHOu-x2HPl1OwgS0kIBPVF0e8HSflw28PqKxVl3YbFdhe3gp8OOdWfE-HQaul8CaJjH77dJ8eliucTBHJIqnyLHuAjemqcG_JTLNAJeKlLng4OuJLRZIPTJbK2h0BYWeOWk7mAnlqSoi-cTcWrODVmReRUAqmNYM8Lk-3zJSDtYi1gHOXaWRTzyV99y0Pfb4ZSsJ9nvAke4evQc94cIaUpdswWCj6BvAi_U0IpEzMbtgw24fvIh72k4nA_4HM_cYAfheXgzjCEJTk9eLYwRA0TwvcuUBCWLGV8J_0pzNN0yMmL_1S3ToTTPKKfMH82nNS-IHD9b92tWXnDpVcrj4R7CNs2Jq4mAk_MTZtQ8wxeDhbjj6woFj0fQI_TYFfn_t79JJA-3d9ulqyM9WjHmYIrXWgNb5oKuKuzKLSqNOOnXi64PU4YQsuvfoXBu_04c2eOriqP7bsCA=w1771-h679-no)


<div id='id-dialogflow-fullfilment'/>

### 5. Dialogflow fullfilment

We need to add a ngrok address so that our local server can communicate with Dialogflow

#### 5.1 Ngrok address
Please copy **https** address from ngrok Docker.

![enter image description here](https://lh3.googleusercontent.com/lxynDDtaZzBgyqMiyW5twybVpWpWg5yEJ0Qt0ujyPqUUoh-npvxaTC8qyu2FnIiz_LP7oMEGqWA)

#### 5.2 Dialogflow endpoint<div id='id-dialogflow-endpoint'/>
  Go to Fulfilment and enable Webhook in Dialogflow,  put your copied https address and click „save“.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png?w=840&h=354)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png)

At the end go to Integrations in Dialogflow and choose Google Assistant Integrations. Set up explicit invocation for the welcomeIntent and add "implicit invocation" for your created getExChangeRateIntent.
![enter image description here](https://lh3.googleusercontent.com/VHprPXcFV_ckVtjuirPyk2e8r66bPy28kNH30VSMUU0CY_VBeTfW8jST9_cRtWnat0QQXb2yf6ng)



Now you can test your app clicking on the buttom "Test". You will be taken to Google Actions simulator.

<div id='id-how-to-test-your-skill'/>

# 6. How to test your skill?

In the Test Simulator of Google Actions just click on your suggested input. It will be "Talk to {your defined Google Actions invocation name}"

[![](https://lh3.googleusercontent.com/VzmdSdo5WoC-rukAtOb1cHAG-HHkr_L5tU0nB7jF3-2Le9hXDZACMw8_JAL_R53ryWO_OvoIYN3G-9L9IcxBkO2JdBVCNbxVeSBj8nAPlWBGaqK7b_yBroUii-6Uuv0WlfOnxo7IoEvE-xkbzCb_yvxYAQhcRq3Jk9uLHEofKJZmjYme8OKJQLc-IAF-TKi0L8gXi5eZET8brzdvm7BYDVMikEiZTj8nuY3jQRyIdNUoPdDLSrAqMFbFlz-vny5VhUtq4qf48T76FBbWMsPmwEO0mVNznPtb77cSfAj8WBYHSHzZtzmbAC2JbZz2JK_6SxB61ZE7cPwqVwUR7NQGguKI_EV3RZzf5YafynyfyKh3LukPsCLFTStixQURObs1Ih39C5B_NAC_pbFZJSkzuGzzBsK_iI5967slFXuUg12V0GqeTPqIyUCjWZmibJ-Dsu56WMm23p5wHgx9S1kmB2ueP_oduQcseJ4Rh5b4bkrxhuJS6Am4bsVhfOAaZOUndMX7re8X0nJJwflNDrIBnFTGWwVAQLUVjIw1QcztnpTL0hMYF_kZpFPlp95ur2l8XcgIFAnaVaoZDT8qPEoB8vC75HDBxcNOqsF8XvMtjtZdSaKPcKxC0b0U9nfxzTM0uzLg2NmMUxLZH5S7hIQsh7aS_XS9mXPkFpY06c73q0hP4p6Ynyzvy_1qjPTG37vwB3hjCZunVFDzCA9RWw=w1641-h869-no)]()

Your action will answer:
*Welcome to Change Rate. What do you like to change?*
Add the predefined training phrase **Change 50 Euro to Dollar** for the getChangeRateIntent in the text field.

[![](https://lh3.googleusercontent.com/P7vDhB6gP6sepTHss_zRP108XaDscYYEkpdNVZYK9TP-wq-HJMuDr2zCVFbk6UqMEWCNnKkZmHZs7AR-f0algBq7CmMRCyFoT7FSil-JPTMWT7S32Z-ltjOZiC0AO7Q4vzl8fp_NFXULzl-wrlf5iyMuaqfZ2Ti7QzD4IX_djlQqPyAochciglJCP-w6LzKNHSsjS2q7GhE9SiQEqwPDOIJdU_8rduQquDs9zOHtCQx1_YYgSeXo3zHWPKEbVSr3RFDFqkvrnL8t4KXylE8gYv2FxtMXFG3tt0F2901NJTtbbB0DlSWT3CKop7Azr7qCVgSWsBxo7F-Y0yfcNIsM1dSPprRAONAwOsSpqe1o3wZDvWva8MReSMiFPH6Kr46CbOsbR1hdhCY7Dk71dAg2ckZ_OzEZSpjpHzQYQ2RImikwnY-SJTb19Aw9i8Q_TR0ZFX5Im7N2QOKxGiNSDF60DWrDJg7Ae93zlu7Oo3dsqi1Boo1rOsXxNp52bW_wu-wfqRKL24-Qk7PaFC8gIDY8Yzi_7DzUmjFnldMEUansNI2bNMUL7qbqF6A4DLxhLFP7t-ZpX5vbylL78HZLBS24ZDZ1Jz0Ajc97bJ3da1AbMP63FxMj0z5tVwcuopKj0IB5EQSdjiLg0wKhNM0iPCfDgvFqmMiSfiY54u2zbl7NHyZUBOcVudqU-OUfnM7r_U0gD8LZE6e0ix_K5b7NzA=w1636-h853-no)]()

If everything works, you will get the following answer to your request. (amount is up to actual change rate ;))
*You will get 57.105 USD*


In your ngrok container in your ngrok container you will see a POST request with 200 OK Code:

![enter image description here](https://lh3.googleusercontent.com/cTrEJQ-2FDM8jYkAgrLYtUH0pEeBRVPH1lzEWsHJfcdFAbEfx1FGVyliuAmO-vC8QlbTAnznYdA)

and in your Google assistant container you will see first logs

![
](https://lh3.googleusercontent.com/UvojnfO6sXX3T6aauB-Jd8q9uIkrfb08Rg-7xoOudj0uCJu0ol58u2E61q9avEiwr3NiONRrtuGK "Starting app in nodemon")

Beside the test simulator you can test your action with your private Google home or Smartphone Google assistant app. You do not need further installation or activation. Just test it by saying:
Ok Google, talk to {your defined in Google actions skill invocation name}

<div id='id-deployment'/>

# 7. Instructions for a quick deployment

We describe in this section how you can deploy your app in Heroku and Firebase functions. To deploy you can use a new instance of our image which will install Heroku and Firebase clients.

`sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -itd  --network myNetwork --name myAssistantDeployment falent/google_home_assistant_express_node_js_server:deploying`

The following commands for Heroku and Firebase describe how to deploy your programmed action.

<div id='id-heroku'/>

## 7.1 Heroku

Sign up for [Heroku](https://signup.heroku.com/dc) (it's for free).

### 7.1.1 Linux


1. Open shell in your Docker container
```bash
  $ sudo docker exec -it  myAssistantDeployment /bin/sh
  ```
2. Login to the client with your account
```bash
  $ heroku login --interactive
  ```
3. Create your app in Heroku server. The app name will be showed in a pink color. Save it in an editor of your choice to use it later 
```bash
  $ heroku apps:create --region eu
  ```
4. Set npm config to false
```bash
  $ heroku config:set NPM_CONFIG_PRODUCTION=false -a <your app name>
  ```
5. In your myAssistantDeployment container go to functions catalog
```bash
  $ cd /skill/functions
  ```
6. Clear all git repositories files
```bash
  $ rm -rf .git
  ```
7. Init a clean git repository
```bash
  $ git init && git config --global user.email "you@example.com" && git config --global user.name "Your Name"
  ```
8. Add and commit all files
```bash
  $ touch readme.md && git add . && git commit -m "my first commit"
  ```
9. Link your app to git 
```bash
  $ heroku git:remote -a <your app name>
  ```
10. Push your files to Heroku
```bash
  $ git push heroku master
  ```
After pushing you will get your Heroku app https address https://yourAppName.herokuapp.com/  , for example I got https://secret-reef-17554.herokuapp.com/. Please copy it and paste it to the [endpoint](#id-dialogflow-endpoint)

11. Start the webapplication in heroku
```bash
  $ heroku ps:scale web=1
  ```
12. You can see logs with
```bash
  $ heroku logs --tail
  ```

<div id='id-firebase-functions'/>

## 7.2 Firebase as functions

1. Open the shell in your Docker container
```bash
  $ sudo docker exec -it  myAssistantDeployment /bin/sh
  ```
2. Login to the client with your account
```bash
  $ firebase login --no-localhost
  ```
3. Please copy URL from the terminal and log into your google account where you want to host your app. After login paste the authorization code.

4. Run Firebase init functions
```bash
  $ firebase init functions
  ```
5. Choose Javascript and answer to all questions about overwriting files n but y for npm install

6. Deploy your functions
```bash
  $ firebase deploy --only functions
  ```
7. Go to https://console.firebase.google.com/project/[yourAppName]/functions/list to see your app address. In my case it was https://us-central1-fir-5c548.cloudfunctions.net/myFirstAction 

Please keep in mind that if you call an extern API you need to activate **Blaze Plan** in some condition it will remain for free https://firebase.google.com/pricing/



# 8. References for Google Assistant actions developing
https://www.npmjs.com/ - npm is the package manager for JavaScript and the world’s largest software registry

https://codelabs.developers.google.com/?cat=Assistant – Google Labs how to build actions (skills) in Node.js for google assistant

https://github.com/falent/googleHomeAssistantExpressNodeJS - Our tutorial for google assistant

https://github.com/falent/GoogleAssistantTutorial - our tutorial and code snippets

https://www.tutorialspoint.com/nodejs/ - Node.js Tutorial

https://dialogflow.com/docs/getting-started - Official DialogFlow documentation
<div id='id-hyper'/>

<sub>1. Hyper-V is not compatible with virtual box or vmware. So in case you use VM in these it prevents you from switching Hyper-V on and off.<sub>




