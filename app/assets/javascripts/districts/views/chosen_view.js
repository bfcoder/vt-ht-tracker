VtTracker.ChosenView = Ember.Select.extend({

  // optionLabelSeparator: ' ',
  // optionLabelParts: 'content.name',

  multiple: false,
  maxSelectedOptions: 5,
  allowSingleDeselect: false,
  width: '100%',
  disableSearchThreshold: 10,
  searchContains: true,
  attributeBindings:['multiple', 'width', 'disableSearchThreshold', 'searchContains', 'disabled', 'maxSelectedOptions', 'allowSingleDeselect'],

  className: '',
  classNameBindings: ['className'],

  didInsertElement: function(){
    this._super();

    var options = {
      multiple: this.get('multiple'),
      width: this.get('width'),
      disable_search_threshold: this.get('disableSearchThreshold'),
      search_contains: this.get('searchContains'),
      inherit_select_classes: true,
      max_selected_options: this.get('maxSelectedOptions'),
      allow_single_deselect: this.get('allowSingleDeselect')
    };

    options.clean_search_text = this.cleanSearchText;
    options.calling_context = this;

    if(this.get('multiple')){
      options.placeholder_text_multiple = this.get('prompt');
    } else {
      options.placeholder_text_single = this.get('prompt');
    }

    this.$().chosen(options);

    // observes for new changes on options to trigger an update on Chosen
    this.addObserver(this.get("optionLabelPath").replace(/^content/, "content.@each"), function() {
      return this.rerenderChosen();
    }.bind(this));
    return this.addObserver(this.get("optionValuePath").replace(/^content/, "content.@each"), function() {
      return this.rerenderChosen();
    }.bind(this));

  },

  _closeChosen: function(){
    // trigger escape to close chosen
    this.$().next('.chosen-container-active').find('input').trigger({type:'keyup', which:27});
  },

  cleanSearchText: function(option, context){
    return option.text;
  },

  rerenderChosen: function(){
    // Don't trigger Chosen update until after DOM elements have finished rendering.
    Ember.run.scheduleOnce('afterRender', this, function(){
      if (typeof this.$() != 'undefined'){
        this.$().trigger('chosen:updated');
      }
    }.bind(this));
  }.observes('selection', 'value'),

  checkValue: function(){
    if(this.get('content') && !this.get('content').findBy('id', this.get('value.id'))){
      this.set('value', null);
    }
  }.observes('content')

});


// Ember.SelectOption.reopen({
//   attributeBindings: ['compoundLabel'],
//   compoundLabel: function(){
//     var separator = this.get('parentView.optionLabelSeparator') || ' ';
//     var label = '';
//     var sep = '';
//     var parts = this.get('labelParts');
//     for(i=0;i<parts.length;i++){
//       label += sep + this.get(parts[i]);
//       sep = separator;
//     }
//     return label;
//   }.property('labelParts', 'parentView.optionLabelSeparator'),

//   labelParts: function(){
//     if(!this.get('parentView.optionLabelParts')){
//       return ['content.name'];
//     } else {
//       return this.get('parentView.optionLabelParts').split(',');
//     }
//   }.property('parentView.optionLabelParts'),

//   watchChanges: function(){
//     var notify = function(){
//       this.notifyPropertyChange('compoundLabel');
//     }.bind(this);
//     var parts = this.get('labelParts');
//     for(i=0;i<parts.length;i++){
//       this.addObserver(parts[i], notify);
//     }
//   }.observes('labelParts').on('init'),

// });
