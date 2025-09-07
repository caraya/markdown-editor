import React, { forwardRef, CSSProperties } from 'react';

// Define the props for the component
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

// Wrap the component in React.forwardRef to accept a ref
const Editor = forwardRef<HTMLTextAreaElement, EditorProps>(({ value, onChange }, ref) => {
  const styles: { [key: string]: CSSProperties } = {
    textarea: {
      width: '100%',
      height: '100%',
      padding: 'var(--size-fluid-4)',
      border: 'none',
      backgroundColor: 'var(--surface-2)',
      color: 'var(--text-1)',
      fontSize: 'var(--font-size-2)',
      fontFamily: 'var(--font-mono)',
      resize: 'none',
      outline: 'none',
      overflowY: 'auto', // Add this for the inner scrollbar
      boxSizing: 'border-box', // Ensure padding is included in the height
    },
  };

  return (
    <textarea
      ref={ref}
      style={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your Markdown here..."
    />
  );
});

export default Editor;
