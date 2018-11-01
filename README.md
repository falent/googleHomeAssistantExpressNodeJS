# How to write the first google home Skill?

In this short tutorial we will show you how to write a very simple google home skill and host it local on your machine using docker.

We will use dialogFlow.

## DialogFlow
Dialogflow (formerly Api.ai, Speaktoit) is a Google-owned developer of human–computer interaction technologies based on natural language conversations.

## How it works?

![enter image description here](https://lh3.googleusercontent.com/62bSzoI1CZlwKm8aaErkjZ61A8qZ2Cu6b3h1w4Hjmbad8bmpnoT1DE-NeojxsUnrCUYMprioZ80)
### I. Google Actions

#### I.1
Open Google Actions page [https://developers.google.com/actions/](https://developers.google.com/actions/) and create a new project. You need for that google account. Click a plus button (add / import project) and after that create project

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg?w=840&h=540)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome.jpg)

#### I.2
At the next page choose "skip".

#### I.3
In actions define the invocation name for your skill. With invocation name,  Google Assistant identifies what the user wants to do. You can use a such sentence to start your skill Ok Google, ask <your skill invocation name>. 
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png?w=840&h=593)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome2.png)

You created your first project but simulator is not active yet.

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png?w=840&h=789)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome3.png)

### 2. DialogFlow
You need in the next step open DialogFlow interface:  [https://console.dialogflow.com](https://console.dialogflow.com) 

#### II.1

Create a new agent:

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png?w=840&h=346)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome4.png)

[https://console.dialogflow.com/api-client/#/newAgent](https://console.dialogflow.com/api-client/#/newAgent)

** Please keep in mind to import your created project from google actions to DialogFlow**. The name how you call your agent in dialogflow is irrelevant

#### II.2
Add your first intent. Intents are users intentions that they want to talk with assistant. You can imagine Intent like a trigger function for your code. 

Click on "Intent +" button and lets call it "welcomeIntent".

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png?w=840&h=199)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome5.png)

#### II.3
If you want use your own code for „welcomeIntent“ you need enable one option on the buttom of your intent.

Swip „Enable webhook call for this intent“ and click „save“  button

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png?w=840&h=228)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome6.png)
#### II.4
Add an additional Intent. It will be responsible for getting us a weather information. You can call this intent as
„getWeatherForcastIntent“.

In this intent page, add some traning phrases:

> Tell me the weather for Essen
> 
> Berlin

DialogFlow will automatically recognise it as  @sys.geo-city (it will be our parametr). It means with this entity you could ask for any city weather.
[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png?w=840&h=313)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome7.png)

Please keep in mind that we will fullfill this intent by webhook. Enable it as you have done in II.3 point


**Clone my github repository**

> [https://github.com/falent/googleHomeAssistantExpressNodeJS](https://github.com/falent/googleHomeAssistantExpressNodeJS)

### 3. Docker

#### Docker Installation

Install [Docker CE (Community Edition)](https://docs.docker.com/engine/installation/#desktop) on your machine. To test your Docker installation execute the following command:

`$ sudo docker run hello-world`

### 4. Docker Containers 

Open a first terminal tab and clone my git repository from Github. Please do all steps in that order which are described here :) I used my previous solution from Alexa developing. Dont be scared that we use docker images which names are "alexa"

`$ git clone https://github.com/falent/googleHomeAssistantExpressNodeJS.git  ~/Desktop/Template/Google_Assistant_universal_skill_template `

Go to the cloned git repository:

`$ cd ~/Desktop/Template/Google_Assistant_universal_skill_template`

Create a new Docker network in a terminal tab:

`$ sudo docker network create myNetwork`

Open a new tab and run the _ngrok_ Docker container in your terminal:

* On Linux:
`$ sudo docker pull wernight/ngrok`
`$ sudo docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`
  
* On Windows:

`$ docker pull wernight/ngrok`
`$ sudo docker run --rm -it  --network myNetwork wernight/ngrok ngrok http myAssistant:5000`

Open a new tab and run an _Google Assistant_ Docker container:

* On Linux:

`$ cd ~/Desktop/Template/Google_Assistant_universal_skill_template`
`$ sudo docker build -t assistant .`
`$ sudo docker run -v ~/Desktop/Template/Google_Assistant_universal_skill_template:/skill -it --network myNetwork --name myAssistant assistant`
  
* On Windows:

  `$ docker run -v <ABSOLUTE_PATH_TO_CLONED_GIT_REPO>:/skill -it --network myNetwork --name myAssistant assistant`
  
(it can happens that you wish to add more modules to your skill. In that case you just need to restart your container)

### 4. Dialogflow

You can go back to Dialogflow and add your address from ngrok docker 

![enter image description here](https://lh3.googleusercontent.com/lxynDDtaZzBgyqMiyW5twybVpWpWg5yEJ0Qt0ujyPqUUoh-npvxaTC8qyu2FnIiz_LP7oMEGqWA)

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png?w=840&h=354)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome9.png)

[https://7bf316ed.ngrok.io/](https://5f04bf42.ngrok.io/bikebuddy-8448e/us-central1/myApp)

and „save“
At the end you can go to Google Assistant integrations in the DialogFlow

[![](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png?w=840&h=505)](https://thecattlecrew.files.wordpress.com/2018/08/googlehome10.png)

Set up explicit invocation as welcomeIntent

Now you can test your app clicking on the buttom "Test" link.






