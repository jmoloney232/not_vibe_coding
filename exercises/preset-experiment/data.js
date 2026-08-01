// Shared content for the 4-preset + 1-custom experiment. Identical across
// all 5 versions — per the brief's requirement, only the visual system
// (CSS) differs between preset-a/b/c/d/custom. Deliberately a neutral
// product brief: a university course/assignment portal, chosen specifically
// because it is not fintech, not a dev tool, not a "focus/productivity"
// app, and not a consumer lifestyle brand — none of the four presets'
// apparent target category. If a preset's aesthetic still gets applied
// convincingly to this brief regardless of fit, that is itself evidence
// about how much of the preset's polish depends on real product fit vs.
// how much is decoration applied regardless of context.

const COURSEWORK_TERM = "Fall 2026";
const COURSEWORK_TODAY = "2026-09-08";

const COURSEWORK_COURSES = [
  {
    code: "CS 340",
    title: "Database Systems",
    instructor: "Prof. R. Alvarado",
    meeting: "MWF 10:00–10:50 AM, Kessler Hall 210",
    grade: "B+",
    nextDue: { title: "Project 2: Query Optimization", date: "2026-09-12" },
  },
  {
    code: "ENGL 210",
    title: "Modern Poetry",
    instructor: "Prof. K. Feinstein",
    meeting: "TTh 1:00–2:15 PM, Whitman 118",
    grade: "A−",
    nextDue: { title: "Close Reading: Bishop", date: "2026-09-10" },
  },
  {
    code: "STAT 215",
    title: "Applied Statistics",
    instructor: "Prof. D. Whitfield",
    meeting: "MWF 1:00–1:50 PM, Kessler Hall 104",
    grade: "B",
    nextDue: { title: "Problem Set 4", date: "2026-09-15" },
  },
  {
    code: "ART 150",
    title: "Drawing I",
    instructor: "Prof. M. Suarez",
    meeting: "TTh 9:00–11:50 AM, Fine Arts Studio 3",
    grade: "A",
    nextDue: { title: "Still Life Study", date: "2026-09-11" },
  },
];

const CS340_ASSIGNMENTS = [
  { title: "Project 1: Schema Design", due: "2026-08-29", status: "graded", grade: "94/100" },
  { title: "Problem Set 3: Normalization", due: "2026-09-05", status: "graded", grade: "88/100" },
  { title: "Project 2: Query Optimization", due: "2026-09-12", status: "open", grade: null,
    description: "Given the provided 40,000-row order/customer/product schema, rewrite the five slow queries in query_log.sql to run under 200ms each using indexing and query restructuring only — no schema changes. Submit your rewritten SQL and a one-paragraph explanation of each change." },
  { title: "Midterm Exam", due: "2026-10-08", status: "upcoming", grade: null },
];

function courseworkFormatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function courseworkDaysUntil(iso) {
  const target = new Date(iso + "T00:00:00");
  const today = new Date(COURSEWORK_TODAY + "T00:00:00");
  return Math.round((target - today) / 86400000);
}
