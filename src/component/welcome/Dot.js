import PropTypes from 'prop-types';

function Dot({ slogans, index, setIndex }) {
  return (
    <div
      className='slideshowDots'
      style={{
        position: 'absolute',
        top: '500px',
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        zIndex: '2',
      }}>
      {slogans.map((_, idx) => (
        <div
          key={idx}
          className={`slideshowDot${index === idx ? ' active' : ''}`}
          onClick={() => {
            setIndex(idx);
          }}
        />
      ))}
    </div>
  );
}

Dot.propTypes = {
  slogans: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  setIndex: PropTypes.func.isRequired,
};

export default Dot;
