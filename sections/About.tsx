import SectionTwoCards from "@/components/SectionTwoCards";
import AboutCards from "@/components/AboutCards";
import AutoplayVideo from "@/components/AutoplayVideo";
import {
  AboutDeployButton,
  AboutImageRotator,
  AboutProjectsButton,
} from "@/components/AboutInteractive";
import { aboutImages, sectionTwoCardsInfo } from "@/data/about";

const About = () => {
  return (
    <div id="about" className="above-section">
      <div className="bg-[#211E1F] min-h-screen w-full flex flex-col pt-14">
        <div className="flex flex-row flex-wrap gap-3 px-4 mt-10 w-full justify-center md:justify-center">
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
            BRAND IDENTITY
          </div>
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
            WEBSITE
          </div>
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] p-2 rounded-md">
            OPTIMIZE
          </div>
        </div>

        <section className="w-full mt-10 flex flex-col px-4 items-center text-center md:items-center">
          <p className="text-[#F8F6F4] text-xl sm:text-[24px] font-sans font-bold mb-4">
            Crafting Modern Web Solutions
          </p>
          <p className="text-[#c4c2b7] text-[16px] font-sans max-w-2xl text-center md:text-center">
            I build fullstack applications that combine performance, scalability,
            and user experience. Every project is designed to solve real-world
            problems while keeping interfaces intuitive and engaging.
          </p>

          <div className="mt-10 w-[80vw] max-w-[500px] mx-auto">
            <AboutImageRotator images={aboutImages} />
            <AboutProjectsButton />
          </div>
        </section>

        <div className="flex flex-wrap gap-3 mt-8 w-full justify-start px-4 md:justify-center">
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
            FULLSTACK DEVELOPMENT
          </div>
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
            DEPLOYMENT & OPTIMIZATION
          </div>
          <div className="text-[#C4C2B7] text-[14px] font-mono border font-extrabold border-[#C4C2B7] px-2 py-2 rounded-md">
            PERFORMANCE & SCALABILITY
          </div>
        </div>

        <section className="relative w-full py-10 mb-10 mt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="absolute left-1/2 top-0 bottom-24 w-px bg-[#C4C2B7] hidden md:block" />

          <div className="flex flex-col gap-12">
            <div className="flex flex-col md:flex-row md:justify-start items-center gap-6">
              <div className="w-full md:w-1/2 md:pr-8 text-left md:text-right">
                <SectionTwoCards
                  title={sectionTwoCardsInfo[0].title}
                  description={sectionTwoCardsInfo[0].description}
                  points={sectionTwoCardsInfo[0].points}
                  link={sectionTwoCardsInfo[0].link}
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-8">
                <div className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg">
                  <AutoplayVideo
                    src={sectionTwoCardsInfo[0].link}
                    className="w-full h-[200px] sm:h-[250px] md:h-[200px] object-cover pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-end items-center gap-6">
              <div className="w-full md:w-1/2 md:pr-8 md:order-1">
                <div className="bg-[#2A2A2A] rounded-lg overflow-hidden shadow-lg">
                  <AutoplayVideo
                    src={sectionTwoCardsInfo[1].link}
                    className="w-full h-[200px] sm:h-[250px] md:h-[200px] object-cover pointer-events-none"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 md:pl-8 text-left md:order-2">
                <SectionTwoCards
                  title={sectionTwoCardsInfo[1].title}
                  description={sectionTwoCardsInfo[1].description}
                  points={sectionTwoCardsInfo[1].points}
                  link={sectionTwoCardsInfo[1].link}
                />
              </div>
            </div>
          </div>

          <AboutDeployButton />
        </section>
      </div>

      <section className="w-full min-h-screen mb-10 sm:px-6 lg:px-8 max-w-6xl mx-auto bg-[#D9D7CB] rounded-lg py-10">
        <div className="mt-15 flex flex-col items-start md:items-center gap-10 px-3 md:px-0">
          <p className="text-4xl font-sans font-semibold text-left md:text-center">
            Looks Good. Works Better
          </p>
          <p className="text-2xl font-sans font-semibold text-left md:text-center">
            I focus on building products that balance design and functionality —
            clean interfaces backed by solid engineering.
          </p>
          <AboutCards />
        </div>
      </section>
    </div>
  );
};

export default About;
