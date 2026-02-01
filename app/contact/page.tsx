"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaGithub, FaUpload, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Footer from "@/sections/Footer";
import { ClientFormAnimations } from "@/lib/gsapAnimations";

const ClientInquiry = () => {
  const topBarRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formFieldsRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    projectType: "",
    budget: "",
    timeline: "",
    projectDescription: "",
    additionalInfo: "",
    attachments: [] as File[],
  });

  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const animations = new ClientFormAnimations({
      topBarRef,
      heroTitleRef,
      heroSubtitleRef,
      socialLinksRef,
      formRef,
      formFieldsRef,
      submitButtonRef,
    });

    const cleanup = animations.initAllAnimations();

    return cleanup;
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (files: FileList) => {
    const validFiles = Array.from(files).filter(
      (file) => file.size <= 10 * 1024 * 1024,
    );
    if (validFiles.length > 0) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...validFiles],
      }));
    } else {
      alert("File size must be less than 10MB");
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Animate button before submission
    const animations = new ClientFormAnimations({
      topBarRef,
      heroTitleRef,
      heroSubtitleRef,
      socialLinksRef,
      formRef,
      formFieldsRef,
      submitButtonRef,
    });

    await animations.animateFormSubmission();

    // Here you would typically send the data to your backend
    console.log("Client inquiry submitted:", formData);

    // Simulate API call
    setTimeout(() => {
      alert(
        "Thank you for your inquiry! I&apos;ll get back to you within 24 hours.",
      );
      setIsSubmitting(false);
      // Reset form if needed
    }, 1000);
  };

  const socialLinks = [
    { icon: MdEmail, href: "mailto:minhajarshad111@gmail.com", label: "Email" },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/minhaj-arshad-8aa522372/",
      label: "LinkedIn",
    },
    { icon: FaGithub, href: "https://github.com/minhajjj", label: "GitHub" },
  ];

  return (
    <>
      <section className="bg-[#211E1F] text-[#C4C2B7] font-sans min-h-screen overflow-hidden">
        {/* Top Bar */}
        <div
          ref={topBarRef}
          className="w-full flex justify-between px-6 py-4 text-sm tracking-wider border-b border-[#C4C2B7]/10"
        >
          <p className="hover:text-white transition-colors cursor-pointer">
            MINHAJ
          </p>
          <p className="hover:text-white transition-colors cursor-pointer">
            CREATIVE STUDIO
          </p>
        </div>

        {/* Hero Section */}
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4 perspective-1000">
          <h1
            ref={heroTitleRef}
            className="text-[50px] sm:text-[70px] md:text-[100px] font-bold text-[#C2C1BA] leading-tight cursor-default hover:text-white transition-colors duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            Let&apos;s Work Together
          </h1>
          <div ref={heroSubtitleRef} className="mt-6 max-w-3xl space-y-4">
            <p className="text-lg sm:text-xl text-[#C4C2B7] font-medium">
              Ready to bring your vision to life?
            </p>
            <p className="text-base text-[#C4C2B7] leading-relaxed">
              I&apos;m passionate about creating impactful digital experiences
              that drive results. Whether you need web development, design, or a
              complete digital transformation, let&apos;s discuss how we can
              make your project extraordinary.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div
          ref={socialLinksRef}
          className="mt-12 flex justify-center space-x-6"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto:") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="p-3 rounded-full border border-[#C4C2B7]/20 text-[#C4C2B7] hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300 hover:scale-110"
              style={{ transformOrigin: "center" }}
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Client Inquiry Form */}
        <div className="mt-20 max-w-4xl mx-auto px-6 pb-20">
          <div
            ref={formRef}
            className="bg-linear-to-br from-[#C4C2B7]/5 to-[#C4C2B7]/10 backdrop-blur-sm rounded-3xl p-8 border border-[#C4C2B7]/20 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h2 className="text-2xl font-bold text-[#C2C1BA] mb-2 text-center">
              Tell me about your project
            </h2>
            <p className="text-center text-[#C4C2B7] mb-8">
              I&apos;ll get back to you within 24 hours with a personalized
              proposal
            </p>

            <form onSubmit={handleSubmit}>
              <div ref={formFieldsRef} className="space-y-8">
                {/* Company & Contact Info */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Company/Organization Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                      placeholder="Your company name"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                      placeholder="your.email@company.com"
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                    Website/Company URL
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                    placeholder="https://yourcompany.com"
                  />
                </div>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Project Type *
                    </label>
                    <select
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                    >
                      <option value="">Select project type</option>
                      <option value="website-design">Website Design</option>
                      <option value="web-development">Web Development</option>
                      <option value="e-commerce">E-commerce Solution</option>
                      <option value="mobile-app">Mobile App</option>
                      <option value="brand-identity">Brand Identity</option>
                      <option value="ui-ux-design">UI/UX Design</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                      Budget Range *
                    </label>
                    <select
                      name="budget"
                      required
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5k">Under $5,000</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-plus">$50,000+</option>
                      <option value="discuss">Let&apos;s discuss</option>
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                    Timeline *
                  </label>
                  <select
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP (Rush job)</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="2-3-months">2-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-plus-months">6+ months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="projectDescription"
                    required
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your project goals, target audience, key features needed, and any specific requirements or challenges..."
                  />
                </div>

                <div className="form-field">
                  <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-[#211E1F] border border-[#C4C2B7]/30 rounded-xl text-[#C4C2B7] placeholder-[#C4C2B7]/50 focus:border-[#C4C2B7] focus:outline-none focus:ring-2 focus:ring-[#C4C2B7]/20 transition-all duration-300 resize-none"
                    placeholder="Any inspiration, competitors to reference, or special considerations?"
                  />
                </div>

                {/* File Upload */}
                <div className="form-field">
                  <label className="block text-sm font-medium text-[#C2C1BA] mb-2">
                    Project Files (Optional)
                  </label>
                  <div
                    data-upload-area
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive
                        ? "border-[#C4C2B7] bg-[#C4C2B7]/5"
                        : "border-[#C4C2B7]/30 hover:border-[#C4C2B7]/60"
                    }`}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) =>
                        e.target.files && handleFileUpload(e.target.files)
                      }
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.psd,.ai,.fig"
                    />
                    <FaUpload
                      className="mx-auto mb-4 text-[#C4C2B7]"
                      size={32}
                    />
                    <p className="text-[#C4C2B7] mb-2">
                      Upload wireframes, designs, or reference materials
                    </p>
                    <p className="text-sm text-[#C4C2B7]/70">
                      Drag files here or click to browse • Max 10MB per file
                    </p>
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center space-x-2 text-sm text-[#C2C1BA] bg-[#211E1F] rounded-lg px-3 py-2"
                          >
                            <span className="truncate">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-red-400 hover:text-red-300 shrink-0"
                            >
                              <FaTimes size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-block bg-linear-to-r from-[#C4C2B7] to-[#B0AEA5] text-[#211E1F] font-bold text-lg px-12 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ transformOrigin: "center" }}
                  >
                    {isSubmitting ? "Sending..." : "Send Project Inquiry"}
                  </button>
                  <p className="mt-4 text-sm text-[#C4C2B7]/70">
                    I&apos;ll review your project and get back to you within 24
                    hours
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ClientInquiry;
