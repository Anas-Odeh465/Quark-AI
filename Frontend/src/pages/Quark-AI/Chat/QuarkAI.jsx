import { useState, useEffect, useRef } from "react";
import TypingEffect from '../TypeReply';
import { CopyIcon, PlusIcon ,PlusCircleIcon, ArrowRight, MemoryStickIcon, BotIcon, HelpCircleIcon, ProjectorIcon, EarthIcon, Wind, PieChartIcon, SaveAllIcon, User2Icon, YoutubeIcon, ThumbsUpIcon, ThumbsDownIcon, ShareIcon, Repeat1Icon,
        HistoryIcon, BotMessageSquareIcon, SettingsIcon, MoonIcon, MenuIcon ,SunIcon, NewspaperIcon, BlocksIcon, UploadIcon, FileImage, FacebookIcon, InstagramIcon, TwitterIcon, CircleHelpIcon} from "lucide-react";
import Typed from "typed.js";
import { NormalType } from "../TypeError";
import serverUrl from "../../../ServerAPI";

export default function QuarkAI() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMemoryOn, SetIsMemoryOn] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [isDeepThink, setIsDeepThink] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [generatedImages, setGeneratedImages] = useState(false);

  const getUserId = () => {
      let userId = localStorage.getItem("userId");

      if (!userId) {
        userId = "user_" + Math.random().toString(36).substring(2, 10);
        localStorage.setItem("userId", userId);
      }

      return userId;
  };

const handleSend = async () => {
  if (input.trim() === '') return;

  const userMessage = input;
  const userId = getUserId();
  const Deep = isDeepThink ? 'Think Deeply' : 'Normal';

  setInput('');
  resetInput();
  setIsLoading(true);

  console.log("📤 Sending request:", {
    userId,
    message: userMessage,
    mode: Deep
  });

  // =========================
  // 🖼️ IMAGE MODE
  // =========================
  if (generatedImages) {
    try {
      setChatMessages(prev => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'ai', content: 'Generating image...' }
      ]);

      const res = await fetch(`${serverUrl}/api/image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage
        }),
      });

      const data = await res.json();

      // 🔥 استبدل رسالة "Generating..." بالصورة
      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'ai-image',
          image: data.image
        };
        return updated;
      });

    } catch (error) {
      console.error("Image generation error:", error);

      setChatMessages(prev => [
        ...prev,
        { role: 'ai-error', content: "Image generation failed." }
      ]);
    } finally {
      setGeneratedImages(false);
      setIsLoading(false);
    }

    return; // 💣 أهم سطر (يوقف chat)
  }

  // =========================
  // 💬 CHAT MODE
  // =========================
  setChatMessages(prev => [
    ...prev,
    { role: 'user', content: userMessage },
    { role: 'ai', content: '' }
  ]);

  try {
    const res = await fetch(`${serverUrl}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        system: Deep,
        userId
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      setChatMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'ai',
          content: fullText
        };
        return updated;
      });
    }

  } catch (error) {
    console.error('Chat error:', error);

    setChatMessages(prev => [
      ...prev,
      { role: 'ai-error', content: "Something went wrong. Try again." }
    ]);
  } finally {
    setIsLoading(false);
  }
};


const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
};

useEffect(() => {
  scrollToBottom();
}, [chatMessages]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && input.trim() !== '') {
      e.preventDefault();
      handleSend();
      resetInput();
    }
  };

  const resetInput = () => {
    containerRef.current.style.marginTop = '50px';
    containerRef.current.style.height = 'auto'; 
    textAreaRef.current.style.height = 'auto'; 
  }
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedValue = localStorage.getItem('isDarkMode');
    return storedValue === 'true'; 
  });

  
  const handleMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    console.log('Dark mode:', newMode);
    localStorage.setItem('isDarkMode', newMode.toString()); 
    document.body.style.backgroundColor = newMode ? '#1f2023' : '#ffffff';
  };

  const typeRef = useRef(null);
  useEffect(() => {
    const typed = new Typed(typeRef.current, {
      strings: [
        "How can i help you today?"
      ],
      typeSpeed: 30,
      backSpeed: 30,
      backDelay: 3500,
      loop: false,
      cursorChar: "⚫",
      onComplete: () => {
        typed.cursor.remove();     
      }
    });

    return () => typed.destroy();
  }, []);

  const MenuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (MenuRef.current && !MenuRef.current.contains(event.target)) {
        setIsMenuOpen(false); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const textAreaRef = useRef(null);
  const containerRef = useRef(null);
  const handleInput = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';

    const newHeight = Math.min(textarea.scrollHeight, 200);
    textarea.style.height = `${newHeight}px`;

    if (containerRef.current) {
      containerRef.current.style.height = `${newHeight + 80}px`; 
      const marginTop = newHeight > 60 ? -45 : 50;
      if(chatMessages.length > 0){
        containerRef.current.style.marginTop = `${marginTop}px`;
      }
      else if(newHeight > 60){
        containerRef.current.style.marginBottom = '-80px';
        containerRef.current.style.zIndex = '10 !important';
      }
      else{
        containerRef.current.style.marginBottom = '-70px';
      }
    }
  };

  return(
    <div className={`min-h-screen w-full m-0 p-0 transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#1f2023] text-white' : 'bg-white text-black'}`}>
      <div className="flex flex-col items-center justify-center h-full w-full">

        {/* Header section */}
        <div className={`fixed z-30 top-0 flex flex-row justify-between items-center transition-all duration-300 ease-in-out h-16 ${isDarkMode ? 'bg-[#1f2023]' : 'bg-white'} space-x-2 p-2 px-2 w-full`}>
          
          {/*( Menu )*/}
          <div ref={MenuRef} className="flex flex-row justify-center items-center p-4">
            <div onClick={() => setIsMenuOpen(!isMenuOpen)} className={`flex justify-center items-center p-2  cursor-pointer rounded-full transition-all duration-300 ease-in-out ${isDarkMode ? ' hover:bg-[#27292d] text-white' : 'bg-white hover:bg-gray-100 text-black'}`}>
              <MenuIcon className={`w-7 h-7 ${isDarkMode ? 'text-white' : 'text-black'}`} />
            </div>
            <div  className={`absolute lg:top-5 top-0 right-3 lg:right-45 transition-all  duration-300 ease-in-out  ${isMenuOpen ? 'opacity-100 translate-y-20 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'} ${isDarkMode ? 'bg-[#1f2023]' : 'bg-white'}`}>
              <div  className={`flex lg:flex-row flex-col gap-6 justify-between items-center transition-all duration-300 ease-in-out text-left lg:w-[1000px] w-full h-full rounded-md p-8 border-1 shadow-lg ${isDarkMode ? 'border-[#27292d]' : 'bg-white border-gray-200'}`}>
                {/* Left menu section */}
                <div className="flex flex-col justify-center items-center w-full space-y-6">
                  <div className={`flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <PlusIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">New chat</a>
                  </div>

                  <div className={`flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <HistoryIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">History</a>
                  </div>

                  <div className={`flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <MemoryStickIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">Memories</a>
                  </div>

                  <div className={`flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <HelpCircleIcon className="w-5 h-5" />
                    <a href="#" className="text-lg">Help</a>
                  </div>
                </div>

                {/* Center menu section */}
                <div className="flex flex-col justify-center items-center w-full space-y-6">
                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <PlusCircleIcon className="w-5 h-5" />
                    <a href="#" className="text-lg">Create agent</a>
                  </div>

                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <BotIcon className="w-5 h-5" />
                    <a href="#" className="text-lg">My agents</a>
                  </div>
                
                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <BotMessageSquareIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">Mail agent</a>
                  </div>

                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <ProjectorIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">Projects</a>
                  </div>
                </div>

                {/* Right menu section */}
                <div className="flex flex-col space-y-6 justify-center items-center w-full ">
                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <BlocksIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">Apps</a>
                  </div>
                  
                  <div className={`hidden lg:flex flex-row  w-full items-center gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <NewspaperIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">News</a>
                  </div>

                  <div className={`flex flex-row  w-full items-center mb-9 gap-4 px-4 border-1  p-2 cursor-pointer rounded-lg ${isDarkMode ? 'hover:bg-[#27292d] border-[#27292d]' : 'border-gray-200 hover:bg-gray-200'}`}>
                    <SettingsIcon className="w-5 h-5 " />
                    <a href="#" className="text-lg">Settings</a>
                  </div>

                  <div className="flex flex-row  w-full items-center gap-4 px-4 mb-2">
                    {isDarkMode ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                    {/* toggle mode */}
                    <div onClick={handleMode} className={`flex flex-row items-center rounded-full w-15 h-5 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'py-3 bg-[#27292d]' : 'py-3 bg-gray-300 '}`}>
                      <div className={` w-4 h-4 ml-1 rounded-full transition-all duration-300 ease-in-out ${isDarkMode ? 'translate-x-6 ml-4 bg-[#1f2023]' : 'bg-white'}`}></div>
                    </div>
                    <SaveAllIcon className="w-5 h-5 ml-7" />
                    {/* toggle memory */}
                    <div onClick={() => SetIsMemoryOn(!isMemoryOn)} className={`flex flex-row items-center rounded-full w-15 h-5 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'py-3 bg-[#27292d]' : 'py-3 bg-gray-300 '}`}>
                      <div className={` w-4 h-4 ml-1 rounded-full transition-all duration-300 ease-in-out ${isMemoryOn ? 'translate-x-6 ml-4 ' : ''} ${isDarkMode ? 'bg-[#1f2023]' : 'bg-white'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>  
          </div>

          {/* Info top of the  screen */}
          <div className={`hidden lg:flex flex-row ml-10 justify-center ${isDarkMode ? 'text-gray-200 ' : 'text-black'} items-center space-x-2 `}>
            <CircleHelpIcon className="w-3.5 h-3.5"/>
            <span className={`text-sm `}>Don't forget to login to save your chat</span>
          </div>
          

          {/* Login section */}
          <div className="flex flex-row justify-center items-center">
            <a href="/Login" className={`border-1  p-2 px-6  rounded-lg m-4 ${isDarkMode ? 'border-[#27292d] hover:bg-[#27292d]' : 'border-gray-100 hover:bg-gray-100'}`}>Log in</a>
          </div>
        </div>

        {/* Chat section NEW */}
        <div className={`${chatMessages.length > 0 ? 'flex' : 'opacity-0 pointer-events-none'} transition-all duration-300 ease-in-out flex-col
            p-2 lg:p-4 overflow-y-auto mt-30 lg:mt-20 mb-40 lg:mb-100 h-auto w-full lg:w-[950px] lg:max-w-[70%] xl:max-w-[960px] mx-auto`}>

          {/* All messages */}
          {chatMessages.map((message, index) => (
            <div key={index} className={`
              transition-all duration-300 ease-in-out
              ${message.role === 'user'
                ? `self-end w-fit max-w-[80%] sm:max-w-[550px] p-3 lg:p-4 px-4 lg:px-6 rounded-lg mb-3 lg:mb-5 ${isDarkMode ? 'bg-[#27292d] text-white' : 'bg-gray-100 text-black'}`
                : `self-start w-full max-w-full lg:max-w-[80%] xl:max-w-[90%] p-3 lg:p-4 rounded-lg mb-3 lg:mb-5 ${isDarkMode ? 'bg-[#1f2023] text-white' : 'bg-white text-black'}`
              }`}>

              {message.role === 'user' ? (
                <span className="flex whitespace-break-spaces">{message.content}</span>
              ) : message.role === 'ai-error' ? (
                 <NormalType mode={isDarkMode} message={message.content} />
              ) : message.role === 'ai-image' ? (
                  <img
                    src={message.image}
                    className="rounded-lg mt-2 max-w-full"
                  />
                ) : (
                
                <div className="flex flex-col w-auto space-y-2 py-2">

                  <div ref={messagesEndRef} className="min-h-[40px] sm:whitespace-pre-line text-sm lg:text-base">
                    <TypingEffect mode={isDarkMode} text={message.content} />
                  </div>

                  {chatMessages.length > 0 && (
                    <div className="flex flex-row justify-start items-center -mt-5 gap-2">
                      <button onClick={() => {navigator.clipboard.writeText(message.content); alert('✅ Copied');}} className={`flex items-center cursor-pointer p-2 rounded-full text-sm lg:text-base ${isDarkMode ? 'hover:bg-[#27292d] text-white' : 'hover:bg-gray-200 text-black'}`}>
                        <CopyIcon className="w-4 h-4"/>
                      </button>
                      <button onClick={() => {navigator.clipboard.writeText(message.content); alert('✅ Copied');}} className={`flex items-center cursor-pointer p-2 rounded-full text-sm lg:text-base ${isDarkMode ? 'hover:bg-[#27292d] text-white' : 'hover:bg-gray-200 text-black'}`}>
                        <ShareIcon className="w-4 h-4"/>
                      </button>
                      <button onClick={() => {navigator.clipboard.writeText(message.content); alert('✅ Copied');}} className={`flex items-center cursor-pointer p-2 rounded-full text-sm lg:text-base ${isDarkMode ? 'hover:bg-[#27292d] text-white' : 'hover:bg-gray-200 text-black'}`}>
                        <Repeat1Icon className="w-4 h-4"/>
                      </button>
                      <button onClick={() => setIsLiked(!isLiked)} className={`flex items-center cursor-pointer p-2 rounded-full text-sm lg:text-base ${isDarkMode ? 'hover:bg-[#27292d] text-white' : 'hover:bg-gray-200 text-black'}`}>
                        <ThumbsUpIcon className={`w-4 h-4 ${isLiked ? 'fill-blue-500' : ''}`}/>
                      </button>
                      <button onClick={() => {navigator.clipboard.writeText(message.content); alert('✅ Copied');}} className={`flex items-center cursor-pointer p-2 rounded-full text-sm lg:text-base ${isDarkMode ? 'hover:bg-[#27292d] text-white' : 'hover:bg-gray-200 text-black'}`}>
                        <ThumbsDownIcon className="w-4 h-4"/>
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}

          {/* ✅ LOADER هون (المكان الصح) */}
          {isLoading && (
            <div className={`self-start w-full max-w-full lg:max-w-[80%] xl:max-w-[90%] p-3 lg:p-4 rounded-lg mb-3 lg:mb-5 ${isDarkMode ? 'bg-[#1f2023]' : 'bg-white'}`}>
              <div className={`${isDarkMode ? "loader-light" : 'loader-dark'}`}></div>
            </div>
          )}

        </div>

        

        {/* Center screen group items*/}
        <div className={`fixed inset-x-0 h-56 flex justify-center items-center ${isDarkMode ? 'bg-[#1f2023]' : 'bg-white'} transition-all duration-300 ease-in-out ${chatMessages.length > 0 ? '-bottom-19 pb-6' : 'top-70 '}`}>
          <div className="w-full max-w-5xl px-4 ">

            {/* Greeting or help message */}
        <div className={`z-20 flex flex-row  transition-all duration-300 ease-in-out ${chatMessages.length > 0 ? 'hidden' : 'flex'} items-center justify-start ${isDarkMode ? 'bg-[#1f2023] ' : 'bg-white '}`}>
          <span ref={typeRef} className="text-left lg:text-2xl text-xl pr-2 text-shadow-lg font-bold whitespace-pre-line"></span>
        </div>
            
            <div 
              ref={containerRef} 
              className={`relative animated-shadow-box w-full  p-4 rounded-xl shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-[#27292d] border border-[#383b40]' : 'bg-white border border-gray-200'} ${chatMessages.length > 0 ? 'bottom-24 pb-6' : 'top-1/2 transform translate-y-22'}`}
            >
              <div className="flex flex-row flex-grow items-center justify-between w-full mt-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  ref={textAreaRef}
                  placeholder="Ask anything..."
                  className="w-full max-h-[250px] overflow-y-auto transition-all duration-150 ease-in-out placeholder:text-gray-400 placeholder:text-[16px] resize-none outline-none text-[16px] px-3 mr-2" 
                  onInput={handleInput}
                ></textarea>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={`absolute right-3 top-3 p-2 rounded-full transition-all ${isDarkMode ? 'bg-[#27292d] border-1 border-[#1f2023] hover:bg-[#1f2023]  rounded-full' : 'bg-black text-white hover:bg-white hover:text-black hover:border-1 hover:border-black rounded-full'} ${!input.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <ArrowRight className="w-5 h-5 " />
                  </button>
              </div>
              <div className="flex flex-row justify-between items-center space-x-3 gap-2 w-full">
                <div onClick={() => setWebSearch(!webSearch)} className={`flex flex-row items-center justify-center p-1 ${webSearch ? 'bg-[#1f2023] text-blue-700 border-1 border-blue-700 ': ''} px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : 'bg-white hover:bg-gray-100'}`}>
                  <EarthIcon className={`w-4 h-4 cursor-pointer transition-all duration-500 ease-in-out ${webSearch ? 'text-blue-700  transition-all duration-500 ease-in-out animate-spin': ''} ${isDarkMode ? '' : 'text-black'}`}/>
                  <span className="text-sm">Web</span>
                  <span className="hidden lg:flex text-sm">search</span>
                </div>
                <div onClick={() => {webSearch ? setWebSearch(false) && setIsDeepThink(!isDeepThink): setIsDeepThink(!isDeepThink)}} className={`flex flex-row items-center justify-center p-1 ${isDeepThink ? 'bg-[#1f2023] text-blue-700 border-1 border-blue-700 ': ''} px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : 'bg-white hover:bg-gray-100'}`}>
                  <Wind className={`w-4 h-4 cursor-pointer ${isDeepThink ? 'text-blue-700  transition-all duration-500 ease-in-out  animate-pulse': ''} ${isDarkMode ? '' : 'text-black'}`}/>
                  <span className="text-sm">Think</span>
                  <span className="hidden lg:flex text-sm">deeply</span>
                </div>
                <div className={`flex flex-row items-center justify-center p-1 px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : 'bg-white hover:bg-gray-100'}`}>
                  <PieChartIcon className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/>
                  <span className="text-sm">Market</span>
                  <span className="hidden lg:flex text-sm">analysis</span>
                </div>
                <div className={`hidden xl:flex lg:flex flex-row items-center justify-center p-1 px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : 'bg-white hover:bg-gray-100'}`}>
                  <User2Icon className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/>
                  <span className="text-sm">Customer</span>
                  <span className="hidden lg:flex text-sm">management</span>
                </div>
                <div onClick={() => setGeneratedImages(!generatedImages)} className={`hidden xl:flex lg:flex flex-row items-center justify-center ${generatedImages ? 'bg-green-400/30 text-green-600 border-1 border-green-700 ':  `${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : ' hover:bg-gray-100'}`} p-1 px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out `}>
                  <FileImage className={`w-4 h-4 cursor-pointer ${generatedImages ? ' text-green-700': ''}`}/>
                  <span className="text-sm">Generate</span>
                  <span className="hidden lg:flex text-sm">image</span>
                </div>
                <div className={`hidden xl:flex lg:flex flex-row items-center justify-center p-1 px-2 rounded-lg gap-2 cursor-pointer transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-[#27292d]  hover:bg-[#1f2023]' : 'bg-white hover:bg-gray-100'}`}>
                  <UploadIcon className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/>
                  <span className="text-sm">Upload</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        <div className="hidden lg:flex flex-row text-center ">
          {/* Social media app and Note */}
          <div className="fixed bottom-1 left-1">
            <div className="flex flex-row items-baseline text-left text-sm gap-4 ms-2">Join us
              <a href="#" title="Facebook"><FacebookIcon  className={`w-3.5 h-3.5 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/></a>
              <a href="#" title="Instagram"> <InstagramIcon className={`w-3.5 h-3.5 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/></a>
              <a href="#" title="Twitter"><TwitterIcon className={`w-3.5 h-3.5 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/></a>
              <a href="#" title="Youtube"><YoutubeIcon className={`w-3.5 h-3.5 cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}/></a>
            </div>
          </div>
          <span className={`hidden lg:flex fixed bottom-1 right-2/5 lg:text-[10px] lg:ms-0 ms-1 text-center text-xs text-gray-400`}>QuarkAI may make some errors, so it's important to check important information.</span>
        </div>

      </div>
    </div>
  );
}