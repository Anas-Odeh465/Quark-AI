import {AlertTriangleIcon} from "lucide-react";
import { useEffect, useRef } from "react";
import Typed from "typed.js";

export function NormalType({ mode, message }) {
  const typeReferror = useRef(null);

  useEffect(() => {
    const typed = new Typed(typeReferror.current, {
      strings: [message],
      typeSpeed: 20,
      backSpeed: 0,
      showCursor: true,
      cursorChar: "/",
      loop: false,
      onComplete: () => {
        typed.cursor.remove();     
      },
    });

    return () => typed.destroy();
  }, [message, mode]);

  return (
    <div
      className={`
        flex w-fit items-center px-4 py-2 rounded-xl text-sm lg:text-base
        ${mode 
          ? "bg-red-500/10 text-red-400 border border-red-500/20" 
          : "bg-red-800/10 text-red-400 border border-red-500/20"}
      `}
    >
      <AlertTriangleIcon className="w-4 h-4 mr-2" />
      <span ref={typeReferror}></span>
    </div>
  );
}