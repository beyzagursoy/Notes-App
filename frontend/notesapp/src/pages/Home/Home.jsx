import Navbar from '../../components/Navbar/Navbar';
import NoteCard from '../../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import axiosInstance from '../../utils/axiosInstance';
import Toast from '../../components/ToastMessage/Toast';
import EmptyCard from '../../components/EmptyCard/EmptyCard';
import AddNotesImg from '../../assets/images/add-notes.svg';
import NoDataImg from '../../assets/images/no-data.svg';

const Home = () => {
  const [formState, setFormState] = useState({
    openAddEditModal: {
      isShown: false,
      type: "add",
      data: null,
    },
    showToastMsg: {
      isShown: false,
      message: "",
      type: "add",
    },
    userInfo: null,
    allNotes: [],
    isSearch: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (noteDetails) => {
    setFormState((prevState) => ({
      ...prevState,
      openAddEditModal: { isShown: true, type: "edit", data: noteDetails },
    }));
  };

  const showToastMessage = (message, type) => {
    setFormState((prevState) => ({
      ...prevState,
      showToastMsg: { isShown: true, message, type },
    }));
  };

  const handleCloseToast = () => {
    setFormState((prevState) => ({
      ...prevState,
      showToastMsg: { isShown: false, message: "" },
    }));
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setFormState((prevState) => ({
          ...prevState,
          userInfo: response.data.user,
        }));
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get All Notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data && response.data.notes) {
        setFormState((prevState) => ({
          ...prevState,
          allNotes: response.data.notes,
        }));
      }
    } catch (error) {
      console.log("An unexpected error occurred, Please try again.");
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        showToastMessage("Note Deleted Successfully", 'delete');
        getAllNotes();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An unexpected error occurred, Please try again.");
      }
    }
  };

  //Search for a  Note
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setFormState((prevState) => ({
          ...prevState,
          isSearch: true,
          allNotes: response.data.notes,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;
    try {
      const response = await axiosInstance.put("/update-note-pinned/" + noteId, {
        isPinned: !noteData.isPinned,
      });
      if (response.data && response.data.note) {
        showToastMessage("Note Updated Successfully");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setFormState((prevState) => ({
      ...prevState,
      isSearch: false,
    }));
    getAllNotes();
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
  }, []);

  return (
    <>
      <Navbar 
        userInfo={formState.userInfo} 
        onSearchNote={onSearchNote} 
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto">
        {formState.allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {formState.allNotes.map((item, index) => (
              <NoteCard 
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard imgSrc={formState.isSearch ? NoDataImg : AddNotesImg} 
          message={formState.isSearch ? `Oops! No notes found matching your search.` : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`} />
        )}
      </div>

      <button 
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-orange-500 hover:bg-orange-600 absolute right-10 bottom-10" 
        onClick={() => {
          setFormState((prevState) => ({
            ...prevState,
            openAddEditModal: { isShown: true, type: "add", data: null },
          }));
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={formState.openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
          type={formState.openAddEditModal.type}
          noteData={formState.openAddEditModal.data}
          onClose={() => {
            setFormState((prevState) => ({
              ...prevState,
              openAddEditModal: { isShown: false, type: "add", data: null },
            }));
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={formState.showToastMsg.isShown}
        message={formState.showToastMsg.message}
        type={formState.showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
