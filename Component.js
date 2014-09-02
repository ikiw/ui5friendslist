jQuery.sap.declare("ref.ui5.friends.Component");
sap.ui.core.UIComponent.extend("ref.ui5.friends.Component", {

    createContent : function() {
         var that = this;
        this.onDataLoaded = jQuery.Deferred();
        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('Logged in');
                that.getDataFromFacebook.call(that);
            }else{
                var oDialog = new  sap.m.Dialog({title:"Facebook Login", 
                type:"Message",
                content : [ new sap.m.Text({text:"This app requires facebook authentication. Click OK to open up facebook login popup" 
                })],
                beginButton : new sap.m.Button({text:"OK",press:function(){
                    console.log('Dialog closed');
                    oDialog.close();
                    FB.login(function(){},{scope:'user_friends,friends_about_me,friends_location,friends_birthday'});
                    FB.Event.subscribe('auth.login',function(response){
                        console.log('Manual Loggin');
                        that.getDataFromFacebook.call(that);
                    })
                }
                })
                });
                oDialog.open();
            }
        }); 
        this.app = new sap.m.SplitApp('mainApp',{});
        var oView = sap.ui.view({id:"Main", viewName:"ref.ui5.friends.view.Main", type:sap.ui.core.mvc.ViewType.XML});
        this.app.addMasterPage(oView);
        this.app.setInitialMaster('Main');
        // done
        return this.app;
    },
    
    getDataFromFacebook : function(){
        var that = this;
        FB.api('/me?fields=id,name,friends{bio,cover,birthday,location,name,picture,devices}',function(response){
                     console.log(response);
                     that.oModel =  new  sap.ui.model.json.JSONModel({data:response.friends.data});
                     $('div.spinner').hide();
                        that.onDataLoaded.resolve();
                        that.app.setModel(that.oModel);
                }); 
    }
});
