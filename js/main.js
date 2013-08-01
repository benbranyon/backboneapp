//Models
window.Brew = Backbone.Model.extend();

window.BrewCollection = Backbone.Collection.extend({
	model:Brew,
	url:"api/brews"
});

// Views
window.BrewListView = Backbone.View.extend({
	tagName:'ul',
	
	initialize:function () {
		this.model.bind("reset", this.render, this);
	},
	
	render:function (eventName) {
		_.each(this.model.models, function(brew) {
			$(this.el).append(new BrewListItemView({model:brew}).render().el);
		}, this);
		return this;
	}
});

window.BrewListItemView = Backbone.View.extend({
	tagName:'li',
	
	template:_.template($('#tpl-brew-list-item').html()),
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

window.BrewView = Backbone.View.extend({

	template:_.template($('#tpl-brew-details').html()),
	
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

// Router

var AppRouter = Backbone.Router.extend({
	
	routes:{
		"":"list",
		"brews/:id":"brewDetails"
	},
	
	list:function () {
		this.brewList = new BrewCollection();
		this.brewListView = new BrewListView({model:this.brewList});
		this.brewList.fetch();
		$('#sidebar').html(this.brewListView.render().el);
	},
	
	brewDetails:function (id) {
		this.brew = this.brewList.get(id);
		this.brewView = new BrewView({model:this.brew});
		$('#content').html(this.brewView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();