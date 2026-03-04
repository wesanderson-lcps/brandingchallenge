import React, { useState, useEffect, useMemo } from 'react';
import { Camera, CheckCircle2, RefreshCcw, Send, Trophy, Info, Eye, Type } from 'lucide-react';

// Custom SVG Path Data for real brand logos
const LOGO_VECTORS = {
  Nike: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M21 7.2c-2.3 1.5-6.1 4.5-9.4 7.5-2.2 2-3.8 3.9-4.8 5.1-.4.5-.7.7-1 .7-.3 0-.4-.1-.5-.4-.2-.5-.1-1.3.4-2.5 1.5-3.5 5.1-8.5 10.1-12.1 1.7-1.2 3.4-1.9 4.8-2 .4 0 .6.2.6.5 0 .7-.4 1.9-1.2 3.2z" />
    </svg>
  ),
  Apple: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M17.1 11.2c0-2 1.6-3 1.7-3.1-1-.1-2-.1-2.4-.1-1.1 0-2.2.8-2.8.8-.6 0-1.4-.7-2.3-.7-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.8 2.2 1.8.8 0 1.1-.5 2.1-.5 1 0 1.3.5 2.2.5s1.5-.8 2-1.6c.7-1 1-2 1-2.1-.1 0-2-.8-2-3zM14 6.1c.5-.6.8-1.4.7-2.2-.7 0-1.6.4-2.1 1-.5.5-.8 1.4-.7 2.1.8.1 1.6-.3 2.1-.9z" />
    </svg>
  ),
  McDonalds: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M3 20h2V9c0-2.2 1.8-4 4-4s4 1.8 4 4v11h2V9c0-2.2 1.8-4 4-4s4 1.8 4 4v11h2V9c0-3.3-2.7-6-6-6-2.4 0-4.5 1.4-5.4 3.5C8.7 4.4 6.5 3 4 3 1.3 3-1 5.2-1 8v12h4z" transform="scale(0.8) translate(3,3)" />
    </svg>
  ),
  Target: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="4" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill={color} />
    </svg>
  ),
  Adidas: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M2 19h4L3 14H0l2 5zm6 0h4L7 9H3l5 10zm6 0h4l-5-15h-4l5 15z" transform="translate(2,0)" />
    </svg>
  ),
  Pepsi: (color) => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="#004B93" />
      <path d="M4 10c2-2 5-3 8-3s6 1 8 3v4c-2 2-5 3-8 3s-6-1-8-3v-4z" fill="white" />
      <path d="M12 7c-3 0-6 1-8 3 0 0 2 1 4 1s4-1 4-1z" fill="#E32219" />
    </svg>
  ),
  Volkswagen: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" className="w-full h-full">
      <circle cx="12" cy="12" r="10" />
      <path d="M7 7l5 10 5-10" />
      <path d="M4 7l8 12 8-12" />
    </svg>
  ),
  UnderArmour: (color) => (
    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
      <path d="M12 12c-3 0-6-2-6-5s3-5 6-5 6 2 6 5-3 5-6 5zm0 0c-3 0-6 2-6 5s3 5 6 5 6-2 6-5-3-5-6-5z" opacity="0.8" />
    </svg>
  ),
  Chanel: (color) => (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" className="w-full h-full">
      <path d="M9 7a5 5 0 1 0 0 10" />
      <path d="M15 7a5 5 0 1 1 0 10" />
    </svg>
  ),
  Mastercard: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="9" cy="12" r="7" fill="#EB001B" fillOpacity="0.8" />
      <circle cx="15" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8" />
    </svg>
  )
};

// Expanded database
const BRAND_DATA = [
  { name: "Nike", slogan: "Just Do It", color: "#000000", logoKey: "Nike", companiesLogoId: "NKE" },
  { name: "Apple", slogan: "Think Different", color: "#555555", logoKey: "Apple", companiesLogoId: "AAPL" },
  { name: "McDonald's", slogan: "I'm Lovin' It", color: "#FFC72C", logoKey: "McDonalds", companiesLogoId: "MCD" },
  { name: "Coca-Cola", slogan: "Open Happiness", color: "#F40009", companiesLogoId: "KO" },
  { name: "Target", slogan: "Expect More. Pay Less.", color: "#CC0000", logoKey: "Target", companiesLogoId: "TGT" },
  { name: "Adidas", slogan: "Impossible is Nothing", color: "#000000", logoKey: "Adidas", companiesLogoId: "ADDYY" },
  { name: "Pepsi", slogan: "For the Love of It", color: "#004B93", logoKey: "Pepsi", companiesLogoId: "PEP" },
  { name: "Volkswagen", slogan: "Das Auto", color: "#001E50", logoKey: "Volkswagen", companiesLogoId: "VWAGY" },
  { name: "Under Armour", slogan: "Protect This House", color: "#000000", logoKey: "UnderArmour", companiesLogoId: "UA" },
  { name: "Chanel", slogan: "Share the Fantasy", color: "#000000", logoKey: "Chanel", companiesLogoId: "chanel" },
  { name: "Mastercard", slogan: "Priceless", color: "#EB001B", logoKey: "Mastercard", companiesLogoId: "MA" },
  { name: "Disney", slogan: "The Happiest Place on Earth", color: "#113CCF", companiesLogoId: "DIS" },
  { name: "Amazon", slogan: "Work Hard. Have Fun. Make History.", color: "#FF9900", companiesLogoId: "AMZN" },
  { name: "Subway", slogan: "Eat Fresh", color: "#008C15", companiesLogoId: "subway" },
  { name: "BMW", slogan: "The Ultimate Driving Machine", color: "#0066B1", companiesLogoId: "BMWYY" },
  { name: "Red Bull", slogan: "Gives You Wings", color: "#000B47", companiesLogoId: "red-bull" },
  { name: "Walmart", slogan: "Save Money. Live Better.", color: "#0071CE", companiesLogoId: "WMT" },
  { name: "Toyota", slogan: "Let's Go Places", color: "#EB0A1E", companiesLogoId: "TM" },
  { name: "Google", slogan: "Don't Be Evil", color: "#4285F4", companiesLogoId: "GOOGL" },
  { name: "Starbucks", slogan: "To inspire and nurture the human spirit", color: "#00704A", companiesLogoId: "SBUX" },
  { name: "Netflix", slogan: "See What's Next", color: "#E50914", companiesLogoId: "NFLX" },
  { name: "Skittles", slogan: "Taste the Rainbow", color: "#FF0000", companiesLogoId: "skittles" },
  { name: "Airbnb", slogan: "Belong Anywhere", color: "#FF5A5F", companiesLogoId: "ABNB" },
  { name: "Gillette", slogan: "The Best a Man Can Get", color: "#0038A8", companiesLogoId: "gillette" },
  { name: "eBay", slogan: "Buy it now, keep it forever", color: "#E53238", companiesLogoId: "EBAY" },
  { name: "General Electric", slogan: "Imagination at Work", color: "#005EB8", companiesLogoId: "GE" },
  { name: "Verizon", slogan: "Give your network credit", color: "#CD040B", companiesLogoId: "VZ" },
  { name: "Allstate", slogan: "You're in Good Hands", color: "#004B8D", companiesLogoId: "ALL" },
  { name: "State Farm", slogan: "Like a Good Neighbor", color: "#E12027", companiesLogoId: "state-farm" },
  { name: "Geico", slogan: "15 Minutes Could Save You 15%", color: "#007A33", companiesLogoId: "geico" },
  { name: "Tesla", slogan: "Powering the Future", color: "#CC0000", companiesLogoId: "TSLA" },
  { name: "Instagram", slogan: "Capture and Share the World's Moments", color: "#E1306C", companiesLogoId: "instagram" },
  { name: "Visa", slogan: "Everywhere You Want To Be", color: "#1A1F71", companiesLogoId: "V" },
  { name: "Rolex", slogan: "A Crown for Every Achievement", color: "#006039", companiesLogoId: "rolex" },
  { name: "Intel", slogan: "Experience What's Inside", color: "#0071C5", companiesLogoId: "INTC" },
  { name: "Microsoft", slogan: "Empowering us all", color: "#F25022", companiesLogoId: "MSFT" },
  { name: "LEGO", slogan: "Play On", color: "#D11013", companiesLogoId: "lego" },
  { name: "Spotify", slogan: "Music for Everyone", color: "#1DB954", companiesLogoId: "SPOT" },
  { name: "LinkedIn", slogan: "Connect to Opportunity", color: "#0077B5", companiesLogoId: "linkedin" },
  { name: "Uber", slogan: "Move the Way You Want", color: "#000000", companiesLogoId: "UBER" },
  { name: "Slack", slogan: "Where Work Happens", color: "#4A154B", companiesLogoId: "slack" },
  { name: "FedEx", slogan: "Where Now Meets Next", color: "#4D148C", companiesLogoId: "FDX" },
  { name: "KFC", slogan: "It's Finger Lickin' Good", color: "#E4002B", companiesLogoId: "kfc" },
  { name: "Dunkin'", slogan: "America Runs on Dunkin'", color: "#FF671F", companiesLogoId: "dunkin" },
  { name: "Taco Bell", slogan: "Live Mas", color: "#702082", companiesLogoId: "taco-bell" },
  { name: "Patagonia", slogan: "Earth First", color: "#3B5998", companiesLogoId: "patagonia" },
  { name: "L'Oréal", slogan: "Because You're Worth It", color: "#D4AF37", companiesLogoId: "LRLCY" },
  { name: "Burger King", slogan: "Have It Your Way", color: "#D62300", companiesLogoId: "QSR" },
  { name: "Energizer", slogan: "It Keeps Going and Going", color: "#000000", companiesLogoId: "ENR" },
  { name: "Skype", slogan: "Connect with the world", color: "#00AFF0", companiesLogoId: "skype" }
];

const App = () => {
  const [view, setView] = useState('start');
  const [logoChallenge, setLogoChallenge] = useState([]);
  const [sloganChallenge, setSloganChallenge] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  
  const [logoAnswers, setLogoAnswers] = useState({});
  const [sloganChoices, setSloganChoices] = useState({});
  const [sloganReasons, setSloganReasons] = useState({});

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  const startQuiz = () => {
    const pool = shuffle(BRAND_DATA);
    setLogoChallenge(pool.slice(0, 15));
    setSloganChallenge(pool.slice(15, 30));
    setLogoAnswers({});
    setSloganChoices({});
    setSloganReasons({});
    setCurrentStep(0);
    setView('logos');
  };

  const handleLogoNext = () => {
    if (currentStep < 14) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(0);
      setView('slogans');
    }
  };

  const handleSloganNext = () => {
    if (currentStep < 14) {
      setCurrentStep(currentStep + 1);
    } else {
      setView('results');
    }
  };

  const getScore = () => {
    let score = 0;
    logoChallenge.forEach((brand, idx) => {
      if (logoAnswers[idx]?.toLowerCase().trim() === brand.name.toLowerCase()) score++;
    });
    sloganChallenge.forEach((brand, idx) => {
      if (sloganChoices[idx] === brand.name) score++;
    });
    return score;
  };

  const LogoDisplay = ({ brand }) => {
    const [imgError, setImgError] = useState(false);
    const LogoSVG = LOGO_VECTORS[brand.logoKey];

    useEffect(() => {
      setImgError(false);
    }, [brand.name]);

    const logoUrl = brand.companiesLogoId
      ? `https://companieslogo.com/img/orig/${brand.companiesLogoId}.png`
      : null;

    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white border-2 border-dashed rounded-3xl mb-8 shadow-sm transition-all" style={{ borderColor: brand.color + '44' }}>
        <div className="w-40 h-40 flex items-center justify-center rounded-2xl mb-6">
          {logoUrl && !imgError ? (
            <img
              src={logoUrl}
              alt=""
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          ) : LogoSVG ? (
            LogoSVG(brand.color)
          ) : (
            <div className="text-center">
                <Camera size={64} style={{ color: brand.color }} className="mx-auto mb-2 opacity-20" />
                <span className="text-[10px] text-slate-400 font-mono">ENCRYPTED BRAND ID</span>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="text-slate-300 font-mono text-[10px] uppercase tracking-[0.2em]">Visual Signature Protocol</p>
          <div className="h-1 w-12 bg-slate-100 mx-auto rounded-full" />
        </div>
      </div>
    );
  };

  // Views logic remains same as previous version but with new UI tweaks...
  if (view === 'start') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center border border-slate-200">
          <div className="bg-slate-900 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Trophy className="text-yellow-400" size={40} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Identity Quiz</h1>
          <p className="text-slate-500 mb-10 leading-relaxed">Identify real brand shapes and analyze strategic slogans from our database of 50 iconic companies.</p>
          
          <div className="space-y-5 text-left mb-10">
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600 font-bold">1</div>
              <p className="text-sm font-medium text-slate-700">Name 15 iconic shapes.</p>
            </div>
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg shadow-sm text-indigo-600 font-bold">2</div>
              <p className="text-sm font-medium text-slate-700">Analyze 15 marketing slogans.</p>
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 px-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            Enter Challenge <Send size={20} />
          </button>
        </div>
      </div>
    );
  }

  if (view === 'logos') {
    const currentBrand = logoChallenge[currentStep];
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Phase 1: Shape ID</h2>
            <span className="bg-white px-5 py-2 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
              {currentStep + 1} / 15
            </span>
          </div>
          <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-14 text-center">
            <LogoDisplay brand={currentBrand} />
            <div className="space-y-6 max-w-sm mx-auto">
              <input 
                type="text"
                autoFocus
                className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 focus:bg-white transition-all font-bold text-xl text-slate-800 text-center"
                placeholder="Name the Brand"
                value={logoAnswers[currentStep] || ''}
                onChange={(e) => setLogoAnswers({...logoAnswers, [currentStep]: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogoNext()}
              />
              <button onClick={handleLogoNext} disabled={!logoAnswers[currentStep]} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-30">
                {currentStep === 14 ? "Start Slogans" : "Submit Identity"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'slogans') {
    const currentBrand = sloganChallenge[currentStep];
    const choices = useMemo(() => {
        return shuffle([
            currentBrand.name,
            ...shuffle(BRAND_DATA.filter(b => b.name !== currentBrand.name)).slice(0, 3)
        ]);
    }, [currentStep]);

    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 flex justify-between items-center">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Phase 2: Strategy</h2>
            <span className="bg-white px-5 py-2 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
              {currentStep + 1} / 15
            </span>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-12 text-center text-white relative">
              <h3 className="text-3xl font-serif italic mb-3 relative z-10 leading-snug">"{currentBrand.slogan}"</h3>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Official Brand Slogan</p>
            </div>
            <div className="p-8 md:p-12 space-y-12">
              <section>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Match the Brand</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {choices.map((brandName) => (
                    <button key={brandName} onClick={() => setSloganChoices({...sloganChoices, [currentStep]: brandName})}
                      className={`p-5 rounded-2xl border-2 text-left transition-all font-bold text-lg ${sloganChoices[currentStep] === brandName ? 'border-slate-900 bg-slate-50 text-slate-900' : 'border-slate-100 bg-white hover:border-slate-200 text-slate-600'}`}>
                      {brandName}
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Fit Analysis</label>
                <textarea className="w-full p-6 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none focus:border-slate-900 focus:bg-white transition-all h-40 font-medium text-slate-700"
                  placeholder="Why do these words fit this brand's mission?..."
                  value={sloganReasons[currentStep] || ''}
                  onChange={(e) => setSloganReasons({...sloganReasons, [currentStep]: e.target.value})}
                />
              </section>
              <button onClick={handleSloganNext} disabled={!sloganChoices[currentStep] || !sloganReasons[currentStep] || sloganReasons[currentStep].length < 5}
                className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-30 shadow-2xl shadow-slate-200 text-lg">
                {currentStep === 14 ? "View Report" : "Next Analysis"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'results') {
    const score = getScore();
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 p-16 text-center text-white">
              <Trophy size={80} className="mx-auto text-yellow-400 mb-6" />
              <h1 className="text-5xl font-black mb-4 tracking-tighter">Analysis Complete</h1>
              <div className="text-7xl font-black text-slate-300 mb-8">{score}<span className="text-3xl opacity-50">/30</span></div>
              <div className="flex flex-wrap justify-center gap-4 no-print">
                <button onClick={() => window.print()} className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-lg"><Eye size={20} /> Export PDF Report</button>
                <button onClick={() => window.location.reload()} className="bg-slate-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-600 transition-all shadow-lg"><RefreshCcw size={20} /> Restart Quiz</button>
              </div>
            </div>
            <div className="p-12">
              <h2 className="text-3xl font-black text-slate-900 mb-10 border-b-4 border-slate-100 pb-4">Detailed Review</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {sloganChallenge.map((brand, idx) => (
                  <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest ${sloganChoices[idx] === brand.name ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {sloganChoices[idx] === brand.name ? 'Match' : 'Miss'}
                        </span>
                      </div>
                      <p className="text-xl font-serif italic text-slate-800 mb-6">"{brand.slogan}"</p>
                      <div className="space-y-4 pt-6 border-t border-slate-200">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Brand Choice</span>
                            <p className="font-bold text-slate-700">{sloganChoices[idx]} {sloganChoices[idx] !== brand.name && <span className="text-red-400 font-medium">(Goal: {brand.name})</span>}</p>
                        </div>
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Your Reasoning</span>
                            <p className="text-slate-600 italic leading-relaxed">"{sloganReasons[idx]}"</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
