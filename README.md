# How to write your first google home skill?

In this short tutorial we will show you how to write a very simple google home skill and develop it on your local machine. We are going to use Docker to avoid any additional installations and ensure that all of us starts with the same code and the same environment (less problems for all of us. Besides it is time for all who don't know how docker works to get it know ;) Don't worry although we use docker you will edit your code only locally because we implemented a mount option.

When you finish your developing you can easily upload your code to a https server. At the end of this tutorial we will show you how to do it in Heroku. After that you can publish your first skill. Of course our solution will work with any Https node.js server provider (AWS, Azure, Openshift etc. ) :)

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
An action is a skill that extends the functionality of the Google Assistant. In the web interface you create a project that bundles all your actions. You will also do the configuration there like what countries your action will be available for or key details about your action like its description or, your contact detailsname for users who will use your action. Each action in the google actions directory has an invocation name. With the invocation name users can start your action. In our case we created a weather action and we can start it for example by saying "Hey google, talk to my bike buddy". After invocation of your actiom, google will call your fulfillment to start a conversation with the user. The fulfilment is based upon your deployed web application  or it is in total configured with the google web interfaces google actions and dialogflow. The interactions are transformed from audio to text  and backward till a conversation between the user and google assistant reaches its end.

#### I.1 Create a new project
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need a google account to log in. Click a plus button (add / import project) and after that create a project with the given name. 

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg?w=840&h=540)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg)

#### I.2 
At the next page choose "skip".

#### I.3 Define the invocation name 
In actions invocation define the invocation name for your skill. 
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png?w=840&h=593)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png)

Congratulatioou created your first project, but the simulator is not active yet, because there is no voice logic behind it. That means there are no interactions defined between google assistant and the user for  your skill. To create the interaction logic go to dialogflow.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png?w=840&h=789)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png)

## DialogFlow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations. **// why do we need it** Translations of human voice calls into json objects which is calling you code. In dialogfloow you define possible inputs from the user say intents. and you can define answers to user intents in  dialogflow. In alternative to using code.  

## How it works?

![](https://lh3.googleusercontent.com/q0bK_PoG8wyoozW-uUUNT7FUi4BlBb2C-yqBRIm_Pi7Nby3bD4rLvy1vXsr4mVuVrzhUrOuloOI "Google Assistant route")

### 2. DialogFlow
You need to open in the next step DialogFlow interface:  [https://console.dialogflow.com](https://console.dialogflow.com) 

#### II.1

Create a new agent where you configure your interaction model for your skill.** Please keep in mind to import your created project (GOOGLE PROJECT) from google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png?w=840&h=346)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)



#### II.2
Add your first intent. Intents are users intentions that they want to talk with assistant. You can imagine Intent like a trigger function for your code. 


An intent is composed of events, contexts, training phrases, entities and responses. We define these composites in the following. 
Click on  Intent and then on the default welocme intent to look at its components and to edit it.  Training phrases are phrases that trigger an event of your voice assitant. For example Hey would trigger the welcome event.  In responses you can define static answers for your questions. 

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

#### II.3
If you want use your own code for „welcomeIntent“ you need enable one option on the buttom of your intent.

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
Our solution based on nodemon which is kind of watcher and reload your skill everytime you made code changes. You save a lot time because of that ;) However it can happen that you wish to add more modules to your skill. In that case you ust no remove and restart your container. Npm modules are installed only at the start of your container.

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

