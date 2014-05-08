/**
	For simple applications, you might define all of your views in this file.  
	For more complex applications, you might choose to separate these kind definitions 
	into multiple files under this folder.
*/

enyo.kind({
	name: "myapp.MainView",
	classes:"onyx",
	kind:"FittableRows",
	fit:true,
	components:[
		{kind: "responsiveMenu",
		 components: [
		 {content:"test", unmovable:true},
			{kind:"onyx.Button", content: "Affirmative", classes: "onyx-affirmative", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Negative", classes: "onyx-negative", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Blue", classes: "onyx-blue", ontap:"buttonTapped", style:"margin-left:400px"},
			{kind:"onyx.Button", content: "Dark", classes: "onyx-dark", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Custom", style: "background-color: purple; color: #F1F1F1;", ontap:"buttonTapped"}, {name: "basicPopup", kind: "onyx.Popup", centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", content: "Popup..."}
		]
		},{kind:"onyx.MoreToolbar",components: [
			{kind:"onyx.Button", content: "Affirmative", classes: "onyx-affirmative", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Negative", classes: "onyx-negative", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Blue", classes: "onyx-blue", ontap:"buttonTapped", style:"margin-left:400px"},
			{kind:"onyx.Button", content: "Dark", classes: "onyx-dark", ontap:"buttonTapped"},
			{kind:"onyx.Button", content: "Custom", style: "background-color: purple; color: #F1F1F1;", ontap:"buttonTapped"}, {name: "basicPopup", kind: "onyx.Popup", centered: true, floating: true, classes:"onyx-sample-popup", style: "padding: 10px;", content: "Popup..."}
		]
		}
		],
		buttonTapped: function(){
			var p = this.$[inSender.popup];
			if (p) {
				p.show();
			}
		}
});

enyo.kind({
	name:"responsiveMenu",
	classes:"responsiveMenu",
	layoutKind: "FittableColumnsLayout",
	noStretch: true,
	handlers:{
		onHide:"reflow"
	},tools: [
		{name: "client", noStretch:true, fit: true, classes: "onyx-toolbar-inline"},
		{name: "nard", kind: "onyx.MenuDecorator", showing: false, onActivate: "activated", components: [
			{kind: "onyx.IconButton", classes: "onyx-more-button"},
			{name: "menu", kind: "onyx.Menu", scrolling:false, classes: "onyx-more-menu"}
		]}
	],initComponents: function() {
		if(this.menuClass && this.menuClass.length>0 && !this.$.menu.hasClass(this.menuClass)) {
			this.$.menu.addClass(this.menuClass);
		}
		this.createChrome(this.tools);
		this.inherited(arguments);
		this.$.client.setLayoutKind("FittableColumnsLayout");
	},
	reflow: function(){if (this.isContentOverflowing()) {
			this.$.nard.show();
			console.log("is overflowing");
			

		} else {
			this.$.nard.hide();
		console.log("not overflowing");
		}
	},
	
isContentOverflowing: function() {
		if (this.$.client.hasNode()) {
		console.log("client has node");
			var c$ = this.$.client.children;
			console.log("c$ = "+ c$ );
			var n = c$.length && c$[c$.length-1].hasNode();
			console.log("c$.lenght = "+ c$.length );
			console.log("has node = "+ c$[c$.length-1].hasNode() );
			if(n) {
			console.log("n = true");
			
				//this.$.client.reflow();
				//Workaround: scrollWidth value not working in Firefox, so manually compute
				//return (this.$.client.node.scrollWidth > this.$.client.node.clientWidth);
				var rtn = ((n.offsetLeft + n.offsetWidth) > this.$.client.node.clientWidth);
				console.log ("rtn = " + rtn);
				return rtn;
			}
		}
	}
});