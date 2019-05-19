module.exports = {

  'nameIntent': (conv, parameter) => {
    const myName = parameter['given-name'];
    conv.data.username = myName;
    conv.ask('Hi '+myName + '! What do you like to change?');
  },


};
