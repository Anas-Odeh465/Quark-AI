import Nav from "../../components/Layouts/Navigation";
import HeroSection from "../../components/Hero/Hero";
import FeatureSection from "../../components/Feature/Feature";
export default function HomePage(){
    return(
        <div>
            <Nav/>
            <HeroSection/>
            <FeatureSection/>
        </div>
    );
}