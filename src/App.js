import { useEffect, useState } from "react";
import db from "./firebase";
import { ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from 'uuid'
import moment from "moment"

function App() {
  //useState
  const [msgInput, setmsgInput] = useState('')
  const [messages, setmessages] = useState([])
  const [username, setusername] = useState('')
  const time = moment().valueOf()

  //useEffect
  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      const user = JSON.parse(localStorage.getItem('user_id'))
      setusername(user)
    } else {
      setusername(prompt('Please enter your username'))
    }
  }, [])

  useEffect(() => {
    const starCountRef = ref(db, 'messages/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setmessages(Object.values(data))
      console.log(Object.values(data));
    });
  }, [])

  useEffect(() => {
    if (username.length > 0) {
      localStorage.setItem('user_id', JSON.stringify(username))
    }
  }, [username])

  //functions
  function writeUserData(username, msgInput, msgId) {
    set(ref(db, 'messages/' + msgId), {
      username: username,
      message: msgInput,
      timestamp: time
    });
  }

  const sending = (e) => {
    e.preventDefault();
    setmessages([
      ...messages, {
        username: username,
        message: msgInput,
        timestamp: time
      }
    ])
    setmsgInput('')

    const chatlistEl = document.querySelector('#pms')
    chatlistEl.scrollTop = chatlistEl.scrollHeight + 10000;

    const msgId = uuidv4();

    writeUserData(username, msgInput, msgId)
  }

  function logout() {
    localStorage.removeItem('user_id')
    window.location.reload()
  }

  //test

  return (
    <div className="container">
      <div className='chat-bar'>
        <p>{messages.length > 1 ? 'Messages Counts' : 'Messages Count'}: {messages.length}</p>
        <div className='dropdown'>
          <button>...</button>
          <div className='dropdown-content'>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      {
        messages.length <= 0 && <h1 className="empty-msgList">No Messages Yet...</h1>
      }
      <div className='pms' id='pms'>
        {
          messages.sort((a, b) => a.timestamp < b.timestamp ? -1 : 1).map((massage, i) => (
            <div key={i} className={username === massage.username ? 'user_msg' : 'guest_msg'}>
              <p className='username'>{massage.username ? massage.username : 'unknown user'}</p>
              <p className='pm-body'>{massage.message}</p>
              <p className='pm_time'>{moment(massage.timestamp).fromNow()}</p>
            </div>
          ))
        }
      </div>
      <div className='form-div'>
        <form onSubmit={sending} className="message-form">
          <input type="text" value={msgInput} onChange={(e) => setmsgInput(e.target.value)} placeholder="Enter your message..." />
          <button disabled={!msgInput}>Send</button>
        </form>
      </div>
    </div>
  );
}


export default App;
