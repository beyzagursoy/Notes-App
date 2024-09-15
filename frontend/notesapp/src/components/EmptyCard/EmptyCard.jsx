import PropTypes from 'prop-types';

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img 
        src={imgSrc} 
        alt="No content available" 
        className="w-60 h-auto" 
      />
      <p className="w-3/4 md:w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

EmptyCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default EmptyCard;
