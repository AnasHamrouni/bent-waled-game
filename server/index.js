const express = require('express');
const app = express();
const http = require("http");
const {Server} = require('socket.io');
const cors = require("cors");
app.use(cors());
const server = http.createServer(app)
let entries = []; // To store all the entries
const rooms = {}; // Store room information
const io = new Server(server,{
    cors:{
        origin: "http://130.61.144.100:3000",
        methods: ["GET","POST"],
    }
})
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
  
    socket.on('createRoom', ({username,profileImage}, callback) => {
      const roomId = generateRoomId();
      rooms[roomId] = {
        host: socket.id,
        players: [{ id: socket.id, username,profileImage, entries: [] }],
      };
  
      socket.join(roomId);
      io.in(roomId).emit('updatePlayerList', rooms[roomId].players);
      console.log(`${username} created room ${roomId}`);
      callback(roomId); // Send back the room ID to the client
    });
  
    socket.on('joinRoom', ({ room, username,profileImage },callback) => {
      if (rooms[room]) {
        rooms[room].players.push({ id: socket.id, username,profileImage, entries: [] });
        socket.join(room);
        console.log(`${username} joined room ${room}`);
        callback(room);
        io.in(room).emit('updatePlayerList', rooms[room].players);
      } else {
        console.log(`Room ${room} does not exist.`);
      }
    });
  
    socket.on('startGame', (room) => {
      if (rooms[room] && rooms[room].host === socket.id) {
        const arabicLetters = '\u0623\u0628\u062A\u062B\u062C\u062D\u062E\u062F\u0630\u0631\u0632\u0633\u0634\u0635\u0636\u0637\u0638\u0639\u063A\u0641\u0642\u0643\u0644\u0645\u0646\u0647\u0648\u064A';
        randomArabicLetter = arabicLetters.charAt(Math.floor(Math.random() * arabicLetters.length));
        io.to(room).emit('gameStarted', randomArabicLetter);
        console.log(`Game started in room ${room} with letter ${randomArabicLetter}`);

      }
    });
    socket.on('updatePlayerEntries', ({ room, entry }) => {
        if (rooms[room]) {
            const player = rooms[room].players.find((p) => p.id === socket.id);
            if (player) {
                player.entries = entry;
                console.log(`Entries updated for player ${socket.id} with ${player.entries}`);
            }
        }
    });
    socket.on('submitEntry', ({ room, entry }) => {
      if (rooms[room]) {
        const player = rooms[room].players.find((p) => p.id === socket.id);
        allEntries = []
        if (player) {
            allEntries = rooms[room].players.map((p) => p.entries).flat();
            io.to(room).emit('allEntries', allEntries);
            // Clear player entries
            rooms[room].players.forEach((p) => {
                p.entries = []; // Clearing the entries array
            });
            console.log(`Entries submitted in room ${room}`);
        }
      }
    });
  
    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
      
        // Find the room that the disconnecting client was in
        let roomToLeave;
        for (const [roomName, room] of Object.entries(rooms)) {
          const playerIndex = room.players.findIndex(player => player.id === socket.id);
          if (playerIndex !== -1) {
            roomToLeave = roomName;
            // Remove the player from the room
            room.players.splice(playerIndex, 1);
            console.log(`Removing player ${socket.id} from room ${roomToLeave}`);
            break;
          }
        }
      
        // If the client was in a room, notify the other players
        if (roomToLeave) {
          io.in(roomToLeave).emit('updatePlayerList', rooms[roomToLeave].players);
          console.log(`Notifying the room players`);
          // Check if the room is empty and delete it if so
          if (rooms[roomToLeave].players.length === 0) {
            console.log(`Room ${roomToLeave} is now empty and will be deleted.`);
            delete rooms[roomToLeave];
            console.log(`Deleting romm ${roomToLeave}`);
          }
        }
      });
});
  
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 7); // Generate a simple random room ID
  };
  
  
server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});