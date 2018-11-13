
module.exports = {


/*
The app.intent() function is used to declare a callback to handle the intent.
The callback receives two important arguments:
    - A DialogflowConversation object. This is a client library abstraction of the state of the dialog, and includes properties which represent values
	of the incoming request to our webhook, such as the current active Dialogflow contexts, the surface capabilities of the user device, etc.
    - A Dialogflow Parameters object. This is a JavaScript Object representation of the parameter values collected in the related intent.
	(Remember how the step in the DialogFlow that you prepared nameIntent and added name paramtr? The same parameter name is used
	by the client library to represent its value.)
*/


    'nameIntent': (conv, parametr) => {
      let myName = parametr['given-name'];
      console.log('Hey this is log, nice to see you here');
      console.log(myName);


        conv.ask('Hello '
            + myName +
            ' For what city do you want to get weather, my dear '+myName);
      },
};
