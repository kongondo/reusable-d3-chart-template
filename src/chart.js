(function() {

  var defaults = {
    width: 640,
    height: 480
  }

  window.Chart = {
    instanceOf : function (options) {
      // Publish instance
      return new Chart(options);
    }
  };

  // ***************************************************
  // Define Chart class and methods
  // ***************************************************

  function Chart(options) {

    this.options = extend({}, defaults, options != null ? options : {});
    makeAccessor.call(this, this.options)
    this.render = drawSelection.bind(this);

  }

  // ***************************************************
  // D3 Render method
  // ***************************************************

  /**
  * Define the D3 callback to render bar chart within the specified
  * selection DOMs
  */
  function drawSelection(selection) {
    _this = this;
    selection.each(function(data) {

      _this.updateWidth = function() {
        // use width to make any changes
        console.log("Update me")
      };
    });
  }

  // ***************************************************
  // Utility methods
  // ***************************************************

  function makeAccessor(properties) {
    var _this = this;

    for (var i in properties) {
      (function (i) {
        _this[i] = function (value) {
          if(value === null || value === undefined)
          {
            _this[i] = properties[i];
            return properties[i];
          }
          properties[i] = value;
          updateFunc = ("update" + i.toCamelCase());
          if (typeof _this[updateFunc] === 'function') _this[updateFunc]();
          return _this;
        }
      })(i);
    }
  }

  String.prototype.toCamelCase = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }

  function extend() {
    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        if (arguments[i].hasOwnProperty(prop)) {
          arguments[0][prop] = arguments[i][prop];
        }
      }
    }
    return arguments[0];
  }

})();
