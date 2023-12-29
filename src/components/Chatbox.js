import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone,faComment, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import ChatBot from 'react-simple-chatbot';
import { isMobile } from 'react-device-detect';



export default function Chatbox() {
  const [showOptions,setShowOptions] = useState(false);
  const [showChatbot,setShowChatbot] = useState(false);
  const steps = [
    {
      id: '1',
      message: 'Hello, how can I help you today?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'You typed: {previousValue}. How can I assist you further?',
      trigger: '2',
    },
  ];

  const whatsappHandler = () => {
    if (isMobile) {
      window.location.href = `https://api.whatsapp.com/send?phone=+918750120761`;
    } else {
      window.open(`https://web.whatsapp.com/send?phone=+918750120761`, '_blank');
    }
  }
  return (
    <div class="chatboxcomp-cont">
    {showChatbot === false ? (  
    <div>    
    {showOptions && (
            <div>
              <div class="callbox-container" style={{background:"#47b45f"}} onClick={whatsappHandler}>
                <FontAwesomeIcon className="icon" icon={faWhatsapp}  size="lg"/>
               </div>
             <div class="callbox-container" style={{background:"#232fc9"}} onClick={() => setShowChatbot(true)}>
             <FontAwesomeIcon className="icon" icon={faComment}  />
           </div>
           </div>
       )}
    <div class="callbox-container" onClick={() => setShowOptions(!showOptions)}>
      <FontAwesomeIcon className="icon" icon={showOptions ? faXmark : faComment}  />
    </div>
    </div>
    ) : (
      <div class="chatbot-container">
        <div>
        <ChatBot steps={steps} />
        </div>
        <div class="callbox-container" style={{background:"#f41414"}} onClick={() => setShowChatbot(false)}>
        <FontAwesomeIcon className="icon" icon={faXmark} />
        </div>
      </div>  
    )}
  </div>
  )
}