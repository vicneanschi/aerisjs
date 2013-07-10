define(['aeris', './aerisinteractivetile'], function(aeris) {

  /**
   * @fileoverview Representation of Aeris Humidity layer.
   */

  aeris.provide('aeris.maps.layers.AerisHumidity');


  /**
   * @constructor
   * @extends {aeris.maps.layers.AerisInteractiveTile}
   */
  aeris.maps.layers.AerisHumidity = function() {

    // Call parent constructor
    aeris.maps.layers.AerisInteractiveTile.call(this);

    /**
     * @override
     */
    this.name = 'AerisHumidity';

    /**
     * @override
     */
    this.tileType = 'current_rh';


    /**
     * @override
     */
    this.updateIntervals = this.updateIntervals.CURRENT;
  };

  // Inherit from AerisInteractiveTile
  aeris.inherits(aeris.maps.layers.AerisHumidity,
                 aeris.maps.layers.AerisInteractiveTile
  );


  return aeris.maps.layers.AerisHumidity;
});