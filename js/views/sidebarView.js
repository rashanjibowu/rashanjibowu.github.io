define(["backbone", "text!../../templates/sidebar.html", "handlebars"],
	function(Backbone, template, Handlebars) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
			console.log(this.options);
		},

		className: "sidebar",

		render: function() {

			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);
			return this;
		}

	});

});