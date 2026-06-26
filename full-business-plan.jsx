import { useState } from "react";

const C = {
  bg: "#07070F",
  surface: "#0F0F1C",
  card: "#141424",
  border: "#1E1E38",
  primary: "#7C6FFF",
  gold: "#F5C842",
  green: "#3DDC84",
  red: "#FF6B6B",
  blue: "#4FC3F7",
  text: "#E2E2F0",
  muted: "#6B6B8A",
  dim: "#2A2A48",
};

// ─── DATA ────────────────────────────────────────────────────────────────────

const businessModel = {
  name: "AI-Powered Business Solver",
  tagline: "รับปัญหาธุรกิจ → แปลงเป็น Excel / ระบบ / Template → ส่งมอบผ่านออนไลน์",
  who: "SME ไทย / เจ้าของร้าน / ฟรีแลนซ์ ที่มีปัญหาซ้ำๆ แต่ไม่รู้จะแก้ยังไง",
  what: [
    "รับโจทย์ปัญหาธุรกิจจากลูกค้า",
    "ใช้ AI (Claude / ChatGPT) วิเคราะห์และออกแบบระบบ",
    "สร้าง Excel Template / Dashboard / Workflow ให้ใช้ได้จริง",
    "ส่งมอบ + อธิบายวิธีใช้ผ่าน Online",
  ],
  why: "ตลาดนี้ขาดคนที่ 'เข้าใจธุรกิจ + ใช้ AI เป็น' ในเวลาเดียวกัน",
};

const services = [
  {
    name: "Excel Template สำเร็จรูป",
    type: "Passive",
    price: "฿199–599 / ชิ้น",
    effort: "ทำครั้งเดียว ขายซ้ำ",
    color: C.green,
    examples: ["ตารางบัญชีร้านค้า", "แผน budget รายเดือน", "ติดตาม stock สินค้า", "คำนวณเงินเดือนพนักงาน"],
    platform: "Etsy, Gumroad, Facebook",
  },
  {
    name: "Custom Excel / ระบบ",
    type: "Active",
    price: "฿800–5,000 / งาน",
    effort: "รับโจทย์ → ทำ → ส่ง",
    color: C.primary,
    examples: ["Dashboard รายงานยอดขาย", "ระบบติดตามลูกค้า CRM เบื้องต้น", "ตาราง project management", "ระบบคำนวณต้นทุน"],
    platform: "Facebook Group, Line, Fastwork",
  },
  {
    name: "AI Workflow Consulting",
    type: "Premium",
    price: "฿2,000–10,000 / โปรเจกต์",
    effort: "ประชุม → วิเคราะห์ → ส่งมอบ",
    color: C.gold,
    examples: ["ออกแบบ workflow ทั้งบริษัท", "เลือก tools AI ให้เหมาะธุรกิจ", "ลด manual work ให้ทีม", "ตั้งระบบ report อัตโนมัติ"],
    platform: "LinkedIn, Referral, Cold DM",
  },
];

const tools = [
  {
    cat: "อุปกรณ์หลัก",
    color: C.primary,
    items: [
      { name: "Galaxy S25 FE", cost: "มีแล้ว", use: "กล้อง · รันแอป · DeX Mode" },
      { name: "Samsung DeX", cost: "มีแล้ว", use: "เปลี่ยนมือถือเป็น PC ทำงานได้จริง" },
      { name: "Keyboard + Mouse", cost: "฿300–800", use: "ต่อกับ DeX ทำงานสะดวก" },
      { name: "HDMI / USB-C Hub", cost: "฿300–600", use: "ต่อจอภายนอก (ถ้ามี)" },
    ],
  },
  {
    cat: "AI Tools (ฟรี/ราคาต่ำ)",
    color: C.blue,
    items: [
      { name: "Claude (Anthropic)", cost: "ฟรี", use: "วิเคราะห์โจทย์ · เขียน formula · ออกแบบระบบ" },
      { name: "ChatGPT", cost: "ฟรี", use: "สร้าง template · เขียน VBA · อธิบายให้ลูกค้า" },
      { name: "Google Sheets AI", cost: "ฟรี", use: "ใช้แทน Excel ถ้าลูกค้าต้องการ" },
      { name: "Canva", cost: "ฟรี", use: "ทำ mockup / proposal ให้ดูดี" },
    ],
  },
  {
    cat: "Platform รับเงิน",
    color: C.green,
    items: [
      { name: "PromptPay", cost: "ฟรี", use: "รับเงินลูกค้าไทย ง่ายที่สุด" },
      { name: "Fastwork", cost: "ฟรี (หัก 15%)", use: "platform freelance ไทย มีระบบ escrow" },
      { name: "Paypal / Wise", cost: "ฟรี", use: "ถ้ารับลูกค้าต่างประเทศ" },
      { name: "Gumroad", cost: "ฟรี (หัก 10%)", use: "ขาย template passive income" },
    ],
  },
  {
    cat: "Platform หาลูกค้า",
    color: C.gold,
    items: [
      { name: "Facebook Group", cost: "ฟรี", use: "กลุ่ม SME / ร้านค้า / บัญชี — โพสต์หางานได้เลย" },
      { name: "Fastwork.co", cost: "ฟรี", use: "platform freelance ไทยที่ใหญ่ที่สุด" },
      { name: "LinkedIn", cost: "ฟรี", use: "เจาะลูกค้าบริษัทระดับกลาง" },
      { name: "TikTok / Reels", cost: "ฟรี", use: "ทำ content สอน Excel ดึง inbound leads" },
    ],
  },
];

const actionPlan = [
  {
    week: "สัปดาห์ที่ 1",
    title: "ตั้งฐาน",
    color: C.primary,
    tasks: [
      { done: false, task: "สมัคร Fastwork.co (ฟรี)" },
      { done: false, task: "สร้าง profile ให้ดูน่าเชื่อถือ — เขียนว่า 'รับทำ Excel + AI สำหรับธุรกิจ'" },
      { done: false, task: "ทำ Excel Template ตัวอย่าง 1 ชิ้น (เช่น บัญชีร้านค้า)" },
      { done: false, task: "ถ่ายรูป screenshot ผลงานด้วย S25 FE" },
      { done: false, task: "เข้า Facebook Group 'ธุรกิจ SME ไทย' 3–5 กลุ่ม" },
    ],
  },
  {
    week: "สัปดาห์ที่ 2",
    title: "หาลูกค้าแรก",
    color: C.blue,
    tasks: [
      { done: false, task: "โพสต์ใน Facebook Group: 'รับทำ Excel ฟรี 1 งาน เพื่อเก็บ portfolio'" },
      { done: false, task: "ตั้ง Gig บน Fastwork: 'ทำ Excel Template สำหรับธุรกิจ ราคา ฿500'" },
      { done: false, task: "DM เพจร้านค้าเล็กๆ 5–10 ร้าน ถามว่ามีปัญหาอะไรกับ Excel" },
      { done: false, task: "Upload Template ฟรีบน Facebook เพื่อสร้าง credibility" },
    ],
  },
  {
    week: "สัปดาห์ที่ 3–4",
    title: "ปิด Deal แรก",
    color: C.green,
    tasks: [
      { done: false, task: "รับงานแรก (แม้ฟรีก็ได้) → ทำให้ดีที่สุด" },
      { done: false, task: "ขอ Review / Testimonial จากลูกค้า" },
      { done: false, task: "เอา review ไปใส่ใน profile Fastwork" },
      { done: false, task: "ตั้งราคาจริง: ฿800–1,500 สำหรับงาน custom" },
      { done: false, task: "Upload Template ขายบน Gumroad ราคา ฿199" },
    ],
  },
  {
    week: "เดือนที่ 2–3",
    title: "Scale ขึ้น",
    color: C.gold,
    tasks: [
      { done: false, task: "ทำ TikTok / Reels สอน Excel trick สั้นๆ 60 วิ" },
      { done: false, task: "Link ใน bio ไปหน้า Fastwork / Gumroad" },
      { done: false, task: "เพิ่ม service: AI Workflow Consulting ราคา ฿2,000+" },
      { done: false, task: "รับงาน 3–5 ชิ้นต่อเดือน = ฿5,000–15,000" },
    ],
  },
];

const scripts = [
  {
    title: "โพสต์ Facebook Group (หางาน)",
    color: C.primary,
    text: `🔧 รับทำ Excel สำหรับธุรกิจ — ใช้ AI ช่วยออกแบบ

มีปัญหาเหล่านี้ไหมครับ?
• บันทึกข้อมูลซ้ำซ้อน เสียเวลา
• ไม่มี template ติดตาม stock / รายรับรายจ่าย
• รายงานต้องทำมือทุกเดือน

✅ รับแก้ปัญหาธุรกิจด้วย Excel + AI
✅ ส่งงานภายใน 24–48 ชั่วโมง
✅ แก้ไขได้ 1 รอบฟรี

💬 ทักมาเล่าปัญหาได้เลยครับ ประเมินราคาฟรี`,
  },
  {
    title: "DM ติดต่อลูกค้า (Cold Message)",
    color: C.blue,
    text: `สวัสดีครับ [ชื่อ]

เห็นว่าทำธุรกิจ [ประเภทธุรกิจ] อยู่ครับ

อยากถามตรงๆ ว่ามีงานที่ต้องทำซ้ำๆ ทุกวันหรือทุกเดือน แล้วรู้สึกว่าเสียเวลาบ้างไหมครับ? เช่น บันทึกข้อมูล รายงาน หรือคำนวณตัวเลข

ถ้ามี ผมรับทำระบบ Excel ให้ครับ ประเมินราคาฟรี ไม่มีข้อผูกมัด

ขอบคุณครับ`,
  },
  {
    title: "ตอบเมื่อลูกค้าถามราคา",
    color: C.green,
    text: `ขึ้นอยู่กับความซับซ้อนของงานครับ

งานพื้นฐาน (template สำเร็จรูป): ฿500–800
งาน custom (ตามโจทย์): ฿1,000–3,000
งาน dashboard / ระบบเต็ม: ฿3,000–8,000

ถ้าเล่าปัญหาให้ฟังก่อนได้เลยครับ จะประเมินให้ตรงกว่านี้ และถ้างานไม่ซับซ้อนมาก ราคาก็จะถูกลงครับ 😊`,
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Tag({ children, color }) {
  return (
    <span style={{
      background: color + "20",
      border: `1px solid ${color}50`,
      color,
      fontSize: 10,
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: 6,
      letterSpacing: 0.5,
    }}>{children}</span>
  );
}

function Section({ title, icon, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{
        fontSize: 11,
        fontWeight: 800,
        letterSpacing: 2,
        color: C.muted,
        marginBottom: 14,
        display: "flex",
        alignItems: "center",
        gap: 8,
        textTransform: "uppercase",
      }}>
        <span>{icon}</span>{title}
      </div>
      {children}
    </div>
  );
}

// ─── TABS ─────────────────────────────────────────────────────────────────────

function TabModel() {
  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${C.primary}22, ${C.primary}08)`,
        border: `1px solid ${C.primary}40`,
        borderRadius: 16,
        padding: "20px 18px",
        marginBottom: 20,
      }}>
        <div style={{ fontSize: 11, color: C.primary, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
          ชื่อธุรกิจ
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.text, marginBottom: 6 }}>
          {businessModel.name}
        </div>
        <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>
          {businessModel.tagline}
        </div>
      </div>

      <Section title="ลูกค้าเป้าหมาย" icon="🎯">
        <div style={{
          background: C.card,
          borderRadius: 12,
          padding: "14px 16px",
          border: `1px solid ${C.border}`,
          fontSize: 13,
          color: C.text,
          lineHeight: 1.7,
        }}>
          {businessModel.who}
        </div>
      </Section>

      <Section title="เราทำอะไรให้ลูกค้า" icon="⚙️">
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {businessModel.what.map((w, i) => (
            <div key={i} style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "12px 14px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: C.primary + "30",
                color: C.primary,
                fontSize: 11,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}>{i + 1}</div>
              <span style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{w}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="ทำไมตลาดนี้ถึงมีโอกาส" icon="💡">
        <div style={{
          background: C.gold + "10",
          border: `1px solid ${C.gold}40`,
          borderRadius: 12,
          padding: "14px 16px",
          fontSize: 13,
          color: C.gold,
          lineHeight: 1.7,
          fontWeight: 600,
        }}>
          {businessModel.why}
        </div>
      </Section>
    </div>
  );
}

function TabServices() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
        แนะนำเริ่มจาก <span style={{ color: C.green, fontWeight: 700 }}>Custom Excel</span> ก่อน — ได้เงินเร็วสุด แล้วค่อย scale ไป Passive Template และ Consulting
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {services.map((s, i) => (
          <div key={i}
            onClick={() => setOpen(open === i ? -1 : i)}
            style={{
              background: open === i ? C.card : C.surface,
              border: `1px solid ${open === i ? s.color + "60" : C.border}`,
              borderRadius: 14,
              padding: "16px",
              cursor: "pointer",
              boxShadow: open === i ? `0 0 16px ${s.color}20` : "none",
              transition: "all 0.2s",
            }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Tag color={s.color}>{s.type}</Tag>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginTop: 6 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: s.color, fontWeight: 700, marginTop: 3 }}>{s.price}</div>
              </div>
              <div style={{ color: C.dim, fontSize: 18, transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none" }}>⌄</div>
            </div>
            {open === i && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${s.color}25` }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>ตัวอย่างงาน</div>
                {s.examples.map((ex, j) => (
                  <div key={j} style={{
                    padding: "8px 12px",
                    background: C.bg,
                    borderRadius: 8,
                    fontSize: 12,
                    color: C.text,
                    marginBottom: 6,
                    border: `1px solid ${C.border}`,
                  }}>→ {ex}</div>
                ))}
                <div style={{ marginTop: 10, fontSize: 12, color: C.muted }}>
                  📍 <span style={{ color: C.text }}>{s.platform}</span>
                </div>
                <div style={{ marginTop: 6, fontSize: 12, color: C.muted }}>
                  ⏱ {s.effort}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TabTools() {
  return (
    <div>
      {tools.map((cat, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <div style={{
            fontSize: 11,
            fontWeight: 800,
            color: cat.color,
            letterSpacing: 2,
            marginBottom: 10,
            textTransform: "uppercase",
          }}>{cat.cat}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {cat.items.map((item, j) => (
              <div key={j} style={{
                background: C.card,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 12,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 3, lineHeight: 1.5 }}>{item.use}</div>
                </div>
                <Tag color={item.cost.includes("ฟรี") || item.cost.includes("แล้ว") ? C.green : C.gold}>
                  {item.cost}
                </Tag>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: C.primary + "10",
        border: `1px solid ${C.primary}30`,
        borderRadius: 12,
        padding: "14px 16px",
        marginTop: 8,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 6 }}>💰 ลงทุนเริ่มต้น</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>฿300–1,400</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>แค่ keyboard + hub — ถ้ามีแล้วคือ ฿0</div>
      </div>
    </div>
  );
}

function TabAction() {
  const [checked, setChecked] = useState({});
  const toggle = (key) => setChecked(p => ({ ...p, [key]: !p[key] }));

  return (
    <div>
      {actionPlan.map((phase, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: 8,
              background: phase.color + "25",
              border: `1.5px solid ${phase.color}`,
              color: phase.color,
              fontSize: 11, fontWeight: 800,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{i + 1}</div>
            <div>
              <div style={{ fontSize: 10, color: phase.color, fontWeight: 700, letterSpacing: 1.5 }}>{phase.week}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{phase.title}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {phase.tasks.map((t, j) => {
              const key = `${i}-${j}`;
              const done = checked[key];
              return (
                <div key={j}
                  onClick={() => toggle(key)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: done ? phase.color + "10" : C.card,
                    border: `1px solid ${done ? phase.color + "50" : C.border}`,
                    borderRadius: 10,
                    padding: "11px 13px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                  }}>
                  <div style={{
                    width: 20, height: 20,
                    borderRadius: 5,
                    border: `2px solid ${done ? phase.color : C.dim}`,
                    background: done ? phase.color : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}>
                    {done && <span style={{ fontSize: 11, color: "#fff" }}>✓</span>}
                  </div>
                  <span style={{
                    fontSize: 12,
                    color: done ? phase.color : C.text,
                    lineHeight: 1.5,
                    textDecoration: done ? "line-through" : "none",
                    opacity: done ? 0.6 : 1,
                  }}>{t.task}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div style={{
        background: C.green + "10",
        border: `1px solid ${C.green}30`,
        borderRadius: 12,
        padding: "14px 16px",
        fontSize: 12,
        color: C.green,
        lineHeight: 1.7,
        fontWeight: 600,
      }}>
        ✅ แตะ checkbox เพื่อ track ความคืบหน้าได้เลย
      </div>
    </div>
  );
}

function TabScripts() {
  const [copied, setCopied] = useState(null);
  const copy = (i, text) => {
    navigator.clipboard?.writeText(text);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.6 }}>
        สคริปต์สำเร็จรูป — แก้ให้ตรงกับตัวเองแล้วใช้ได้เลย
      </div>
      {scripts.map((s, i) => (
        <div key={i} style={{
          background: C.card,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: "16px",
          marginBottom: 16,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.title}</div>
            <button
              onClick={() => copy(i, s.text)}
              style={{
                background: copied === i ? C.green + "20" : s.color + "20",
                border: `1px solid ${copied === i ? C.green + "60" : s.color + "50"}`,
                color: copied === i ? C.green : s.color,
                padding: "4px 10px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}>
              {copied === i ? "✓ Copied" : "Copy"}
            </button>
          </div>
          <div style={{
            background: C.bg,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 12,
            color: C.text,
            lineHeight: 1.8,
            whiteSpace: "pre-line",
            border: `1px solid ${C.border}`,
          }}>{s.text}</div>
        </div>
      ))}
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const tabs = [
  { id: "model", label: "โมเดล", icon: "📋" },
  { id: "services", label: "Services", icon: "💼" },
  { id: "tools", label: "Tools", icon: "🔧" },
  { id: "action", label: "Action", icon: "✅" },
  { id: "scripts", label: "สคริปต์", icon: "💬" },
];

export default function BusinessPlan() {
  const [tab, setTab] = useState("model");

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", color: C.text }}>
      {/* Header */}
      <div style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "20px 18px 0",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: C.primary, fontWeight: 700, letterSpacing: 2 }}>GALAXY S25 FE · BUSINESS PLAN</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>AI Business Solver 🚀</div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? C.primary : "transparent",
              border: `1px solid ${tab === t.id ? C.primary : C.border}`,
              color: tab === t.id ? "#fff" : C.muted,
              padding: "7px 12px",
              borderRadius: "8px 8px 0 0",
              fontSize: 12,
              fontWeight: tab === t.id ? 700 : 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 18px 40px" }}>
        {tab === "model" && <TabModel />}
        {tab === "services" && <TabServices />}
        {tab === "tools" && <TabTools />}
        {tab === "action" && <TabAction />}
        {tab === "scripts" && <TabScripts />}
      </div>
    </div>
  );
}
