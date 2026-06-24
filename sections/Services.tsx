import Link from "next/link";
import ServicesAnimationInit from "@/components/ServicesAnimationInit";
import { servicesData } from "@/data/services";

const Services = () => {
  return (
    <div id="services" className="above-section relative z-20">
      <ServicesAnimationInit />

      <div className="bg-[#211E1F] min-h-screen w-full flex flex-col pt-14 px-4 md:px-8 lg:px-12">
        <div className="mt-10 relative mb-16 services-header">
          <h1 className="text-[#F8F6F4] text-5xl md:text-6xl lg:text-7xl font-bold text-left md:text-center font-sans">
            Services
          </h1>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          {servicesData.map((service, index) => (
            <div key={service.title} className="mb-12 md:mb-16 service-item">
              <div className="md:hidden">
                <div className="text-[#D9D7AF] mb-4">{service.icon}</div>
                <h2 className="text-[#F8F6F4] text-2xl font-bold font-sans mb-3">
                  {service.title}
                </h2>
                <p className="text-[#C4C2B7] text-base font-sans leading-relaxed mb-4">
                  {service.description}
                </p>
                <p className="text-[#C4C2B7] text-sm font-sans leading-relaxed mb-6">
                  <span className="font-semibold text-[#D9D7AF]">
                    {service.highlightLabel}
                  </span>{" "}
                  <span className="text-[#F8F6F4]">{service.highlight}</span>
                </p>
                {index < servicesData.length - 1 && (
                  <div className="h-px bg-[#D9D7AF] mx-2 service-line" />
                )}
              </div>

              <div className="hidden md:block relative">
                {index % 2 === 0 ? (
                  <div className="grid grid-cols-2 gap-12 items-start">
                    <div className="relative">
                      <div className="h-px bg-[#D9D7AF] mb-6 mr-[-3rem] service-line" />
                      <div className="text-[#D9D7AF] mb-4">{service.icon}</div>
                      <h2 className="text-[#F8F6F4] text-2xl lg:text-3xl font-bold font-sans mb-4">
                        {service.title}
                      </h2>
                      <p className="text-[#C4C2B7] text-base lg:text-lg font-sans leading-relaxed mb-4">
                        {service.description}
                      </p>
                      <p className="text-[#C4C2B7] text-sm lg:text-base font-sans leading-relaxed">
                        <span className="font-semibold text-[#D9D7AF]">
                          {service.highlightLabel}
                        </span>{" "}
                        <span className="text-[#F8F6F4]">{service.highlight}</span>
                      </p>
                    </div>
                    <div />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-12 items-start">
                    <div />
                    <div className="relative">
                      <div className="h-px bg-[#D9D7AF] mb-6 ml-[-3rem] service-line" />
                      <div className="text-[#D9D7AF] mb-4 flex justify-end">
                        {service.icon}
                      </div>
                      <h2 className="text-[#F8F6F4] text-2xl lg:text-3xl font-bold font-sans mb-4 text-right">
                        {service.title}
                      </h2>
                      <p className="text-[#C4C2B7] text-base lg:text-lg font-sans leading-relaxed text-right mb-4">
                        {service.description}
                      </p>
                      <p className="text-[#C4C2B7] text-sm lg:text-base font-sans leading-relaxed text-right">
                        <span className="font-semibold text-[#D9D7AF]">
                          {service.highlightLabel}
                        </span>{" "}
                        <span className="text-[#F8F6F4]">{service.highlight}</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-12 text-center services-quote">
          <p className="text-[#F8F6F4] text-lg md:text-xl font-sans mb-8 max-w-2xl mx-auto">
            &quot;I help brands and teams turn ideas into scalable digital products
            — blending strategy, creativity, and technology.&quot;
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-[#D9D7CB] flex flex-col items-start md:items-center justify-start md:justify-center px-4 sm:px-6 md:px-0 py-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#211E1F] font-sans cta-header">
          Let&apos;s Get Started
        </h2>

        <div className="max-w-2xl text-[#3a3738] text-left space-y-6">
          <div className="font-sans text-[#C4C2B7] bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
            <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
              1. Quick Call
            </h4>
            <p>
              A short introductory call to understand your goals and determine if
              we&apos;re the right fit.
            </p>
          </div>

          <div className="font-sans text-[#C4C2B7] text-lg bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
            <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
              2. Assessment
            </h4>
            <p>
              A transparent evaluation of your needs, outlining where we can
              deliver the most impact.
            </p>
          </div>

          <div className="font-sans text-[#C4C2B7] text-lg bg-[#3a3738] p-4 rounded-3xl shadow cta-step">
            <h4 className="text-xl font-semibold text-[#D9D7CB] mb-15">
              3. Proposal
            </h4>
            <p>
              If aligned, you&apos;ll receive a tailored proposal — with a clear
              scope, timeline, and fixed investment.
            </p>
          </div>
        </div>

        <div className="mt-10 w-full flex md:justify-center pb-8 md:pb-0">
          <div className="w-full max-w-2xl">
            <Link
              href="/contact"
              className="block bg-[#211E1F] text-[#D9D7CB] px-6 py-3 font-sans rounded-md text-lg font-semibold w-full text-center cta-button"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
