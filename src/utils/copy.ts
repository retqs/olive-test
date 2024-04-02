export const copyToClipboard = (value: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    navigator.clipboard.writeText(value);
  } else {
    unsecuredCopyToClipboard(value);
  }
};

const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus({ preventScroll: true });
  textArea.select();
  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Unable to copy to clipboard", err);
  }
  document.body.removeChild(textArea);
};
