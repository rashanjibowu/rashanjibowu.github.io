/**
 * Defines a view with a single vertical column of content
 * Used predominantly as a list view for articles and presentations
 */
define(["backbone", "text!../../templates/vContent.html", "handlebars"], function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		tagName: "section",

		className: "content",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);
			return this;
		}

	});

});
