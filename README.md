# How to build your first Google Assistant Action?

In this short tutorial we will show you how to write a simple Google assistant action and develop it on your local machine. We are going to use Docker to avoid any additional installations steps and ensure that all of us start with the same code in the same environment (less problems for all of us. For those who don't know how Docker works it is a good introduction) Don't worry although we use Docker you will edit your code only locally because we implemented a mount option (shared folder).

When you finish your developing you can easily upload your code to any https .js server (Heroku, Firebase, AWS, Azure or Openshift). At the end of this tutorial we will show you how to do it with Heroku and Firebase. Of course our solution will also work with any other Https node.js server provider


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

	4.2 [Additional docker containers](#id-restart-containers)

5. [Dialogflow fullfilment](#id-dialogflow-fullfilment)

6. [How to test your skill?](#id-how-to-test-your-skill)

7. [Deployment](#id-deployment)

	7.1 [Heroku](#id-heroku)

	7.2 [Firebase functions](#id-firebase-functions)

8. [References for Google Assistant actions developing](#id-references)



<div id='id-requirements'/>

## 1. Requirements
We will work with Docker. So you need the Docker and a Google account.

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
![
](https://lh3.googleusercontent.com/50jWUNN65ATGNwEusMOjTQiZ2uRYVMtZ_0-8FAo9oqWmngq9JMrTNHpYSJSsh-gKXkkrxRcaO49f "Create Project")
!

**At the next page choose "skip".**

#### 2.1.2 Define the invocation name
In Actions Invocation define the invocation name for your action. Click on save.

![](https://lh3.googleusercontent.com/DUdzsfa41qj69G-HsM3_h_xrZ1G3zZlmDWLENS6-TaOCNqFF_21DqUJk7wip1oMGYpeGTq-_CYdeRwnh8wBLbpvpxJo1sW5ErAboc9L1ufrzmX28WAyKqpRpBpmGLtsccLsLhZ4xwbZX8xgwl78B_6DO0_gD8566NcPr82ge0KqyzDSzz4-RASkLiPAaHfsciRsPplNulW4yhYU0NxGjUTKruoRw0kBfp-cD9B1K_OA34ijO4oYFnnWA2yqOe7Ebgsjo6GOtfdODPZqHjl-eKmtzQ8wEqkBJf-_aebRKCjJhhOoCH0UEDAIU65co29WRlnTYZq3T6uhUaoafs4h5Nn2rKO6lppcN3_8CL8DlHqChMX_eO_8uDD39ufJV3EiAh_TwQJOP64gPcMYo5LsyIs2azwQParRBvBHw7xMTVeZvJpzSJV9T8EgmWB0a60PbtIg96JrE-Mg6ATbv8UFVeqmcYh-WtMapcqWwaVnyCW2YkqdUVe0fNLTNzzRl1jJpa2uteav8uTbGY2PPw5vDcAsTr6R-nybvnS26ZBgYHh0LIkLs1zok22p9sudxBat0bEjqu3cgC-5a3XX3bGkjJoWjrjm8lQv-7tnqF7TdK2kdzSi6PAMoTjSbpd0yn3bNRqw8JO9Xmg07PWCIRAFKTDLg869Qsh9fbW91ykoF2-yHqpSM40oqwPo64PsXHnoZ5VKC3be7l0-hC4Nynw=w1442-h741-no)

Till now there are no interactions defined between Google assistant and the end user of your action. To create the interaction logic we will go to Dialogflow.

<div id='id-dialogflow'/>

### 2.2 Dialogflow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. We need it to translate human voice calls into JSON objects that can be consumed by  our backend code and backwards to tranlate the responses from our backend to voice phrases. You define how all this works within a Dialogflow agent.

#### 2.2.1 How does Dialogflow work?

1. A user starts voice interaction or text interaction saying/texting
*OK Google, talk to [your definded invocation name]*

2. Google calls Dialogflow using google actions and looks for a defined agent for the invocation name.

3. Dialoglow checks if user intention is correponding to one of training phrase. If Dialogflow detects a suitable intent there are two ways to call the logic behind the intent:

	a) If the whole logic is defined in the Dialogflow, Dialogflow sends definded inself output as a return answer to the user

	or

	b) DialogFlow calls your external code and returns an answer processed from your code to Google Actions which returns it to your end user


[![](https://lh3.googleusercontent.com/cl0A2laq_UEcrg1d4lMTpUmRNauWVgKZM_qVurP-Z1ptZY53ZUR9TOBtFZghAU2SLwL5x7YTdu6IwMvdmjIb30pyg40DRO2aJ4NDaCDM2bogmL9Y5vWhEySeTG7U45uOez9nkOieoUQKClwT6vfT4F9zwBHbwR2lghxexRBqZTXk2cm57cZq1X4NNZXaFNIwZ2bh2_m2FfWvQMnEL4lQ6tttQ3KqPHzkhzvXV7SYRhTH42AItqNS5HEoRKsIQ2s1pCNRe52wz4YIqZZpaIKWWzI_D4Hyx_dTxIomstMzaOJY97oR5Vfq6Bhx8z6DPmwRRRSYgN62FoIRQAjc8UB0ADOrJHEW-SV0S75jlth5d8sjiUBaxf8OgZjfxEDlc63k4tFTnH5iaISuzMSx8RPDg0XkhCwhxKHLhjbF_bZ23mWwsh2FFi2qYut9lIxnozeFo13ufvQkytQvjzM5u4x-MQlv3F1c3ljO-bIttJFkg1WekCq8X1G_KHZ5bJb51oykaqf_5yRV79xPOYVUUSbhqKR0Ff-R7YDitdQioKCARa9QByZ75VomxIgow2F2bAXgsSxx2Lc4QrjASYEmAr-WpYnED6by0fxyYuHAXDaCFDhFhw08NvdA7n8C_Vn7Nb0_eu2k298SI5yKbpXRM5Jf8XZ1NOf7iBzJQJyAYVlHtv2Jl5SFGkEJ3Pgo48Qb6LjqIgb83lPOD02FTe9bPw=w1231-h612-no)](https://lh3.googleusercontent.com/cl0A2laq_UEcrg1d4lMTpUmRNauWVgKZM_qVurP-Z1ptZY53ZUR9TOBtFZghAU2SLwL5x7YTdu6IwMvdmjIb30pyg40DRO2aJ4NDaCDM2bogmL9Y5vWhEySeTG7U45uOez9nkOieoUQKClwT6vfT4F9zwBHbwR2lghxexRBqZTXk2cm57cZq1X4NNZXaFNIwZ2bh2_m2FfWvQMnEL4lQ6tttQ3KqPHzkhzvXV7SYRhTH42AItqNS5HEoRKsIQ2s1pCNRe52wz4YIqZZpaIKWWzI_D4Hyx_dTxIomstMzaOJY97oR5Vfq6Bhx8z6DPmwRRRSYgN62FoIRQAjc8UB0ADOrJHEW-SV0S75jlth5d8sjiUBaxf8OgZjfxEDlc63k4tFTnH5iaISuzMSx8RPDg0XkhCwhxKHLhjbF_bZ23mWwsh2FFi2qYut9lIxnozeFo13ufvQkytQvjzM5u4x-MQlv3F1c3ljO-bIttJFkg1WekCq8X1G_KHZ5bJb51oykaqf_5yRV79xPOYVUUSbhqKR0Ff-R7YDitdQioKCARa9QByZ75VomxIgow2F2bAXgsSxx2Lc4QrjASYEmAr-WpYnED6by0fxyYuHAXDaCFDhFhw08NvdA7n8C_Vn7Nb0_eu2k298SI5yKbpXRM5Jf8XZ1NOf7iBzJQJyAYVlHtv2Jl5SFGkEJ3Pgo48Qb6LjqIgb83lPOD02FTe9bPw=w1231-h612-no)


In the next step open the Dialoglow interface:  [https://console.dialogflow.com](https://console.dialogflow.com)

<div id='id-agent'/>

### 2.3  Create a new agent

Create a new agent where you configure the interaction model for your action. ** Please keep in mind to import your created project (Google PROJECT) from Google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

![](https://lh3.googleusercontent.com/So8pgbym02Gu8W1noyXNd5Bk5L_pFs-yNf497XxvusvyUvhNz5UPbcb3KFoWvT8W-Y-HmXuGPFXDFKK8O-ifYahPz2fCifPUvd7hd-s3FVp-7ld5dgqRv9S-9BEUAgLa0T2eQA-6h_MJxlzDmoz-8LUHffgedaDrJ009ge-QoK1TdO5FEKrM_x69AmFEiiPV_MSOYJaKpXAEvhgIfS6ivtU6y6sm5-rNqwxbzgEi7Njibo2ZJ_h47Bt0IpMNxI4JSZzlkNhibdTt7LWQELwl3AaU_jpYUDzkZ1SXeNEMQTnpDSugcutVJcJ7qkifwKc0y9muN0C6-gmg7G8RP1f8thv3glb9zLUdvpo8qyhpS8Fyja1NkIE130jnI1noM9qFk0PgWI8B0kptfyY9n8gg_XfcrmNiEteiq48D-2DJX_Thjnt0CdsvHnQsxfLETjx0l8-HJyJEuf4u-ixVVM7ukAMmPkI-QLlytJquji2nZNFvB44uT2THiYa-W-OHbyn3YSlCMXtDaOryekauJwfiCRhIp-eWSFhMjaBNFiFiJT826WPxJee_Rd8QVh4_D2atFjItFK7dXmmeF0u-qWMzrq7c9EdnhKh48Hx-ZlbZL0_n9T3MEOufFuXV25Le0UR7a71KeSlwN2iNORjyvvnjL0kpP3d_qLwadcLsTiHEKkpsTC-r5Wy0peuERMz6-X5naCXp4J1Fi3_l7mD0PILI1bCJxCMZJXT0e71U=w1440-h468-no)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### 2.3.1 Add your first intent
Intents are anticipated user intentions about what users might want to talk with the voice assistant in an action. For a change rate action possible intents would be questions about the change rate from a source currency like Euro to a target currency like Dollar. Intents are triggered by predefined training phrases and key words from the user. Possible questions about change rates could be "What is 50 Euro in Dollar?". To  see how its configured click on Intentions in Dialogflow. Select the default welcome intent. Here you have listed several training phrases that invoke the default welcome intent. Under Responses you see what the Google assistant could  answer to the user utterances that triggered the default welcome intent.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

To add a new intent click on the plus button. Then define its name, training phrases and entities. Entities are variables for common key words the user says. For example in our change rate voice app these are the currencies. To see how it works add a new intent, name it getChangeRateIntent, add a training phrase and type a currency name for example EUR in the training phrase field. Click enter and you see the currency will be textmarked and is resolved to the entity currency. Now every currency the user might say will be resolved to the currency type. Type in *Change 50 Euro to Dollar*. Now edit the parameter names to adress the currencies as fields in your app. Set 50 as @sys.number entity, name it amount then name the first currency currencyBase and  the second currencyTarget.

![](https://lh3.googleusercontent.com/QUptFmlJdJBleXA2NzfdE3PtDhDD2eFLpI-aCBarWigGeC00_-nEvD_ryDqVLFWOwrqCMiGd0MOHD27uslFaEvwCmINFHRImCHQQgiGdxS937YW8Apf9K0zcpkVK5ItAxO33T99dlUfkGsEfHDepY4TBUmBLO5IPCwbrvG0L2RKn6WxiUjl5eJw0zLvU9-wL3L5X7Ikx8wmr_87zSBaESQ4zEy-bih48etAfAoSXjtZ6mapomMIMZFYQuazMyEWUUVm7CEdy5FTf8il-WudAno60UbpXjQ6i5CGMnH5jg9WatjSQOlZHhk8WYGaU3wXLKA82Z0VXmB6f6ocI7tdDz-agcJmhdgFlcuZuvA48EriBFcCclwAgQNaCv2058KLVJfMuMWNvxTZke1BkWSodkUlEeTG1OXWU12HNICWjQLr4ZctZxCHjxQJlojtNOxIGJx3VjdO44-7zcUi59E2zVOD1AYs0-N8e4U0hTHYCevWBNqfrhnUcJpT8I1jCRgXNOZp86n8NFp80BUF5fKdvGuFTBaUKG8KheF8fDx4eNlsL4b-clH7UZb8EwEPCVW7Fpy4m26azlFspHgpscQpq9Ciga3snTk5lJb9csR6v3Ih4fzsxTDchBZH4DOs4nblWJhJ-JaEu1p_fR3jz7JP5S-TgZ1jObYbexWSfiMp4xQc_MdSlq0_RMGFVFicWW9mtVqAopE0RnN0uJR6lKQ=w1448-h799-no)


#### 2.3.2 Add traning phrases
 You can define responses to the traning phrases in an intent in Dialogflow. **But we use our own code** so we will define the responses in our web application code. For that we need to enable one option on the buttom of our intent. **Swipe „Enable webhook call for this intent“ and click the „save“ button.**

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)

#### 2.3.3
Add an additional intent. It will be our starting point. Name this intent
„welcomeIntent“. Please keep in mind that we wont fulfill this intent by webhook.

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

Ngrok is a gateway that communicates with Google Assistants requests/responses via https. Our node.js action (skill) app is deployed in a Docker container and we share app code from our localhost with it. Thus we can change the code locally and the deployed app reacts instantly to the changes.

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

4. Open a new tab and run an Google Assistant_Docker container:
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

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
`git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS`

3. Create a new Docker network:
`docker network create myNetwork`

4. Run the _ngrok_ Docker container in your cmd terminal **and do not close this tab!**
`docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

5. Open a new cmd window and run an _Google Assistant_ Docker container in your created network.
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

To build the container named myAssistant a docker image is downloaded from the dockerhub account *falent/google_home_assistant_express_node_js_server*.

(https://hub.Docker.com/r/falent/Google_home_assistant_express_node_js_server/)

The Docker command -v creates a shared directory, the flag -v means: Create a directory in the docker container and share my local directory googleHomeAssistantExpressNodeJS with it. With a shared directory we can edit our files locally and share it automatically with our directory in the docker container.

<div id='id-output'/>

#### 3.3  Output
You will see the following output if your created myAssistant container works properly.

![enter image description here](https://lh3.googleusercontent.com/5V5vOys_GXe4zhktu61BtRz9Avm9HQhu5-V01z4xTL6pqU2FKdi3bW9lidgpakwRjeWTMkYUHKM3jK2plhqBTkaAZ0bjKIfdpHQZsxYx5drrR7g9bHOqhDy5f1XmicWXOMigPRim5Wh6N1bezZGgXYvztdCwUvVrxgkrOg6ejwnE5f-jiwWU7lFpf2ZLeRhBZfkKdFq5ZsoZ9CFjSMUwxrMaHxefsGEZ4peLuUXJrzvlKd5d5NOmjbVKI652F_Q3UQwqFIbzKMO00FPrdHXN6P9e3v_ysseJK9jBZIW_ZJ0sugpHrKG15y8COJr4VGIbob8ZAUSeQc2_yACTSomqz_7jub035dtzDiI6ed66uqiNBMEsf69XTXXzAJF-OawtzJg3GzGAIwKaftZllOURCF5sFEI75KUozU-P5y-44N3LWm9JeCyAdCMJ8vSnmeLa7m5t229K8r7-mnc4-cKtY0fuUMI5zGJalrZUZMA7imn1NRnOldWmGUhcFcPSr4awqYLXckvwTXOSOoAN0lHOM36hKV-sndD15nWdzI-_CLMAydSaiQxBACdE-hsnvxX0vX-me8L3yrcRZdO1UYycIznafp4cevYmdWK0fYm9NwMqGKlmAWV4TY4Je7FTYuDcoSKOIqeHy2RrDAFwQ4oK1w0mWq14S4sHYiWfvLgIzTSXCuYDeKDV_RrK8KYfmOV3DeB5ZnfbEEX22bAQ=w1916-h446-no)

<div id='id-optional-steps'/>

## 4 OPTIONAL STEPS
In this section you will find optional steps if you wish to restart your Docker or rebuild everything. You can go directly to the next 5th step.

<div id='id-restart-containers'/>

### 4.1 Restart (in case of new module installations or if you want to start your container app)<div id='id-commands-restart'/>
Our solution is based on nodemon which is kind of a watcher and it reloads your skill everytime you made code changes. You save a lot of time because of that ;) However it can happen that you wish to add more npm modules https://www.npmjs.com/ to your skill. In that case you need to restart your container. Npm modules are installed only at the start of your container. To restart  your container type the following in a cmd terminal:

#### 4.1.1 Linux
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

#### 4.1.2 Windows
`docker run -v //c/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --rm --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`

<div id='id-additional-docker-containers'/>

### 4.2 Additional docker containers
Imagine you would like to add a database to your docker environment or any microservice app. With our solution it is very simple! Just start any database docker container and place it in our docker network. For example:

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

<div id='id-dialogflow-fullfilment'/>

### 5. Dialogflow fullfilment

We need to add a ngrok address that our local server can communicate with dialogFlow

#### 5.1 Ngrok address
Please copy **https** address from ngrok Docker.

![enter image description here](https://lh3.googleusercontent.com/lxynDDtaZzBgyqMiyW5twybVpWpWg5yEJ0Qt0ujyPqUUoh-npvxaTC8qyu2FnIiz_LP7oMEGqWA)

#### 5.2 Dialogflow endpoint<div id='id-dialogflow-endpoint'/>
  Go to Fulfilment and enable Webhook in Dialogflow,  put your copied https address and click „save“.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png?w=840&h=354)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png)

At the end go to Integrations in Dialogflow and choose Google Assistant integrations. Set up explicit invocation for the welcomeIntent and add "implicit invocation" for your created getChangeRateIntent.



[![](https://lh3.googleusercontent.com/huAsAqTqmbQ22NtJSNR5ngsGcx8WaEy68oRSSQSmIKqBn8kljETX_niL3YWO9tndAlWCO8mKvpo_UUMRGUVcnvfXKdJzdRr1dg0j14CUJWmbQcqHY3s26jPrfIav7M39J23g-mhXalQejb45WVjFjVXUFM8tPMlaI-JNdXUbhkflxbcvjKmY767SBibr68YWjD9j-y2hnilpd51r3kTIln7o-8fMnNuHrdj16zo6va9XG0N4VmVVpcAl-q2Fw58hR0eW79RejRvDetfIUMZmylbqPOtcG0XQ-f94lbsE9X-fgKxKT9Xx1k56QcBbgItLF6JuIYIW9gt68-J8AWZEZ7MKjASPE7YLu5PuhQQaLY9AbFZ9CuRDy3CnEksXJvxVBbmqNcdBeOkDajIemtpDUHesQSADI3NHIrh6Gu4k6gvKAl0EmChHvMaRfPitU65DMeMD5gKB9DUtzwVVqk-qBw6s85jAJoBgxNDwi7UjCT6nrJmbvrLLLw0IyLwvCcyQZNSUhzQ_ki4rcHcfChYX2WVljI0pZu12LGHjHxlH6XuVPb5kVSA1wJSfiYg82HYSKSIY76L-6Y0Q5SaamTPi0_oRq18kDPyW2Mejl0uzNl5p6hmIzcIe1DasCLOc6g_oOQ_ypH2D-uxtFnBhAFzVZLrlH5dESPiLitDHGcbZ_qRpmVa4X0Jnv3j3dkfg4vFwvIn4APqEU_geQKTNQA=w1720-h910-no
)](https://lh3.googleusercontent.com/huAsAqTqmbQ22NtJSNR5ngsGcx8WaEy68oRSSQSmIKqBn8kljETX_niL3YWO9tndAlWCO8mKvpo_UUMRGUVcnvfXKdJzdRr1dg0j14CUJWmbQcqHY3s26jPrfIav7M39J23g-mhXalQejb45WVjFjVXUFM8tPMlaI-JNdXUbhkflxbcvjKmY767SBibr68YWjD9j-y2hnilpd51r3kTIln7o-8fMnNuHrdj16zo6va9XG0N4VmVVpcAl-q2Fw58hR0eW79RejRvDetfIUMZmylbqPOtcG0XQ-f94lbsE9X-fgKxKT9Xx1k56QcBbgItLF6JuIYIW9gt68-J8AWZEZ7MKjASPE7YLu5PuhQQaLY9AbFZ9CuRDy3CnEksXJvxVBbmqNcdBeOkDajIemtpDUHesQSADI3NHIrh6Gu4k6gvKAl0EmChHvMaRfPitU65DMeMD5gKB9DUtzwVVqk-qBw6s85jAJoBgxNDwi7UjCT6nrJmbvrLLLw0IyLwvCcyQZNSUhzQ_ki4rcHcfChYX2WVljI0pZu12LGHjHxlH6XuVPb5kVSA1wJSfiYg82HYSKSIY76L-6Y0Q5SaamTPi0_oRq18kDPyW2Mejl0uzNl5p6hmIzcIe1DasCLOc6g_oOQ_ypH2D-uxtFnBhAFzVZLrlH5dESPiLitDHGcbZ_qRpmVa4X0Jnv3j3dkfg4vFwvIn4APqEU_geQKTNQA=w1720-h910-no
)



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

# 7. Instructions for a quick deployment Heroku

We described in this section how can you deploy your app in heroku and firebase functions
To deploy you can use a new instance of our image because we installed there heroku and firebase clients.

`sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -itd  --network myNetwork --name myAssistantDeployment falent/google_home_assistant_express_node_js_server:1`


<div id='id-heroku'/>

## 7.1 Heroku

Sign up for [Heroku](https://signup.heroku.com/dc) (it's for free).

### 7.1.1 Linux


1. Open shell in your docker container
```bash
  $ sudo docker exec -it  myAssistantDeployment /bin/sh
  ```
2. login to the client with your account
```bash
  $ heroku login --interactive
  ```
3. Create your app in heroku server. The app name will be showed in a pink color. Save it please in your notepad that use it later 
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
10. Push your files to heroku
```bash
  $ git push heroku master
  ```
After pushing you will get your heroku app https address https://<yourAppName>.herokuapp.com/ something like I got https://secret-reef-17554.herokuapp.com/. Please copy it and paste it to [endpoint](#id-dialogflow-endpoint)

11. Start webapplication in heroku
```bash
  $ heroku ps:scale web=1
  ```
12. You can see logs output
```bash
  $ heroku logs --tail
  ```

<div id='id-firebase-functions'/>

## 7.2 Firebase as functions

1. Open shell in your docker container
```bash
  $ sudo docker exec -it  myAssistantDeployment /bin/sh
  ```
2. login to the client with your account
```bash
  $ firebase login --no-localhost
  ```
3. Please copy URL from the terminal and log in in your google account where you want to host your app. After login Paste authorization code.

4. run firebase init functions
```bash
  $ firebase init functions
  ```
5. Choose Javascript and answer n for all questions about overwriting files but y for npm install

6. Deploy your functions
```bash
  $ firebase deploy --only functions
  ```
7. Go to https://console.firebase.google.com/project/<yourAppName>/functions/list to see your app address. In my case it was https://us-central1-fir-5c548.cloudfunctions.net/myFirstAction 

Please keep in mind that to call extern API you need activate **Blaze Plan** in some condition it will remain for free https://firebase.google.com/pricing/



# 8. References for Google Assistant actions developing
https://www.npmjs.com/ - npm is the package manager for JavaScript and the world’s largest software registry

https://codelabs.developers.google.com/?cat=Assistant – Google Labs how to build actions (skills) in Node.js for google assistant

https://github.com/falent/googleHomeAssistantExpressNodeJS - Our tutorial for google assistant

https://github.com/falent/GoogleAssistantTutorial - our tutorial and code snippets

https://www.tutorialspoint.com/nodejs/ - Node.js Tutorial

https://dialogflow.com/docs/getting-started - Official DialogFlow documentation
<div id='id-hyper'/>

<sub>1. Hyper-V is not compatible with virtual box or vmware. So in case you use VM in these it prevents you from switching Hyper-V on and off.<sub>
