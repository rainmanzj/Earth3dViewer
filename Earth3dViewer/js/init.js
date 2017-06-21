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
        createModel(viewer,'/Users/zhangjie/Desktop/02data/03github/Cesium/Apps/SampleData/models/CesiumMan/Cesium_Man.gltf', 5000.0);
       
     
    };

    function createModel(viewer, url, height) {
	    viewer.entities.removeAll();

	    var position = Cesium.Cartesian3.fromDegrees(-109.080842,45.002073, height);
	    var heading = Cesium.Math.toRadians(135);
	    var pitch = 0;
	    var roll = 0;
	    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
	    var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

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

        var blueBox = viewer.entities.add({//蓝色盒子
	    name : 'Blue box',
	    position: Cesium.Cartesian3.fromDegrees(-114.0, 30.0, 0.0),//三维笛卡尔点（x，y，z）
	    box : {
	        dimensions : new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),//dimensions 尺寸
	        material : Cesium.Color.BLUE//材质蓝色
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

        var canvas = viewer.canvas;
        var pick= new Cesium.Cartesian2(window.innerWidth,window.innerHeight);

	    var handler = new Cesium.ScreenSpaceEventHandler(canvas);
	    handler.setInputAction(function(click){
            var pnt=click.position;
	        var clickX=click.position.x;
	        var clickY=click.position.y;
            var pick1= viewer.scene.globe.pick(viewer.camera.getPickRay(pnt), viewer.scene);
            var geoPt1= viewer.scene.globe.ellipsoid.cartesianToCartographic(pick1);
            var lon=geoPt1.longitude / Math.PI * 180;
            var lat=geoPt1.latitude / Math.PI * 180;
	        alert("平面坐标 x:"+pick1.x+"y:"+pick1.y+"\n地理坐标 lon:"+lon+"lat:"+lat);
	    },Cesium.ScreenSpaceEventType.LEFT_CLICK);

    };

    return{test:test} ;
});
