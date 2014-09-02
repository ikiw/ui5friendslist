 sap.ui.controller("ref.ui5.friends.view.Main", {

	onInit: function() {
        var oList = this.byId('list');
        oList.bindItems('/data',oList.getItems()[0].clone());
        oList.attachEventOnce('updateFinished',this.handleUpdate);
	},
	
	handleUpdate : function(oEvent){
	    console.log('Update Finished');
	    var oList = oEvent.getSource();
	    oList.setSelectedItem(oList.getItems()[0]);
	    var detailPage = sap.ui.view({id:"Detail", viewName:"ref.ui5.friends.view.Detail", type:sap.ui.core.mvc.ViewType.XML});
	    detailPage.setBindingContext(oList.getItems()[0].getBindingContext());
	    var oApp = sap.ui.getCore().byId('mainApp'); //FIX it - avoid retrieving id from core
	    oApp.addDetailPage(detailPage);
	    sap.ui.getCore().byId('busyDialog').close();
        console.log("Busy Dialog stopped");
	},
	
	handleSelect : function(oEvent){	
		var oContext = oEvent.getParameter('listItem').getBindingContext();
		var oApp = this.getView().getParent().getParent();
		oApp.getPage('Detail').setBindingContext(oContext);
		var iconTabBar = oApp.getPage('Detail').byId('idIconTabBar');
		if(iconTabBar.getSelectedKey()!="details")
		    iconTabBar.setSelectedKey('details');
	},
	
	onSearch : function (oEvt) {    
	    var aFilters = [];
	    var sQuery = oEvt.getSource().getValue();
	    if (sQuery && sQuery.length > 0) {
	      var filter = new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sQuery);
	      aFilters.push(filter);
	    }
	    var list = this.getView().byId("list");
	    var binding = list.getBinding("items");
	    binding.filter(aFilters);
	  }

});