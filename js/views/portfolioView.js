define(["backbone", "text!../../templates/portfolio.html", "handlebars", "d3"], function(Backbone, template, Handlebars, d3) {

	return Backbone.View.extend({

		initialize: function(options) {
			this.options = options;
		},

		tagName: "section",

		className: "content",

		render: function() {

			// render the HTML
			var compiled = Handlebars.compile(template);
			var html = compiled(this.options);
			this.$el.html(html);

			// insert the visualization
			this.visualize(this.options.projects);

			return this;
		},

		visualize: function(data) {

			// set up the svg
			var node = this.$el.find("#portfolio")[0];
			var svg = d3.select(node)
				.append("svg")
				.attr({
					width: 500,
					height: 300
				});

			// draw boxes for each project
			svg.selectAll("rect.project")
				.data(data)
				.enter()
					.append("rect")
					.attr({
						class: "project",
						x: function (d, i) {
							return i * 20;
						},
						y: function (d, i) {
							return 20;
						},
						width: 20,
						height: 30
					});

			console.log(data.length);

			for (var projectIndex = 0, startX = 10; projectIndex < data.length; projectIndex++, startX += 50) {

				// draw circles for each characteristic in each project
				svg.selectAll("circle.project")
					.data(data[projectIndex].characteristics)
					.enter()
						.append("circle")
						.attr({
							class: "characteristic",
							r: 4,
							cx: function(d, i) {
								return (i * 8) + startX;
							},
							cy: 100
						});
			}
		}

	});

});
