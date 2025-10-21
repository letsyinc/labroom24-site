"use client"; // <-- This line tells Next.js to render this component in the browser.

import React, { useState } from 'react';
// NOTE: Custom CSS (customStyles) has been moved to app/globals.css for Next.js best practices.
import Image from 'next/image';
import Link from 'next/link';

const LoadingSpinner = () => (
    <svg className="animate-spin-slow h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);


const LandingPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target;
        const data = new FormData(form);

        try {
            // Netlify requires POST to the current path ("/") for AJAX submissions
            const response = await fetch("/", {
                method: "POST",
                // Crucial for Netlify to parse the data correctly in an AJAX request
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                // Convert FormData to URLSearchParams for the body
                body: new URLSearchParams(data).toString(),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                // If Netlify returns a non-OK status, log error and keep form visible
                console.error("Netlify form submission failed.", response.statusText);
                // In a real app, show a friendly error message to the user
                setIsSubmitted(false); 
            }
        } catch (error) {
            // Handle network errors (e.g., user offline)
            console.error("Network error during form submission:", error);
            setIsSubmitted(false); 
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header / Navbar */}
            <header className="px-6 py-4 flex justify-between items-center border-b border-white/10 sticky top-0 bg-[#001F3F] z-10">
                <Link href="/" className="flex items-center space-x-2">
                    {/* <img src="/logo_cropped.png" alt="LABROOM24 Logo" className="h-8 logo-pulse" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x32/001F3F/11C8A9?text=LOGO"; }} /> */}
                    <Image src="/logo_cropped.png" alt="LABROOM24 Logo" height={32} width={100} className="h-8 w-auto logo-pulse" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x32/001F3F/11C8A9?text=LOGO"; }} priority />
                    {/* <img src="/text_logo_.png" alt="LABROOM24 Logo" className="h-5" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x32/001F3F/11C8A9?text=LOGO"; }} /> */}
                    <Image src="/text_logo_.png" alt="LABROOM24 Logo" height={20} width={100} className="h-5 w-auto logo-pulse" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x32/001F3F/11C8A9?text=LOGO"; }} priority />

                    {/* <span className="text-xl font-mono tracking-widest text-[#11C8A9] hidden sm:inline">LABROOM24</span> */}
                </Link>
                <Link href="#submit-form" className="text-sm font-semibold px-4 py-2 bg-[#11C8A9] text-white rounded-lg hover:bg-opacity-90 transition duration-300 button-glow">
                    Initiate Your Pilot
                </Link>
            </header>

            <main className="flex-grow">
                {/* 1. Hero Section */}
                <section className="text-center py-20 px-6 max-w-5xl mx-auto">
                    <h1 className="text-4xl sm:text-6xl font-extrabold mb-4 text-white leading-tight">
                        Stop Paying the Governance Tax. Get Your <span className="text-[#11C8A9] logo-pulse">AI Accountability Score</span>.
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                        We enforce the 24/7 accountability standard for LLM governance and outsourced code quality, delivered as a single, auditable metric.
                    </p>

                    {/* AI Accountability Score Visualization */}
                    <div className="relative inline-block mb-16">
                        {/* <img 
                            src="/section_3.png" 
                            alt="AI Accountability Score 98%" 
                            className="w-48 h-48 sm:w-64 sm:h-58 object-contain mx-auto score-shield"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/256x256/001F3F/11C8A9?text=Score"; }} 
                        /> */}
                      <Image
                          src="/section_3.png"
                          alt="AI Accountability Score 98%"
                          width={256}
                          height={256}
                          className="w-48 h-48 sm:w-64 sm:h-58 object-contain mx-auto score-shield"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/256x256/001F3F/11C8A9?text=Score"; }}
                          priority
                      />
                    </div>

                    <a href="#submit-form" className="inline-block text-xl font-black px-8 py-4 bg-[#11C8A9] text-white rounded-xl hover:bg-opacity-90 transition duration-300 shadow-xl shadow-[#11C8A9]/50 button-glow">
                        Initiate Your Pilot: Get Your Score Now
                    </a>
                </section>

                {/* 2. Visualizing Risk vs. Control */}
                <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-[#11C8A9]">
                        The Unquantified Cost of Unverified Quality.
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-4">
                            <h3 className="text-3xl font-bold text-white mb-4">Unmanaged Risk is Hidden Liability.</h3>
                            <p className="text-gray-400">
                                When external contractors or internal teams use LLMs without a verifiable standard, they create <strong>technical debt at scale</strong>. We identify and quantify this risk.
                            </p>
                            <ul className="list-disc list-inside text-gray-400 space-y-2">
                                <li><strong>Code Quality:</strong> Inconsistent, unverified, or buggy code.</li>
                                <li><strong>LLM Governance:</strong> Unsecured data prompts and unmanaged model drift.</li>
                                <li><strong>Compliance:</strong> Failure to meet regulatory standards like GDPR or SOC 2.</li>
                            </ul>
                        </div>
                        <div className="relative">
                            {/* <img 
                                src="/section_2.png" 
                                alt="Chaos vs Control Split" 
                                className="w-full h-auto rounded-xl shadow-2xl card-shadow"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/001F3F/11C8A9?text=Risk+vs+Control"; }} 
                            /> */}
                            <Image
                              src="/section_2.png"
                              alt="Chaos vs Control Split"
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-xl shadow-2xl card-shadow"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/001F3F/11C8A9?text=Risk+vs+Control"; }}
                          />
                        </div>
                    </div>
                </section>

                {/* 3. Value Proposition */}
                <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
                        How We Provide Auditable Accountability.
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-[#001A33] p-8 rounded-xl card-shadow border border-[#11C8A9]/30 button-glow">
                            <h3 className="text-2xl font-bold text-[#11C8A9] mb-3">1. Code Quality Metrics</h3>
                            <p className="text-gray-400">
                                Deploy proprietary metrics to verify outsourced code quality, complexity, maintainability, and security vulnerabilities introduced by LLMs.
                            </p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-[#001A33] p-8 rounded-xl card-shadow border border-[#11C8A9]/30 button-glow">
                            <h3 className="text-2xl font-bold text-[#11C8A9] mb-3">2. LLM Governance Assessment</h3>
                            <p className="text-gray-400">
                                Evaluate the security, privacy, and responsible use policies for all LLM interactions, ensuring compliance and data protection.
                            </p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-[#001A33] p-8 rounded-xl card-shadow border border-[#11C8A9]/30 button-glow">
                            <h3 className="text-2xl font-bold text-[#11C8A9] mb-3">3. Single Score, Full Report</h3>
                            <p className="text-gray-400">
                                Condense all findings into one clear, actionable AI Accountability Score (98%!) with a comprehensive breakdown report.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 4. Founder/Expertise Section */}
                <section className="py-20 px-6 max-w-6xl mx-auto border-t border-white/10">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
                        Statistical Rigor & Trust
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative">
                            {/* <img 
                                src="/section_4.png" 
                                alt="Founder Photo and Confusion Matrix Chart" 
                                className="w-full h-auto rounded-xl shadow-2xl card-shadow"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/001F3F/11C8A9?text=Founder+Data"; }} 
                            /> */}
                            <Image
                              src="/section_4.png"
                              alt="Founder Photo and Confusion Matrix Chart"
                              width={600}
                              height={400}
                              className="w-full h-auto rounded-xl shadow-2xl card-shadow"
                              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/001F3F/11C8A9?text=Founder+Data"; }}
                          />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-[#001A33] p-6 rounded-xl border border-[#11C8A9]/50">
                                <h3 className="text-2xl font-mono text-[#11C8A9] mb-2">M.Sc. Statistics: The Rigor.</h3>
                                <p className="text-gray-400">Our methodology is rooted in advanced statistical models, ensuring every metric is mathematically sound and auditable.</p>
                            </div>
                            <div className="bg-[#001A33] p-6 rounded-xl border border-[#11C8A9]/50">
                                <h3 className="text-2xl font-mono text-[#11C8A9] mb-2">5+ Years MLOps: The Experience.</h3>
                                <p className="text-gray-400">Decades of combined experience in Machine Learning Operations (MLOps) ensures we understand system integrity from the ground up.</p>
                            </div>
                            <a href="#submit-form" className="mt-4 inline-block text-lg font-black px-6 py-3 border border-[#11C8A9] text-[#11C8A9] rounded-xl hover:bg-[#11C8A9]/20 transition duration-300 button-glow">
                                Secure Your Score
                            </a>
                        </div>
                    </div>
                </section>

                {/* 5. Submission Form */}
                <section id="submit-form" className="py-20 px-6 max-w-2xl mx-auto border-t border-white/10">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-white">
                        Get Started with a Preliminary Score
                    </h2>

                    {isSubmitted ? (
                        <div className="text-center bg-[#001A33] p-10 rounded-xl border border-[#11C8A9] shadow-2xl card-shadow">
                            <svg className="w-16 h-16 text-[#11C8A9] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-3xl font-bold mb-3 text-white">Submission Successful!</h3>
                            <p className="text-gray-400">
                                Thank you for your interest. A specialist will reach out shortly to discuss your unique AI Accountability profile and next steps.
                            </p>
                        </div>
                    ) : (
                        <form name="preliminary_score" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-6 bg-[#001A33] p-8 rounded-xl shadow-2xl card-shadow">
                            <input type="hidden" name="form-name" value="preliminary_score" />

                            {/* Company Name */}
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                                <input type="text" name="companyName" id="companyName" onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-[#11C8A9] focus:border-[#11C8A9]" />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Work Email</label>
                                <input type="email" name="email" id="email" onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm p-3 text-white focus:ring-[#11C8A9] focus:border-[#11C8A9]" />
                            </div>

                            {/* Project Description */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">Brief Project Description (e.g., Outsourced Python APIs using GPT-4)</label>
                                <textarea name="description" id="description" rows="4" onChange={handleChange} required className="w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm p-3 text-white font-mono focus:ring-[#11C8A9] focus:border-[#11C8A9]"></textarea>
                                <p className="mt-2 text-xs text-gray-500">
                                    All submissions are confidential and deleted after 48 hours.
                                </p>
                            </div>

                            {/* Submission CTA */}
                            <button type="submit" id="submit-button" disabled={isLoading} className="w-full bg-[#11C8A9] text-white font-black text-xl py-4 rounded-xl hover:bg-opacity-90 transition duration-300 shadow-lg shadow-[#11C8A9]/50 flex items-center justify-center disabled:bg-opacity-50">
                                {isLoading ? (
                                    <>
                                        <LoadingSpinner />
                                        Calculating...
                                    </>
                                ) : (
                                    "Calculate My Preliminary Score"
                                )}
                            </button>
                        </form>
                    )}
                </section>

            </main>

            <footer className="text-center py-8 text-gray-500 border-t border-white/5 mt-10">
                &copy; 2024 LABROOM24. Authority & Accountability.
            </footer>
        </div>
    );
};

export default LandingPage;
