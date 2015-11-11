define(["backbone", "text!../../templates/portfolio.html", "handlebars"], function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		className: "content",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);
			return this;
		}

	});

});
