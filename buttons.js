function setDeepLink() {
    mapsLocation()
    var content = 'Latitude:' + (Math.floor(latlngArray[0] * 100000)) / 100000 + '<br>Longitude:' + (Math.floor(latlngArray[1] * 100000)) / 100000;
    var newDeepLink = Math.floor(latlngArray[0] * 10000) / 10000 + "," + Math.floor(latlngArray[1] * 10000) / 10000 + "," + map.getZoom();
    $.address.value("?l=" + newDeepLink);
    popupCenter("http://mars3dmap.com/share.php"+"?l=" + newDeepLink, "Earth View Maps - Share", 420, 450);
}
function shareMap(){
   setDeepLink()
}

function popupCenter(url, title, w, h) {
    var left = (screen.width/2)-(w/2);
    left=screen.width-w-18
    var top = (screen.height/2)-(h/2);
    top= 5;
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
} 
var zoomAnimation;

function waitForDeepLink() {
    $.address.strict(false);
    var DeepLink = $.address.value();

    if (DeepLink.charAt(2) == '=') {
        DeepLink = DeepLink.substr(3);
    }
    if (DeepLink.charAt(0) == '/') {
        DeepLink = DeepLink.substr(1);
    }

    var newDeepLink = new Array();
    newDeepLink = DeepLink.split(",")
    for (a in newDeepLink) {
        newDeepLink[a] = parseFloat(newDeepLink[a]);
    }
    if (newDeepLink.length > 1) {
        centerMap(newDeepLink[0], newDeepLink[1], newDeepLink[2])
    }
}

function scrollTopMobile() {
    if ($(window).width() < 768) {
        $("body").animate({ scrollTop: "0px" });
    }
}

function centerMap(latNUM, lngNUM, zoomNUM) {
    map.panTo({
        lat: latNUM,
        lng: lngNUM
    });
    zoomLevel = zoomNUM;
    if (zoomLevel > 19) {
        zoomLevel = 19;
    }
    if(map.getZoom()<zoomLevel){
        zoomAnimation = setInterval(function() { setZoomAnimation(zoomLevel, 1, 1) }, 500);
    }else{
        zoomAnimation = setInterval(function() { setZoomAnimation(zoomLevel, 1, 0) }, 500);
    }
}

function setZoomAnimation(zoomLevel, step, index) {
   if (index){
        if (zoomLevel > map.getZoom()) {
            map.setZoom(map.getZoom() + step)
        } else {
            clearInterval(zoomAnimation)
        }
    }else{
         if (zoomLevel < map.getZoom()) {
            map.setZoom(map.getZoom() - step)
        } else {
            clearInterval(zoomAnimation)
        }
    }
}

var latlngArray;

function mapsLocation() {
    var currlocation = map.getCenter();
    var newCurrLocation = currlocation.toString();
    newCurrLocation = newCurrLocation.replace('(', '');
    newCurrLocation = newCurrLocation.replace(')', '');
    latlngArray = new Array();
    latlngArray = newCurrLocation.split(",")
    for (a in latlngArray) {
        latlngArray[a] = parseFloat(latlngArray[a]);
    }
}


// Go to location
function gotoLocation() { 

    var currentZoom = Number(currentLocation[2])
    /*if(currentZoom >= maxZoomIndex){
        maxZoomIndex=currentZoom
    }else{
        maxZoomIndex = startMaxZoomIndex
    }*/   

    centerMap (Number(currentLocation[0]),Number(currentLocation[1]),currentZoom)
    scrollTopMobile();

}


//Buttons

function randomLocation() {
    getMoveData()
    var randomLat = latlngArray[0] + (100 - Math.floor((Math.random() * 200) + 1)) / 10 / currZoom
    var randomLng = latlngArray[1] + (100 - Math.floor((Math.random() * 200) + 1)) / 10 / currZoom
    centerMap(randomLat,randomLng,currZoom)


}

var currlocation
var currZoom
var newCurrLocation
var latlngArray
var step

function getMoveData() {
    currlocation = map.getCenter()
    currZoom = map.getZoom(); //from 0 (world) to 20 (details)
    if (currZoom == 0) {
        currZoom = 1
    }
    newCurrLocation = currlocation.toString();
    newCurrLocation = newCurrLocation.replace('(', '');
    newCurrLocation = newCurrLocation.replace(')', '');

    latlngArray = new Array();
    latlngArray = newCurrLocation.split(",")
    for (a in latlngArray) {
        latlngArray[a] = parseFloat(latlngArray[a]);
    }
    if (currZoom > 10) {
        step = 1 / (currZoom * 10)
    } else {
        step = 1 / currZoom
    }
}

var newLat
var newLng

function moveLeft() {
    getMoveData()
    newLat = latlngArray[0] + 0
    newLng = latlngArray[1] - step
    map.setCenter({
        lat: newLat,
        lng: newLng
    });


}

function moveRight() {
    getMoveData()
    newLat = latlngArray[0] + 0
    newLng = latlngArray[1] + step
    map.setCenter({
        lat: newLat,
        lng: newLng
    });


}

function moveUp() {
    getMoveData()
    newLat = latlngArray[0] + step
    newLng = latlngArray[1] + 0
    map.setCenter({
        lat: newLat,
        lng: newLng
    });

}

function moveDown() {
    getMoveData()
    newLat = latlngArray[0] - step
    newLng = latlngArray[1] + 0
    map.setCenter({
        lat: newLat,
        lng: newLng
    });
}



function zoomPlus() {

    var currZoom = map.getZoom();
    currZoom++
    map.setZoom(currZoom);

}

function zoomMinus() {
    var currZoom = map.getZoom();
    currZoom--;
    if (currZoom < 2) {
        currZoom = 2;
    }
    map.setZoom(currZoom);

}
function showMoon() {
    if(TerrainIndex==0){
        $("#terrain-control").hide()
    }
    map.setMapTypeId('mars_visible');
}
var TerrainIndex = 1
function showTerrain() {
    map.setMapTypeId('mars_elevation');
    var currZoom = map.getZoom();
    if (currZoom > 7) {
        currZoom = 7;
        map.setZoom(currZoom);
    }
    if(TerrainIndex){
        var divElement = '<div style="position: absolute; bottom: 0px; left: 150px; height: 150px; font-size: 10px; white-space: nowrap; font-family: Arial,sans serif; margin: 0 0 35px 0; z-index: 0;"><img src="images/scalebar.png"><div style="position: absolute; left: 0px; top: 0px;"><div style="position: absolute; top: 150px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">-9 km</div></div><div style="position: absolute; top: 135px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">-6 km</div></div><div style="position: absolute; top: 120px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">-3 km</div></div><div style="position: absolute; top: 105px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">0 km</div></div><div style="position: absolute; top: 90px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">3 km</div></div><div style="position: absolute; top: 75px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">6 km</div></div><div style="position: absolute; top: 60px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">9 km</div></div><div style="position: absolute; top: 45px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">12 km</div></div><div style="position: absolute; top: 30px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">15 km</div></div><div style="position: absolute; top: 15px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">18 km</div></div><div style="position: absolute; top: 0px; height: 1px;" class="map-text"><div style="position: absolute; height: 1px; width: 20px; border-width: 1px 0px 0px; border-style: solid; border-color: rgb(0, 0, 0); -moz-border-top-colors: none; -moz-border-right-colors: none; -moz-border-bottom-colors: none; -moz-border-left-colors: none; border-image: none;"></div><div style="position: absolute; top: -0.6em; left: 25px; line-height: 1em;">21 km</div></div></div><div style="position: absolute; top: -2em; left: 0px;" class="map-text">Elevation</div></div>';
        //
        var terrainNode = document.createElement('div');
        terrainNode.id = 'terrain-control';
        terrainNode.index = 1;
        terrainNode.innerHTML = divElement;
          // push the credit/copyright custom control
          map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(terrainNode);
          TerrainIndex = 0
  }else{
    $("#terrain-control").show()
  }
}

function showInfra() {
    if(TerrainIndex==0){
        $("#terrain-control").hide()
    }
    map.setMapTypeId('mars_infrared');
    var currZoom = map.getZoom();
    if (currZoom > 7) {
        currZoom = 7;
        map.setZoom(currZoom);
    }

}
var overlayIndex=0

function addOverlay(n,s,e,w,link,zoom) {
    overlayIndex = 1;
    // Custom Image
    var imageBounds = {
        north: n,
        south: s,
        east: e,
        west: w
    };
    overlay = new google.maps.GroundOverlay(link,imageBounds);
    overlay.setMap(map);
    map.setZoom(zoom);
}

function removeOverlay() {
    if(overlayIndex){
        overlay.setMap(null);
    }
}