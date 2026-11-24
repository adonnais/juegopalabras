"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronRight,  Trophy, Clock3, Image as ImageIcon } 
from "lucide-react";

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
  { id: 29, word: "emojigrafiar", emoji: "📸" },
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
  { id: 51, word: "Despertar", emoji: "⏰" },
  { id: 52, word: "Soñar", emoji: "💭" },
  { id: 53, word: "Saludar", emoji: "👋" },
  { id: 54, word: "Aplaudir", emoji: "👏" },
  { id: 55, word: "Sonreír", emoji: "😊" },
  { id: 56, word: "Besar", emoji: "😘" },
  { id: 57, word: "Amar", emoji: "❤️" },
  { id: 58, word: "Odiar", emoji: "😠" },
  { id: 59, word: "Temer", emoji: "😨" },
  { id: 60, word: "Esperar", emoji: "⏳" },
  { id: 61, word: "Recordar", emoji: "🧠" },
  { id: 62, word: "Olvidar", emoji: "🤷" },
  { id: 63, word: "Aprender", emoji: "📚" },
  { id: 64, word: "Enseñar", emoji: "👩‍🏫" },
  { id: 65, word: "Preguntar", emoji: "❓" },
  { id: 66, word: "Responder", emoji: "💬" },
  { id: 67, word: "Explicar", emoji: "📊" },
  { id: 68, word: "Discutir", emoji: "🗯️" },
  { id: 69, word: "Acordar", emoji: "🤝" },
  { id: 70, word: "Prometer", emoji: "🤞" },
  { id: 71, word: "Mentir", emoji: "🤥" },
  { id: 72, word: "Creer", emoji: "🙏" },
  { id: 73, word: "Dudar", emoji: "🤨" },
  { id: 74, word: "Decidir", emoji: "⚖️" },
  { id: 75, word: "Elegir", emoji: "🗳️" },
  { id: 76, word: "Ganar", emoji: "🏆" },
  { id: 77, word: "Perder", emoji: "📉" },
  { id: 78, word: "Competir", emoji: "🏅" },
  { id: 79, word: "Entrenar", emoji: "🏋️" },
  { id: 80, word: "Estirar", emoji: "🤸" },
  { id: 81, word: "Descansar", emoji: "🛋️" },
  { id: 82, word: "Relajarse", emoji: "🧖" },
  { id: 83, word: "Respirar", emoji: "🌬️" },
  { id: 84, word: "Toser", emoji: "🤧" },
  { id: 85, word: "Estornudar", emoji: "🤒" },
  { id: 86, word: "Curar", emoji: "🩺" },
  { id: 87, word: "Operar", emoji: "🏥" },
  { id: 88, word: "Inyectar", emoji: "💉" },
  { id: 89, word: "Medir", emoji: "📏" },
  { id: 90, word: "Pesar", emoji: "⚖️" },
  { id: 91, word: "Calcular", emoji: "🧮" },
  { id: 92, word: "Programar", emoji: "💻" },
  { id: 93, word: "Guardar", emoji: "💾" },
  { id: 94, word: "Descargar", emoji: "⬇️" },
  { id: 95, word: "Subir", emoji: "⬆️" },
  { id: 96, word: "Conectar", emoji: "🔌" },
  { id: 97, word: "Cargar", emoji: "🔋" },
  { id: 98, word: "Apagar", emoji: "📴" },
  { id: 99, word: "Grabar", emoji: "🎥" },
  { id: 100, word: "Escuchar música", emoji: "🎧" },
  { id: 101, word: "Tocar", emoji: "🎸" },
  { id: 102, word: "Actuar", emoji: "🎭" },
  { id: 103, word: "Dibujar", emoji: "✏️" },
  { id: 104, word: "Colorear", emoji: "🖍️" },
  { id: 105, word: "Pegar", emoji: "🩹" },
  { id: 106, word: "Doblar", emoji: "📄" },
  { id: 107, word: "Romper", emoji: "💔" },
  { id: 108, word: "Reparar", emoji: "🔧" },
  { id: 109, word: "Martillar", emoji: "🔨" },
  { id: 110, word: "Atornillar", emoji: "🪛" },
  { id: 111, word: "Pintar pared", emoji: "🖌️" },
  { id: 112, word: "Barrer", emoji: "🧹" },
  { id: 113, word: "Trapear", emoji: "🧽" },
  { id: 114, word: "Lavar", emoji: "🧼" },
  { id: 115, word: "Secar", emoji: "🧺" },
  { id: 116, word: "Planchar", emoji: "👔" },
  { id: 117, word: "Vestirse", emoji: "👗" },
  { id: 118, word: "Desvestirse", emoji: "👙" },
  { id: 119, word: "Calzarse", emoji: "👟" },
  { id: 120, word: "Afeitarse", emoji: "🪒" },
  { id: 121, word: "Cepillarse", emoji: "🪥" },
  { id: 122, word: "Oler", emoji: "👃" },
  { id: 123, word: "Saborear", emoji: "👅" },
  { id: 124, word: "Masticar", emoji: "🦷" },
  { id: 125, word: "Tragar", emoji: "🤤" },
  { id: 126, word: "Brindar", emoji: "🥂" },
  { id: 127, word: "Hornear", emoji: "🧁" },
  { id: 128, word: "Freír", emoji: "🍳" },
  { id: 129, word: "Hervir", emoji: "🍲" },
  { id: 130, word: "Pelar", emoji: "🍌" },
  { id: 131, word: "Exprimir", emoji: "🍋" },
  { id: 132, word: "Mezclar", emoji: "🥣" },
  { id: 133, word: "Servir", emoji: "🍽️" },
  { id: 134, word: "Compartir", emoji: "🍕" },
  { id: 135, word: "Invitar", emoji: "🎟️" },
  { id: 136, word: "Regalar", emoji: "🎁" },
  { id: 137, word: "Agradecer", emoji: "🙌" },
  { id: 138, word: "Disculparse", emoji: "🙇" },
  { id: 139, word: "Perdonar", emoji: "🕊️" },
  { id: 140, word: "Ayudar", emoji: "🆘" },
  { id: 141, word: "Proteger", emoji: "🛡️" },
  { id: 142, word: "Cuidar", emoji: "🐾" },
  { id: 143, word: "Pasear", emoji: "🦮" },
  { id: 144, word: "Montar", emoji: "🐎" },
  { id: 145, word: "Remar", emoji: "🚣" },
  { id: 146, word: "Navegar", emoji: "⛵" },
  { id: 147, word: "Acampar", emoji: "⛺" },
  { id: 148, word: "Explorar", emoji: "🧭" },
  { id: 149, word: "Descubrir", emoji: "🗺️" },
  { id: 150, word: "Imaginar", emoji: "🌌" }
];

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function JuegoPage() {
  // Baraja las palabras para que cada partida tenga un orden diferente.
  // Fisher-Yates garantiza una mezcla uniforme y evita repetir elementos
  // mientras se recorre la lista.
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
  const [showAnswer, setShowAnswer] = useState(false);
  const [emojiSecondsRemaining, setEmojiSecondsRemaining] = useState(15);

  // Mezcla la lista al cargar el juego.
  useEffect(() => {
    setImages(shuffleImages(INITIAL_IMAGES));
  }, []);

  // Temporizador general de 2 minutos y temporizador individual de 15 segundos.
  // Al terminar los 15 segundos se revela automáticamente el nombre del emoji.
  useEffect(() => {
    if (!isPlaying || isFinished || remainingSeconds <= 0) return;

    const interval = window.setInterval(() => {
      setRemainingSeconds((seconds) => Math.max(0, seconds - 1));

      setEmojiSecondsRemaining((seconds) => {
        if (seconds <= 1) {
          setShowAnswer(true);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isPlaying, isFinished, remainingSeconds]);

  // Finaliza automáticamente cuando el contador llega a cero.
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

    setShowAnswer(false);
    setEmojiSecondsRemaining(15);
    if (currentIndex + 1 >= images.length) {
      setIsPlaying(false);
      setIsFinished(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
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
    setShowAnswer(false);
    setEmojiSecondsRemaining(15);
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
            <div className="flex min-h-[270px] items-center justify-center bg-white sm:min-h-[390px]">
              {currentImage?.imageUrl ? (
                // Las URLs pueden venir de Dropbox o de Firebase Realtime Database.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={currentImage.imageUrl} alt="Imagen para adivinar" className="h-full max-h-[390px] w-full object-contain" />
              ) : (
                <div className="flex min-h-[270px] w-full flex-col items-center justify-center gap-3 sm:min-h-[390px]">
                  <span className="select-none text-[7rem] leading-none sm:text-[10rem]" role="img" aria-label="Imagen de ejemplo">{currentImage?.emoji ?? "❔"}</span>
                  <span className="text-xs font-medium text-neutral-400">Imagen de ejemplo</span>
                </div>
              )}
            </div>
          </div>

          <div className="py-4 text-center">
            <h2 className="text-2xl font-black sm:text-3xl">¿QUÉ ES?</h2>
            <p className="mt-2 text-sm text-neutral-500">Observa el emoji y adivina la palabra</p>
            {!showAnswer && !isFinished && (
              <p className="mt-2 inline-flex rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-800">
                La respuesta se mostrará en {emojiSecondsRemaining} {emojiSecondsRemaining === 1 ? "segundo" : "segundos"}
              </p>
            )}
            {showAnswer && currentImage && (
              <p className="mt-3 inline-flex rounded-full bg-violet-100 px-4 py-2 text-sm font-bold text-violet-800">Respuesta: {currentImage.word}</p>
            )}
          </div>

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

          {!isFinished ? (
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
                <button type="button" onClick={() => setShowAnswer((value) => !value)} className="rounded-xl border border-violet-200 bg-violet-50 px-3 py-3 text-sm font-semibold text-violet-800 transition hover:bg-violet-100">
                  {showAnswer ? "Ocultar respuesta" : "Ver respuesta"}
                </button>
                <button type="button" onClick={() => setIsPlaying((value) => !value)} className="rounded-xl border border-neutral-200 bg-neutral-100 px-3 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200">
                  {isPlaying ? "Pausar tiempo" : "Reanudar tiempo"}
                </button>
              </div>

              <button type="button" onClick={stopGame} className="mt-3 flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-4 text-base font-bold text-white shadow-sm transition hover:bg-red-700 sm:text-xl">
                 DETENER JUEGO
              </button>
            </>
          ) : null}

          <p className="mt-5 text-center text-xs text-neutral-400">Partida de 2 minutos · Diseño adaptable a móviles y computadores</p>
        </section>

        <section className="mt-5 rounded-2xl border border-black/10 bg-white p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-2">
            <ImageIcon size={18} className="text-violet-700" />
            <h2 className="font-bold">Funcionamiento</h2>
          </div>
          <div className="divide-y divide-neutral-100 text-sm">
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Emoji</strong><span className="text-neutral-600">Se muestra durante 15 segundos; después aparece automáticamente el nombre.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Acertó</strong><span className="text-neutral-600">Suma un acierto y muestra la siguiente imagen.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Siguiente</strong><span className="text-neutral-600">Pasa a otra imagen sin sumar un acierto; cuenta como no acertada.</span></div>
            <div className="grid grid-cols-[100px_1fr] gap-3 py-3 sm:grid-cols-[130px_1fr]"><strong>Detener</strong><span className="text-neutral-600">Detiene el cronómetro y finaliza la partida.</span></div>
          </div>
        </section>
      </div>

      {isFinished && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 px-4 py-6 backdrop-blur-sm"
          role="presentation"
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="game-finished-title"
            className="w-full max-w-md rounded-3xl border border-violet-200 bg-white p-7 text-center shadow-2xl sm:p-9"
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-100">
              <Trophy className="text-violet-700" size={34} />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Adivina la palabra
            </p>
            <h2 id="game-finished-title" className="mt-2 text-3xl font-black text-neutral-950">
              ¡Tiempo terminado!
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              La partida ha finalizado. Estos son los resultados del equipo.
            </p>

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

            <button
              type="button"
              onClick={restartGame}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-4 text-base font-bold text-white shadow-lg shadow-violet-900/20 transition hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              <ChevronRight size={20} />
              COMENZAR DE NUEVO
            </button>
          </section>
        </div>
      )}
    </main>
  );
}
