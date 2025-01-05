import React, { useState } from 'react';

const PasteExample = () => {
  const [text, setText] = useState('');

  const paste = () => {
    navigator.clipboard.readText().then(setText); // Directly set clipboard text to state
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here"/>
      <button onClick={paste}>Paste</button>
    </div>
  );
};

export default PasteExample;
  