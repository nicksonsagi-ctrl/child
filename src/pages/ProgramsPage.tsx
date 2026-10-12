import React, { useState } from 'react';
import { PageId, ProgramItem } from '../types/system';
import { PROGRAMS_DATA } from '../data/mockSystemData';
import { ResilientImage } from '../components/ResilientImage';
import { Clock, Check, ArrowRight, SlidersHorizontal, BookOpen } from 'lucide-react';

interface ProgramsPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProgramForTour: (programTitle: string) => void;
}

type AgeFilter = 'all' | 'infant' | 'toddler' | 'preschool' | 'pre-k';

export const ProgramsPage: React.FC<ProgramsPageProps> = ({
  onNavigate,
  onSelectProgramForTour,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<AgeFilter>('all');
  const [activeRhythmId, setActiveRhythmId] = useState<string>(PROGRAMS_DATA[2].id);
  const [comparedIds, setComparedIds] = useState<string[]>(['prog-toddler', 'prog-preschool']);

  const filteredPrograms =
    selectedFilter === 'all'
      ? PROGRAMS_DATA
      : PROGRAMS_DATA.filter((p) => p.ageGroup === selectedFilter);

  const activeRhythmProgram: ProgramItem =
    PROGRAMS_DATA.find((p) => p.id === activeRhythmId) || PROGRAMS_DATA[0];

  const toggleCompare = (id: string) => {
    setComparedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleRequestProgramTour = (programTitle: string) => {
    onSelectProgramForTour(programTitle);
    onNavigate('admissions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-16">
      {/* Page Header & Interactive Cohort Filter */}
      <section className="space-y-6 border-b border-slate-200 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
              <span>Dedicated Academic Curriculum Directory</span>
              <span aria-hidden="true">·</span>
              <span>4 Developmental Divisions</span>
            </div>
            <h1
              className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              Age-Banded Studio Programs & Daily Pedagogical Rhythms
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Filter classrooms by developmental cohort, inspect daily studio work cycles, or compare educator-to-child ratios and monthly tuition side by side.
            </p>
          </div>

          {/* Functional Segmented Filter Controls */}
          <div
            role="group"
            aria-label="Filter programs by age group"
            className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto"
          >
            {[
              { id: 'all', label: 'All Cohorts (4)' },
              { id: 'infant', label: 'Infant (6–18m)' },
              { id: 'toddler', label: 'Toddler (18m–3y)' },
              { id: 'preschool', label: 'Preschool (3–4y)' },
              { id: 'pre-k', label: 'Pre-K Lab (4–6y)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id as AgeFilter)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Cards Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPrograms.map((program) => {
          const isCompared = comparedIds.includes(program.id);
          return (
            <article
              key={program.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="h-56 bg-slate-100 border-b border-slate-200 relative">
                  <ResilientImage
                    src={program.imageUrl}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent flex items-end justify-between p-5">
                    <div className="text-xs font-medium text-teal-200">
                      <span>{program.ageRangeLabel}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{program.ratio}</span>
                    </div>
                    <span className="text-sm font-bold text-white font-mono-tabular">
                      ${program.tuitionMonthly.toLocaleString()}/mo
                    </span>
                  </div>
                </div>

                <div className="p-7 space-y-5">
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-slate-500">
                      {program.index}. Studio Curriculum · {program.scheduleOptions.join(' / ')}
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 font-display">
                      {program.title}
                    </h2>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {program.summary}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-900">
                      Core Pedagogical Focus:
                    </p>
                    <ul className="space-y-1.5">
                      {program.pedagogicalFocus.map((point, idx) => (
                        <li
                          key={idx}
                          className="text-xs text-slate-600 flex items-start gap-2"
                        >
                          <Check className="w-3.5 h-3.5 text-teal-700 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-7 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveRhythmId(program.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      activeRhythmId === program.id
                        ? 'bg-teal-50 border-teal-700 text-teal-900'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Inspect Daily Schedule</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompare(program.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      isCompared
                        ? 'bg-slate-900 border-slate-900 text-white'
                        : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'In Comparison' : 'Compare'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleRequestProgramTour(program.title)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-teal-800 hover:text-teal-950 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Book Classroom Tour</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </section>

      {/* Interactive Daily Rhythm Inspector */}
      <section className="bg-white border border-slate-200 rounded-xl p-7 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-teal-800">
              Interactive Daily Studio Rhythm Inspector
            </p>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {activeRhythmProgram.index}. {activeRhythmProgram.title} ({activeRhythmProgram.ageRangeLabel})
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PROGRAMS_DATA.map((prog) => (
              <button
                key={prog.id}
                type="button"
                onClick={() => setActiveRhythmId(prog.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeRhythmId === prog.id
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {prog.index}. {prog.ageGroup.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activeRhythmProgram.dailyRhythm.map((slot, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-teal-800 font-mono-tabular">
                  {slot.time}
                </span>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  {slot.activity}
                </h3>
              </div>
              <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                Outcome: {slot.purpose}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Program Comparison Matrix */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Curriculum & Ratio Comparison Matrix
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparing {comparedIds.length} selected cohorts. Toggle any program card above to customize this matrix.
            </p>
          </div>
          {comparedIds.length < PROGRAMS_DATA.length && (
            <button
              type="button"
              onClick={() => setComparedIds(PROGRAMS_DATA.map((p) => p.id))}
              className="px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
            >
              Show All 4 Programs
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-6">Program Cohort</th>
                <th className="py-3.5 px-6">Target Age Band</th>
                <th className="py-3.5 px-6">Educator Ratio</th>
                <th className="py-3.5 px-6">Schedule Cadence</th>
                <th className="py-3.5 px-6 text-right">Monthly Tuition</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {PROGRAMS_DATA.filter((p) => comparedIds.includes(p.id)).map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-semibold text-slate-900">
                    {row.index}. {row.title}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 font-mono-tabular text-xs">
                    {row.ageRangeLabel}
                  </td>
                  <td className="py-3.5 px-6 text-slate-700 font-mono-tabular text-xs">
                    {row.ratio}
                  </td>
                  <td className="py-3.5 px-6 text-slate-600 text-xs">
                    {row.scheduleOptions.join(' · ')}
                  </td>
                  <td className="py-3.5 px-6 text-right font-bold text-slate-900 font-mono-tabular">
                    ${row.tuitionMonthly.toLocaleString()}
                  </td>
                </tr>
              ))}
              {comparedIds.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-sm text-slate-500">
                    No programs selected for comparison. Click “Show All 4 Programs” above to populate the table.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
