//Models
window.Brew = Backbone.Model.extend();

window.BrewCollection = Backbone.Collection.extend({
	model:Brew,
	url:"../api/brew"
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