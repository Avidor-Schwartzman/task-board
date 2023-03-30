document.addEventListener('DOMContentLoaded', () => {
    const createButton = document.getElementById('createButton');
    const deleteButton = document.getElementById('deleteButton');
    const noteText = document.getElementById('noteText');
    const noteDate = document.getElementById('noteDate');
    const noteTime = document.getElementById('noteTime');
    const notesContainer = document.getElementById('notesContainer');
  
    // Load saved notes from localStorage
    loadNotes();
  
    createButton.addEventListener('click', () => {
      const text = noteText.value.trim();
      const date = noteDate.value;
      const time = noteTime.value;
  
      if (text && date && time) {
        createNote(text, date, time);
        noteText.value = '';
        noteDate.value = '';
        noteTime.value = '';
  
        // Save notes to localStorage
        saveNotes();
      } else {
        alert('Please fill in all fields before creating a note.');
      }
    });
  
    deleteButton.addEventListener('click', () => {
      if (notesContainer.children.length > 0) {
        notesContainer.removeChild(notesContainer.lastChild);
        // Save notes to localStorage
        saveNotes();
      } else {
        alert('No tasks to delete.');
      }
    });
    function createNote(text, date, time) {
      const note = document.createElement('div');
      note.classList.add('note');
  
      const noteContent = document.createElement('div');
      noteContent.innerHTML = `
        <p>${text}</p>
        <p>Date: ${date}</p>
        <p>Time: ${time}</p>
      `;
      note.appendChild(noteContent);
  
      notesContainer.appendChild(note);
    }
    
    function saveNotes() {
        const notes = Array.from(notesContainer.children).map(note => {
          const noteContent = note.querySelector('div');
          const paragraphs = noteContent.querySelectorAll('p');
          return {
            text: paragraphs[0].textContent,
            date: paragraphs[1].textContent.replace('Date: ', ''),
            time: paragraphs[2].textContent.replace('Time: ', '')
          };
        });
    
        localStorage.setItem('notes', JSON.stringify(notes));
      }
      deleteButton.addEventListener('click', () => {
        if (notesContainer.children.length > 0) {
          notesContainer.removeChild(notesContainer.lastChild);
          // Save notes to localStorage
          saveNotes();
        } else {
          alert('No tasks to delete.');
        }
      });
    
      function loadNotes() {
        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
          const notes = JSON.parse(savedNotes);
          notes.forEach(note => createNote(note.text, note.date, note.time));
        }
      }
    });

  