import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, Menu, X, Zap, Phone, Calendar,
  TrendingUp, MessageSquare, Mail, Star, BarChart3,
  Globe, Users, Check, Activity, Database,
  Mic, RefreshCw, Target, Cpu, Layers,
  Shield, ChevronRight, Clock, Filter,
} from "lucide-react";

const faviconUrl = `${import.meta.env.BASE_URL}favicon.png`;

const CSS = `
  @keyframes float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-11px)} }
  @keyframes orb-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-55px) scale(1.08)} 66%{transform:translate(-25px,35px) scale(0.94)} }
  @keyframes orb-drift2 { 0%,100%{transform:translate(0,0)} 40%{transform:translate(-50px,30px)} 80%{transform:translate(30px,-40px)} }
  @keyframes pulse-dot { 0%,100%{opacity:.6} 50%{opacity:1;box-shadow:0 0 12px #3b82f6} }
  @keyframes waveform { 0%,100%{height:5px} 50%{height:26px} }
  @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
  @keyframes ping-ring { 0%{transform:scale(1);opacity:1} 75%,100%{transform:scale(2.2);opacity:0} }
  @keyframes slide-notif { 0%{transform:translateX(110%);opacity:0} 12%,80%{transform:translateX(0);opacity:1} 100%{transform:translateX(110%);opacity:0} }
  @keyframes count-in { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes ag { to{background-position:200% center} }
  .animate-gradient{ animation:ag 4s linear infinite; background-size:300% 100%; }
  .audit-input{ width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); border-radius:12px; padding:12px 16px; color:#fff; font-size:14px; outline:none; transition:border-color .2s; }
  .audit-input:focus{ border-color:rgba(59,130,246,.5); box-shadow:0 0 0 3px rgba(59,130,246,.1); }

  .fa{animation:float-a 7s ease-in-out infinite}
  .fb{animation:float-b 9s ease-in-out 1.2s infinite}
  .fc{animation:float-a 10s ease-in-out 2.5s infinite}
  .od{animation:orb-drift 20s ease-in-out infinite}
  .od2{animation:orb-drift2 25s ease-in-out 5s infinite}
  .pdot{animation:pulse-dot 2.8s ease-in-out infinite}
  .count-in{animation:count-in .6s ease-out forwards}

  .glass{
    background:rgba(255,255,255,0.03);
    backdrop-filter:blur(24px);
    -webkit-backdrop-filter:blur(24px);
    border:1px solid rgba(255,255,255,0.07);
  }
  .gc{
    background:rgba(255,255,255,0.04);
    backdrop-filter:blur(20px);
    -webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,0.07);
  }
  .tg{
    background:linear-gradient(135deg,#60a5fa 0%,#818cf8 50%,#c084fc 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .tgc{
    background:linear-gradient(135deg,#06b6d4,#3b82f6);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  .gbg{
    background-image:
      linear-gradient(rgba(59,130,246,.055) 1px,transparent 1px),
      linear-gradient(90deg,rgba(59,130,246,.055) 1px,transparent 1px);
    background-size:58px 58px;
  }
  .orb{
    position:absolute;
    border-radius:50%;
    filter:blur(80px);
    pointer-events:none;
  }
  .sc{transition:transform .28s ease,box-shadow .28s ease}
  .sc:hover{transform:translateY(-5px) scale(1.015);box-shadow:0 0 40px rgba(59,130,246,.14),0 24px 60px rgba(0,0,0,.45)}
  .sc:hover .si{box-shadow:0 0 18px rgba(59,130,246,.45)}
  .nl{position:relative}
  .nl::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:linear-gradient(90deg,#3b82f6,#8b5cf6);transform:scaleX(0);transition:transform .25s ease}
  .nl:hover::after{transform:scaleX(1)}
  .wbar{
    width:3px;
    border-radius:3px;
    background:linear-gradient(to top,#3b82f6,#8b5cf6);
    animation:waveform ease-in-out infinite;
    transform-origin:bottom;
  }
  .flip-card{
    position:relative;
    overflow:hidden;
    cursor:pointer;
  }
  .flip-card::before,
  .flip-card::after{
    position:absolute;
    content:'';
    width:22%;
    height:22%;
    transition:all .55s cubic-bezier(.4,0,.2,1);
    z-index:1;
    pointer-events:none;
  }
  .flip-card::before{
    top:0;right:0;
    border-radius:0 16px 0 100%;
    background:rgba(59,130,246,.18);
    border-left:1px solid rgba(59,130,246,.3);
    border-bottom:1px solid rgba(59,130,246,.3);
  }
  .flip-card::after{
    bottom:0;left:0;
    border-radius:0 100% 0 16px;
    background:rgba(59,130,246,.18);
    border-right:1px solid rgba(59,130,246,.3);
    border-top:1px solid rgba(59,130,246,.3);
  }
  .flip-card:hover::before,
  .flip-card:hover::after{
    width:100%;
    height:100%;
    border-radius:16px;
  }
  .flip-card .fc-default{ transition:opacity .3s ease,transform .3s ease; }
  .flip-card .fc-hover{ position:absolute;inset:0;padding:2rem;opacity:0;transform:scale(.96);transition:opacity .35s ease .15s,transform .35s ease .15s;z-index:2; }
  .flip-card:hover .fc-default{ opacity:0;transform:scale(.96); }
  .flip-card:hover .fc-hover{ opacity:1;transform:scale(1); }

  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:#050508}
  ::-webkit-scrollbar-thumb{background:#1a1d2e;border-radius:3px}
  ::-webkit-scrollbar-thumb:hover{background:#3b82f6}

  /* From Uiverse.io by majid_8020 */
  /* === Parent card === */
  .stack-card {
    --w: 280px;
    --h: 340px;
    --step: 0px;
    --offset: 50px;
    --hover-mult: 1.1;
    --active-mult: 6;

    position: relative;
    width: var(--w);
    height: var(--h);
    border-radius: 1rem;

    font-family: inherit;
    font-size: large;

    /* Match theme background */
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    transform: rotateX(0deg) rotateY(0deg);
    perspective: 600px;

    box-shadow: 0 0 40px rgba(59,130,246,.08), 0 24px 60px rgba(0,0,0,.3);
    border: 1px solid rgba(59,130,246,.15);
    transition: 0.6s ease-in-out;
    user-select: none;
  }

  .stack-card:hover {
    transform: rotateX(0deg) rotateY(0deg);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(59,130,246,.25);
    box-shadow: 0 0 50px rgba(59,130,246,.12), 0 28px 70px rgba(0,0,0,.25);
  }

  /* === Layers === */
  .layer {
    width: var(--w);
    height: var(--h);

    transform: translateX(calc((var(--i) - 6) * var(--offset)));

    position: absolute;
    top: 0;
    left: 0;
    border-radius: 1rem;

    /* Solid opaque background matching theme */
    background: linear-gradient(to bottom, rgba(20,22,30,0.98), rgba(15,17,25,0.98));
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03);

    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    z-index: calc(100 - var(--i));
    will-change: transform, opacity;
    opacity: 1;
  }

  @keyframes card-pull-out {
    0%   { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1); }
    58%  { transform: translateX(calc((var(--i) - 6) * var(--offset) + 190px)) scale(1); }
    76%  { transform: translateX(calc((var(--i) - 6) * var(--offset) + 190px)) scale(1.15); }
    100% { transform: translateX(calc((var(--i) - 6) * var(--offset) + 110px)) scale(1.15); }
  }

  @keyframes card-return {
    0%   { transform: translateX(calc((var(--i) - 6) * var(--offset) + 110px)) scale(1.15); }
    24%  { transform: translateX(calc((var(--i) - 6) * var(--offset) + 190px)) scale(1.15); }
    42%  { transform: translateX(calc((var(--i) - 6) * var(--offset) + 190px)) scale(1); }
    100% { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1); }
  }

  @keyframes card-depth {
    0%, 58% { z-index: calc(100 - var(--i)); }
    59%, 100% { z-index: 1002; }
  }

  @keyframes card-return-depth {
    0%, 42% { z-index: 1002; }
    43%, 100% { z-index: calc(100 - var(--i)); }
  }

  @keyframes first-card-pop {
    0%   { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1); }
    100% { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1.15); }
  }

  @keyframes first-card-return {
    0%   { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1.15); }
    100% { transform: translateX(calc((var(--i) - 6) * var(--offset))) scale(1); }
  }

  .layer.selected {
    animation:
      card-pull-out 0.92s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
      card-depth 0.92s steps(1, end) forwards !important;
    border: 1px solid rgba(59,130,246,0.3) !important;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(59,130,246,0.2) !important;
  }

  .layer.selected.first-card {
    animation: first-card-pop 0.42s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
    z-index: 1002 !important;
  }

  .layer.closing {
    animation:
      card-return 0.78s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards,
      card-return-depth 0.78s steps(1, end) forwards !important;
    border: 1px solid rgba(59,130,246,0.3) !important;
    box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(59,130,246,0.2) !important;
  }

  .layer.closing.first-card {
    animation: first-card-return 0.36s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards !important;
    z-index: 1002 !important;
  }

  .card-stack-close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
    background: transparent;
    border: 0;
    color: #ef4444;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: scale(0.86);
    transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
    z-index: 40;
  }

  .layer.selected .card-stack-close {
    opacity: 1;
    transform: scale(1);
  }

  .card-stack-close:hover {
    color: #fca5a5;
  }

  .stack-card:hover .layer:not(.selected) {
    background: linear-gradient(to bottom, rgba(25,27,35,0.98), rgba(20,22,30,0.98));
    border: 1px solid rgba(59,130,246,0.15);
    box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.08) inset;
    transform: translateX(calc((var(--i) - 6) * var(--offset) * var(--hover-mult)));
    transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .layer::after {
    content: var(--label);
    position: absolute;
    left: calc(100% + 17px);
    top: 50%;
    transform: translateY(-50%) translateX(-10px);
    transform-origin: left center;

    color: rgba(255,255,255,0.4);
    font-size: 0.85rem;
    font-weight: 400;
    text-shadow: none;
    white-space: nowrap;

    opacity: 0;
    pointer-events: none;

    transition: opacity 0.45s cubic-bezier(0.34, 0.46, 0.45, 0.94), color 0.45s ease, font-size 0.25s ease;
    transition-delay: calc(var(--i) * 0.025s + 0.08s);
  }

  .layer:hover::after {
    opacity: 1;
    color: #60a5fa;
    text-shadow: 0 0 14px rgba(96,165,250,.6), 0 0 28px rgba(96,165,250,.25);
    font-size: 1rem;
    transform: translateY(-50%) translateX(-10px);
    transition-delay: 0s;
  }

  .layer.selected::after,
  .layer.closing::after {
    opacity: 0;
    content: '';
  }

  .card-popup-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.6);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 1000;
  }

  .card-popup {
    display: none;
  }

  .card-popup-content {
    position: relative;
    padding: 24px;
    height: 100%;
    display: flex;
    flex-direction: column;
    z-index: 10;
  }

  .card-popup-close {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;
  }

  .card-popup-close:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.2);
    transform: rotate(90deg);
  }

  .card-content {
    position: absolute;
    inset: 0;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 20;
  }

  .card-content h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    color: #ffffff;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    line-height: 1.3;
  }

  .card-content p {
    font-size: 13px;
    line-height: 1.4;
    color: rgba(255,255,255,0.6);
    text-shadow: 0 1px 2px rgba(0,0,0,0.2);
  }

  .si {
    width: 56px;
    height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    flex-shrink: 0;
  }
`;

const AuditBtn = ({ disabled, onClick, label }: { disabled: boolean; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    style={{
      background: disabled ? "rgba(59,130,246,.3)" : "linear-gradient(135deg,#3b82f6,#8b5cf6)",
      boxShadow: disabled ? "none" : "0 0 28px rgba(59,130,246,.28)",
    }}
  >
    {label}
  </button>
);

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifIdx, setNotifIdx] = useState(0);
  const [notifVisible, setNotifVisible] = useState(true);
  const [auditOpen, setAuditOpen] = useState(false);
  const [auditStep, setAuditStep] = useState(0);
  const [auditData, setAuditData] = useState({ email: "", ticket: "", leads: "", qualRate: "", closeRate: "" });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [closingServiceIndex, setClosingServiceIndex] = useState(null);

  const resetAudit = () => { setAuditStep(0); setAuditData({ email: "", ticket: "", leads: "", qualRate: "", closeRate: "" }); };

  const handleCardClick = (index) => {
    if (selectedServiceIndex === index) return;
    setClosingServiceIndex(null);
    setSelectedServiceIndex(index);
  };

  const closeCardPopup = () => {
    if (selectedServiceIndex === null || closingServiceIndex !== null) return;
    const activeIndex = selectedServiceIndex;
    setClosingServiceIndex(activeIndex);
    setSelectedServiceIndex(null);
    window.setTimeout(() => {
      setClosingServiceIndex((current) => current === activeIndex ? null : current);
    }, activeIndex === 0 ? 360 : 780);
  };

  const auditLeak = () => {
    const t = parseFloat(auditData.ticket) || 0;
    const l = parseFloat(auditData.leads) || 0;
    const q = parseFloat(auditData.qualRate) / 100 || 0;
    const c = parseFloat(auditData.closeRate) / 100 || 0;
    const unqualified = l * (1 - q);
    return Math.round(unqualified * c * t);
  };

  const notifs = [
    { icon: "🎯", text: "New Lead Captured", sub: "Facebook Ads · 2s ago" },
    { icon: "📞", text: "AI Call Connected", sub: "Prospect qualified · just now" },
    { icon: "📅", text: "Appointment Booked", sub: "Demo: Friday 10am" },
    { icon: "🔥", text: "Hot Lead Detected", sub: "Score: 94 / 100" },
  ];

  useEffect(() => {
    const t = setInterval(() => {
      setNotifVisible(false);
      setTimeout(() => {
        setNotifIdx((p) => (p + 1) % notifs.length);
        setNotifVisible(true);
      }, 450);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  const services = [
    { icon: Mic,         title: "AI Cold Calling",        desc: "24/7 AI voice agents that qualify, pitch and book",          color: "#3b82f6" },
    { icon: Database,    title: "CRM Automation",         desc: "Full pipeline automation with smart lead routing",           color: "#8b5cf6" },
    { icon: Target,      title: "Lead Generation",        desc: "Multi-channel campaigns that deliver buying prospects",      color: "#06b6d4" },
    { icon: Users,       title: "LinkedIn Outreach",      desc: "Hyper-personalised campaigns automated at scale",           color: "#3b82f6" },
    { icon: BarChart3,   title: "Google Ads",             desc: "ROI-obsessed paid campaigns with AI bid optimisation",      color: "#8b5cf6" },
    { icon: Mail,        title: "Email Marketing",        desc: "Intelligent sequences that convert cold to booked",         color: "#06b6d4" },
    { icon: Calendar,    title: "AI Appointment Setter",  desc: "Never miss a booking with always-on scheduling AI",         color: "#3b82f6" },
    { icon: Phone,       title: "Missed Call Recovery",   desc: "Instant AI follow-up on every missed call",                 color: "#8b5cf6" },
    { icon: RefreshCw,   title: "Lead Reactivation",      desc: "Re-engage cold leads with personalised AI sequences",       color: "#06b6d4" },
    { icon: Filter,      title: "AI SDR System",          desc: "Full-stack AI sales development rep — always on",           color: "#3b82f6" },
    { icon: Cpu,         title: "AI Receptionist",        desc: "Always-on front desk handling enquiries 24/7",              color: "#8b5cf6" },
    { icon: MessageSquare, title: "WhatsApp Automation",  desc: "Automated conversations that close deals on WhatsApp",      color: "#06b6d4" },
  ];

  const workflow = [
    { icon: Globe,       label: "Traffic Sources",       desc: "FB, Google, LinkedIn, SEO",       color: "#3b82f6" },
    { icon: Database,    label: "CRM Capture",           desc: "Instant routing & scoring",        color: "#6366f1" },
    { icon: Activity,    label: "AI Qualification",      desc: "Intent scoring & filtering",       color: "#8b5cf6" },
    { icon: RefreshCw,   label: "Automated Follow-Up",   desc: "Email, SMS, WhatsApp, AI calls",   color: "#a855f7" },
    { icon: Calendar,    label: "Appointment Booking",   desc: "Auto-scheduling & reminders",      color: "#06b6d4" },
    { icon: TrendingUp,  label: "Revenue Closed",        desc: "Deals closed on autopilot",        color: "#10b981" },
  ];

  const results = [
    { value: "+312%",  label: "Faster Lead Response",        icon: TrendingUp },
    { value: "24/7",   label: "Automated Follow-Up",          icon: Clock },
    { value: "10K+",   label: "Calls Automated",              icon: Phone },
    { value: "3×",     label: "More Qualified Appointments",  icon: Calendar },
    { value: "80%",    label: "Less Manual Work",             icon: Zap },
  ];

  const studies = [
    {
      company: "SkyLimit Agency",   industry: "Marketing",
      badge: "+287% qualified calls",
      m1: { l: "Calls / Month",   b: "12",     a: "89" },
      m2: { l: "Response Time",   b: "8 hrs",  a: "< 30s" },
      quote: "Solvevare turned our dead leads into booked calls overnight. The AI is indistinguishable from a real SDR.",
      author: "James T., CEO",
    },
    {
      company: "Apex Real Estate",  industry: "Real Estate",
      badge: "$2.4M revenue recovered",
      m1: { l: "Leads Worked",    b: "40%",    a: "100%" },
      m2: { l: "Appointments",    b: "8/mo",   a: "47/mo" },
      quote: "Every lead gets followed up instantly. We closed 6 deals from contacts that had sat cold for months.",
      author: "Maria L., Broker",
    },
    {
      company: "PeakCare Clinic",   industry: "Healthcare",
      badge: "4× appointment bookings",
      m1: { l: "No-Shows",        b: "34%",    a: "9%" },
      m2: { l: "Booking Rate",    b: "22%",    a: "71%" },
      quote: "Our AI receptionist handles 80% of all enquiries. Staff can focus on patients, not the phone.",
      author: "Dr. Chen, Director",
    },
    {
      company: "TitanHVAC",         industry: "HVAC Services",
      badge: "+198% revenue in 90 days",
      m1: { l: "Missed Calls",    b: "62/mo",  a: "0" },
      m2: { l: "Monthly Revenue", b: "$28K",   a: "$83K" },
      quote: "The missed call recovery alone pays for itself 10× over. Best investment we have ever made.",
      author: "Rick M., Owner",
    },
  ];

  const testimonials = [
    { name: "David K.", role: "CEO, GrowthForce",  stars: 5, quote: "We went from chasing leads to a fully automated pipeline. Solvevare is the real deal — $50K in new revenue in the first month alone." },
    { name: "Sarah P.", role: "Founder, ReachSaaS", stars: 5, quote: "The AI caller is scary good. Prospects have no idea. Our qualified meeting rate tripled in 6 weeks." },
    { name: "Marcus J.", role: "VP Sales, EstateOne", stars: 5, quote: "I was sceptical but the numbers don't lie. 47 appointments booked automatically last month vs 8 before." },
  ];

  const pricing = [
    {
      name: "Starter", price: "$2,999", period: "/mo", popular: false, color: "#06b6d4",
      desc: "For businesses ready to stop losing leads",
      features: ["AI Cold Calling (500 mins/mo)", "CRM Automation Setup", "Missed Call Recovery", "Email Sequences (3-step)", "Monthly Performance Report", "Dedicated Onboarding Call"],
      cta: "Get Started",
    },
    {
      name: "Growth", price: "$5,999", period: "/mo", popular: true, color: "#3b82f6",
      desc: "Full automation for scaling businesses",
      features: ["Everything in Starter", "AI Caller (2,000 mins/mo)", "LinkedIn Outreach System", "Google Ads Management", "WhatsApp Automation", "Lead Reactivation Campaigns", "Weekly Strategy Calls", "Dedicated Account Manager"],
      cta: "Start Scaling",
    },
    {
      name: "Enterprise", price: "Custom", period: "", popular: false, color: "#8b5cf6",
      desc: "Full-stack AI revenue infrastructure",
      features: ["Everything in Growth", "Unlimited AI Calls", "AI SDR System", "AI Receptionist", "Custom AI Integrations", "Dedicated AI Engineer", "Weekly C-Suite Reviews", "White-Glove Support 24/7"],
      cta: "Contact Sales",
    },
  ];

  const industries = ["Agencies", "SaaS", "Real Estate", "HVAC", "Clinics", "Recruiters", "Law Firms", "Local Businesses", "Education", "E-Commerce"];

  const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  });

  return (
    <>
      <style>{CSS}</style>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "var(--font-family)" }}>

        {/* ── NAV ── */}
        <nav className="fixed top-0 z-50 w-full glass" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <div className="flex items-center justify-between h-[62px]">
              <div className="flex items-center gap-2.5">
                <img src={faviconUrl} alt="Solvevare" className="w-8 h-8 rounded-lg" />
                <span className="text-base font-bold tracking-tight">Solvevare</span>
              </div>

              <div className="hidden md:flex items-center gap-8">
                {[["Services", "#services"], ["Results", "#results"], ["Case Studies", "#case-studies"], ["Pricing", "#pricing"]].map(([label, href]) => (
                  <a key={label} href={href} className="nl text-sm text-white/55 hover:text-white transition-colors">{label}</a>
                ))}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <button className="text-sm text-white/50 hover:text-white transition-colors px-4 py-2">Login</button>
                <button
                  className="text-sm font-semibold px-5 py-2.5 rounded-xl text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", boxShadow: "0 0 22px rgba(59,130,246,.3)" }}
                >
                  Book A Strategy Call
                </button>
              </div>

              <button className="md:hidden p-2 text-white/70" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="md:hidden px-5 pb-5 glass" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <div className="flex flex-col gap-4 pt-4">
                {[["Services", "#services"], ["Results", "#results"], ["Case Studies", "#case-studies"], ["Pricing", "#pricing"]].map(([label, href]) => (
                  <a key={label} href={href} className="text-sm text-white/60">{label}</a>
                ))}
                <button className="mt-1 w-full py-3 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }}>
                  Book A Strategy Call
                </button>
              </div>
            </div>
          )}
        </nav>

        {/* ── HERO ── */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
          <div className="absolute inset-0 gbg" />
          <div className="orb od w-[500px] h-[500px]" style={{ left: "-12%", top: "5%", background: "rgba(59,130,246,.1)" }} />
          <div className="orb od2 w-[420px] h-[420px]" style={{ right: "-8%", top: "15%", background: "rgba(139,92,246,.09)" }} />
          <div className="orb fb w-72 h-72" style={{ left: "38%", bottom: "8%", background: "rgba(6,182,212,.07)", filter: "blur(60px)" }} />

          <div className="relative max-w-7xl mx-auto px-5 lg:px-8 py-20 w-full">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* Left copy */}
              <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-7 text-xs font-medium" style={{ color: "#60a5fa", border: "1px solid rgba(59,130,246,.25)" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pdot" />
                  AI Revenue System — Live &amp; Running
                </div>

                <h1 className="text-5xl lg:text-[68px] font-bold tracking-tight mb-6 leading-[1.06]">
                  Your AI-Powered<br />
                  <span className="tg">Revenue System.</span>
                </h1>

                <p className="text-lg text-white/55 mb-5 leading-relaxed max-w-xl">
                  We generate leads, follow up instantly, qualify prospects using AI, and book appointments automatically — so your business never loses revenue opportunities again.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white transition-all"
                    style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", boxShadow: "0 0 35px rgba(59,130,246,.35)" }}
                  >
                    Book A Strategy Call
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-medium text-sm glass hover:border-blue-500/40 transition-all">
                    See The System
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  
                </div>

                {/* Metrics strip */}
                <div className="mt-11 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: "2,847",  label: "Leads Generated" },
                    { val: "12,400+", label: "Calls Automated" },
                    { val: "< 30s",  label: "Response Time" },
                    { val: "847",   label: "Meetings Booked" },
                  ].map((m) => (
                    <div key={m.label} className="gc rounded-xl p-3 text-center">
                      <div className="text-xl font-bold" style={{ color: "#60a5fa" }}>{m.val}</div>
                      <div className="text-[11px] text-white/38 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right: Dashboard visual */}
              <motion.div
                initial={{ opacity: 0, x: 42 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.85, delay: 0.18 }}
                className="relative hidden lg:block"
              >
                {/* Main card */}
                <div className="gc rounded-2xl p-6 fa" style={{ border: "1px solid rgba(59,130,246,.2)", boxShadow: "0 0 70px rgba(59,130,246,.07)" }}>
                  {/* Window chrome */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
                    </div>
                    <span className="text-[11px] text-white/35">Solvevare CRM — Live</span>
                    <div className="flex items-center gap-1.5 text-[11px]" style={{ color: "#4ade80" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 pdot" />Active
                    </div>
                  </div>

                  {/* Pipeline bar */}
                  <div className="mb-5">
                    <div className="flex justify-between text-[11px] text-white/38 mb-2">
                      <span>Revenue Pipeline</span>
                      <span style={{ color: "#4ade80" }}>+34% this month</span>
                    </div>
                    <div className="flex gap-0.5 h-2 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: "42%", background: "#3b82f6" }} />
                      <div className="h-full rounded-full" style={{ width: "27%", background: "#8b5cf6" }} />
                      <div className="h-full rounded-full" style={{ width: "19%", background: "#06b6d4" }} />
                      <div className="h-full rounded-full flex-1" style={{ background: "rgba(255,255,255,.08)" }} />
                    </div>
                    <div className="flex gap-3 mt-2" style={{ fontSize: "10px", color: "rgba(255,255,255,.35)" }}>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#3b82f6" }} />New</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#8b5cf6" }} />Qualified</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "#06b6d4" }} />Booked</span>
                    </div>
                  </div>

                  {/* AI Waveform */}
                  <div className="glass rounded-xl p-4 mb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(59,130,246,.18)" }}>
                        <Mic className="w-4 h-4" style={{ color: "#60a5fa" }} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold">AI Caller Active</div>
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,.38)" }}>Qualifying: John Mitchell</div>
                      </div>
                      <div className="ml-auto text-xs" style={{ color: "#4ade80" }}>2:34</div>
                    </div>
                    <div className="flex items-end gap-0.5 h-8">
                      {Array.from({ length: 34 }).map((_, i) => (
                        <div
                          key={i}
                          className="wbar flex-1"
                          style={{ animationDuration: `${0.38 + (i % 6) * 0.13}s`, animationDelay: `${i * 0.04}s` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Activity feed */}
                  <div className="space-y-2">
                    {[
                      { icon: "🎯", text: "Lead qualified: TechStartup Inc.", ago: "2s" },
                      { icon: "📅", text: "Appointment booked: Sarah K.", ago: "18s" },
                      { icon: "💬", text: "Follow-up sent to 14 prospects", ago: "1m" },
                    ].map((a, i) => (
                      <div key={i} className="flex items-center gap-3 glass rounded-lg px-3 py-2">
                        <span className="text-sm">{a.icon}</span>
                        <span className="text-xs flex-1" style={{ color: "rgba(255,255,255,.6)" }}>{a.text}</span>
                        <span style={{ fontSize: "10px", color: "rgba(255,255,255,.28)" }}>{a.ago} ago</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating notification */}
                <div
                  className="absolute -right-5 top-10 gc rounded-xl px-4 py-3 fb"
                  style={{
                    border: "1px solid rgba(139,92,246,.3)",
                    boxShadow: "0 0 28px rgba(139,92,246,.1)",
                    minWidth: "210px",
                    opacity: notifVisible ? 1 : 0,
                    transform: notifVisible ? "translateX(0)" : "translateX(16px)",
                    transition: "all .38s ease",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{notifs[notifIdx].icon}</span>
                    <div>
                      <div className="text-xs font-semibold">{notifs[notifIdx].text}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,.38)" }}>{notifs[notifIdx].sub}</div>
                    </div>
                  </div>
                </div>

                {/* Score badge */}
                <div className="absolute -left-6 bottom-20 gc rounded-xl px-4 py-3 fc" style={{ border: "1px solid rgba(16,185,129,.25)" }}>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,.38)", marginBottom: "2px" }}>AI Lead Score</div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold" style={{ color: "#4ade80" }}>94</div>
                    <div style={{ fontSize: "10px", color: "rgba(255,255,255,.4)" }}>/ 100<br />Hot Lead</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-14">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                The Old Way Is <span className="tg">Killing Your Revenue</span>
              </h2>
              <p className="text-white/50 text-lg max-w-lg mx-auto">
                Every hour without automated follow-up is money walking out the door.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flip-card gc rounded-2xl max-w-2xl mx-auto"
              style={{ border: "1px solid rgba(239,68,68,.18)", minHeight: "420px" }}
            >
              {/* Default: Traditional Business */}
              <div className="fc-default p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(239,68,68,.1)" }}>
                    <X className="w-5 h-5" style={{ color: "#f87171" }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#f87171" }}>Traditional Business</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,.38)" }}>Losing revenue daily</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ["Missed calls go to voicemail",    "67% of callers never call back"],
                    ["Slow 8-hour response time",       "21× less likely to qualify a lead"],
                    ["Manual spreadsheet tracking",     "42% of leads lost to the chaos"],
                    ["Dead leads sit untouched",        "Thousands in wasted ad spend"],
                    ["Overwhelmed sales teams",         "Burnout kills quota attainment"],
                  ].map(([issue, loss]) => (
                    <div key={issue} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(239,68,68,.04)" }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: "rgba(239,68,68,.15)" }}>
                        <X className="w-3 h-3" style={{ color: "#f87171" }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/80">{issue}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#f87171" }}>{loss}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover: Solvevare AI System */}
              <div className="fc-hover" style={{ background: "rgba(59,130,246,.06)", borderRadius: "16px" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(59,130,246,.18)", boxShadow: "0 0 20px rgba(59,130,246,.25)" }}>
                    <Zap className="w-5 h-5" style={{ color: "#60a5fa" }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: "#60a5fa" }}>Solvevare AI System</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,.38)" }}>Revenue on autopilot</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    ["AI answers & qualifies instantly",  "< 30 second response time"],
                    ["Automated multi-touch follow-up",   "100% of leads worked"],
                    ["Smart CRM with AI lead scoring",    "Zero leads fall through cracks"],
                    ["AI reactivates cold prospects",     "Revenue from dead leads"],
                    ["Team focuses on closing only",      "3× more deals closed"],
                  ].map(([fix, gain]) => (
                    <div key={gain} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "rgba(59,130,246,.07)" }}>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: "rgba(59,130,246,.2)", boxShadow: "0 0 8px rgba(59,130,246,.3)" }}>
                        <Check className="w-3 h-3" style={{ color: "#60a5fa" }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/80">{fix}</div>
                        <div className="text-xs mt-0.5" style={{ color: "#60a5fa" }}>{gain}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── AUDIT BANNER ── */}
        <section className="py-12 relative">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div
              {...fade()}
              className="gc rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-8"
              style={{ border: "1px solid rgba(139,92,246,.22)", boxShadow: "0 0 60px rgba(139,92,246,.06)" }}
            >
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium" style={{ background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.28)", color: "#a78bfa" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 pdot" />
                  Free Revenue Audit
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                 Find Out Exactly How Much Revenue <span className="tg">You’re Losing</span>
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-2xl">
                 
Get a free Lead Leakage Audit and discover how much revenue is slipping through the cracks. Simply answer 8–10 quick questions about your average deal value, monthly lead volume, lead qualification rate, and sales close rate. In exchange for your email, our calculator analyzes your numbers and instantly reveals an estimated amount of revenue you're losing each month due to unqualified leads and wasted sales effort—giving you a clear picture of the hidden cost of inefficient lead management.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Avg. ticket size", "Monthly leads", "Qualification rate", "Close rate"].map((q) => (
                    <span key={q} className="flex items-center gap-1.5 text-xs text-white/45" style={{ border: "1px solid rgba(255,255,255,.08)", borderRadius: "8px", padding: "4px 10px" }}>
                      <Check className="w-3 h-3" style={{ color: "#a78bfa" }} />{q}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — two buttons */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">

                {/* UIverse animated-border btn */}
                <button
                  onClick={() => setAuditOpen(true)}
                  className="group relative flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium"
                  style={{ background: "#0d0d14", boxShadow: "inset 0 -8px 10px rgba(143,223,255,.12)", transition: "box-shadow .5s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "inset 0 -5px 10px rgba(143,223,255,.24)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "inset 0 -8px 10px rgba(143,223,255,.12)")}
                >
                  <div className="animate-gradient absolute inset-0 rounded-2xl p-[1px]" style={{ background: "linear-gradient(90deg,rgba(255,170,64,.5),rgba(156,64,255,.5),rgba(255,170,64,.5))", WebkitMask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
                  <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#ffaa40" }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 15 15">
                    <path clipRule="evenodd" fillRule="evenodd" fill="currentColor" d="M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z" />
                  </svg>
                  <div className="w-px h-4 flex-shrink-0" style={{ background: "rgba(255,255,255,.15)" }} />
                  <span className="animate-gradient whitespace-nowrap" style={{ background: "linear-gradient(90deg,#ffaa40,#9c40ff,#ffaa40)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Get your Free Audit</span>
                  <svg className="flex-shrink-0" style={{ color: "#9c40ff" }} strokeLinecap="round" strokeWidth="1.5" viewBox="0 0 10 10" height="11" width="11" stroke="currentColor" fill="none">
                    <path strokeLinecap="round" d="M0 5h7" className="opacity-0 transition group-hover:opacity-100" />
                    <path strokeLinecap="round" d="M1 1l4 4-4 4" className="transition group-hover:translate-x-[3px]" />
                  </svg>
                </button>

                {/* Solid btn */}
                <button
                  onClick={() => setAuditOpen(true)}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", boxShadow: "0 0 28px rgba(59,130,246,.28)" }}
                >
                  Get Free Audit
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── AUDIT MODAL ── */}
        {auditOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)" }}
            onClick={() => { setAuditOpen(false); resetAudit(); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: .94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.26 }}
              className="gc rounded-2xl p-8 w-full max-w-md relative"
              style={{ border: "1px solid rgba(139,92,246,.3)", boxShadow: "0 0 80px rgba(139,92,246,.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setAuditOpen(false); resetAudit(); }}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress dots */}
              {auditStep < 5 && (
                <div className="flex gap-1.5 mb-6">
                  {[0,1,2,3,4].map((s) => (
                    <div key={s} className="h-1 flex-1 rounded-full transition-all duration-300" style={{ background: s <= auditStep ? "linear-gradient(90deg,#3b82f6,#8b5cf6)" : "rgba(255,255,255,.1)" }} />
                  ))}
                </div>
              )}

              {/* Step 0 — Email */}
              {auditStep === 0 && (
                <>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)" }}>
                    <Mail className="w-6 h-6" style={{ color: "#a78bfa" }} />
                  </div>
                  <h3 className="text-xl font-bold mb-1">Free Revenue Leak Audit</h3>
                  <p className="text-white/45 text-sm mb-6">Answer 4 quick questions and we'll calculate exactly how much revenue you're losing on unqualified leads every month.</p>
                  <input type="email" placeholder="your@email.com" value={auditData.email} onChange={(e) => setAuditData({ ...auditData, email: e.target.value })} className="audit-input mb-3" />
                  <AuditBtn disabled={!auditData.email} onClick={() => setAuditStep(1)} label="Start Free Audit" />
                  <p className="text-center text-xs text-white/25 mt-3">No spam. Unsubscribe anytime.</p>
                </>
              )}

              {/* Step 1 — Ticket size */}
              {auditStep === 1 && (
                <>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Question 1 of 4</div>
                  <h3 className="text-lg font-bold mb-1">What's your average deal / ticket size?</h3>
                  <p className="text-white/40 text-sm mb-6">The average revenue you earn per closed client or sale.</p>
                  <div className="relative mb-3">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">$</span>
                    <input type="number" placeholder="e.g. 2500" value={auditData.ticket} onChange={(e) => setAuditData({ ...auditData, ticket: e.target.value })} className="audit-input" style={{ paddingLeft: "28px" }} />
                  </div>
                  <AuditBtn disabled={!auditData.ticket} onClick={() => setAuditStep(2)} label="Next" />
                </>
              )}

              {/* Step 2 — Monthly leads */}
              {auditStep === 2 && (
                <>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Question 2 of 4</div>
                  <h3 className="text-lg font-bold mb-1">How many leads come in per month?</h3>
                  <p className="text-white/40 text-sm mb-6">Total inbound leads across all channels.</p>
                  <input type="number" placeholder="e.g. 120" value={auditData.leads} onChange={(e) => setAuditData({ ...auditData, leads: e.target.value })} className="audit-input mb-3" />
                  <AuditBtn disabled={!auditData.leads} onClick={() => setAuditStep(3)} label="Next" />
                </>
              )}

              {/* Step 3 — Qualification rate */}
              {auditStep === 3 && (
                <>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Question 3 of 4</div>
                  <h3 className="text-lg font-bold mb-1">What % of those leads are actually qualified?</h3>
                  <p className="text-white/40 text-sm mb-6">Leads that are a genuine fit for your offer.</p>
                  <div className="relative mb-3">
                    <input type="number" placeholder="e.g. 30" min="1" max="100" value={auditData.qualRate} onChange={(e) => setAuditData({ ...auditData, qualRate: e.target.value })} className="audit-input" style={{ paddingRight: "32px" }} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">%</span>
                  </div>
                  <AuditBtn disabled={!auditData.qualRate} onClick={() => setAuditStep(4)} label="Next" />
                </>
              )}

              {/* Step 4 — Close rate */}
              {auditStep === 4 && (
                <>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Question 4 of 4</div>
                  <h3 className="text-lg font-bold mb-1">What's your current close rate?</h3>
                  <p className="text-white/40 text-sm mb-6">Of the leads you speak to, how many do you close?</p>
                  <div className="relative mb-3">
                    <input type="number" placeholder="e.g. 25" min="1" max="100" value={auditData.closeRate} onChange={(e) => setAuditData({ ...auditData, closeRate: e.target.value })} className="audit-input" style={{ paddingRight: "32px" }} />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 text-sm">%</span>
                  </div>
                  <AuditBtn disabled={!auditData.closeRate} onClick={() => setAuditStep(5)} label="Calculate My Revenue Leak" />
                </>
              )}

              {/* Step 5 — Result */}
              {auditStep === 5 && (
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)" }}>
                    <TrendingUp className="w-7 h-7" style={{ color: "#f87171" }} />
                  </div>
                  <div className="text-xs text-white/35 uppercase tracking-widest mb-2">Your Revenue Leak</div>
                  <div className="text-5xl font-bold mb-1" style={{ color: "#f87171" }}>
                    ${auditLeak().toLocaleString()}
                  </div>
                  <div className="text-white/45 text-sm mb-6">estimated lost per month in wasted sales time</div>
                  <div className="gc rounded-xl p-4 mb-6 text-left space-y-2" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
                    {[
                      ["Avg. ticket size", `$${parseFloat(auditData.ticket).toLocaleString()}`],
                      ["Monthly leads", auditData.leads],
                      ["Qualified leads", `${auditData.qualRate}%`],
                      ["Close rate", `${auditData.closeRate}%`],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-white/40">{k}</span>
                        <span className="text-white/80 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowConfirmation(true);
                      setTimeout(() => {
                        setShowConfirmation(false);
                        setAuditOpen(false);
                        resetAudit();
                      }, 3000);
                    }}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", boxShadow: "0 0 28px rgba(59,130,246,.28)" }}
                  >
                    Fix My Revenue Leak — Book a Call
                  </button>
                  <button onClick={resetAudit} className="mt-2 w-full text-xs text-white/25 hover:text-white/50 transition-colors py-1">Start over</button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* ── CONFIRMATION MODAL ── */}
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(0,0,0,.65)", backdropFilter: "blur(6px)" }}
          >
            <div className="gc rounded-2xl p-10 w-full max-w-md text-center" style={{ border: "1px solid rgba(59,130,246,.3)", boxShadow: "0 0 80px rgba(59,130,246,.15)" }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(16,185,129,.15)", border: "2px solid rgba(16,185,129,.35)" }}
              >
                <Check className="w-8 h-8" style={{ color: "#4ade80" }} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-3">Audit Received!</h3>
              <p className="text-white/50 text-sm mb-6">We've received your audit details. Check your email for your revenue leak report and next steps.</p>
              <div className="text-xs text-white/35 mt-4">
                <p>An email has been sent to <span className="font-semibold text-white/60">{auditData.email}</span></p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── WORKFLOW ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "rgba(59,130,246,.018)" }}>
          <div className="absolute inset-0 gbg opacity-50" />
          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 text-xs font-medium" style={{ color: "#a78bfa", border: "1px solid rgba(139,92,246,.25)" }}>
                <Activity className="w-3 h-3" />
                The Solvevare Workflow
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Traffic to Revenue —{" "}
                <span className="tg">Fully Automated</span>
              </h2>
            </motion.div>

            {/* Desktop */}
            <div className="hidden md:flex items-center">
              {workflow.map((step, i) => (
                <div key={step.label} className="flex items-center flex-1 min-w-0">
                  <motion.div
                    {...fade(i * 0.1)}
                    className="flex flex-col items-center text-center group cursor-pointer flex-shrink-0 px-2"
                    style={{ width: "14%" }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-110"
                      style={{ background: `${step.color}14`, border: `1px solid ${step.color}28` }}
                      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 0 26px ${step.color}50`; e.currentTarget.style.borderColor = `${step.color}60`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = `${step.color}28`; }}
                    >
                      <step.icon className="w-6 h-6" style={{ color: step.color }} />
                    </div>
                    <div className="text-xs font-semibold mb-1 leading-snug">{step.label}</div>
                    <div className="text-[10px] text-white/38 leading-relaxed">{step.desc}</div>
                  </motion.div>
                  {i < workflow.length - 1 && (
                    <div className="flex-1 h-px mx-1" style={{ background: `linear-gradient(90deg,${workflow[i].color}35,${workflow[i + 1].color}35)` }} />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="md:hidden space-y-3">
              {workflow.map((step, i) => (
                <div key={step.label} className="flex items-center gap-4 gc rounded-xl p-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${step.color}14`, border: `1px solid ${step.color}28` }}>
                    <step.icon className="w-5 h-5" style={{ color: step.color }} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-semibold">{step.label}</div>
                    <div className="text-xs text-white/38">{step.desc}</div>
                  </div>
                  {i < workflow.length - 1 && <ChevronRight className="w-4 h-4 text-white/20 ml-auto flex-shrink-0" />}
                </div>
              ))}
            </div>

            <motion.div {...fade(0.35)} className="mt-12 gc rounded-2xl p-6" style={{ border: "1px solid rgba(59,130,246,.13)" }}>
              <div className="text-xs text-center text-white/35 uppercase tracking-widest mb-4">Traffic Sources We Capture</div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {["Facebook Ads", "Google Ads", "LinkedIn", "Email", "SMS", "WhatsApp", "SEO", "Website Chatbot", "Cold Outreach", "Referrals"].map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 glass rounded-lg text-xs text-white/55 transition-all cursor-default"
                    style={{ border: "1px solid rgba(255,255,255,.06)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,.35)"; e.currentTarget.style.color = "#60a5fa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"; e.currentTarget.style.color = "rgba(255,255,255,.55)"; }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 text-xs font-medium" style={{ color: "#67e8f9", border: "1px solid rgba(6,182,212,.25)" }}>
                <Layers className="w-3 h-3" />
                12 AI Systems
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Every Revenue Channel. <span className="tg">Automated.</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                One unified AI infrastructure that captures, qualifies, and books across every touchpoint.
              </p>
            </motion.div>

            <div
              className="flex justify-center items-center"
              style={{ minHeight: '400px', paddingTop: '50px' }}
              onClick={closeCardPopup}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="stack-card">
                  {services.map((svc, layerIndex) => (
                    <div
                      key={svc.title}
                      className={`layer ${layerIndex === 0 ? 'first-card' : ''} ${selectedServiceIndex === layerIndex ? 'selected' : ''} ${closingServiceIndex === layerIndex ? 'closing' : ''}`}
                      style={{
                        "--i": layerIndex,
                        "--label": `'${svc.title}'`,
                      } as React.CSSProperties}
                      onClick={() => handleCardClick(layerIndex)}
                    >
                      {selectedServiceIndex === layerIndex && (
                        <button
                          className="card-stack-close"
                          aria-label={`Close ${svc.title}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            closeCardPopup();
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}

                      <div className="card-content">
                        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                          <div
                            className="si mb-4"
                            style={{
                              width: '56px',
                              height: '56px',
                              background: `${svc.color}14`,
                              border: `1px solid ${svc.color}35`,
                              boxShadow: `0 0 20px ${svc.color}15`,
                            }}
                          >
                            <svc.icon className="w-6 h-6" style={{ color: svc.color }} />
                          </div>

                          <h2 className="text-base font-bold mb-1.5" style={{ color: svc.color }}>
                            {svc.title}
                          </h2>

                          <p className="text-white/55 text-xs leading-relaxed mb-4">
                            {svc.desc}
                          </p>

                          <div className="space-y-2 mb-auto">
                            <div className="text-[10px] font-semibold text-white/70 mb-1.5">Key Features:</div>
                            {[
                              "24/7 automated operation",
                              "Seamless CRM integration",
                              "Real-time analytics"
                            ].map((feature, fi) => (
                              <div key={fi} className="flex items-center gap-2 text-[11px] text-white/50">
                                <div
                                  className="w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0"
                                  style={{ background: `${svc.color}15`, border: `1px solid ${svc.color}30` }}
                                >
                                  <Check className="w-2 h-2" style={{ color: svc.color }} />
                                </div>
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>


          </div>
        </section>

        {/* ── RESULTS ── */}
        <section id="results" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,.05) 0%, transparent 65%)" }} />
          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-14">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Numbers That <span className="tg">Prove The System</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {results.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="gc rounded-2xl p-5 text-center"
                  style={{ border: "1px solid rgba(59,130,246,.1)", boxShadow: "0 0 40px rgba(59,130,246,.03)" }}
                >
                  <div className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(59,130,246,.14)", border: "1px solid rgba(59,130,246,.28)" }}>
                    <r.icon className="w-5 h-5" style={{ color: "#60a5fa" }} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold tg mb-2">{r.value}</div>
                  <div className="text-xs text-white/38">{r.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section id="case-studies" className="py-24 relative">
          <div className="absolute inset-0 gbg opacity-25" />
          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4 text-xs font-medium" style={{ color: "#a78bfa", border: "1px solid rgba(139,92,246,.25)" }}>
                <Shield className="w-3 h-3" />
                Verified Results
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Real Businesses. <span className="tg">Real Revenue.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {studies.map((s, i) => (
                <motion.div
                  key={s.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="sc gc rounded-2xl p-6"
                  style={{ border: "1px solid rgba(255,255,255,.065)" }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <div className="font-bold text-lg">{s.company}</div>
                      <div className="text-xs text-white/38 mt-0.5">{s.industry}</div>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.22)", color: "#4ade80" }}>
                      {s.badge}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {[s.m1, s.m2].map((m) => (
                      <div key={m.l} className="glass rounded-xl p-3">
                        <div style={{ fontSize: "10px", color: "rgba(255,255,255,.28)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: "6px" }}>{m.l}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm" style={{ color: "#f87171", textDecoration: "line-through" }}>{m.b}</span>
                          <ArrowRight className="w-3 h-3 text-white/20" />
                          <span className="text-sm font-bold" style={{ color: "#4ade80" }}>{m.a}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,.055)" }}>
                    <p className="text-sm italic text-white/58 mb-3">"{s.quote}"</p>
                    <div className="text-xs text-white/28">— {s.author}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-10">
              <h2 className="text-2xl sm:text-4xl font-bold mb-3">
                Built For Every <span className="tg">Industry</span>
              </h2>
            </motion.div>
            <div className="flex flex-wrap justify-center gap-3">
              {industries.map((ind, i) => (
                <motion.div
                  key={ind}
                  initial={{ opacity: 0, scale: 0.88 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: i * 0.05 }}
                  className="gc px-5 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200"
                  style={{ border: "1px solid rgba(255,255,255,.07)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(59,130,246,.35)"; e.currentTarget.style.color = "#60a5fa"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; e.currentTarget.style.color = ""; }}
                >
                  {ind}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(139,92,246,.055) 0%, transparent 65%)" }} />
          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4">
                Simple, Transparent <span className="tg">Pricing</span>
              </h2>
              <p className="text-white/50 text-lg max-w-lg mx-auto">No hidden fees. No surprise charges. Just results.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative gc rounded-2xl p-6"
                  style={{
                    border: plan.popular ? `1px solid ${plan.color}45` : "1px solid rgba(255,255,255,.07)",
                    boxShadow: plan.popular ? `0 0 60px ${plan.color}10` : "none",
                    transform: plan.popular ? "scale(1.034)" : "scale(1)",
                  }}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: `linear-gradient(135deg,${plan.color},#8b5cf6)` }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="text-xs text-white/38 uppercase tracking-widest mb-1">{plan.name}</div>
                    <div className="flex items-end gap-1 mb-1.5">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-white/38 mb-1 text-sm">{plan.period}</span>
                    </div>
                    <div className="text-xs text-white/40">{plan.desc}</div>
                  </div>

                  <ul className="space-y-2.5 mb-7">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: `${plan.color}1a`, border: `1px solid ${plan.color}40` }}>
                          <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                        </div>
                        <span className="text-white/65">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      background: plan.popular ? `linear-gradient(135deg,${plan.color},#8b5cf6)` : "rgba(255,255,255,.05)",
                      border: plan.popular ? "none" : `1px solid ${plan.color}30`,
                      color: plan.popular ? "#fff" : plan.color,
                      boxShadow: plan.popular ? `0 0 28px ${plan.color}30` : "none",
                    }}
                  >
                    {plan.cta}
                  </button>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-xs text-white/28 mt-8">
              30-day money-back guarantee · No setup fees · Cancel anytime
            </p>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-5 lg:px-8">
            <motion.div {...fade()} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                What Our Clients <span className="tg">Say</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: i * 0.1 }}
                  className="sc gc rounded-2xl p-5"
                  style={{ border: "1px solid rgba(255,255,255,.065)" }}
                >
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm italic text-white/65 leading-relaxed mb-5">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0" style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)" }}>
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.name}</div>
                      <div className="text-xs text-white/38">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 gbg opacity-35" />
          <div className="orb od w-[700px] h-[700px]" style={{ left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "rgba(59,130,246,.065)", filter: "blur(120px)" }} />
          <div className="orb fb w-64 h-64" style={{ left: "18%", top: "22%", background: "rgba(139,92,246,.055)", filter: "blur(60px)" }} />

          <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-8 text-xs font-medium" style={{ color: "#60a5fa", border: "1px solid rgba(59,130,246,.25)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 pdot" />
                Ready to automate your revenue?
              </div>

              <h2 className="text-4xl sm:text-6xl font-bold mb-6 leading-[1.08]">
                Build Your Automated<br />
                <span className="tg">Revenue Machine.</span>
              </h2>

              <p className="text-lg text-white/50 mb-5 max-w-4xl mx-auto leading-relaxed">
                Lead generation, AI follow-up, qualification, and appointment booking — all running automatically while you focus on closing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", boxShadow: "0 0 55px rgba(59,130,246,.3)" }}
                >
                  Start Scaling With Solvevare
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-medium text-base glass hover:border-blue-500/40 transition-all">
                  Schedule A Call First
                </button>
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/32">
                {["No contracts", "30-day guarantee", "Live in 7 days"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <Check className="w-4 h-4" style={{ color: "#4ade80" }} />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative py-16" style={{ borderTop: "1px solid rgba(255,255,255,.055)" }}>
          <div className="absolute inset-0 gbg opacity-18" />
          <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
              <div className="col-span-2">
                <div className="flex items-center gap-2.5 mb-4">
                  <img src={faviconUrl} alt="Solvevare" className="w-8 h-8 rounded-lg" />
                  <span className="text-base font-bold">Solvevare</span>
                </div>
                <p className="text-sm text-white/38 leading-relaxed max-w-[260px]">
                  AI-powered revenue automation for businesses that refuse to leave money on the table.
                </p>
              </div>

              {[
                { heading: "Systems",  links: ["AI Cold Calling", "CRM Automation", "Lead Generation", "AI Receptionist"] },
                { heading: "Company",  links: ["About", "Case Studies", "Careers", "Blog"] },
                { heading: "Contact",  links: ["Book A Call", "info@solvevare.com", "Support", "Partners"] },
              ].map((col) => (
                <div key={col.heading}>
                  <h4 className="text-sm font-semibold mb-4">{col.heading}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-white/38 hover:text-white transition-colors">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,.055)" }}>
              <p className="text-xs text-white/28">© 2025 Solvevare. All rights reserved.</p>
              <div className="flex gap-6 text-xs text-white/28">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
