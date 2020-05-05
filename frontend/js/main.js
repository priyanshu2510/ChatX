

const socket=io();
const {username,room}=Qs.parse(location.search,{
 ignoreQueryPrefix:true,
});
socket.emit('joinroom',{username,room});
console.log(username,room);
function verifyForm() {
   let msg= $('#msg').val().trim();
   console.log(msg);
   socket.emit('chatmessage',msg);
   $('#msg').val('');
   $('#msg').focus();
}

socket.on('roomusers',({room,users})=>{
    outputroom(room);
    outputusers(users);
})
socket.on('message',message=>{
    console.log(message);
    outmessage(message);
    $('.chat-messages').scrollTop( $('.chat-messages').height());
});
function outmessage(message)
{
    $('.chat-messages').append(`<div class="message">
    <p class="meta">${message.username}<span> ${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>
</div>`)
}
function outputroom(room){
 $('#room-name').text(room);
}
function outputusers(users){
    $('#userss').html(users.map(user=>`<li>${user.username}</li>`));
}