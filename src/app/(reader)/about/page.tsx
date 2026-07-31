import AboutClosing from "@/components/reader/about/AboutClosing";
import AboutHero from "@/components/reader/about/AboutHero";
import AboutMe from "@/components/reader/about/AboutMe";
import AboutPageLayout from "@/components/reader/about/AboutLayout";
import AboutPhilosophy from "@/components/reader/about/AboutPhilosophy";

export default function AboutPage() {
    return (
        <AboutPageLayout>
            <AboutHero />
            <AboutMe />
            <AboutPhilosophy />
            <AboutClosing />
        </AboutPageLayout>
    );
}