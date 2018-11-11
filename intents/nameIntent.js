
module.exports = {

    'nameIntent': (conv, parametr) => {


      var par2 = conv['parameters']['given-name'];
      //console.log('that is conv' + '\n' + JSON.stringify(conv) + '\n' + '\n');


      console.log('that is parametr' + '\n'+JSON.stringify(parametr));
      var myName = parametr["given-name"];
      console.log("Hey this is log, nice to see you here");
      console.log(myName)


        conv.ask("Hello " + myName + " For what city do you want to get weather, my dear "+myName);

      }
};



