const Controls = ({ onOpen, onSave, onSaveAs, onExportToPdf, onExportToHtml, onExportToMarkdown, onTogglePreview }) => {
  return (
    <div className="flex items-center space-x-2">
      <button onClick={onOpen} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Open</button>
      <button onClick={onSave} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Save</button>
      <button onClick={onSaveAs} className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">Save As</button>
      <div className="relative group">
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">Export</button>
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
          <a href="#" onClick={(e) => { e.preventDefault(); onExportToPdf(); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">PDF</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onExportToHtml(); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">HTML</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onExportToMarkdown(); }} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Markdown</a>
        </div>
      </div>
      <button onClick={onTogglePreview} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">Preview</button>
    </div>
  );
};

export default Controls;