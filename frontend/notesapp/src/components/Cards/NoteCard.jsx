import { MdOutlinePushPin } from "react-icons/md"
import { MdCreate, MdDelete } from "react-icons/md";
import PropTypes from 'prop-types';
import moment from "moment";

const NoteCard = ({ 
    title, 
    date, 
    content, 
    tags, 
    isPinned, 
    onEdit, 
    onDelete, 
    onPinNote,}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
        <div className="flex items-center justify-between">
            <div>
                <h6 className="text-sm font-medium">{title}</h6>

                <span className="text-xs text-slate-500">{moment(date).format("Do MMM YYYY")}</span>
            </div>

            <MdOutlinePushPin className={`icon-btn ${isPinned ? "text-orange-500" : "text-slate-300"}`} onClick={onPinNote} />
        </div>

        <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-slate-500">{tags.map ((item) => `#${item} `)}</div>

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