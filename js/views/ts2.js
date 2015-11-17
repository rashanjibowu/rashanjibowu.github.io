define(["backbone", "text!../../templates/ts2.html", "handlebars"], function(Backbone, template, Handlebars) {
	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		events: {
			'click .tile': 'click'
		},

		tagName: "section",

		className: "content",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);
			return this;
		},

		click: function(event) {

			// get id of the tile that was clicked
			var target = event.currentTarget;
			var id = $(target).attr("id");

			// slide up the cover
			this.$el.find("#" + id + " .body").slideToggle();
			this.$el.find("#" + id + " .cover").slideToggle();

			var selected = this.$el.find("#" + id + " .header");

			// change the header text
			if (selected.hasClass("shown")) {
				selected.removeClass("shown");
				selected.addClass("notshown");
				selected.text("");
			} else {
				selected.removeClass("notshown");
				selected.addClass("shown");
				selected.text(id);
			}
		}

	});
});
