
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code, Cpu, Film, Search, Send, MapPin, Layers, BookOpen, Calendar, Target, ChevronLeft, Play, Pause, Scissors } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToggleButton from './components/ToggleButton';
import { PageView, Project, Animation, BlogPost, ToggleOption, Edit } from './types';
import { HERO_TEXT, ABOUT_TEXT, FULL_ABOUT, PROJECTS, ANIMATIONS, BLOGS, EDITS } from './constants';

// --- Helper Functions ---
const filterItems = <T extends { featured: boolean; date: string; title: string }>(
  items: T[], 
  filter: ToggleOption,
  search?: string
) => {
  let filtered = items;
  
  if (search) {
    filtered = filtered.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  }

  if (filter === 'featured') {
    return filtered.filter(item => item.featured);
  } else {
    // Return all sorted by date (recent)
    return [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
};

// --- Sub Components ---

const ProjectDetail = ({ project, onBack }: { project: Project; onBack: () => void }) => (
  <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <button onClick={onBack} className="flex items-center text-slate-400 hover:text-cyan-400 mb-8 transition-colors group">
      <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Projects
    </button>

    {/* Hero */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
      <div>
         <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-800 text-xs font-bold mb-4 uppercase tracking-wider">
            {project.category}
         </div>
         <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-6 leading-tight">{project.title}</h1>
         <p className="text-xl text-slate-300 mb-8 leading-relaxed">{project.description}</p>
         
         <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
           <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>
           <div className="flex flex-wrap gap-2">
             {project.techStackDetails.map((tech) => (
               <span key={tech} className="px-3 py-1.5 bg-slate-900 text-slate-300 rounded text-sm border border-slate-700">{tech}</span>
             ))}
           </div>
         </div>
      </div>
      <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-cyan-900/20 border border-slate-700 group">
         <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-4xl mx-auto space-y-16">
      <section>
         <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Technical Overview</h2>
         <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-line mb-8">{project.fullDescription}</p>
         {project.fullDescriptionImage && (
           <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg shadow-cyan-900/10 hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500">
             <img src={project.fullDescriptionImage} alt="Technical Overview" className="w-full h-auto" />
           </div>
         )}
      </section>

      <section>
         <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">The Journey</h2>
         <div className="bg-slate-800/30 rounded-xl p-8 border-l-4 border-purple-500 mb-8">
            <p className="text-slate-300 leading-relaxed italic">"{project.journey}"</p>
         </div>
         {project.journeyImage && (
           <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg shadow-purple-900/10 hover:shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-500">
             <img src={project.journeyImage} alt="The Journey" className="w-full h-auto" />
           </div>
         )}
      </section>

      <section>
         <h2 className="text-3xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Challenges & Solutions</h2>
         <p className="text-slate-300 leading-relaxed text-lg mb-8">{project.challenges}</p>
         {project.challengesImage && (
           <div className="rounded-xl overflow-hidden border border-slate-700 shadow-lg shadow-blue-900/10 hover:shadow-blue-500/20 hover:border-blue-500/50 transition-all duration-500">
             <img src={project.challengesImage} alt="Challenges" className="w-full h-auto" />
           </div>
         )}
      </section>

      {project.githubLink && (
         <div className="pt-8 flex justify-center">
           <button className="inline-flex items-center px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold border border-slate-600 transition-all group hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:border-cyan-400">
             <Code className="w-5 h-5 mr-2 text-cyan-400 group-hover:text-white transition-colors" /> View Project Code
           </button>
         </div>
      )}
    </div>
  </div>
);

const AnimationDetail = ({ animation, onBack }: { animation: Animation; onBack: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={onBack} className="flex items-center text-slate-400 hover:text-purple-400 mb-8 transition-colors group">
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Animations
      </button>

      {/* Video Player Container */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-slate-700 mb-8 group hover:shadow-purple-600/20 hover:border-purple-500/50 transition-all duration-500">
        {!isPlaying ? (
          // Thumbnail View
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
            <img src={animation.imageUrl} alt={animation.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/50 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-white fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
               <h1 className="text-3xl md:text-4xl font-bold text-white">{animation.title}</h1>
            </div>
          </div>
        ) : (
          // Video View
          <video 
            ref={videoRef}
            src={animation.videoUrl} 
            className="w-full h-full" 
            controls 
            autoPlay
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">About this Animation</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{animation.description}</p>
          
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technical Details</h3>
            <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-slate-300">Software Used:</span>
                {animation.software.map(sw => (
                  <span key={sw} className="text-purple-400 font-medium">{sw}</span>
                ))}
            </div>
            <div className="text-slate-400 text-sm">Created: {animation.date}</div>
          </div>
      </div>
    </div>
  );
};

const EditDetail = ({ edit, onBack }: { edit: Edit; onBack: () => void }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={onBack} className="flex items-center text-slate-400 hover:text-pink-400 mb-8 transition-colors group">
        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Edits
      </button>

      {/* Video Player Container */}
      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-pink-900/20 border border-slate-700 mb-8 group hover:shadow-pink-600/20 hover:border-pink-500/50 transition-all duration-500">
        {!isPlaying ? (
          // Thumbnail View
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
            <img src={edit.imageUrl} alt={edit.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-pink-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50 transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-10 h-10 text-white fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
               <h1 className="text-3xl md:text-4xl font-bold text-white">{edit.title}</h1>
            </div>
          </div>
        ) : (
          // Video View
          <video 
            ref={videoRef}
            src={edit.videoUrl} 
            className="w-full h-full" 
            controls 
            autoPlay
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>

      <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">About this Edit</h2>
          <p className="text-slate-300 text-lg leading-relaxed mb-6">{edit.description}</p>
          
          <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Technical Details</h3>
            <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-slate-300">Software Used:</span>
                {edit.software.map(sw => (
                  <span key={sw} className="text-pink-400 font-medium">{sw}</span>
                ))}
            </div>
            <div className="text-slate-400 text-sm">Created: {edit.date}</div>
          </div>
      </div>
    </div>
  );
};

const BlogDetail = ({ blog, onBack }: { blog: BlogPost; onBack: () => void }) => (
  <div className="pt-32 pb-20 min-h-screen max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <button onClick={onBack} className="flex items-center text-slate-400 hover:text-cyan-400 mb-8 transition-colors group">
      <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Blog
    </button>

    <article>
      {/* Header */}
      <header className="mb-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          {blog.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-cyan-900/30 text-cyan-400 border border-cyan-800 text-sm font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white mb-6 leading-tight">
          {blog.title}
        </h1>
        <div className="flex items-center justify-center text-slate-400 space-x-4">
           <span className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {blog.date}</span>
           <span>•</span>
           <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2" /> {blog.readTime}</span>
        </div>
      </header>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden mb-12 border border-slate-700 shadow-2xl">
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-[400px] object-cover" />
      </div>

      {/* Content */}
      <div className="prose prose-lg prose-invert max-w-none">
         <p className="lead text-xl text-slate-300 font-medium mb-8 border-l-4 border-cyan-500 pl-4 bg-slate-800/20 p-4 rounded-r-lg">
           {blog.excerpt}
         </p>
         <div className="space-y-6 text-slate-300 leading-8">
           {blog.content.map((paragraph, idx) => (
             <p key={idx}>{paragraph}</p>
           ))}
         </div>
      </div>

      {/* Author Footer */}
      <div className="mt-16 pt-8 border-t border-slate-800 flex items-center justify-between">
         <div>
            <p className="text-slate-500 text-sm mb-1">Written by</p>
            <h4 className="text-white font-bold text-lg">{blog.author}</h4>
            <p className="text-slate-400 text-sm">Student & Full Stack Developer</p>
         </div>
      </div>
    </article>
  </div>
);

const HeroSection = ({ onNavigate }: { onNavigate: (page: PageView) => void }) => (
  <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
    {/* Background Gradients */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
    <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
    <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h2 className="text-xl md:text-2xl font-bold text-cyan-400 mb-4 animate-fade-in-up uppercase tracking-widest">
        {HERO_TEXT.greeting}
      </h2>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tighter text-white mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-slate-400">
          Creative.<br/>Developer.<br/>Innovator.
        </span>
      </h1>
      <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 leading-relaxed mb-10 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        {HERO_TEXT.tagline}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
        <button 
          onClick={() => onNavigate('projects')}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105"
        >
          View Projects
        </button>
        <button 
          onClick={() => onNavigate('about')}
          className="px-8 py-4 rounded-full border border-slate-700 bg-slate-800/50 text-white font-bold text-lg hover:bg-slate-800 transition-all hover:border-cyan-400"
        >
          More About Me
        </button>
      </div>
    </div>
    
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
      <ArrowRight className="rotate-90" />
    </div>
  </section>
);

const AboutSection = ({ isFullPage = false, onNavigate }: { isFullPage?: boolean; onNavigate: (page: PageView) => void }) => (
  <section className={`py-20 bg-slate-900 ${isFullPage ? 'pt-32 min-h-screen' : ''}`}>
    <div className={`${isFullPage ? 'max-w-7xl' : 'max-w-5xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
      <div className="relative">
          {/* Decorative background element for visual interest since image is gone */}
          {!isFullPage && (
            <>
              <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </>
          )}

          <div className="relative z-10">
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-900/30 border border-cyan-800 text-cyan-400 text-sm font-bold mb-4">
              ABOUT ME
            </div>

            {isFullPage ? (
              // --- FULL PAGE LAYOUT ---
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                 {/* Left Column: Main Info */}
                 <div className="lg:col-span-2 space-y-12">
                     {/* Intro */}
                     <div>
                          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-4">{ABOUT_TEXT.name}</h2>
                          <h3 className="text-2xl text-purple-400 font-medium mb-6">{ABOUT_TEXT.role}</h3>
                          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                             <p>{ABOUT_TEXT.intro}</p>
                             <p>{ABOUT_TEXT.secondary}</p>
                             <div className="p-6 bg-slate-800/30 border-l-4 border-cyan-500 rounded-r-lg">
                                <p className="italic text-slate-400">"{FULL_ABOUT.story}"</p>
                             </div>
                          </div>
                     </div>
 
                     {/* Skills Grid - Expanded */}
                     <div>
                         <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                             <Code className="w-6 h-6 mr-3 text-cyan-400" /> Technical Arsenal
                         </h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-cyan-500/30 transition-colors">
                                 <h4 className="font-bold text-cyan-400 mb-4">Programming & Web</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind', 'Python', 'C'].map(skill => (
                                         <span key={skill} className="px-3 py-1 bg-slate-900 rounded-full text-sm text-slate-300 border border-slate-700">{skill}</span>
                                     ))}
                                 </div>
                             </div>
                             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-purple-500/30 transition-colors">
                                 <h4 className="font-bold text-purple-400 mb-4">Robotics & IoT</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {['Arduino', 'ESP32', 'Raspberry Pi', 'Sensors', 'Circuit Design'].map(skill => (
                                         <span key={skill} className="px-3 py-1 bg-slate-900 rounded-full text-sm text-slate-300 border border-slate-700">{skill}</span>
                                     ))}
                                 </div>
                             </div>
                             <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-pink-500/30 transition-colors">
                                 <h4 className="font-bold text-pink-400 mb-4">Creative</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {['Blender 3D', 'Animation', 'Video Editing', 'UI Design'].map(skill => (
                                         <span key={skill} className="px-3 py-1 bg-slate-900 rounded-full text-sm text-slate-300 border border-slate-700">{skill}</span>
                                     ))}
                                 </div>
                             </div>
                              <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-green-500/30 transition-colors">
                                 <h4 className="font-bold text-green-400 mb-4">Tools</h4>
                                 <div className="flex flex-wrap gap-2">
                                     {['VS Code', 'Git', 'GitHub', 'Fusion 360', 'Unity'].map(skill => (
                                         <span key={skill} className="px-3 py-1 bg-slate-900 rounded-full text-sm text-slate-300 border border-slate-700">{skill}</span>
                                     ))}
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
 
                 {/* Right Column: Timeline & Education */}
                 <div className="space-y-8">
                     {/* Education Card */}
                     <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-colors"></div>
                         <BookOpen className="w-8 h-8 text-cyan-400 mb-4" />
                         <h3 className="text-xl font-bold text-white mb-2">Education</h3>
                         <h4 className="font-semibold text-slate-200">{FULL_ABOUT.education.school}</h4>
                         <p className="text-slate-400 text-sm mb-4">{FULL_ABOUT.education.location}</p>
                         <p className="text-slate-300 italic text-sm border-t border-slate-700 pt-4">"{FULL_ABOUT.education.details}"</p>
                     </div>
 
                     {/* Timeline */}
                     <div className="bg-slate-800/30 p-8 rounded-2xl border border-slate-700/50">
                         <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                             <Calendar className="w-5 h-5 mr-3 text-purple-400" /> My Journey
                         </h3>
                         <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-700">
                              {FULL_ABOUT.journey.map((item, index) => (
                                  <div key={index} className="relative pl-8">
                                      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider bg-slate-900/50 px-2 py-0.5 rounded-full">{item.year}</span>
                                      <h4 className="text-white font-bold mt-1 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                                      <p className="text-sm text-slate-400 mt-1">{item.desc}</p>
                                  </div>
                              ))}
                         </div>
                     </div>
                     
                     {/* Goals */}
                      <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-colors">
                         <Target className="w-8 h-8 text-purple-400 mb-4" />
                         <h3 className="text-xl font-bold text-white mb-2">Future Goal</h3>
                         <p className="text-slate-300">
                             To found a technology startup that leverages AI and Robotics to solve meaningful problems in daily life.
                         </p>
                     </div>
                 </div>
              </div>
            ) : (
              // --- SUMMARY HOME PAGE LAYOUT ---
              <>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-2">{ABOUT_TEXT.name}</h2>
                <h3 className="text-2xl text-purple-400 font-medium mb-6">{ABOUT_TEXT.role}</h3>
                
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>{ABOUT_TEXT.intro}</p>
                  <p>{ABOUT_TEXT.secondary}</p>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-colors">
                    <Code className="text-cyan-400 mb-2" />
                    <h4 className="font-bold text-white">Computer Programming</h4>
                    <p className="text-sm text-slate-400">HTML, CSS, JS, React, Python, C</p>
                  </div>
                  <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-purple-500/50 transition-colors">
                    <Cpu className="text-purple-400 mb-2" />
                    <h4 className="font-bold text-white">Robotics</h4>
                    <p className="text-sm text-slate-400">Arduino, ESP32, Raspberry Pi</p>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => onNavigate('about')}
                    className="flex items-center text-cyan-400 font-bold hover:text-cyan-300 transition-colors"
                  >
                    Read Full Bio <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </>
            )}
          </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = ({ isFullPage = false, projects, filter, setFilter, onSelect, onNavigate }: { isFullPage?: boolean; projects: Project[]; filter: ToggleOption; setFilter: (o: ToggleOption) => void; onSelect: (p: Project) => void; onNavigate: (page: PageView) => void }) => (
  <section className={`py-20 relative ${isFullPage ? 'pt-32 min-h-screen' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-cyan-400 font-bold mb-2">
            <Layers className="w-5 h-5" />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Projects</h2>
        </div>
        <div className="flex items-center space-x-4">
          <ToggleButton active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {(isFullPage ? projects : projects.slice(0, 2)).map((project) => (
          <div 
            key={project.id} 
            onClick={() => onSelect(project)}
            className="group relative glass-card rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          >
            <div className="aspect-video w-full overflow-hidden">
              <img 
                src={project.imageUrl} 
                alt={project.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-bold rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-slate-400 mb-6 line-clamp-2">{project.description}</p>
              <div className="inline-flex items-center text-white group-hover:text-cyan-400 font-medium transition-colors">
                View Case Study <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isFullPage && (
        <div className="mt-12 text-center">
           <button 
              onClick={() => onNavigate('projects')}
              className="px-8 py-3 rounded-full border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white transition-all"
           >
              View All Projects
           </button>
        </div>
      )}
    </div>
  </section>
);

const AnimationsSection = ({ isFullPage = false, animations, filter, setFilter, onSelect, onNavigate }: { isFullPage?: boolean; animations: Animation[]; filter: ToggleOption; setFilter: (o: ToggleOption) => void; onSelect: (a: Animation) => void; onNavigate: (page: PageView) => void }) => (
  <section className={`py-20 bg-slate-900 ${isFullPage ? 'pt-32 min-h-screen' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-purple-400 font-bold mb-2">
            <Film className="w-5 h-5" />
            <span>CREATIVE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Animations</h2>
        </div>
        <ToggleButton active={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {(isFullPage ? animations : animations.slice(0, 3)).map((anim) => (
           <div 
              key={anim.id} 
              className="group cursor-pointer"
              onClick={() => onSelect(anim)}
           >
             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-slate-700 group-hover:border-purple-500 transition-colors">
               <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-transparent transition-colors z-10"></div>
               <img 
                  src={anim.imageUrl} 
                  alt={anim.title}
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                    <Play className="w-8 h-8 ml-1 fill-current" />
                  </div>
               </div>
             </div>
             <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{anim.title}</h3>
             <p className="text-slate-400 text-sm mt-1">{anim.description}</p>
           </div>
         ))}
      </div>
      
      {!isFullPage && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate('animations')}
            className="px-8 py-3 rounded-full border border-slate-700 hover:border-purple-400 text-slate-300 hover:text-white transition-all"
          >
            View Animation Gallery
          </button>
        </div>
      )}
    </div>
  </section>
);

const EditsSection = ({ isFullPage = false, edits, filter, setFilter, onSelect, onNavigate }: { isFullPage?: boolean; edits: Edit[]; filter: ToggleOption; setFilter: (o: ToggleOption) => void; onSelect: (e: Edit) => void; onNavigate: (page: PageView) => void }) => (
  <section className={`py-20 bg-slate-950 ${isFullPage ? 'pt-32 min-h-screen' : ''}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-pink-400 font-bold mb-2">
            <Scissors className="w-5 h-5" />
            <span>EDITS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Edits</h2>
        </div>
        <ToggleButton active={filter} onChange={setFilter} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {(isFullPage ? edits : edits.slice(0, 3)).map((edit) => (
           <div 
              key={edit.id} 
              className="group cursor-pointer"
              onClick={() => onSelect(edit)}
           >
             <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 border border-slate-700 group-hover:border-pink-500 transition-colors">
               <div className="absolute inset-0 bg-slate-900/50 group-hover:bg-transparent transition-colors z-10"></div>
               <img 
                  src={edit.imageUrl} 
                  alt={edit.title}
                  className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                    <Play className="w-8 h-8 ml-1 fill-current" />
                  </div>
               </div>
             </div>
             <h3 className="text-xl font-bold text-white group-hover:text-pink-400 transition-colors">{edit.title}</h3>
             <p className="text-slate-400 text-sm mt-1">{edit.description}</p>
           </div>
         ))}
      </div>
      
      {!isFullPage && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate('edits')}
            className="px-8 py-3 rounded-full border border-slate-700 hover:border-pink-400 text-slate-300 hover:text-white transition-all"
          >
            View All Edits
          </button>
        </div>
      )}
    </div>
  </section>
);

const BlogSection = ({ isFullPage = false, blogs, filter, setFilter, search, setSearch, onSelect, onNavigate }: { isFullPage?: boolean; blogs: BlogPost[]; filter: ToggleOption; setFilter: (o: ToggleOption) => void; search: string; setSearch: (s: string) => void; onSelect: (b: BlogPost) => void; onNavigate: (page: PageView) => void }) => (
  <section className={`py-20 relative ${isFullPage ? 'pt-32 min-h-screen' : ''}`}>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white">Blog</h2>
          <p className="text-slate-400 mt-2">Thoughts, tutorials, and insights.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative">
             <input 
               type="text" 
               placeholder="Search blogs..." 
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-slate-300 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 w-64"
             />
             <Search className="absolute left-3 top-2.5 text-slate-500 w-4 h-4" />
          </div>
          <ToggleButton active={filter} onChange={setFilter} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(isFullPage ? blogs : blogs.slice(0, 3)).map((blog) => (
          <article 
            key={blog.id} 
            onClick={() => onSelect(blog)}
            className="flex flex-col glass-card rounded-2xl overflow-hidden hover:bg-slate-800 transition-colors cursor-pointer group"
          >
            <div className="h-48 overflow-hidden relative">
              <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center text-xs text-slate-400 mb-3 space-x-2">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
              <p className="text-slate-400 text-sm mb-4 flex-1">{blog.excerpt}</p>
              <div className="mt-auto pt-4 border-t border-slate-700/50 flex justify-between items-center">
                <div className="flex gap-2">
                  {blog.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs text-cyan-500 bg-cyan-950/30 px-2 py-1 rounded">#{tag}</span>
                  ))}
                </div>
                <div className="text-slate-300 group-hover:text-white transition-colors">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!isFullPage && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => onNavigate('blog')}
            className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors inline-flex items-center"
          >
            Visit the Blog <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  </section>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoLink = `mailto:hridik.sabharwal@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <section className="pt-32 pb-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-display text-white mb-4">Contact Me</h1>
          <p className="text-slate-400 text-lg">
            Got a project in mind or just want to chat? Fill out the form below.
          </p>
        </div>

        <div className="glass-card p-8 md:p-10 rounded-3xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                placeholder="Project Inquiry" 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
              <textarea 
                rows={6} 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" 
                placeholder="Your message here...">
              </textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg transition-all transform hover:-translate-y-1 flex items-center justify-center">
              <Send className="w-5 h-5 mr-2" /> Send Message
            </button>
          </form>

          <div className="mt-10 pt-10 border-t border-slate-700 flex flex-col items-center">
            <p className="text-slate-400 mb-4">Or email me directly at</p>
            <a href="mailto:hridik.sabharwal@outlook.com" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
              hridik.sabharwal@outlook.com
            </a>
            <div className="flex items-center space-x-2 mt-4 text-slate-500">
               <MapPin className="w-4 h-4" />
               <span>New Delhi, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [projectFilter, setProjectFilter] = useState<ToggleOption>('featured');
  const [animationFilter, setAnimationFilter] = useState<ToggleOption>('featured');
  const [editFilter, setEditFilter] = useState<ToggleOption>('featured');
  const [blogFilter, setBlogFilter] = useState<ToggleOption>('featured');
  const [blogSearch, setBlogSearch] = useState('');

  // Selected item state for Detail Views
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAnimation, setSelectedAnimation] = useState<Animation | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<Edit | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProject, selectedAnimation, selectedEdit, selectedBlog]);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    // Reset detailed views on main nav change
    setSelectedProject(null);
    setSelectedAnimation(null);
    setSelectedEdit(null);
    setSelectedBlog(null);
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    if (currentPage !== 'projects') setCurrentPage('projects');
  };

  const handleSelectAnimation = (anim: Animation) => {
    setSelectedAnimation(anim);
    if (currentPage !== 'animations') setCurrentPage('animations');
  };

  const handleSelectEdit = (edit: Edit) => {
    setSelectedEdit(edit);
    if (currentPage !== 'edits') setCurrentPage('edits');
  };

  const handleSelectBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    if (currentPage !== 'blog') setCurrentPage('blog');
  };

  // Filter Data
  const displayProjects = filterItems(PROJECTS, projectFilter);
  const displayAnimations = filterItems(ANIMATIONS, animationFilter);
  const displayEdits = filterItems(EDITS, editFilter);
  const displayBlogs = filterItems(BLOGS, blogFilter, blogSearch);

  // --- Main Render Logic ---

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 selection:bg-cyan-500/30">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main>
        {/* HOME VIEW: Show all sections summary */}
        {currentPage === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <AboutSection onNavigate={handleNavigate} />
            <ProjectsSection 
              projects={displayProjects} 
              filter={projectFilter} 
              setFilter={setProjectFilter} 
              onSelect={handleSelectProject}
              onNavigate={handleNavigate}
            />
            <AnimationsSection 
              animations={displayAnimations} 
              filter={animationFilter} 
              setFilter={setAnimationFilter} 
              onSelect={handleSelectAnimation}
              onNavigate={handleNavigate}
            />
             <EditsSection 
              edits={displayEdits}
              filter={editFilter}
              setFilter={setEditFilter}
              onSelect={handleSelectEdit}
              onNavigate={handleNavigate}
            />
            <BlogSection 
              blogs={displayBlogs} 
              filter={blogFilter} 
              setFilter={setBlogFilter} 
              search={blogSearch}
              setSearch={setBlogSearch}
              onSelect={handleSelectBlog}
              onNavigate={handleNavigate}
            />
          </>
        )}
        
        {/* ABOUT FULL VIEW */}
        {currentPage === 'about' && <AboutSection isFullPage={true} onNavigate={handleNavigate} />}
        
        {/* PROJECTS FULL VIEW */}
        {currentPage === 'projects' && (
          selectedProject ? 
            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} /> :
            <ProjectsSection 
              isFullPage={true} 
              projects={displayProjects} 
              filter={projectFilter} 
              setFilter={setProjectFilter} 
              onSelect={setSelectedProject}
              onNavigate={handleNavigate}
            />
        )}

        {/* ANIMATIONS FULL VIEW */}
        {currentPage === 'animations' && (
           selectedAnimation ?
            <AnimationDetail 
              animation={selectedAnimation} 
              onBack={() => setSelectedAnimation(null)} 
            /> :
            <AnimationsSection 
              isFullPage={true} 
              animations={displayAnimations} 
              filter={animationFilter} 
              setFilter={setAnimationFilter} 
              onSelect={setSelectedAnimation}
              onNavigate={handleNavigate}
            />
        )}

        {/* EDITS FULL VIEW */}
        {currentPage === 'edits' && (
           selectedEdit ?
            <EditDetail 
              edit={selectedEdit} 
              onBack={() => setSelectedEdit(null)} 
            /> :
            <EditsSection 
              isFullPage={true} 
              edits={displayEdits} 
              filter={editFilter} 
              setFilter={setEditFilter} 
              onSelect={setSelectedEdit}
              onNavigate={handleNavigate}
            />
        )}

        {/* BLOG FULL VIEW */}
        {currentPage === 'blog' && (
           selectedBlog ?
            <BlogDetail blog={selectedBlog} onBack={() => setSelectedBlog(null)} /> :
            <BlogSection 
              isFullPage={true} 
              blogs={displayBlogs} 
              filter={blogFilter} 
              setFilter={setBlogFilter} 
              search={blogSearch}
              setSearch={setBlogSearch}
              onSelect={setSelectedBlog}
              onNavigate={handleNavigate}
            />
        )}

        {/* CONTACT VIEW */}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
