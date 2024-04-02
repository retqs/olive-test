import { database } from "const";

const protocolRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?/;

// function create a random alphanumeric code of fixed length or use UUID

export function shortenUrl(baseURL: string) {
  const length = 6;
  const protocolMatch = baseURL.match(protocolRegex);

  const protocol = protocolMatch && protocolMatch[0];

  if (protocolMatch && !protocolMatch[0]) {
    alert("Invalid input");
    // setError(true) or any other logic where we'd show error message to user on the page
    // for now it's just an example
    throw Error("Invalid URL, please refresh the page and enter a new one");
  }

  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  // save into database by this key or use UUID for shortetining
  let shortenedUrl = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    shortenedUrl += chars[randomIndex];
  }

  const finalShortenedUrl = `${protocol || "https://"}${shortenedUrl}`;

  database.set(shortenedUrl, finalShortenedUrl);

  return finalShortenedUrl;
}
