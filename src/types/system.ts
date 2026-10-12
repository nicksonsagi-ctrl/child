export type PageId =
  | 'overview'
  | 'programs'
  | 'milestones'
  | 'wellness'
  | 'family-portal'
  | 'admissions';

export interface ProgramItem {
  id: string;
  index: string;
  title: string;
  ageGroup: 'infant' | 'toddler' | 'preschool' | 'pre-k';
  ageRangeLabel: string;
  ratio: string;
  scheduleOptions: string[];
  summary: string;
  pedagogicalFocus: string[];
  dailyRhythm: { time: string; activity: string; purpose: string }[];
  tuitionMonthly: number;
  imageUrl?: string;
}

export interface ChildProfile {
  id: string;
  name: string;
  ageMonths: number;
  ageLabel: string;
  classroom: string;
  leadEducator: string;
  attendanceRate: string;
  nextPediatricCheckup: string;
  allergies: string;
  bloodType: string;
}

export type MilestoneDomain = 'Cognitive' | 'Language' | 'Motor' | 'Social-Emotional';
export type MilestoneStatus = 'Completed' | 'In Progress' | 'Upcoming';

export interface MilestoneRecord {
  id: string;
  childId: string;
  domain: MilestoneDomain;
  title: string;
  targetAgeMonths: number;
  status: MilestoneStatus;
  observedDate?: string;
  educatorNote: string;
}

export interface ImmunizationRecord {
  id: string;
  childId: string;
  vaccine: string;
  doseNumber: string;
  dateAdministered: string;
  nextDueDate: string;
  status: 'Verified' | 'Due Soon' | 'Scheduled';
  clinic: string;
}

export interface DailyMealPlan {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  breakfast: string;
  morningSnack: string;
  lunch: string;
  afternoonSnack: string;
  allergenNotice: string;
  caloriesKcal: number;
  proteinGrams: number;
}

export interfaceWellnessLogEntry {
  id: string;
  childId: string;
  date: string;
  time: string;
  category: 'Nutrition' | 'Rest' | 'Health Check' | 'Outdoor Play';
  summary: string;
  metricValue: string;
  recordedBy: string;
}

export interface EducatorMessage {
  id: string;
  senderName: string;
  senderRole: string;
  date: string;
  subject: string;
  preview: string;
  body: string;
  unread: boolean;
  replies: {
    id: string;
    author: string;
    timestamp: string;
    content: string;
  }[];
}

export interface CampusEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'Workshop' | 'Observation' | 'Community' | 'Health Screening';
  spotsRemaining: number;
  registered: boolean;
  description: string;
}

export interface TourBooking {
  id: string;
  parentName: string;
  email: string;
  phone: string;
  childName: string;
  childAgeGroup: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notes: string;
  submittedAt: string;
}
