import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
// import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
// import { BsEmojiSmileFill } from 'react-icons/bs'

const ChatInput = ({ handleSendMessage }) => {
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  // const handleEmojiPickerHideShow = () => {
  //   setShowEmojiPicker(!showEmojiPicker);
  // }

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  //   // console.log(msg);
  // }

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      // console.log(msg);
      handleSendMessage(msg);
      setMsg("");
    }
  }
  return (
    <Container>
      {/* <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div> */}
      <form className='input-container' onSubmit={(e) => sendChat(e)}>
        <input type="text" placeholder='Type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  )
}

export default ChatInput

const Container = styled.div`
  // display: grid;
  // align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  // .button-container {
  //   display: flex;
  //   align-items: center;
  //   color: white;
  //   gap: 1rem;
  //   .emoji {
  //       position: relative;
  //       svg {
  //         font-size: 1.5rem;
  //         color: #ffff00c8;
  //         cursor: pointer;
  //       }
        
  //   }
  // }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;