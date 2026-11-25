"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight, Trophy, Clock3, Image as ImageIcon } from "lucide-react";

type GameImage = {
  id: number;
  word: string;
  imageUrl?: string;
  emoji: string;
};

const INITIAL_IMAGES: GameImage[] = [
  { id: 1, word: "Correr", emoji: "🏃" },
  { id: 2, word: "Comer", emoji: "🍽️" },
  { id: 3, word: "Beber", emoji: "🥤" },
  { id: 4, word: "Dormir", emoji: "😴" },
  { id: 5, word: "Leer", emoji: "📖" },
  { id: 6, word: "Escribir", emoji: "✍️" },
  { id: 7, word: "Caminar", emoji: "🚶" },
  { id: 8, word: "Nadar", emoji: "🏊" },
  { id: 9, word: "Bailar", emoji: "💃" },
  { id: 10, word: "Cantar", emoji: "🎤" },
  { id: 11, word: "Cocinar", emoji: "👨‍🍳" },
  { id: 12, word: "Conducir", emoji: "🚗" },
  { id: 13, word: "Volar", emoji: "✈️" },
  { id: 14, word: "Saltar", emoji: "🦘" },
  { id: 15, word: "Reír", emoji: "😂" },
  { id: 16, word: "Llorar", emoji: "😢" },
  { id: 17, word: "Pensar", emoji: "🤔" },
  { id: 18, word: "Hablar", emoji: "🗣️" },
  { id: 19, word: "Escuchar", emoji: "👂" },
  { id: 20, word: "Mirar", emoji: "👀" },
  { id: 21, word: "Pintar", emoji: "🎨" },
  { id: 22, word: "Limpiar", emoji: "🧹" },
  { id: 23, word: "Trabajar", emoji: "💼" },
  { id: 24, word: "Estudiar", emoji: "🎓" },
  { id: 25, word: "Jugar", emoji: "🎮" },
  { id: 26, word: "Comprar", emoji: "🛒" },
  { id: 27, word: "Pagar", emoji: "💳" },
  { id: 28, word: "Viajar", emoji: "🧳" },
  { id: 29, word: "Fotografiar", emoji: "📸" },
  { id: 30, word: "Cortar", emoji: "✂️" },
  { id: 31, word: "Construir", emoji: "🏗️" },
  { id: 32, word: "Regar", emoji: "🚿" },
  { id: 33, word: "Plantar", emoji: "🌱" },
  { id: 34, word: "Pescar", emoji: "🎣" },
  { id: 35, word: "Escalar", emoji: "🧗" },
  { id: 36, word: "Esquiar", emoji: "⛷️" },
  { id: 37, word: "Surfear", emoji: "🏄" },
  { id: 38, word: "Boxear", emoji: "🥊" },
  { id: 39, word: "Meditar", emoji: "🧘" },
  { id: 40, word: "Abrazar", emoji: "🫂" },
  { id: 41, word: "Llamar", emoji: "📞" },
  { id: 42, word: "Enviar", emoji: "📨" },
  { id: 43, word: "Buscar", emoji: "🔍" },
  { id: 44, word: "Cerrar", emoji: "🔒" },
  { id: 45, word: "Abrir", emoji: "🔓" },
  { id: 46, word: "Encender", emoji: "💡" },
  { id: 47, word: "Bañarse", emoji: "🛁" },
  { id: 48, word: "Peinarse", emoji: "💇" },
  { id: 49, word: "Maquillarse", emoji: "💄" },
  { id: 50, word: "Celebrar", emoji: "🥳" },
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function normalizeAnswer(value: string) {
  return value
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function JuegoPage() {
  const shuffleImages = (items: GameImage[]) => {
    const shuffled = [...items];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const [images, setImages] = useState<GameImage[]>(INITIAL_IMAGES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(120);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  const [hintCount, setHintCount] = useState(0);
  const [answerInput, setAnswerInput] = useState("");

  useEffect(() => {
    setImages(shuffleImages(INITIAL_IMAGES));
  }, []);

  useEffect(() => {
    if (!isPlaying || isFinished || remainingSeconds <= 0) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying, isFinished, remainingSeconds]);

  useEffect(() => {
    if (remainingSeconds === 0 && !isFinished) {
      setIsPlaying(false);
      setIsFinished(true);
    }
  }, [remainingSeconds, isFinished]);

  const currentImage = images[currentIndex];
  const progress = useMemo(
    () => (images.length ? Math.round(((currentIndex + 1) / images.length) * 100) : 0),
    [currentIndex, images.length]
  );

  function advance(wasCorrect: boolean) {
    if (wasCorrect) setCorrect((value) => value + 1);
    else setIncorrect((value) => value + 1);

    setAnswerInput("");
    setHintCount(0);

    if (currentIndex + 1 >= images.length) {
      setIsPlaying(false);
      setIsFinished(true);
      return;
    }

    setCurrentIndex((value) => value + 1);
  }

  function checkAnswer() {
    if (!answerInput.trim() || !currentImage || !isPlaying || isFinished) return;

    const userAnswer = normalizeAnswer(answerInput);
    const correctAnswer = normalizeAnswer(currentImage.word);
    advance(userAnswer === correctAnswer);
  }

  function revealHint() {
    if (!currentImage || !isPlaying || isFinished) return;

    const totalLetters = Array.from(currentImage.word).filter((character) => character !== " ").length;
    setHintCount((count) => Math.min(count + 1, totalLetters));
  }

  function getHintDisplay(word: string, lettersToReveal: number) {
    let revealed = 0;

    return Array.from(word).map((character) => {
      if (character === " ") return " ";
      if (revealed < lettersToReveal) {
        revealed += 1;
        return character;
      }
      revealed += 1;
      return "_";
    }).join("");
  }

  function stopGame() {
    setIsPlaying(false);
    setIsFinished(true);
  }

  function restartGame() {
    setImages(shuffleImages(INITIAL_IMAGES));
    setCurrentIndex(0);
    setCorrect(0);
    setIncorrect(0);
    setRemainingSeconds(120);
    setHintCount(0);
    setAnswerInput("");
    setIsFinished(false);
    setIsPlaying(true);
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-3 py-5 text-[#171717] sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-4xl">
        <header className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-700">Juego por equipos</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">ADIVINA LA PALABRA</h1>
          </div>
          <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${isFinished ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {isFinished ? "Partida finalizada" : "En juego"}
          </span>
        </header>

        <section className="rounded-[1.6rem] border border-black/10 bg-white p-3 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-neutral-700">Equipo en turno</p>
              <p className="text-lg font-extrabold">Los Tigres</p>
            </div>
            <div className="rounded-xl bg-violet-50 px-3 py-2 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600">Imagen</p>
              <p className="text-sm font-bold text-violet-900">{Math.min(currentIndex + 1, images.length)} / {images.length}</p>
            </div>
          </div>

          <div className="mb-4 rounded-2xl bg-[#f1f1f1] px-4 py-4 text-center">
            <div className="mb-1 flex items-center justify-center gap-2 text-xs font-medium uppercase text-neutral-500">
              <Clock3 size={14} /> Tiempo restante
            </div>
            <div className="font-mono text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">{formatTime(remainingSeconds)}</div>
          </div>

          <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-[#ededed]">
            <div className="flex min-h-67.5 items-center justify-center bg-white sm:min-h-97.5">
              {currentImage?.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentImage.imageUrl} alt="Imagen para adivinar" className="h-full max-h-97.5 w-full object-contain" />
              ) : (
                <div className="flex min-h-67.5 w-full flex-col items-center justify-center gap-3 sm:min-h-97.5">
                  <span className="select-none text-[7rem] leading-none sm:text-[10rem]" role="img" aria-label="Imagen de ejemplo">{currentImage?.emoji ?? "❔"}</span>
                  <span className="text-xs font-medium text-neutral-400">Imagen de ejemplo</span>
                </div>
              )}
            </div>
          </div>

          <div className="py-4 text-center">
            <h2 className="text-2xl font-black sm:text-3xl">¿QUÉ ES?</h2>
            <p className="mt-2 text-sm text-neutral-500">Observa el emoji y adivina la palabra</p>
              <p>cantidad de letras:</p><p className="text-3xl text-center font-bold text-violet-900">{currentImage?.word.length}</p>
            
            {currentImage && hintCount > 0 && !isFinished && (
              <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <p className="text-xs font-bold uppercase tracking-wide text-amber-800">Pista · {hintCount} {hintCount === 1 ? "letra revelada" : "letras reveladas"}</p>
                <p className="mt-1 text-xl font-black tracking-[0.2em] text-amber-950">{getHintDisplay(currentImage.word, hintCount)}</p>
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              checkAnswer();
            }}
            className="mb-5 rounded-2xl border border-violet-200 bg-violet-50 p-4"
          >
            <label htmlFor="answerInput" className="mb-2 block text-left text-sm font-bold text-violet-900">
              Escribe tu respuesta

            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="answerInput"
                type="text"
                value={answerInput}
                onChange={(event) => setAnswerInput(event.target.value)}
                placeholder="¿Qué representa el emoji?"
                disabled={!isPlaying || isFinished}
                autoComplete="off"
                className="min-h-14 min-w-0 flex-1 rounded-xl border border-neutral-300 bg-white px-4 text-base font-semibold text-neutral-900 outline-none transition placeholder:font-normal placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 disabled:bg-neutral-100"
              />
              <button
                type="submit"
                disabled={!answerInput.trim() || !isPlaying || isFinished}
                className="min-h-14 rounded-xl bg-violet-700 px-6 py-3 font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                COMPROBAR
              </button>
            </div>
            <p className="mt-2 text-left text-xs text-violet-700">
              Escribe la palabra y presiona COMPROBAR o la tecla Enter. No importa si usas mayúsculas o tildes.
            </p>
          </form>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[#e1f1e7] px-3 py-4 text-center">
              <p className="text-4xl font-bold tabular-nums text-green-800">{correct}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-green-800/80">Acertadas</p>
            </div>
            <div className="rounded-2xl bg-[#f9e7e7] px-3 py-4 text-center">
              <p className="text-4xl font-bold tabular-nums text-red-800">{incorrect}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-red-800/80">No acertadas</p>
            </div>
          </div>

          {!isFinished && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => advance(true)} disabled={!isPlaying} className="flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-green-600 px-3 py-4 text-base font-bold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-50 sm:text-xl">
                  <Check size={22} strokeWidth={3} /> ACERTÓ
                </button>
                <button type="button" onClick={() => advance(false)} disabled={!isPlaying} className="flex min-h-16 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-3 py-4 text-base font-bold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-50 sm:text-xl">
                  SIGUIENTE <ChevronRight size={22} />
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={revealHint}
                  disabled={!isPlaying || !currentImage || hintCount >= Array.from(currentImage?.word ?? "").filter((character) => character !== " ").length}
                  className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-900 transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {currentImage && hintCount >= Array.from(currentImage.word).filter((character) => character !== " ").length ? "Todas las letras reveladas" : "Usar pista (+1 letra)"}
                </button>
                <button type="button" onClick={() => setIsPlaying((value) => !value)} className="rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200">
                  {isPlaying ? "Pausar tiempo" : "Reanudar tiempo"}
                </button>
              </div>

              <button type="button" onClick={stopGame} className="mt-3 flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-4 text-base font-bold text-white shadow-sm transition hover:bg-red-700 sm:text-xl">
                DETENER JUEGO
              </button>
            </>
          )}

          <p className="mt-5 text-center text-xs text-neutral-400">Partida de 2 minutos · Diseño adaptable a móviles y computadores</p>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <ImageIcon size={18} className="text-violet-700" />
            <h2 className="font-bold">Funcionamiento</h2>
          </div>
          <div className="divide-y divide-neutral-100 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Pistas</strong><span className="text-neutral-600">Cada vez que solicitas una pista se revela una letra de la palabra.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Respuesta</strong><span className="text-neutral-600">Escribe la palabra y presiona comprobar. Se aceptan diferencias de mayúsculas y tildes.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Acertó</strong><span className="text-neutral-600">Suma un acierto y muestra la siguiente imagen.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Siguiente</strong><span className="text-neutral-600">Pasa a otra imagen y cuenta como no acertada.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Detener</strong><span className="text-neutral-600">Detiene el cronómetro y finaliza la partida.</span></div>
          </div>
        </section>
      </div>

      {isFinished && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm" role="presentation">
          <section role="dialog" aria-modal="true" aria-labelledby="game-finished-title" className="w-full max-w-md rounded-3xl border border-violet-200 bg-white p-7 text-center shadow-2xl sm:p-9">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Trophy className="text-violet-700" size={34} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">Adivina la palabra</p>
            <h2 id="game-finished-title" className="mt-2 text-3xl font-black text-neutral-950">¡Tiempo terminado!</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">La partida ha finalizado. Estos son los resultados del equipo.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-green-50 p-4">
                <p className="text-3xl font-black tabular-nums text-green-700">{correct}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-800">Acertadas</p>
              </div>
              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-3xl font-black tabular-nums text-red-700">{incorrect}</p>
                <p className="mt-1 text-xs font-bold uppercase tracking-wide text-red-800">No acertadas</p>
              </div>
            </div>

            <button type="button" onClick={restartGame} className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-4 text-base font-bold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
              <ChevronRight size={20} /> COMENZAR DE NUEVO
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
