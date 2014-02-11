define([
  'ai/util',
  'ai/maps/strategy/utils',
  'ai/maps/strategy/abstractstrategy',
  'googlemaps!'
], function(_, mapUtil, AbstractStrategy, gmaps) {
  /**
   * Strategy for rendering markers.
   *
   * @class Marker
   * @namespace aeris.maps.gmaps.markers
   * @extends aeris.maps.AbstractStrategy
   * @param {aeris.maps.Marker} marker
   * @constructor
   */
  var MarkerStrategy = function(marker) {
    this.marker_ = marker;

    AbstractStrategy.call(this, this.marker_);

    this.proxyViewEvents_();

    this.listenTo(this.marker_, {
      'change:position': this.updatePosition_,
      'change:title': this.updateTitle_,
      'change:url change:offsetX change:offsetY': this.updateIcon_
    });
  };
  _.inherits(MarkerStrategy, AbstractStrategy);


  /**
   * @method createView_
   */
  MarkerStrategy.prototype.createView_ = function() {
    return new gmaps.Marker(this.getViewOptions_());
  };


  /**
   * @method setMap
   */
  MarkerStrategy.prototype.setMap = function(aerisMap) {
    AbstractStrategy.prototype.setMap.apply(this, arguments);

    this.getView().setMap(this.mapView_);
  };


  /**
   * @method beforeRemove_
   */
  MarkerStrategy.prototype.beforeRemove_ = function() {
    this.getView().setMap(null);
  };


  /**
   * @return {Object} Options for creating the {google.maps.Maker} view.
   * @method getViewOptions_
   */
  MarkerStrategy.prototype.getViewOptions_ = function() {
    return {
      position: mapUtil.arrayToLatLng(this.marker_.get('position')),
      icon: this.createIcon_(),
      flat: true,
      clickable: this.marker_.get('clickable'),
      draggable: this.marker_.get('draggable'),
      title: this.marker_.get('title')
    };
  };


  MarkerStrategy.prototype.createIcon_ = function() {
    return {
      url: this.marker_.get('url'),
      anchor: this.createAnchorPoint_()
    };
  };


  /**
   * @private
   * @method createAnchorPoint_
   */
  MarkerStrategy.prototype.createAnchorPoint_ = function() {
    return new gmaps.Point(
      this.marker_.get('offsetX'),
      this.marker_.get('offsetY')
    )
  };


  /**
   * Trigger google map events
   * on the marker object.
   *
   * @private
   * @method proxyViewEvents_
   */
  MarkerStrategy.prototype.proxyViewEvents_ = function() {
    this.googleEvents_.listenTo(this.getView(), {
      click: function(evt) {
        var latLon = mapUtil.latLngToArray(evt.latLng);
        this.marker_.trigger('click', latLon, this.marker_);
      },
      dragend: function(evt) {
        var latLon = mapUtil.latLngToArray(evt.latLng);
        this.marker_.trigger('dragend', latLon, this.marker_);

        // Update marker object position attribute
        this.marker_.setPosition(latLon);
      }
    }, this);
  };


  /**
   * @private
   * @method updatePosition_
   */
  MarkerStrategy.prototype.updatePosition_ = function() {
    var latLng = mapUtil.arrayToLatLng(this.marker_.get('position'));
    this.getView().setPosition(latLng);
  };


  /**
   * @private
   * @method updateTitle_
   */
  MarkerStrategy.prototype.updateTitle_ = function() {
    this.getView().setTitle(this.marker_.get('title'));
  };


  MarkerStrategy.prototype.updateIcon_ = function() {
    var icon = this.createIcon_();
    this.getView().setIcon(icon);
  };


  return MarkerStrategy;
});