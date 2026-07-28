"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  BookOpen, Library, Trophy, Users, Sparkles, Star, Plus, Check,
  Flame, Award, ChevronRight, X, Loader2, BookMarked, Target,
  MessageSquare, Brain, TrendingUp, Crown, Medal,
  GraduationCap, KeyRound, ShieldCheck, Mail, User, Calendar, ArrowRight, LogOut,
  Camera, Edit3, UserPlus, UserCheck, Download, Heart, BarChart3,
  ClipboardList, RefreshCw, CheckCircle2, Search, Undo2
} from "lucide-react";
import * as XLSX from "xlsx";
import { installBookVerseStorage } from "@/lib/bookverseStorage";

installBookVerseStorage();

/* ---------------------------------------------------------------
   BOOKVERSE — design tokens
   ink navy world, paper-toned cards, moss/gold/coral accents.
--------------------------------------------------------------- */
const T = {
  ink: "#12162A",
  inkPanel: "#20140B",
  inkPanelLight: "#34210F",
  inkLine: "#5A3D1E",
  paper: "#F3E9D2",
  paperDim: "#C9BFA3",
  ink2: "#20263B",
  moss: "#4F7A5B",
  mossLight: "#6B9A78",
  gold: "#C9A130",
  goldLight: "#E0BE5A",
  coral: "#C1553D",
  blue: "#2F6690",
  plum: "#5B4B8A",
  woodDark: "#170D08",
  wood: "#2E1B10",
  woodMid: "#40260F",
  woodLight: "#5A3A1C",
  plank: "#251507",
  brass: "#A87B2E",
  brassLight: "#E4C066",
  stone: "#2A180C",
  stoneDark: "#170D08",
  stoneInk: "#EEDCA8",
  archMuted: "#C9B584",
};

const SPINE_COLORS = ["#6B3F2A", "#7A2E2E", "#3B5C42", "#8B6B2E", "#4A4A5F", "#5C4033", "#6E5233", "#3F5D5B"];

const FONT_STYLE = (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Crimson+Pro:ital,wght@0,400;0,500;0,600;1,400&family=Courier+Prime:wght@400;700&display=swap');
    .bv-display { font-family: 'Cormorant Garamond', serif; letter-spacing: 0.01em; }
    .bv-body { font-family: 'Crimson Pro', Georgia, serif; }
    .bv-mono { font-family: 'Courier Prime', monospace; }
    .bv-scroll::-webkit-scrollbar { height: 6px; width: 6px; }
    .bv-scroll::-webkit-scrollbar-thumb { background: #333A63; border-radius: 4px; }
    .spine:hover { transform: translateY(-10px); z-index: 30; }
    .spine { position: relative; transition: transform 0.18s ease; }
    .spine-popup {
      position: absolute; left: 0; top: -10px;
      transform: translateY(6px) scale(0.82);
      transform-origin: left bottom;
      opacity: 0; pointer-events: none;
      transition: opacity 0.16s ease, transform 0.16s ease;
      z-index: 40; white-space: nowrap;
    }
    .spine:hover .spine-popup { opacity: 1; transform: translateY(-6px) scale(1); }
    .bv-label { font-family: 'Cormorant Garamond', serif; font-style: italic; letter-spacing: 0.06em; }
    .bv-wood-bg {
      background-color: #2E1B10;
      background-image:
        repeating-linear-gradient(90deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 90px, rgba(0,0,0,0.22) 93px),
        repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0) 3px),
        radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.7) 100%);
    }
    .bv-shelf-board {
      background: linear-gradient(180deg, #5A3A1C 0%, #251507 55%, #170D08 100%);
      box-shadow: 0 6px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06);
      border-radius: 2px;
    }
    .bv-arch {
      background: radial-gradient(ellipse at 50% 25%, #3A2413 0%, #2A180C 55%, #170D08 100%);
      border-radius: 50% 50% 10px 10px / 22% 22% 4px 4px;
      box-shadow: 0 14px 34px rgba(0,0,0,0.65), inset 0 -8px 16px rgba(0,0,0,0.4), inset 0 3px 0 rgba(228,192,102,0.15);
      border: 1px solid #6B4E22;
    }
    .bv-engraved {
      color: #E4C066;
      text-shadow: 0 2px 2px rgba(0,0,0,0.7), 0 -1px 0 rgba(255,224,150,0.15);
    }
  `}</style>
);

/* ---------------------------------------------------------------
   MOCK CATALOG
--------------------------------------------------------------- */
const CATALOG = [
  { id: "b1", title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", pages: 304, year: 2020, publisher: "Canongate Books", isbn: "978-1-786-89237-9", rating: 4.2, ratingsCount: 1284, language: "English", ageCategory: "Adult", availableCopies: 3, blurb: "Between life and death lies a library, and within that library, the shelves go on forever. Every book provides a chance to try another version of the life you might have lived — a quietly devastating meditation on regret, possibility, and what it means to live a life worth living.", tag: "Popular" },
  { id: "b2", title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", genre: "Non-Fiction", pages: 443, year: 2011, publisher: "Harvill Secker", isbn: "978-0-062-31609-7", rating: 4.4, ratingsCount: 2201, language: "English", ageCategory: "Adult", availableCopies: 2, blurb: "A sweeping history of how Homo sapiens came to dominate the world, tracing the cognitive, agricultural, and scientific revolutions that took our species from foraging bands to a planet-spanning civilization — and asking what, if anything, we've gained along the way.", tag: "Trending" },
  { id: "b3", title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "Fantasy", pages: 662, year: 2007, publisher: "DAW Books", isbn: "978-0-756-40407-9", rating: 4.5, ratingsCount: 1876, language: "English", ageCategory: "Young Adult", availableCopies: 4, blurb: "Told in Kvothe's own voice, this is the tale of an arcanist, a musician, a thief, and a legend, recounting his own history for the first time — from a penniless orphan to the most notorious wizard his world has ever seen.", tag: "Classic" },
  { id: "b4", title: "Atomic Habits", author: "James Clear", genre: "Self-Help", pages: 320, year: 2018, publisher: "Avery", isbn: "978-0-735-21129-2", rating: 4.6, ratingsCount: 3120, language: "English", ageCategory: "Adult", availableCopies: 5, blurb: "Tiny changes, remarkable results. Clear lays out a practical framework for improving a little every day, showing how habits shape identity and how the smallest shifts in behavior compound into extraordinary outcomes over time.", tag: "Popular" },
  { id: "b5", title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", pages: 476, year: 2021, publisher: "Ballantine Books", isbn: "978-0-593-13520-4", rating: 4.7, ratingsCount: 1543, language: "English", ageCategory: "Adult", availableCopies: 2, blurb: "A lone astronaut wakes up on a spaceship with no memory of how he got there — and slowly realizes he might be humanity's last hope of averting an extinction-level threat. A tense, funny, science-heavy survival story.", tag: "Trending" },
  { id: "b6", title: "Circe", author: "Madeline Miller", genre: "Fiction", pages: 393, year: 2018, publisher: "Little, Brown and Company", isbn: "978-0-316-55684-7", rating: 4.5, ratingsCount: 1699, language: "English", ageCategory: "Adult", availableCopies: 3, blurb: "Banished to a lonely island for a crime against the gods, the witch Circe hones her powers, crosses paths with the great figures of Greek myth, and slowly discovers a strength entirely her own.", tag: "Classic" },
  { id: "b7", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", genre: "Non-Fiction", pages: 499, year: 2011, publisher: "Farrar, Straus and Giroux", isbn: "978-0-374-27563-1", rating: 4.3, ratingsCount: 2410, language: "English", ageCategory: "Adult", availableCopies: 2, blurb: "Nobel laureate Daniel Kahneman reveals the two systems that drive the way we think — one fast, intuitive, and emotional, the other slower and more deliberate — and how each shapes our judgments, biases, and choices.", tag: "Academic" },
  { id: "b8", title: "Mistborn: The Final Empire", author: "Brandon Sanderson", genre: "Fantasy", pages: 541, year: 2006, publisher: "Tor Books", isbn: "978-0-765-31178-8", rating: 4.5, ratingsCount: 1932, language: "English", ageCategory: "Young Adult", availableCopies: 3, blurb: "In a world where ash falls from the sky and the sun is dim, a street thief with a mysterious power is recruited into a crew plotting to overthrow the immortal emperor who has ruled for a thousand years.", tag: "Popular" },
  { id: "b9", title: "The Silent Patient", author: "Alex Michaelides", genre: "Mystery", pages: 336, year: 2019, publisher: "Celadon Books", isbn: "978-1-250-30169-7", rating: 4.1, ratingsCount: 2087, language: "English", ageCategory: "Adult", availableCopies: 1, blurb: "A woman shoots her husband five times and then never speaks again. A criminal psychotherapist becomes obsessed with treating her — and uncovering the truth behind her silence, in a novel that turns on a final, careful twist.", tag: "Trending" },
  { id: "b10", title: "Educated", author: "Tara Westover", genre: "Memoir", pages: 334, year: 2018, publisher: "Random House", isbn: "978-0-399-59050-4", rating: 4.6, ratingsCount: 2765, language: "English", ageCategory: "Adult", availableCopies: 4, blurb: "Raised by survivalist parents in the mountains of Idaho with no birth certificate and no classroom, Westover didn't set foot in school until she was seventeen — and went on to earn a PhD from Cambridge. A memoir about the cost, and the power, of education.", tag: "Classic" },
  { id: "b11", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", pages: 688, year: 1965, publisher: "Chilton Books", isbn: "978-0-441-01359-3", rating: 4.5, ratingsCount: 2954, language: "English", ageCategory: "Young Adult", availableCopies: 2, blurb: "On the desert planet Arrakis, House Atreides is drawn into a web of politics, prophecy, and ecology as young Paul Atreides is thrust toward a destiny that will reshape an empire — and a religion.", tag: "Classic" },
  { id: "b12", title: "The Body Keeps the Score", author: "Bessel van der Kolk, M.D.", genre: "Non-Fiction", pages: 445, year: 2014, publisher: "Viking", isbn: "978-0-670-78593-3", rating: 4.7, ratingsCount: 1988, language: "English", ageCategory: "Adult", availableCopies: 3, blurb: "A leading researcher on trauma explains how overwhelming experience reshapes both body and brain, and surveys the innovative treatments — from neurofeedback to yoga — that are helping survivors reclaim their lives.", tag: "Academic" },
];

const LANGUAGES = [...new Set(CATALOG.map((b) => b.language))];
const AGE_CATEGORIES = [...new Set(CATALOG.map((b) => b.ageCategory))];

const CHALLENGES = [
  { id: "c1", title: "Summer Reading Sprint", desc: "Finish 3 books before September.", goal: 3, unit: "books", points: 150, endDate: "Aug 31" },
  { id: "c2", title: "Genre Explorer", desc: "Read one book from 4 different genres.", goal: 4, unit: "genres", points: 200, endDate: "Sep 15" },
  { id: "c3", title: "Page Marathon", desc: "Read 1,000 pages this month.", goal: 1000, unit: "pages", points: 120, endDate: "Aug 20" },
  { id: "c4", title: "Weekly Reviewer", desc: "Write 5 thoughtful reviews.", goal: 5, unit: "reviews", points: 100, endDate: "Ongoing" },
];

const FRIENDS = [
  { name: "Amara K.", points: 2380 },
  { name: "Devon R.", points: 1990 },
  { name: "Priya S.", points: 1720 },
  { name: "Malik T.", points: 1510 },
  { name: "Sofia L.", points: 1140 },
];

const ACHIEVEMENT_DEFS = [
  { id: "a1", label: "First Page", desc: "Start your first book", icon: BookOpen, check: (s) => s.reading.length + s.read.length + s.want.length > 0 },
  { id: "a2", label: "Bookworm", desc: "Finish 3 books", icon: Library, check: (s) => s.read.length >= 3 },
  { id: "a3", label: "Critic", desc: "Write 3 reviews", icon: MessageSquare, check: (s) => s.read.filter(r => r.review).length >= 3 },
  { id: "a4", label: "Challenger", desc: "Join a challenge", icon: Target, check: (s, joined) => joined.length > 0 },
  { id: "a5", label: "On Fire", desc: "Hit a 3-day streak", icon: Flame, check: (s, j, streak) => streak >= 3 },
];

const GENRE_LIST = [...new Set(CATALOG.map((b) => b.genre))];

const FICTIONAL_STUDENTS = [
  { id: "s1", name: "Amara Kofi", topGenre: "Fantasy", bio: "Currently rereading the Mistborn trilogy for the third time.", points: 2380 },
  { id: "s2", name: "Devon Reyes", topGenre: "Sci-Fi", bio: "Hard sci-fi or nothing. Ask me about generation ships.", points: 1990 },
  { id: "s3", name: "Priya Sharma", topGenre: "Non-Fiction", bio: "Building a personal library one used bookstore at a time.", points: 1720 },
  { id: "s4", name: "Malik Thompson", topGenre: "Mystery", bio: "Guess the ending before chapter 10 — I dare you.", points: 1510 },
  { id: "s5", name: "Sofia Lindqvist", topGenre: "Memoir", bio: "Reading my way through a 'life stories' challenge this year.", points: 1140 },
];

function calcAge(dobStr) {
  if (!dobStr) return null;
  const dob = new Date(dobStr);
  if (isNaN(dob.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function seedStudentActivity() {
  const today = new Date();
  const iso = (daysAgo) => new Date(today.getTime() - daysAgo * 86400000).toISOString().slice(0, 10);
  return {
    shelves: {
      want: ["b6", "b2"],
      reading: [
        { id: "b5", pagesRead: 210, dateStarted: iso(9), expectedCompletion: iso(-5), notes: "The trans-solar propulsion chapters are dense — rereading with a notebook." },
        { id: "b8", pagesRead: 140, dateStarted: iso(4), expectedCompletion: iso(-10), notes: "" },
      ],
      paused: [
        { id: "b11", pagesRead: 95, dateStarted: iso(21), notes: "Set aside for midterms — want to come back with more focus." },
      ],
      dnf: [
        { id: "b7", pagesRead: 60, dateStarted: iso(40), dateStopped: iso(33), notes: "Too dense for a bus commute — might try the audiobook instead." },
      ],
      read: [
        { id: "b1", rating: 5, review: "Made me think about every road not taken." },
        { id: "b4", rating: 4, review: "Practical and easy to actually apply." },
        { id: "b9", rating: 4, review: "" },
      ],
    },
    points: 245,
    streak: 4,
    joinedChallenges: ["c1"],
    challengeProgress: { c1: 2 },
    favoriteGenres: ["Fantasy", "Sci-Fi"],
    favoriteBooks: ["b3", "b1"],
    bio: "Trying to read outside my comfort zone this year — mostly fantasy, sneaking in some sci-fi.",
    annualGoal: 24,
    followingIds: ["s1", "s3"],
    avatar: null,
  };
}

const PROFILE_KEY = (email) => `profile:${email.trim().toLowerCase()}`;

async function loadProfileFromStorage(email) {
  try {
    const res = await window.storage.get(PROFILE_KEY(email), false);
    return res ? JSON.parse(res.value) : null;
  } catch (e) {
    return null;
  }
}

async function saveProfileToStorage(email, data) {
  try {
    await window.storage.set(PROFILE_KEY(email), JSON.stringify(data), false);
    return true;
  } catch (e) {
    return false;
  }
}

const LEDGER_KEY = "borrow_ledger";
const DIRECTORY_KEY = "directory_index";
const LOAN_DAYS = 14;
const RENEWAL_DAYS = 7;
const MAX_RENEWALS = 2;

function normalizeRecord(r) {
  if (r.status) return { renewalStatus: null, renewalCount: 0, approvedAt: null, dueDate: null, ...r };
  return {
    ...r,
    status: r.returnedAt ? "Returned" : "Approved",
    requestedAt: r.borrowedAt || new Date().toISOString(),
    approvedAt: r.borrowedAt || null,
    dueDate: r.borrowedAt ? new Date(new Date(r.borrowedAt).getTime() + LOAN_DAYS * 86400000).toISOString() : null,
    renewalStatus: null,
    renewalCount: 0,
  };
}

async function loadLedger() {
  try {
    const res = await window.storage.get(LEDGER_KEY, true);
    const list = res ? JSON.parse(res.value) : [];
    return list.map(normalizeRecord);
  } catch (e) {
    return [];
  }
}

async function saveLedger(list) {
  try {
    await window.storage.set(LEDGER_KEY, JSON.stringify(list), true);
    return true;
  } catch (e) {
    return false;
  }
}

async function updateLedgerRecord(id, patch) {
  const list = await loadLedger();
  const idx = list.findIndex((r) => r.id === id);
  if (idx >= 0) list[idx] = { ...list[idx], ...patch };
  await saveLedger(list);
  return list;
}

async function requestBorrowRecord(student, book) {
  const list = await loadLedger();
  list.push({
    id: `${student.email}-${book.id}-${Date.now()}`,
    studentName: student.name,
    studentEmail: student.email,
    bookId: book.id,
    bookTitle: book.title,
    genre: book.genre,
    status: "Pending",
    requestedAt: new Date().toISOString(),
    approvedAt: null,
    dueDate: null,
    returnedAt: null,
    renewalStatus: null,
    renewalCount: 0,
  });
  await saveLedger(list);
  return list;
}

async function approveRequestRecord(id) {
  const dueDate = new Date(Date.now() + LOAN_DAYS * 86400000).toISOString();
  return updateLedgerRecord(id, { status: "Approved", approvedAt: new Date().toISOString(), dueDate });
}

async function approveRenewalRecord(id) {
  const list = await loadLedger();
  const rec = list.find((r) => r.id === id);
  if (!rec) return list;
  const newDue = new Date(new Date(rec.dueDate || Date.now()).getTime() + RENEWAL_DAYS * 86400000).toISOString();
  return updateLedgerRecord(id, { dueDate: newDue, renewalStatus: null, renewalCount: (rec.renewalCount || 0) + 1 });
}

function seedLedger() {
  const now = Date.now();
  const day = 86400000;
  const iso = (ms) => new Date(now + ms).toISOString();
  return [
    { id: "seed1", studentName: "Amara Kofi", studentEmail: "amara.kofi@gmail.com", bookId: "b3", bookTitle: "The Name of the Wind", genre: "Fantasy", status: "Returned", requestedAt: iso(-11 * day), approvedAt: iso(-10 * day), dueDate: iso(-10 * day + LOAN_DAYS * day), returnedAt: iso(-2 * day), renewalStatus: null, renewalCount: 0 },
    { id: "seed2", studentName: "Devon Reyes", studentEmail: "devon.reyes@gmail.com", bookId: "b11", bookTitle: "Dune", genre: "Sci-Fi", status: "Approved", requestedAt: iso(-7 * day), approvedAt: iso(-6 * day), dueDate: iso(1 * day), returnedAt: null, renewalStatus: "Requested", renewalCount: 0 },
    { id: "seed3", studentName: "Priya Sharma", studentEmail: "priya.sharma@gmail.com", bookId: "b2", bookTitle: "Sapiens: A Brief History of Humankind", genre: "Non-Fiction", status: "Returned", requestedAt: iso(-15 * day), approvedAt: iso(-14 * day), dueDate: iso(-14 * day + LOAN_DAYS * day), returnedAt: iso(-8 * day), renewalStatus: null, renewalCount: 0 },
    { id: "seed4", studentName: "Malik Thompson", studentEmail: "malik.thompson@gmail.com", bookId: "b9", bookTitle: "The Silent Patient", genre: "Mystery", status: "Approved", requestedAt: iso(-4 * day), approvedAt: iso(-3 * day), dueDate: iso(-1 * day), returnedAt: null, renewalStatus: null, renewalCount: 0 },
    { id: "seed5", studentName: "Sofia Lindqvist", studentEmail: "sofia.lindqvist@gmail.com", bookId: "b10", bookTitle: "Educated", genre: "Memoir", status: "Returned", requestedAt: iso(-21 * day), approvedAt: iso(-20 * day), dueDate: iso(-20 * day + LOAN_DAYS * day), returnedAt: iso(-15 * day), renewalStatus: null, renewalCount: 0 },
    { id: "seed6", studentName: "Malik Thompson", studentEmail: "malik.thompson@gmail.com", bookId: "b5", bookTitle: "Project Hail Mary", genre: "Sci-Fi", status: "Pending", requestedAt: iso(-0.5 * day), approvedAt: null, dueDate: null, returnedAt: null, renewalStatus: null, renewalCount: 0 },
  ];
}

async function loadDirectory() {
  try {
    const res = await window.storage.get(DIRECTORY_KEY, true);
    return res ? JSON.parse(res.value) : [];
  } catch (e) {
    return [];
  }
}

async function updateDirectoryEntry(entry) {
  try {
    const list = await loadDirectory();
    const idx = list.findIndex((x) => x.email === entry.email);
    if (idx >= 0) list[idx] = { ...list[idx], ...entry };
    else list.push(entry);
    await window.storage.set(DIRECTORY_KEY, JSON.stringify(list), true);
  } catch (e) {}
}

/* ---------------------------------------------------------------
   AI HELPERS — calls our own /api/bookverse-ai route, which holds
   the Anthropic API key server-side (see that route for setup).
--------------------------------------------------------------- */
async function callClaude(prompt, system) {
  const res = await fetch("/api/bookverse-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, system }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  const text = (data.content || []).map((b) => (b.type === "text" ? b.text : "")).join("\n");
  return text;
}

async function generateSummary(book) {
  const system = "You are a warm, sharp reading companion for students. Never reproduce copyrighted text verbatim — describe themes and ideas in your own words only.";
  const prompt = `Give a spoiler-light, student-friendly summary of the book "${book.title}" by ${book.author} (genre: ${book.genre}). Cover: the core premise, 2-3 major themes, and why it's worth reading. Keep it under 180 words, plain prose, no headers.`;
  return callClaude(prompt, system);
}

async function generateQuiz(book) {
  const system = "You generate short comprehension/discussion quizzes about books for students. Respond with ONLY valid JSON, no markdown fences, no preamble. Never reproduce copyrighted text verbatim.";
  const prompt = `Create a 5-question multiple choice quiz about the book "${book.title}" by ${book.author} (genre: ${book.genre}, premise: ${book.blurb}). Mix comprehension and thematic-discussion questions suitable even for someone who hasn't read it yet (general knowledge / themes / what-would-happen style is fine if plot detail is uncertain). Respond with ONLY this JSON shape:
{"questions":[{"question":"string","options":["string","string","string","string"],"answerIndex":0}]}`;
  const raw = await callClaude(prompt, system);
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

async function generateRecommendations(readBooks, favoriteGenres) {
  const system = "You are a knowledgeable student librarian giving book recommendations. Respond with ONLY valid JSON, no markdown fences.";
  const prompt = `A student has read: ${readBooks.map(b => `"${b.title}" by ${b.author}`).join(", ") || "nothing yet"}. They gravitate toward these genres: ${favoriteGenres.join(", ") || "no strong preference yet"}. Recommend 3 real, well-known books (not already in that list) they'd likely enjoy, with a one-sentence reason each. Respond with ONLY this JSON shape:
{"recommendations":[{"title":"string","author":"string","reason":"string"}]}`;
  const raw = await callClaude(prompt, system);
  const clean = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

/* ---------------------------------------------------------------
   SMALL UI PRIMITIVES
--------------------------------------------------------------- */
function Panel({ children, style, className = "" }) {
  return (
    <div
      className={`rounded-xl ${className}`}
      style={{
        background: `linear-gradient(180deg, ${T.inkPanelLight} 0%, ${T.inkPanel} 100%)`,
        border: `1px solid ${T.inkLine}`,
        borderTop: `1px solid rgba(200,166,90,0.35)`,
        boxShadow: "0 4px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(228,192,102,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Pill({ children, color = T.moss }) {
  return (
    <span className="bv-mono text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}>
      {children}
    </span>
  );
}

function ProgressBar({ value, max, color = T.moss }) {
  const pct = Math.min(100, Math.round((value / Math.max(1, max)) * 100));
  return (
    <div className="w-full rounded-full h-2" style={{ background: T.inkLine }}>
      <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function Spine({ book, onClick, index }) {
  const color = SPINE_COLORS[index % SPINE_COLORS.length];
  const width = 40 + (book.pages % 6) * 6;
  const height = 172 + (book.pages % 4) * 8;
  const foilLight = index % 3 === 0 ? T.brassLight : index % 3 === 1 ? "#D8CFAE" : "#C9A130";

  return (
    <button
      onClick={onClick}
      className="spine bv-scroll flex-shrink-0 flex flex-col items-center text-left focus:outline-none focus:ring-2"
      style={{
        width,
        height,
        borderRadius: "1px 3px 3px 1px",
        background: `linear-gradient(100deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.06) 14%, rgba(0,0,0,0) 45%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.32) 88%, rgba(0,0,0,0.5) 100%), ${color}`,
        boxShadow: "3px 0 6px rgba(0,0,0,0.5), inset 1px 0 0 rgba(255,255,255,0.18), inset -2px 0 3px rgba(0,0,0,0.35)",
        ringColor: T.gold,
      }}
      title={book.title}
    >
      <div
        className="spine-popup rounded-md px-3 py-2 text-center"
        style={{ background: T.woodDark, border: `1px solid ${T.brass}`, boxShadow: "0 8px 18px rgba(0,0,0,0.6)", maxWidth: 180 }}
      >
        <div className="bv-display font-semibold leading-tight" style={{ color: T.brassLight, fontSize: 15 }}>{book.title}</div>
        <div className="bv-label text-[11px] mt-0.5" style={{ color: T.archMuted }}>{book.author}</div>
      </div>

      <div
        className="w-full flex-shrink-0"
        style={{
          height: 7,
          background: "repeating-linear-gradient(90deg, #EAE1C4 0px, #D9CDA6 1.5px, #EAE1C4 3px)",
          borderBottom: "1px solid rgba(0,0,0,0.35)",
          borderRadius: "1px 3px 0 0",
        }}
      />

      <div className="w-full flex-shrink-0" style={{ height: 2, background: foilLight, opacity: 0.75, marginTop: 3 }} />

      <div className="flex-1 flex items-center justify-center w-full overflow-hidden py-2">
        <div
          className="bv-display font-semibold leading-tight text-center"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            maxHeight: height - 60,
            overflow: "hidden",
            fontSize: width > 55 ? 13 : 12,
            letterSpacing: "0.02em",
            color: foilLight,
            textShadow: "0 1px 0 rgba(0,0,0,0.55), 0 -1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {book.title}
        </div>
      </div>

      <div
        className="bv-label flex-shrink-0 w-full text-center overflow-hidden"
        style={{ maxHeight: 46, color: "rgba(255,255,255,0.75)", fontSize: 10, writingMode: "vertical-rl", transform: "rotate(180deg)", padding: "2px 0" }}
      >
        {book.author}
      </div>

      <div className="w-full flex-shrink-0" style={{ height: 2, background: foilLight, opacity: 0.75, marginBottom: 3 }} />

      <div className="w-full flex-shrink-0 flex items-center justify-center" style={{ height: 10 }}>
        <span className="bv-mono" style={{ fontSize: 8, color: "rgba(255,255,255,0.55)" }}>{book.year}</span>
      </div>
    </button>
  );
}

function Shelf({ books, onSelect, label, empty }) {
  return (
    <div className="mb-8">
      {label && <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>{label}</div>}
      {books.length === 0 ? (
        <div className="text-sm bv-body italic py-6 text-center rounded-lg" style={{ color: T.paperDim, border: `1px dashed ${T.inkLine}` }}>
          {empty || "Nothing here yet."}
        </div>
      ) : (
        <>
          <div className="flex gap-1.5 items-end overflow-x-auto bv-scroll pb-0 pt-12">
            {books.map((b, i) => <Spine key={b.id} book={b} index={i} onClick={() => onSelect(b)} />)}
          </div>
          <div className="bv-shelf-board h-3.5 mb-3" />
        </>
      )}
    </div>
  );
}

function getAvailability(book, ledger) {
  const checkedOut = ledger.filter((r) => r.bookId === book.id && r.status === "Approved" && !r.returnedAt).length;
  const availableNow = Math.max(0, book.availableCopies - checkedOut);
  return { checkedOut, availableNow, status: availableNow > 0 ? "Available" : "Checked Out" };
}

function CoverThumb({ book, index, size = "md" }) {
  const color = SPINE_COLORS[index % SPINE_COLORS.length];
  const dims = size === "sm" ? { w: 52, h: 74 } : { w: 76, h: 108 };
  return (
    <div
      className="flex-shrink-0 flex flex-col items-center justify-between rounded-sm p-1.5 text-center"
      style={{
        width: dims.w, height: dims.h,
        background: `linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,0.35) 100%), ${color}`,
        border: `1px solid rgba(200,166,90,0.4)`,
        boxShadow: "0 3px 8px rgba(0,0,0,0.45)",
      }}
    >
      <div style={{ height: 2, width: "60%", background: T.brassLight, opacity: 0.7 }} />
      <div
        className="bv-display font-semibold leading-tight overflow-hidden"
        style={{ color: T.brassLight, fontSize: size === "sm" ? 9 : 11, textShadow: "0 1px 0 rgba(0,0,0,0.5)", maxHeight: dims.h - 30 }}
      >
        {book.title}
      </div>
      <div style={{ height: 2, width: "60%", background: T.brassLight, opacity: 0.7 }} />
    </div>
  );
}

function CatalogCard({ book, index, availability, onSelect }) {
  return (
    <button onClick={onSelect} className="text-left rounded-lg p-3 flex gap-3 transition-colors" style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
      <CoverThumb book={book} index={index} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold truncate">{book.title}</div>
        <div className="text-[11px] mb-1 truncate" style={{ color: T.paperDim }}>{book.author}</div>
        <div className="flex flex-wrap gap-1 mb-1.5">
          <Pill color={T.blue}>{book.genre}</Pill>
          <Pill color={availability.status === "Available" ? T.moss : T.coral}>{availability.status}</Pill>
        </div>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 bv-mono text-[10px]" style={{ color: T.paperDim }}>
          <span className="flex items-center gap-0.5"><Star size={9} fill={T.gold} color={T.gold} /> {book.rating}</span>
          <span>{book.year}</span>
          <span>{book.pages}pp</span>
          <span>{book.language}</span>
          <span>{availability.availableNow}/{book.availableCopies} copies</span>
        </div>
      </div>
    </button>
  );
}

function FilterBar({ filters, setFilters, resultCount }) {
  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const clear = () => setFilters({ q: "", genre: "All", language: "All", availability: "All", minRating: 0, minYear: "", maxYear: "", minPages: "", maxPages: "" });
  const active = filters.q || filters.genre !== "All" || filters.language !== "All" || filters.availability !== "All" || filters.minRating > 0 || filters.minYear || filters.maxYear || filters.minPages || filters.maxPages;

  const selectStyle = { background: T.inkPanelLight, border: `1px solid ${T.inkLine}`, color: T.paper };
  const inputStyle = { background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper, width: 74 };

  return (
    <Panel className="p-3 mb-5">
      <div className="flex items-center gap-2 mb-3">
        <Search size={14} color={T.paperDim} className="flex-shrink-0" />
        <input
          value={filters.q} onChange={(e) => set("q", e.target.value)}
          placeholder="Search by title or author..."
          className="bg-transparent outline-none text-sm w-full"
          style={{ color: T.paper }}
        />
      </div>
      <div className="flex flex-wrap gap-2 items-center text-xs">
        <select value={filters.genre} onChange={(e) => set("genre", e.target.value)} className="px-2 py-1.5 rounded" style={selectStyle}>
          <option value="All">All genres</option>
          {GENRE_LIST.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <select value={filters.language} onChange={(e) => set("language", e.target.value)} className="px-2 py-1.5 rounded" style={selectStyle}>
          <option value="All">All languages</option>
          {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>
        <select value={filters.availability} onChange={(e) => set("availability", e.target.value)} className="px-2 py-1.5 rounded" style={selectStyle}>
          <option value="All">Any availability</option>
          <option value="Available">Available now</option>
          <option value="Checked Out">Checked out</option>
        </select>
        <select value={filters.minRating} onChange={(e) => set("minRating", Number(e.target.value))} className="px-2 py-1.5 rounded" style={selectStyle}>
          <option value={0}>Any rating</option>
          <option value={4.5}>4.5+ stars</option>
          <option value={4}>4.0+ stars</option>
          <option value={3.5}>3.5+ stars</option>
        </select>

        <span className="flex items-center gap-1" style={{ color: T.paperDim }}>
          Pages
          <input type="number" placeholder="min" value={filters.minPages} onChange={(e) => set("minPages", e.target.value)} className="px-2 py-1.5 rounded bv-mono text-xs" style={inputStyle} />
          –
          <input type="number" placeholder="max" value={filters.maxPages} onChange={(e) => set("maxPages", e.target.value)} className="px-2 py-1.5 rounded bv-mono text-xs" style={inputStyle} />
        </span>

        <span className="flex items-center gap-1" style={{ color: T.paperDim }}>
          Year
          <input type="number" placeholder="min" value={filters.minYear} onChange={(e) => set("minYear", e.target.value)} className="px-2 py-1.5 rounded bv-mono text-xs" style={inputStyle} />
          –
          <input type="number" placeholder="max" value={filters.maxYear} onChange={(e) => set("maxYear", e.target.value)} className="px-2 py-1.5 rounded bv-mono text-xs" style={inputStyle} />
        </span>

        {active && (
          <button onClick={clear} className="flex items-center gap-1 px-2 py-1.5 rounded" style={{ color: T.coral }}>
            <X size={12} /> Clear
          </button>
        )}

        {active && <span className="bv-mono ml-auto" style={{ color: T.paperDim }}>{resultCount} result{resultCount === 1 ? "" : "s"}</span>}
      </div>
    </Panel>
  );
}

/* ---------------------------------------------------------------
   MAIN APP
--------------------------------------------------------------- */
function BookVerseApp({ user, onSignOut, onSaveProfile }) {
  const [tab, setTab] = useState("discover");
  const [shelves, setShelves] = useState(() => ({
    want: user.shelves?.want || [],
    reading: user.shelves?.reading || [],
    paused: user.shelves?.paused || [],
    dnf: user.shelves?.dnf || [],
    read: user.shelves?.read || [],
  }));
  const [favoriteBooks, setFavoriteBooks] = useState(user.favoriteBooks || []);
  const [joinedChallenges, setJoinedChallenges] = useState(user.joinedChallenges || []);
  const [challengeProgress, setChallengeProgress] = useState(user.challengeProgress || {});
  const [points, setPoints] = useState(user.points || 0);
  const [streak, setStreak] = useState(user.streak || 0);
  const [loggedToday, setLoggedToday] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [toast, setToast] = useState(null);
  const [aiCache, setAiCache] = useState({});
  const [aiLoading, setAiLoading] = useState(null);
  const [aiError, setAiError] = useState(null);
  const [recs, setRecs] = useState(null);
  const [recsLoading, setRecsLoading] = useState(false);

  const [catalogLedger, setCatalogLedger] = useState([]);
  useEffect(() => {
    (async () => {
      let list = await loadLedger();
      if (list.length === 0) { list = seedLedger(); await saveLedger(list); }
      setCatalogLedger(list);
    })();
  }, []);

  const [filters, setFilters] = useState({ q: "", genre: "All", language: "All", availability: "All", minRating: 0, minYear: "", maxYear: "", minPages: "", maxPages: "" });
  const filtersActive = filters.q || filters.genre !== "All" || filters.language !== "All" || filters.availability !== "All" || filters.minRating > 0 || filters.minYear || filters.maxYear || filters.minPages || filters.maxPages;

  const filteredCatalog = useMemo(() => {
    return CATALOG.filter((b) => {
      const av = getAvailability(b, catalogLedger);
      if (filters.q) {
        const q = filters.q.toLowerCase();
        if (!b.title.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q)) return false;
      }
      if (filters.genre !== "All" && b.genre !== filters.genre) return false;
      if (filters.language !== "All" && b.language !== filters.language) return false;
      if (filters.availability !== "All" && av.status !== filters.availability) return false;
      if (filters.minRating > 0 && b.rating < filters.minRating) return false;
      if (filters.minYear && b.year < Number(filters.minYear)) return false;
      if (filters.maxYear && b.year > Number(filters.maxYear)) return false;
      if (filters.minPages && b.pages < Number(filters.minPages)) return false;
      if (filters.maxPages && b.pages > Number(filters.maxPages)) return false;
      return true;
    });
  }, [filters, catalogLedger]);

  const [avatar, setAvatar] = useState(user.avatar || null);
  const [favoriteGenres, setFavoriteGenres] = useState(user.favoriteGenres || []);
  const [bio, setBio] = useState(user.bio || "");
  const [annualGoal, setAnnualGoal] = useState(user.annualGoal || 12);
  const [followingIds, setFollowingIds] = useState(user.followingIds || []);
  const [savingProfile, setSavingProfile] = useState(false);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  const addPoints = useCallback((n, reason) => {
    setPoints((p) => p + n);
    showToast(`+${n} pts · ${reason}`);
  }, [showToast]);

  const bookById = useCallback((id) => CATALOG.find((b) => b.id === id), []);

  const saveProfileSnapshot = async () => {
    setSavingProfile(true);
    await onSaveProfile({
      shelves, joinedChallenges, challengeProgress, points, streak,
      avatar, favoriteGenres, favoriteBooks, bio, annualGoal, followingIds,
    });
    await updateDirectoryEntry({
      name: user.name, email: user.email, role: user.role,
      points, booksCompleted: shelves.read.length, streak,
    });
    setSavingProfile(false);
    showToast("Saved to your library card");
  };

  const isOnShelf = (id) => {
    if (shelves.want.includes(id)) return "want";
    if (shelves.reading.some((r) => r.id === id)) return "reading";
    if (shelves.paused.some((r) => r.id === id)) return "paused";
    if (shelves.dnf.some((r) => r.id === id)) return "dnf";
    if (shelves.read.some((r) => r.id === id)) return "read";
    return null;
  };

  const todayISO = () => new Date().toISOString().slice(0, 10);

  const moveToShelf = (book, target) => {
    setShelves((s) => {
      const existing = s.reading.find((r) => r.id === book.id) || s.paused.find((r) => r.id === book.id) || s.dnf.find((r) => r.id === book.id);
      const clean = {
        want: s.want.filter((id) => id !== book.id),
        reading: s.reading.filter((r) => r.id !== book.id),
        paused: s.paused.filter((r) => r.id !== book.id),
        dnf: s.dnf.filter((r) => r.id !== book.id),
        read: s.read.filter((r) => r.id !== book.id),
      };
      const base = existing || { id: book.id, pagesRead: 0, dateStarted: todayISO(), expectedCompletion: "", notes: "" };
      if (target === "want") clean.want.push(book.id);
      if (target === "reading") clean.reading.push({ ...base, id: book.id, dateStarted: base.dateStarted || todayISO() });
      if (target === "paused") clean.paused.push({ ...base, id: book.id });
      if (target === "dnf") clean.dnf.push({ ...base, id: book.id, dateStopped: todayISO() });
      if (target === "read") clean.read.push({ id: book.id, rating: 0, review: "" });
      return clean;
    });
    if (target === "reading") { addPoints(5, "started a book"); }
    if (target === "read") { addPoints(50, "finished a book"); }
    if (target === "want") showToast("Added to Want to Read");
    if (target === "paused") showToast("Paused");
    if (target === "dnf") showToast("Marked as did not finish");
  };

  const updateShelfRecordField = (id, field, value) => {
    setShelves((s) => ({
      ...s,
      reading: s.reading.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      paused: s.paused.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
      dnf: s.dnf.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    }));
  };

  const toggleFavoriteBook = (id) => setFavoriteBooks((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const finishFromReading = (id) => {
    const book = bookById(id);
    moveToShelf(book, "read");
  };

  const rateAndReview = (id, rating, review) => {
    setShelves((s) => ({
      ...s,
      read: s.read.map((r) => (r.id === id ? { ...r, rating, review } : r)),
    }));
  };

  const submitReview = (id, review) => {
    if (review.trim().length > 3) addPoints(15, "wrote a review");
  };

  const joinChallenge = (id) => {
    if (joinedChallenges.includes(id)) return;
    setJoinedChallenges((j) => [...j, id]);
    setChallengeProgress((p) => ({ ...p, [id]: 0 }));
    addPoints(10, "joined a challenge");
  };

  const logToday = () => {
    if (loggedToday) return;
    setStreak((s) => s + 1);
    setLoggedToday(true);
    addPoints(8, "logged today's reading");
  };

  const unlockedAchievements = useMemo(
    () => ACHIEVEMENT_DEFS.filter((a) => a.check(shelves, joinedChallenges, streak)),
    [shelves, joinedChallenges, streak]
  );

  const profileStats = useMemo(() => {
    const booksCompleted = shelves.read.length;
    const currentlyReading = shelves.reading.length;
    const totalPagesRead =
      shelves.reading.reduce((sum, r) => sum + (r.pagesRead || 0), 0) +
      shelves.read.reduce((sum, r) => { const b = bookById(r.id); return sum + (b ? b.pages : 0); }, 0);
    const reviewsWritten = shelves.read.filter((r) => r.review && r.review.trim().length > 0).length;
    return { booksCompleted, currentlyReading, totalPagesRead, reviewsWritten };
  }, [shelves, bookById]);

  const handleAvatarUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const toggleGenre = (g) => setFavoriteGenres((fg) => (fg.includes(g) ? fg.filter((x) => x !== g) : [...fg, g]));
  const toggleFollow = (id) => setFollowingIds((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const bioWordCount = bio.trim() ? bio.trim().split(/\s+/).length : 0;

  const exportProfileExcel = () => {
    const rows = [
      ["Field", "Value"],
      ["Name", user.name],
      ["Email", user.email],
      ["Role", user.role],
      ["Date of Birth", user.dob || ""],
      ["Bio", bio],
      ["Favourite Genres", favoriteGenres.join(", ")],
      ["Books Completed", profileStats.booksCompleted],
      ["Books Currently Being Read", profileStats.currentlyReading],
      ["Total Pages Read", profileStats.totalPagesRead],
      ["Reading Streak (days)", streak],
      ["Reviews Written", profileStats.reviewsWritten],
      ["Points Earned", points],
      ["Achievements Unlocked", `${unlockedAchievements.length} / ${ACHIEVEMENT_DEFS.length}`],
      ["Annual Reading Goal", annualGoal],
    ];
    const ws = XLSX.utils.aoa_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "BookVerse Profile");
    XLSX.writeFile(wb, `${user.name.replace(/\s+/g, "_")}_bookverse_profile.xlsx`);
  };

  const runAI = async (book, kind) => {
    const key = `${book.id}-${kind}`;
    setAiLoading(key);
    setAiError(null);
    try {
      let result;
      if (kind === "summary") result = await generateSummary(book);
      if (kind === "quiz") result = await generateQuiz(book);
      setAiCache((c) => ({ ...c, [key]: result }));
      if (kind === "quiz") addPoints(10, "generated a quiz");
    } catch (e) {
      setAiError(e.message || "Couldn't reach the AI right now — try again in a moment.");
    } finally {
      setAiLoading(null);
    }
  };

  const runRecs = async () => {
    setRecsLoading(true);
    setAiError(null);
    try {
      const readBooks = shelves.read.map((r) => bookById(r.id)).filter(Boolean);
      const genreCounts = {};
      readBooks.forEach((b) => { genreCounts[b.genre] = (genreCounts[b.genre] || 0) + 1; });
      const topGenres = Object.entries(genreCounts).sort((a, b) => b[1] - a[1]).map(([g]) => g).slice(0, 3);
      const result = await generateRecommendations(readBooks, topGenres.length ? topGenres : [...new Set(CATALOG.map(b=>b.genre))].slice(0,2));
      setRecs(result.recommendations || []);
    } catch (e) {
      setAiError(e.message || "Couldn't generate recommendations right now — try again shortly.");
    } finally {
      setRecsLoading(false);
    }
  };

  const NAV =
    user.role === "Student"
      ? [
          { id: "discover", label: "Discover", icon: Sparkles },
          { id: "shelves", label: "My Shelves", icon: Library },
          { id: "challenges", label: "Challenges", icon: Trophy },
          { id: "community", label: "Community", icon: Users },
          { id: "studio", label: "AI Studio", icon: Brain },
          { id: "profile", label: "Profile", icon: User },
        ]
      : user.role === "Librarian"
      ? [
          { id: "discover", label: "Discover", icon: Sparkles },
          { id: "shelves", label: "My Shelves", icon: Library },
          { id: "challenges", label: "Challenges", icon: Trophy },
          { id: "community", label: "Community", icon: Users },
          { id: "records", label: "Records", icon: ClipboardList },
        ]
      : [
          { id: "discover", label: "Discover", icon: Sparkles },
          { id: "community", label: "Community", icon: Users },
          { id: "records", label: "Records", icon: ShieldCheck },
        ];

  return (
    <div className="min-h-screen w-full bv-body bv-wood-bg" style={{ color: T.paper }}>
      {FONT_STYLE}

      <div className="max-w-4xl mx-auto px-4 pt-8">
        <div className="bv-arch relative pt-7 pb-4 px-6 mx-auto text-center" style={{ maxWidth: 640 }}>
          <GiltScroll className="absolute pointer-events-none" style={{ top: -8, left: -20 }} />
          <GiltScroll flip className="absolute pointer-events-none" style={{ top: -8, right: -20 }} />
          <div className="flex items-center justify-center gap-2 mb-1">
            <BookMarked size={24} color={T.stoneInk} />
            <span className="bv-display bv-engraved text-4xl font-semibold">BookVerse</span>
          </div>
          <div className="bv-label text-sm mb-4" style={{ color: T.archMuted }}>a reading room for the curious</div>

          <div className="flex items-center justify-center gap-2 mb-3 text-xs">
            <span className="bv-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,0,0,0.35)", color: T.stoneInk }}>{user.role}</span>
            <span style={{ color: T.archMuted }}>{user.name}</span>
            <button onClick={onSignOut} className="flex items-center gap-1 underline" style={{ color: T.archMuted }}>
              <LogOut size={11} /> sign out
            </button>
          </div>

          <nav className="flex gap-1.5 justify-center flex-wrap">
            {NAV.map((n) => {
              const Icon = n.icon;
              const active = tab === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setTab(n.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors"
                  style={{
                    background: active ? T.wood : "rgba(255,255,255,0.06)",
                    color: active ? T.brassLight : T.stoneInk,
                    border: active ? `1px solid ${T.brass}` : "1px solid rgba(200,166,90,0.3)",
                  }}
                >
                  <Icon size={14} /> {n.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex justify-center -mt-1 mb-6 relative z-10">
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-lg" style={{ background: "linear-gradient(180deg, #40260F 0%, #1C1108 100%)", border: `1px solid ${T.brass}`, boxShadow: "0 6px 14px rgba(0,0,0,0.6)" }}>
            <span className="flex items-center gap-1.5 bv-mono text-sm" style={{ color: T.brassLight }}>
              <Award size={15} /> {points} pts
            </span>
            <span className="w-px h-4" style={{ background: T.brass }} />
            <span className="flex items-center gap-1.5 bv-mono text-sm" style={{ color: "#E4906F" }}>
              <Flame size={15} /> {streak}-day streak
            </span>
          </div>
        </div>

      <main className="px-6 py-6 pb-10 rounded-xl" style={{ background: "linear-gradient(180deg, #2E1B10 0%, #1C1108 100%)", border: `1px solid ${T.plank}`, boxShadow: "inset 0 2px 16px rgba(0,0,0,0.5)" }}>

        {tab === "discover" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">Discover something new</h1>
            <p className="text-sm mb-4" style={{ color: T.paperDim }}>Search the catalog, or pull a book off the shelf to see what it's about.</p>

            <FilterBar filters={filters} setFilters={setFilters} resultCount={filteredCatalog.length} />

            {filtersActive ? (
              filteredCatalog.length === 0 ? (
                <div className="text-sm italic py-10 text-center rounded-lg" style={{ color: T.paperDim, border: `1px dashed ${T.inkLine}` }}>
                  No books match those filters.
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-3">
                  {filteredCatalog.map((b, i) => (
                    <CatalogCard key={b.id} book={b} index={i} availability={getAvailability(b, catalogLedger)} onSelect={() => setSelectedBook(b)} />
                  ))}
                </div>
              )
            ) : (
              ["Trending", "Popular", "Classic", "Academic"].map((tagGroup) => (
                <Shelf
                  key={tagGroup}
                  label={tagGroup}
                  books={CATALOG.filter((b) => b.tag === tagGroup)}
                  onSelect={setSelectedBook}
                />
              ))
            )}
          </div>
        )}

        {tab === "shelves" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">My Shelves</h1>
            <p className="text-sm mb-6" style={{ color: T.paperDim }}>Everything you're reading, want to read, paused, or have finished.</p>
            <Shelf label="Favourites" books={favoriteBooks.map((id) => bookById(id))} onSelect={setSelectedBook} empty="Tap the heart on any book to add it here." />
            <Shelf label="Currently Reading" books={shelves.reading.map((r) => bookById(r.id))} onSelect={setSelectedBook} empty="Move a book here from Discover to start tracking progress." />
            <Shelf label="Paused" books={shelves.paused.map((r) => bookById(r.id))} onSelect={setSelectedBook} empty="Books you've put down for now will show up here." />
            <Shelf label="Want to Read" books={shelves.want.map((id) => bookById(id))} onSelect={setSelectedBook} empty="Save books here to read later." />
            <Shelf label="Did Not Finish" books={shelves.dnf.map((r) => bookById(r.id))} onSelect={setSelectedBook} empty="No abandoned books — nice." />
            <Shelf label="Finished" books={shelves.read.map((r) => bookById(r.id))} onSelect={setSelectedBook} empty="Books you finish will land here — with your rating and review." />

            <div className="mt-8">
              <div className="bv-mono text-xs uppercase tracking-wider mb-3" style={{ color: T.paperDim }}>Achievements</div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {ACHIEVEMENT_DEFS.map((a) => {
                  const unlocked = unlockedAchievements.some((u) => u.id === a.id);
                  const Icon = a.icon;
                  return (
                    <Panel key={a.id} className="p-3 flex flex-col items-center text-center gap-1" style={{ opacity: unlocked ? 1 : 0.4 }}>
                      <Icon size={20} color={unlocked ? T.gold : T.paperDim} />
                      <div className="text-xs font-semibold">{a.label}</div>
                      <div className="text-[11px]" style={{ color: T.paperDim }}>{a.desc}</div>
                    </Panel>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {tab === "challenges" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">Reading Challenges</h1>
            <p className="text-sm mb-6" style={{ color: T.paperDim }}>Join a challenge, track your progress, earn points.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {CHALLENGES.map((c) => {
                const joined = joinedChallenges.includes(c.id);
                const progress = challengeProgress[c.id] || 0;
                return (
                  <Panel key={c.id} className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="bv-display text-lg">{c.title}</div>
                        <div className="text-sm mt-1" style={{ color: T.paperDim }}>{c.desc}</div>
                      </div>
                      <Pill color={T.gold}>+{c.points} pts</Pill>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1 bv-mono" style={{ color: T.paperDim }}>
                        <span>{progress} / {c.goal} {c.unit}</span>
                        <span>Ends {c.endDate}</span>
                      </div>
                      <ProgressBar value={progress} max={c.goal} color={T.moss} />
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      {!joined ? (
                        <button onClick={() => joinChallenge(c.id)} className="text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: T.moss, color: "white" }}>
                          <Plus size={14} /> Join challenge
                        </button>
                      ) : (
                        <>
                          <span className="text-sm flex items-center gap-1" style={{ color: T.mossLight }}><Check size={14} /> Joined</span>
                          <button
                            onClick={() => setChallengeProgress((p) => ({ ...p, [c.id]: Math.min(c.goal, (p[c.id] || 0) + 1) }))}
                            className="text-xs px-2 py-1 rounded-lg ml-auto"
                            style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}
                          >
                            +1 {c.unit.slice(0, -1)}
                          </button>
                        </>
                      )}
                    </div>
                  </Panel>
                );
              })}
            </div>
          </div>
        )}

        {tab === "community" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">Community Leaderboard</h1>
            <p className="text-sm mb-6" style={{ color: T.paperDim }}>See how you stack up against friends this month.</p>
            <Panel className="overflow-hidden">
              {[...FRIENDS, { name: "You", points, me: true }]
                .sort((a, b) => b.points - a.points)
                .map((f, i) => (
                  <div
                    key={f.name}
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: i < FRIENDS.length ? `1px solid ${T.inkLine}` : "none", background: f.me ? `${T.gold}18` : "transparent" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bv-mono text-sm w-5 text-center" style={{ color: i === 0 ? T.gold : T.paperDim }}>
                        {i === 0 ? <Crown size={16} color={T.gold} /> : i + 1}
                      </div>
                      <span className={f.me ? "font-semibold" : ""}>{f.name}</span>
                      {f.me && <Pill color={T.gold}>You</Pill>}
                    </div>
                    <span className="bv-mono text-sm" style={{ color: T.paperDim }}>{f.points} pts</span>
                  </div>
                ))}
            </Panel>
          </div>
        )}

        {tab === "studio" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">AI Studio</h1>
            <p className="text-sm mb-6" style={{ color: T.paperDim }}>Get personalized recommendations, summaries, and quizzes powered by Claude.</p>

            <Panel className="p-4 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold flex items-center gap-2"><TrendingUp size={16} color={T.gold} /> Recommended for you</div>
                  <div className="text-sm mt-0.5" style={{ color: T.paperDim }}>Based on what you've finished and enjoyed.</div>
                </div>
                <button onClick={runRecs} disabled={recsLoading} className="text-sm font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: T.plum, color: "white" }}>
                  {recsLoading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  {recsLoading ? "Thinking..." : "Generate picks"}
                </button>
              </div>
              {recs && (
                <div className="grid md:grid-cols-3 gap-3 mt-4">
                  {recs.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg" style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
                      <div className="font-semibold text-sm">{r.title}</div>
                      <div className="text-xs mb-1.5" style={{ color: T.paperDim }}>{r.author}</div>
                      <div className="text-xs">{r.reason}</div>
                    </div>
                  ))}
                </div>
              )}
              {aiError && <div className="text-xs mt-3" style={{ color: "#E08A78" }}>{aiError}</div>}
            </Panel>

            <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Pick a book to summarize or quiz</div>
            <div className="flex gap-1.5 overflow-x-auto bv-scroll pb-0 mb-1 pt-12">
              {CATALOG.map((b, i) => <Spine key={b.id} book={b} index={i} onClick={() => setSelectedBook(b)} />)}
            </div>
            <div className="bv-shelf-board h-3.5 mb-3" />
            <p className="text-xs" style={{ color: T.paperDim }}>Click any book above, then use "AI Summary" or "AI Quiz" in the detail view.</p>
          </div>
        )}

        {tab === "profile" && user.role === "Student" && (
          <div>
            <h1 className="bv-display text-2xl mb-1">My Profile</h1>
            <p className="text-sm mb-6" style={{ color: T.paperDim }}>How other readers see you — and how you're doing this year.</p>

            <div className="flex flex-col items-center text-center mb-6">
              <label className="relative cursor-pointer group">
                <div
                  className="w-28 h-28 rounded-full flex items-center justify-center overflow-hidden"
                  style={{ background: T.inkPanelLight, border: `3px solid ${T.gold}` }}
                >
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={40} color={T.paperDim} />
                  )}
                </div>
                <div
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: T.gold, border: `2px solid ${T.inkPanel}` }}
                >
                  <Camera size={14} color={T.ink} />
                </div>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
              <div className="bv-display text-xl mt-3">{user.name}</div>
              <Pill color={T.blue}>{user.role}</Pill>
            </div>

            <Panel className="p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="bv-mono text-xs uppercase tracking-wider" style={{ color: T.paperDim }}>Reading bio</span>
                <span className="bv-mono text-[11px]" style={{ color: bioWordCount > 80 ? T.coral : T.paperDim }}>{bioWordCount} / 80 words</span>
              </div>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell other readers a bit about what you love to read..."
                rows={3}
                className="w-full text-sm p-2 rounded resize-none"
                style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
              />
            </Panel>

            <Panel className="p-4 mb-5">
              <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Favourite genres</div>
              <div className="flex flex-wrap gap-2">
                {GENRE_LIST.map((g) => {
                  const active = favoriteGenres.includes(g);
                  return (
                    <button
                      key={g}
                      onClick={() => toggleGenre(g)}
                      className="text-xs px-3 py-1.5 rounded-full flex items-center gap-1"
                      style={{ background: active ? T.moss : T.inkPanelLight, border: `1px solid ${active ? T.mossLight : T.inkLine}`, color: active ? "white" : T.paperDim }}
                    >
                      {active && <Heart size={11} fill="white" />} {g}
                    </button>
                  );
                })}
              </div>
            </Panel>

            <Panel className="p-4 mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="bv-mono text-xs uppercase tracking-wider" style={{ color: T.paperDim }}>Annual reading goal</span>
                <span className="bv-mono text-sm" style={{ color: T.goldLight }}>{profileStats.booksCompleted} / {annualGoal} books</span>
              </div>
              <ProgressBar value={profileStats.booksCompleted} max={annualGoal} color={T.gold} />
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="number" min="1" max="365" value={annualGoal}
                  onChange={(e) => setAnnualGoal(Math.max(1, Number(e.target.value)))}
                  className="w-20 px-2 py-1 rounded text-sm bv-mono"
                  style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
                />
                <span className="text-xs" style={{ color: T.paperDim }}>books this year</span>
              </div>
            </Panel>

            <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Reading statistics</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { label: "Books completed", value: profileStats.booksCompleted, icon: Library },
                { label: "Currently reading", value: profileStats.currentlyReading, icon: BookOpen },
                { label: "Total pages read", value: profileStats.totalPagesRead, icon: BarChart3 },
                { label: "Reading streak", value: `${streak}d`, icon: Flame },
                { label: "Reviews written", value: profileStats.reviewsWritten, icon: MessageSquare },
                { label: "Points earned", value: points, icon: Award },
                { label: "Achievements", value: `${unlockedAchievements.length}/${ACHIEVEMENT_DEFS.length}`, icon: Medal },
                { label: "Favourite genres", value: favoriteGenres.length || "—", icon: Heart },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <Panel key={s.label} className="p-3 flex flex-col items-center text-center gap-1">
                    <Icon size={17} color={T.gold} />
                    <div className="bv-mono text-lg font-semibold">{s.value}</div>
                    <div className="text-[11px]" style={{ color: T.paperDim }}>{s.label}</div>
                  </Panel>
                );
              })}
            </div>

            <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Achievements unlocked</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {ACHIEVEMENT_DEFS.map((a) => {
                const unlocked = unlockedAchievements.some((u) => u.id === a.id);
                const Icon = a.icon;
                return (
                  <Panel key={a.id} className="p-3 flex flex-col items-center text-center gap-1" style={{ opacity: unlocked ? 1 : 0.4 }}>
                    <Icon size={20} color={unlocked ? T.gold : T.paperDim} />
                    <div className="text-xs font-semibold">{a.label}</div>
                  </Panel>
                );
              })}
            </div>

            <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Follow other student readers</div>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {FICTIONAL_STUDENTS.map((s) => {
                const following = followingIds.includes(s.id);
                return (
                  <Panel key={s.id} className="p-3 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
                      <User size={18} color={T.paperDim} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{s.name}</div>
                      <div className="text-[11px] truncate" style={{ color: T.paperDim }}>{s.bio}</div>
                      <Pill color={T.blue}>{s.topGenre}</Pill>
                    </div>
                    <button
                      onClick={() => toggleFollow(s.id)}
                      className="text-xs px-2.5 py-1.5 rounded-lg flex items-center gap-1 flex-shrink-0"
                      style={{ background: following ? T.moss : T.inkPanelLight, border: `1px solid ${following ? T.mossLight : T.inkLine}`, color: following ? "white" : T.paperDim }}
                    >
                      {following ? <UserCheck size={13} /> : <UserPlus size={13} />} {following ? "Following" : "Follow"}
                    </button>
                  </Panel>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={saveProfileSnapshot}
                disabled={savingProfile}
                className="text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                style={{ background: T.gold, color: T.ink }}
              >
                {savingProfile ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} Save to my library card
              </button>
              <button
                onClick={exportProfileExcel}
                className="text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"
                style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}
              >
                <Download size={14} /> Download as Excel
              </button>
            </div>
          </div>
        )}

        {tab === "records" && (user.role === "Librarian" || user.role === "Administrator") && (
          <RecordsPanel isAdmin={user.role === "Administrator"} />
        )}
      </main>
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bv-mono text-sm z-50 shadow-lg" style={{ background: T.gold, color: T.ink }}>
          {toast}
        </div>
      )}

      {selectedBook && (
        <BookModal
          book={selectedBook}
          availability={getAvailability(selectedBook, catalogLedger)}
          shelfStatus={isOnShelf(selectedBook.id)}
          readingRecord={shelves.reading.find((r) => r.id === selectedBook.id)}
          pausedRecord={shelves.paused.find((r) => r.id === selectedBook.id)}
          dnfRecord={shelves.dnf.find((r) => r.id === selectedBook.id)}
          readRecord={shelves.read.find((r) => r.id === selectedBook.id)}
          isFavorite={favoriteBooks.includes(selectedBook.id)}
          onToggleFavorite={() => toggleFavoriteBook(selectedBook.id)}
          onClose={() => setSelectedBook(null)}
          onMove={(target) => moveToShelf(selectedBook, target)}
          onUpdateField={(field, value) => updateShelfRecordField(selectedBook.id, field, value)}
          onFinish={() => finishFromReading(selectedBook.id)}
          onRate={(rating, review) => rateAndReview(selectedBook.id, rating, review)}
          onSubmitReview={(review) => submitReview(selectedBook.id, review)}
          onLogToday={logToday}
          loggedToday={loggedToday}
          onRunAI={(kind) => runAI(selectedBook, kind)}
          aiLoading={aiLoading}
          aiCache={aiCache}
          aiError={aiError}
        />
      )}
    </div>
  );
}

function BookModal({
  book, availability, shelfStatus, readingRecord, pausedRecord, dnfRecord, readRecord,
  isFavorite, onToggleFavorite, onClose, onMove, onUpdateField,
  onFinish, onRate, onSubmitReview, onLogToday, loggedToday, onRunAI, aiLoading, aiCache, aiError,
}) {
  const activeRecord = readingRecord || pausedRecord || dnfRecord;
  const [pagesInput, setPagesInput] = useState(activeRecord?.pagesRead || 0);
  const [rating, setRating] = useState(readRecord?.rating || 0);
  const [reviewText, setReviewText] = useState(readRecord?.review || "");
  const [notes, setNotes] = useState(activeRecord?.notes || "");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const summaryKey = `${book.id}-summary`;
  const quizKey = `${book.id}-quiz`;
  const summary = aiCache[summaryKey];
  const quiz = aiCache[quizKey] ? JSON.parse(typeof aiCache[quizKey] === "string" ? aiCache[quizKey] : JSON.stringify(aiCache[quizKey])) : null;

  const pct = Math.min(100, Math.round((pagesInput / book.pages) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.6)" }} onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bv-scroll rounded-xl p-6 bv-body"
        style={{ background: T.inkPanel, border: `1px solid ${T.inkLine}`, color: T.paper }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4 gap-3">
          <div className="flex gap-3">
            <CoverThumb book={book} index={CATALOG.findIndex((b) => b.id === book.id)} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <div className="bv-display text-3xl font-semibold leading-tight">{book.title}</div>
                <button onClick={onToggleFavorite} title={isFavorite ? "Remove from favourites" : "Add to favourites"} className="flex-shrink-0">
                  <Heart size={20} fill={isFavorite ? T.coral : "none"} color={isFavorite ? T.coral : T.paperDim} />
                </button>
              </div>
              <div className="bv-label text-base mt-0.5" style={{ color: T.paperDim }}>by {book.author}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg flex-shrink-0" style={{ background: T.inkPanelLight }}><X size={18} /></button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-3 pb-3" style={{ borderBottom: `1px dashed ${T.inkLine}` }}>
          <span className="flex items-center gap-1 text-sm">
            <Star size={13} fill={T.gold} color={T.gold} /> {book.rating}
            <span className="bv-mono text-[11px]" style={{ color: T.paperDim }}>({book.ratingsCount.toLocaleString()})</span>
          </span>
          <Pill color={T.blue}>{book.genre}</Pill>
          <Pill color={T.plum}>{book.ageCategory}</Pill>
          <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{book.year}</span>
          <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{book.pages} pp.</span>
          <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{book.language}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Pill color={availability.status === "Available" ? T.moss : T.coral}>{availability.status}</Pill>
          <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{availability.availableNow} of {book.availableCopies} copies available</span>
        </div>
        <div className="bv-mono text-[11px] mb-4" style={{ color: T.paperDim }}>
          {book.publisher} &nbsp;·&nbsp; ISBN {book.isbn}
        </div>

        <p className="text-[15px] leading-relaxed mb-4" style={{ color: T.paper }}>{book.blurb}</p>

        <div className="flex gap-2 mb-5 flex-wrap">
          <button onClick={() => onMove("want")} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: shelfStatus === "want" ? T.blue : T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>Want to Read</button>
          <button
            onClick={() => onMove("reading")}
            disabled={availability.availableNow === 0 && shelfStatus !== "reading" && shelfStatus !== "paused"}
            title={availability.availableNow === 0 && shelfStatus !== "reading" && shelfStatus !== "paused" ? "All copies are currently checked out" : undefined}
            className="text-xs px-3 py-1.5 rounded-lg font-medium"
            style={{ background: shelfStatus === "reading" ? T.moss : T.inkPanelLight, border: `1px solid ${T.inkLine}`, opacity: availability.availableNow === 0 && shelfStatus !== "reading" && shelfStatus !== "paused" ? 0.45 : 1 }}
          >
            {shelfStatus === "paused" ? "Resume Reading" : availability.availableNow === 0 && shelfStatus !== "reading" ? "Currently Reading (unavailable)" : "Currently Reading"}
          </button>
          {(shelfStatus === "reading" || shelfStatus === "paused") && (
            <button onClick={() => onMove("paused")} disabled={shelfStatus === "paused"} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: shelfStatus === "paused" ? T.gold : T.inkPanelLight, border: `1px solid ${T.inkLine}`, color: shelfStatus === "paused" ? T.ink : T.paper }}>Pause</button>
          )}
          {(shelfStatus === "reading" || shelfStatus === "paused") && (
            <button onClick={() => onMove("dnf")} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: T.inkPanelLight, border: `1px solid ${T.coral}66`, color: "#E08A78" }}>Did Not Finish</button>
          )}
          {shelfStatus === "dnf" && (
            <button onClick={() => onMove("reading")} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: T.moss, color: "white" }}>Try Again</button>
          )}
          <button onClick={() => onMove("read")} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: shelfStatus === "read" ? T.gold : T.inkPanelLight, border: `1px solid ${T.inkLine}`, color: shelfStatus === "read" ? T.ink : T.paper }}>Finished</button>
        </div>

        {(shelfStatus === "reading" || shelfStatus === "paused") && (
          <Panel className="p-3 mb-5">
            <div className="text-xs uppercase bv-mono mb-2 flex items-center justify-between">
              <span style={{ color: T.paperDim }}>{shelfStatus === "paused" ? "Progress (paused)" : "Progress"}</span>
            </div>
            <ProgressBar value={pagesInput} max={book.pages} color={shelfStatus === "paused" ? T.gold : T.moss} />
            <div className="text-sm mt-2 mb-2" style={{ color: T.goldLight }}>
              You are on page {pagesInput} of {book.pages} — <span className="font-semibold">{pct}% completed</span>.
            </div>
            <div className="flex items-center gap-2 mb-3">
              <input
                type="number" min="0" max={book.pages} value={pagesInput}
                onChange={(e) => { const v = Math.max(0, Math.min(book.pages, Number(e.target.value))); setPagesInput(v); onUpdateField("pagesRead", v); }}
                className="w-24 px-2 py-1 rounded text-sm bv-mono"
                style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
              />
              <span className="text-xs" style={{ color: T.paperDim }}>/ {book.pages} pages</span>
              {shelfStatus === "reading" && (
                <button onClick={onLogToday} disabled={loggedToday} className="ml-auto text-xs px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: loggedToday ? T.inkPanelLight : T.coral, color: loggedToday ? T.paperDim : "white" }}>
                  <Flame size={13} /> {loggedToday ? "Logged today" : "Log today's reading"}
                </button>
              )}
              {pagesInput >= book.pages && (
                <button onClick={onFinish} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: T.gold, color: T.ink }}>Mark finished</button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <label className="flex flex-col gap-1">
                <span className="bv-mono text-[10px] uppercase" style={{ color: T.paperDim }}>Date started</span>
                <input
                  type="date" value={activeRecord?.dateStarted || ""}
                  onChange={(e) => onUpdateField("dateStarted", e.target.value)}
                  className="px-2 py-1 rounded text-xs bv-mono" style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="bv-mono text-[10px] uppercase" style={{ color: T.paperDim }}>Expected completion</span>
                <input
                  type="date" value={activeRecord?.expectedCompletion || ""}
                  onChange={(e) => onUpdateField("expectedCompletion", e.target.value)}
                  className="px-2 py-1 rounded text-xs bv-mono" style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
                />
              </label>
            </div>

            <label className="flex flex-col gap-1">
              <span className="bv-mono text-[10px] uppercase" style={{ color: T.paperDim }}>Private reading notes</span>
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); onUpdateField("notes", e.target.value); }}
                placeholder="Thoughts, quotes, questions — only you can see this."
                rows={2}
                className="w-full text-sm p-2 rounded resize-none"
                style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
              />
            </label>
          </Panel>
        )}

        {shelfStatus === "dnf" && (
          <Panel className="p-3 mb-5">
            <div className="text-xs uppercase bv-mono mb-2" style={{ color: T.paperDim }}>Did not finish</div>
            <div className="text-sm mb-1">Stopped on page {activeRecord?.pagesRead || 0} of {book.pages} ({Math.round(((activeRecord?.pagesRead || 0) / book.pages) * 100)}%)</div>
            <div className="text-xs bv-mono mb-2" style={{ color: T.paperDim }}>
              Started {activeRecord?.dateStarted || "—"} &nbsp;·&nbsp; Stopped {activeRecord?.dateStopped || "—"}
            </div>
            {activeRecord?.notes && <div className="text-sm italic" style={{ color: T.paperDim }}>"{activeRecord.notes}"</div>}
          </Panel>
        )}

        {shelfStatus === "read" && (
          <Panel className="p-3 mb-5">
            <div className="text-xs uppercase bv-mono mb-2" style={{ color: T.paperDim }}>Your review</div>
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => { setRating(n); onRate(n, reviewText); }}>
                  <Star size={18} fill={n <= rating ? T.gold : "none"} color={T.gold} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What did you think?"
              className="w-full text-sm p-2 rounded resize-none"
              rows={3}
              style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
            />
            <button
              onClick={() => { onRate(rating, reviewText); onSubmitReview(reviewText); }}
              className="mt-2 text-xs px-3 py-1.5 rounded-lg font-medium"
              style={{ background: T.moss, color: "white" }}
            >
              Save review
            </button>
          </Panel>
        )}

        <div className="mb-2 text-xs uppercase bv-mono" style={{ color: T.paperDim }}>AI Tools</div>
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => onRunAI("summary")}
            disabled={aiLoading === summaryKey}
            className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
            style={{ background: T.plum, color: "white" }}
          >
            {aiLoading === summaryKey ? <Loader2 size={13} className="animate-spin" /> : <Sparkles size={13} />}
            AI Summary
          </button>
          <button
            onClick={() => onRunAI("quiz")}
            disabled={aiLoading === quizKey}
            className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-medium"
            style={{ background: T.blue, color: "white" }}
          >
            {aiLoading === quizKey ? <Loader2 size={13} className="animate-spin" /> : <Brain size={13} />}
            AI Quiz
          </button>
        </div>

        {aiError && <div className="text-xs mb-3" style={{ color: "#E08A78" }}>{aiError}</div>}

        {summary && (
          <Panel className="p-3 mb-3">
            <div className="text-xs bv-mono uppercase mb-1" style={{ color: T.paperDim }}>Summary</div>
            <p className="text-sm leading-relaxed">{summary}</p>
          </Panel>
        )}

        {quiz && quiz.questions && (
          <Panel className="p-3 mb-3">
            <div className="text-xs bv-mono uppercase mb-2" style={{ color: T.paperDim }}>Quiz</div>
            {quiz.questions.map((q, qi) => (
              <div key={qi} className="mb-3">
                <div className="text-sm font-medium mb-1">{qi + 1}. {q.question}</div>
                <div className="grid grid-cols-1 gap-1">
                  {q.options.map((opt, oi) => {
                    const chosen = quizAnswers[qi] === oi;
                    const correct = oi === q.answerIndex;
                    let bg = T.inkPanelLight;
                    if (quizSubmitted && chosen && correct) bg = `${T.moss}55`;
                    else if (quizSubmitted && chosen && !correct) bg = `${T.coral}55`;
                    else if (quizSubmitted && correct) bg = `${T.moss}33`;
                    return (
                      <button
                        key={oi}
                        disabled={quizSubmitted}
                        onClick={() => setQuizAnswers((a) => ({ ...a, [qi]: oi }))}
                        className="text-left text-xs px-2 py-1.5 rounded"
                        style={{ background: chosen && !quizSubmitted ? `${T.gold}33` : bg, border: `1px solid ${T.inkLine}` }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            {!quizSubmitted ? (
              <button onClick={() => setQuizSubmitted(true)} className="text-xs px-3 py-1.5 rounded-lg font-medium" style={{ background: T.gold, color: T.ink }}>Check answers</button>
            ) : (
              <div className="text-sm bv-mono" style={{ color: T.goldLight }}>
                Score: {quiz.questions.filter((q, qi) => quizAnswers[qi] === q.answerIndex).length} / {quiz.questions.length}
              </div>
            )}
          </Panel>
        )}
      </div>
    </div>
  );
}

function RecordsPanel({ isAdmin }) {
  const [records, setRecords] = useState([]);
  const [directory, setDirectory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [manualStudent, setManualStudent] = useState("");
  const [manualBookId, setManualBookId] = useState(CATALOG[0].id);

  const refresh = async () => {
    setLoading(true);
    let list = await loadLedger();
    if (list.length === 0) {
      list = seedLedger();
      await saveLedger(list);
    }
    setRecords(list);
    if (isAdmin) setDirectory(await loadDirectory());
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const markReturned = async (id) => {
    const updated = records.map((r) => (r.id === id ? { ...r, returnedAt: new Date().toISOString() } : r));
    setRecords(updated);
    await saveLedger(updated);
  };

  const addManualRecord = async () => {
    if (!manualStudent.trim()) return;
    const book = CATALOG.find((b) => b.id === manualBookId);
    const entry = {
      id: `manual-${Date.now()}`,
      studentName: manualStudent.trim(),
      studentEmail: "",
      bookId: book.id,
      bookTitle: book.title,
      genre: book.genre,
      borrowedAt: new Date().toISOString(),
      returnedAt: null,
    };
    const updated = [...records, entry];
    setRecords(updated);
    await saveLedger(updated);
    setManualStudent("");
  };

  const filtered = records
    .filter((r) => (statusFilter === "out" ? !r.returnedAt : statusFilter === "returned" ? !!r.returnedAt : true))
    .filter((r) => (search.trim() ? (r.studentName + r.bookTitle).toLowerCase().includes(search.trim().toLowerCase()) : true))
    .sort((a, b) => new Date(b.borrowedAt) - new Date(a.borrowedAt));

  const totalOut = records.filter((r) => !r.returnedAt).length;
  const totalReturned = records.filter((r) => r.returnedAt).length;

  const fmt = (iso) =>
    iso
      ? new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) +
        " · " + new Date(iso).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })
      : "—";

  return (
    <div>
      <div className="flex items-center justify-between mb-1 gap-2 flex-wrap">
        <h1 className="bv-display text-2xl">{isAdmin ? "Library Records — Administrator View" : "Borrowing Records"}</h1>
        <button onClick={refresh} className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5" style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>
      <p className="text-sm mb-5" style={{ color: T.paperDim }}>
        {isAdmin ? "Everything librarians have logged, plus every registered account." : "Every book students have borrowed and returned, kept in one shared ledger."}
      </p>

      {isAdmin && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[
              { label: "Registered students", value: directory.filter((d) => d.role === "Student").length, icon: GraduationCap },
              { label: "Registered librarians", value: directory.filter((d) => d.role === "Librarian").length, icon: BookMarked },
              { label: "Books currently out", value: totalOut, icon: BookOpen },
              { label: "Books returned", value: totalReturned, icon: CheckCircle2 },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <Panel key={s.label} className="p-3 flex flex-col items-center text-center gap-1">
                  <Icon size={17} color={T.gold} />
                  <div className="bv-mono text-lg font-semibold">{s.value}</div>
                  <div className="text-[11px]" style={{ color: T.paperDim }}>{s.label}</div>
                </Panel>
              );
            })}
          </div>

          <div className="bv-mono text-xs uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>All registered accounts</div>
          <Panel className="overflow-hidden mb-6">
            {directory.length === 0 ? (
              <div className="p-4 text-sm italic" style={{ color: T.paperDim }}>No accounts registered yet.</div>
            ) : (
              directory.map((d, i) => (
                <div key={d.email} className="flex items-center justify-between px-4 py-2.5 flex-wrap gap-2" style={{ borderBottom: i < directory.length - 1 ? `1px solid ${T.inkLine}` : "none" }}>
                  <div>
                    <div className="text-sm font-medium">{d.name}</div>
                    <div className="text-[11px]" style={{ color: T.paperDim }}>{d.email}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{d.booksCompleted || 0} books · {d.points || 0} pts</span>
                    <Pill color={d.role === "Administrator" ? T.coral : d.role === "Librarian" ? T.blue : T.moss}>{d.role}</Pill>
                  </div>
                </div>
              ))
            )}
          </Panel>
        </>
      )}

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg flex-1" style={{ minWidth: 180, background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
          <Search size={13} color={T.paperDim} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search student or book..." className="bg-transparent outline-none text-sm w-full" style={{ color: T.paper }} />
        </span>
        {["all", "out", "returned"].map((f) => (
          <button
            key={f}
            onClick={() => setStatusFilter(f)}
            className="text-xs px-3 py-1.5 rounded-lg capitalize"
            style={{ background: statusFilter === f ? T.moss : T.inkPanelLight, border: `1px solid ${T.inkLine}`, color: statusFilter === f ? "white" : T.paperDim }}
          >
            {f === "out" ? "Not returned" : f}
          </button>
        ))}
      </div>

      <Panel className="p-3 mb-4">
        <div className="bv-mono text-[11px] uppercase tracking-wider mb-2" style={{ color: T.paperDim }}>Log a manual borrow</div>
        <div className="flex flex-wrap gap-2">
          <input
            value={manualStudent} onChange={(e) => setManualStudent(e.target.value)}
            placeholder="Student name"
            className="px-2 py-1.5 rounded text-sm flex-1" style={{ minWidth: 140, background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
          />
          <select
            value={manualBookId} onChange={(e) => setManualBookId(e.target.value)}
            className="px-2 py-1.5 rounded text-sm" style={{ background: T.ink, border: `1px solid ${T.inkLine}`, color: T.paper }}
          >
            {CATALOG.map((b) => <option key={b.id} value={b.id}>{b.title}</option>)}
          </select>
          <button onClick={addManualRecord} className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1" style={{ background: T.gold, color: T.ink }}>
            <Plus size={13} /> Log borrow
          </button>
        </div>
      </Panel>

      <Panel className="overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-2 px-4 py-2 text-[11px] bv-mono uppercase" style={{ color: T.paperDim, borderBottom: `1px solid ${T.inkLine}` }}>
          <span>Student</span><span>Book</span><span>Genre</span><span>Borrowed</span><span>Returned</span><span>Status</span>
        </div>
        {loading ? (
          <div className="p-6 text-center text-sm" style={{ color: T.paperDim }}><Loader2 className="animate-spin inline mr-2" size={14} />Loading records...</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 text-center text-sm italic" style={{ color: T.paperDim }}>No matching records.</div>
        ) : (
          filtered.map((r, i) => (
            <div key={r.id} className="grid grid-cols-2 md:grid-cols-6 gap-2 px-4 py-2.5 text-sm items-center" style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${T.inkLine}` : "none" }}>
              <span className="font-medium">{r.studentName}</span>
              <span className="truncate">{r.bookTitle}</span>
              <span><Pill color={T.blue}>{r.genre}</Pill></span>
              <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{fmt(r.borrowedAt)}</span>
              <span className="bv-mono text-xs" style={{ color: T.paperDim }}>{fmt(r.returnedAt)}</span>
              <span className="flex items-center gap-2 flex-wrap">
                {r.returnedAt ? <Pill color={T.moss}>Returned</Pill> : <Pill color={T.coral}>Borrowed</Pill>}
                {!r.returnedAt && (
                  <button onClick={() => markReturned(r.id)} className="text-[11px] px-2 py-1 rounded flex items-center gap-1" style={{ background: T.inkPanelLight, border: `1px solid ${T.inkLine}` }}>
                    <Undo2 size={11} /> Mark returned
                  </button>
                )}
              </span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}

function GiltScroll({ flip = false, className = "", style }) {
  return (
    <svg
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
      width="130" height="110" viewBox="0 0 130 110" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M4,90 C4,55 20,26 52,14 C72,6 92,10 104,24"
          stroke={T.brass} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.9" />
        <path d="M4,90 C4,55 20,26 52,14 C72,6 92,10 104,24"
          stroke={T.brassLight} strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
        <path d="M18,84 C20,58 34,38 56,28 C68,23 78,26 82,34"
          stroke={T.brass} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.75" />
        <path d="M104,24 C112,20 118,22 120,30 C114,32 106,30 104,24 Z" fill={T.brassLight} opacity="0.85" />
        <path d="M82,34 C90,30 96,34 96,40 C90,42 84,40 82,34 Z" fill={T.brass} opacity="0.75" />
        <path d="M4,90 C-2,96 -2,104 4,108 C10,104 10,96 4,90 Z" fill={T.brassLight} opacity="0.85" />
        <circle cx="38" cy="52" r="3.2" fill={T.brassLight} opacity="0.9" />
      </g>
    </svg>
  );
}

const ROLES = [
  { id: "Student", label: "Student", desc: "Browse, read, and climb the leaderboard", icon: GraduationCap },
  { id: "Librarian", label: "Librarian", desc: "Curate the catalog and guide readers", icon: BookMarked },
  { id: "Administrator", label: "Administrator", desc: "Manage accounts and library settings", icon: ShieldCheck },
];

function LoginScreen({ onEnter }) {
  const [mode, setMode] = useState("signin");
  const [role, setRole] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [parentConfirmed, setParentConfirmed] = useState(false);
  const [parentEmail, setParentEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [checking, setChecking] = useState(false);
  const [notice, setNotice] = useState(null);

  const emailValid = /^[^\s@]+@gmail\.com$/i.test(email.trim());
  const age = calcAge(dob);
  const dobValid = age !== null && age >= 4 && age <= 100;
  const isMinor = age !== null && age < 13;
  const parentEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parentEmail.trim());
  const canSubmitSignup = role && name.trim().length > 1 && emailValid && dobValid && (!isMinor || (parentConfirmed && parentEmailValid));

  const handleContinueSignIn = async () => {
    setTouched(true);
    if (!emailValid) return;
    setChecking(true);
    setNotice(null);
    const existing = await loadProfileFromStorage(email);
    setChecking(false);
    if (existing) {
      onEnter(existing);
    } else {
      setNotice("No account found with that Gmail address — let's create one.");
      setMode("signup");
      setTouched(false);
    }
  };

  const handleSignup = async () => {
    setTouched(true);
    if (!canSubmitSignup) return;
    const base = {
      role, name: name.trim(), email: email.trim().toLowerCase(), dob, age,
      isMinor, parentEmail: isMinor ? parentEmail.trim() : null, parentConfirmed: isMinor ? true : false,
    };
    const seed = role === "Student" ? seedStudentActivity() : { shelves: { want: [], reading: [], paused: [], dnf: [], read: [] }, points: 0, streak: 0, joinedChallenges: [], challengeProgress: {}, favoriteGenres: [], favoriteBooks: [], bio: "", annualGoal: 12, followingIds: [], avatar: null };
    const profile = { ...base, ...seed };
    await saveProfileToStorage(profile.email, profile);
    await updateDirectoryEntry({
      name: profile.name, email: profile.email, role: profile.role,
      points: profile.points || 0, booksCompleted: profile.shelves ? profile.shelves.read.length : 0,
      streak: profile.streak || 0, joinedAt: new Date().toISOString(),
    });
    onEnter(profile);
  };

  return (
    <div className="min-h-screen w-full bv-body bv-wood-bg flex items-center justify-center relative px-4 pt-24 pb-10">
      {FONT_STYLE}

      <div className="bv-arch w-full relative z-10 px-7 pt-8 pb-8" style={{ maxWidth: 460 }}>
        <GiltScroll className="absolute pointer-events-none" style={{ top: -6, left: -18 }} />
        <GiltScroll flip className="absolute pointer-events-none" style={{ top: -6, right: -18 }} />
        <div className="flex flex-col items-center text-center mb-5 relative" style={{ zIndex: 1 }}>
          <BookMarked size={30} color={T.stoneInk} />
          <div className="bv-display bv-engraved text-3xl font-semibold mt-1">BookVerse</div>
          <div className="bv-label text-sm mt-1" style={{ color: T.archMuted }}>library membership · {mode === "signin" ? "sign in" : "create an account"}</div>
        </div>

        {notice && <div className="text-xs mb-4 text-center px-3 py-2 rounded" style={{ background: "rgba(0,0,0,0.3)", color: T.archMuted }}>{notice}</div>}

        {mode === "signin" ? (
          <>
            <label className="flex flex-col gap-1 mb-3">
              <span className="bv-mono text-[11px] uppercase tracking-wider" style={{ color: T.archMuted }}>Gmail address</span>
              <span className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${touched && !emailValid ? T.coral : "rgba(200,166,90,0.3)"}` }}>
                <Mail size={14} color={T.archMuted} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com" className="bg-transparent outline-none text-sm w-full" style={{ color: T.stoneInk }} />
              </span>
              {touched && !emailValid && <span className="text-[11px]" style={{ color: T.coral }}>Please use a valid @gmail.com address.</span>}
            </label>

            <button onClick={handleContinueSignIn} disabled={checking} className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold" style={{ background: T.wood, color: T.brassLight, border: `1px solid ${T.brass}` }}>
              {checking ? <Loader2 size={15} className="animate-spin" /> : <ArrowRight size={15} />} {checking ? "Checking the ledger..." : "Continue"}
            </button>

            <button onClick={() => { setMode("signup"); setNotice(null); }} className="w-full mt-3 text-xs underline text-center" style={{ color: T.archMuted }}>
              New here? Create an account instead
            </button>
          </>
        ) : (
          <>
            <div className="mb-5">
              <div className="bv-mono text-[11px] uppercase tracking-wider mb-2 text-center" style={{ color: T.archMuted }}>I am a...</div>
              <div className="grid grid-cols-3 gap-2">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  const active = role === r.id;
                  return (
                    <button key={r.id} onClick={() => setRole(r.id)} title={r.desc} className="flex flex-col items-center gap-1 py-2.5 px-1 rounded-lg transition-colors" style={{ background: active ? T.wood : "rgba(255,255,255,0.05)", border: active ? `1px solid ${T.brass}` : "1px solid rgba(200,166,90,0.25)", color: active ? T.brassLight : T.stoneInk }}>
                      <Icon size={18} />
                      <span className="text-[11px] font-medium leading-tight">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 mb-2">
              <label className="flex flex-col gap-1">
                <span className="bv-mono text-[11px] uppercase tracking-wider" style={{ color: T.archMuted }}>Full name</span>
                <span className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(200,166,90,0.3)" }}>
                  <User size={14} color={T.archMuted} />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Ellis" className="bg-transparent outline-none text-sm w-full" style={{ color: T.stoneInk }} />
                </span>
              </label>

              <label className="flex flex-col gap-1">
                <span className="bv-mono text-[11px] uppercase tracking-wider" style={{ color: T.archMuted }}>Gmail address</span>
                <span className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${touched && !emailValid ? T.coral : "rgba(200,166,90,0.3)"}` }}>
                  <Mail size={14} color={T.archMuted} />
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gmail.com" className="bg-transparent outline-none text-sm w-full" style={{ color: T.stoneInk }} />
                </span>
                {touched && !emailValid && <span className="text-[11px]" style={{ color: T.coral }}>Please use a valid @gmail.com address.</span>}
              </label>

              <label className="flex flex-col gap-1">
                <span className="bv-mono text-[11px] uppercase tracking-wider" style={{ color: T.archMuted }}>Date of birth</span>
                <span className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${touched && !dobValid ? T.coral : "rgba(200,166,90,0.3)"}` }}>
                  <Calendar size={14} color={T.archMuted} />
                  <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className="bg-transparent outline-none text-sm w-full" style={{ color: T.stoneInk }} />
                </span>
                {age !== null && <span className="text-[11px]" style={{ color: T.archMuted }}>Age: {age}</span>}
              </label>
            </div>

            {isMinor && (
              <div className="mb-3 p-3 rounded-lg" style={{ background: "rgba(193,85,61,0.12)", border: `1px solid ${T.coral}55` }}>
                <div className="text-xs font-semibold mb-2 flex items-center gap-1.5" style={{ color: T.stoneInk }}>
                  <ShieldCheck size={14} /> Parental confirmation required
                </div>
                <label className="flex flex-col gap-1 mb-2">
                  <span className="bv-mono text-[11px] uppercase tracking-wider" style={{ color: T.archMuted }}>Parent or guardian's email</span>
                  <span className="flex items-center gap-2 px-3 py-2 rounded-md" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(200,166,90,0.3)" }}>
                    <Mail size={14} color={T.archMuted} />
                    <input value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} placeholder="parent@example.com" className="bg-transparent outline-none text-sm w-full" style={{ color: T.stoneInk }} />
                  </span>
                </label>
                <label className="flex items-start gap-2 text-[11px]" style={{ color: T.stoneInk }}>
                  <input type="checkbox" checked={parentConfirmed} onChange={(e) => setParentConfirmed(e.target.checked)} className="mt-0.5" />
                  Since this reader is under 13, I confirm a parent or guardian has reviewed and approved this account.
                </label>
              </div>
            )}

            {touched && !role && <div className="text-[11px] mb-2 text-center" style={{ color: T.coral }}>Please choose a role above.</div>}
            {touched && isMinor && (!parentConfirmed || !parentEmailValid) && (
              <div className="text-[11px] mb-2 text-center" style={{ color: T.coral }}>Parental confirmation is required for readers under 13.</div>
            )}

            <button onClick={handleSignup} className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold" style={{ background: T.wood, color: T.brassLight, border: `1px solid ${T.brass}` }}>
              Enter the Library <ArrowRight size={15} />
            </button>

            <button onClick={() => { setMode("signin"); setNotice(null); }} className="w-full mt-3 text-xs underline text-center" style={{ color: T.archMuted }}>
              Already have an account? Sign in
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  const handleSaveProfile = useCallback(async (snapshot) => {
    if (!user) return;
    const merged = { ...user, ...snapshot };
    setUser(merged);
    await saveProfileToStorage(merged.email, merged);
  }, [user]);

  if (!user) return <LoginScreen onEnter={setUser} />;
  return <BookVerseApp user={user} onSignOut={() => setUser(null)} onSaveProfile={handleSaveProfile} />;
}
