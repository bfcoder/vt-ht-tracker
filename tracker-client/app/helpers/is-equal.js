import Ember from "ember";

export default Ember.Helper.helper(([leftSide, rightSide]) => {
  return leftSide === rightSide;
});
