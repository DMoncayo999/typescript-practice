// Define a class for Note objects
class Note {
    private title: string;
    private content: string;

    // Constructor to initialize a Note object with title and content
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    // Method to generate HTML representation of a note
    displayNote(): string {
        return `<div class="note">
                    <h3>${this.title}</h3>
                    <p>${this.content}</p>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>`;
    }
}

// Array to store Note objects
const noteList: Note[] = [];

// Form element for adding new notes
const noteForm = document.getElementById('noteForm') as HTMLFormElement;

// Container element to display notes
const noteListContainer = document.getElementById('noteList') as HTMLElement;

// Event listener for form submission to add new notes
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = document.getElementById('noteTitle') as HTMLInputElement;
    const contentInput = document.getElementById('noteContent') as HTMLInputElement;
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    if (title !== '' && content !== '') {

        // Create a new Note object and add it to the noteList array
        const newNote = new Note(title, content);
        noteList.push(newNote);

        // Render the updated list of notes
        renderNotes();

        // Clear the input fields after adding a note
        titleInput.value = '';
        contentInput.value = '';
    }
});

// Function to render the list of notes in the UI
function renderNotes() {

    // Clear the existing content in the noteListContainer
    noteListContainer.innerHTML = '';

    // Iterate through the noteList array and display each note in the UI
    noteList.forEach((note) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');

        // Generate HTML representation of the note using the displayNote method of the Note class
        noteElement.innerHTML = note.displayNote();

        // Add event listener to delete button for each note
        const deleteBtn = noteElement.querySelector('.delete-btn') as HTMLElement;
        deleteBtn.addEventListener('click', () => {

            // Find the index of the note in the noteList array and remove it
            const index = noteList.indexOf(note);
            if (index !== -1) {
                noteList.splice(index, 1);

                // Render the updated list of notes after deletion
                renderNotes();
            }
        });

        // Append the noteElement to the noteListContainer
        noteListContainer.appendChild(noteElement);
    });
}