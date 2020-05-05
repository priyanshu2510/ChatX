const express=require('express');
const http=require('http');
const socketio=require('socket.io');
const app= express();
const server=http.createServer(app);
const io=socketio(server);
const formatmsg=require('./messages');
const {userJoin ,getcurrentuser,userLeave,getroomusers}=require('./users');
app.use(express.static('../frontend'));
const name="ChatXBot";
 io.on('connection',socket=>{
     //console.log('New  Ws connection ...');
      socket.on('joinroom',({username,room})=>{
          const user=userJoin(socket.id,username,room);
          socket.join(user.room);
        socket.emit('message',formatmsg(name,'Welcome to ChatX'));

        socket.broadcast.to(user.room).emit('message',formatmsg(name,`${username} has joined the chat`));
         
        io.to(user.room).emit('roomusers',{
            room:user.room,
            users:getroomusers(user.room)
        })
           
    });
     
     
     socket.on('chatmessage',msg=>{
         const user=getcurrentuser(socket.id);
         //console.log(msg);
         io.to(user.room).emit('message',formatmsg(user.username,msg));
     });
     socket.on('disconnect',()=>{
         const user=userLeave(socket.id);
         if(user){
            io.to(user.room).emit('message',formatmsg(name,`${user.username} has left the chat`));
            io.to(user.room).emit('roomusers',{
                room:user.room,
                users:getroomusers(user.room)
            })
         }
       
    });
 })


















const port=3001;
server.listen(port,()=>console.log(`Server running on port ${port}....`))