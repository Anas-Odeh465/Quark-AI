import { useState } from "react";
import { XCircleIcon } from "lucide-react";
import ValidateInputFrontLogin from "./Validate_Front_input";
import GoogleIcon from "../../assets/google.png";
import GitHub from "../../assets/github.png";
import GitHub_white from "../../assets/github-white.png";

export default function Login() {
    const [changeIcon, setChangeIcon] = useState(false);
    const [error, setError] = useState();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleDataChange = (e) => {
        setData(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const handleLogin = (e) => {
        e.preventDefault();
        const errors = ValidateInputFrontLogin(data);
        setError(errors);

        if(!errors) {
            // Call the login function here
            alert("Login successful", data.email);
            // Redirect to home page or perform any other action
        }
    }

    // don't forget render .com 
    return (
        <div className="min-h-screen  bg-white">
            <h1 className="Header-items-font cursor-pointer font-bold xl:text-2xl lg:text-3xl md:text-4xl sm:text-4xl text-3xl text-gray-900 lg:p-4 p-4 select-none">
                <a href="/">QuarkAI</a>
            </h1>
            <div className="h-full w-full mx-auto flex justify-center items-center lg:mt-0 mt-10 lg:mb-20">
                <div className="flex flex-col justify-center items-center lg:w-[600px] w-full h-auto  bg-white space-y-4 p-2 lg:px-0 px-4">
                    <div className="w-full text-left mb-5">
                       <h1 className="lg:text-2xl text-lg">Login to QuarkAI</h1>
                    </div>
                    <div className="flex flex-row justify-center items-center space-x-4 gap-2 w-full">
                        <button onMouseEnter={() => setChangeIcon(true)} onMouseLeave={() => setChangeIcon(false)} className="flex flex-row justify-center items-center gap-2 transition-all duration-150 ease-linear cursor-pointer hover:bg-black hover:text-white border border-gray-200 h-10 w-full px-4 p-2">
                            {changeIcon ? <img src={GitHub_white} alt="GitHub" className="h-4 w-4 ml-2"/> : <img src={GitHub} alt="GitHub" className="h-4 w-4 ml-2"/>} GitHub
                        </button>
                        <button className="flex flex-row justify-center items-center gap-2 transition-all duration-150 ease-linear cursor-pointer hover:bg-black hover:text-white border border-gray-200 h-10 w-full px-4 p-2">
                            <img src={GoogleIcon} alt="Google" className="h-4 w-4 ml-2"/> Google
                        </button>
                    </div>
                    <span>or</span>
                    <div className="flex flex-col space-y-2 text-left w-full">
                        <label htmlFor="emailInput">Email</label>
                        <input maxLength={200} onChange={handleDataChange} name="email" id="emailInput" type="email" placeholder="your@gmail.com" className="h-10 border border-gray-200 w-full focus:outline-blue-500 p-2 pl-2"/>
                        {error && error.email && <span className="flex flex-row  items-center gap-2 text-sm text-red-500 py-2"><XCircleIcon className="w-3 h-3"/>{error.email}</span>}
                    </div>
                    <div className="flex flex-col space-y-2 text-left w-full">
                        <label htmlFor="passwordInput">Password</label>
                        <input maxLength={32} onChange={handleDataChange} name="password" id="passwordInput" type="email" placeholder="Your password" className="h-10 border border-gray-200 w-full focus:outline-blue-500 p-2 pl-2"/>
                        {error && error.password && <span className="flex flex-row  items-center gap-2 text-sm text-red-500 py-2"><XCircleIcon className="w-3 h-3"/>{error.password}</span>}
                    </div>
                    <div className="flex flex-col space-y-8 text-left w-full">
                        <button onClick={handleLogin} className="transition-all duration-150 ease-linear hover:border cursor-pointer bg-black hover:bg-white text-white hover:text-black w-20 h-10 ">Login</button>
                        <div className="flex flex-col space-y-2 text-left w-full">
                            <div className="flex flex-row gap-2 text-sm">
                                <span className="text-gray-500 hover:underline">New account?</span>
                                <a href="/SignUp" className="text-blue-500 hover:underline">Sign up</a>
                            </div> 
                            <div className="flex flex-row gap-2 text-sm">
                                <span className="text-gray-500">Forgot your password?</span>
                                <a href="#" className="text-blue-500 hover:underline">Reset it</a>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}