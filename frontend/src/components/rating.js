import star from '../images/Star.png';
import halfStar from '../images/Half-Star.png';
import noStar from '../images/No-Star.png';
function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      <span className="rating-span">
        {rating >= 1 ? (
          <img src={star} alt="star"></img>
        ) : rating >= 0.5 ? (
          <img src={halfStar} alt="star"></img>
        ) : (
          <img src={noStar} alt="star"></img>
        )}
      </span>
      <span className="rating-span">
        {rating >= 2 ? (
          <img className="rating-icon" src={star} alt="star"></img>
        ) : rating >= 1.5 ? (
          <img src={halfStar} alt="star"></img>
        ) : (
          <img src={noStar} alt="star"></img>
        )}
      </span>
      <span className="rating-span">
        {rating >= 3 ? (
          <img src={star} alt="star"></img>
        ) : rating >= 2.5 ? (
          <img src={halfStar} alt="star"></img>
        ) : (
          <img src={noStar} alt="star"></img>
        )}
      </span>
      <span className="rating-span">
        {rating >= 4 ? (
          <img src={star} alt="star"></img>
        ) : rating >= 3.5 ? (
          <img src={halfStar} alt="star"></img>
        ) : (
          <img src={noStar} alt="star"></img>
        )}
      </span>
      <span className="rating-span">
        {rating >= 5 ? (
          <img src={star} alt="star"></img>
        ) : rating >= 4.5 ? (
          <img src={halfStar} alt="star"></img>
        ) : (
          <img src={noStar} alt="star"></img>
        )}
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <>
          <span className="rating-count">{' ' + rating + ' '}</span>
          <span className="rating-count">
            {' (' + numReviews + ' reviews)'}
          </span>
        </>
      )}
    </div>
  );
}
export default Rating;
