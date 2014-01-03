require([
  '../lib/config',
  'testconfig',
  '../lib/vendor/config'
], function() {
  require([
    'jasmine-slow',
    'jasmine-html',
    'matchers/matchers.package',
    'googlemaps'
  ], function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var reporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(reporter);

    jasmineEnv.specFilter = function(spec) {
      return reporter.specFilter(spec);
    };

    jasmine.slow.enable(50);

    require([
      '/tests/lib/domReady.js!',

      'spec/aeris/model',
      'spec/aeris/collection',
      'spec/aeris/viewmodel',
      'spec/aeris/viewcollection',
      //'spec/aeris/simplecollection',
      'spec/aeris/util',
      'spec/aeris/events',
      'spec/aeris/aerisapi',
      'spec/aeris/promise',
      'spec/aeris/emptypromise',
      //'spec/aeris/promisequeue',
      'spec/aeris/errors',
      'spec/aeris/datehelper',
      'spec/aeris/classfactory',

      'spec/aeris/application/controller/layoutcontroller',
      //'spec/aeris/application/controller/mixin/viewmixin',
      'spec/aeris/application/controller/templatehelperregistrar/handlebarstemplatehelperregistrar',
      'spec/aeris/application/model/eventparambag',
      'spec/aeris/application/module/module',
      'spec/aeris/application/menu/controller/menucontroller',
      'spec/aeris/application/form/model/recursivetoggle',
      'spec/aeris/application/form/model/combotoggle',
      'spec/aeris/application/form/collection/radiocollection',
      'spec/aeris/application/form/controller/togglebuttoncontroller',
      //'spec/aeris/application/plugin/events',
      //'spec/aeris/application/plugin/extend',
      //'spec/aeris/application/plugin/classfactory',
      //'spec/aeris/application/plugin/attrresolver',

      'spec/aeris/builder/maps/loader',
      //'spec/aeris/builder/maps/options/mapappbuilderoptions',
      'spec/aeris/builder/maps/core/helper/renderer',
      //'spec/aeris/builder/maps/core/model/toggle',
      'spec/aeris/builder/maps/core/model/state',
      //'spec/aeris/builder/maps/mapcontrols/controller/mapcontrolscontroller',

      'spec/aeris/builder/routes/plugin/travelmode',
      //'spec/aeris/builder/routes/routebuilder/controller/controlscontroller',
      'spec/aeris/builder/routes/routebuilder/controller/saveroutecontroller',

      //'spec/aeris/geocode/mapquestgeocodeservice',
      //'spec/aeris/geocode/googlegeocodeservice',
      //'spec/aeris/geolocate/html5geolocateservice',
      //'spec/aeris/geolocate/freegeoipgeolocateservice',


      //'spec/aeris/commands/abstractcommand',
      //'spec/aeris/commands/commandmanager',

      'spec/aeris/directions/googledirectionsservice',
      'spec/aeris/directions/nonstopdirectionsservice',
      'spec/aeris/directions/helpers/googledistancecalculator',
      'spec/aeris/directions/promise/promisetofetchdirections',
      'spec/aeris/directions/promise/promisetofetchgoogledirections',

      'spec/aeris/helpers/validator/pathvalidator',

      //'spec/aeris/api/endpoint/model/pointdata',
      'spec/aeris/api/params/model/params',
      'spec/aeris/api/params/model/query',
      'spec/aeris/api/endpoint/collection/aerisapicollection',
      'spec/aeris/api/params/model/filter',
      'spec/aeris/api/params/collection/filtercollection',
      'spec/aeris/api/params/collection/chainedquery',

      'spec/aeris/loader/loader',

      //'spec/aeris/maps/loader',

      //'spec/aeris/maps/base/extension/strategyobject',
      'spec/aeris/maps/base/extension/mapobjectcollection',
      //'spec/aeris/maps/base/extension/mapextensionobject',
      //'spec/aeris/maps/base/abstractstrategy',
      'spec/aeris/maps/base/abstractlayer',

      //'spec/aeris/maps/base/markers/pointdatamarker',

      'spec/aeris/maps/base/polylines/polyline',

      //'spec/aeris/maps/base/markercollection',
      //'spec/aeris/maps/base/markercollections/apiendpoint',
      'spec/aeris/maps/base/markercollections/pointdatamarkercollection',

      'spec/aeris/maps/base/animations/abstractanimation',
      'spec/aeris/maps/base/animations/animationsync',
      'spec/aeris/maps/base/animations/aerisinteractivetile',

      //'spec/aeris/maps/gmaps/events',
      //'spec/aeris/maps/gmaps/abstractstrategy',
      //'spec/aeris/maps/gmaps/layerstrategies/abstractmaptype',
      //'spec/aeris/maps/gmaps/layerstrategies/googlemaptype',
      //'spec/aeris/maps/gmaps/layerstrategies/tile',
      //'spec/aeris/maps/gmaps/layerstrategies/kml'
      //'spec/aeris/maps/gmaps/markerstrategies/markerclusterstrategy'


      'spec/aeris/maps/gmaps/route/waypoint',
      'spec/aeris/maps/gmaps/route/route',
      'spec/aeris/maps/gmaps/route/routebuilder',
      'spec/aeris/maps/gmaps/route/routerenderer',
      'spec/aeris/maps/gmaps/route/commands/abstractroutecommand',
      'spec/aeris/maps/gmaps/route/commands/addwaypointcommand',
      'spec/aeris/maps/gmaps/route/commands/appendreverseroutecommand',
      'spec/aeris/maps/gmaps/route/commands/removewaypointcommand',
      'spec/aeris/maps/gmaps/route/commands/resetroutecommand',
      'spec/aeris/maps/gmaps/route/commands/reverseroutecommand',
      'spec/aeris/maps/gmaps/route/commands/movewaypointcommand',
      'spec/aeris/maps/gmaps/route/commands/helpers/routereverser',


      //'spec/polaris/maps/base/markercollections/poimarkercollection'

      //'tests/integration/spec/wire/wire'
    ], function() {

      // Yes, it's a hack,
      // but it's solving some aweful async
      // loading issues...
      window.setTimeout(function() {
        jasmineEnv.execute();
      }, 500);
    });
  });
}, function(e) {
  throw e;
});
