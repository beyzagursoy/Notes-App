import TagInput from './../../components/Input/TagInput';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import PropTypes from 'prop-types';
import axiosInstance from './../../utils/axiosInstance';

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [formState, setFormState] = useState({
    title: noteData?.title || "",
    content: noteData?.content || "",
    tags: noteData?.tags || []
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTagChange = (tags) => {
    setFormState(prevState => ({
      ...prevState,
      tags
    }));
  };

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", formState);
      if (response.data && response.data.note) {
        showToastMessage("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const editNote = async () => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put(`/edit-note/${noteId}`, formState);
      if (response.data && response.data.note) {
        showToastMessage("Note updated successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
    }
  };

  const handleAddNote = () => {
    if (!formState.title) {
      setError("Please enter the title");
      return;
    }

    if (!formState.content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          name="title" 
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Gym At 5"
          value={formState.title}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          name="content" 
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={formState.content}
          onChange={handleChange}
        />
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={formState.tags} setTags={handleTagChange} />
      </div>

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

AddEditNotes.propTypes = {
  noteData: PropTypes.object,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  getAllNotes: PropTypes.func.isRequired,
  showToastMessage: PropTypes.func.isRequired
};

export default AddEditNotes;
