import React, { CSSProperties } from 'react';

// Define the props interface for the component
interface StyleToolbarProps {
  onStyleChange: (style: string) => void;
}

// Type the props directly on the component function
const StyleToolbar = ({ onStyleChange }: StyleToolbarProps) => {
  const styles: { [key: string]: CSSProperties } = {
    toolbar: {
      padding: 'var(--size-2)',
      borderBottom: 'var(--border-size-1) solid var(--surface-3)',
      backgroundColor: 'var(--surface-2)',
      display: 'flex',
      gap: 'var(--size-2)',
      flexWrap: 'wrap',
      flexShrink: 0,
    },
    button: {
      background: 'none',
      border: 'var(--border-size-1) solid var(--surface-4)',
      color: 'var(--text-2)',
      padding: 'var(--size-2) var(--size-3)',
      borderRadius: 'var(--radius-2)',
      cursor: 'pointer',
      fontSize: 'var(--font-size-1)',
      fontWeight: 'var(--font-weight-6)',
    },
  };

  return (
    <div style={styles.toolbar}>
      <button style={styles.button} onClick={() => onStyleChange('bold')}>B</button>
      <button style={styles.button} onClick={() => onStyleChange('italic')}>I</button>
      <button style={styles.button} onClick={() => onStyleChange('heading')}>H1</button>
      <button style={styles.button} onClick={() => onStyleChange('link')}>Link</button>
      <button style={styles.button} onClick={() => onStyleChange('code')}>Code</button>
    </div>
  );
};

export default StyleToolbar;

