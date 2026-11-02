"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { aiService, ChatMessage } from "@/lib/aiService";

const suggested = [
  "Who is Shivam?",
  "What projects has he developed?",
  "What technologies does he use?",
  "Tell me about NYRA AI.",
  "How can I contact Shivam?",
];

export default function ShivamAI() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! I'm SHIVAM AI. Ask me about Shivam's portfolio." },
  ]);
  const [typing, setTyping] = useState(false);
  const [lang, setLang] = useState<"en-US" | "hi-IN">("en-US");
  const [muted, setMuted] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const speak = (text: string) => {
    if (muted || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const send = async (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    const next: ChatMessage[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setTyping(true);
    try {
      const reply = await aiService.generateResponse(next);
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      speak(reply);
    } finally {
      setTyping(false);
    }
  };

  const startListening = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = false;
    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
      setListening(false);
    };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    setListening(true);
    rec.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Conversation cleared. How can I help?" }]);
    if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white shadow-lg hover:scale-110 transition flex items-center justify-center"
        aria-label="Open SHIVAM AI"
      >
        <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
          AI
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[92vw] glass rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-display font-semibold">SHIVAM AI</span>
              <div className="flex items-center gap-2 text-xs">
                <button onClick={() => setLang(lang === "en-US" ? "hi-IN" : "en-US")} className="px-2 py-1 rounded bg-white/10">
                  {lang === "en-US" ? "EN" : "HI"}
                </button>
                <button onClick={() => setMuted(!muted)} className="px-2 py-1 rounded bg-white/10">
                  {muted ? "Muted" : "Sound"}
                </button>
                <button onClick={clearChat} className="px-2 py-1 rounded bg-white/10">
                  Clear
                </button>
              </div>
            </div>
            <div ref={scrollRef} className="h-72 overflow-y-auto p-4 space-y-3 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                  <span className={`inline-block px-3 py-2 rounded-xl ${m.role === "user" ? "bg-white/10" : "bg-accent/20"}`}>
                    {m.content}
                  </span>
                </div>
              ))}
              {typing && (
                <div className="text-left">
                  <span className="inline-block px-3 py-2 rounded-xl bg-accent/20">
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:0.15s]" />
                      <span className="w-1.5 h-1.5 bg-white/70 rounded-full animate-bounce [animation-delay:0.3s]" />
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-white/10 flex flex-wrap gap-2">
              {suggested.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-xs px-2 py-1 rounded-full glass hover:bg-white/10 transition">
                  {s}
                </button>
              ))}
            </div>
            <div className="p-3 flex gap-2 border-t border-white/10">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask something..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
              <button
                onClick={listening ? stopListening : startListening}
                className={`text-sm px-2 ${listening ? "text-red-400" : "text-muted"}`}
                aria-label="Voice input"
              >
                {listening ? "Stop" : "Mic"}
              </button>
              <button onClick={() => send()} className="text-accent text-sm font-medium">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
