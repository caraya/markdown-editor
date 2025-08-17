/// <reference types="vite/client" />

interface Window {
  showOpenFilePicker(options?: any): Promise<any[]>;
  showSaveFilePicker(options?: any): Promise<any>;
}