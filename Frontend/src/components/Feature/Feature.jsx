import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import p1 from "../../assets/p1.jpg";
import p2 from "../../assets/p2.jpg";
import p3 from "../../assets/p3.jpg";
import p4 from "../../assets/p4.png";
import p5 from "../../assets/p5.png";

export default function FeatureSection() {

    useEffect(() => {
        AOS.init({ once: true, duration: 1000 });
    }, []);

    return(
        <div  className="min-h-full w-full lg:-mt-12">
            <div className="flex flex-col items-center justify-center space-y-8 p-2">
                {/* section 1 */}
                <div data-aos="fade-up" className="flex lg:flex-row flex-col  justify-center items-center lg:space-x-16">
                    <div className="flex flex-col space-y-4 justify-center items-center text-left w-full">
                       <h1 className="lg:ml-0 ml-10 text-4xl">AI-Powered Copywriting</h1>
                       <p className="ml-10 lg:ml-20 mt-10 text-lg">Writing engaging posts for social media <br/>
                          Professionally crafted Google/Facebook ads <br/>
                          Catchy headlines and impactful call-to-action phrases <br/>
                       </p>
                    </div>
                    <img src={p1} alt="Some one writing in computer" className="lg:w-[500px] w-[300px] lg:h-[500px] h-[300px]"/>
                </div>

                {/* section 2 */}
                <div data-aos="fade-up" className="flex lg:flex-row flex-col-reverse  justify-center items-center lg:space-x-16">
                    <img src={p2} alt="Some one writing in computer" className="lg:w-[500px] w-[300px] lg:mt-0 mt-15 lg:h-[400px] h-[300px]"/>
                    <div className="flex flex-col space-y-4 justify-center items-center text-left w-full">
                       <h1 className="lg:ml-0 ml-10 text-4xl">Market & Adink Analysis</h1>
                       <p className="ml-10 lg:ml-20 mt-10 text-lg  ">
                          Understand your audience and outshine your competitors<br/> during the afternoon with detailed AI reports.<br/>
                          Competitor analysis, Building the Perfect Buyer Persona<br/>
                          Propose content strategies according to the market<br/>
                       </p>
                    </div>
                </div>

                {/* section 3 */}
                <div data-aos="fade-up" className="flex lg:flex-row flex-col  justify-center items-center lg:space-x-16">
                    <div className="flex flex-col space-y-4 justify-center items-center text-left w-full">
                       <h1 className="lg:-ml-20 ml-10 text-4xl">Smart Email Campaigns</h1>
                       <p className="ml-10 lg:ml-30 mt-10 text-lg">AI-powered interactive email campaigns: reach, read, and convert.<br/>
                          Generating engaging emails, Improve open and click-through rates <br/>
                          Suggest optimal sending times<br/>
                       </p>
                    </div>
                    <img src={p3} alt="Some one writing in computer" className="lg:w-[500px] w-[300px] lg:h-[500px] h-[300px]"/>
                </div>

                 {/* section 4 */}
                 <div data-aos="fade-up" className="flex lg:flex-row flex-col-reverse  justify-center items-center lg:space-x-16">
                    <img src={p4} alt="Some one writing in computer" className="lg:w-[500px] w-[300px] lg:mt-0 mt-15 lg:h-[400px] h-[300px]"/>
                    <div className="flex flex-col space-y-4 justify-center items-center text-left w-full">
                       <h1 className="lg:-ml-10 ml-10 text-4xl">SEO Content Generation</h1>
                       <p className="ml-10 lg:ml-20 mt-10 text-lg  ">
                          Long-form content optimized for search engines that <br/>will get you higher <br/>
                          in Google results or any browser, Automatic keyword analysis<br/>
                          Optimize text for SEO standards<br/> blog articles or landing pages
                       </p>
                    </div>
                </div>

                {/* section 5 */}
                <div data-aos="fade-up" className="flex lg:flex-row flex-col mt-10 justify-center items-center lg:space-x-16">
                    <div className="flex flex-col space-y-4 justify-center items-center text-left w-full">
                       <h1 className="lg:-mr-10 ml-10 text-4xl">AI-Powered Content Repurposing</h1>
                       <p className="ml-10 lg:ml-30 mt-10 text-lg">Turn an article into 10 posts + videos + emails, all with AI.<br/>
                          Reuse existing content in different formats, Save time and effort <br/>
                          Increase visibility across all platforms<br/>
                          Suggest optimal sending times<br/>
                       </p>
                    </div>
                    <img src={p5} alt="Some one writing in computer" className="lg:mt-0 mt-15 lg:w-[400px] w-[300px] lg:h-[400px] h-[300px]"/>
                </div>

            </div>
        </div>
    );
}