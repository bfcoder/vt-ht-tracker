"use strict";

import DS from "ember-data";

export default DS.Model.extend({
  // Attributes
  mode: DS.attr('string'),
  presidencyMessage: DS.attr('string')
});
