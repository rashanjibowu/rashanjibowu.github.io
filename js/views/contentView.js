define(["backbone", "text!../../templates/content.html", "handlebars"], function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function() {},

		className: "content",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled({});
			this.$el.html(html);
			return this;
		}

	});

});