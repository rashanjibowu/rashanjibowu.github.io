define(["backbone", "text!../../templates/techStack.html", "handlebars", "d3"], function(Backbone, template, Handlebars, d3) {

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

			this.visualize();
			return this;
		},

		// Contains D3 code that
		visualize: function() {

			var dimensions = {
				outerWidth: 800,
				outerHeight: 600,
				padding: {
					top: 20,
					bottom: 20,
					right: 20,
					left: 20
				},
				margin: 20,
				dataWidth: 250
			};

			dimensions.innerHeight = dimensions.outerHeight - dimensions.padding.top - dimensions.padding.bottom;

			dimensions.innerWidth = dimensions.outerWidth - dimensions.padding.left - dimensions.padding.right;

			console.log(dimensions);

			// find the container node
			var node = this.$el.find('.visualization-container')[0];

			// create svg
			var svg = d3.select(node)
				.append("svg")
				.attr({
					width: dimensions.outerWidth,
					height: dimensions.outerHeight,
					class: "visualization"
				});

			// create canvas
			var canvas = svg.append("g")
				.attr({
					x: 0,
					y: 0,
					transform: "translate(" + dimensions.padding.left + ", " + dimensions.padding.top + ")"
				});

			// create client-side stack
			var csStack = canvas.append("g")
				.attr({
					class: 'client-side'
				});

			csStack.append("rect")
				.attr({
					width: dimensions.innerWidth,
					height: function() {
						var base = dimensions.innerHeight - dimensions.margin;
						return base / 2;
					},
					x: 0,
					y: 0,
					class: "rim"
				});

			// server-side stack
			var ssStack = canvas.append("g")
				.attr({
					class: 'server-side',
					transform: 'translate(' + 0 + ',' + (dimensions.innerHeight / 2) + ')'
				});

			ssStack.append("rect")
				.attr({
					width: dimensions.innerWidth - dimensions.dataWidth - dimensions.margin / 2,
					height: function() {
						var base = dimensions.innerHeight - dimensions.margin;
						return base / 2;
					},
					y: (dimensions.margin / 2),
					class: "rim"
				});

			// data stack
			var daStack = canvas.append("g")
				.attr({
					transform: 'translate(' + (dimensions.innerWidth - dimensions.dataWidth) + ',' + (dimensions.innerHeight / 2) + ')',
					class: "data-side"
				});

			daStack.append("rect")
				.attr({
					width: dimensions.dataWidth - dimensions.margin/2,
					height: function() {
						var base = dimensions.innerHeight - dimensions.margin;
						return base / 2;
					},
					x: dimensions.margin / 2,
					y: (dimensions.margin / 2),
					class: "rim"
				});
		}

	});

});
