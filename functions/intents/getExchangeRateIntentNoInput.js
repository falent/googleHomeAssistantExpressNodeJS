module.exports = {
    'getExchangeRateIntentNoInput': (conv) => {
        const repromptCount = parseInt(conv.arguments.get('REPROMPT_COUNT'));
        if (repromptCount === 0) {
        conv.ask(`Do you like to change more, ${conv.data.username}?`);
        } else if (repromptCount === 1) {
        conv.ask(`Are you still there, ${conv.data.username}?`);
        } else if (conv.arguments.get('IS_FINAL_REPROMPT')) {
        conv.close(`Maybe you like to talk to me later.`);
        }
      },
    
    
};