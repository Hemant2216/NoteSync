import { Server } from "socket.io";
import Connection from "./database/db.js";
import { getDocument,updateDocument } from "./controller/docController.js";

Connection();

const io=new Server(5555,{
    cors:{
        origin:'https://note-sync-pi.vercel.app',
        methods:['GET','POST']
    }
})

io.on('connection',socket=>{
    socket.on('get-document',async documentId=>{
        const document=await getDocument(documentId);
        socket.join(documentId);
        socket.emit('load-document',document.data);
        socket.on('send-changes',delta =>{
            socket.broadcast.to(documentId).emit('receive-changes',delta);
        })
        socket.on('save-document',async data=>{
            await updateDocument(documentId,data)
        })
        console.log('connected');
    })
    
});
