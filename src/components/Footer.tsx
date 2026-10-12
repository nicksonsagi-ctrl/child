import React from 'react';
import { PageId } from '../types/system';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-200">
          <div className="md:col-span-2 space-y-3">
            <p className="text-base font-bold text-slate-900 font-display tracking-tight">
              Luminara Conservatory
            </p>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              NAEYC & AMI Accredited Early Childhood Education, Developmental Milestone Documentation, and Pediatric Wellness System for ages 6 months to 6 years.
            </p>
            <p className="text-xs text-slate-500">
              420 Botanical Way · Pacific Heights Campus · Mon–Fri 07:30 – 18:00
            </p>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-900">Dedicated System Pages</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('overview')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Campus Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('programs')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Academic Programs
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('milestones')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Developmental Milestones
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('wellness')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Health & Nutrition
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <p className="text-xs font-semibold text-slate-900">Family & Admissions</p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('family-portal')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Family Portal & Events
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('admissions')}
                  className="hover:text-teal-800 transition-colors cursor-pointer"
                >
                  Tuition Calculator & Tour
                </button>
              </li>
              <li className="text-xs text-slate-500 pt-1">
                Admissions Desk: (415) 890-4310
              </li>
              <li className="text-xs text-slate-500">
                admissions@luminaraconservatory.org
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Luminara Early Childhood Conservatory. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>State License #384001942</span>
            <span aria-hidden="true">·</span>
            <span>100% Nut-Free & Organic Kitchen</span>
            <span aria-hidden="true">·</span>
            <span>AMI & Reggio Inspired</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
