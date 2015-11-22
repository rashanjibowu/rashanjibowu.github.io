define(["backbone", "text!../../templates/techstack.html", "handlebars"], function(Backbone, template, Handlebars) {
	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		events: {
			'mouseenter .tile': 'onMouseOver',
			'mouseleave .tile': 'onMouseOut'
		},

		tagName: "section",

		className: "content",

		render: function() {
			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);
			return this;
		},

		onMouseOver: function(event) {
			event.preventDefault();
			event.stopPropagation();

			// get id of the tile that was clicked
			var target = event.currentTarget;
			var id = $(target).attr("id");

			var selected = this.$el.find("#" + id + " .header");

			if (selected.hasClass("notshown")) {
				// Adding header text
				selected.removeClass("notshown");
				selected.addClass("shown");
				selected.text(id);

				this.$el.find("#" + id + " .body").slideToggle();
				this.$el.find("#" + id + " .cover").slideToggle();
			}
		},

		onMouseOut: function(event) {
			event.preventDefault();
			event.stopPropagation();

			// get id of the tile that was clicked
			var target = event.currentTarget;
			var id = $(target).attr("id");

			var selected = this.$el.find("#" + id + " .header");

			// change the header text
			if (selected.hasClass("shown")) {
				// Remove header text
				selected.removeClass("shown");
				selected.addClass("notshown");
				selected.text("");

				this.$el.find("#" + id + " .body").slideToggle();
				this.$el.find("#" + id + " .cover").slideToggle();
			}
		}

	});
});
