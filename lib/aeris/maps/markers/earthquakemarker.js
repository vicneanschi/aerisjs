define([
  'aeris/util',
  'aeris/config',
  'ai/maps/markers/pointdatamarker',
  'ai/maps/markers/config/iconlookup'
], function(_, config, PointDataMarker, iconLookup) {
  /**
   * @class aeris.maps.markers.EarthquakeMarker
   * @extends aeris.maps.markers.PointDataMarker
   * @constructor
   */
  var EarthquakeMarker = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      url: config.get('path') + 'assets/quake_minor.png'
    }, opt_attrs);

    var options = _.extend({
      iconLookup: iconLookup.earthquake,
      typeAttribute: 'report.type'
    }, opt_options);


    PointDataMarker.call(this, attrs, options);

  };
  _.inherits(EarthquakeMarker, PointDataMarker);


  /**
   * @override
   */
  EarthquakeMarker.prototype.lookupTitle_ = function() {
    var mag = this.getDataAttribute('report.mag').toFixed(1);
    return _.isUndefined(mag) ? 'Earthquake' :
      'Magnitute ' + mag + ' Earthquake.';
  };


  return EarthquakeMarker;
});