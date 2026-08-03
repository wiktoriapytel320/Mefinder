import React, { useState, useEffect, useRef } from "react";
import { Compass, GraduationCap, Heart, HeartCrack, Target, Flag, MessageCircle, Plus, X, Sparkles, Check, AlertTriangle, Loader2, Send, ShieldCheck, Briefcase, Wand2, Search, Circle, Cake, History, Trash2, ChevronRight, Lightbulb, ExternalLink, Globe, MapPin, Cpu, Users, Building2, Clock, Timer } from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
`;

const C = {
  page: "#EEEFF2",
  card: "#FFFFFF",
  black: "#14161A",
  blackSoft: "#22252B",
  text: "#14161A",
  textSoft: "#8A8F98",
  textMuted: "#C3C6CC",
  border: "#ECECEE",
  chip: "#F2F2F4",
  blue: "#4F7DF3",
  blueBg: "#E9EFFE",
  green: "#2FB673",
  greenBg: "#E3F7EC",
  red: "#E2574C",
  redBg: "#FBE7E5",
  amber: "#D9A441",
  indigo: "#6366F1",
  pink: "#EC4899",
  teal: "#14B8A6",
};

const shadow = "0 1px 2px rgba(20,22,26,0.04), 0 14px 32px rgba(20,22,26,0.08)";
const shadowHover = "0 2px 4px rgba(20,22,26,0.06), 0 22px 44px rgba(20,22,26,0.13)";
const cardBorder = "1px solid rgba(20,22,26,0.045)";

const STRINGS = {
  en: {
    appTitle: "Mefinder",
    appSubtitle: "career & education decisions that actually fit who you are",
    saving: "saving\u2026",
    saveFailed: "save failed",
    saved: "saved",
    tabProfile: "Profile",
    tabChat: "Chat",
    tabCompare: "Compare",
    tabJobs: "Find jobs",
    ageLabel: "Age",
    agePlaceholder: "e.g. 27",
    locationLabel: "Location",
    locationPlaceholder: "e.g. Chicago, IL",
    interestsLabel: "Interests",
    interestsPlaceholder: "e.g. data, storytelling, working outdoors",
    dislikesLabel: "Dislikes",
    dislikesPlaceholder: "e.g. repetitive tasks, public speaking",
    educationLabel: "Education background",
    educationPlaceholder: "Degrees, fields of study, certifications, or current studies",
    experienceLabel: "Job experience",
    experiencePlaceholder: "e.g. Sales associate, Retail Co (2021-2023)",
    technicalSkillsLabel: "Technical skills",
    technicalSkillsPlaceholder: "e.g. Excel, Python, Figma, SQL",
    softSkillsLabel: "Soft skills",
    softSkillsPlaceholder: "e.g. communication, leadership, adaptability",
    workPrefsLabel: "Work preferences",
    workStyleLabel: "Preferred work style",
    employmentTypeLabel: "Full-time or part-time",
    workHoursLabel: "Working hours",
    workHoursPlaceholder: "e.g. 9am-5pm weekdays",
    flexible: "Flexible",
    prioritiesLabel: "Priorities, most important first",
    prioritiesPlaceholder: "e.g. financial stability, flexibility, impact",
    valuesLabel: "Values",
    valuesPlaceholder: "e.g. honesty, independence, craftsmanship",
    goalsLabel: "Long-term goals",
    goalsPlaceholder: "Where you want to be in 5-10 years",
    privacyNote: "Saved privately to your account. Only you can see this profile.",
    workStyleOptions: ["Remote", "Hybrid", "On-site", "No preference"],
    employmentOptions: ["Full-time", "Part-time", "No preference"],
    chatPlaceholder: "Share something about yourself\u2026",
    thinking: "thinking\u2026",
    suggestionsHeader: "Picked up on a few things \u2014 add to your profile?",
    howGoing: "How's this decision going?",
    comparedPrefix: "compared",
    revisit: "Let's revisit",
    profileEmptyDecide: "Your profile is empty \u2014 fill it in first for a personalized analysis.",
    profileEmptyJobs: "Your profile is empty \u2014 fill it in first so results can be matched to you.",
    pastDecisions: "Past decisions",
    viewingPast: "Viewing a past decision.",
    startNew: "Start a new one",
    decisionLabel: "The decision",
    decisionPlaceholder: "e.g. Which graduate program should I pursue?",
    suggestPathsBtn: "Suggest paths based on my profile",
    thinkingPaths: "Thinking of paths that fit you\u2026",
    optionsLabel: "Options, up to 4",
    optionPlaceholder: "Option",
    addOption: "Add option",
    analyzeBtn: "Analyze against my profile",
    analyzingBtn: "Analyzing your options\u2026",
    yourProfile: "your profile",
    tierRecommended: "Recommended",
    tierWorthConsidering: "Worth considering",
    tierLeastSuitable: "Least suitable",
    recommendedForYou: "Recommended for you",
    recommendedDesc: "Skip typing a role \u2014 let it infer suitable jobs from your whole profile (skills, experience, interests, and work preferences) and search the live web for real openings.",
    findMatchesBtn: "Find matches for me",
    findingMatchesBtn: "Searching for your best matches\u2026",
    searchSpecificLabel: "Search for a specific role",
    rolePlaceholder: "e.g. junior UX researcher, data analyst",
    locationOptionalPlaceholder: "Location, optional \u2014 e.g. Chicago, or remote",
    searchBtn: "Search real openings",
    searchingBtn: "Searching the web\u2026",
    tierStrongFit: "Strong fit",
    tierPossibleFit: "Possible fit",
    tierWeakFit: "Weak fit",
    viewListing: "View listing",
    posted: "Posted",
    recommendedNote: "Roles inferred from your full profile, pulled live from the web just now. Always verify on the original listing before applying.",
    recommendedEmpty: "No verifiable, currently-open matches turned up. Try adding more to your profile, especially skills and work preferences.",
    searchNote: "Pulled live from the web just now and matched to your profile. Always verify on the original listing before applying.",
    searchEmpty: "No verifiable, currently-open listings turned up for that search. Try broadening the role or location.",
    languageLabel: "Language",
    chatGreeting: "Tell me a bit about yourself \u2014 your background, what you enjoy, what drains you, and where you'd like to end up. I'll fold it into your profile.",
  },
  pl: {
    appTitle: "Mefinder",
    appSubtitle: "decyzje zawodowe i edukacyjne dopasowane do tego, kim naprawd\u0119 jeste\u015b",
    saving: "zapisywanie\u2026",
    saveFailed: "b\u0142\u0105d zapisu",
    saved: "zapisano",
    tabProfile: "Profil",
    tabChat: "Czat",
    tabCompare: "Por\u00f3wnaj",
    tabJobs: "Szukaj pracy",
    ageLabel: "Wiek",
    agePlaceholder: "np. 27",
    locationLabel: "Lokalizacja",
    locationPlaceholder: "np. Warszawa",
    interestsLabel: "Zainteresowania",
    interestsPlaceholder: "np. dane, opowiadanie historii, praca na \u015bwie\u017cym powietrzu",
    dislikesLabel: "Czego nie lubisz",
    dislikesPlaceholder: "np. powtarzalne zadania, wyst\u0105pienia publiczne",
    educationLabel: "Wykszta\u0142cenie",
    educationPlaceholder: "Stopnie naukowe, kierunki studi\u00f3w, certyfikaty lub aktualna nauka",
    experienceLabel: "Do\u015bwiadczenie zawodowe",
    experiencePlaceholder: "np. Sprzedawca, Retail Co (2021-2023)",
    technicalSkillsLabel: "Umiej\u0119tno\u015bci techniczne",
    technicalSkillsPlaceholder: "np. Excel, Python, Figma, SQL",
    softSkillsLabel: "Umiej\u0119tno\u015bci mi\u0119kkie",
    softSkillsPlaceholder: "np. komunikacja, przyw\u00f3dztwo, elastyczno\u015b\u0107",
    workPrefsLabel: "Preferencje dotycz\u0105ce pracy",
    workStyleLabel: "Preferowany tryb pracy",
    employmentTypeLabel: "Pe\u0142ny czy niepe\u0142ny etat",
    workHoursLabel: "Godziny pracy",
    workHoursPlaceholder: "np. 9-17 w dni robocze",
    flexible: "Elastyczne",
    prioritiesLabel: "Priorytety, od najwa\u017cniejszego",
    prioritiesPlaceholder: "np. stabilno\u015b\u0107 finansowa, elastyczno\u015b\u0107, wp\u0142yw",
    valuesLabel: "Warto\u015bci",
    valuesPlaceholder: "np. uczciwo\u015b\u0107, niezale\u017cno\u015b\u0107, rzemios\u0142o",
    goalsLabel: "Cele d\u0142ugoterminowe",
    goalsPlaceholder: "Gdzie chcesz by\u0107 za 5-10 lat",
    privacyNote: "Zapisywane prywatnie na Twoim koncie. Tylko Ty widzisz ten profil.",
    workStyleOptions: ["Zdalnie", "Hybrydowo", "Stacjonarnie", "Brak preferencji"],
    employmentOptions: ["Pe\u0142ny etat", "Niepe\u0142ny etat", "Brak preferencji"],
    chatPlaceholder: "Podziel si\u0119 czym\u015b o sobie\u2026",
    thinking: "my\u015bl\u0119\u2026",
    suggestionsHeader: "Zauwa\u017cy\u0142em kilka rzeczy \u2014 doda\u0107 do profilu?",
    howGoing: "Jak wygl\u0105da ta decyzja?",
    comparedPrefix: "por\u00f3wnano",
    revisit: "Wr\u00f3\u0107my do tego",
    profileEmptyDecide: "Tw\u00f3j profil jest pusty \u2014 uzupe\u0142nij go, aby otrzyma\u0107 spersonalizowan\u0105 analiz\u0119.",
    profileEmptyJobs: "Tw\u00f3j profil jest pusty \u2014 uzupe\u0142nij go, aby dopasowa\u0107 wyniki.",
    pastDecisions: "Poprzednie decyzje",
    viewingPast: "Przegl\u0105dasz poprzedni\u0105 decyzj\u0119.",
    startNew: "Rozpocznij now\u0105",
    decisionLabel: "Decyzja",
    decisionPlaceholder: "np. Kt\u00f3ry program studi\u00f3w wybra\u0107?",
    suggestPathsBtn: "Zaproponuj \u015bcie\u017cki na podstawie mojego profilu",
    thinkingPaths: "Szukam \u015bcie\u017cek dopasowanych do Ciebie\u2026",
    optionsLabel: "Opcje, maksymalnie 4",
    optionPlaceholder: "Opcja",
    addOption: "Dodaj opcj\u0119",
    analyzeBtn: "Przeanalizuj wzgl\u0119dem mojego profilu",
    analyzingBtn: "Analizuj\u0119 Twoje opcje\u2026",
    yourProfile: "tw\u00f3j profil",
    tierRecommended: "Polecane",
    tierWorthConsidering: "Warto rozwa\u017cy\u0107",
    tierLeastSuitable: "Najmniej odpowiednie",
    recommendedForYou: "Polecane dla Ciebie",
    recommendedDesc: "Nie musisz wpisywa\u0107 stanowiska \u2014 system wywnioskuje odpowiednie oferty na podstawie ca\u0142ego Twojego profilu (umiej\u0119tno\u015bci, do\u015bwiadczenia, zainteresowa\u0144 i preferencji) i przeszuka internet w poszukiwaniu realnych ofert.",
    findMatchesBtn: "Znajd\u017a oferty dla mnie",
    findingMatchesBtn: "Szukam najlepszych dopasowa\u0144\u2026",
    searchSpecificLabel: "Szukaj konkretnego stanowiska",
    rolePlaceholder: "np. junior UX researcher, analityk danych",
    locationOptionalPlaceholder: "Lokalizacja, opcjonalnie \u2014 np. Warszawa lub zdalnie",
    searchBtn: "Szukaj rzeczywistych ofert",
    searchingBtn: "Przeszukuj\u0119 internet\u2026",
    tierStrongFit: "\u015awietne dopasowanie",
    tierPossibleFit: "Mo\u017cliwe dopasowanie",
    tierWeakFit: "S\u0142abe dopasowanie",
    viewListing: "Zobacz ofert\u0119",
    posted: "Opublikowano",
    recommendedNote: "Stanowiska wywnioskowane z ca\u0142ego Twojego profilu, pobrane na \u017cywo z internetu przed chwil\u0105. Zawsze zweryfikuj oryginalne og\u0142oszenie przed aplikowaniem.",
    recommendedEmpty: "Nie znaleziono zweryfikowanych, aktualnie otwartych ofert. Spr\u00f3buj uzupe\u0142ni\u0107 wi\u0119cej informacji w profilu, zw\u0142aszcza umiej\u0119tno\u015bci i preferencje.",
    searchNote: "Pobrane na \u017cywo z internetu przed chwil\u0105 i dopasowane do Twojego profilu. Zawsze zweryfikuj oryginalne og\u0142oszenie przed aplikowaniem.",
    searchEmpty: "Nie znaleziono zweryfikowanych, aktualnie otwartych ofert dla tego wyszukiwania. Spr\u00f3buj poszerzy\u0107 stanowisko lub lokalizacj\u0119.",
    languageLabel: "J\u0119zyk",
    chatGreeting: "Opowiedz mi troch\u0119 o sobie \u2014 Twoim do\u015bwiadczeniu, co lubisz robi\u0107, co Ci\u0119 m\u0119czy i gdzie chcia\u0142by\u015b/chcia\u0142aby\u015b si\u0119 znale\u017a\u0107. Wykorzystam to, by uzupe\u0142ni\u0107 Tw\u00f3j profil.",
  },
};

const LANG_NAME = { en: "English", pl: "Polish" };

function MefinderMark({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9.5" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.4" />
      <polygon points="12,3.6 14.6,12 12,12.9" fill="#FFFFFF" />
      <polygon points="12,20.4 9.4,12 12,11.1" fill="#FFFFFF" fillOpacity="0.4" />
      <circle cx="12" cy="12" r="1.6" fill={C.amber} />
    </svg>
  );
}

function Avatar({ Icon, size = 34, tint }) {
  const bg = tint ? `${tint}17` : C.chip;
  const fg = tint || C.black;
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2.6, background: bg, color: fg,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Icon size={size * 0.48} strokeWidth={2} />
    </div>
  );
}

function FieldCard({ label, icon, tint, children }) {
  return (
    <div style={{ background: C.card, borderRadius: 22, padding: "18px 20px", marginBottom: 14, boxShadow: shadow, border: cardBorder }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <Avatar Icon={icon} tint={tint} />
        <span style={{ fontFamily: "Inter", fontSize: 13.5, fontWeight: 700, color: C.text, letterSpacing: "-0.01em" }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function LineField({ label, icon, tint, value, onChange, placeholder, type = "text", width }) {
  return (
    <FieldCard label={label} icon={icon} tint={tint}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{ ...inputBase, width: width || "100%", boxSizing: "border-box" }}
        onFocus={focusIn}
        onBlur={blurOut}
      />
    </FieldCard>
  );
}

const inputBase = {
  background: C.chip, border: "1.5px solid transparent", borderRadius: 12,
  padding: "10px 14px", color: C.text, fontFamily: "Inter", fontSize: 14, outline: "none",
  transition: "border-color 0.15s ease, background 0.15s ease",
};
const focusIn = (e) => { e.target.style.borderColor = C.black; e.target.style.background = "#FFFFFF"; };
const blurOut = (e) => { e.target.style.borderColor = "transparent"; e.target.style.background = C.chip; };

function PillChoice({ options, value, onChange }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <button key={opt} onClick={() => onChange(active ? "" : opt)} style={{
            background: active ? C.black : C.chip, color: active ? "#fff" : C.text,
            border: "none", borderRadius: 20, padding: "8px 16px", fontFamily: "Inter",
            fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s ease",
          }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function ChipInput({ label, icon, tint, items, setItems, placeholder }) {
  const [draft, setDraft] = useState("");
  const add = () => {
    const v = draft.trim();
    if (!v) return;
    setItems([...items, v]);
    setDraft("");
  };
  return (
    <FieldCard label={label} icon={icon} tint={tint}>
      <div style={{ display: "flex", gap: 8, marginBottom: items.length ? 12 : 0 }}>
        <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder={placeholder} style={{ ...inputBase, flex: 1 }} onFocus={focusIn} onBlur={blurOut} />
        <button onClick={add} style={{
          background: C.black, border: "none", color: "#fff", borderRadius: 12,
          width: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          transition: "transform 0.12s ease",
        }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.92)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Plus size={17} />
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((it, i) => (
          <span key={i} style={{
            display: "flex", alignItems: "center", gap: 7, background: C.chip, color: C.text,
            borderRadius: 20, padding: "6px 8px 6px 14px", fontFamily: "Inter", fontSize: 13, fontWeight: 600,
          }}>
            {it}
            <X size={13} style={{ cursor: "pointer", color: C.textSoft }} onClick={() => setItems(items.filter((_, idx) => idx !== i))} />
          </span>
        ))}
      </div>
    </FieldCard>
  );
}

function TextField({ label, icon, tint, value, onChange, placeholder, rows = 3 }) {
  return (
    <FieldCard label={label} icon={icon} tint={tint}>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={rows}
        style={{ ...inputBase, width: "100%", resize: "vertical", boxSizing: "border-box", lineHeight: 1.55 }}
        onFocus={focusIn} onBlur={blurOut} />
    </FieldCard>
  );
}

async function callClaude(system, messages, maxTokens = 1000, useSearch = false) {
  const body = { model: "claude-sonnet-4-6", max_tokens: maxTokens, system, messages };
  if (useSearch) body.tools = [{ type: "web_search_20250305", name: "web_search" }];
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return (data.content || []).map((b) => b.text || "").join("\n");
}

function extractJson(raw) {
  let cleaned = raw.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1) cleaned = cleaned.slice(start, end + 1);
  return JSON.parse(cleaned);
}

function profileIsEmpty(p) {
  return !p.interests.length && !p.dislikes.length && !p.values.length && !p.experience.length && !p.technicalSkills.length && !p.softSkills.length && !p.education.trim() && !p.goals.trim() && !p.age.trim() && !p.location.trim() && !p.workStyle.trim() && !p.employmentType.trim() && !p.workHours.trim();
}

function profileSummary(p) {
  return [
    `Age: ${p.age || "not provided"}`,
    `Location: ${p.location || "not provided"}`,
    `Interests: ${p.interests.join(", ") || "none listed"}`,
    `Dislikes: ${p.dislikes.join(", ") || "none listed"}`,
    `Education background: ${p.education || "not provided"}`,
    `Job experience: ${p.experience.join("; ") || "none listed"}`,
    `Technical skills: ${p.technicalSkills.join(", ") || "none listed"}`,
    `Soft skills: ${p.softSkills.join(", ") || "none listed"}`,
    `Priorities (in order): ${p.priorities.join(" > ") || "none listed"}`,
    `Values: ${p.values.join(", ") || "none listed"}`,
    `Long-term goals: ${p.goals || "not provided"}`,
    `Preferred work style: ${p.workStyle || "no preference specified"}`,
    `Preferred employment type: ${p.employmentType || "no preference specified"}`,
    `Preferred working hours: ${p.workHours || "not specified"}`,
    `Additional notes from conversation: ${p.notes || "none"}`,
  ].join("\n");
}

function jobTierStyle(tier, lang) {
  const s = STRINGS[lang] || STRINGS.en;
  if (tier === "strong_fit") return { badgeBg: C.greenBg, badgeFg: C.green, label: s.tierStrongFit, nodeIcon: Check };
  if (tier === "weak_fit") return { badgeBg: C.redBg, badgeFg: C.red, label: s.tierWeakFit, nodeIcon: AlertTriangle };
  return { badgeBg: C.blueBg, badgeFg: C.blue, label: s.tierPossibleFit, nodeIcon: Circle };
}

function JobCard({ job, lang = "en" }) {
  const s = STRINGS[lang] || STRINGS.en;
  const tier = jobTierStyle(job.tier, lang);
  const NodeIcon = tier.nodeIcon;
  return (
    <div style={{
      background: C.card, borderRadius: 20, padding: "16px 18px", boxShadow: shadow, border: cardBorder,
      display: "flex", flexDirection: "column", gap: 8, transition: "transform 0.18s ease, box-shadow 0.18s ease",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = shadowHover; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = shadow; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%", background: tier.badgeBg, color: tier.badgeFg,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <NodeIcon size={14} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{job.title}</div>
            <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.textSoft, marginTop: 1 }}>
              {job.company}{job.location ? ` \u00b7 ${job.location}` : ""}{job.source ? ` \u00b7 via ${job.source}` : ""}
            </div>
          </div>
        </div>
        <span style={{
          background: tier.badgeBg, color: tier.badgeFg, fontFamily: "Inter",
          fontSize: 10.5, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase",
          padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0,
        }}>
          {tier.label}
        </span>
      </div>
      <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{job.why}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 2 }}>
        {job.url ? (
          <a href={job.url} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 6, color: C.black, fontFamily: "Inter",
            fontSize: 12.5, fontWeight: 700, textDecoration: "none",
          }}>
            {s.viewListing} <ExternalLink size={13} />
          </a>
        ) : <span />}
        {job.posted && (
          <span style={{ fontFamily: "Inter", fontSize: 11.5, color: C.textMuted, fontWeight: 600 }}>
            {s.posted} {job.posted}
          </span>
        )}
      </div>
    </div>
  );
}

function JobResultsList({ jobs, note, emptyMessage, lang = "en" }) {
  return (
    <div style={{ marginTop: 20 }}>
      {note && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8, fontFamily: "Inter", fontSize: 12, color: C.textSoft,
          marginBottom: 14, fontWeight: 500, background: C.blueBg, borderRadius: 12, padding: "9px 13px",
        }}>
          <Globe size={13} color={C.blue} style={{ flexShrink: 0 }} />
          {note}
        </div>
      )}
      {jobs.length === 0 && (
        <div style={{ fontFamily: "Inter", fontSize: 13, color: C.textSoft, background: C.card, borderRadius: 18, padding: "16px 18px", boxShadow: shadow, border: cardBorder }}>
          {emptyMessage}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {jobs.map((job, i) => <JobCard key={i} job={job} lang={lang} />)}
      </div>
    </div>
  );
}

export default function DecisionAdvisor() {
  const [tab, setTab] = useState("profile");
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState("idle");
  const [lang, setLang] = useState("en");

  const t = (key) => (STRINGS[lang] && STRINGS[lang][key] !== undefined ? STRINGS[lang][key] : STRINGS.en[key]);
  const langInstruction = lang === "pl" ? "Respond in Polish (polski)." : "Respond in English.";

  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [values, setValues] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState([]);
  const [technicalSkills, setTechnicalSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [workStyle, setWorkStyle] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [workHours, setWorkHours] = useState("");
  const [goals, setGoals] = useState("");
  const [notes, setNotes] = useState("");

  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [chatLoaded, setChatLoaded] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [pendingSuggestions, setPendingSuggestions] = useState([]);
  const chatEndRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");
  const [suggesting, setSuggesting] = useState(false);
  const [suggestError, setSuggestError] = useState("");

  const [history, setHistory] = useState([]);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [viewingPast, setViewingPast] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  const [jobKeywords, setJobKeywords] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [searchingJobs, setSearchingJobs] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [jobListings, setJobListings] = useState(null);

  const [recommendedJobs, setRecommendedJobs] = useState(null);
  const [findingMatches, setFindingMatches] = useState(false);
  const [matchesError, setMatchesError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("profile", false);
        if (res && res.value) {
          const p = JSON.parse(res.value);
          setAge(p.age || "");
          setLocation(p.location || "");
          setLang(p.lang || "en");
          setInterests(p.interests || []);
          setDislikes(p.dislikes || []);
          setValues(p.values || []);
          setPriorities(p.priorities || []);
          setEducation(p.education || "");
          setExperience(p.experience || []);
          setTechnicalSkills(p.technicalSkills || []);
          setSoftSkills(p.softSkills || []);
          setWorkStyle(p.workStyle || "");
          setEmploymentType(p.employmentType || "");
          setWorkHours(p.workHours || "");
          setGoals(p.goals || "");
          setNotes(p.notes || "");
        }
      } catch (e) {}
      setLoaded(true);
    })();
    (async () => {
      try {
        const res = await window.storage.get("chatHistory", false);
        if (res && res.value) {
          const saved = JSON.parse(res.value);
          if (Array.isArray(saved) && saved.length) setChatMessages(saved);
        }
      } catch (e) {}
      setChatLoaded(true);
    })();
    (async () => {
      try {
        const res = await window.storage.get("decisionHistory", false);
        if (res && res.value) {
          const saved = JSON.parse(res.value);
          if (Array.isArray(saved)) setHistory(saved);
        }
      } catch (e) {}
      setHistoryLoaded(true);
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    setSaveState("saving");
    const t = setTimeout(async () => {
      try {
        const p = { age, location, lang, interests, dislikes, values, priorities, education, experience, technicalSkills, softSkills, workStyle, employmentType, workHours, goals, notes };
        await window.storage.set("profile", JSON.stringify(p), false);
        setSaveState("saved");
      } catch (e) {
        setSaveState("error");
      }
    }, 600);
    return () => clearTimeout(t);
  }, [age, location, lang, interests, dislikes, values, priorities, education, experience, technicalSkills, softSkills, workStyle, employmentType, workHours, goals, notes, loaded]);

  useEffect(() => {
    if (!chatLoaded) return;
    const t = setTimeout(async () => {
      try {
        await window.storage.set("chatHistory", JSON.stringify(chatMessages), false);
      } catch (e) {}
    }, 500);
    return () => clearTimeout(t);
  }, [chatMessages, chatLoaded]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (loaded && location.trim() && !jobLocation.trim()) setJobLocation(location.trim());
  }, [loaded, location]);

  useEffect(() => {
    if (loaded && chatLoaded && chatMessages.length === 0) {
      setChatMessages([{ role: "assistant", content: t("chatGreeting") }]);
    }
  }, [loaded, chatLoaded]);

  const profile = { age, location, interests, dislikes, values, priorities, education, experience, technicalSkills, softSkills, workStyle, employmentType, workHours, goals, notes };

  const sendChat = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    const newMsgs = [...chatMessages, { role: "user", content: text }];
    setChatMessages(newMsgs);
    setChatInput("");
    setChatLoading(true);
    try {
      const system = `You are a warm, perceptive career and education advisor helping someone build a personal profile for a decision-support tool. Their current profile so far:\n${profileSummary(profile)}\n\nHave a natural conversation to learn more about their interests, dislikes, education, priorities, values, and long-term goals. Keep replies to 2-4 sentences. Ask at most one focused follow-up question. Be encouraging but honest, never generic. ${langInstruction}`;
      const reply = await callClaude(system, newMsgs.map((m) => ({ role: m.role, content: m.content })));
      const finalMsgs = [...newMsgs, { role: "assistant", content: reply }];
      setChatMessages(finalMsgs);
      setNotes((prev) => (prev ? prev + "\n" : "") + `User said: ${text}`);
      extractProfileUpdates(finalMsgs);
    } catch (e) {
      setChatMessages([...newMsgs, { role: "assistant", content: "Something went wrong reaching the advisor. Please try again." }]);
    }
    setChatLoading(false);
  };

  const extractProfileUpdates = async (conversationSoFar) => {
    try {
      const recent = conversationSoFar.slice(-8);
      const system = `You are extracting structured profile information from a conversation between a person and their career advisor. Their CURRENT profile:\n${profileSummary(profile)}\n\nRead the conversation and identify only NEW information the person revealed that is not already captured above. Respond with ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:\n{"age": string|null, "location": string|null, "interests": [string], "dislikes": [string], "values": [string], "priorities": [string], "experience": [string], "technicalSkills": [string], "softSkills": [string], "workStyle": "Remote" | "Hybrid" | "On-site" | null, "employmentType": "Full-time" | "Part-time" | null, "workHours": string|null, "education": string|null, "goals": string|null}\nUse null or an empty array for anything not newly mentioned. Keep each entry short, 2-6 words. Do not repeat anything already in the current profile.`;
      const raw = await callClaude(system, recent.map((m) => ({ role: m.role, content: m.content })), 450);
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      const found = [];
      const pushChips = (field, arr, existing) => {
        (arr || []).forEach((v) => {
          const val = (v || "").toString().trim();
          if (!val) return;
          if (existing.some((e) => e.toLowerCase() === val.toLowerCase())) return;
          found.push({ id: `${field}-${val}-${Date.now()}-${Math.random().toString(36).slice(2)}`, field, value: val, kind: "chip" });
        });
      };
      pushChips("interests", parsed.interests, interests);
      pushChips("dislikes", parsed.dislikes, dislikes);
      pushChips("values", parsed.values, values);
      pushChips("priorities", parsed.priorities, priorities);
      pushChips("experience", parsed.experience, experience);
      pushChips("technicalSkills", parsed.technicalSkills, technicalSkills);
      pushChips("softSkills", parsed.softSkills, softSkills);
      if (parsed.age && !age.trim()) {
        found.push({ id: `age-${Date.now()}`, field: "age", value: String(parsed.age).trim(), kind: "text" });
      }
      if (parsed.location && parsed.location.trim() && !location.trim()) {
        found.push({ id: `location-${Date.now()}`, field: "location", value: parsed.location.trim(), kind: "text" });
      }
      if (parsed.workStyle && parsed.workStyle.trim() && !workStyle.trim()) {
        found.push({ id: `workStyle-${Date.now()}`, field: "workStyle", value: parsed.workStyle.trim(), kind: "text" });
      }
      if (parsed.employmentType && parsed.employmentType.trim() && !employmentType.trim()) {
        found.push({ id: `employmentType-${Date.now()}`, field: "employmentType", value: parsed.employmentType.trim(), kind: "text" });
      }
      if (parsed.workHours && parsed.workHours.trim() && !workHours.trim()) {
        found.push({ id: `workHours-${Date.now()}`, field: "workHours", value: parsed.workHours.trim(), kind: "text" });
      }
      if (parsed.education && parsed.education.trim() && !education.toLowerCase().includes(parsed.education.trim().toLowerCase())) {
        found.push({ id: `education-${Date.now()}`, field: "education", value: parsed.education.trim(), kind: "text" });
      }
      if (parsed.goals && parsed.goals.trim() && !goals.toLowerCase().includes(parsed.goals.trim().toLowerCase())) {
        found.push({ id: `goals-${Date.now()}`, field: "goals", value: parsed.goals.trim(), kind: "text" });
      }
      if (found.length) setPendingSuggestions((prev) => [...prev, ...found]);
    } catch (e) {
      // extraction is a nice-to-have; fail silently so it never disrupts the conversation
    }
  };

  const FIELD_META = {
    interests: { label: "Interest", icon: Heart, setItems: setInterests, items: interests },
    dislikes: { label: "Dislike", icon: HeartCrack, setItems: setDislikes, items: dislikes },
    values: { label: "Value", icon: Sparkles, setItems: setValues, items: values },
    priorities: { label: "Priority", icon: Flag, setItems: setPriorities, items: priorities },
    experience: { label: "Experience", icon: Briefcase, setItems: setExperience, items: experience },
    technicalSkills: { label: "Technical skill", icon: Cpu, setItems: setTechnicalSkills, items: technicalSkills },
    softSkills: { label: "Soft skill", icon: Users, setItems: setSoftSkills, items: softSkills },
    age: { label: "Age", icon: Cake },
    location: { label: "Location", icon: MapPin },
    workStyle: { label: "Work style", icon: Building2 },
    employmentType: { label: "Employment type", icon: Timer },
    workHours: { label: "Working hours", icon: Clock },
    education: { label: "Education", icon: GraduationCap },
    goals: { label: "Goal", icon: Target },
  };

  const applySuggestion = (s) => {
    const meta = FIELD_META[s.field];
    if (s.kind === "chip" && meta) {
      if (!meta.items.some((i) => i.toLowerCase() === s.value.toLowerCase())) meta.setItems([...meta.items, s.value]);
    } else if (s.field === "age") {
      if (!age.trim()) setAge(s.value);
    } else if (s.field === "location") {
      if (!location.trim()) setLocation(s.value);
    } else if (s.field === "workStyle") {
      if (!workStyle.trim()) setWorkStyle(s.value);
    } else if (s.field === "employmentType") {
      if (!employmentType.trim()) setEmploymentType(s.value);
    } else if (s.field === "workHours") {
      if (!workHours.trim()) setWorkHours(s.value);
    } else if (s.field === "education") {
      setEducation((prev) => (prev ? prev + ". " + s.value : s.value));
    } else if (s.field === "goals") {
      setGoals((prev) => (prev ? prev + ". " + s.value : s.value));
    }
    setPendingSuggestions((prev) => prev.filter((p) => p.id !== s.id));
  };

  const dismissSuggestion = (id) => setPendingSuggestions((prev) => prev.filter((p) => p.id !== id));

  const runAnalysis = async () => {
    const validOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim() || validOptions.length < 2) return;
    setAnalyzing(true);
    setAnalyzeError("");
    setAnalysis(null);
    try {
      const system = `You are a rigorous, honest decision advisor for career and education choices. Given a person's profile and a decision with several options, evaluate each option against their specific interests, dislikes, education, priorities, values, and goals.\n\nPerson's profile:\n${profileSummary(profile)}\n\nRespond with ONLY valid JSON, no markdown fences, no preamble, no trailing text, in exactly this shape:\n{"summary": "one or two sentence overview of the decision", "options": [{"name": "option name", "tier": "recommended" | "worth_considering" | "least_suitable", "pros": ["short pro", "short pro"], "cons": ["short con", "short con"], "reasoning": "1-2 sentences on fit for THIS person"}]}\n\nKeep pros/cons to 2-4 short items each. Be specific to their profile, not generic career advice. Be honest about why lower-tier options are less suitable for this particular person. Write all text values (summary, option names, pros, cons, reasoning) in the requested language; keep the JSON keys and tier values exactly as specified in English. ${langInstruction}`;
      const userMsg = `Decision: ${question.trim()}\nOptions to evaluate: ${validOptions.join(", ")}`;
      const raw = await callClaude(system, [{ role: "user", content: userMsg }], 1000);
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      setAnalysis(parsed);
      setViewingPast(null);
      const entry = { id: Date.now(), timestamp: new Date().toISOString(), question: question.trim(), options: validOptions, analysis: parsed, checkedIn: false };
      const nextHistory = [entry, ...history].slice(0, 25);
      setHistory(nextHistory);
      try {
        await window.storage.set("decisionHistory", JSON.stringify(nextHistory), false);
      } catch (e) {}
    } catch (e) {
      setAnalyzeError("Couldn't complete the analysis. Please try again.");
    }
    setAnalyzing(false);
  };

  const suggestOptions = async () => {
    setSuggesting(true);
    setSuggestError("");
    try {
      const decisionContext = question.trim() || "What career or education paths would suit this person best right now?";
      const system = `You are a perceptive career and education advisor. Based ONLY on the person's profile below, propose 3-4 concrete, specific career or education paths worth considering \u2014 not generic categories. Draw on their interests, dislikes, education, job experience, priorities, values, and goals.\n\nPerson's profile:\n${profileSummary(profile)}\n\nRespond with ONLY valid JSON, no markdown fences, no preamble, in exactly this shape:\n{"question": "a short framing of the decision, e.g. 'Which path should I pursue next?'", "options": ["specific path 1", "specific path 2", "specific path 3"]}\n\nEach option should be a specific, named path (e.g. "UX research role at a mid-size product company", not "something in tech"). Write the question and options in the requested language, keeping JSON keys in English. ${langInstruction}`;
      const raw = await callClaude(system, [{ role: "user", content: decisionContext }], 500);
      const cleaned = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (!question.trim() && parsed.question) setQuestion(parsed.question);
      const suggested = (parsed.options || []).slice(0, 4);
      setOptions(suggested.length ? suggested : options);
      setAnalysis(null);
    } catch (e) {
      setSuggestError("Couldn't generate suggestions. Please try again.");
    }
    setSuggesting(false);
  };

  const findMatches = async () => {
    setFindingMatches(true);
    setMatchesError("");
    setRecommendedJobs(null);
    try {
      const locationPart = location.trim() ? ` The person is based in or near ${location.trim()}${jobLocation.trim() && jobLocation.trim().toLowerCase() !== location.trim().toLowerCase() ? `, though for this search prefer ${jobLocation.trim()}` : ""}.` : jobLocation.trim() ? ` Prefer roles in or near ${jobLocation.trim()}.` : " No location was specified, so include remote-friendly roles and note that broader results are available with a location.";
      const system = `You are a job search assistant with live web search. Do NOT wait for a specific role name \u2014 infer 3-5 suitable, specific job titles yourself from this person's full profile (skills, experience, education, interests, values, and work preferences), then search the web right now for REAL job openings that are CURRENTLY posted and accepting applications for those roles.${locationPart} Respect their preferred work style and hours if specified. Find 4-6 genuine listings from real sources with real, working URLs \u2014 never invent a listing or a URL, and never include one you believe is expired or closed. If you cannot verify a real, currently-open posting with a real link, leave it out rather than guessing.\n\nPerson's full profile:\n${profileSummary(profile)}\n\nRespond with ONLY valid JSON, no markdown fences, no preamble, no trailing commentary, in exactly this shape:\n{"listings": [{"title": "job title", "company": "company name", "location": "city/remote", "source": "site name e.g. LinkedIn, Indeed, company site", "url": "https://real-url", "posted": "how recently it was posted, if known, e.g. '3 days ago' or 'not specified'", "tier": "strong_fit" | "possible_fit" | "weak_fit", "why": "1-2 sentences on why this role fits THIS person specifically, in your own words"}]}\n\nDescribe each listing in your own words \u2014 do not quote job posting text directly. Only include roles and listings you actually found via search, ranked by how well they match the profile. Write title, why, and other free-text fields in the requested language; keep JSON keys and tier values in English. ${langInstruction}`;
      const raw = await callClaude(system, [{ role: "user", content: "Find real, currently open job openings that best match my full profile." }], 1500, true);
      const parsed = extractJson(raw);
      setRecommendedJobs(Array.isArray(parsed.listings) ? parsed.listings : []);
    } catch (e) {
      setMatchesError("Couldn't find matches right now. Please try again.");
    }
    setFindingMatches(false);
  };

  const searchJobs = async () => {
    if (!jobKeywords.trim()) return;
    setSearchingJobs(true);
    setJobsError("");
    setJobListings(null);
    try {
      const locationPart = jobLocation.trim() ? ` in or near ${jobLocation.trim()}` : " (open to remote or unspecified location)";
      const system = `You are a job search assistant with live web search. Search the web right now for REAL job openings that are CURRENTLY posted and accepting applications for "${jobKeywords.trim()}"${locationPart}. Find 4-6 genuine listings from real sources (job boards, company career pages, LinkedIn, Indeed, etc.) with real, working URLs \u2014 never invent a listing or a URL, and never include a listing you believe is expired or closed. If you cannot verify a real, currently-open posting with a real link, leave it out rather than guessing.\n\nThen evaluate each listing against this person's profile:\n${profileSummary(profile)}\n\nRespond with ONLY valid JSON, no markdown fences, no preamble, no trailing commentary, in exactly this shape:\n{"listings": [{"title": "job title", "company": "company name", "location": "city/remote", "source": "site name e.g. LinkedIn, Indeed, company site", "url": "https://real-url", "posted": "how recently it was posted, if known, e.g. '3 days ago' or 'not specified'", "tier": "strong_fit" | "possible_fit" | "weak_fit", "why": "1-2 sentences on fit for THIS person, in your own words"}]}\n\nDescribe each listing in your own words \u2014 do not quote job posting text directly. Only include listings you actually found via search. Write title, why, and other free-text fields in the requested language; keep JSON keys and tier values in English. ${langInstruction}`;
      const raw = await callClaude(system, [{ role: "user", content: `Find current job openings: ${jobKeywords.trim()}${jobLocation.trim() ? " near " + jobLocation.trim() : ""}` }], 1500, true);
      const parsed = extractJson(raw);
      setJobListings(Array.isArray(parsed.listings) ? parsed.listings : []);
    } catch (e) {
      setJobsError("Couldn't complete the job search. Please try again.");
    }
    setSearchingJobs(false);
  };

  const openPast = (entry) => {
    setQuestion(entry.question);
    setOptions(entry.options.length >= 2 ? entry.options : [...entry.options, "", ""].slice(0, 4));
    setAnalysis(entry.analysis);
    setViewingPast(entry.id);
    setAnalyzeError("");
  };

  const deletePast = async (id, e) => {
    e.stopPropagation();
    const next = history.filter((h) => h.id !== id);
    setHistory(next);
    if (viewingPast === id) {
      setViewingPast(null);
      setAnalysis(null);
    }
    try {
      await window.storage.set("decisionHistory", JSON.stringify(next), false);
    } catch (err) {}
  };

  const startFresh = () => {
    setQuestion("");
    setOptions(["", ""]);
    setAnalysis(null);
    setViewingPast(null);
    setAnalyzeError("");
  };

  const markChecked = async (id) => {
    const next = history.map((h) => (h.id === id ? { ...h, checkedIn: true } : h));
    setHistory(next);
    try {
      await window.storage.set("decisionHistory", JSON.stringify(next), false);
    } catch (e) {}
  };

  const triggerRevisit = (entry) => {
    markChecked(entry.id);
    const revisitMsg = lang === "pl"
      ? `Ostatnio zastanawia\u0142e\u015b/a\u015b si\u0119 nad: "${entry.question}". Jak to teraz wygl\u0105da \u2014 co\u015b si\u0119 zmieni\u0142o w Twojej sytuacji, albo pojawi\u0142y si\u0119 nowe informacje?`
      : `Last time, you were weighing "${entry.question}". How's that looking now \u2014 any changes to your situation, or new information since then?`;
    setChatMessages((prev) => [...prev, { role: "assistant", content: revisitMsg }]);
    setTab("chat");
  };

  const followUpCandidate = (() => {
    if (history.length < 2) return null;
    const newestId = history[0]?.id;
    const sorted = [...history].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    return sorted.find((h) => !h.checkedIn && h.id !== newestId) || null;
  })();

  const daysAgoLabel = (iso) => {
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24));
    if (lang === "pl") {
      if (days <= 0) return "dzisiaj";
      if (days === 1) return "wczoraj";
      return `${days} dni temu`;
    }
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    return `${days} days ago`;
  };

  const tierStyle = (tier) => {
    if (tier === "recommended") return { badgeBg: C.greenBg, badgeFg: C.green, label: t("tierRecommended"), nodeIcon: Check };
    if (tier === "least_suitable") return { badgeBg: C.redBg, badgeFg: C.red, label: t("tierLeastSuitable"), nodeIcon: AlertTriangle };
    return { badgeBg: C.blueBg, badgeFg: C.blue, label: t("tierWorthConsidering"), nodeIcon: Circle };
  };

  const TAB_ICONS = { profile: GraduationCap, chat: MessageCircle, decide: Compass, jobs: Globe };

  const segBtn = (id, label) => {
    const active = tab === id;
    const Icon = TAB_ICONS[id];
    return (
      <button onClick={() => setTab(id)} style={{
        flex: 1, padding: "10px 8px", borderRadius: 12, border: "none", cursor: "pointer",
        fontFamily: "Inter", fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        background: active ? C.black : "transparent",
        color: active ? "#fff" : C.textSoft,
        boxShadow: active ? "0 8px 18px rgba(20,22,26,0.22)" : "none",
        transition: "all 0.18s ease",
      }}>
        <Icon size={14} />
        {label}
      </button>
    );
  };

  const primaryBtn = (label, onClick, disabled, loading, Icon) => (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? C.textMuted : C.black, border: "none", color: "#fff", borderRadius: 15,
      padding: "13px 24px", fontFamily: "Inter", fontWeight: 700, fontSize: 14,
      cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", gap: 9,
      boxShadow: disabled ? "none" : "0 4px 10px rgba(20,22,26,0.14), 0 14px 28px rgba(20,22,26,0.2)",
      transition: "transform 0.16s ease, box-shadow 0.16s ease",
    }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 14px rgba(20,22,26,0.18), 0 18px 34px rgba(20,22,26,0.24)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = disabled ? "none" : "0 4px 10px rgba(20,22,26,0.14), 0 14px 28px rgba(20,22,26,0.2)"; }}
    >
      {loading ? <Loader2 size={16} style={{ animation: "spin 0.9s linear infinite" }} /> : <Icon size={16} />}
      {label}
    </button>
  );

  return (
    <div style={{
      background: `radial-gradient(circle at 18% -10%, #F6F7F9 0%, ${C.page} 42%, #E7E8EC 100%)`,
      minHeight: 640, fontFamily: "Inter", color: C.text, borderRadius: 28, overflow: "hidden",
    }}>
      <style>{FONTS}</style>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } ::placeholder { color: ${C.textMuted}; }`}</style>

      <div style={{ padding: "26px 24px 16px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 20 }}>
          <div style={{
            width: 46, height: 46, borderRadius: 15, background: `linear-gradient(160deg, ${C.blackSoft}, ${C.black})`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            boxShadow: "0 6px 16px rgba(20,22,26,0.28)",
          }}>
            <MefinderMark size={24} />
          </div>
          <div>
            <div style={{ fontFamily: "Inter", fontSize: 21, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
              {t("appTitle")}
            </div>
            <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.textSoft, fontWeight: 500 }}>
              {t("appSubtitle")}
            </div>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              display: "flex", alignItems: "center", background: C.card, borderRadius: 20, boxShadow: shadow, border: cardBorder, padding: 3,
            }}>
              {["en", "pl"].map((code) => (
                <button key={code} onClick={() => setLang(code)} title={LANG_NAME[code]} style={{
                  padding: "5px 10px", borderRadius: 16, border: "none", cursor: "pointer",
                  fontFamily: "Inter", fontSize: 11, fontWeight: 800, letterSpacing: "0.02em",
                  background: lang === code ? C.black : "transparent",
                  color: lang === code ? "#fff" : C.textSoft,
                  transition: "all 0.15s ease",
                }}>
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6, fontFamily: "Inter", fontSize: 11,
              color: C.textSoft, fontWeight: 700, background: C.card, padding: "7px 12px", borderRadius: 20, boxShadow: shadow, border: cardBorder,
            }}>
              <ShieldCheck size={13} color={saveState === "error" ? C.red : C.green} />
              {saveState === "saving" ? t("saving") : saveState === "error" ? t("saveFailed") : t("saved")}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 4, background: C.card, borderRadius: 15, padding: 4, boxShadow: shadow, border: cardBorder }}>
          {segBtn("profile", t("tabProfile"))}
          {segBtn("chat", t("tabChat"))}
          {segBtn("decide", t("tabCompare"))}
          {segBtn("jobs", t("tabJobs"))}
        </div>
      </div>

      {tab === "profile" && (
        <div style={{ padding: "6px 24px 28px 24px", maxWidth: 640 }}>
          <div style={{ display: "flex", gap: 14 }}>
            <div style={{ flex: "0 0 140px" }}>
              <LineField label={t("ageLabel")} icon={Cake} tint={C.amber} type="number" value={age} onChange={setAge} placeholder={t("agePlaceholder")} />
            </div>
            <div style={{ flex: 1 }}>
              <LineField label={t("locationLabel")} icon={MapPin} tint={C.blue} value={location} onChange={setLocation} placeholder={t("locationPlaceholder")} />
            </div>
          </div>
          <ChipInput label={t("interestsLabel")} icon={Heart} tint={C.pink} items={interests} setItems={setInterests} placeholder={t("interestsPlaceholder")} />
          <ChipInput label={t("dislikesLabel")} icon={HeartCrack} items={dislikes} setItems={setDislikes} placeholder={t("dislikesPlaceholder")} />
          <TextField label={t("educationLabel")} icon={GraduationCap} tint={C.indigo} value={education} onChange={setEducation} placeholder={t("educationPlaceholder")} rows={2} />
          <ChipInput label={t("experienceLabel")} icon={Briefcase} tint={C.teal} items={experience} setItems={setExperience} placeholder={t("experiencePlaceholder")} />
          <ChipInput label={t("technicalSkillsLabel")} icon={Cpu} tint={C.indigo} items={technicalSkills} setItems={setTechnicalSkills} placeholder={t("technicalSkillsPlaceholder")} />
          <ChipInput label={t("softSkillsLabel")} icon={Users} tint={C.teal} items={softSkills} setItems={setSoftSkills} placeholder={t("softSkillsPlaceholder")} />
          <FieldCard label={t("workPrefsLabel")} icon={Building2} tint={C.blue}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 600, color: C.textSoft, marginBottom: 8 }}>{t("workStyleLabel")}</div>
              <PillChoice options={t("workStyleOptions")} value={workStyle} onChange={setWorkStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 600, color: C.textSoft, marginBottom: 8 }}>{t("employmentTypeLabel")}</div>
              <PillChoice options={t("employmentOptions")} value={employmentType} onChange={setEmploymentType} />
            </div>
            <div>
              <div style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 600, color: C.textSoft, marginBottom: 8 }}>{t("workHoursLabel")}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input value={workHours === "Flexible" ? "" : workHours} onChange={(e) => setWorkHours(e.target.value)}
                  placeholder={t("workHoursPlaceholder")} style={{ ...inputBase, flex: 1 }} onFocus={focusIn} onBlur={blurOut} />
                <button onClick={() => setWorkHours(workHours === "Flexible" ? "" : "Flexible")} style={{
                  background: workHours === "Flexible" ? C.black : C.chip, color: workHours === "Flexible" ? "#fff" : C.text,
                  border: "none", borderRadius: 12, padding: "0 16px", fontFamily: "Inter", fontSize: 13, fontWeight: 700,
                  cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s ease",
                }}>
                  {t("flexible")}
                </button>
              </div>
            </div>
          </FieldCard>
          <ChipInput label={t("prioritiesLabel")} icon={Flag} items={priorities} setItems={setPriorities} placeholder={t("prioritiesPlaceholder")} />
          <ChipInput label={t("valuesLabel")} icon={Sparkles} tint={C.green} items={values} setItems={setValues} placeholder={t("valuesPlaceholder")} />
          <TextField label={t("goalsLabel")} icon={Target} tint={C.blue} value={goals} onChange={setGoals} placeholder={t("goalsPlaceholder")} rows={3} />
          <div style={{ fontFamily: "Inter", fontSize: 12, color: C.textSoft, marginTop: 6, textAlign: "center" }}>
            {t("privacyNote")}
          </div>
        </div>
      )}

      {tab === "chat" && (
        <div style={{ padding: "6px 24px 24px 24px", display: "flex", flexDirection: "column", height: 520, maxWidth: 640 }}>
          <div style={{ flex: 1, overflowY: "auto", paddingRight: 4, paddingTop: 6 }}>
            {chatMessages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{
                  maxWidth: "80%", padding: "12px 16px", borderRadius: 16, fontSize: 14, lineHeight: 1.55,
                  fontFamily: "Inter", fontWeight: 500,
                  background: m.role === "user" ? C.black : C.card,
                  color: m.role === "user" ? "#fff" : C.text,
                  borderBottomRightRadius: m.role === "user" ? 4 : 16,
                  borderBottomLeftRadius: m.role === "user" ? 16 : 4,
                  boxShadow: m.role === "user" ? "none" : shadow,
                }}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.textSoft, fontSize: 13, fontWeight: 500 }}>
                <Loader2 size={14} style={{ animation: "spin 0.9s linear infinite" }} /> {t("thinking")}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {pendingSuggestions.length > 0 && (
            <div style={{ background: C.card, borderRadius: 16, padding: "14px 16px", marginTop: 12, boxShadow: shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <Lightbulb size={15} color="#D9A441" />
                <span style={{ fontFamily: "Inter", fontSize: 12.5, fontWeight: 700, color: C.text }}>
                  {t("suggestionsHeader")}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {pendingSuggestions.map((s) => {
                  const meta = FIELD_META[s.field] || {};
                  const Icon = meta.icon || Sparkles;
                  return (
                    <div key={s.id} style={{
                      display: "flex", alignItems: "center", gap: 8, background: C.chip, borderRadius: 20,
                      padding: "6px 8px 6px 12px", fontFamily: "Inter", fontSize: 12.5, fontWeight: 600, color: C.text,
                    }}>
                      <Icon size={13} color={C.textSoft} />
                      <span>{meta.label ? `${meta.label}: ` : ""}{s.value}</span>
                      <button onClick={() => applySuggestion(s)} style={{
                        background: C.black, border: "none", color: "#fff", borderRadius: "50%",
                        width: 20, height: 20, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                      }}>
                        <Check size={12} />
                      </button>
                      <X size={14} style={{ cursor: "pointer", color: C.textSoft }} onClick={() => dismissSuggestion(s.id)} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder={t("chatPlaceholder")}
                style={{
                  width: "100%", boxSizing: "border-box", background: C.card, border: "none", borderRadius: 24,
                  padding: "13px 16px", color: C.text, fontFamily: "Inter", fontSize: 14, outline: "none", boxShadow: shadow,
                }} />
            </div>
            <button onClick={sendChat} disabled={chatLoading} style={{
              background: C.black, border: "none", color: "#fff", borderRadius: "50%",
              width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
              flexShrink: 0,
            }}>
              <Send size={17} />
            </button>
          </div>
        </div>
      )}

      {tab === "decide" && (
        <div style={{ padding: "6px 24px 28px 24px", maxWidth: 700 }}>
          {followUpCandidate && (
            <div style={{
              display: "flex", gap: 12, alignItems: "center", background: C.card, borderRadius: 16,
              padding: "14px 16px", marginBottom: 14, boxShadow: shadow,
            }}>
              <Avatar Icon={History} tone="neutral" size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: C.text }}>
                  {t("howGoing")}
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 12.5, color: C.textSoft, marginTop: 2 }}>
                  "{followUpCandidate.question}" \u2014 {t("comparedPrefix")} {daysAgoLabel(followUpCandidate.timestamp)}
                </div>
              </div>
              <button onClick={() => triggerRevisit(followUpCandidate)} style={{
                background: C.black, border: "none", color: "#fff", borderRadius: 10, padding: "8px 14px",
                fontFamily: "Inter", fontSize: 12.5, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
              }}>
                {t("revisit")}
              </button>
              <button onClick={() => markChecked(followUpCandidate.id)} style={{
                background: "transparent", border: "none", color: C.textSoft, cursor: "pointer", padding: 6,
              }}>
                <X size={16} />
              </button>
            </div>
          )}

          {profileIsEmpty(profile) && (
            <div style={{
              display: "flex", gap: 10, alignItems: "center", background: C.card, borderRadius: 16,
              padding: "12px 16px", marginBottom: 18, fontSize: 13, color: C.text, fontWeight: 600, boxShadow: shadow,
            }}>
              <AlertTriangle size={16} color={C.red} />
              {t("profileEmptyDecide")}
            </div>
          )}


          {history.length > 0 && (
            <div style={{ background: C.card, borderRadius: 20, padding: "16px 18px", marginBottom: 14, boxShadow: shadow }}>
              <button onClick={() => setShowHistory((s) => !s)} style={{
                background: "transparent", border: "none", cursor: "pointer", width: "100%",
                display: "flex", alignItems: "center", gap: 12, padding: 0,
              }}>
                <Avatar Icon={History} />
                <span style={{ fontFamily: "Inter", fontSize: 13.5, fontWeight: 700, color: C.text, flex: 1, textAlign: "left" }}>
                  {t("pastDecisions")} ({history.length})
                </span>
                <ChevronRight size={16} color={C.textSoft} style={{ transform: showHistory ? "rotate(90deg)" : "none", transition: "transform 0.15s ease" }} />
              </button>
              {showHistory && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  {history.map((h) => (
                    <div key={h.id} onClick={() => openPast(h)} style={{
                      display: "flex", alignItems: "center", gap: 10, background: viewingPast === h.id ? C.chip : "transparent",
                      border: `1px solid ${C.border}`, borderRadius: 12, padding: "10px 12px", cursor: "pointer",
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {h.question}
                        </div>
                        <div style={{ fontFamily: "Inter", fontSize: 11.5, color: C.textSoft, marginTop: 2 }}>
                          {new Date(h.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} \u00b7 {h.options.length} options
                        </div>
                      </div>
                      <Trash2 size={15} color={C.textSoft} onClick={(e) => deletePast(h.id, e)} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {viewingPast && (
            <div style={{
              display: "flex", gap: 10, alignItems: "center", background: C.blueBg, borderRadius: 16,
              padding: "12px 16px", marginBottom: 18, fontSize: 13, color: C.blue, fontWeight: 600,
            }}>
              <History size={16} />
              {t("viewingPast")}
              <button onClick={startFresh} style={{
                marginLeft: "auto", background: "transparent", border: "none", color: C.blue, fontWeight: 700,
                fontFamily: "Inter", fontSize: 13, cursor: "pointer", textDecoration: "underline",
              }}>
                {t("startNew")}
              </button>
            </div>
          )}

          <FieldCard label={t("decisionLabel")} icon={Target}>
            <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder={t("decisionPlaceholder")}
              style={{ ...inputBase, width: "100%", boxSizing: "border-box" }} onFocus={focusIn} onBlur={blurOut} />
            <button onClick={suggestOptions} disabled={suggesting} style={{
              background: "transparent", border: `1.5px solid ${C.black}`, color: C.black, borderRadius: 12,
              padding: "9px 16px", fontFamily: "Inter", fontWeight: 700, fontSize: 13, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8, opacity: suggesting ? 0.6 : 1, marginTop: 14,
              transition: "background 0.15s ease",
            }}
              onMouseEnter={(e) => !suggesting && (e.currentTarget.style.background = C.chip)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {suggesting ? <Loader2 size={14} style={{ animation: "spin 0.9s linear infinite" }} /> : <Wand2 size={14} />}
              {suggesting ? t("thinkingPaths") : t("suggestPathsBtn")}
            </button>
            {suggestError && <div style={{ color: C.red, fontSize: 12, marginTop: 8, fontWeight: 600 }}>{suggestError}</div>}
          </FieldCard>

          <FieldCard label={t("optionsLabel")} icon={Compass}>
            {options.map((opt, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input value={opt} onChange={(e) => setOptions(options.map((o, idx) => (idx === i ? e.target.value : o)))}
                  placeholder={`${t("optionPlaceholder")} ${i + 1}`} style={{ ...inputBase, flex: 1 }} onFocus={focusIn} onBlur={blurOut} />
                {options.length > 2 && (
                  <button onClick={() => setOptions(options.filter((_, idx) => idx !== i))} style={{
                    background: "transparent", border: "none", color: C.textSoft, cursor: "pointer",
                    width: 36, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            {options.length < 4 && (
              <button onClick={() => setOptions([...options, ""])} style={{
                background: "transparent", border: `1.5px dashed ${C.border}`, color: C.textSoft, borderRadius: 12,
                padding: "9px 14px", fontFamily: "Inter", fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6, marginTop: 2,
              }}>
                <Plus size={14} /> {t("addOption")}
              </button>
            )}
          </FieldCard>

          {primaryBtn(
            analyzing ? t("analyzingBtn") : t("analyzeBtn"),
            runAnalysis,
            analyzing || !question.trim() || options.filter((o) => o.trim()).length < 2,
            analyzing,
            Compass
          )}

          {analyzeError && <div style={{ color: C.red, fontSize: 13, marginTop: 14, fontWeight: 600 }}>{analyzeError}</div>}

          {analysis && (
            <div style={{ marginTop: 32 }}>
              <div style={{
                fontFamily: "Inter", fontSize: 15, fontWeight: 600, lineHeight: 1.55, color: C.text, marginBottom: 22,
                background: C.card, borderRadius: 16, padding: "14px 18px", boxShadow: shadow,
              }}>
                {analysis.summary}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", background: C.black, display: "flex",
                  alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <Compass size={16} color="#fff" />
                </div>
                <div style={{ fontFamily: "Inter", fontSize: 12, fontWeight: 700, color: C.textSoft }}>{t("yourProfile")}</div>
                <div style={{ flex: 1, height: 2, background: `repeating-linear-gradient(90deg, ${C.border} 0 6px, transparent 6px 12px)` }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(analysis.options?.length || 1, 3)}, 1fr)`, gap: 14 }}>
                {(analysis.options || []).map((opt, i) => {
                  const t = tierStyle(opt.tier);
                  const NodeIcon = t.nodeIcon;
                  return (
                    <div key={i} style={{
                      background: C.card, borderRadius: 20, padding: "16px 16px 14px 16px",
                      display: "flex", flexDirection: "column", gap: 10, boxShadow: shadow, border: cardBorder,
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = shadowHover; }}
                      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = shadow; }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{
                          width: 26, height: 26, borderRadius: "50%", background: t.badgeBg, color: t.badgeFg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <NodeIcon size={14} strokeWidth={2.4} />
                        </div>
                        <span style={{
                          background: t.badgeBg, color: t.badgeFg, fontFamily: "Inter",
                          fontSize: 10.5, fontWeight: 800, letterSpacing: "0.03em", textTransform: "uppercase",
                          padding: "4px 10px", borderRadius: 20,
                        }}>
                          {t.label}
                        </span>
                      </div>
                      <div style={{ fontFamily: "Inter", fontSize: 15, fontWeight: 700, color: C.text, lineHeight: 1.3 }}>{opt.name}</div>
                      <div>
                        {(opt.pros || []).map((p, pi) => (
                          <div key={pi} style={{ display: "flex", gap: 7, fontSize: 12.5, color: C.text, marginBottom: 5, lineHeight: 1.4 }}>
                            <Check size={13} color={C.green} style={{ flexShrink: 0, marginTop: 2 }} />
                            {p}
                          </div>
                        ))}
                        {(opt.cons || []).map((c, ci) => (
                          <div key={ci} style={{ display: "flex", gap: 7, fontSize: 12.5, color: C.textSoft, marginBottom: 5, lineHeight: 1.4 }}>
                            <X size={13} color={C.red} style={{ flexShrink: 0, marginTop: 2 }} />
                            {c}
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 12, color: C.textSoft, borderTop: `1px solid ${C.border}`, paddingTop: 9, lineHeight: 1.5 }}>
                        {opt.reasoning}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {tab === "jobs" && (
        <div style={{ padding: "6px 24px 28px 24px", maxWidth: 700 }}>
          {profileIsEmpty(profile) && (
            <div style={{
              display: "flex", gap: 10, alignItems: "center", background: C.card, borderRadius: 16,
              padding: "12px 16px", marginBottom: 18, fontSize: 13, color: C.text, fontWeight: 600, boxShadow: shadow, border: cardBorder,
            }}>
              <AlertTriangle size={16} color={C.red} />
              {t("profileEmptyJobs")}
            </div>
          )}

          <FieldCard label={t("recommendedForYou")} icon={Sparkles} tint={C.pink}>
            <div style={{ fontSize: 13, color: C.textSoft, lineHeight: 1.5, marginBottom: 14 }}>
              {t("recommendedDesc")}
            </div>
            {primaryBtn(
              findingMatches ? t("findingMatchesBtn") : t("findMatchesBtn"),
              findMatches,
              findingMatches || profileIsEmpty(profile),
              findingMatches,
              Sparkles
            )}
            {matchesError && <div style={{ color: C.red, fontSize: 13, marginTop: 12, fontWeight: 600 }}>{matchesError}</div>}
          </FieldCard>

          {recommendedJobs && (
            <JobResultsList
              jobs={recommendedJobs}
              note={t("recommendedNote")}
              emptyMessage={t("recommendedEmpty")}
              lang={lang}
            />
          )}

          <div style={{ height: 22 }} />

          <FieldCard label={t("searchSpecificLabel")} icon={Globe}>
            <input value={jobKeywords} onChange={(e) => setJobKeywords(e.target.value)} placeholder={t("rolePlaceholder")}
              style={{ ...inputBase, width: "100%", boxSizing: "border-box", marginBottom: 10 }} onFocus={focusIn} onBlur={blurOut} />
            <input value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} placeholder={t("locationOptionalPlaceholder")}
              style={{ ...inputBase, width: "100%", boxSizing: "border-box" }} onFocus={focusIn} onBlur={blurOut} />
          </FieldCard>

          {primaryBtn(
            searchingJobs ? t("searchingBtn") : t("searchBtn"),
            searchJobs,
            searchingJobs || !jobKeywords.trim(),
            searchingJobs,
            Search
          )}

          {jobsError && <div style={{ color: C.red, fontSize: 13, marginTop: 14, fontWeight: 600 }}>{jobsError}</div>}

          {jobListings && (
            <JobResultsList
              jobs={jobListings}
              note={t("searchNote")}
              emptyMessage={t("searchEmpty")}
              lang={lang}
            />
          )}
        </div>
      )}
    </div>
  );
}
