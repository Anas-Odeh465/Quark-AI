import { useState, useEffect, useRef } from "react";
import Typed from "typed.js";

export default function HeroSection(){
    const typeRef = useRef(null);

    useEffect(() => {
        const typed = new Typed(typeRef.current, {
          strings: [
            "Hello there!", 
            "You are in the right place.", 
            "Speed ​​up your production creativity, Market anywhere, anytime.",
            "Start your journey with us."
        ],
          typeSpeed: 50,
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

    return(
        <div className="h-screen w-full flex flex-col items-center justify-center lg:mt-40 mt-26 p-10">
            <div className="flex flex-row items-center justify-center ">
                <span ref={typeRef} className="lg:text-center text-left h-15 text-5xl pr-2 font-semibold whitespace-pre-line"></span>
            </div>
            <div className="flex lg:flex-row flex-col justif-center items-center p-2 lg:space-x-8 lg:space-y-0 space-y-8 lg:mt-46 mt-68">
                <a href="/QuarkAI" className="border-1 border-gray-200 shadow-md rounded-full px-8 p-2 hover:bg-gray-200 cursor-pointer">Get started for FREE</a>
                <a className=" text-white shadow-md bg-black rounded-full px-8 p-2 hover:bg-gray-950 cursor-pointer">Start with plan</a>
            </div>
        </div>
    );
}