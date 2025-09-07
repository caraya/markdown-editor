/// <reference types="vite/client" />

interface Window {
  showOpenFilePicker(options?: any): Promise<any[]>;
  showSaveFilePicker(options?: any): Promise<any>;
}

// This adds the File System Access API types to the window object
interface FileSystemHandle {
  kind: 'file' | 'directory';
  name: string;
  isSameEntry(other: FileSystemHandle): Promise<boolean>;
}

interface FileSystemFileHandle extends FileSystemHandle {
  kind: 'file';
  getFile(): Promise<File>;
  createWritable(options?: FileSystemCreateWritableOptions): Promise<FileSystemWritableFileStream>;
}