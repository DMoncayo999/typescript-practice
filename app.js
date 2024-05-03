// Define a class for Note objects
var Note = /** @class */ (function () {
    // Constructor to initialize a Note object with title and content
    function Note(title, content) {
        this.editMode = false;
        this.title = title;
        this.content = content;
    }
    // Getter method to retrieve note title
    Note.prototype.getTitle = function () {
        return this.title;
    };
    // Setter method to set note title
    Note.prototype.setTitle = function (title) {
        this.title = title;
    };
    // Getter method to retrieve note content
    Note.prototype.getContent = function () {
        return this.content;
    };
    // Setter method to set note content
    Note.prototype.setContent = function (content) {
        this.content = content;
    };
    // Method to toggle edit mode status
    Note.prototype.toggleEditMode = function () {
        this.editMode = !this.editMode;
    };
    // Method to update note with new title and content
    Note.prototype.updateNote = function (title, content) {
        this.title = title;
        this.content = content;
        this.editMode = false;
    };
    // Method to generate HTML representation of a note
    Note.prototype.displayNote = function () {
        var result = "<div class=\"note\">\n                        <h3>".concat(this.title, "</h3>\n                        <p>").concat(this.content, "</p>\n                        <button class=\"edit-btn\">Edit</button>\n                        <button class=\"delete-btn\">Delete</button>\n                    </div>");
        return result;
    };
    return Note;
}());
// Array to store Note objects
var noteList = [];
// Form element for adding new notes
var noteForm = document.getElementById('noteForm');
// Container element to display notes
var noteListContainer = document.getElementById('noteList');
//Even listener for form submission to add new notes
noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleInput = document.getElementById('noteTitle');
    var contentInput = document.getElementById('noteContent');
    var title = titleInput.value.trim();
    var content = contentInput.value.trim();
    if (title !== '' && content !== '') {
        // Create a new Note object and add it to the noteList
        var newNote = new Note(title, content);
        noteList.push(newNote);
        // Render the updated list of notes
        renderNotes();
        // Clear the input fields after adding a note
        titleInput.value = '';
        contentInput.value = '';
    }
    else {
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
    noteList.forEach(function (note) {
        var noteElement = document.createElement('div');
        noteElement.classList.add('note');
        // Generate HTML representation of the note using the displayNote method of the Note class
        noteElement.innerHTML = note.displayNote();
        // Add event listener to delete button for each note
        var deleteBtn = noteElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            var index = noteList.indexOf(note);
            if (index !== -1) {
                noteList.splice(index, 1); // Remove note from the list
                renderNotes(); // Re-render after deletion
            }
        });
        // Add event listener to edit button for each note
        var editBtn = noteElement.querySelector('.edit-btn');
        editBtn.addEventListener('click', function () {
            // Create input fields for editing
            var titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = note.getTitle(); // Initialize input with current title
            var contentInput = document.createElement('textarea');
            contentInput.value = note.getContent(); // Initialize texarea with current content
            // Replace note content with input fields for editing
            noteElement.innerHTML = ''; // Clear existing content
            noteElement.appendChild(titleInput);
            noteElement.appendChild(contentInput);
            // Create a save button to save the changes
            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.addEventListener('click', function () {
                var newTitle = titleInput.value.trim();
                var newContent = contentInput.value.trim();
                if (newTitle !== '' && newContent !== '') {
                    note.setTitle(newTitle); // Update note title
                    note.setContent(newContent); // Update note content
                    renderNotes(); // Re-render after updating
                }
                else {
                    alert('Please enter valid title and content.');
                }
            });
            noteElement.appendChild(saveBtn); // Append save button to the note element
        });
        noteListContainer.appendChild(noteElement); // Append note element to the noteListContainer
    });
}
