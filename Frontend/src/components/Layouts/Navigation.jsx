import { useState, useRef, useEffect } from "react";
import RightArrowHead from '../../assets/right-chevron2.png';
import { MenuIcon } from 'lucide-react';

export default function Nav(){
    const [mouseIn_1, setMouseIn_1] = useState(false);
    const [mouseIn_2, setMouseIn_2] = useState(false);
    const [mouseIn_3, setMouseIn_3] = useState(false);
    const [mouseIn_4, setMouseIn_4] = useState(false);
    const [login_menu, setLoginMenu] = useState(false);

    const [rotate_1, setRotate_1] = useState(false);
    const [rotate_2, setRotate_2] = useState(false);
    const [rotate_3, setRotate_3] = useState(false);
    const [rotate_4, setRotate_4] = useState(false);

    const [menuOpen, setMenuOpen] = useState(false);

    const [serviceHovered, setServiceHovered] = useState(false);
    const [serviceRotate, setServiceRotate] = useState(false);

    const [companyHovered, setCompanyHovered] = useState(false);
    const [companyRotate, setCompanyRotate] = useState(false);

    const serviceRef = useRef(null);
    const menuRef = useRef(null);
    const companyRef = useRef(null);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutRef.current);
        setLoginMenu(true);
      };
    
    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setLoginMenu(false);
        }, 500);       
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (serviceRef.current && !serviceRef.current.contains(event.target)) {
            setRotate_1(false); 
          }
        };

        const handleClickCompanyOutside = (event) => {
            if (companyRef.current && !companyRef.current.contains(event.target)) {
              setRotate_3(false); 
            }
          };

        const handleClickMenuOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
              }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickMenuOutside);
        document.addEventListener('mousedown', handleClickCompanyOutside);
      
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
          document.removeEventListener('mousedown', handleClickMenuOutside);
          document.removeEventListener('mousedown', handleClickCompanyOutside);
        };
      }, []);

    return(
        <div className="w-full h-12 ">
            <div className="relative top-0 left-0 right-0 w-full">
                <div className="flex flex-row justify-between items-center space-x-6 p-4">
                    <a href="/">
                        <h1 className="Header-items-font font-bold xl:text-2xl lg:text-3xl md:text-4xl sm:text-4xl text-3xl text-gray-900 lg:p-2 p-4 select-none">
                            QuarkAI
                        </h1>
                    </a>

                    {/* Main menu */}
                    <div className="hidden lg:flex flex-row justify-center items-center space-x-8 Header-items-font">
                        <div ref={serviceRef} onClick={() => setRotate_1(!rotate_1)} onMouseEnter={() => setMouseIn_1(true)} onMouseLeave={() => setMouseIn_1(false)} className="flex flex-row justify-between items-center w-[100px] gap-4 hover:bg-gray-50  p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out">
                            Services
                            <img src={RightArrowHead} alt="ArrowHead" className={`w-4 h-4 ${rotate_1 ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'} ${mouseIn_1 ? 'flex ' : 'hidden'}`}/>
                            <div className={`absolute top-20 -translate-x-2 transition-all duration-300 ease-in-out  ${rotate_1 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div  className="flex flex-col justify-center items-center text-left drop-shadow-lg w-[300px] bg-gray-100 px-4 rounded-md p-2">
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Generate images for ads</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Market and audience analysis</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Generate articles automatically</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Customer management</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Send bulk emails</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Writing marketing ads</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Proposing marketing strategies</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">SEO content production</a>
                                </div>
                            </div>
                        </div>

                        <div ref={companyRef} onClick={() => setRotate_3(!rotate_3)} onMouseEnter={() => setMouseIn_3(true)} onMouseLeave={() => setMouseIn_3(false)} className="flex flex-row justify-between items-center w-[110px] gap-4 hover:bg-gray-50  p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out">
                            Company
                            <img src={RightArrowHead} alt="ArrowHead" className={`w-4 h-4 ${rotate_3 ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'} ${mouseIn_3 ? 'flex ' : 'hidden'}`}/>
                            <div className={`absolute top-20 -translate-x-2 transition-all duration-300 ease-in-out  ${rotate_3 ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                                <div  className="flex flex-col justify-center items-center text-left drop-shadow-lg w-[180px] bg-gray-100 px-4 rounded-md p-2">
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">About us</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Contact us</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Support</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Help</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Careers</a>
                                    <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Privacy & policy</a>
                                </div>
                            </div>
                        </div>
                        
                        <div onClick={() => setRotate_2(!rotate_2)} onMouseEnter={() => setMouseIn_2(true)} onMouseLeave={() => setMouseIn_2(false)} className="flex flex-row justify-between items-center w-[140px] gap-4 hover:bg-gray-50  p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out">
                            For business
                            <img src={RightArrowHead} alt="ArrowHead" className={`w-4 h-4 ${rotate_2 ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'} ${mouseIn_2 ? 'flex ' : 'hidden'}`}/>
                        </div>
                        
                        <div onClick={() => setRotate_4(!rotate_4)} onMouseEnter={() => setMouseIn_4(true)} onMouseLeave={() => setMouseIn_4(false)} className="flex flex-row justify-between items-center w-[100px] gap-4 hover:bg-gray-50  p-2 rounded-lg cursor-pointer transition-colors duration-200 ease-in-out">
                            News
                            <img src={RightArrowHead} alt="ArrowHead" className={`w-4 h-4 ${rotate_4 ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'} ${mouseIn_4 ? 'flex ' : 'hidden'}`}/>
                        </div>
                    </div>

                    {/* Login menu */}
                    <div  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                        <div className="hidden lg:flex flex-row justify-center items-center  w-[80px]  bg-gray-100 hover:bg-gray-200 transition-colors duration-200 ease-in-out  p-2 rounded-full cursor-pointer">
                            Log in
                        </div>
                        <div className={`absolute top-20 right-10 transition-all duration-300 ease-in-out  ${login_menu ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div  className="flex flex-col justify-center  items-center text-left w-[140px] bg-gray-100 px-4 rounded-md p-2">
                                <a href="/Login" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer ">Log in</a>
                                <a href="/SignUp" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Sign up</a>
                            </div>
                        </div>
                    </div>

                    {/* Burger Menu  */}
                    <div  ref={menuRef}   className='lg:hidden z-10'>
                       <div onClick={() => setMenuOpen(!menuOpen)}  className="absolute top-5 right-5 lg:p-2 p-2 cursor-pointer hover:bg-gray-100 rounded-full">
                          <MenuIcon className=' w-10 h-10'/>
                       </div>
                       <div className={`absolute lg:top-35 top-20 left-0 right-0 transition-all duration-300 ease-in-out  ${menuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            <div  className="flex flex-col justify-center items-center text-left drop-shadow-lg w-full h-full bg-gray-100 px-4 rounded-md p-2">
                                <div className="flex flex-col justify-center items-center w-full">
                                    <a onClick={() => setServiceRotate(!serviceRotate)} onMouseEnter={() => setServiceHovered(true)} onMouseLeave={() => setServiceHovered(false)} href="#" className="flex flex-row justify-between items-center text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">
                                        Services
                                        <img src={RightArrowHead} alt="ArrowHead" className={`${serviceHovered ? 'flex ' : 'hidden'} w-6 h-6 ${serviceRotate ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'}`}/>
                                    </a>
                                    <div className={`w-full ml-5 overflow-hidden transition-all duration-300 ease-in-out  ${serviceRotate ? 'opacity-100 translate-y-0 max-h-[1000px] pointer-events-auto' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'}`}>
                                        <div className="flex flex-col text-left rounded-md p-2">
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Generate images for ads</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Market and audience analysis</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Generate articles automatically</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Customer management</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Send bulk emails</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Writing marketing ads</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Proposing marketing strategies</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">SEO content production</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center items-center w-full">
                                    <a onClick={() => setCompanyRotate(!companyRotate)} onMouseEnter={() => setCompanyHovered(true)} onMouseLeave={() => setCompanyHovered(false)} href="#" className="flex flex-row justify-between items-center text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">
                                        Company
                                        <img src={RightArrowHead} alt="ArrowHead" className={`${companyHovered ? 'flex ' : 'hidden'} w-6 h-6 ${companyRotate ? 'transition-transform duration-300 ease-in-out rotate-90 ' : 'transition-transform duration-300 ease-in-out'}`}/>
                                    </a>
                                    <div className={`w-full ml-5 overflow-hidden transition-all duration-300 ease-in-out  ${companyRotate ? 'opacity-100 translate-y-0 max-h-[1000px] pointer-events-auto' : 'opacity-0 -translate-y-2 max-h-0 pointer-events-none'}`}>
                                        <div className="flex flex-col text-left rounded-md p-2">
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">About us</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Contact us</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Support</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Help</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Careers</a>
                                            <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Privacy & policy</a>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">For business</a>
                                <a href="#" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">News</a>
                                <a href="/Login" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Log in</a>
                                <a href="/SignUp" className="text-md p-2 w-full rounded-md hover:bg-gray-200 cursor-pointer">Sign up</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}