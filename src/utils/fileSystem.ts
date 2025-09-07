// Note: FileSystemFileHandle is a global type defined in vite-env.d.ts
// and does not need to be imported.

export const openFile = async (): Promise<{ content: string; handle: FileSystemFileHandle }> => {
  const [handle] = await window.showOpenFilePicker({
    types: [{
      description: 'Markdown Files',
      accept: { 'text/markdown': ['.md', '.markdown'] },
    }],
  });
  const file = await handle.getFile();
  const content = await file.text();
  return { content, handle };
};

export const saveFile = async (fileHandle: FileSystemFileHandle, content: string): Promise<void> => {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const saveFileAs = async (content: string): Promise<FileSystemFileHandle> => {
  const handle = await window.showSaveFilePicker({
    types: [{
      description: 'Markdown Files',
      accept: { 'text/markdown': ['.md', '.markdown'] },
    }],
  });
  await saveFile(handle, content);
  return handle;
};
