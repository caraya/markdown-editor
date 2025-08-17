import React, { useState, useEffect, useRef } from 'react';

// Define the props interface for type safety
interface ToolbarProps {
  onOpen: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onExportToPdf: () => void;
  onExportToHtml: () => void;
  onExportToMarkdown: () => void;
  onTogglePreview: () => void;
}

// A placeholder for the future style toolbar
const StyleToolbar = () => {
  const style: React.CSSProperties = {
    padding: 'var(--size-2)',
    backgroundColor: 'var(--gray-2)',
    borderTop: '1px solid var(--gray-3)',
    textAlign: 'center',
    color: 'var(--gray-5)',
  };
  return (
    <div style={style}>
      <p style={{ margin: 0, fontSize: 'var(--font-size-0)' }}>Style Toolbar Placeholder</p>
    </div>
  );
};

const Toolbar: React.FC<ToolbarProps> = ({
  onOpen,
  onSave,
  onSaveAs,
  onExportToPdf,
  onExportToHtml,
  onExportToMarkdown,
  onTogglePreview,
}) => {
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Effect to handle clicks outside of the menus to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setFileMenuOpen(false);
      }
      if (exportMenuRef.current && !exportMenuRef.current.contains(event.target as Node)) {
        setExportMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toolbarStyles: React.CSSProperties = {
    backgroundColor: 'var(--surface-1)',
    boxShadow: 'var(--shadow-2)',
  };

  const mainToolbarStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--size-2)',
  };

  const menuButtonStyles: React.CSSProperties = {
    padding: 'var(--size-2) var(--size-3)',
    fontSize: 'var(--font-size-1)',
    borderRadius: 'var(--radius-2)',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
  };

  const dropdownMenuStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    marginTop: 'var(--size-2)',
    width: '160px',
    backgroundColor: 'var(--surface-1)',
    borderRadius: 'var(--radius-2)',
    boxShadow: 'var(--shadow-3)',
    zIndex: 9999, // Increased z-index
    padding: 'var(--size-2)',
  };

  const menuItemStyles: React.CSSProperties = {
    display: 'block',
    width: '100%',
    padding: 'var(--size-2)',
    textAlign: 'left',
    fontSize: 'var(--font-size-1)',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-2)',
    cursor: 'pointer',
  };

  return (
    <div style={toolbarStyles}>
      {/* Main Toolbar for File/Export Actions */}
      <div style={mainToolbarStyles}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-2)' }}>
          {/* File Dropdown */}
          <div style={{ position: 'relative' }} ref={fileMenuRef}>
            <button style={menuButtonStyles} onClick={() => setFileMenuOpen(!fileMenuOpen)}>File</button>
            {fileMenuOpen && (
              <div style={dropdownMenuStyles}>
                <button style={menuItemStyles} onClick={() => { onOpen(); setFileMenuOpen(false); }}>Open</button>
                <button style={menuItemStyles} onClick={() => { onSave(); setFileMenuOpen(false); }}>Save</button>
                <button style={menuItemStyles} onClick={() => { onSaveAs(); setFileMenuOpen(false); }}>Save As</button>
              </div>
            )}
          </div>
          {/* Export Dropdown */}
          <div style={{ position: 'relative' }} ref={exportMenuRef}>
            <button style={menuButtonStyles} onClick={() => setExportMenuOpen(!exportMenuOpen)}>Export</button>
            {exportMenuOpen && (
              <div style={dropdownMenuStyles}>
                <button style={menuItemStyles} onClick={() => { onExportToPdf(); setExportMenuOpen(false); }}>PDF</button>
                <button style={menuItemStyles} onClick={() => { onExportToHtml(); setExportMenuOpen(false); }}>HTML</button>
                <button style={menuItemStyles} onClick={() => { onExportToMarkdown(); setExportMenuOpen(false); }}>Markdown</button>
              </div>
            )}
          </div>
        </div>
        <h1 style={{ fontSize: 'var(--font-size-4)', margin: 0 }}>Markdown Editor</h1>
        <button style={menuButtonStyles} onClick={onTogglePreview}>
          Preview
        </button>
      </div>
      {/* Child Toolbar for Styling */}
      <StyleToolbar />
    </div>
  );
};

export default Toolbar;
