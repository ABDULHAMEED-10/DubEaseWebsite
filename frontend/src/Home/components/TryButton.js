import ArrowRight from '../../assets/arrowright.png';
import { Link } from 'react-router-dom';
const TryButton = () => {
  return (
    <Link to="/StartVideoDubbing" className="try__btn">
      <span>Try DubEase Free</span>
      <img src={ArrowRight} alt="Arrow Right" />
    </Link>
  );
};

export default TryButton;
