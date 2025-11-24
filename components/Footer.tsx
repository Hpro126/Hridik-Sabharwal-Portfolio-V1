import React from 'react';
import { Mail, ArrowRight } from 'lucide-react';
import { FOOTER_TEXT } from '../constants';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 pt-16 pb-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 blur-[1px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold font-display text-white mb-6">Let's Connect</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
              {FOOTER_TEXT}
            </p>
            <div className="flex items-center space-x-3 text-cyan-400 mb-6">
              <Mail className="w-5 h-5" />
              <a href="mailto:hridik.sabharwal@outlook.com" className="hover:underline text-lg">
                hridik.sabharwal@outlook.com
              </a>
            </div>
          </div>

          <div className="glass-card p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Send a Message</h3>
            <button 
              onClick={() => onNavigate('contact')}
              className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center">
                Go to Contact Form
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <p className="mt-4 text-sm text-slate-500 text-center">
              I usually respond within 24-48 hours.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Hridik Sabharwal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;