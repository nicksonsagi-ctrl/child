import React, { useState } from 'react';
import { CampusEvent, EducatorMessage } from '../types/system';
import {
  MessageSquare,
  Calendar,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  FileText,
  Download,
} from 'lucide-react';

interface FamilyPortalPageProps {
  messages: EducatorMessage[];
  onSendMessageReply: (messageId: string, replyContent: string) => void;
  events: CampusEvent[];
  onToggleEventRsvp: (eventId: string) => void;
}

export const FamilyPortalPage: React.FC<FamilyPortalPageProps> = ({
  messages,
  onSendMessageReply,
  events,
  onToggleEventRsvp,
}) => {
  const [selectedMsgId, setSelectedMsgId] = useState<string>(messages[0]?.id || 'msg-1');
  const [replyText, setReplyText] = useState('');
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  const activeMessage =
    messages.find((m) => m.id === selectedMsgId) || messages[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeMessage) return;
    onSendMessageReply(activeMessage.id, replyText.trim());
    setReplyText('');
  };

  const handleDownloadResource = (title: string) => {
    setDownloadedDoc(title);
    setTimeout(() => setDownloadedDoc(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
      {/* Page Header */}
      <section className="border-b border-slate-200 pb-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-medium text-teal-800">
          <span>Dedicated Parent & Educator Communications Hub</span>
          <span aria-hidden="true">·</span>
          <span>Vance Family Account</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-slate-900 font-display tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          Family Portal, Faculty Dispatch & Campus Events
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Read longitudinal studio dispatches from lead educators, reply directly to classroom faculty, and manage family RSVPs for upcoming workshops and pediatric screenings.
        </p>
      </section>

      {/* Educator Dispatch Inbox & Thread Viewer */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-teal-800" />
            <h2 className="text-xl font-bold text-slate-900 font-display">
              Direct Classroom & Nurse Dispatches
            </h2>
          </div>
          <span className="text-xs font-mono-tabular text-slate-500">
            {messages.length} Active Threads
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-slate-200 rounded-xl overflow-hidden min-h-[480px]">
          {/* Thread List (4 Cols) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 divide-y divide-slate-200">
            {messages.map((msg) => {
              const isSelected = msg.id === activeMessage?.id;
              return (
                <button
                  key={msg.id}
                  type="button"
                  onClick={() => setSelectedMsgId(msg.id)}
                  className={`w-full text-left p-5 transition-colors cursor-pointer block space-y-2 ${
                    isSelected
                      ? 'bg-teal-50/70'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-900 truncate">
                      {msg.senderName}
                    </span>
                    <span className="font-mono-tabular shrink-0 text-[11px]">
                      {msg.date.split('·')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-teal-800 font-medium">
                    {msg.senderRole}
                  </p>
                  <p className="text-sm font-bold text-slate-900 font-display line-clamp-1">
                    {msg.subject}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {msg.preview}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Message Thread Body & Reply Composer (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 md:p-8 bg-white">
            {activeMessage && (
              <div className="space-y-6">
                <div className="border-b border-slate-200 pb-4 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <span>{activeMessage.senderRole}</span>
                    <span className="font-mono-tabular">{activeMessage.date}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                    {activeMessage.subject}
                  </h3>
                  <p className="text-xs font-semibold text-slate-700">
                    From: {activeMessage.senderName}
                  </p>
                </div>

                <div className="space-y-4 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                  {activeMessage.body}
                </div>

                {/* Replies List */}
                {activeMessage.replies.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                      Thread Replies ({activeMessage.replies.length})
                    </p>
                    {activeMessage.replies.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="font-semibold text-slate-900">
                            {rep.author}
                          </span>
                          <span className="font-mono-tabular">{rep.timestamp}</span>
                        </div>
                        <p className="text-sm text-slate-700">{rep.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reply Form */}
            <form
              onSubmit={handleSendReply}
              className="mt-8 pt-4 border-t border-slate-200 space-y-3"
            >
              <label className="block text-xs font-semibold text-slate-700">
                Reply to {activeMessage?.senderName}
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a direct reply or classroom observation note..."
                  className="flex-1 px-3.5 py-2 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:bg-white focus:border-teal-700"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Reply</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Campus Events & Parent Workshop RSVP Calendar */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <Calendar className="w-4 h-4" />
              <span>Interactive Campus Calendar</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              Upcoming Seminars, Open Ateliers & Screenings
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Click any event button to confirm or cancel your family seat reservation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-teal-800">{evt.category}</span>
                  <span className="font-mono-tabular">
                    {evt.spotsRemaining} Seats Available
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {evt.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5 font-mono-tabular text-slate-700 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.date} · {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleEventRsvp(evt.id)}
                  className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    evt.registered
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  {evt.registered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Seat Reserved (Cancel)</span>
                    </>
                  ) : (
                    <span>Reserve Family Seat</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Family Handbook & Pedagogical Guides */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Family Handbooks & Home Continuity Guides
            </h2>
            <p className="text-xs text-slate-500">
              Official campus policies, seasonal immunization forms, and Montessori home setup guides
            </p>
          </div>
          {downloadedDoc && (
            <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1.5 rounded-lg">
              Prepared PDF package: {downloadedDoc}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: '2026–2027 Luminara Family & Pedagogical Handbook',
              meta: 'PDF · 2.4 MB · Updated Sep 2026',
            },
            {
              title: 'Home Practical Life & Unhurried Autonomy Guide',
              meta: 'PDF · 1.8 MB · AMI Faculty Series',
            },
            {
              title: 'Pediatric Allergy Action Plan & Immunization Form',
              meta: 'PDF · 640 KB · Wellness Suite',
            },
          ].map((doc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-900">
                  <FileText className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                  <span>{doc.title}</span>
                </div>
                <p className="text-xs text-slate-500 font-mono-tabular">{doc.meta}</p>
              </div>
              <button
                type="button"
                onClick={() => handleDownloadResource(doc.title)}
                aria-label={`Download ${doc.title}`}
                className="p-2 text-slate-600 hover:text-teal-800 bg-white border border-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
