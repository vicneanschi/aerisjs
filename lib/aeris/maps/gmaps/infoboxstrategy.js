define([
  'aeris/util',
  'gmaps/utils',
  'base/abstractstrategy'
], function(_, mapUtil, BaseStrategy) {
  /**
   * Strategy for rendering a InfoBox
   * on a google map.
   *
   * @param {aeris.maps.InfoBox}
   *
   * @class aeris.maps.gmaps.InfoBoxStrategy
   * @extends aeris.maps.AbstractStrategy
   * @constructor
   */
  var InfoBoxStrategy = function(infoBox) {
    /**
     * The {aeris.maps.InfoBox} object associated with
     * this strategy.
     *
     * @type {aeris.maps.InfoBox}
     * @private
     */
    this.infoBox_ = infoBox;

    this.infoBox_.on({
      'change:latLon': this.setPosition,
      'change:content': this.setContent_
    }, this);

    BaseStrategy.apply(this, arguments);
  };

  _.inherits(InfoBoxStrategy, BaseStrategy);


  InfoBoxStrategy.prototype.createView_ = function() {
    return new google.maps.InfoWindow(this.getOptions_());
  };


  InfoBoxStrategy.prototype.getOptions_ = function() {
    return {
      content: this.infoBox_.get('content'),
      position: mapUtil.arrayToLatLng(this.infoBox_.get('latLon'))
    };
  };


  InfoBoxStrategy.prototype.setMap = function(aerisMap) {
    BaseStrategy.prototype.setMap.apply(this, arguments);

    this.getView().open(this.mapView_);
    this.proxyViewEvents_();
  };


  InfoBoxStrategy.prototype.setPosition = function() {
    var latLng = mapUtil.arrayToLatLng(this.infoBox_.get('latLon'));
    this.getView().setPosition(latLng);
  };


  InfoBoxStrategy.prototype.setContent_ = function() {
    var content = this.infoBox_.get('content');
    this.getView().setContent(content);
  };


  InfoBoxStrategy.prototype.beforeRemove_ = function() {
    this.getView().close();
    this.infoBox_.trigger('close');

    google.maps.event.clearInstanceListeners(this.getView());
  };


  /**
   * Proxy map events from the google maps marker view
   * over to the Aeris maps marker view,
   * so that the Marker object triggers its own events.
   *
   * @private
   */
  InfoBoxStrategy.prototype.proxyViewEvents_ = function() {
    // Maps the names of google events to aeris Marker events
    var eventMap = {
      'closeclick': 'close'
    };
    var self = this;

    // Proxy map events from the google maps marker view
    // over to the Aeris maps marker view,
    // so that the Marker object triggers its own events.
    _.each(eventMap, function(aerisEvent, googleEvent) {
      google.maps.event.addListener(this.getView(), googleEvent, function() {
        self.infoBox_.trigger(aerisEvent);
      });
    }, this);
  };


  return InfoBoxStrategy;
});