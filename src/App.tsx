import React, { useState, useRef, useEffect } from 'react';

// import utilities
import { exportToHtml, exportToMarkdown} from './utils/exportUtils.ts';
import { openFile, saveFile, saveFileAs } from './utils/fileSystem.ts';

// import React components
import Editor from './components/Editor.tsx';
import Preview from './components/Preview.tsx';
import Toolbar from './components/Toolbar.tsx';

// import markdown-it config
import md from './markdown-it.config.js';

// Main App component
const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello, Markdown!\n\nStart typing to see the magic happen.');
  const [html, setHtml] = useState<string>('');
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(true);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHtml(md.render(markdown));
  }, [markdown]);

  const handleOpen = async () => {
    try {
      const { content, handle } = await openFile();
      setMarkdown(content);
      setFileHandle(handle);
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Failed to open file:', error);
      }
    }
  };

  const handleSave = async () => {
    if (fileHandle) {
      await saveFile(fileHandle, markdown);
    } else {
      await handleSaveAs();
    }
  };

  const handleSaveAs = async () => {
    try {
      const handle = await saveFileAs(markdown);
      setFileHandle(handle);
    } catch (error) {
       if (error instanceof Error && error.name !== 'AbortError') {
        console.error('Failed to save file:', error);
      }
    }
  };

  const appStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: 'var(--gray-1)',
    color: 'var(--gray-8)',
    fontFamily: 'var(--font-sans)',
  };

  const mainStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr',
    flexGrow: 1,
    overflow: 'hidden', // This is crucial to contain the children
  };

  const editorPaneStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRight: showPreview ? '1px solid var(--gray-3)' : 'none',
    gridColumn: showPreview ? 'auto' : '1 / -1',
    overflow: 'hidden', // Prevents this pane from overflowing its grid cell
  };

  return (
    <div style={appStyles}>
      <main style={mainStyles}>
        {/* Editor Pane */}
        <div style={editorPaneStyles}>
          <header style={{ zIndex: 20, flexShrink: 0 }}>
            <Toolbar
              onOpen={handleOpen}
              onSave={handleSave}
              onSaveAs={handleSaveAs}
              onExportToHtml={() => exportToHtml(html)}
              onExportToMarkdown={() => exportToMarkdown(markdown)}
              onTogglePreview={() => setShowPreview(!showPreview)}
            />
          </header>
          <div style={{ flexGrow: 1, height: 0 }}>
             <Editor value={markdown} onChange={setMarkdown} />
          </div>
        </div>
        
        {/* Preview Pane */}
        {showPreview && (
          // This container also needs to prevent overflow
          <div style={{ backgroundColor: 'var(--surface-1)', overflow: 'hidden' }}>
              <Preview html={html} previewRef={previewRef} show={showPreview} onClose={() => setShowPreview(false)} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
