import { MdAdd, MdClose } from 'react-icons/md';
import { useState } from 'react';
import PropTypes from 'prop-types';

const TagInput = ({ tags, setTags }) => {
    const [formState, setFormState] = useState({
        inputValue: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const addNewTag = () => {
        if (formState.inputValue.trim() !== "") {
            setTags([...tags, formState.inputValue.trim()]);
            setFormState({ inputValue: "" });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            addNewTag();
        }
    };

    const handleRemoveTag = (tagRemove) => {
        setTags(tags.filter((tag) => tag !== tagRemove));
    };

    return (
        <div>
            {tags?.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-2 text-slate-900 bg-slate-100 px-3 py-1 rounded">
                            #{tag}
                            <button
                                onClick={() => handleRemoveTag(tag)}
                                className="text-slate-500 hover:text-black"
                            >
                                <MdClose />
                            </button>
                        </span>
                    ))}
                </div>
            )}
            <div className="flex items-center gap-4 mt-3">
                <input
                    type="text"
                    name="inputValue"
                    className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
                    placeholder="Add tags"
                    value={formState.inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />

                <button 
                    className="w-8 h-8 flex items-center justify-center rounded border border-orange-700 hover:bg-orange-700"
                    onClick={addNewTag}
                >
                    <MdAdd className="text-2xl text-orange-700 hover:text-white" />
                </button>
            </div>
        </div>
    );
};

TagInput.propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setTags: PropTypes.func.isRequired,
};

export default TagInput;
