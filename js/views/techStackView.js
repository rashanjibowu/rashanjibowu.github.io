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

			var self = this;

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
				dataWidth: 250,
				box: {
					width: 100,
					height: 100
				}
			};

			dimensions.innerHeight = dimensions.outerHeight - dimensions.padding.top - dimensions.padding.bottom;

			dimensions.innerWidth = dimensions.outerWidth - dimensions.padding.left - dimensions.padding.right;

			function getCoordinates(type, index) {

				// calculate center

				// calculate offsets

				var aThird = dimensions.innerWidth / 3;
				var centerThird = aThird / 2;

				var height = dimensions.innerHeight / 2;
				var topCenter = height / 2;

				// define the x, y coordinates for each element in the array
				// Layout goes from left to right first, then from top to bottom
				var gridLayout = [
					{
						x: centerThird - dimensions.box.width / 2,
						y: topCenter - dimensions.box.height / 2
					},
					{
						x: aThird + centerThird - dimensions.box.width / 2,
						y: topCenter - dimensions.box.height
					},
					{
						x: aThird * 2 + centerThird - dimensions.box.width / 2,
						y: topCenter - dimensions.box.height
					},
					{
						x: aThird + centerThird - dimensions.box.width / 2,
						y: topCenter
					},
					{
						x: aThird * 2 + centerThird - dimensions.box.width / 2,
						y: topCenter
					}
				];

				var bigThird = (dimensions.innerWidth - dimensions.dataWidth) / 3;
				var bigThirdCenter = bigThird / 2;

				var serverSideLayout = [
					{
						x: bigThirdCenter - dimensions.box.width / 2,
						y: topCenter
					},
					{
						x: bigThird + bigThirdCenter - dimensions.box.width / 2,
						y: topCenter - dimensions.box.height
					},
					{
						x: bigThird * 2 + bigThirdCenter - dimensions.box.width / 2,
						y: topCenter
					}
				];

				var dataHalf = dimensions.dataWidth / 2;

				var dataStackLayout = [
					{
						x: dataHalf / 2 - dimensions.box.width / 2,
						y: topCenter
					},
					{
						x: dataHalf + dataHalf / 2 - dimensions.box.width / 2,
						y: topCenter
					}
				];

				if (type === "data") return dataStackLayout[index];
				if (type === "server") return serverSideLayout[index];
				if (type === "client") return gridLayout[index];

				console.error("Incorrect type");
			}

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
						var base = dimensions.innerHeight;
						return base / 2;
					},
					x: 0,
					y: 0,
					class: "rim"
				});

			csStack.selectAll("rect.client-side")
				.data([1,2,3,4,5])
				.enter()
					.append("rect")
						.attr({
							x: function(d, i) {
								return getCoordinates("client", i).x;
							},
							y: function(d, i) {
								return getCoordinates("client", i).y;
							},
							width: dimensions.box.width,
							height: dimensions.box.height,
							class: 'client-side'
						});

			// server-side stack
			var ssStack = canvas.append("g")
				.attr({
					class: 'server-side',
					transform: 'translate(' + 0 + ',' + (dimensions.innerHeight / 2) + ')'
				});

			ssStack.append("rect")
				.attr({
					width: dimensions.innerWidth - dimensions.dataWidth,
					height: function() {
						var base = dimensions.innerHeight;
						return base / 2;
					},
					y: 0,
					class: "rim"
				});

			ssStack.selectAll("rect.server-side")
				.data([1,2,3])
				.enter()
					.append("rect")
						.attr({
							x: function(d, i) {
								return getCoordinates("server", i).x;
							},
							y: function(d, i) {
								return getCoordinates("server", i).y;
							},
							width: dimensions.box.width,
							height: dimensions.box.height,
							class: 'server-side'
						});

			// data stack
			var daStack = canvas.append("g")
				.attr({
					transform: 'translate(' + (dimensions.innerWidth - dimensions.dataWidth) + ',' + (dimensions.innerHeight / 2) + ')',
					class: "data-side"
				});

			daStack.append("rect")
				.attr({
					x: 0,
					y: 0,
					width: dimensions.dataWidth,
					height: function() {
						var base = dimensions.innerHeight;
						return base / 2;
					},
					class: "rim"
				});

			daStack.selectAll("rect.data-side")
				.data([1,2])
				.enter()
				.append("rect")
					.attr({
						x: function(d, i) {
							return getCoordinates("data", i).x;
						},
						y: function(d, i) {
							return getCoordinates("data", i).y;
						},
						width: dimensions.box.width,
						height: dimensions.box.height,
						class: "data-side"
					})
					.on("mouseover", function() {
						self.showDetails("g.data-side");
					})
					.on("mouseout", function() {
						d3.select("g.details").remove();
					});
		},

		showDetails: function(details) {

			var g = d3.select(details)
				.append("g")
				.attr({
					class: 'details'
				});

			g.append("foreignObject")
				.attr({
					x: 10,
					y: 10,
					width: 220,
					height: 120,
					class: "details"
				})
				.append("xhtml:div")
				.append('p')
				.text(function() {
					return 'This is a lot of text. I mean quite a lot of text. Enough text that should span multiple lines.'
				});
		}

	});

});
