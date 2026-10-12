import React, { useState } from 'react';
import {
  ChildProfile,
  MilestoneDomain,
  MilestoneRecord,
  MilestoneStatus,
} from '../types/system';
import {
  CheckCircle2,
  Clock,
  CircleDashed,
  Plus,
  Search,
  Filter,
} from 'lucide-react';

interface MilestonesPageProps {
  childrenProfiles: ChildProfile[];
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
  milestones: MilestoneRecord[];
  onToggleMilestoneStatus: (milestoneId: string) => void;
  onAddMilestone: (newMilestone: Omit<MilestoneRecord, 'id'>) => void;
}

const DOMAINS: ('All' | MilestoneDomain)[] = [
  'All',
  'Cognitive',
  'Language',
  'Motor',
  'Social-Emotional',
];

export const MilestonesPage: React.FC<MilestonesPageProps> = ({
  childrenProfiles,
  selectedChildId,
  onSelectChild,
  milestones,
  onToggleMilestoneStatus,
  onAddMilestone,
}) => {
  const [selectedDomain, setSelectedDomain] = useState<'All' | MilestoneDomain>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // New milestone form state
  const [newDomain, setNewDomain] = useState<MilestoneDomain>('Cognitive');
  const [newTitle, setNewTitle] = useState('');
  const [newTargetMonths, setNewTargetMonths] = useState('44');
  const [newNote, setNewNote] = useState('');
  const [formError, setFormError] = useState('');

  const activeChild =
    childrenProfiles.find((c) => c.id === selectedChildId) || childrenProfiles[0];

  const childMilestones = milestones.filter((m) => m.childId === activeChild.id);

  const filteredMilestones = childMilestones.filter((m) => {
    const matchesDomain = selectedDomain === 'All' || m.domain === selectedDomain;
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.educatorNote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  // Calculate domain completion metrics
  const totalCount = childMilestones.length;
  const completedCount = childMilestones.filter((m) => m.status === 'Completed').length;
  const inProgressCount = childMilestones.filter((m) => m.status === 'In Progress').length;
  const completionPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newNote.trim()) {
      setFormError('Please provide both a milestone descriptor and an observational field note.');
      return;
    }

    onAddMilestone({
      childId: activeChild.id,
      domain: newDomain,
      title: newTitle.trim(),
      targetAgeMonths: Number(newTargetMonths) || activeChild.ageMonths,
      status: 'Completed',
      observedDate: 'Oct 12, 2026',
      educatorNote: newNote.trim(),
    });

    setNewTitle('');
    setNewNote('');
    setFormError('');
    setShowAddForm(false);
  };

  const renderStatusControl = (status: MilestoneStatus) => {
    if (status === 'Completed') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Completed</span>
        </span>
      );
    }
    if (status === 'In Progress') {
      return (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>In Progress</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
        <CircleDashed className="w-4 h-4 text-slate-400 shrink-0" />
        <span>Upcoming</span>
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      {/* Workspace Header & Active Child Switcher */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
            <span>Longitudinal Child Development Workspace</span>
            <span aria-hidden="true">·</span>
            <span>Empirical Observation Ledger</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Developmental Milestones & Domain Competency
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Select a child profile to inspect verified classroom observations, toggle milestone progression states, or record a new developmental observation.
          </p>
        </div>

        {/* Child Profile Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/75 rounded-xl self-start lg:self-auto">
          {childrenProfiles.map((child) => {
            const active = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => onSelectChild(child.id)}
                className={`px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer text-left whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <span>{child.name}</span>
                <span className="ml-1.5 text-slate-400 font-mono-tabular">
                  ({child.ageLabel})
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Active Child Summary Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-xl p-6">
        <div className="space-y-1 sm:pr-4 sm:border-r sm:border-slate-200">
          <p className="text-xs text-slate-500">Selected Child & Studio</p>
          <p className="text-base font-bold text-slate-900 font-display">
            {activeChild.name}
          </p>
          <p className="text-xs text-slate-600">
            {activeChild.classroom} · Age {activeChild.ageMonths} mos
          </p>
        </div>

        <div className="space-y-1 lg:pr-4 lg:border-r lg:border-slate-200">
          <p className="text-xs text-slate-500">Lead Pedagogical Observer</p>
          <p className="text-base font-bold text-slate-900 font-display">
            {activeChild.leadEducator}
          </p>
          <p className="text-xs text-slate-600 font-mono-tabular">
            Attendance Rate: {activeChild.attendanceRate}
          </p>
        </div>

        <div className="space-y-1 sm:pr-4 sm:border-r sm:border-slate-200">
          <p className="text-xs text-slate-500">Verified Milestone Completion</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-teal-800 font-mono-tabular">
              {completionPct}%
            </span>
            <span className="text-xs text-slate-500 font-mono-tabular">
              ({completedCount} of {totalCount} Completed)
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-teal-700 transition-all duration-200"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between items-start sm:items-end">
          <div className="text-left sm:text-right">
            <p className="text-xs text-slate-500">Active In-Progress Goals</p>
            <p className="text-xl font-bold text-slate-900 font-mono-tabular">
              {inProgressCount} Active Targets
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm((prev) => !prev)}
            className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Close Observation Form' : 'Log New Observation'}</span>
          </button>
        </div>
      </section>

      {/* Collapsible New Observation Form */}
      {showAddForm && (
        <section className="bg-white border border-teal-700/30 rounded-xl p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Record Empirical Milestone Observation for {activeChild.name}
              </h2>
              <p className="text-xs text-slate-500">
                New entries are immediately appended to {activeChild.name}’s longitudinal developmental ledger.
              </p>
            </div>
          </div>

          <form onSubmit={handleCreateMilestone} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Developmental Domain
                </label>
                <select
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value as MilestoneDomain)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                >
                  <option value="Cognitive">Cognitive & Quantitative</option>
                  <option value="Language">Language & Phonetics</option>
                  <option value="Motor">Fine & Gross Motor</option>
                  <option value="Social-Emotional">Social-Emotional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Target Benchmark Age (Months)
                </label>
                <input
                  type="number"
                  min={6}
                  max={72}
                  value={newTargetMonths}
                  onChange={(e) => setNewTargetMonths(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Competency / Milestone Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Traces sandpaper numerals 0–9 with index finger"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Educator / Parent Observational Field Note
              </label>
              <textarea
                rows={2}
                placeholder="Describe concrete evidence observed during work cycle or home activity..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            {formError && (
              <p className="text-xs font-medium text-red-600">{formError}</p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                Save Verified Observation
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Filter Bar & Search Controls */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {DOMAINS.map((domain) => (
              <button
                key={domain}
                type="button"
                onClick={() => setSelectedDomain(domain)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedDomain === domain
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search milestones or notes..."
              aria-label="Search milestones or educator notes"
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:bg-white focus:border-teal-700"
            />
          </div>
        </div>

        {/* High-Density Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                <th className="py-3.5 px-6">Domain</th>
                <th className="py-3.5 px-6">Developmental Competency & Educator Note</th>
                <th className="py-3.5 px-6 text-right">Target Age</th>
                <th className="py-3.5 px-6">Current Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm">
              {filteredMilestones.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6 align-top whitespace-nowrap">
                    <span className="text-xs font-semibold text-slate-800">
                      {item.domain}
                    </span>
                    {item.observedDate && (
                      <p className="text-xs text-slate-400 font-mono-tabular mt-0.5">
                        {item.observedDate}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6 align-top max-w-xl">
                    <p className="font-semibold text-slate-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {item.educatorNote}
                    </p>
                  </td>
                  <td className="py-4 px-6 align-top text-right font-mono-tabular text-xs text-slate-600 whitespace-nowrap">
                    {item.targetAgeMonths} mos
                  </td>
                  <td className="py-4 px-6 align-top whitespace-nowrap">
                    {renderStatusControl(item.status)}
                  </td>
                  <td className="py-4 px-6 align-top text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onToggleMilestoneStatus(item.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Advance Status
                    </button>
                  </td>
                </tr>
              ))}

              {filteredMilestones.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center space-y-3">
                    <p className="text-sm font-medium text-slate-600">
                      No developmental milestones match the current filter criteria.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDomain('All');
                        setSearchQuery('');
                      }}
                      className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
                    >
                      Reset Domain & Search Filters
                    </button>
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
