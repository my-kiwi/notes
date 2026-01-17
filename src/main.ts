const STORAGE_KEY = 'notes_app_content';

// Load note from localStorage on startup
function loadNote(): string {
  return localStorage.getItem(STORAGE_KEY) || '';
}

// Save note to localStorage
function saveNote(content: string): void {
  localStorage.setItem(STORAGE_KEY, content);
}

// Initialize the app
function init(): void {
  const textarea = document.getElementById('notepad') as HTMLTextAreaElement;

  if (!textarea) {
    console.error('Notepad textarea not found');
    return;
  }

  // Load existing note
  textarea.value = loadNote();

  // Save on input with debouncing to avoid excessive storage writes
  let saveTimeout: ReturnType<typeof setTimeout>;
  textarea.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      saveNote(textarea.value);
    }, 500);
  });

  // Also save when leaving the page
  window.addEventListener('beforeunload', () => {
    saveNote(textarea.value);
  });

  // Focus the textarea automatically
  textarea.focus();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
