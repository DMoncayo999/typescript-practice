// Define a class for Note objects
class Note {
    private title: string;
    private content: string;
    private editMode: boolean = false;

    // Constructor to initialize a Note object with title and content
    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
    // Getter method to retrieve note title
    getTitle(): string {
        return this.title;
    }
    // Setter method to set note title
    setTitle(title: string): void {
        this.title = title;
    }
    // Getter method to retrieve note content
    getContent(): string {
        return this.content;
    }
    // Setter method to set note content
    setContent(content: string): void {
        this.content = content;
    }
    
    // Method to toggle edit mode status
    toggleEditMode(): void{
        this.editMode = !this.editMode;
    }

    // Method to update note with new title and content
    updateNote(title: string, content: string): void {
        this.title = title;
        this.content = content;
        this.editMode = false;
    }
    
    // Method to generate HTML representation of a note
    displayNote(): string {
        let result = `<div class="note">
                        <h3>${this.title}</h3>
                        <p>${this.content}</p>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </div>`;

        return result;
    }
}


// Array to store Note objects
const noteList: Note[] = [];

// Form element for adding new notes
const noteForm = document.getElementById('noteForm') as HTMLFormElement;

// Container element to display notes
const noteListContainer = document.getElementById('noteList') as HTMLElement;

//Even listener for form submission to add new notes
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const titleInput = document.getElementById('noteTitle') as HTMLInputElement;
    const contentInput = document.getElementById('noteContent') as HTMLInputElement;
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    if (title !== '' && content !== '') {
        // Create a new Note object and add it to the noteList
        const newNote = new Note(title, content);
        noteList.push(newNote);

        // Render the updated list of notes
        renderNotes();

        // Clear the input fields after adding a note
        titleInput.value = '';
        contentInput.value = '';
    } else {
        // Display alert if title or content is empty
        alert('Title and content are required.');
        // Throw an exception if input is invalid
        throw new Error('Invalid input: Title and content are required.');
    }
});

// Function to render the list of notes in the UI
function renderNotes() {
    // Clear existing notes in the noteListContainer
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
            const index = noteList.indexOf(note);
            if (index !== -1) {
                noteList.splice(index, 1); // Remove note from the list
                renderNotes(); // Re-render after deletion
            }
        });

        // Add event listener to edit button for each note
        const editBtn = noteElement.querySelector('.edit-btn') as HTMLElement;
        editBtn.addEventListener('click', () => {
            // Create input fields for editing
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = note.getTitle(); // Initialize input with current title
            const contentInput = document.createElement('textarea');
            contentInput.value = note.getContent(); // Initialize texarea with current content

            // Replace note content with input fields for editing
            noteElement.innerHTML = ''; // Clear existing content
            noteElement.appendChild(titleInput);
            noteElement.appendChild(contentInput);

            // Create a save button to save the changes
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.addEventListener('click', () => {
                const newTitle = titleInput.value.trim();
                const newContent = contentInput.value.trim();
                if (newTitle !== '' && newContent !== '') {
                    note.setTitle(newTitle); // Update note title
                    note.setContent(newContent); // Update note content
                    renderNotes(); // Re-render after updating
                } else {
                    alert('Please enter valid title and content.');
                }
            });
            noteElement.appendChild(saveBtn); // Append save button to the note element
        });
        
        noteListContainer.appendChild(noteElement); // Append note element to the noteListContainer
    });
}