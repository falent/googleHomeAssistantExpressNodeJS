
# How to build your first google home skill?

In this short tutorial we will show you how to write a very simple google home skill and develop it on your local machine. We are going to use Docker to avoid any additional installations and ensure that all of us starts with the same code in the same environment (less problems for all of us. Besides it is time for all who don't know how docker works to get it know ;) Don't worry although we use docker you will edit your code only locally because we implemented a mount option (shared folder).

When you finish your developing you can easily upload your code to any https server. At the end of this tutorial we will show you how to do it with Heroku. After that you can publish your first skill. Of course our solution will work with any Https node.js server provider (AWS, Azure, Openshift etc. ) :)

## Requirements
### Docker installation
#### Linux
https://docs.docker.com/install/linux/docker-ce/ubuntu/
#### Windows
https://store.docker.com/editions/community/docker-ce-desktop-windows

You need a google account:
https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp

We will use dialogFlow and google actions to configure our interaction model and publish it for google assistant.

### I. Google Actions
An action is a skill that extends the functionality of the Google Assistant. In the web interface you create a project that bundles all your actions. You will also do the configuration there like what countries your action will be available for or key details about your action like its description or, your contact detailsname for users who will use your action. Each action in the google actions directory has an invocation name. With the invocation name users can start your action. In our case we created a weather action and we can start it for example by saying "Hey google, talk to my bike buddy". After invocation of your action, google will call your fulfillment to start a conversation with the user. The fulfilment is based upon your deployed web application  or it is in total configured with the google web interfaces google actions and dialogflow. The interactions are transformed from audio to text and backward till a conversation between the user and google assistant reaches its end.

#### I.1 Create a new project
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need a google account to log in. Click a plus button (add / import project) and after that create a project with the given name.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg?w=840&h=540)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg)

#### I.2 
At the next page choose "skip".

#### I.3 Define the invocation name 
In actions invocation define the invocation name for your skill. 
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png?w=840&h=593)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png)

Congratulations, you created your first project, but the simulator is not active yet, because there is no voice logic behind it. That means there are no interactions defined between google assistant and the user for  your skill. To create the interaction logic go to dialogflow.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png?w=840&h=789)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png)

## DialogFlow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. We need it to translate human voice calls into JSON objects that can be consumed by  our backend code and backwards to tranlate the responses from our backend to Voice Phrases.

## How it works?

![](https://lh3.googleusercontent.com/q0bK_PoG8wyoozW-uUUNT7FUi4BlBb2C-yqBRIm_Pi7Nby3bD4rLvy1vXsr4mVuVrzhUrOuloOI "Google Assistant route")

### 2. DialogFlow
n the next step open the Dialoglow interface:  [https://console.dialogflow.com](https://console.dialogflow.com) 

#### II.1

Create a new agent where you configure your interaction model for your skill.** Please keep in mind to import your created project (GOOGLE PROJECT) from google actions to DialogFlow**. The name how you call your agent in ialogflow is irrelevant

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png?w=840&h=346)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### II.2 Add your first intent
Intents are anticipated user intentions about what users might want to talk with the voice assistant in an action. For a weather action possible intents would be questions about the temperature or precipitation. Intents are triggered by predefined utterances and key words from the user. Possible questions about the weather could be "Will it rain today?" or a keyword might be "temperature". Utterances like these are defined as training phrases in an intent of your action.  To  see how its configured click on Intentions in Dialogflow. Select the default welcome intent. Here you have listed several training phrases that invoke the welcome intent. Under Responses you see what the google assistant could  answer to the user utterances. that triggered the welcome intent 

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

#### II.3
If you want to use your own code for an intent you need to enable one option on the buttom of your intent.

Swip „Enable webhook call for this intent“ and click „save“  button

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)

#### II.4
Add a new Intent for example "nameIntent". This intent we will integrate with our code.
In the traning phases add f.e "My name is Christina". DialogFlow will instantly recognise it as traning phrase that cointains a name parametr, Your parametr name will be called "given-name".  We wont define responses because we want to have more control how google assistent will answer. so we will do it with our code. Please click on enable fulfillment and "Enable webhook call for this intent".


#### II.5
Add an additional Intent. It will be responsible for getting us a weather information. You can call this intent as
„getWeatherForcastIntent“.

In this intent page, add some traning phrases:

> Tell me the weather for Essen
> 
> Berlin

DialogFlow will automatically recognise it as  @sys.geo-city (it will be our parametr). If not please click on Essen word and define it as @sys.geo-city entity. It means with this entity you could ask for any city weather.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png?w=840&h=313)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png)

Please keep in mind that we will fullfill this intent by webhook. Enable it as you have done in II.4 point. Please save  your intent.


### 3. Docker

#### Docker Installation

Install [Docker CE (Community Edition)](https://docs.docker.com/engine/installation/#desktop) on your machine. To test your Docker installation execute the following command:

`$ sudo docker run hello-world`

### 4. Docker Containers

Open a first terminal tab and clone my git repository from Github. Please do all steps in that order which is described here :) I used my previous solution from Alexa developing. Dont be scared that we use docker images which names are "alexa"

#### Linux

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

1. Clone our repository
`git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  ~/Desktop/Template/Google_Assistant_universal_skill_template `

2. Go to the cloned git repository:
`cd C:\Users\%username%\Documents\googleHomeAssistantExpressNodeJS`

3. Create a new Docker network:
`docker network create myNetwork`

4. Run the _ngrok_ Docker container in your terminal **and do not close this tab!**
`docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000``

5. Open a new tab and run an _Google Assistant_ Docker container:
 `docker run -v /C/Users/%username%/Documents/googleHomeAssistantExpressNodeJS:/skill -it --network myNetwork --name myAssistant falent/google_home_assistant_express_node_js_server:1`
  

### Restart (in case of new module installations)
Our solution is based on nodemon which is kind of watcher and it reloads your skill everytime you made code changes. You save a lot time because of that ;) However it can happen that you wish to add more npm modules https://www.npmjs.com/ to your skill. In that case you need to restart your container. Npm modules are installed only at the start of your container.

#### Linux
`$ sudo docker restart myAssistant && sudo docker container logs  --follow  myAssistant`

#### Windows
`docker restart myAssistant && sudo docker container logs  --follow  myAssistant`


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

Now if you have alreadyWAfnxThlWu4emdK-Qec_4gdiVJmQGqIEvCWdXxt5aOyEdfO77jpisZBEP5k7j6Z80So5ZRW0vrc)
"TcTrEJQ-2FDM8jYkAgrLYtUH0pEeBRVPH1lzEWsHJfcdFAbEfx1FGVyliuAmO-vC8QlbTAnznYdA)
 google home device try to test it with it saying:
Ok google, talk to {your defined in google actions skill invocation name}

# Instructions for a quick deployment to Heroku

Sign up for [Heroku](https://signup.heroku.com/dc) (it's for free).

## Linux

2. Install heroku client, for example in ubuntu
```bash
  $ (wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh)
  ```
  3. login to the client
```bash
  $ heroku login
  ```
  4. Create your app in heroku server
```bash
  $ heroku apps:create --region eu
  ```
  5. Set npm config to false
```bash
  $ heroku config:set NPM_CONFIG_PRODUCTION=false
  ```
  6. Clean all gits files
```bash
  $ sudo rm -rf .git
  ```
   7. Init a clean git repository
```bash
  $ sudo rm -rf .git
  ```
   8. Init a clean git repository
```bash
  $ git init
  ```
   9. Add and commit all files
```bash
  $ git add . && git commit -m "my first commit"
  ```
  10. Push your files to heroku
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

