import React, { useEffect, CSSProperties } from 'react';

// Define the props interface for the component
interface PreviewProps {
  html: string;
  // Allow the ref to be null to match the type from the parent component
  previewRef: React.RefObject<HTMLDivElement | null>;
}

// Augment the Window interface for the global Prism object
declare global {
  interface Window {
    Prism: any;
  }
}

const Preview: React.FC<PreviewProps> = ({ html, previewRef }) => {
  useEffect(() => {
    if (window.Prism) {
      window.Prism.highlightAll();
    }
  }, [html]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Preview</h2>
      </div>
      <div
        ref={previewRef}
        className="prose-content"
        style={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

// --- Styles using Open Props ---
type StyleSheet = {
  [key: string]: CSSProperties;
};

const styles: StyleSheet = {
  container: {
    height: '100%',
    backgroundColor: 'var(--surface-2)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: 'var(--size-3)',
    borderBottom: 'var(--border-size-1) solid var(--surface-3)',
    flexShrink: 0,
  },
  title: {
    fontSize: 'var(--font-size-4)',
    fontWeight: 'var(--font-weight-6)',
    margin: 0,
  },
  content: {
    padding: 'var(--size-fluid-4)',
    overflowY: 'auto',
    flexGrow: 1,
  },
};

export default Preview;
