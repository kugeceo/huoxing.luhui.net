var currentClass=0;
$(document).ready(function () {

    if ($(window).width() > 768) {
        $(".allSelects").chosen({
            no_results_text : "Nothing found for "
        });

        $('#select1').change(function () {
            var currentValue = chose_get_value('#select1');
            updateMap1(currentValue);
        });
        $('#select2').change(function () {
            var currentValue = chose_get_value('#select2');
            currentClass = chose_get_Class('#select2');
            updateMap2(currentValue,$(this).find(':selected').text());
        });
        $('#select3').change(function () {
            var currentValue = chose_get_value('#select3');
            updateMap3(currentValue);
        });        
        $('#select4').change(function () {
            var currentValue = chose_get_value('#select4');
            updateMap4(currentValue);
        });
        $('#select5').change(function () {
            var currentValue = chose_get_value('#select5');
            updateMap1(currentValue);
        });
        $('#select6').change(function () {
            var currentValue = chose_get_value('#select6');
            updateMap1(currentValue);
        });
    }else{
        $( "select" ).each(function( index ) {
            $("option:first-child", this).text($(this).attr("data-placeholder"))
        });
        $( ".dropDownMenu" ).change(function() {
          updateMap1($(this).find(':selected').attr("value"));
        });
    }


});

function chose_get_value(select) {
    return $(select).val();
}
function chose_get_text(select) {
    return $(select + " option:selected").text();
}
function chose_get_Class(select) {
    return $(select + " option:selected").attr('class');
}


function updateMap1(i) {
    if (i != "") {
        currentLocation = i.split(',');
    }
    gotoLocation()
}

var timeoutLoadOverlay;
function updateMap2(i,n) {
    if (i != "") {
        currentLocation = i.split(',');
    }
    //map.setZoom(2)
    gotoLocation()
    var markerCoordinates = { lat: Number(currentLocation[0]), lng: Number(currentLocation[1]) };
    addMarker(markerCoordinates, map, n);
     if(currentClass=="loadOverlay1"){
        removeOverlay()
        timeoutLoadOverlay= setTimeout(function () {
            addOverlay(-4.6556,-4.6728,137.39, 137.368546,"images/Curiosity_Location_Sol817-full.jpg",18)
        }, 1000)
        
    }
}




function updateMap3(i) {
    if (i != "") {
        currentLocation = i.split(',');
    }   
    removeOverlay()
    if(currentLocation[2]!=0){
        gotoLocation()
        if(currentLocation[1]==0){
            addOverlay1()
        }
        if(currentLocation[1]==180){
            addOverlay2()
        }
    }    
}

function updateMap4(i) {
    if(i==1){
        showMoon();
    }else if(i==2){
        showTerrain();
    }else if(i==3){
        showInfra()
    }
}

