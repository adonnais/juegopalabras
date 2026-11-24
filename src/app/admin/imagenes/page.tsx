 "use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Pencil } from "lucide-react";
import type { GameImage } from "@/types/game";
import { deleteImage, listImages, newId, saveImage } from "@/lib/firebase/database";
import { toDropboxImageUrl } from "@/lib/dropbox";

export default function ImagesPage() {
  const [images, setImages] = useState<GameImage[]>([]);
  const [word, setWord] = useState("");
  const [dropboxUrl, setDropboxUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewError, setPreviewError] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [active, setActive] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  async function refresh() { setImages(await listImages()); }
  useEffect(() => { refresh().catch(e => setError(e.message)); }, []);

  function preview() {
    setError(""); setPreviewError("");
    try { setPreviewUrl(toDropboxImageUrl(dropboxUrl)); }
    catch (e) { setPreviewUrl(""); setError(e instanceof Error ? e.message : "Enlace inválido."); }
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(""); setNotice("");
    if (!word.trim()) { setError("Escribe la palabra."); return; }
    let imageUrl: string;
    try { imageUrl = toDropboxImageUrl(dropboxUrl); }
    catch (e) { setError(e instanceof Error ? e.message : "Enlace inválido."); return; }
    setBusy(true);
    try {
      const id = editing ?? await newId("images");
      const existing = images.find(item => item.id === id);
      await saveImage({ id, word: word.trim(), dropboxUrl: dropboxUrl.trim(), imageUrl, active, createdAt: existing?.createdAt ?? Date.now() });
      reset(); await refresh(); setNotice("Palabra guardada. Comprueba que la vista previa cargue correctamente.");
    } catch (e) { setError(e instanceof Error ? e.message : "No se pudo guardar la imagen."); }
    finally { setBusy(false); }
  }

  function reset() { setWord(""); setDropboxUrl(""); setPreviewUrl(""); setEditing(null); setActive(true); setPreviewError(""); }
  function edit(item: GameImage) { setEditing(item.id); setWord(item.word); setDropboxUrl(item.dropboxUrl); setPreviewUrl(item.imageUrl); setActive(item.active); window.scrollTo({ top: 0, behavior: "smooth" }); }

  async function remove(item: GameImage) {
    if (!window.confirm(`¿Eliminar la palabra "${item.word}"?`)) return;
    try { await deleteImage(item.id); await refresh(); setNotice("Registro eliminado."); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo eliminar."); }
  }

  async function toggle(item: GameImage) {
    try { await saveImage({ ...item, active: !item.active }); await refresh(); }
    catch (e) { setError(e instanceof Error ? e.message : "No se pudo actualizar."); }
  }

  return <main className="mx-auto max-w-5xl px-5 py-10">
    <h1 className="text-3xl font-black">Banco de imágenes</h1>
    <p className="mt-2 text-violet-100/60">Registra enlaces compartidos de Dropbox. Esta aplicación no carga ni almacena archivos.</p>
    <form onSubmit={submit} className="mt-7 space-y-4 rounded-2xl border border-violet-400/20 bg-violet-950/30 p-5">
      <h2 className="text-lg font-bold">{editing ? "Editar palabra" : "Agregar palabra"}</h2>
      <div><label className="mb-2 block text-sm text-violet-100/70">Palabra correcta</label><input required value={word} onChange={e => setWord(e.target.value)} className="w-full rounded-xl border border-violet-300/20 bg-black/30 px-4 py-3 outline-none focus:border-violet-400"/></div>
      <div><label className="mb-2 block text-sm text-violet-100/70">Enlace compartido de Dropbox</label><input required type="url" value={dropboxUrl} onChange={e => setDropboxUrl(e.target.value)} placeholder="https://www.dropbox.com/s/..." className="w-full rounded-xl border border-violet-300/20 bg-black/30 px-4 py-3 outline-none focus:border-violet-400"/></div>
      <div className="flex flex-wrap gap-3"><button type="button" onClick={preview} className="rounded-xl border border-violet-300/30 px-4 py-2 text-sm font-semibold hover:bg-violet-900/40">Generar vista previa</button><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={active} onChange={e => setActive(e.target.checked)}/>Activo</label></div>
      {previewUrl && <div className="max-w-md rounded-xl border border-violet-300/20 p-3"><img src={previewUrl} alt="Vista previa del enlace de Dropbox" onError={() => setPreviewError("Dropbox no permitió cargar esta imagen. Verifica que el enlace sea público y apunte a una imagen.")} className="max-h-64 w-full rounded-lg object-contain"/>{previewError && <p className="mt-2 text-sm text-red-300">{previewError}</p>}</div>}
      {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
      {notice && <p className="text-sm text-emerald-300">{notice}</p>}
      <div className="flex flex-wrap gap-2"><button disabled={busy} className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-bold disabled:opacity-50"><Plus size={17}/>{busy ? "Guardando..." : editing ? "Guardar cambios" : "Guardar palabra"}</button>{editing && <button type="button" onClick={reset} className="rounded-xl border border-violet-300/20 px-5 py-3">Cancelar</button>}</div>
    </form>
    <h2 className="mt-9 text-xl font-bold">Palabras registradas ({images.length})</h2>
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map(item => <article key={item.id} className="overflow-hidden rounded-2xl border border-violet-400/15 bg-white/[0.03]">
        <div className="grid h-40 place-items-center bg-black/30">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-contain"/> : <span className="text-sm text-violet-100/40">Sin vista previa</span>}</div>
        <div className="p-4"><div className="flex items-center justify-between gap-2"><p className="font-bold">{item.word}</p><span className={`text-xs ${item.active ? "text-emerald-300" : "text-zinc-400"}`}>{item.active ? "Activa" : "Inactiva"}</span></div><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => edit(item)} className="rounded-lg border border-violet-300/20 px-3 py-2 text-xs"><Pencil size={13} className="mr-1 inline"/>Editar</button><button onClick={() => toggle(item)} className="rounded-lg border border-violet-300/20 px-3 py-2 text-xs">{item.active ? "Desactivar" : "Activar"}</button><button onClick={() => remove(item)} className="rounded-lg border border-red-400/20 px-3 py-2 text-xs text-red-300"><Trash2 size={13} className="mr-1 inline"/>Eliminar</button></div></div>
      </article>)}
    </div>
  </main>;
}
