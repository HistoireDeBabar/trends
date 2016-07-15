import { connect } from 'react-redux';
import SubHeading from '../components/Subheading.jsx';

export const mapStateToProps = (state = {}) => {
  const trend = state.trend;
  return {
    heading: trend,
  };
};

export default connect(mapStateToProps)(SubHeading);
