import { useState } from "react";

const QUESTIONS = [
  {
    q: "친구가 갑자기 울고 있다. 나는?",
    options: [
      { text: "\"왜 울어? 무슨 일 있어?\" 바로 안아준다", type: "E" },
      { text: "\"...괜찮아?\" 조용히 옆에 앉아있는다", type: "T" },
    ],
  },
  {
    q: "여행 계획을 짤 때 나는?",
    options: [
      { text: "분위기 맛집 먼저 검색, 즉흥적으로 움직인다", type: "E" },
      { text: "엑셀로 시간표 짜고 예약 다 해놓는다", type: "T" },
    ],
  },
  {
    q: "좋아하는 사람에게 연락할 때?",
    options: [
      { text: "생각나면 바로 카톡, 답장 늦으면 또 보냄", type: "E" },
      { text: "뭐라고 보낼지 한참 고민하다 보냄", type: "T" },
    ],
  },
  {
    q: "싸우고 나서 나는?",
    options: [
      { text: "감정이 폭발해서 그 자리에서 다 말한다", type: "E" },
      { text: "일단 혼자 식히고 나중에 차분히 얘기한다", type: "T" },
    ],
  },
  {
    q: "친구들 사이에서 나는?",
    options: [
      { text: "분위기 메이커, 없으면 조용해짐", type: "E" },
      { text: "말수는 적지만 필요할 때 핵심만 말함", type: "T" },
    ],
  },
  {
    q: "드라마 볼 때 나는?",
    options: [
      { text: "감정이입 심하게 해서 펑펑 운다", type: "E" },
      { text: "\"저 상황에서 왜 저러지\" 분석하면서 본다", type: "T" },
    ],
  },
  {
    q: "칭찬받으면?",
    options: [
      { text: "\"에이 아니에요~\" 하면서 속으로 엄청 기뻐함", type: "E" },
      { text: "\"감사합니다\" 담담하게 받음", type: "T" },
    ],
  },
  {
    q: "좋아하는 데이트 스타일은?",
    options: [
      { text: "감성 카페, 야경 드라이브, 깜짝 이벤트", type: "E" },
      { text: "맛있는 거 먹고 집에서 영화 보기", type: "T" },
    ],
  },
  {
    q: "화가 많이 났을 때 나는?",
    options: [
      { text: "표정이나 말투에 바로 티남", type: "E" },
      { text: "겉으론 멀쩡한데 속으로 끓고 있음", type: "T" },
    ],
  },
  {
    q: "내가 생각하는 이상적인 나는?",
    options: [
      { text: "감수성 풍부하고 따뜻한 사람", type: "E" },
      { text: "믿음직하고 흔들리지 않는 사람", type: "T" },
    ],
  },
];

const RESULTS = {
  E: {
    type: "에겐남 🌸",
    emoji: "🌸",
    color1: "#ff6b9d",
    color2: "#ffa8c5",
    bg: "linear-gradient(135deg, #1a0a14 0%, #2d0f20 100%)",
    accent: "#ff6b9d",
    desc: "감성이 풍부하고 표현력이 넘치는 에겐남!",
    traits: ["감정 표현이 풍부해요", "공감 능력이 뛰어나요", "분위기 메이커예요", "즉흥적이고 자유로워요"],
    detail: "에너지가 넘치고 감수성이 풍부한 당신. 주변 사람들이 당신과 함께 있으면 따뜻함을 느껴요. 감정 표현에 솔직하고 상대방의 기분을 잘 읽는 타입이에요.",
  },
  T: {
    type: "테토남 🌊",
    emoji: "🌊",
    color1: "#4a9eff",
    color2: "#7bc3ff",
    bg: "linear-gradient(135deg, #050e1a 0%, #0a1e35 100%)",
    accent: "#4a9eff",
    desc: "차분하고 신뢰감 넘치는 테토남!",
    traits: ["감정 조절을 잘해요", "계획적이고 신중해요", "말보다 행동으로 보여줘요", "깊이 있는 매력이 있어요"],
    detail: "겉으론 차가워 보여도 속은 따뜻한 당신. 신뢰감과 안정감을 주는 타입이에요. 쉽게 흔들리지 않고 위기 상황에서 빛을 발하는 든든한 존재예요.",
  },
};

export default function App() {
  const [step, setStep] = useState("intro"); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleStart = () => {
    setStep("quiz");
    setCurrent(0);
    setAnswers([]);
    setSelected(null);
  };

  const handleSelect = (type) => {
    if (animating) return;
    setSelected(type);
    setAnimating(true);
    setTimeout(() => {
      const newAnswers = [...answers, type];
      if (current + 1 >= QUESTIONS.length) {
        setAnswers(newAnswers);
        setStep("result");
      } else {
        setCurrent(current + 1);
        setSelected(null);
      }
      setAnimating(false);
    }, 500);
  };

  const getResult = () => {
    const eCount = answers.filter(a => a === "E").length;
    return eCount >= 5 ? RESULTS.E : RESULTS.T;
  };

  const progress = (current / QUESTIONS.length) * 100;

  // 인트로
  if (step === "intro") {
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(135deg, #0d0d1a 0%, #1a0d2e 50%, #0d1a1a 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Noto Sans KR', sans-serif", overflow:"hidden", position:"relative" }}>
        {/* 배경 오브 */}
        {["#ff6b9d","#4a9eff","#a855f7"].map((c,i) => (
          <div key={i} style={{ position:"absolute", width: 200+i*100, height: 200+i*100, borderRadius:"50%", background:`radial-gradient(circle, ${c}22, transparent 70%)`, top: `${20+i*25}%`, left: `${10+i*30}%`, animation:`float${i} ${4+i}s ease-in-out infinite alternate`, pointerEvents:"none" }} />
        ))}

        <div style={{ textAlign:"center", zIndex:1 }}>
          <div style={{ fontSize:64, marginBottom:8, animation:"bounce 2s ease-in-out infinite" }}>🔮</div>
          <div style={{ fontSize:13, color:"#a855f7", letterSpacing:4, fontWeight:700, marginBottom:12 }}>PERSONALITY TEST</div>
          <h1 style={{ fontSize:28, fontWeight:900, color:"#fff", lineHeight:1.3, marginBottom:8 }}>
            나는 에겐남? 🌸<br />아니면 테토남? 🌊
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:40, lineHeight:1.6 }}>
            10가지 질문으로 알아보는<br />나의 진짜 에너지 타입
          </p>

          <button onClick={handleStart} style={{ background:"linear-gradient(135deg, #ff6b9d, #a855f7, #4a9eff)", border:"none", color:"#fff", fontSize:16, fontWeight:800, padding:"16px 48px", borderRadius:50, cursor:"pointer", boxShadow:"0 8px 32px rgba(168,85,247,0.4)", letterSpacing:1 }}>
            테스트 시작하기 ✨
          </button>

          <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)", marginTop:24 }}>10문항 · 약 2분 소요</p>
        </div>

        <style>{`
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
          @keyframes float0 { from{transform:translate(0,0) scale(1)} to{transform:translate(20px,30px) scale(1.1)} }
          @keyframes float1 { from{transform:translate(0,0) scale(1)} to{transform:translate(-30px,20px) scale(0.9)} }
          @keyframes float2 { from{transform:translate(0,0) scale(1)} to{transform:translate(15px,-25px) scale(1.05)} }
        `}</style>
      </div>
    );
  }

  // 퀴즈
  if (step === "quiz") {
    const q = QUESTIONS[current];
    return (
      <div style={{ minHeight:"100vh", background:"linear-gradient(180deg, #0d0d1a 0%, #1a0d2e 100%)", display:"flex", flexDirection:"column", padding:24, fontFamily:"'Noto Sans KR', sans-serif" }}>
        {/* 진행바 */}
        <div style={{ marginBottom:32, paddingTop:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700 }}>QUESTION</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{current + 1} / {QUESTIONS.length}</span>
          </div>
          <div style={{ height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${progress}%`, background:"linear-gradient(90deg, #ff6b9d, #a855f7, #4a9eff)", borderRadius:2, transition:"width 0.4s ease" }} />
          </div>
        </div>

        {/* 질문 */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center" }}>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"28px 24px", marginBottom:24, textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:16 }}>
              {["💭","🤔","💫","😅","🎭","😢","🥰","💑","😤","✨"][current]}
            </div>
            <p style={{ fontSize:17, fontWeight:700, color:"#fff", lineHeight:1.6, margin:0 }}>
              {q.q}
            </p>
          </div>

          {/* 선택지 */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {q.options.map((opt, i) => (
              <button key={i} onClick={() => handleSelect(opt.type)}
                style={{
                  background: selected === opt.type
                    ? opt.type === "E"
                      ? "linear-gradient(135deg, #ff6b9d33, #ff6b9d22)"
                      : "linear-gradient(135deg, #4a9eff33, #4a9eff22)"
                    : "rgba(255,255,255,0.04)",
                  border: selected === opt.type
                    ? `1.5px solid ${opt.type === "E" ? "#ff6b9d" : "#4a9eff"}`
                    : "1.5px solid rgba(255,255,255,0.08)",
                  borderRadius:16,
                  padding:"18px 20px",
                  color: selected === opt.type
                    ? opt.type === "E" ? "#ff6b9d" : "#4a9eff"
                    : "rgba(255,255,255,0.8)",
                  fontSize:14,
                  fontWeight:600,
                  textAlign:"left",
                  cursor:"pointer",
                  transition:"all 0.2s",
                  lineHeight:1.5,
                  fontFamily:"'Noto Sans KR', sans-serif",
                }}
              >
                {["A","B"][i]}. {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 결과
  if (step === "result") {
    const r = getResult();
    const eCount = answers.filter(a => a === "E").length;
    const tCount = 10 - eCount;

    return (
      <div style={{ minHeight:"100vh", background: r.bg, display:"flex", flexDirection:"column", alignItems:"center", padding:"32px 24px 48px", fontFamily:"'Noto Sans KR', sans-serif", position:"relative", overflow:"hidden" }}>
        {/* 배경 */}
        <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:`radial-gradient(circle, ${r.accent}30, transparent 70%)`, top:-50, right:-50, pointerEvents:"none" }} />
        <div style={{ position:"absolute", width:200, height:200, borderRadius:"50%", background:`radial-gradient(circle, ${r.accent}20, transparent 70%)`, bottom:100, left:-50, pointerEvents:"none" }} />

        <div style={{ zIndex:1, width:"100%", maxWidth:400, textAlign:"center" }}>
          {/* 결과 타입 */}
          <div style={{ fontSize:72, marginBottom:8, animation:"bounce 1s ease-in-out infinite" }}>{r.emoji}</div>
          <div style={{ fontSize:11, color: r.accent, letterSpacing:4, fontWeight:700, marginBottom:8 }}>RESULT</div>
          <h2 style={{ fontSize:32, fontWeight:900, color:"#fff", marginBottom:4 }}>{r.type}</h2>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:32 }}>{r.desc}</p>

          {/* 비율 바 */}
          <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:16, padding:"20px", marginBottom:24, border:"1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
              <span style={{ fontSize:13, color:"#ff6b9d", fontWeight:700 }}>에겐 {eCount * 10}%</span>
              <span style={{ fontSize:13, color:"#4a9eff", fontWeight:700 }}>테토 {tCount * 10}%</span>
            </div>
            <div style={{ height:10, background:"rgba(255,255,255,0.08)", borderRadius:5, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${eCount * 10}%`, background:"linear-gradient(90deg, #ff6b9d, #a855f7)", borderRadius:5, transition:"width 1s ease" }} />
            </div>
          </div>

          {/* 특징 */}
          <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:20, marginBottom:20, border:"1px solid rgba(255,255,255,0.08)", textAlign:"left" }}>
            <div style={{ fontSize:12, color: r.accent, fontWeight:700, letterSpacing:2, marginBottom:14 }}>TRAITS</div>
            {r.traits.map((t, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background: r.accent, flexShrink:0 }} />
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.8)" }}>{t}</span>
              </div>
            ))}
          </div>

          {/* 상세 설명 */}
          <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:20, marginBottom:32, border:"1px solid rgba(255,255,255,0.08)", textAlign:"left" }}>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.8, margin:0 }}>{r.detail}</p>
          </div>

          {/* 다시하기 */}
          <button onClick={handleStart} style={{ background:`linear-gradient(135deg, ${r.accent}, #a855f7)`, border:"none", color:"#fff", fontSize:15, fontWeight:800, padding:"14px 40px", borderRadius:50, cursor:"pointer", boxShadow:`0 8px 24px ${r.accent}44`, width:"100%", fontFamily:"'Noto Sans KR', sans-serif" }}>
            다시 테스트하기 🔄
          </button>
        </div>

        <style>{`
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        `}</style>
      </div>
    );
  }
}
