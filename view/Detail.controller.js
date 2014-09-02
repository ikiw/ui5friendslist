jQuery.sap.require('ref.ui5.friends.control.ref.google.maps');
jQuery.sap.require('ref.ui5.friends.utils.Formatter');
sap.ui.controller("ref.ui5.friends.view.Detail", {

	onPost: function () {
	    jQuery.sap.require("sap.m.MessageToast");
	    sap.m.MessageToast.show("Sorry! This isn't implemented");
	  },

	handleSelect : function(oEvent){
	  	if(oEvent.getParameter('selectedKey') == 'mutual'){
	  		var _viewModel = this.getView().getModel();
	  		var bindingContext = this.getView().getBindingContext();
	  		var uid = bindingContext.getProperty('id');
	  		var mutualList = this.byId('mutualList');
	  		FB.api('/me/mutualfriends/'+uid,function(response){
	  			var oModel = new sap.ui.model.json.JSONModel(response);
	  			mutualList.setModel(oModel,"mutual");
	  			mutualList.bindItems('mutual>/data',mutualList.getItems()[0].clone());
	  		});
	  	}
	  }

});