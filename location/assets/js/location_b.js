
$(document).ready(function(){
    "use strict"
    var map = L.map('map');
    map.setView([51.505, -0.09], 18); 
    var mapLink = "<a href='http://openstreetmap.org'>OpenStreetMap</a>";
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { attribution: 'Leaflet &copy; ' + mapLink + ', contribution', maxZoom: 18 }).addTo(map);

    var carcare = L.icon({
        iconUrl: 'assets/icons/epingle.png',
        shadowUrl: 'assets/icons/leaf-shadow.png',
        iconSize:     [38, 65], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [18, 60], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    })
    var marker;
    var lt = 14.683461, lg= -17.453055;

    const latitudeCc = 14.7418983, longitudeCc = -17.4714459;

    
    navigator.geolocation.watchPosition(success, error);
    
    function success(pos) {
        /*const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;
        localStorage.setItem("latitud", lat);
        localStorage.setItem("longitude", lng);*/

        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([latitudeCc, longitudeCc], { 
            icon: carcare,
            draggable: true,
            title: "this is hover text for marker",
            opacity: 0.5,
        }).addTo(map);
        //marker = L.marker([lat, lng]).addTo(map);
        //console.log(lat, lng);
        map.setView([latitudeCc, longitudeCc]);
        // Set map focus to current user position
        marker.bindPopup("<div class='logo_name'><b class='name_logo'>Car Care</b></div><br> <div class='image logo_image'><img src='assets/icons/logo_carcar.png' alt=''></div> <br><span>Voici la position de Car Care</span>.<br><small class='bienvenu'>Veuillez choisir un des services proposé ?</small> ").openPopup();


        
    }
    
    function init(){
        /*lt = Number(localStorage.getItem("latitud"));
        lg = Number(localStorage.getItem("longitude"));*/
    }

    /*function beforClick() {
        map.on('click', function (e) {
                init();
                //console.log(e)
                //var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                L.Routing.control({
                    waypoints: [
                        L.latLng(latitudeCc, longitudeCc),
                        L.latLng(e.latlng.lat, e.latlng.lng)
                    ],
                    routeWhileDragging: true
                }).on('routesfound', function (e) {
                    var routes = e.routes;
                    var i = 0, j=0 , k=0, timeController;
                    j = e.routes[0].coordinates.length / e.routes[0].instructions.length;
                    e.routes[0].coordinates.forEach(function (coord, index) {
                        var timeout = setTimeout(routing, 300 * index);
                        function routing() {
                            i +=1;
                            marker.setLatLng([coord.lat, coord.lng]);
                            if (i == e.routes[0].coordinates.length) {
                                if (marker) {
                                    //map.removeLayer(marker);
                                }
                                marker = L.marker([coord.lat, coord.lng], { icon: taxiIcon }).addTo(map);
                                marker.bindPopup("<b>"+e.routes[0].name+"</b><br>vous etes bien arrivé.").openPopup();
                                i=0;
                                j=0;
                                k=0;
                                clearTimeout(timeout);
                                buildMap();
                                
                            } else {
                                //console.log(i);
                                j-=1;
                                style(true)
                                if (j == 0) {
                                    j = e.routes[0].coordinates.length / e.routes[0].instructions.length;
                                    k+=1;
                                    marker.bindPopup("<b>maintenant vous etes à :</b><br>"+e.routes[0].instructions[k].road).openPopup();
                                } else {
                                    marker.bindPopup("<b>maintenant vous etes à :</b><br>"+e.routes[0].instructions[k].road).openPopup();
                                }
                            }
                        }
                    })

                }).addTo(map);
            });
    }*/


    function beforClick() {
        map.on('click', function (e) {
            init();
            var userMarker; // Variable pour stocker le marqueur de l'utilisateur

            var routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(latitudeCc, longitudeCc),
                    L.latLng(e.latlng.lat, e.latlng.lng)
                ],
                routeWhileDragging: true
            }).on('routesfound', function (e) {
                var coordinates = e.routes[0].coordinates;
                var instructions = e.routes[0].instructions;
                var index = 0;
    
                function showNextInstruction() {
                    var coord = coordinates[index];
                    var instruction = instructions[index];
                    if (index >= coordinates.length) {
      
                        // Une fois l'itinéraire terminé, effectuez des actions finales
                        marker.bindPopup("<b>" + e.routes[0].name + "</b><br>Vous êtes bien arrivé.").openPopup();
                        buildMap();
                        // Supprimez les marqueurs de départ et d'arrivée
                        routingControl.spliceWaypoints(0, 2); // Supprime les deux premiers waypoints (départ et arrivée)
                        
                        map.setView([e.latlng.lat, e.latlng.lng]);
                        map.removeLayer(marker);
                } else {
                        
    
                        marker.setLatLng([coord.lat, coord.lng]);
                        marker.bindPopup("<b>Vous êtes actuellement sur :</b><br>" + (instruction ? instruction.road : "")).openPopup();
    
                        index++;
                        setTimeout(showNextInstruction, 300);
                    }
                }
    
                // Créez le marqueur initial
                var marker = L.marker([coordinates[0].lat, coordinates[0].lng], { icon: carcare }).addTo(map);
    
                // Commencez à montrer les instructions
                showNextInstruction();
            }).addTo(map);
        });
    }
    
    

    function error(err) {
        if (err.code === 1) {
            alert("Please allow geolocation access");
        } else {
            alert("Cannot get current location");
        }
    }

    beforClick();
    function buildMap()  {
        // L.Routing.control({ createMarker: function() { return null; } });
        var outTime = setTimeout(() => {
           console.log(1);
           style(false)
           //map.removeLayer(marker);
       }, 2000);

    }

    function style(condition){
        if (condition) {
            $(".user").css({
                "right": "19rem",
                "transition": ".5s all"
            });
        } else {
            $(".user").css({
                "right": "2rem",
                "transition": ".5s all"
            });
        }
    }
});