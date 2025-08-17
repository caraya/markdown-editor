// --- File System Utilities ---
export const openFile = async () => {
  const [handle] = await window.showOpenFilePicker({
    types: [{
      description: 'Markdown Files',
      accept: { 'text/markdown': ['.md'] },
    }],
  });
  const file = await handle.getFile();
  const content = await file.text();
  return { content, handle };
};

export const saveFile = async (fileHandle: FileSystemFileHandle, content: string) => {
  const writable = await fileHandle.createWritable();
  await writable.write(content);
  await writable.close();
};

export const saveFileAs = async (content: string) => {
  const handle = await window.showSaveFilePicker({
    types: [{
      description: 'Markdown Files',
      accept: { 'text/markdown': ['.md'] },
    }],
  });
  await saveFile(handle, content);
  return handle;
};
