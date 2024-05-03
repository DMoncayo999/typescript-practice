// Define a class for Note objects
var Note = /** @class */ (function () {
    // Constructor to initialize a Note object with title and content
    function Note(title, content) {
        this.title = title;
        this.content = content;
    }
    // Method to generate HTML representation of a note
    Note.prototype.displayNote = function () {
        return "<div class=\"note\">\n                    <h3>".concat(this.title, "</h3>\n                    <p>").concat(this.content, "</p>\n                    <button class=\"edit-btn\">Edit</button>\n                    <button class=\"delete-btn\">Delete</button>\n                </div>");
    };
    return Note;
}());
// Array to store Note objects
var noteList = [];
// Form element for adding new notes
var noteForm = document.getElementById('noteForm');
// Container element to display notes
var noteListContainer = document.getElementById('noteList');
// Event listener for form submission to add new notes
noteForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var titleInput = document.getElementById('noteTitle');
    var contentInput = document.getElementById('noteContent');
    var title = titleInput.value.trim();
    var content = contentInput.value.trim();
    if (title !== '' && content !== '') {
        // Create a new Note object and add it to the noteList array
        var newNote = new Note(title, content);
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
    noteList.forEach(function (note) {
        var noteElement = document.createElement('div');
        noteElement.classList.add('note');
        // Generate HTML representation of the note using the displayNote method of the Note class
        noteElement.innerHTML = note.displayNote();
        // Add event listener to delete button for each note
        var deleteBtn = noteElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            // Find the index of the note in the noteList array and remove it
            var index = noteList.indexOf(note);
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
