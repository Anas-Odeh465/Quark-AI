
export default function Verify() {
    return (
        <div className="min-h-screen  bg-white">
            <h1 className="Header-items-font cursor-pointer font-bold xl:text-2xl lg:text-3xl md:text-4xl sm:text-4xl text-3xl text-gray-900 lg:p-4 p-4 select-none">
                <a href="/">QuarkAI</a>
            </h1>
            <div className="h-full w-full mx-auto flex justify-center items-center lg:mt-0 mt-10 lg:mb-20">
                <div className="flex flex-col justify-center items-center lg:w-[600px] w-full h-auto mt-15 bg-white space-y-4 p-2 lg:px-0 px-4">
                    <div className="w-full text-left mb-5">
                       <h1 className="lg:text-2xl text-xl">Almost there!</h1>
                    </div>
                    <div className="flex flex-col space-y-4 text-left w-full">
                       <div className="flex flex-col  text-left w-full space-y-2">
                            <p>We’ve sent you an email at </p>
                            <p>Please follow the instructions in the email.</p>
                       </div>
                        <button className="transition-all duration-150 ease-linear hover:border cursor-pointer bg-black hover:bg-white text-white hover:text-black w-55 h-12 ">
                            Resend Verification Email
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}