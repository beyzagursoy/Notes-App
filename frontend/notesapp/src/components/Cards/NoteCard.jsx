import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md";
import PropTypes from 'prop-types';
import moment from "moment";
import { useSelector } from 'react-redux';

const NoteCard = ({ 
    title, 
    date, 
    content, 
    tags, 
    isPinned, 
    onEdit, 
    onDelete, 
    onPinNote 
}) => {
  
  const { mode } = useSelector((state) => state.darkMode);

  return (
    <div className={`border rounded p-4 ${mode ? 'bg-black text-white' : 'bg-white text-black'} hover:shadow-xl transition-all ease-in-out`}>
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs">
            {moment(date).format("Do MMM YYYY")}
          </span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPinned ? "text-orange-500" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>
      
      <p className="text-xs mt-2">{content.slice(0, 60)}{content.length > 60 ? "..." : ""}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs">
          {tags.map((tag, index) => (
            <span key={index}>#{tag} </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-500"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

NoteCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPinned: PropTypes.bool.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPinNote: PropTypes.func.isRequired,
};

export default NoteCard;
