import { useState, ChangeEvent } from "react";
import { v4 } from "uuid";

import { database } from "const";
import { shortenUrl, copyToClipboard } from "utils";

// const URL1 = "https://otp24.privatbank.ua/#!/login?endSession&go_to=#main";
// const URL2 =
//   "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID";

function App() {
  const [urlQuery, setUrlQuery] = useState<string>("");
  // in order for link to redirect to the desired page
  // we need to use simple URL redirect via HTTP headers
  const [simplifiedResult, setSimplifiedResult] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const value = target.value;

    setUrlQuery(value);
  };

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // just for the idea, here we're saving by unique id in order to get this url in future
    const id = v4();

    const shortURL = shortenUrl(urlQuery);
    // temp database, use mongo or firebase, basically your API
    database.set(id, shortURL);
    setSimplifiedResult(shortURL);
    setUrlQuery("");
  };

  const handleCopyResult = () => {
    // show toastify or any other UI library
    alert("Content copied to clipboard");
    copyToClipboard(simplifiedResult);
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col bg-slate-200">
      <h1 className="text-2xl pb-5">URL Simplifier</h1>
      {/* This should be reusable form, but for the simplisity just leave it like that */}
      <form className="min-w-[370px] mb-5" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col">
          <label htmlFor="url" className="cursor-pointer mb-3">
            Enter your URL:
          </label>
          <input
            onChange={handleInputChange}
            value={urlQuery}
            id="url"
            type="text"
            className="outline-none p-2 rounded-lg"
            required
          />
        </fieldset>
        <button
          type="submit"
          className="mt-5 bg-black text-white rounded-lg p-2 px-5 block ml-auto hover:bg-slate-700"
        >
          Simplify
        </button>
      </form>

      {simplifiedResult && (
        <div className="flex items-center">
          <p className="mr-5">{simplifiedResult}</p>
          <button
            type="button"
            onClick={() => handleCopyResult()}
            className="bg-black text-white rounded-lg p-2 px-5 block ml-auto hover:bg-slate-700"
          >
            Copy URL
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
