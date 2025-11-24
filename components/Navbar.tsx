import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { label: string; value: PageView }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About Me', value: 'about' },
    { label: 'Projects', value: 'projects' },
    { label: 'Animations', value: 'animations' },
    { label: 'Edits', value: 'edits' },
    { label: 'Blog', value: 'blog' },
    { label: 'Contact Me', value: 'contact' },
  ];

  const handleNav = (value: PageView) => {
    onNavigate(value);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => handleNav('home')}>
            <h1 className="text-2xl font-bold font-display tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-500">
              Hridik Sabharwal
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => handleNav(link.value)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPage === link.value
                      ? 'text-cyan-400 bg-slate-800/50'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-nav border-t border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => handleNav(link.value)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === link.value
                    ? 'text-cyan-400 bg-slate-800/50'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/30'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;