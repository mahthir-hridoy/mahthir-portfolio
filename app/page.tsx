"use client";
import { useState, useRef } from "react";

function ProjectCarousel() {
  const projects = [
    {
      number: "01",
      category: "REGRESSION",
      title: "House Price Prediction",
      description:
        "An ML project concept focused on predicting property prices using regression algorithms and real-world housing data.",
      tags: ["Python", "Pandas", "Scikit-learn"],
    },
    {
      number: "02",
      category: "COMPUTER VISION",
      title: "Image Classification",
      description:
        "A deep learning project concept using convolutional neural networks to identify and classify images.",
      tags: ["Python", "TensorFlow", "CNN"],
    },
    {
      number: "03",
      category: "CLASSIFICATION",
      title: "Customer Churn Prediction",
      description:
        "An intelligent prediction system concept designed to identify customers who may discontinue a service.",
      tags: ["Python", "Pandas", "XGBoost"],
    },
  ];

  const [position, setPosition] = useState(0);
  const touchStart = useRef(0);

  const activeIndex =
    ((position % projects.length) + projects.length) %
    projects.length;

  function moveProject(direction: number) {
    setPosition((current) => current + direction);
  }

  function handlePointerDown(e: React.PointerEvent) {
  touchStart.current = e.clientX;
}

function handlePointerUp(e: React.PointerEvent) {
  const difference = touchStart.current - e.clientX;

  if (Math.abs(difference) < 40) return;

  if (difference > 0) {
    moveProject(1);
  } else {
    moveProject(-1);
  }
}

  return (
    <div className="relative mt-12 overflow-hidden md:hidden">
      <div
        className="relative h-[680px] touch-pan-y select-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}

      >
        {[-2, -1, 0, 1, 2].map((offset) => {
          const absolutePosition = position + offset;

          const index =
            ((absolutePosition % projects.length) +
              projects.length) %
            projects.length;

          const project = projects[index];
          const isActive = offset === 0;
          const isSide = Math.abs(offset) === 1;

          return (
            <div
              key={absolutePosition}
              onClick={() => {
                if (isSide) moveProject(offset);
              }}
              className="absolute left-1/2 top-2 w-[78%] rounded-2xl border border-white/15 bg-[#101010] p-6 transition-[transform,filter,opacity] duration-500 ease-in-out will-change-transform"
              style={{
                transform: `perspective(1000px) translateX(calc(-50% + ${offset * 88}%)) rotateY(${offset * -12}deg) scale(${isActive ? 1 : isSide ? 0.82 : 0.65})`,
                filter: isActive ? "blur(0px)" : "blur(3px)",
                opacity: isActive ? 1 : isSide ? 0.45 : 0,
                zIndex: 10 - Math.abs(offset),
                pointerEvents: Math.abs(offset) > 1 ? "none" : "auto",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-gray-500">
                  PROJECT {project.number}
                </span>

                <span className="text-xs text-gray-600">
                  {project.category}
                </span>
              </div>

              <div className="my-10 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/60 to-black">
                <span className="text-5xl font-light text-gray-300">
                  {project.number}
                </span>
              </div>

              <h3 className="text-xl font-medium text-white">
                {project.title}
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mt-8 border-t border-white/10 pt-5 text-[10px] tracking-widest text-gray-500">
                PROJECT IDEA — NOT YET IMPLEMENTED
              </p>
            </div>
          );
        })}
      </div>

      {/* Carousel Controls */}
      <div className="mt-3 hidden items-center justify-center gap-8">
        <button
          onClick={() => moveProject(-1)}
          className="rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white hover:text-black"
          aria-label="Previous project"
        >
          ←
        </button>

        <span className="text-xs tracking-widest text-gray-400">
          0{activeIndex + 1} / 0{projects.length}
        </span>

        <button
          onClick={() => moveProject(1)}
          className="rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white hover:text-black"
          aria-label="Next project"
        >
          →
        </button>
      </div>
    </div>
  );
}


export default function Home() {
  return (
    <main className="min-h-screen bg-[#090A0C] text-white">

      {/* Navigation Bar */}     
      <nav className="w-full border-b border-white/10">
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8 sm:py-6">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide">
            NoOne<span className="text-gray-400">.</span>
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm text-gray-400 transition hover:text-white">Home</a>
            <a href="#about" className="text-sm text-gray-400 transition hover:text-white">About</a>
            <a href="#skills" className="text-sm text-gray-400 transition hover:text-white">Skills</a>
            <a href="#projects" className="text-sm text-gray-400 transition hover:text-white">Projects</a>
            <a href="#contact" className="text-sm text-gray-400 transition hover:text-white">Contact</a>
          </div>

          {/* Desktop Contact Button */}
          <a
            href="#contact"
            className="hidden rounded-full border border-gray-500 px-5 py-2 text-sm transition hover:bg-white hover:text-black md:block"
          >
            Let's Connect ↗
          </a>

          {/* Mobile Hamburger Menu */}
          <details className="group relative md:hidden">
            <summary
              aria-label="Toggle navigation menu"
              className="flex cursor-pointer list-none flex-col gap-1.5 rounded-lg border border-white/20 p-3 [&::-webkit-details-marker]:hidden"
            >
              <span className="h-0.5 w-6 rounded bg-white"></span>
              <span className="h-0.5 w-6 rounded bg-white"></span>
              <span className="h-0.5 w-6 rounded bg-white"></span>
            </summary>

            {/* Mobile Menu Links */}
            <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-white/10 bg-[#0a0a0a] p-4 shadow-xl">

              <a href="#home" className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white">Home</a>

              <a href="#about" className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white">About</a>

              <a href="#skills" className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white">Skills</a>

              <a href="#projects" className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white">Projects</a>

              <a href="#contact" className="block rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-white/10 hover:text-white">Contact</a>

              <a href="#contact" className="mt-3 block rounded-full border border-gray-500 px-4 py-3 text-center text-sm text-white transition hover:bg-white hover:text-black">
                Let's Connect ↗
              </a>

            </div>
          </details>

        </div>
      </nav>

    
      {/* HERO SECTION */}
      <section
        id="home"
        className="relative flex min-h-[calc(100vh-80px)] items-center overflow-hidden px-6 py-20 md:px-12"
      >

        {/* Background Glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-500/10 blur-[120px]"
        />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl">

          {/* Professional Label */}
          <p className="mb-8 flex items-center gap-3 text-xs tracking-[0.35em] text-gray-400">
            <span className="h-px w-10 bg-gray-500"></span>
            AI / MACHINE LEARNING ENGINEER
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">

            Hello, I'm

            <br />

            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
              NoOne.
            </span>

          </h1>

          {/* Introduction */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 md:text-lg">
            An aspiring Machine Learning Engineer passionate about
            Artificial Intelligence, Deep Learning, and building
            intelligent systems that solve real-world problems.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">

            <a
              href="#projects"
              className="group flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:bg-gray-300"
            >
              Explore Projects

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </a>

            <a
              href="#about"
              className="rounded-full border border-white/20 px-7 py-4 text-sm text-gray-300 transition duration-300 hover:border-white hover:text-white"
            >
              Discover My Story
            </a>

          </div>

          {/* Technical Highlights */}
          <div className="mt-20 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8">

            <div>
              <h3 className="text-3xl font-light text-white">AI</h3>
              <p className="mt-2 text-[10px] tracking-widest text-gray-500">
                ARTIFICIAL INTELLIGENCE
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-light text-white">ML</h3>
              <p className="mt-2 text-[10px] tracking-widest text-gray-500">
                MACHINE LEARNING
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-light text-white">DL</h3>
              <p className="mt-2 text-[10px] tracking-widest text-gray-500">
                DEEP LEARNING
              </p>
            </div>

          </div>

        </div>

      </section>

    
      {/* ABOUT SECTION */}
      <section
        id="about"
        className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Label */}
          <p className="mb-8 text-xs tracking-[0.3em] text-gray-500">
            01 / ABOUT ME
          </p>

          {/* Main Heading */}
          <h2 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight sm:text-5xl md:text-7xl">

            Curiosity drives.

            <br />

            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
              Intelligence inspires.
            </span>

          </h2>

          {/* Two Column Layout */}
          <div className="mt-16 grid gap-12 md:grid-cols-2">

            {/* Left Column */}
            <div>

              <p className="mb-6 text-lg leading-9 text-gray-400">
                I am NoOne, an aspiring Machine Learning Engineer
                passionate about Artificial Intelligence, Data Science,
                and intelligent computing systems.
              </p>

              <p className="text-base leading-8 text-gray-500">
                My journey focuses on understanding how machines learn,
                discovering patterns in data, and developing practical
                solutions to meaningful real-world problems.
              </p>

            </div>

            {/* Right Column */}
            <div className="border-l border-white/20 pl-8">

              <p className="mb-6 text-xs tracking-[0.3em] text-gray-500">
                MY PHILOSOPHY
              </p>

              <h3 className="text-2xl font-light leading-relaxed text-gray-200 md:text-3xl">
                "The future belongs to those who understand
                intelligence and know how to build it."
              </h3>

              <div className="mt-8 h-px w-20 bg-gray-500"></div>

              <p className="mt-5 text-xs tracking-widest text-gray-500">
                — NoOne
              </p>

            </div>

          </div>

        </div>

      </section>

      
      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Heading */}
          <p className="mb-8 text-xs tracking-[0.3em] text-gray-500">
            02 / TECHNICAL ARSENAL
          </p>

          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-7xl">
            Tools of my{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
              craft.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-gray-400">
            Technologies and tools I use to explore artificial
            intelligence, develop machine learning models,
            and transform data into meaningful insights.
          </p>

          {/* Skills Grid */}
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <h3 className="mb-6 text-xl font-medium">
                Programming
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C++</span>
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">JavaScript</span>
              </div>

            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <h3 className="mb-6 text-xl font-medium">
                Machine Learning
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">XGBoost</span>
                <span className="skill-tag">Regression</span>
                <span className="skill-tag">Classification</span>
              </div>

            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <h3 className="mb-6 text-xl font-medium">
                Deep Learning
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">PyTorch</span>
                <span className="skill-tag">CNN</span>
                <span className="skill-tag">Neural Networks</span>
              </div>

            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <h3 className="mb-6 text-xl font-medium">
                Data Science
              </h3>

              <div className="flex flex-wrap gap-2">
                <span className="skill-tag">NumPy</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">Matplotlib</span>
                <span className="skill-tag">Data Analysis</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      
      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Label */}
          <p className="mb-8 text-xs tracking-[0.3em] text-gray-500">
            03 / SELECTED WORK
          </p>

          {/* Heading */}
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>
              <h2 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-7xl">
                Projects that

                <br />

                <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
                  define my vision.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-500">
              A collection of project concepts exploring
              machine learning, deep learning, and intelligent systems.
            </p>

          </div>

          {/* Project Cards */}
          {/* Mobile Carousel */}
          <ProjectCarousel />

          {/* Desktop Project Grid */}
          <div className="mt-12 hidden items-stretch gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">

            {/* Project 1 */}
            <div className="group flex min-h-[520px] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-gray-500">
                  PROJECT 01
                </span>

                <span className="text-xs text-gray-600">
                  REGRESSION
                </span>
              </div>

              <div className="my-12 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/60 to-black">

                <span className="text-5xl font-light text-gray-300">
                  01
                </span>

              </div>

              <h3 className="text-2xl font-medium">
                House Price Prediction
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                An ML project concept focused on predicting
                property prices using regression algorithms
                and real-world housing data.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="skill-tag">Python</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">Scikit-learn</span>

              </div>

              <p className="mt-auto border-t border-white/10 pt-5 text-xs tracking-widest text-gray-500">
                PROJECT IDEA — NOT YET IMPLEMENTED
              </p>

            </div>

            {/* Project 2 */}
            <div className="group flex min-h-[520px] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-gray-500">
                  PROJECT 02
                </span>

                <span className="text-xs text-gray-600">
                  COMPUTER VISION
                </span>
              </div>

              <div className="my-12 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/60 to-black">

                <span className="text-5xl font-light text-gray-300">
                  02
                </span>

              </div>

              <h3 className="text-2xl font-medium">
                Image Classification
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                A deep learning project concept using
                convolutional neural networks to identify
                and classify images.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="skill-tag">Python</span>
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">CNN</span>

              </div>

              <p className="mt-auto border-t border-white/10 pt-5 text-xs tracking-widest text-gray-500">
                PROJECT IDEA — NOT YET IMPLEMENTED
              </p>

            </div>

            {/* Project 3 */}
            <div className="group flex min-h-[520px] flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-2 hover:border-white/30">

              <div className="flex items-center justify-between">
                <span className="text-xs tracking-widest text-gray-500">
                  PROJECT 03
                </span>

                <span className="text-xs text-gray-600">
                  CLASSIFICATION
                </span>
              </div>

              <div className="my-12 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-gray-800/60 to-black">

                <span className="text-5xl font-light text-gray-300">
                  03
                </span>

              </div>

              <h3 className="text-2xl font-medium">
                Customer Churn Prediction
              </h3>

              <p className="mt-4 text-sm leading-7 text-gray-500">
                An intelligent prediction system concept
                designed to identify customers who may
                discontinue a service.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">

                <span className="skill-tag">Python</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">XGBoost</span>

              </div>

              <p className="mt-auto border-t border-white/10 pt-5 text-xs tracking-widest text-gray-500">
                PROJECT IDEA — NOT YET IMPLEMENTED
              </p>

            </div>

          </div>

        </div>

      </section>

      
      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="border-t border-white/10 px-6 py-24 md:px-12 md:py-32"
      >

        <div className="mx-auto max-w-7xl">

          {/* Section Label */}
          <p className="mb-10 text-xs tracking-[0.3em] text-gray-500">
            04 / GET IN TOUCH
          </p>

          {/* Main Heading */}
          <h2 className="max-w-5xl text-5xl font-medium leading-tight tracking-tight sm:text-6xl md:text-8xl">

            Let's build

            <br />

            something

            <br />

            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-600 bg-clip-text text-transparent">
              intelligent.
            </span>

          </h2>

          {/* Description */}
          <p className="mt-10 max-w-xl text-base leading-8 text-gray-400 md:text-lg">
            Have an interesting idea, an opportunity,
            or simply want to discuss Artificial Intelligence
            and Machine Learning? I'd love to hear from you.
          </p>

          {/* Email Button */}
          <div className="mt-12">

            <a
              href="mailto:hridoy242-35-195@diu.edu.bd"
              className="inline-flex items-center gap-4 rounded-full bg-white px-8 py-5 text-sm font-semibold text-black transition duration-300 hover:bg-gray-300"
            >
              Let's Talk

              <span className="text-lg">↗</span>
            </a>

          </div>

          {/* Social Links */}
          <div className="mt-24 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">

            <div>
              <p className="mb-3 text-xs tracking-widest text-gray-500">
                EMAIL
              </p>

              <a
                href="mailto:hridoy242-35-195@diu.edu.bd"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                hridoy242-35-195@diu.edu.bd
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-gray-500">
                GITHUB
              </p>

              <a
                href="https://github.com/mahthir-hridoy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                GitHub ↗
              </a>
            </div>

            <div>
              <p className="mb-3 text-xs tracking-widest text-gray-500">
                LINKEDIN
              </p>

              <a
                href="https://www.linkedin.com/in/mahthir-hridoy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-300 transition hover:text-white"
              >
                LinkedIn ↗
              </a>
            </div>

          </div>

        </div>

      </section>

      
      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 md:px-12">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">

          {/* Logo */}
          <h2 className="text-xl font-bold tracking-wide">
            NoOne<span className="text-gray-500">.</span>
          </h2>

          {/* Copyright */}
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} NoOne. All rights reserved.
          </p>

          {/* Back to Top */}
          <a
            href="#home"
            className="text-xs tracking-widest text-gray-400 transition hover:text-white"
          >
            BACK TO TOP ↑
          </a>

        </div>

      </footer>


    </main>
  );
}
