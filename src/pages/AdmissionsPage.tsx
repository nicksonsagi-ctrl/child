import React, { useState, useEffect } from 'react';
import { TourBooking } from '../types/system';
import { PROGRAMS_DATA } from '../data/mockSystemData';
import { Calculator, CalendarCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface AdmissionsPageProps {
  preselectedProgramTitle?: string;
  tourBookings: TourBooking[];
  onSubmitTourBooking: (booking: Omit<TourBooking, 'id' | 'submittedAt'>) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({
  preselectedProgramTitle,
  tourBookings,
  onSubmitTourBooking,
}) => {
  // Interactive Tuition Calculator State
  const [calcProgramId, setCalcProgramId] = useState<string>('prog-preschool');
  const [scheduleTier, setScheduleTier] = useState<'full' | 'core' | 'extended'>('full');
  const [siblingDiscount, setSiblingDiscount] = useState<boolean>(false);
  const [includeOrganicDining, setIncludeOrganicDining] = useState<boolean>(true);

  // Tour Booking Form State
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [childName, setChildName] = useState('');
  const [childAgeGroup, setChildAgeGroup] = useState(
    preselectedProgramTitle || PROGRAMS_DATA[2].title
  );
  const [preferredDate, setPreferredDate] = useState('2026-10-22');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState('09:30 AM (Morning Work Cycle)');
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (preselectedProgramTitle) {
      setChildAgeGroup(preselectedProgramTitle);
    }
  }, [preselectedProgramTitle]);

  // Calculate Tuition Math
  const selectedProgram =
    PROGRAMS_DATA.find((p) => p.id === calcProgramId) || PROGRAMS_DATA[2];
  const baseTuition = selectedProgram.tuitionMonthly;

  const scheduleMultiplier =
    scheduleTier === 'full' ? 1.0 : scheduleTier === 'core' ? 0.78 : 1.15;
  const adjustedScheduleTuition = Math.round(baseTuition * scheduleMultiplier);
  const diningFee = includeOrganicDining ? 185 : 0;
  const discountAmount = siblingDiscount
    ? Math.round(adjustedScheduleTuition * 0.1)
    : 0;
  const estimatedMonthlyTotal =
    adjustedScheduleTuition + diningFee - discountAmount;

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!parentName.trim() || !childName.trim()) {
      setFormError('Please enter both the parent/guardian name and your child’s name.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setFormError('Please provide a valid email address for tour confirmation.');
      return;
    }
    if (phone.trim().length < 7) {
      setFormError('Please enter a valid contact phone number.');
      return;
    }

    onSubmitTourBooking({
      parentName: parentName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      childName: childName.trim(),
      childAgeGroup,
      preferredDate,
      preferredTimeSlot,
      notes: notes.trim(),
    });

    setSubmittedSuccess(true);
    setParentName('');
    setEmail('');
    setPhone('');
    setChildName('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
      {/* Header */}
      <section className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
          <span>2026–2027 Academic Admissions & Tuition Transparency</span>
          <span aria-hidden="true">·</span>
          <span>Rolling Cohort Placement</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Admissions Process, Tuition Calculator & Private Campus Tours
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Model monthly tuition across age cohorts and schedule cadences, or book a private morning observation tour with our Admissions Director.
        </p>
      </section>

      {/* Split Layout: Tuition Estimator (5 Cols) & Campus Tour Scheduler (7 Cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left 5 Cols: Interactive Tuition & Sibling Calculator */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-7 space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <Calculator className="w-4 h-4" />
              <span>Real-Time Tuition Estimator</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Monthly Tuition & Schedule Modeler
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                1. Select Developmental Cohort
              </label>
              <select
                value={calcProgramId}
                onChange={(e) => setCalcProgramId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-teal-700"
              >
                {PROGRAMS_DATA.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.index}. {p.title} ({p.ageRangeLabel})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                2. Weekly Attendance Cadence
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'core', label: 'Core (3 Days)' },
                  { id: 'full', label: 'Full (5 Days)' },
                  { id: 'extended', label: 'Extended Day' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() =>
                      setScheduleTier(tier.id as 'core' | 'full' | 'extended')
                    }
                    className={`py-2 px-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      scheduleTier === tier.id
                        ? 'bg-teal-700 border-teal-700 text-white'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">
                  Include 100% Organic Scratch Breakfast, Lunch & Snacks
                </span>
                <input
                  type="checkbox"
                  checked={includeOrganicDining}
                  onChange={(e) => setIncludeOrganicDining(e.target.checked)}
                  className="w-4 h-4 accent-teal-700 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">
                  Apply 10% Enrolled Sibling Tuition Grant
                </span>
                <input
                  type="checkbox"
                  checked={siblingDiscount}
                  onChange={(e) => setSiblingDiscount(e.target.checked)}
                  className="w-4 h-4 accent-teal-700 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Tabular Calculation Breakdown */}
          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Studio Tuition ({selectedProgram.ratio})</span>
              <span className="font-mono-tabular">
                ${adjustedScheduleTuition.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span>Organic Culinary Program</span>
              <span className="font-mono-tabular">+${diningFee}</span>
            </div>
            {siblingDiscount && (
              <div className="flex items-center justify-between text-xs text-teal-300">
                <span>10% Sibling Tuition Grant</span>
                <span className="font-mono-tabular">-${discountAmount}</span>
              </div>
            )}
            <div className="pt-3 border-t border-slate-700 flex items-baseline justify-between">
              <span className="text-xs font-semibold text-slate-200">
                Estimated Monthly Total
              </span>
              <span className="text-2xl font-bold text-white font-mono-tabular">
                ${estimatedMonthlyTotal.toLocaleString()}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Private Campus Tour Booking Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-7 md:p-8 space-y-6">
          <div className="space-y-1 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <CalendarCheck className="w-4 h-4" />
              <span>Private Observation & Admissions Tour</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Reserve an In-Person Classroom Observation
            </h2>
            <p className="text-xs text-slate-500">
              Tours are hosted Tuesday through Thursday mornings so prospective families can observe the uninterrupted Montessori and Atelier work cycles in action.
            </p>
          </div>

          {submittedSuccess && (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Private Campus Tour Confirmed</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Your tour reservation has been logged with our Admissions Office. See your confirmed booking card below.
              </p>
            </div>
          )}

          <form onSubmit={handleTourSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Parent / Guardian Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Dr. Rachel Sterling"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rachel.sterling@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(415) 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-teal-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Child’s First Name & Current Age *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Leo (2 yrs 8 mos)"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Tour Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg font-mono-tabular focus:outline-none focus:border-teal-700"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Program of Interest
                </label>
                <select
                  value={childAgeGroup}
                  onChange={(e) => setChildAgeGroup(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
                >
                  {PROGRAMS_DATA.map((p) => (
                    <option key={p.id} value={p.title}>
                      {p.index}. {p.title} ({p.ageRangeLabel})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Preferred Morning Observation Window
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  '09:30 AM (Morning Work Cycle)',
                  '10:45 AM (Atelier & Courtyard Inquiry)',
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredTimeSlot(slot)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-left transition-colors cursor-pointer ${
                      preferredTimeSlot === slot
                        ? 'bg-teal-50 border-teal-700 text-teal-900 font-semibold'
                        : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Questions, Allergies, or Developmental Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Share any questions for our Pedagogical Director or Pediatric Nurse..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-teal-700"
              />
            </div>

            {formError && (
              <p className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {formError}
              </p>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer"
            >
              <span>Confirm Private Campus Tour Reservation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Confirmed Tour Bookings Ledger */}
          {tourBookings.length > 0 && (
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <p className="text-xs font-semibold text-slate-700">
                Your Scheduled Campus Visits ({tourBookings.length})
              </p>
              <div className="space-y-2.5">
                {tourBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-900">
                        {b.parentName} · Child: {b.childName}
                      </p>
                      <p className="text-slate-600">{b.childAgeGroup}</p>
                    </div>
                    <div className="text-left sm:text-right font-mono-tabular text-teal-800 font-semibold">
                      <p>{b.preferredDate}</p>
                      <p className="text-slate-500 font-normal">{b.preferredTimeSlot}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
