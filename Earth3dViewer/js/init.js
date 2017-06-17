/*global define*/
define([
        'Cesium/Cesium',
        'Cesium/Core/Cartesian3',
        'Cesium/Core/defined',
        'Cesium/Core/formatError',
        'Cesium/Core/Math',
        'Cesium/Core/objectToQuery',
        'Cesium/Core/queryToObject',
        'Cesium/DataSources/CzmlDataSource',
        'Cesium/DataSources/GeoJsonDataSource',
        'Cesium/DataSources/KmlDataSource',
        'Cesium/Scene/createTileMapServiceImageryProvider',
        'Cesium/Widgets/Viewer/Viewer',
        'Cesium/Widgets/Viewer/viewerCesiumInspectorMixin',
        'Cesium/Widgets/Viewer/viewerDragDropMixin',
        'domReady!'
    ], function(
        Cesium,
        Cartesian3,
        defined,
        formatError,
        CesiumMath,
        objectToQuery,
        queryToObject,
        CzmlDataSource,
        GeoJsonDataSource,
        KmlDataSource,
        createTileMapServiceImageryProvider,
        Viewer,
        viewerCesiumInspectorMixin,
        viewerDragDropMixin) {
    'use strict';

    var test=function(viewer)
    {
        alert("test");
        createModel(viewer,'/Users/zhangjie/Desktop/02data/03github/Cesium/Apps/SampleData/models/CesiumMan/Cesium_Man.gltf', 5000.0);
       
     
    };

    function createModel(viewer, url, height) {
	    viewer.entities.removeAll();
	    alert("test1");  
	    var position = Cesium.Cartesian3.fromDegrees(-109.080842,45.002073, height);
	    var heading = Cesium.Math.toRadians(135);
	    var pitch = 0;
	    var roll = 0;
	    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
	    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        alert("test2");
        var wyoming = viewer.entities.add({  //添加一个实体，仅需要传递一个简单JSON对象，返回值是一个Entity对象  
		  name : 'Wyoming',  
		  polygon : {  
		    hierarchy : Cesium.Cartesian3.fromDegreesArray([//一组地理坐标  
		                              -109.080842,45.002073,  
		                              -105.91517,45.002073,  
		                              -104.058488,44.996596,  
		                              -104.053011,43.002989,  
		                              -104.053011,41.003906,  
		                              -105.728954,40.998429,  
		                              -107.919731,41.003906,  
		                              -109.04798,40.998429,  
		                              -111.047063,40.998429,  
		                              -111.047063,42.000709,  
		                              -111.047063,44.476286,  
		                              -111.05254,45.002073]),  
		    material : Cesium.Color.RED.withAlpha(0.5), //材质  
		    outline : true, //是否显示轮廓  
		    outlineColor : Cesium.Color.BLACK //轮廓的颜色  
		  }  
		});  
        
	    var entity = viewer.entities.add({
	        name : url,
	        position : position,
	        orientation : orientation,
	        model : {
	            uri : url,
	            minimumPixelSize : 128,
	            maximumScale : 20000
	        }
	    });
	    viewer.trackedEntity = entity;
        viewer.zoomTo(entity)
        alert("test3");
    };

    return{test:test} ;
});
