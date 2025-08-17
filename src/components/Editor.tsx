import React from 'react';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange }) => {
  const textareaStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    padding: 'var(--size-4)',
    border: 'none',
    resize: 'none',
    backgroundColor: 'var(--surface-1)',
    color: 'var(--text-1)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--font-size-2)',
    outline: 'none',
    overflowY: 'auto', // This ensures the textarea itself scrolls only when needed
  };

  return (
    <textarea
      style={textareaStyles}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your Markdown here..."
    />
  );
};

export default Editor;
