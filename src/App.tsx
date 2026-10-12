/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PageId,
  MilestoneRecord,
  MilestoneStatus,
  interfaceWellnessLogEntry,
  EducatorMessage,
  CampusEvent,
  TourBooking,
} from './types/system';
import {
  CHILD_PROFILES,
  INITIAL_MILESTONES,
  INITIAL_WELLNESS_LOGS,
  INITIAL_MESSAGES,
  INITIAL_EVENTS,
} from './data/mockSystemData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OverviewPage } from './pages/OverviewPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { MilestonesPage } from './pages/MilestonesPage';
import { WellnessPage } from './pages/WellnessPage';
import { FamilyPortalPage } from './pages/FamilyPortalPage';
import { AdmissionsPage } from './pages/AdmissionsPage';

const VALID_PAGES: PageId[] = [
  'overview',
  'programs',
  'milestones',
  'wellness',
  'family-portal',
  'admissions',
];

function getInitialPageFromUrl(): PageId {
  const hash = window.location.hash.replace('#/', '').replace('#', '');
  if (VALID_PAGES.includes(hash as PageId)) {
    return hash as PageId;
  }
  return 'overview';
}

export default function App() {
  const [activePage, setActivePage] = useState<PageId>(getInitialPageFromUrl);
  const [selectedChildId, setSelectedChildId] = useState<string>(CHILD_PROFILES[0].id);
  const [milestones, setMilestones] = useState<MilestoneRecord[]>(INITIAL_MILESTONES);
  const [wellnessLogs, setWellnessLogs] =
    useState<interfaceWellnessLogEntry[]>(INITIAL_WELLNESS_LOGS);
  const [messages, setMessages] = useState<EducatorMessage[]>(INITIAL_MESSAGES);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [preselectedTourProgram, setPreselectedTourProgram] = useState<string | undefined>(
    undefined
  );
  const [tourBookings, setTourBookings] = useState<TourBooking[]>([
    {
      id: 'tb-init-1',
      parentName: 'Dr. Marcus & Claire Vance',
      email: 'claire.vance@example.org',
      phone: '(415) 891-2240',
      childName: 'Julian Vance (Transition to Birch Preschool)',
      childAgeGroup: 'Birch Primary Atelier & Inquiry Studio',
      preferredDate: '2026-10-29',
      preferredTimeSlot: '09:30 AM (Morning Work Cycle)',
      notes: 'Interested in observing the morning phonetic and sensory stations.',
      submittedAt: 'Oct 08, 2026',
    },
  ]);

  // Synchronize URL hash with activePage for browser history support
  useEffect(() => {
    const handleHashChange = () => {
      const next = getInitialPageFromUrl();
      setActivePage(next);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setActivePage(page);
    window.location.hash = `/${page}`;
  };

  // Interactive Handlers across dedicated pages
  const handleToggleMilestoneStatus = (milestoneId: string) => {
    const statusOrder: MilestoneStatus[] = ['Upcoming', 'In Progress', 'Completed'];
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id !== milestoneId) return m;
        const nextIndex = (statusOrder.indexOf(m.status) + 1) % statusOrder.length;
        const nextStatus = statusOrder[nextIndex];
        return {
          ...m,
          status: nextStatus,
          observedDate: nextStatus === 'Completed' ? 'Oct 12, 2026' : m.observedDate,
        };
      })
    );
  };

  const handleAddMilestone = (newMilestone: Omit<MilestoneRecord, 'id'>) => {
    const created: MilestoneRecord = {
      ...newMilestone,
      id: `ms-${Date.now()}`,
    };
    setMilestones((prev) => [created, ...prev]);
  };

  const handleAddWellnessLog = (entry: Omit<interfaceWellnessLogEntry, 'id'>) => {
    const created: interfaceWellnessLogEntry = {
      ...entry,
      id: `wl-${Date.now()}`,
    };
    setWellnessLogs((prev) => [created, ...prev]);
  };

  const handleSendMessageReply = (messageId: string, replyContent: string) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId) return m;
        return {
          ...m,
          unread: false,
          replies: [
            ...m.replies,
            {
              id: `rep-${Date.now()}`,
              author: 'David Vance (Parent)',
              timestamp: 'Oct 12, 2026 · Just now',
              content: replyContent,
            },
          ],
        };
      })
    );
  };

  const handleToggleEventRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id !== eventId) return evt;
        const nextRegistered = !evt.registered;
        return {
          ...evt,
          registered: nextRegistered,
          spotsRemaining: nextRegistered
            ? Math.max(0, evt.spotsRemaining - 1)
            : evt.spotsRemaining + 1,
        };
      })
    );
  };

  const handleSubmitTourBooking = (
    booking: Omit<TourBooking, 'id' | 'submittedAt'>
  ) => {
    const created: TourBooking = {
      ...booking,
      id: `tb-${Date.now()}`,
      submittedAt: 'Oct 12, 2026',
    };
    setTourBookings((prev) => [created, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      <main className="flex-1">
        {activePage === 'overview' && (
          <OverviewPage onNavigate={handleNavigate} />
        )}

        {activePage === 'programs' && (
          <ProgramsPage
            onNavigate={handleNavigate}
            onSelectProgramForTour={(programTitle) =>
              setPreselectedTourProgram(programTitle)
            }
          />
        )}

        {activePage === 'milestones' && (
          <MilestonesPage
            childrenProfiles={CHILD_PROFILES}
            selectedChildId={selectedChildId}
            onSelectChild={setSelectedChildId}
            milestones={milestones}
            onToggleMilestoneStatus={handleToggleMilestoneStatus}
            onAddMilestone={handleAddMilestone}
          />
        )}

        {activePage === 'wellness' && (
          <WellnessPage
            childrenProfiles={CHILD_PROFILES}
            selectedChildId={selectedChildId}
            onSelectChild={setSelectedChildId}
            wellnessLogs={wellnessLogs}
            onAddWellnessLog={handleAddWellnessLog}
          />
        )}

        {activePage === 'family-portal' && (
          <FamilyPortalPage
            messages={messages}
            onSendMessageReply={handleSendMessageReply}
            events={events}
            onToggleEventRsvp={handleToggleEventRsvp}
          />
        )}

        {activePage === 'admissions' && (
          <AdmissionsPage
            preselectedProgramTitle={preselectedTourProgram}
            tourBookings={tourBookings}
            onSubmitTourBooking={handleSubmitTourBooking}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
