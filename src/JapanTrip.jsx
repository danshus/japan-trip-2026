import { useState, useEffect, useRef } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from "recharts";


const dayData = [
  { day: 1,  steps: 21940, label: "Arrival + Shinjuku Gyoen",            city: "Tokyo",       cat: "explore" },
  { day: 2,  steps: 30250, label: "Shibuya + Harajuku + Pachinko",       city: "Tokyo",       cat: "explore" },
  { day: 3,  steps: 21880, label: "Haircut + National Museum + Ueno",    city: "Tokyo",       cat: "explore" },
  { day: 4,  steps: 25000, label: "Kamakura day trip",                   city: "Tokyo",       cat: "daytrip" },
  { day: 5,  steps: 12500, label: "→ Kawaguchiko + Swan Paddle",         city: "Kawaguchiko", cat: "transit" },
  { day: 6,  steps: 10500, label: "🚲 Bicycle + Sakura Festival",        city: "Kawaguchiko", cat: "onsen"   },
  { day: 7,  steps: 16540, label: "→ Matsumoto + Narai-Juku",            city: "Matsumoto",   cat: "transit" },
  { day: 8,  steps: 12000, label: "→ Takayama + Knives + Sake",          city: "Takayama",    cat: "transit" },
  { day: 9,  steps: 13200, label: "Shirakawa-gō + Knives",               city: "Takayama",    cat: "daytrip" },
  { day: 10, steps: 18000, label: "→ Kyoto + Nishiki Market",            city: "Kyoto",       cat: "transit" },
  { day: 11, steps: 27400, label: "Nara + Fushimi Inari",                city: "Kyoto",       cat: "daytrip" },
  { day: 12, steps: 17500, label: "Arashiyama + Monkey Park",            city: "Kyoto",       cat: "explore" },
  { day: 13, steps: 21000, label: "Kinkaku-ji + Miyako Odori + Yukata",  city: "Kyoto",       cat: "explore" },
  { day: 14, steps: 23000, label: "→ Osaka + Namba + Gintama Movie",     city: "Osaka",       cat: "transit" },
  { day: 15, steps: 13700, label: "Taian Michelin kaiseki + Dotonbori",  city: "Osaka",       cat: "explore" },
  { day: 16, steps: 20500, label: "Universal Studios Japan",             city: "Osaka",       cat: "theme"   },
  { day: 17, steps: 23500, label: "Katsuo-ji + Osaka Castle + Sumo",     city: "Osaka",       cat: "explore" },
  { day: 18, steps: 10000, label: "→ Hiroshima + Peace Memorial",        city: "Hiroshima",   cat: "transit" },
  { day: 19, steps: 18400, label: "Miyajima + Ropeway + Aquarium",       city: "Hiroshima",   cat: "daytrip" },
  { day: 20, steps: 23500, label: "→ Tokyo + Akihabara Pochita Hunt",    city: "Tokyo",       cat: "transit" },
  { day: 21, steps: 19200, label: "Senso-ji + Ghibli + Asakusa",         city: "Tokyo",       cat: "explore" },
  { day: 22, steps: 24500, label: "Ginza + TeamLab + Don Quijote",       city: "Tokyo",       cat: "explore" },
];


const schedule = [
  {
    day: 1, date: "Mar 24", city: "Tokyo", hotel: "Hotel Gracery Shinjuku",
    emoji: "🗼", color: "#c0392b",
    items: ["Arrived Haneda", "Suica cards × 2 at airport", "Shinjuku Gyoen — full bloom cherry blossoms 🌸", "Uniqlo Shinjuku + Don Quijote midnight run"]
  },
  {
    day: 2, date: "Mar 25", city: "Tokyo", hotel: "Hotel Gracery Shinjuku",
    emoji: "🗼", color: "#c0392b",
    items: ["Shibuya crossing + Hachiko statue", "Shibuya PARCO — Pokémon Center & Nintendo Tokyo", "Harajuku: Takeshita Street, Meiji Jingu Shrine", "Strolled Shibuya, played pachinko 🎰"]
  },
  {
    day: 3, date: "Mar 26", city: "Tokyo", hotel: "Hotel Gracery Shinjuku",
    emoji: "🗼", color: "#c0392b",
    items: ["Haircut near Takeshita Street", "Tokyo National Museum, Ueno", "Walked Ueno Park"]
  },
  {
    day: 4, date: "Mar 27", city: "Kamakura (day trip)", hotel: "Hotel Gracery Shinjuku",
    emoji: "🪷", color: "#c0392b",
    items: ["JR Shōnan-Shinjuku Line from Shinjuku", "Hokokuji Bamboo Temple", "Tsurugaoka Hachimangū shrine", "Great Buddha (Kōtoku-in)", "Hasedera Temple", "Returned to Shinjuku"]
  },
  {
    day: 5, date: "Mar 28", city: "Kawaguchiko", hotel: "Rakuyu Ryokan",
    emoji: "🗻", color: "#2980b9",
    items: ["Fuji Excursion limited express Shinjuku → Kawaguchiko", "Rakuyu Ryokan check-in", "Swan paddle on the lake 🦢", "Onsen evening ♨️"]
  },
  {
    day: 6, date: "Mar 29", city: "Kawaguchiko", hotel: "Rakuyu Ryokan",
    emoji: "🚲", color: "#2980b9",
    items: ["Full bicycle day around the lake", "Fuji-Kawaguchiko Sakura Festival 🌸", "Oishi Park — Fuji views", "Lakeside cafés", "Onsen evening ♨️"]
  },
  {
    day: 7, date: "Mar 30", city: "Matsumoto", hotel: "Buena Vista Matsumoto",
    emoji: "🏯", color: "#8e44ad",
    items: ["Fujikyu Railway → Ōtsuki → JR Chūō Line → Matsumoto", "Full bloom sakura 🌸", "Matsumoto Castle", "Nawate Street", "Narai-Juku post-town"]
  },
  {
    day: 8, date: "Mar 31", city: "Takayama", hotel: "Hotel & Spa Gift Takayama",
    emoji: "🌿", color: "#27ae60",
    items: ["Nohi Bus Matsumoto → Takayama — scenic mountain route", "Sanmachi Suji Edo-era merchant district", "Japanese knife shopping 🔪", "Sake tasting at local breweries 🍶", "Steak House Kitchen Hida — Hida Wagyu dinner"]
  },
  {
    day: 9, date: "Apr 1", city: "Takayama", hotel: "Hotel & Spa Gift Takayama",
    emoji: "🏔️", color: "#27ae60",
    items: ["Bus Takayama → Shirakawa-gō (UNESCO World Heritage)", "Ogimachi historic quarter — gassho-zukuri farmhouses", "Viewpoint hike over the village", "Returned to Takayama", "Sanmachi Suji evening stroll"]
  },
  {
    day: 10, date: "Apr 2", city: "Kyoto", hotel: "Oriental Hotel Kyoto Rokujo",
    emoji: "⛩️", color: "#e67e22",
    items: ["Limited Express Hida → Nagoya → Shinkansen → Kyoto", "Full bloom sakura 🌸", "Nishiki Market — Kyoto's Kitchen"]
  },
  {
    day: 11, date: "Apr 3", city: "Kyoto", hotel: "Oriental Hotel Kyoto Rokujo",
    emoji: "🦌", color: "#e67e22",
    items: ["JR Nara Line → Nara Park — free-roaming sacred deer", "Todai-ji — Great Buddha Hall", "Kasuga Taisha shrine", "Yoshikien Garden", "Returned to Kyoto", "Fushimi Inari Taisha late afternoon — 10,000 torii gates"]
  },
  {
    day: 12, date: "Apr 4", city: "Kyoto", hotel: "Oriental Hotel Kyoto Rokujo",
    emoji: "🎋", color: "#e67e22",
    items: ["JR Sagano Line → Saga-Arashiyama", "Arashiyama Bamboo Grove — early morning, minimal crowds", "Tenryu-ji World Heritage gardens", "Iwatayama Monkey Park 🐒"]
  },
  {
    day: 13, date: "Apr 5", city: "Kyoto", hotel: "Oriental Hotel Kyoto Rokujo",
    emoji: "✨", color: "#e67e22",
    items: ["Kinkaku-ji (Golden Pavilion)", "Yasaka Shrine, Gion area", "Ninenzaka & Sannenzaka preserved stone lanes", "Gion stroll", "Yukata shopping 👘", "Miyako Odori — geisha & maiko spring dance, Gion Kōbu Kaburenjō"]
  },
  {
    day: 14, date: "Apr 6", city: "Osaka", hotel: "The Royal Park Hotel Iconic Osaka Midosuji",
    emoji: "🎬", color: "#e74c3c",
    items: ["JR Special Rapid Kyoto → Osaka", "Namba district exploration", "Watched Gintama: Yoshiwara in Flames 🎬", "Dotonbori stroll — neon lights, street food"]
  },
  {
    day: 15, date: "Apr 7", city: "Osaka", hotel: "The Royal Park Hotel Iconic Osaka Midosuji",
    emoji: "🍱", color: "#e74c3c",
    items: ["Namba & Dotonbori shopping", "Kitchenware street visit", "Taian — 3-star Michelin kaiseki dinner"]
  },
  {
    day: 16, date: "Apr 8", city: "Osaka", hotel: "The Royal Park Hotel Iconic Osaka Midosuji",
    emoji: "🍄", color: "#e74c3c",
    items: ["Full day Universal Studios Japan", "JAWS — last Jaws ride on Earth 🦈", "Jurassic Park: The Ride", "Harry Potter & the Forbidden Journey", "Flight of the Hippogriff", "Illumination's Villain-Con Minion Blast", "Despicable Me: Minion Mayhem", "JUJUTSU KAISEN: The Real 4-D", "Yoshi's Adventure", "Super Nintendo World — Mario Kart: Koopa's Challenge"]
  },
  {
    day: 17, date: "Apr 9", city: "Osaka", hotel: "The Royal Park Hotel Iconic Osaka Midosuji",
    emoji: "🏆", color: "#e74c3c",
    items: ["Katsuo-ji Temple — mountain temple, daruma dolls everywhere", "Purchased Rumi the Daruma 🎎 — wrote our wishes", "Osaka Castle afternoon", "Sumo Hall — evening matches"]
  },
  {
    day: 18, date: "Apr 10", city: "Hiroshima", hotel: "Hotel Granvia Hiroshima",
    emoji: "🕊️", color: "#16a085",
    items: ["Shinkansen Shin-Osaka → Hiroshima", "Atomic Bomb Dome (Genbaku Dome) — UNESCO World Heritage", "Peace Memorial Museum", "Yakiniku dinner"]
  },
  {
    day: 19, date: "Apr 11", city: "Miyajima (day trip)", hotel: "Hotel Granvia Hiroshima",
    emoji: "⛩️", color: "#16a085",
    items: ["JR Sanyo Line → Miyajimaguchi → ferry to Miyajima Island", "Itsukushima Shrine — floating torii gate at high tide 🌊", "Ropeway to the mountaintop 🚡", "Miyajima Aquarium — otters, penguins, dolphins, sea lions 🦦", "Daisho-in Temple", "Deer roaming freely on the island", "Local Miyajima brewery — cold beers with island views 🍺", "Returned to Hiroshima"]
  },
  {
    day: 20, date: "Apr 12", city: "Tokyo (Akihabara)", hotel: "Nohga Hotel Akihabara",
    emoji: "🎮", color: "#2c3e50",
    items: ["Shinkansen Hiroshima → Tokyo", "Nohga Hotel Akihabara check-in", "Full day Akihabara — shopping, anime, arcades", "Pochita FOUND — quest complete! 🔴⛓️🏆"]
  },
  {
    day: 21, date: "Apr 13", city: "Tokyo (Akihabara)", hotel: "Nohga Hotel Akihabara",
    emoji: "🐱", color: "#2c3e50",
    items: ["Senso-ji early morning", "Ghibli Museum Mitaka", "Asakusa — Kaminarimon Gate, Nakamise-dori", "Kappabashi Kitchen Street — chef supplies"]
  },
  {
    day: 22, date: "Apr 14", city: "Tokyo (Akihabara)", hotel: "Nohga Hotel Akihabara",
    emoji: "✨", color: "#2c3e50",
    items: ["Ginza — Ginza Line from Asakusa", "Uniqlo Ginza flagship + Mitsukoshi B2 food hall", "TeamLab Planets, Toyosu — immersive digital art 🌊", "Mega Don Quijote Shibuya — souvenir shopping"]
  },
];


const cityColors = {
  Tokyo:       "#c0392b",
  Kawaguchiko: "#2980b9",
  Matsumoto:   "#8e44ad",
  Takayama:    "#27ae60",
  Kyoto:       "#e67e22",
  Osaka:       "#e74c3c",
  Hiroshima:   "#16a085",
};


const totalSteps  = dayData.reduce((s, d) => s + d.steps, 0);
const avgSteps    = Math.round(totalSteps / dayData.length);
const maxDay      = dayData.reduce((a, b) => a.steps > b.steps ? a : b);
const minDay      = dayData.reduce((a, b) => a.steps < b.steps ? a : b);
const daysOver20k = dayData.filter(d => d.steps >= 20000).length;
const distanceKm  = Math.round(totalSteps * 0.762 / 1000);
const transitAvg  = Math.round(dayData.filter(d => d.cat === "transit").reduce((s,d) => s+d.steps,0) / dayData.filter(d => d.cat === "transit").length);
const exploreAvg  = Math.round(dayData.filter(d => d.cat === "explore").reduce((s,d) => s+d.steps,0) / dayData.filter(d => d.cat === "explore").length);
const cityMerged  = Object.entries(dayData.reduce((acc,d) => { acc[d.city]=(acc[d.city]||0)+d.steps; return acc; }, {})).sort((a,b) => b[1]-a[1]);


function AnimatedNumber({ target, duration = 1400, prefix = "" }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let cur = 0;
    const step = target / (duration / 16);
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setValue(target); clearInterval(t); }
      else setValue(Math.floor(cur));
    }, 16);
    return () => clearInterval(t);
  }, []);
  return <span>{prefix}{value.toLocaleString()}</span>;
}


const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{ background:"#1a1a1a", borderRadius:"10px", padding:"10px 14px", color:"white", fontSize:"12px", boxShadow:"0 4px 20px rgba(0,0,0,0.4)", border:`2px solid ${cityColors[d.city]||"#c0392b"}`, maxWidth:"190px" }}>
      <div style={{ fontWeight:"bold", marginBottom:"3px" }}>Day {d.day} — {d.city}</div>
      <div style={{ color:"#f39c12", fontSize:"16px", fontWeight:"bold" }}>{d.steps.toLocaleString()}</div>
      <div style={{ color:"#aaa", fontSize:"10px", marginTop:"3px", lineHeight:1.4 }}>{d.label}</div>
    </div>
  );
};


const Section = ({ title, children, style = {} }) => (
  <div style={{ background:"white", borderRadius:"16px", padding:"28px", marginBottom:"24px", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", ...style }}>
    <div style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"#bbb", marginBottom:"20px" }}>{title}</div>
    {children}
  </div>
);


export default function ShustimovJapanTrip() {
  const [visible, setVisible]     = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  useEffect(() => { setTimeout(() => setVisible(true), 150); }, []);
  const fade = (delay=0) => ({ opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:`all 0.7s ${delay}s ease` });


  return (
    <div style={{ fontFamily:"'Georgia','Times New Roman',serif", background:"#fdf6ec", minHeight:"100vh", paddingBottom:"80px", color:"#1a1a1a" }}>


      {/* HEADER */}
      <div style={{ background:"linear-gradient(135deg,#c0392b,#922b21)", padding:"52px 32px 44px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, opacity:0.06, backgroundImage:"radial-gradient(white 1.5px,transparent 1.5px)", backgroundSize:"28px 28px" }} />
        <div style={{ fontSize:"12px", letterSpacing:"6px", color:"rgba(255,255,255,0.6)", marginBottom:"12px", textTransform:"uppercase" }}>March 24 – April 15, 2026</div>
        <div style={{ fontSize:"44px", fontWeight:"bold", color:"white", lineHeight:1.1, marginBottom:"8px" }}>🇯🇵 Japan Trip 2026</div>
        <div style={{ fontSize:"16px", color:"rgba(255,255,255,0.82)", fontStyle:"italic", marginBottom:"20px" }}>The Shustimov Family Adventure — By the Numbers</div>
        <div style={{ fontSize:"28px" }}>🌸 🗼 🍜 ⛩️ 🎮 🌸</div>
      </div>


      <div style={{ maxWidth:"960px", margin:"0 auto", padding:"0 20px" }}>


        {/* KEY NUMBERS ROW 1 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", margin:"32px 0 14px", ...fade(0) }}>
          {[
            { label:"Nights in Japan",    value:22, icon:"🌙", color:"#c0392b" },
            { label:"Cities & Regions",   value:8,  icon:"📍", color:"#2980b9" },
            { label:"Prefectures Visited",value:9,  icon:"🗾", color:"#8e44ad" },
            { label:"Hotels Stayed",      value:8,  icon:"🏨", color:"#27ae60" },
          ].map((s,i) => (
            <div key={i} style={{ background:"white", borderRadius:"12px", padding:"20px 16px", textAlign:"center", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", borderTop:`4px solid ${s.color}` }}>
              <div style={{ fontSize:"26px", marginBottom:"6px" }}>{s.icon}</div>
              <div style={{ fontSize:"36px", fontWeight:"bold", color:s.color, lineHeight:1 }}><AnimatedNumber target={s.value} /></div>
              <div style={{ fontSize:"10px", color:"#999", textTransform:"uppercase", letterSpacing:"1px", marginTop:"6px" }}>{s.label}</div>
            </div>
          ))}
        </div>


        {/* KEY NUMBERS ROW 2 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"14px", ...fade(0.1) }}>
          {[
            { label:"Accommodation Spend", value:5596, icon:"💴", color:"#e67e22", prefix:"$" },
            { label:"Day Trips",           value:4,    icon:"🚃", color:"#16a085" },
            { label:"UNESCO Sites",        value:3,    icon:"🏛️", color:"#c0392b" },
            { label:"Special Experiences", value:10,   icon:"⭐", color:"#f39c12" },
          ].map((s,i) => (
            <div key={i} style={{ background:"white", borderRadius:"12px", padding:"20px 16px", textAlign:"center", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", borderTop:`4px solid ${s.color}` }}>
              <div style={{ fontSize:"26px", marginBottom:"6px" }}>{s.icon}</div>
              <div style={{ fontSize:"36px", fontWeight:"bold", color:s.color, lineHeight:1 }}><AnimatedNumber target={s.value} prefix={s.prefix||""} /></div>
              <div style={{ fontSize:"10px", color:"#999", textTransform:"uppercase", letterSpacing:"1px", marginTop:"6px" }}>{s.label}</div>
            </div>
          ))}
        </div>


        {/* KEY NUMBERS ROW 3 */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"12px", marginBottom:"28px", ...fade(0.15) }}>
          {[
            { label:"Bloom Cities (full)",  value:5,  icon:"🌸", color:"#e74c3c", note:"Tokyo · Matsumoto · Takayama · Kyoto · Osaka" },
            { label:"Landmarks Visited",    value:13, icon:"⛩️", color:"#e67e22", note:"Temples, shrines & castles" },
            { label:"Transport Modes",      value:6,  icon:"🚄", color:"#2980b9", note:"Train · Bus · Metro · Ferry · Bicycle · Plane" },
            { label:"Dishes Conquered",     value:14, icon:"🍜", color:"#27ae60", note:"From wagyu to daily konbini onigiri" },
          ].map((s,i) => (
            <div key={i} style={{ background:"white", borderRadius:"12px", padding:"20px 16px", textAlign:"center", boxShadow:"0 2px 16px rgba(0,0,0,0.06)", borderTop:`4px solid ${s.color}` }}>
              <div style={{ fontSize:"26px", marginBottom:"6px" }}>{s.icon}</div>
              <div style={{ fontSize:"36px", fontWeight:"bold", color:s.color, lineHeight:1 }}><AnimatedNumber target={s.value} /></div>
              <div style={{ fontSize:"10px", color:"#999", textTransform:"uppercase", letterSpacing:"1px", marginTop:"4px" }}>{s.label}</div>
              <div style={{ fontSize:"9px", color:"#ccc", fontStyle:"italic", marginTop:"3px" }}>{s.note}</div>
            </div>
          ))}
        </div>


        {/* STEPS HERO */}
        <div style={{ background:"#1a1a1a", borderRadius:"20px", padding:"32px 28px", marginBottom:"24px", ...fade(0.2) }}>
          <div style={{ fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", color:"#666", marginBottom:"6px" }}>👟 Total Steps Walked</div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:"16px", flexWrap:"wrap", marginBottom:"26px" }}>
            <div style={{ fontSize:"62px", fontWeight:"bold", color:"#f39c12", lineHeight:1 }}><AnimatedNumber target={totalSteps} duration={1800} /></div>
            <div style={{ paddingBottom:"8px" }}>
              <div style={{ color:"#999", fontSize:"13px", fontStyle:"italic" }}>steps over 22 days</div>
              <div style={{ color:"#555", fontSize:"11px" }}>avg {avgSteps.toLocaleString()} / day</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"28px" }}>
            {[
              { label:"Distance Walked",  value:`~${distanceKm} km`,          sub:"Roughly Tokyo → Osaka by foot",     color:"#f39c12" },
              { label:"Days Over 20k",    value:`${daysOver20k} / 22`,         sub:"45% of the trip",                   color:"#2ecc71" },
              { label:"Peak Day",         value:maxDay.steps.toLocaleString(), sub:`Day ${maxDay.day}: ${maxDay.label}`, color:"#e74c3c" },
              { label:"Lowest Day",       value:minDay.steps.toLocaleString(), sub:`Day ${minDay.day}: ${minDay.label}`, color:"#3498db" },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:"10px", padding:"14px", borderLeft:`3px solid ${s.color}` }}>
                <div style={{ color:s.color, fontWeight:"bold", fontSize:"18px" }}>{s.value}</div>
                <div style={{ color:"#999", fontSize:"9px", textTransform:"uppercase", letterSpacing:"1px", margin:"4px 0 3px" }}>{s.label}</div>
                <div style={{ color:"#666", fontSize:"10px", fontStyle:"italic" }}>{s.sub}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:"10px", letterSpacing:"2px", textTransform:"uppercase", color:"#555", marginBottom:"10px" }}>Daily Steps — hover for details</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={dayData} margin={{ top:5, right:5, left:-22, bottom:5 }}>
              <XAxis dataKey="day" tick={{ fill:"#555", fontSize:10 }} tickLine={false} axisLine={false} tickFormatter={v=>`D${v}`} />
              <YAxis tick={{ fill:"#444", fontSize:9 }} tickLine={false} axisLine={false} tickFormatter={v=>`${Math.round(v/1000)}k`} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(255,255,255,0.04)" }} />
              <ReferenceLine y={avgSteps} stroke="#f39c12" strokeDasharray="4 4" strokeOpacity={0.45} />
              <Bar dataKey="steps" radius={[4,4,0,0]}>
                {dayData.map((d,i) => <Cell key={i} fill={cityColors[d.city]||"#c0392b"} fillOpacity={0.88} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", marginTop:"14px", paddingTop:"12px", borderTop:"1px solid #2a2a2a" }}>
            {Object.entries(cityColors).map(([city,color]) => (
              <span key={city} style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"10px", color:"#777" }}>
                <span style={{ width:"9px", height:"9px", borderRadius:"2px", background:color, display:"inline-block" }} />{city}
              </span>
            ))}
            <span style={{ fontSize:"10px", color:"#444", marginLeft:"4px", fontStyle:"italic" }}>— dashed = {avgSteps.toLocaleString()} avg</span>
          </div>
        </div>


        {/* STEPS BY CITY + DEEP CUTS */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"24px", ...fade(0.25) }}>
          <Section title="📊 Steps by City" style={{ marginBottom:0 }}>
            {cityMerged.map(([city,steps]) => {
              const pct = Math.round((steps/cityMerged[0][1])*100);
              return (
                <div key={city} style={{ marginBottom:"13px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:"12px", marginBottom:"4px" }}>
                    <span style={{ color:cityColors[city], fontWeight:"bold" }}>{city}</span>
                    <span style={{ color:"#aaa" }}>{steps.toLocaleString()}</span>
                  </div>
                  <div style={{ background:"#f0f0f0", borderRadius:"4px", height:"6px" }}>
                    <div style={{ background:cityColors[city], width:`${pct}%`, height:"100%", borderRadius:"4px" }} />
                  </div>
                </div>
              );
            })}
          </Section>
          <Section title="🧮 Step Deep Cuts" style={{ marginBottom:0 }}>
            {[
              { fact:`~${distanceKm} km walked`,            sub:"= Tokyo to Osaka straight-line distance",     icon:"📏" },
              { fact:"~17,000 kcal burned",                 sub:"Walking alone — not counting all the ramen",  icon:"🔥" },
              { fact:`Explore days avg: ${exploreAvg.toLocaleString()}`, sub:"The real pace of the trip",      icon:"👟" },
              { fact:`Transit days avg: ${transitAvg.toLocaleString()}`, sub:"Even train days were active",    icon:"🚄" },
              { fact:"Day 6 — fewest steps, most km",       sub:"Bicycle logic: low steps, huge range",        icon:"🚲" },
              { fact:"Day 11 — Fushimi Inari effect",       sub:"27,400 steps: Nara deer + 10,000 torii gates",icon:"⛩️" },
            ].map((f,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", padding:"7px 0", borderBottom:i<5?"1px solid #f5f5f5":"none", alignItems:"flex-start" }}>
                <span style={{ fontSize:"17px", marginTop:"1px" }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize:"12px", fontWeight:"bold" }}>{f.fact}</div>
                  <div style={{ fontSize:"10px", color:"#bbb", fontStyle:"italic" }}>{f.sub}</div>
                </div>
              </div>
            ))}
          </Section>
        </div>


        {/* ROUTE */}
        <Section title="🗺️ Route — Nights Per City" style={fade(0.28)}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:"10px", height:"110px" }}>
            {[
              { name:"Tokyo\n(Shinjuku)",  nights:4, emoji:"🗼", color:"#c0392b" },
              { name:"Kawaguchiko",        nights:2, emoji:"🗻", color:"#2980b9" },
              { name:"Matsumoto",          nights:1, emoji:"🏯", color:"#8e44ad" },
              { name:"Takayama",           nights:2, emoji:"🌿", color:"#27ae60" },
              { name:"Kyoto",              nights:4, emoji:"⛩️", color:"#e67e22" },
              { name:"Osaka",              nights:4, emoji:"🐙", color:"#e74c3c" },
              { name:"Hiroshima",          nights:2, emoji:"🕊️", color:"#16a085" },
              { name:"Tokyo\n(Akihabara)", nights:3, emoji:"🎮", color:"#2c3e50" },
            ].map((city,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", height:"100%" }}>
                <div style={{ flex:1, display:"flex", alignItems:"flex-end", width:"100%" }}>
                  <div style={{ width:"100%", height:`${(city.nights/4)*100}%`, background:city.color, borderRadius:"5px 5px 0 0", minHeight:"16px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ color:"white", fontWeight:"bold", fontSize:"13px" }}>{city.nights}</span>
                  </div>
                </div>
                <div style={{ textAlign:"center", marginTop:"7px", fontSize:"9px", color:"#777", whiteSpace:"pre-wrap", lineHeight:1.3 }}>{city.emoji}{"\n"}{city.name}</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:"14px", paddingTop:"10px", borderTop:"1px solid #f0f0f0" }}>
            <span style={{ fontSize:"11px", color:"#bbb" }}>✈️ Arrived: Haneda</span>
            <span style={{ fontSize:"11px", color:"#bbb" }}>✈️ Departed: Haneda</span>
          </div>
        </Section>


        {/* FULL SCHEDULE */}
        <div style={fade(0.3)}>
          <div style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"#999", marginBottom:"16px", paddingLeft:"4px" }}>
            📅 Full Day-by-Day Schedule — click any day to expand
          </div>
          {schedule.map((d) => {
            const isOpen  = activeDay === d.day;
            const stepObj = dayData.find(x => x.day === d.day);
            return (
              <div key={d.day}
                onClick={() => setActiveDay(isOpen ? null : d.day)}
                style={{ background:"white", borderRadius:"12px", marginBottom:"8px", overflow:"hidden", boxShadow:"0 2px 10px rgba(0,0,0,0.05)", cursor:"pointer", borderLeft:`4px solid ${d.color}` }}>
                <div style={{ display:"flex", alignItems:"center", padding:"14px 18px", gap:"14px" }}>
                  <div style={{ background:d.color, color:"white", borderRadius:"8px", padding:"4px 9px", fontSize:"11px", fontWeight:"bold", whiteSpace:"nowrap", minWidth:"52px", textAlign:"center" }}>
                    Day {d.day}
                  </div>
                  <div style={{ fontSize:"18px" }}>{d.emoji}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:"bold", fontSize:"13px" }}>{d.date} — {d.city}</div>
                    <div style={{ fontSize:"10px", color:"#bbb", marginTop:"1px" }}>{d.hotel}</div>
                  </div>
                  {stepObj && (
                    <div style={{ textAlign:"right", whiteSpace:"nowrap" }}>
                      <div style={{ fontSize:"13px", fontWeight:"bold", color:d.color }}>{stepObj.steps.toLocaleString()}</div>
                      <div style={{ fontSize:"9px", color:"#ccc" }}>steps</div>
                    </div>
                  )}
                  <div style={{ color:"#ccc", fontSize:"14px", marginLeft:"8px", transform:isOpen?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.25s" }}>▼</div>
                </div>
                {isOpen && (
                  <div style={{ padding:"0 18px 16px", borderTop:"1px solid #f5f5f5" }}>
                    <ul style={{ margin:"12px 0 0", padding:0, listStyle:"none" }}>
                      {d.items.map((item,i) => (
                        <li key={i} style={{ display:"flex", gap:"8px", padding:"5px 0", borderBottom:i<d.items.length-1?"1px solid #fafafa":"none", fontSize:"12px", color:"#444", alignItems:"flex-start" }}>
                          <span style={{ color:d.color, marginTop:"1px" }}>›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>


        {/* SPECIAL EXPERIENCES */}
        <Section title="⭐ 10 Special Experiences" style={fade(0.33)}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
            {[
              { name:"Steak House Kitchen Hida",      detail:"Hida Wagyu · Takayama · Mar 31",                    emoji:"🥩" },
              { name:"Miyako Odori",                  detail:"Geisha spring dance · Gion · Apr 5",                emoji:"💃" },
              { name:"Taian — 3-star Michelin",       detail:"Kaiseki dinner · Osaka · Apr 7",                    emoji:"🍱" },
              { name:"Sumo Hall",                     detail:"Grand tournament · Osaka · Apr 9",                  emoji:"🏆" },
              { name:"Universal Studios Japan",       detail:"Super Nintendo World · Osaka · Apr 8",              emoji:"🍄" },
              { name:"Ghibli Museum",                 detail:"Mitaka · Apr 13 · unique 35mm film frames",         emoji:"🐱" },
              { name:"TeamLab Planets",               detail:"Immersive digital art · Toyosu · Apr 14",           emoji:"✨" },
              { name:"Gintama: Yoshiwara in Flames",  detail:"Watched in Japanese · Osaka · Apr 6 🎬",            emoji:"⚔️" },
              { name:"Miyajima Ropeway + Aquarium",   detail:"Mountaintop views + otters, dolphins · Apr 11 🦦",  emoji:"🚡" },
              { name:"Arashiyama Monkey Park Iwatayama", detail:"Wild macaques on the mountaintop · Kyoto · Apr 4 🐒", emoji:"🐵" },
            ].map((e,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"12px 14px", background:"#fafafa", borderRadius:"10px", borderLeft:"3px solid #c0392b" }}>
                <span style={{ fontSize:"22px" }}>{e.emoji}</span>
                <div>
                  <div style={{ fontWeight:"bold", fontSize:"12px" }}>{e.name}</div>
                  <div style={{ fontSize:"10px", color:"#bbb" }}>{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>


        {/* TRANSPORT + LANDMARKS */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"24px", ...fade(0.36) }}>
          <Section title="🚄 Transport Modes Used" style={{ marginBottom:0 }}>
            {[
              { mode:"Shinkansen",         count:"3 routes",  note:"Nagoya→Kyoto, Osaka→Hiroshima, Hiroshima→Tokyo", emoji:"🚄" },
              { mode:"Limited Express/JR", count:"5+ rides",  note:"Hida, Fuji Excursion, Sagano, Nara Line…",       emoji:"🚃" },
              { mode:"Highway Bus",        count:"2 routes",  note:"Tokyo→Kawaguchiko, Matsumoto→Takayama (Nohi)",   emoji:"🚌" },
              { mode:"Subway / Metro",     count:"Daily",     note:"Tokyo Metro, Osaka Metro, Kyoto subway",         emoji:"🚇" },
              { mode:"Ferry",              count:"1 crossing",note:"Miyajimaguchi → Miyajima Island",                emoji:"⛴️" },
              { mode:"Bicycle",            count:"1 full day",note:"Kawaguchiko lakefront",                          emoji:"🚲" },
            ].map((t,i) => (
              <div key={i} style={{ display:"flex", gap:"10px", padding:"7px 0", borderBottom:i<5?"1px solid #f8f8f8":"none" }}>
                <span style={{ fontSize:"18px" }}>{t.emoji}</span>
                <div>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    <span style={{ fontSize:"12px", fontWeight:"bold" }}>{t.mode}</span>
                    <span style={{ fontSize:"10px", color:"#c0392b", background:"#fdf0ee", padding:"1px 7px", borderRadius:"10px" }}>{t.count}</span>
                  </div>
                  <div style={{ fontSize:"10px", color:"#ccc", marginTop:"1px" }}>{t.note}</div>
                </div>
              </div>
            ))}
          </Section>
          <Section title="⛩️ 13 Temples, Shrines & Landmarks" style={{ marginBottom:0 }}>
            {[
              { name:"Tsurugaoka Hachimangū + Hokokuji", place:"Kamakura",  emoji:"🪷" },
              { name:"Great Buddha (Kōtoku-in)",         place:"Kamakura",  emoji:"🗿" },
              { name:"Meiji Jingu Shrine",               place:"Tokyo",     emoji:"⛩️" },
              { name:"Matsumoto Castle",                 place:"Matsumoto", emoji:"🏯" },
              { name:"Todai-ji — Great Buddha Hall",     place:"Nara",      emoji:"🦌" },
              { name:"Kasuga Taisha shrine",             place:"Nara",      emoji:"🏮" },
              { name:"Kinkaku-ji (Golden Pavilion)",     place:"Kyoto",     emoji:"✨" },
              { name:"Arashiyama Bamboo + Tenryu-ji",    place:"Kyoto",     emoji:"🎋" },
              { name:"Fushimi Inari Taisha",             place:"Kyoto",     emoji:"⛩️" },
              { name:"Katsuo-ji",                        place:"Osaka",     emoji:"🎎" },
              { name:"Atomic Bomb Dome",                 place:"Hiroshima", emoji:"🕊️" },
              { name:"Itsukushima Shrine",               place:"Miyajima",  emoji:"⛩️" },
              { name:"Senso-ji",                         place:"Tokyo",     emoji:"🏮" },
            ].map((s,i) => (
              <div key={i} style={{ display:"flex", gap:"8px", padding:"5px 0", borderBottom:i<12?"1px solid #f8f8f8":"none", alignItems:"center" }}>
                <span style={{ fontSize:"13px" }}>{s.emoji}</span>
                <span style={{ fontSize:"11px", fontWeight:"bold" }}>{s.name}</span>
                <span style={{ fontSize:"10px", color:"#ccc" }}>{s.place}</span>
              </div>
            ))}
          </Section>
        </div>


        {/* FOOD */}
        <div style={{ background:"#c0392b", borderRadius:"16px", padding:"28px", marginBottom:"24px", ...fade(0.4) }}>
          <div style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginBottom:"18px" }}>🍜 14 Dishes Conquered</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", marginBottom:"18px" }}>
            {["Wagyu A5","Tonkatsu","Soba","Ramen","Sushi / Omakase","Gyoza","Yakitori","Hida Beef","Takoyaki","Kaiseki (Taian)","Kushikatsu","Yakiniku","Matcha everything","Daily 7-Eleven onigiri"].map((d,i) => (
              <span key={i} style={{ background:"rgba(255,255,255,0.15)", color:"white", borderRadius:"20px", padding:"5px 13px", fontSize:"12px", fontStyle:"italic" }}>{d}</span>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px" }}>
            {[
              { stat:"1 Michelin 3-star meal", sub:"Taian kaiseki — the trip highlight",    icon:"⭐" },
              { stat:"~1 ramen stain",         sub:"Uniqlo shirt: brave sacrifice",         icon:"👕" },
              { stat:"Real wasabi convert",    sub:"Fresh-grated on sushi & spicy food — tube stuff is dead to us", icon:"🟢" },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(0,0,0,0.18)", borderRadius:"10px", padding:"14px", textAlign:"center" }}>
                <div style={{ fontSize:"20px" }}>{s.icon}</div>
                <div style={{ color:"white", fontWeight:"bold", fontSize:"12px", margin:"5px 0 3px" }}>{s.stat}</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:"10px", fontStyle:"italic" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>


        {/* CHERRY BLOSSOMS */}
        <Section title="🌸 Cherry Blossom Tracker" style={fade(0.43)}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px" }}>
            {[
              { spot:"Tokyo",                timing:"Days 1–4",   status:"Full bloom",              color:"#e74c3c" },
              { spot:"Kawaguchiko",          timing:"Days 5–6",   status:"Not yet at peak",          color:"#95a5a6" },
              { spot:"Matsumoto",            timing:"Day 7",      status:"Full bloom",               color:"#e74c3c" },
              { spot:"Takayama",             timing:"Days 8–9",   status:"Full bloom",               color:"#e74c3c" },
              { spot:"Kyoto",               timing:"Days 10–13", status:"Full bloom",               color:"#e74c3c" },
              { spot:"Osaka",               timing:"Days 14–17", status:"Full bloom",               color:"#e74c3c" },
              { spot:"Hiroshima / Miyajima", timing:"Days 18–19", status:"Past peak",                color:"#95a5a6" },
              { spot:"Ueno Park",           timing:"Day 20",     status:"Yaezakura late blooms 🌸",  color:"#8e44ad" },
            ].map((b,i) => (
              <div key={i} style={{ padding:"12px", background:"#fdf6ec", borderRadius:"10px", borderLeft:`3px solid ${b.color}` }}>
                <div style={{ fontWeight:"bold", fontSize:"11px" }}>🌸 {b.spot}</div>
                <div style={{ fontSize:"10px", color:"#ccc", margin:"2px 0" }}>{b.timing}</div>
                <div style={{ fontSize:"11px", color:b.color, fontWeight:"bold" }}>{b.status}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:"14px", background:"#fdf0ee", borderRadius:"10px", padding:"10px 14px", fontSize:"11px", color:"#c0392b", fontStyle:"italic" }}>
            Full bloom from Tokyo all the way to Osaka — 5 cities, peak sakura throughout. Timed it perfectly 🌸
          </div>
        </Section>


        {/* SIDE QUESTS */}
        <Section title="🎮 Side Quest Hall of Fame" style={fade(0.47)}>
          {[
            { title:"The Pochita Hunt",        emoji:"🔴⛓️", detail:"Tokyo leg 1 → Osaka → Akihabara — 25+ arcades visited across the entire trip",  outcome:"Complete",   c:"#27ae60", days:"Full trip"  },
            { title:"Rumi the Daruma",         emoji:"🎎",   detail:"Katsuo-ji · wrote our wishes · named Rumi (like Darumi)",                        outcome:"Complete",   c:"#27ae60", days:"Day 17"    },
            { title:"ITA Airways Crisis",      emoji:"✈️",   detail:"Ticket name discrepancy — multi-channel assault on customer service",               outcome:"Resolved",   c:"#27ae60", days:"Pre-Apr 15"},
            { title:"Shiba Inu Drought",       emoji:"🐕",   detail:"4 days in central Tokyo without a single sighting",                                outcome:"Kai at home",c:"#e67e22", days:"4 days"    },
            { title:"Ghibli 35mm Frames",      emoji:"🎞️",  detail:"Laputa: Castle in the Sky + Howl's Moving Castle — unique, unrepeatable",          outcome:"Priceless",  c:"#8e44ad", days:"Day 21"    },
            { title:"Japanese Knife Shopping", emoji:"🔪",   detail:"Takayama arrival day — Sanmachi Suji, proper hagane steel",                        outcome:"Acquired",   c:"#2980b9", days:"Day 8"     },
            { title:"The Clothes Avalanche",   emoji:"👗",   detail:"20+ kg of clothes bought — suitcase screaming, luggage scale crying",                outcome:"20+ kg",     c:"#e74c3c", days:"Full trip" },
            { title:"Plushie Army Assembled",  emoji:"🧸",   detail:"10+ plushies acquired — Pochita, Totoro, friends. Carry-on was 90% stuffing",        outcome:"10+ troops", c:"#8e44ad", days:"Full trip" },
            { title:"Figurine Collector Arc",  emoji:"🎯",   detail:"5+ figurines bought AND won at the arcade — claw machine skills: unlocked, woohoo!",  outcome:"5+ claimed", c:"#f39c12", days:"Full trip" },
          ].map((q,i) => (
            <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"11px 14px", background:"#fafafa", borderRadius:"10px", marginBottom:"8px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                <span style={{ fontSize:"21px" }}>{q.emoji}</span>
                <div>
                  <span style={{ fontWeight:"bold", fontSize:"12px" }}>{q.title}</span>
                  <span style={{ color:"#ccc", fontSize:"10px", marginLeft:"8px" }}>{q.days}</span>
                  <div style={{ fontSize:"10px", color:"#bbb", marginTop:"2px" }}>{q.detail}</div>
                </div>
              </div>
              <div style={{ fontSize:"10px", fontWeight:"bold", color:q.c, whiteSpace:"nowrap", marginLeft:"12px", background:`${q.c}18`, padding:"4px 10px", borderRadius:"12px" }}>{q.outcome}</div>
            </div>
          ))}
        </Section>


        {/* FOOTER */}
        <div style={{ textAlign:"center", padding:"32px 24px", background:"#1a1a1a", borderRadius:"16px", ...fade(0.52) }}>
          <div style={{ fontSize:"28px", marginBottom:"12px" }}>🌸 🗼 🍜 🎎 ⛩️ 🌸</div>
          <div style={{ fontSize:"22px", fontWeight:"bold", color:"white", marginBottom:"20px" }}>The Shustimov Japan Adventure</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"10px", marginBottom:"24px" }}>
            {[
              { val:"424,010",           label:"Total Steps"      },
              { val:`~${distanceKm} km`, label:"Distance Walked"  },
              { val:"22 nights",         label:"In Japan"         },
              { val:"9 prefectures",     label:"Covered"          },
            ].map((s,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:"10px", padding:"14px" }}>
                <div style={{ color:"#f39c12", fontWeight:"bold", fontSize:"20px" }}>{s.val}</div>
                <div style={{ color:"#555", fontSize:"9px", textTransform:"uppercase", letterSpacing:"1px", marginTop:"4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize:"13px", color:"#555" }}>Kai is very happy to have you both home 🐾</div>
        </div>


      </div>
    </div>
  );
}