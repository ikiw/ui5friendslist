jQuery.sap.declare("ref.ui5.friends.utils.Formatter");

ref.ui5.friends.utils.Formatter = (function(){
	return {
		getPicture : function(sValue){
			var data = this.getModel().getData().data;
			for(var i=0;i<data.length;i++)
				if(data[i].id==sValue)
					return data[i].picture.data.url;
		},
		setLocationTitle : function(sValue){
			console.log('Loc:' + sValue);
			return (sValue===undefined) ?  "Location not shared :\("  : "Location";
		},
		validateBio : function(sValue){
		    return (sValue===undefined) ? "Doesn't have a Bio!" : sValue;
		},
		validateBirthday : function(sValue){
		    return (sValue===undefined) ? "Doesn't share the b'day" : sValue;
		},
		validateDevice : function(sValue1,sValue2){
		    if(sValue1 && sValue2)
		        return sValue1 + '-' + sValue2;
		    if(sValue1)
		        return  sValue1;
		    else
		        return "Device not shared";
		}
	};
})();