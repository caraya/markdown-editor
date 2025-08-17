import React, { useEffect } from 'react';
import Prism from 'prismjs';

// Define the props interface for type safety
interface PreviewProps {
  html: string;
  previewRef: React.Ref<HTMLDivElement>;
  show: boolean;
  onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ html, previewRef, show, onClose }) => {
  // This effect runs whenever the `html` prop changes,
  // ensuring that new code blocks are highlighted.
  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

  const previewContainerStyles: React.CSSProperties = {
    height: '100%',
    backgroundColor: 'var(--surface-1)',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--size-3)',
    borderBottom: '1px solid var(--gray-3)',
    flexShrink: 0,
  };

  const titleStyles: React.CSSProperties = {
    fontSize: 'var(--font-size-4)',
    fontWeight: 'var(--font-weight-6)',
    margin: 0,
  };

  const contentContainerStyles: React.CSSProperties = {
    overflowY: 'auto',
    flexGrow: 1,
    padding: 'var(--size-fluid-4)',
  };

  return (
    <div style={previewContainerStyles}>
        <div style={headerStyles}>
            <h2 style={titleStyles}>Preview</h2>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  style={{ width: 'var(--size-5)', height: 'var(--size-5)' }} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div style={contentContainerStyles}>
          <div ref={previewRef} className="prose-content" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    </div>
  );
};

export default Preview;
