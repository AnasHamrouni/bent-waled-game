import './App.css';
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const defaultImage = 'https://cdn.midjourney.com/69c3381f-d0ab-4a15-800b-fee1677878c6/0_0.webp'; // Replace with your default image URL
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [JoinedaRoom, setJoinedaRoom] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [randomArabicLetter, setRandomArabicLetter] = useState("");
  const [players, setPlayers] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const [profileImage, setProfileImage] = useState(defaultImage);
  const [currentEntry, setCurrentEntry] = useState({
    bent: '',
    walad: '',
    hayawen: '',
    jamed: '',
    okla: '',
    bled: '',
    mehna: '',
    mashhour: '',
  });
  const [allEntries, setAllEntries] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    socket.on('gameStarted', (arabicLetter) => {
      setGameStarted(true);
      setRandomArabicLetter(arabicLetter);
      setAllEntries([]); // Clear entries at the start of the game
      setCurrentEntry({
        bent: '',
        walad: '',
        hayawen: '',
        jamed: '',
        okla: '',
        bled: '',
        mehna: '',
        mashhour: '',
      });
      setHasSubmitted(false);
    });
    socket.on('allEntries', (entries) => {
      setAllEntries(entries);
      setCurrentEntry({
        bent: '',
        walad: '',
        hayawen: '',
        jamed: '',
        okla: '',
        bled: '',
        mehna: '',
        mashhour: '',
      });
      setHasSubmitted(true); // Prevent further submissions
    });
    socket.on('updatePlayerList', (playersData) => {
      setPlayers(playersData);
    });
    return () => {
      socket.off('gameStarted');
      socket.off('allEntries');
      socket.off('updatePlayerList');
    };
  }, [socket]);

  const CopyToClipboardIcon = ({ textToCopy }) => {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        // Handle the copy confirmation (e.g., by showing a tooltip)
        console.log('Content copied to clipboard!');
      } catch (err) {
        // Handle the copy failure
        console.error('Failed to copy: ', err);
      }
    };
  
    return (
      <i
        className="fas fa-copy copyIcon"
        onClick={handleCopy}
        style={{ cursor: 'pointer' }}
        title="Copy to clipboard"
      ></i>
    );
  };

  const handleInputChange = (e) => {
    setCurrentEntry({ ...currentEntry, [e.target.name]: e.target.value });
    socket.emit('updatePlayerEntries', { room, entry: { ...currentEntry, [e.target.name]: e.target.value } });
  };
  const handleImageURLChange = (e) => setImageURL(e.target.value);

  const handleImageError = () => {
    setProfileImage(defaultImage);
  };

  const updateProfileImage = () => {
    if (imageURL.trim() !== '') {
      setProfileImage(imageURL);
    }
  };


  const createRoom = () => {
    if (username == "") {
      alert("Please insert a username");
    }else{
      socket.emit('createRoom', {username, profileImage}, (roomId) => {
        setRoom(roomId);
        setIsHost(true);
        setJoinedaRoom(true);
      });
    }

  };

  const joinRoom = () => {
    if (username == "") {
      alert("Please insert a username");
    }else{
      socket.emit('joinRoom', { room, username,profileImage },(room) => {
        setJoinedaRoom(true);
        setIsHost(false);
      });
    }
  };
  const startGame = () => {
    socket.emit('startGame', room);
    setHasSubmitted(false);
  };

  const submitEntry = () => {
    if (!hasSubmitted) {
      socket.emit('submitEntry', { room, entry: currentEntry });
    }
  };


  return (
    <div className="App">
      <div className="Body">
      {JoinedaRoom ? (
        <div class="top-left-info">
            <div class="info-item">
            <h2>Players List:</h2>
            <ul>
              {players.map((player, index) => (
                <li key={index}>
                  <img class="icon username-icon" src={player.profileImage} alt={`${player.username}'s profile`} width="50" height="50" />
                  <span>{player.username}</span>
                </li>
              ))}
            </ul>
            </div>
          <div class="value">
            <span>Room ID: {room}</span>
            <CopyToClipboardIcon textToCopy={room} />
          </div>
            {(isHost & JoinedaRoom) ? (
            <div>
              <button onClick={startGame}>New Game</button>
            </div>):(
              <div></div>
            )}
          </div>
      ) : (
        <div>
          <div>
          <label htmlFor="profile-picture">Profile Picture URL</label>
          <input
            id="profile-picture"
            value={imageURL}
            onChange={handleImageURLChange}
            placeholder="Enter image URL"
            onBlur={updateProfileImage} // Update the profile image when the input loses focus
          />
          <img 
            src={profileImage}
            onError={handleImageError}
            alt="Profile"
            className="ProfileImage"
          />
        </div>
          <div>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <button onClick={createRoom}>Create Room</button>
            <input
              placeholder="Room ID"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              //disabled={!!room}
            />
            <div>
            <button onClick={joinRoom}>Join Room</button>
            </div>
          </div>
        </div>
      )}
      {gameStarted && (
        <div>
          <div class="letterinfo">
            
            <span class="arabic-letter">{randomArabicLetter}</span>
            <span class="arabic-letter-label">:الحرف</span>
          </div>
        <table className="entries-table">
          <thead>
            <tr>
              <th>مشهور</th>
              <th>مهنة</th>
              <th>بلد</th>
              <th>أكلة</th>
              <th>جماد</th>
              <th>حيوان</th>
              <th>ولد</th>
              <th>بنت</th>
            </tr>
          </thead>
          <tbody>
            {allEntries.map((entry, index) => (
              <tr key={index}>
                {Object.values(entry).map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            ))}
            {!hasSubmitted && (
              <tr>
                {Object.keys(currentEntry).map((key, index) => (
                  <td key={index}>
                    <input
                      name={key}
                      value={currentEntry[key]}
                      onChange={handleInputChange}
                      className="table-input"
                    />
                  </td>
                ))}
              </tr>
            )}
          </tbody>
        </table>
        {!hasSubmitted && (
        <button className="submit-button" onClick={submitEntry} disabled={!gameStarted || hasSubmitted}>Submit</button>
        )}
      </div>
      )}
      </div>
    </div>
  );
}

export default App;
