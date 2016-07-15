import { expect } from 'chai';
import { mapStateToProps } from '../../src/containers/Trends.jsx';

describe('Trends:Containers', () => {
  describe('mapStateToProps', () => {
    it('should return the trend from the state if available', () => {
      const state = {
        trend: 'cat memes'
      };
      const subject = mapStateToProps(state);
      expect(subject.heading).to.eql('cat memes');
    });
    it('returns undefined id there is no trend', () => {
      const subject = mapStateToProps();
      expect(subject.heading).to.eql(undefined);
    });
  });
});
