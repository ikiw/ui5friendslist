jQuery.sap.declare("ref.google.maps");
sap.ui.core.Control.extend("ref.google.maps", {             
            metadata : {
                properties : {           // setter and getter are created behind the scenes, incl. data binding and type validation
                    latitude: "float",
                    longitude: "float",
					address : "string"
                }
            },
            init: function(){
                this._html = new sap.ui.core.HTML({content:"<div style='height:100%;width:100%;' id='" + this.getId()+"-map'></div>"});
            },
            renderer : function(oRm, oControl) {
                oRm.write("<div style='height:400px;width:400px;margin:18px;' "); 
                oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
                oRm.write(">");
                oRm.renderControl(oControl._html);
                oRm.write("</div>");
            },
            onAfterRendering : function() {   
    
                    var options = { 
                        zoom:12, 				
                        mapTypeId: "roadmap" 
                    };
                    var _map = new google.maps.Map(jQuery.sap.domById(this.getId()+"-map"),options);
                
                console.log("Address : " + this.getAddress());
                var geocoder = new google.maps.Geocoder();
                geocoder.geocode( { 'address': this.getAddress()}, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                             _map.setCenter(results[0].geometry.location);
                              var marker = new google.maps.Marker({
                                      map: _map,
                                      position: results[0].geometry.location
                                 });
                        }
                          });
            }
        });