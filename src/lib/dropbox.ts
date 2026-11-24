export function toDropboxImageUrl(input: string): string {
  const url = new URL(input.trim());
  if (url.protocol !== "https:" || !["www.dropbox.com", "dropbox.com", "dl.dropboxusercontent.com"].includes(url.hostname)) {
    throw new Error("Introduce un enlace HTTPS compartido de Dropbox válido.");
  }
  if (url.hostname === "dl.dropboxusercontent.com") return url.toString();
  url.searchParams.delete("dl");
  url.searchParams.set("raw", "1");
  return url.toString();
}
