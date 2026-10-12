import React, { useState } from 'react';
import {
  ChildProfile,
  DailyMealPlan,
  ImmunizationRecord,
  interfaceWellnessLogEntry,
} from '../types/system';
import { WEEKLY_MEAL_PLAN, IMMUNIZATION_RECORDS } from '../data/mockSystemData';
import {
  ShieldCheck,
  Utensils,
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from 'lucide-react';

interface WellnessPageProps {
  childrenProfiles: ChildProfile[];
  selectedChildId: string;
  onSelectChild: (childId: string) => void;
  wellnessLogs: interfaceWellnessLogEntry[];
  onAddWellnessLog: (entry: Omit<interfaceWellnessLogEntry, 'id'>) => void;
}

export const WellnessPage: React.FC<WellnessPageProps> = ({
  childrenProfiles,
  selectedChildId,
  onSelectChild,
  wellnessLogs,
  onAddWellnessLog,
}) => {
  const [selectedDay, setSelectedDay] = useState<DailyMealPlan['day']>('Monday');
  const [category, setCategory] = useState<interfaceWellnessLogEntry['category']>('Nutrition');
  const [summary, setSummary] = useState('');
  const [metricValue, setMetricValue] = useState('');
  const [formFeedback, setFormFeedback] = useState('');

  const activeChild =
    childrenProfiles.find((c) => c.id === selectedChildId) || childrenProfiles[0];

  const activeMealPlan =
    WEEKLY_MEAL_PLAN.find((m) => m.day === selectedDay) || WEEKLY_MEAL_PLAN[0];

  const childLogs = wellnessLogs.filter((l) => l.childId === activeChild.id);
  const childImmunizations = IMMUNIZATION_RECORDS.filter(
    (imm) => imm.childId === activeChild.id
  );

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim() || !metricValue.trim()) {
      setFormFeedback('Please enter both a metric value and an observation summary.');
      return;
    }

    const now = new Date();
    const formattedTime = now.toTimeString().slice(0, 5);

    onAddWellnessLog({
      childId: activeChild.id,
      date: 'Oct 12, 2026',
      time: formattedTime,
      category,
      summary: summary.trim(),
      metricValue: metricValue.trim(),
      recordedBy: 'Parent / Nurse Portal Entry',
    });

    setSummary('');
    setMetricValue('');
    setFormFeedback('Wellness entry recorded to daily pediatric log.');
    setTimeout(() => setFormFeedback(''), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      {/* Page Header & Child Switcher */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
            <span>Pediatric Health, Allergen Safety & Organic Culinary Hub</span>
            <span aria-hidden="true">·</span>
            <span>On-Site RN Supervision</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Pediatric Wellness, Immunization & Nutrition Ledger
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Inspect daily scratch-prepared organic menus, review verified immunization compliance, and record real-time nutrition, sleep, and temperature checks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/75 rounded-xl self-start lg:self-auto">
          {childrenProfiles.map((child) => {
            const active = child.id === activeChild.id;
            return (
              <button
                key={child.id}
                type="button"
                onClick={() => onSelectChild(child.id)}
                className={`px-3.5 py-2 rounded-lg text-xs transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-white text-slate-900 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                {child.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Pediatric Health Card Strip */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
          <p className="text-xs text-slate-500">Medical & Allergy Profile</p>
          <p className="text-lg font-bold text-slate-900 font-display">
            {activeChild.name} · Blood Type {activeChild.bloodType}
          </p>
          <p className="text-xs text-slate-600">
            Allergies: <span className="font-semibold text-slate-900">{activeChild.allergies}</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
          <p className="text-xs text-slate-500">Scheduled Pediatric Physical</p>
          <p className="text-lg font-bold text-slate-900 font-mono-tabular">
            {activeChild.nextPediatricCheckup}
          </p>
          <p className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Medical Clearance Active for All Courtyard Activities</span>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-2">
          <p className="text-xs text-slate-500">Campus Culinary Protocol</p>
          <p className="text-lg font-bold text-slate-900 font-display">
            100% Organic & Nut-Free Kitchen
          </p>
          <p className="text-xs text-slate-600">
            Menus formulated with Pediatric Dietitian · Locally sourced produce
          </p>
        </div>
      </section>

      {/* Weekly Organic Nutrition Planner */}
      <section className="bg-white border border-slate-200 rounded-xl p-7 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <Utensils className="w-3.5 h-3.5" />
              <span>Scratch Culinary Matrix</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Weekly Organic Menu & Nutritional Breakdown
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {WEEKLY_MEAL_PLAN.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedDay(plan.day)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedDay === plan.day
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {plan.day}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-teal-800 font-mono-tabular">
              08:45 · Morning Breakfast
            </span>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {activeMealPlan.breakfast}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-teal-800 font-mono-tabular">
              10:30 · Harvest Morning Snack
            </span>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {activeMealPlan.morningSnack}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-teal-800 font-mono-tabular">
              12:15 · Family-Style Hot Lunch
            </span>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {activeMealPlan.lunch}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-semibold text-teal-800 font-mono-tabular">
              15:15 · Afternoon Atelier Snack
            </span>
            <p className="text-sm font-medium text-slate-900 leading-relaxed">
              {activeMealPlan.afternoonSnack}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
          <span>Allergen & Kitchen Protocol: {activeMealPlan.allergenNotice}</span>
          <span className="font-mono-tabular font-semibold text-slate-800">
            Daily Target: {activeMealPlan.caloriesKcal} kcal · {activeMealPlan.proteinGrams}g Protein
          </span>
        </div>
      </section>

      {/* Split Layout: Daily Pediatric Log + New Check-In Logger & Immunization Table */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Daily Wellness Log & Immunization Table */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Daily Wellness & Care Log ({activeChild.name})
                </h2>
                <p className="text-xs text-slate-500">
                  Real-time rest, hydration, meal intake, and temperature observations
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-slate-500">
                {childLogs.length} Entries
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {childLogs.map((log) => (
                <div key={log.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-teal-800">{log.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-tabular">{log.date} at {log.time}</span>
                      <span aria-hidden="true">·</span>
                      <span>Logged by {log.recordedBy}</span>
                    </div>
                    <p className="text-sm text-slate-800">{log.summary}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="text-xs font-bold font-mono-tabular text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md">
                      {log.metricValue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immunization Compliance Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Verified Immunization & Screening Ledger
              </h2>
              <p className="text-xs text-slate-500">
                State Department of Public Health early childhood immunization records
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600">
                    <th className="py-3 px-5">Immunization / Screening</th>
                    <th className="py-3 px-5">Dose</th>
                    <th className="py-3 px-5">Administered</th>
                    <th className="py-3 px-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {childImmunizations.map((rec) => (
                    <tr key={rec.id}>
                      <td className="py-3.5 px-5 font-semibold text-slate-900">
                        {rec.vaccine}
                        <p className="font-normal text-slate-500 mt-0.5">{rec.clinic}</p>
                      </td>
                      <td className="py-3.5 px-5 font-mono-tabular text-slate-600">
                        {rec.doseNumber}
                      </td>
                      <td className="py-3.5 px-5 font-mono-tabular text-slate-600">
                        {rec.dateAdministered}
                      </td>
                      <td className="py-3.5 px-5">
                        {rec.status === 'Verified' ? (
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Due {rec.nextDueDate}</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Wellness Check-In Form */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 sticky top-24">
            <div className="space-y-1 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
                <HeartPulse className="w-4 h-4" />
                <span>Interactive Care Log Dispatch</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Log Daily Wellness Check-In
              </h2>
              <p className="text-xs text-slate-500">
                Add a morning health note, sleep duration, or dietary update for {activeChild.name}.
              </p>
            </div>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Observation Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as interfaceWellnessLogEntry['category'])
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                >
                  <option value="Nutrition">Nutrition & Hydration</option>
                  <option value="Rest">Rest & Nap Sanctuary</option>
                  <option value="Health Check">Temperature & Morning Check</option>
                  <option value="Outdoor Play">Outdoor Courtyard Activity</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Key Metric / Measurement (Tabular)
                </label>
                <input
                  type="text"
                  placeholder="e.g., 36.5°C · Nominal or 90 min Rest"
                  value={metricValue}
                  onChange={(e) => setMetricValue(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Detailed Care Note
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter dietary intake, sleep quality, or disposition notes..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>

              {formFeedback && (
                <p className="text-xs font-medium text-teal-800 bg-teal-50 px-3 py-2 rounded-lg">
                  {formFeedback}
                </p>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Append to Daily Wellness Ledger</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
