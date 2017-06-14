/*global require*/
require({
    baseUrl : '.',
    paths : {
        domReady : 'http://www.faruxue1688.com/test/earth3d/ThirdParty/requirejs-2.1.20/domReady',
        Cesium : 'http://www.faruxue1688.com/test/earth3d/Source'
    }
}, [
        'CesiumViewer'
    ], function() {
});
