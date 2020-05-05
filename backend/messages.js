const moment = require("moment");

function formatmsg(username,txt){
    return {
        username:username,
        text:txt,
        time:moment().format('h:mm a')
    }
}
module.exports=formatmsg;