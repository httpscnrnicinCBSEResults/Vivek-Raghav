import React, { useState, useEffect, useRef } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  Play, 
  Award, 
  CheckCircle2, 
  Zap, 
  Trophy, 
  FileCheck,
  Sparkles,
  Layers
} from 'lucide-react';
import { ACADEMY_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';

const SAMPLE_TEXTS = {
  english: "Computer applications and digital technology are essential skills for modern office administration in Haryana and across India. Dharam Futurebit Computer Academy provides comprehensive practical training on modern desktop workstations. Students master touch typing, spreadsheet formulas, database management, and cloud collaboration to excel in government and private sector examinations.",
  hindi_translit: "कंप्यूटर शिक्षा आज के युग में हर युवा के लिए अत्यंत आवश्यक है। धर्म फ्यूचरबिट कंप्यूटर एकेडमी भगोला पलवल में विद्यार्थियों को टाइपिंग और सॉफ्टवेयर की उच्च स्तरीय कोचिंग प्रदान की जाती है।",
  govt_exam: "The candidate must achieve a minimum typing speed of thirty-five words per minute with ninety percent accuracy for clerical examinations. Regular touch typing practice without looking at the keyboard ensures high productivity and error-free official documentation in government departments."
};

export const TypingTestTool: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'hindi_translit' | 'govt_exam'>('english');
  const [inputText, setInputText] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<any>(null);

  const targetText = SAMPLE_TEXTS[selectedLanguage];

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      finishTest();
    }
    return () => clearInterval(timerRef.current);
  }, [isActive, timeLeft]);

  const startTest = () => {
    setIsActive(true);
    setIsFinished(false);
    setInputText('');
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isActive && !isFinished) {
      setIsActive(true);
    }

    const value = e.target.value;
    setInputText(value);

    // Calculate mistakes and accuracy
    let err = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== targetText[i]) {
        err++;
      }
    }
    setMistakes(err);

    // Calculate real-time WPM
    const wordsTyped = value.trim().split(/\s+/).filter(Boolean).length;
    const timeSpent = Math.max(1, 60 - timeLeft);
    const calculatedWpm = Math.round((wordsTyped / timeSpent) * 60);
    setWpm(calculatedWpm);

    const calculatedAccuracy = value.length > 0 ? Math.max(0, Math.round(((value.length - err) / value.length) * 100)) : 100;
    setAccuracy(calculatedAccuracy);

    // If reached full length
    if (value.length >= targetText.length) {
      finishTest();
    }
  };

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);
    clearInterval(timerRef.current);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const resetTest = () => {
    setIsActive(false);
    setIsFinished(false);
    setInputText('');
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
  };

  return (
    <section id="typing-lab-section" className="py-12 bg-white border-y border-[#dadce0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fef7e0] text-[#b06000] text-xs font-semibold">
            <Keyboard className="w-4 h-4 text-[#f29900]" />
            <span>Interactive Computer Lab Tool</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
            1-Minute Speed & Accuracy Typing Lab
          </h2>

          <p className="text-sm text-[#5f6368]">
            Practice touch typing for Haryana Govt. Clerk, Court Steno, DSSSB, and SSC examinations. 
            Test your WPM live on Dharam Futurebit lab guidelines.
          </p>
        </div>

        {/* Typing Lab Container */}
        <div className="bg-[#f8fafd] rounded-3xl border border-[#dadce0] p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8eaed] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#5f6368]">Select Passage:</span>
              <div className="flex gap-1">
                {[
                  { id: 'english', label: 'English Standard' },
                  { id: 'govt_exam', label: 'Govt Exam Passage' },
                  { id: 'hindi_translit', label: 'Hindi Unicode' },
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setSelectedLanguage(mode.id as any);
                      resetTest();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedLanguage === mode.id
                        ? 'bg-[#1a73e8] text-white shadow-xs'
                        : 'bg-white border border-[#dadce0] text-[#3c4043] hover:bg-[#f1f3f4]'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Timer & WPM Counters */}
            <div className="flex items-center gap-4 text-xs sm:text-sm font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#dadce0]">
                <Zap className="w-4 h-4 text-[#ea4335]" />
                <span>Timer: <strong className="text-[#c5221f] font-mono text-base">{timeLeft}s</strong></span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#dadce0]">
                <Trophy className="w-4 h-4 text-[#fbbc04]" />
                <span>Speed: <strong className="text-[#1a73e8] font-mono text-base">{wpm} WPM</strong></span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#dadce0]">
                <CheckCircle2 className="w-4 h-4 text-[#34a853]" />
                <span>Accuracy: <strong className="text-[#137333] font-mono text-base">{accuracy}%</strong></span>
              </div>
            </div>
          </div>

          {/* Reference Target Text Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#dadce0] text-sm sm:text-base text-[#3c4043] font-mono leading-relaxed select-none">
            {targetText.split('').map((char, index) => {
              let colorClass = 'text-[#3c4043]';
              if (index < inputText.length) {
                colorClass = inputText[index] === char ? 'text-[#137333] bg-[#e6f4ea]' : 'text-[#c5221f] bg-[#fce8e6]';
              } else if (index === inputText.length) {
                colorClass = 'bg-[#1a73e8] text-white animate-pulse';
              }
              return (
                <span key={index} className={`${colorClass} rounded-xs`}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* User Typing Area */}
          <div className="space-y-2">
            <textarea
              ref={inputRef}
              disabled={isFinished}
              rows={3}
              value={inputText}
              onChange={handleTextChange}
              placeholder={isActive ? "Keep typing..." : "Click 'Start 1-Min Test' or start typing here..."}
              className="w-full p-4 rounded-2xl border-2 border-[#dadce0] focus:border-[#1a73e8] outline-none text-sm sm:text-base font-mono bg-white resize-none shadow-inner"
            ></textarea>

            <div className="flex items-center justify-between text-xs text-[#5f6368]">
              <span>Characters Typed: {inputText.length} | Errors: {mistakes}</span>
              <div className="flex gap-2">
                {!isActive && !isFinished && (
                  <button
                    onClick={startTest}
                    className="px-5 py-2 rounded-xl bg-[#1a73e8] hover:bg-[#1557b0] text-white font-semibold flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-4 h-4" />
                    <span>Start 1-Min Test</span>
                  </button>
                )}

                <button
                  onClick={resetTest}
                  className="px-4 py-2 rounded-xl bg-white border border-[#dadce0] hover:bg-[#f1f3f4] font-semibold text-[#3c4043] flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Test Completed Report */}
          {isFinished && (
            <div className="p-6 bg-white rounded-2xl border-2 border-[#137333] shadow-md space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-lg text-[#202124]">
                    Typing Test Scorecard: {wpm} WPM ({accuracy}% Accuracy)
                  </h4>
                  <p className="text-xs text-[#5f6368]">
                    {wpm >= 35 
                      ? '🎉 Outstanding! You qualify for HSSC & Court Typist speed standards (35+ WPM).' 
                      : '👍 Good attempt! Join our 2-Month Typing Master course at Dharam Futurebit to reach 45+ WPM.'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
                <div className="p-3 bg-[#f8fafd] rounded-xl border border-[#dadce0]">
                  <span className="text-[#80868b] block">Gross Speed</span>
                  <span className="font-bold text-lg text-[#1a73e8]">{wpm} WPM</span>
                </div>
                <div className="p-3 bg-[#f8fafd] rounded-xl border border-[#dadce0]">
                  <span className="text-[#80868b] block">Net Accuracy</span>
                  <span className="font-bold text-lg text-[#137333]">{accuracy}%</span>
                </div>
                <div className="p-3 bg-[#f8fafd] rounded-xl border border-[#dadce0]">
                  <span className="text-[#80868b] block">Total Errors</span>
                  <span className="font-bold text-lg text-[#c5221f]">{mistakes}</span>
                </div>
                <div className="p-3 bg-[#f8fafd] rounded-xl border border-[#dadce0]">
                  <span className="text-[#80868b] block">Govt Job Status</span>
                  <span className="font-bold text-sm text-[#137333]">
                    {wpm >= 35 ? 'ELIGIBLE' : 'PRACTICE MORE'}
                  </span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
