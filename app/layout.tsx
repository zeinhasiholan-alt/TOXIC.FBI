"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<{
    toxic: boolean;
    score: number;
    label: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeToxicity = async () => {
    if (!input.trim()) return;
    setLoading(true);

    const toxicWords = [
      "bodoh", "stupid", "idiot", "anjing", "bangsat",
      "kontol", "hell", "damn", "sucks", "hate", "jelek",
      "goblok", "tolol", "kampret", "brengsek", "setan"
    ];

    const words = input.toLowerCase().split(/\s+/);
    const toxicCount = words.filter((w) =>
      toxicWords.some((tw) => w.includes(tw))
    ).length;

    const score = Math.min((toxicCount / words.length) * 100, 100);
    const isToxic = score > 30;

    setTimeout(() => {
      setResult({
        toxic: isToxic,
        score: Math.round(score),
        label: isToxic
          ? score > 70
            ? "Sangat Toxic ⚠️"
            : "Cukup Toxic ⚡"
          : "Aman ✅",
      });
      setLoading(false);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-olive-900 via-green-800 to-emerald-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🤖 Toxic AI Detector
          </h1>
          <p className="text-green-200">
            Deteksi teks toxic secara instan dengan AI
          </p>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tempel teks di sini untuk dianalisis..."
          className="w-full h-40 p-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none mb-4"
        />

        <button
          onClick={analyzeToxicity}
          disabled={loading || !input.trim()}
          className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? "🔄 Menganalisis..." : "🔍 Analisis Sekarang"}
        </button>

        {result && (
          <div
            className={`mt-6 p-6 rounded-xl border-2 ${
              result.toxic
                ? "bg-red-500/20 border-red-400"
                : "bg-green-500/20 border-green-400"
            }`}
          >
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                {result.label}
              </p>
              <div className="w-full bg-white/20 rounded-full h-4 mb-2">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${
                    result.score > 70
                      ? "bg-red-500"
                      : result.score > 30
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
              <p className="text-green-200">
                Skor Toxicity: <span className="font-bold">{result.score}%</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-green-300 text-sm">
          <p>Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS</p>
        </div>
      </div>
    </main>
  );
    }
