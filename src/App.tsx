import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { exportToHtml, exportToMarkdown } from './utils/exportUtils';
import { openFile, saveFile, saveFileAs } from './utils/fileSystem';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import StyleToolbar from './components/StyleToolbar';
import md from './markdown-it.config';

// --- Type Definitions ---
interface FileSystemFileHandle {
  createWritable(): Promise<any>;
  getFile(): Promise<File>;
  kind: 'file';
  name: string;
  isSameEntry(other: FileSystemFileHandle): Promise<boolean>;
}

type StyleSheet = {
  [key: string]: CSSProperties;
};

// --- Main App Component ---
const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>('# Hello, Markdown!\n\nStart typing to see the magic happen.');
  const [html, setHtml] = useState<string>('');
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null);
  const [showPreview, setShowPreview] = useState<boolean>(false); // Default to hidden
  const previewRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // State for responsive layout
  const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 1024px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    setHtml(md.render(markdown));
  }, [markdown]);

  // --- File Handlers ---
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

  // --- Style Application Logic ---
  const applyStyle = (syntax: { prefix: string; suffix: string; placeholder: string }) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end);

    let newText;
    if (selectedText) {
      newText = `${syntax.prefix}${selectedText}${syntax.suffix}`;
    } else {
      newText = `${syntax.prefix}${syntax.placeholder}${syntax.suffix}`;
    }

    const updatedMarkdown = `${markdown.substring(0, start)}${newText}${markdown.substring(end)}`;
    setMarkdown(updatedMarkdown);

    setTimeout(() => {
      textarea.focus();
      if (selectedText) {
        textarea.setSelectionRange(start + newText.length, start + newText.length);
      } else {
        textarea.setSelectionRange(start + syntax.prefix.length, start + syntax.prefix.length + syntax.placeholder.length);
      }
    }, 0);
  };

  const handleStyleChange = (style: string) => {
    const styles: { [key: string]: any } = {
      bold: { prefix: '**', suffix: '**', placeholder: 'bold text' },
      italic: { prefix: '*', suffix: '*', placeholder: 'italic text' },
      heading: { prefix: '# ', suffix: '', placeholder: 'Heading' },
      link: { prefix: '[', suffix: '](url)', placeholder: 'link text' },
      code: { prefix: '`', suffix: '`', placeholder: 'code' },
    };
    applyStyle(styles[style]);
  };

  // --- Dynamic Styles for Layout ---
  const mainContentStyle: CSSProperties = {
    ...styles.mainContent,
    width: isDesktop ? '80vw' : '100%',
    flexDirection: isDesktop ? 'row' : 'column',
  };

  return (
    <div style={styles.appContainer}>
      <main style={mainContentStyle}>
        <div style={styles.editorPane}>
          <Toolbar
            onOpen={handleOpen}
            onSave={handleSave}
            onSaveAs={handleSaveAs}
            onExportToHtml={() => exportToHtml(html)}
            onExportToMarkdown={() => exportToMarkdown(markdown)}
            onTogglePreview={() => setShowPreview(!showPreview)}
          />
          <StyleToolbar onStyleChange={handleStyleChange} />
          <div style={styles.editorWrapper}>
            <Editor ref={editorRef} value={markdown} onChange={setMarkdown} />
          </div>
        </div>

        {showPreview && (
          <div style={styles.previewPane}>
            <Preview html={html} previewRef={previewRef} />
          </div>
        )}
      </main>
    </div>
  );
};

// --- Styles using Open Props (Now with Flexbox) ---
const styles: StyleSheet = {
  appContainer: {
    height: '100vh',
    maxHeight: '100vh',
    backgroundColor: 'var(--surface-1)',
    color: 'var(--text-1)',
    display: 'flex',
    justifyContent: 'center',
    paddingInline: 'var(--size-4)',
    boxSizing: 'border-box',
  },
  mainContent: {
    height: '100%',
    maxWidth: '1600px',
    display: 'flex',
    gap: 'var(--size-4)',
  },
  editorPane: {
    display: 'flex',
    flexDirection: 'column',
    border: 'var(--border-size-1) solid var(--surface-3)',
    borderRadius: 'var(--radius-2)',
    flex: '1 1 0',
    minWidth: 0,
    minHeight: 0,
    overflowY: 'auto'
  },
  previewPane: {
    display: 'flex',
    flexDirection: 'column',
    border: 'var(--border-size-1) solid var(--surface-3)',
    borderRadius: 'var(--radius-2)',
    flex: '1 1 0',
    minWidth: 0,
    minHeight: 0,
  },
  editorWrapper: {
    flexGrow: 1,
    position: 'relative',
  },
};

export default App;
