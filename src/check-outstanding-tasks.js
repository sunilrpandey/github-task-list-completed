const marked = require('marked');

module.exports = function (app,body) {
    if (body === null) {
        return {
            total: 0,
            remaining: 0
        };
    }

    let tokens = marked.lexer(body, { gfm: true });
    //const html = marked.parser(tokens)
    app.log("tokens size", tokens.length)
    var i = 0
    for(i = 0; i < tokens.length; i++){
      app.log("token : ", i)
      app.log(tokens[i])
    }
    //app.log("HTML : ", html)
    app.log("Checkbox Tokens : ",tokens)
    let tableItems = tokens.filter(token => token.type === 'table');
    app.log("\n\n\n\n\nTable item :", tableItems)
    let listItems = tokens.filter(token => token.type === 'list_item_start');
  
    app.log("\n\n\\nCheckbox Lists : ",listItems)

    // return counts of task list items and how many are left to be completed
    return {
        total: listItems.filter(item => item.checked !== undefined).length,
        remaining: listItems.filter(item => item.checked === false).length
    };
};
