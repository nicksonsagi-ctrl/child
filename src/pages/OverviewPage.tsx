import React from 'react';
import { PageId } from '../types/system';
import { ASSETS } from '../data/mockSystemData';
import { ResilientImage } from '../components/ResilientImage';
import { ArrowRight, Compass, CheckCircle2, Calendar, BookOpen, ShieldCheck, Users } from 'lucide-react';

interface OverviewPageProps {
  onNavigate: (page: PageId) => void;
}

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const goToPage = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-8">
      {/* Hero Split Section */}
      <section className="pt-8 md:pt-12 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
                <span>NAEYC & AMI Accredited Conservatory</span>
                <span aria-hidden="true">·</span>
                <span>Ages 6 Months to 6 Years</span>
                <span aria-hidden="true">·</span>
                <span>Pacific Heights Campus</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[3.35rem] font-bold tracking-tight text-slate-900 leading-[1.12] font-display"
                style={{ textWrap: 'balance' }}
              >
                Where Early Wonder Meets Longitudinal Child Development.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Luminara unites sunlit Montessori and Reggio Emilia ateliers with real-time developmental milestone portfolios, organic pediatric nutrition, and transparent family-educator collaboration across dedicated workspaces.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => goToPage('admissions')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Schedule Private Campus Tour</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => goToPage('programs')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Academic Programs</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span>01. Uninterrupted 2-Hour Morning Work Cycles</span>
                <span aria-hidden="true">·</span>
                <span>02. On-Site Registered Pediatric Nurse</span>
                <span aria-hidden="true">·</span>
                <span>03. 100% Organic Scratch Kitchen</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
              <ResilientImage
                src={ASSETS.heroClassroom}
                alt="Luminara Montessori and Reggio Emilia sunlit wooden classroom overlooking botanical courtyard"
                className="w-full h-full object-cover lg:h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent flex flex-col justify-end p-6">
                <p className="text-xs font-medium text-teal-200">
                  Birch Primary Atelier · Morning Inquiry Cycle
                </p>
                <p className="text-sm font-semibold text-white mt-1">
                  Natural birch timber materials, indoor-outdoor courtyard access, and low 1:5 educator ratios.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quantitative KPI Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-xl p-6">
          <div className="space-y-1 sm:pr-4 sm:border-r sm:border-slate-200">
            <p className="text-xs text-slate-500">Kindergarten Readiness Benchmark</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-tabular">99.2%</p>
            <p className="text-xs text-slate-600">Exceeds national numeracy & phonetic norms (2025 Cohort)</p>
          </div>

          <div className="space-y-1 lg:pr-4 lg:border-r lg:border-slate-200">
            <p className="text-xs text-slate-500">Educator Retention & Tenure</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-tabular">94.8%</p>
            <p className="text-xs text-slate-600">Average 6.4 years lead faculty continuity per classroom</p>
          </div>

          <div className="space-y-1 sm:pr-4 sm:border-r sm:border-slate-200">
            <p className="text-xs text-slate-500">Daily Outdoor Courtyard Immersion</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-tabular">110 min</p>
            <p className="text-xs text-slate-600">Structured agronomy, gross motor play & nature sketching</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-slate-500">Educator-to-Child Ratio</p>
            <p className="text-2xl font-bold text-slate-900 font-mono-tabular">1 : 3 to 1 : 8</p>
            <p className="text-xs text-slate-600">Small studio cohorts ensuring individualized observation</p>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid: Dedicated System Architecture & Pedagogical Pillars */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-teal-800">Integrated Childhood Ecosystem</p>
            <h2
              className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Every Dimension of Early Growth in Dedicated Workspaces
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-md">
            Navigate directly to any specialized module below to inspect age-banded curricula, log developmental milestones, review organic meal matrices, or message faculty.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Span 2 Card: Academic Programs & Studio Ateliers */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  01. Academic Curriculum · 4 Age Cohorts
                </p>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Montessori Precision & Reggio Emilia Studio Inquiry
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  From our 1:3 Infant Sensorial Nest to our Pre-K Quantitative & Botanical Lab, each studio is custom-architected with tactile wooden apparatus, natural acoustics, and dedicated Atelieristas.
                </p>
              </div>
              <div className="space-y-4">
                <div className="text-xs text-slate-500">
                  <span>Infant Nest</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Toddler Community</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Primary Atelier</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Pre-K Lab</span>
                </div>
                <button
                  type="button"
                  onClick={() => goToPage('programs')}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
                >
                  <span>Open Dedicated Programs Page</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 min-h-[240px] bg-slate-100 border-t md:border-t-0 md:border-l border-slate-200">
              <ResilientImage
                src={ASSETS.creativeAtelier}
                alt="Child working with natural stoneware clay and botanical pigments in the sunlit Atelier"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Span 1 Card: Longitudinal Milestone Tracker */}
          <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-slate-500">
                02. Developmental Documentation
              </p>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Longitudinal Milestone & Competency Tracker
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Track empirical progress across Cognitive, Phonetic Language, Fine/Gross Motor, and Social-Emotional domains with live educator field notes.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono-tabular text-slate-500">
                4 Developmental Domains
              </span>
              <button
                type="button"
                onClick={() => goToPage('milestones')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <span>Open Tracker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Span 1 Card: Pediatric Health & Organic Nutrition */}
          <div className="bg-white border border-slate-200 rounded-xl p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-medium text-slate-500">
                03. Pediatric Wellness & Dining
              </p>
              <h3 className="text-xl font-bold text-slate-900 font-display">
                Organic Culinary Matrix & Immunization Ledger
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspect daily scratch-prepared seasonal menus, allergen protocols, immunization verification, and real-time nurse check-in logs.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono-tabular text-slate-500">
                100% Nut-Free · Daily Logs
              </span>
              <button
                type="button"
                onClick={() => goToPage('wellness')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer"
              >
                <span>Open Wellness Page</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Span 2 Card: Family Portal & Admissions */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 min-h-[240px] bg-slate-100 border-b md:border-b-0 md:border-r border-slate-200">
              <ResilientImage
                src={ASSETS.stemDiscovery}
                alt="Wooden geometric solids, brass pan balance scales, and botanical specimens"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-7/12 p-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-medium text-slate-500">
                  04. Family Portal & Admissions Desk
                </p>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Direct Faculty Dispatch, Event RSVPs & Tuition Modeling
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Communicate directly with classroom lead educators, reserve seats at parent observation seminars, calculate sibling-adjusted tuition, or book an in-person campus tour.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => goToPage('family-portal')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Launch Family Portal</span>
                </button>
                <button
                  type="button"
                  onClick={() => goToPage('admissions')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Tuition & Tour Booking</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claim-to-Proof Adjacency: Attributable Outcomes & Leadership Spotlight */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white border border-slate-200 rounded-xl p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start gap-5 border-b lg:border-b-0 lg:border-r border-slate-200 pb-6 lg:pb-0 lg:pr-8">
              <div className="w-24 h-24 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                <ResilientImage
                  src={ASSETS.educatorPortrait}
                  alt="Elena Rostova, M.Ed., Executive Director of Pedagogy at Luminara Conservatory"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-teal-800">
                  Pedagogical Leadership Statement
                </p>
                <h3 className="text-lg font-bold text-slate-900 font-display">
                  Elena Rostova, M.Ed., AMI Diploma
                </h3>
                <p className="text-xs text-slate-500">
                  Executive Director of Early Childhood Pedagogy · 14 Years at Luminara
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  “When we respect a child’s uninterrupted concentration and document their emerging discoveries with scientific care, curiosity blossoms into lifelong self-assurance.”
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3 p-5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Parent Outcome Report</span>
                  <span className="font-mono-tabular text-teal-800 font-semibold">+42% Phonetic Fluency</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  “Before enrolling Clara in the Birch Atelier, she was hesitant to speak in group settings. Within 5 months of daily Montessori phonetic work and small-group botanical inquiry, she began reading three-letter words aloud and eagerly leading morning table setup.”
                </p>
                <div className="pt-2 border-t border-slate-200/70 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Dr. Marcus & Claire Vance</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Parents of Clara (Preschool) & Julian (Toddler)</span>
                </div>
              </div>

              <div className="space-y-3 p-5 rounded-lg bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Elementary Transition Audit</span>
                  <span className="font-mono-tabular text-teal-800 font-semibold">100% First-Choice Placement</span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  “Transitioning Sora into the Conservatory Pre-K Lab transformed our mornings. The transparent milestone portfolio and tree-nut allergy action plan gave us complete peace of mind, and he entered kindergarten already comfortable with four-digit golden bead addition.”
                </p>
                <div className="pt-2 border-t border-slate-200/70 text-xs text-slate-600">
                  <span className="font-semibold text-slate-900">Kenji & Maya Takahashi</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Parents of Sora (Conservatory Pre-K Cohort)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
