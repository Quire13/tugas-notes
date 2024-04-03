class NoteForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addNoteListener();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>
    #note-form{
      text-align:center;
    }
    #note-list{
      display:flex;
      flex-direction:column;
      align-items:center;
      margin-top: 20px;
    }
    </style>
    <form id="note-form">
      <label for="title">Title:</label><br>
      <input type="text" id="title" name="title" style="width: 90%;" required><br>
      <label for="body">Description:</label><br>
      <textarea id="body" name="body" style="width: 90%; height: 200px;" required></textarea><br>
      <button type="submit" style="width: 90%; background-color: blue; color: white" >Add Note</button>
    </form>
    <div id="note-list"></div>
  `;
  }

  addNoteListener() {
    const noteForm = this.shadowRoot.querySelector("#note-form");
    const noteList = this.shadowRoot.querySelector("#note-list");

    noteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(noteForm);
      const newNote = {};
      for (const [key, value] of formData.entries()) {
        newNote[key] = value;
      }

      this.dispatchEvent(
        new CustomEvent("noteAdded", { detail: { note: newNote } })
      );
      noteForm.reset();
    });

    this.addEventListener("noteAdded", (event) => {
      const { note } = event.detail;
      this.renderNoteList(note, noteList);
    });
  }

  renderNoteList(note, noteList) {
    const noteItem = document.createElement("div");
    noteItem.textContent = `Title: ${note.title}, Description: ${note.body}`;
    noteList.appendChild(noteItem);
  }
}

customElements.define("note-form", NoteForm);
