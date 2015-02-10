D3.js is not new, but it __is__ pretty shiny. It is a JavaScript framework for creating data-driven documents. In other words, it helps you create data visualizations by binding data to the DOM. Data is not always, actually very rarely in a consumable and understandable format to humans. If your data needs to portray a message and be *understood*, a visualization always helps. As an example, d3 could help you: visualize the relationships between species of Salamanders, chart your business's quarterly financial results, or make a nifty music frequency visualizer. There are countless possibilities, you can check out some of the examples [here](https://github.com/mbostock/d3/wiki/Gallery).

If you're like me, you'll take a look at the some of the more involved examples and your eyes will gloss over with awe and initimidation. Don't sweat it, like everything else, you should start with an introduction. Today we will be creating a simple bar chart.

First create your `index.html` file.

{% highlight html %}

	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="utf-8" />
	    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	    <title>Big Nerd Ranch D3 Introduction</title>
	    <link rel="stylesheet" href="application.css" />
	  </head>

	  <body>
	    <div id="graph"></div>
	    <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
	    <script src="http://d3js.org/d3.v3.min.js" charset="utf-8"></script>
	    <script src="app.js"></script>
	  </body>
	</html>

{% endhighlight %}

*We will be using CDNs for jQuery and d3 but if you plan on working offline make sure to download the libs to your project folder.

Next, create the app.js file in the same directory.

{% highlight javascript %}

	$(document).ready(function () {

	});

{% endhighlight %}

Alright, enough with the setup, lets start writing some code. You _can_ use DIVs to create your graphs but we're going to be using an SVG (Scalable Vector Graphic) and appending `<rect>` (rectangle) elements to it. First, lets create a little helper function in our app.js file to create the SVG.

{% highlight javascript %}

	$(document).ready(function () {

		var svgHeight = 100;
		var svgWidth = 600;
		var barPadding = 1;

		function createSvg(parent, height, width) {
			return d3.select(parent)
					 .append('svg')
					 .attr('height', height)
					 .attr('width', width);
		}
		
		var graph = createSvg('#graph', svgHeight, svgWidth);

	});

{% endhighlight %}

The `svgHeight` and `svgWidth` variables will be the height and width of our SVG in pixels. The `createSvg` function accepts a parent DOM element selector that the SVG will be appended to, in our case the `<div id="graph"></div>` element, along with its height and width. The `d3.select(parent)` will tell the d3 framework to select a DOM element to be acted upon. If you're familiar with jQuery or CSS selectors, this is primarily the same thing. You can pass `select()` an ID or class name with the appropriate pretext, or simply any HTML element such as `d3.select('body')`. Once d3 selects that element, it returns a _reference_ to that element which allows us to modify that element by _chaining_ methods, in this case appending an SVG and setting attributes. 

So step-by-step, our `createSvg()` method first selects the parent element we passed to it, then creates a new SVG element and appends it within the parent, then sets the height and width attributes of the new SVG element. Finally, since the last method in the chain `.attr()` is referencing the SVG element, the `return` statement in `createSVG()` is returning a _reference_ to the SVG element. Pulling everything together, {% highlight javascript %}`var graph = createSvg('#graph', svgHeight, svgWidth);`{% endhighlight %} creates the SVG and then stores the reference to to the SVG element in the `graph` variable. 

Before we create our bar graph, we need some data to bind to it. D3 accepts many different formats of data including JSON, GeoJSON and even CSV files but for this intro we will just be using a JavaScript array of numbers. Add the following variable to your app.js

{% highlight javascript %}

var dataset = [12, 19, 8, 17, 22, 9, 15, 12, 22, 25, 17, 12, 25, 16];

{% endhighlight %}

Now let's create the bars in our bar graph.

{% highlight javascript %}

	graph.selectAll('rect')
	   .data(dataset)
	   .enter()
	   .append('rect')
	   .attr('width', svgWidth / dataset.length - barPadding)
	   .attr('height', function (d) {
	   		return d * 4;
	   })
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / dataset.length);
	   })
	   .attr('y', function (d) {
	   		return svgHeight - (d * 4); // Align the bars to the bottom of the SVG.
	   });

{% endhighlight %}

![d3 Introduction Bar Chart](barchart.png "d3 Introduction Bar Chart")
Boom. You now have a bar graph worthy of visualizing team synergy at your next board-meeting.

Let's break down what this code snippet is doing.

{% highlight javascript %}

	graph.selectAll('rect')
	   .data(dataset)
	   .enter()
	   .append('rect')

{% endhighlight %}

`graph` is referencing our svg variable that we created earlier, `selectAll('rect')` is saying "please find all the <rect> elements within our svg". Since there are currently none, d3 will prepare an empty array of element references. Next, the `.data(dataset)` method binds our array of numbers to those references. Thirdly, `.enter()` tells d3 to look at the data and _create_ <rect> element references based on that data. Since there are 14 numbers in our dataset, d3 will create 14 <rect> element references. Finally, `.append('rect')` appends those new elements to the DOM.

Without setting the height, width, X and Y values, the SVG will just look blank even though there _are_ <rect> elements inside of it. Since the `.attr()` methods are modifying an _array_ of DOM references on the method chain, they will be invoked for each item in the array. This means you can gain access to each item's value in the array by using an anonymous function. Let's take a look at the last four methods:

{% highlight javascript %}

	.attr('width', svgWidth / dataset.length - barPadding)
	.attr('height', function (d) {
		return d * 4;
	})
	.attr('x', function (d, i) {
		return i * (svgWidth / dataset.length);
	})
	.attr('y', function (d) {
		return svgHeight - (d * 4); // Align the bars to the bottom of the SVG.
	});

{% endhighlight %}

The width of each bar in the graph is being set to a relative value based on how many items in the array and the width of the SVG so that the bar graph will take up the _full_ width of the SVG. The height is using an anonymous method to gain access to the item's value `d` and multiplying it by 4, just to make the bars a little easier to see. 

The X coordinate value is each bar's position left-to-right on the SVG. We can gain access to each bar's index in the array by adding a parameter `i` to the anonymous function. We want to space out the bars evenly so set the X coordinate to be `i * (svgWidth / dataset.length)`. The Y coordinate is a little different since SVG _rects_ use the top-left corner as the point of origin, which is a little weird. So if we didn't provide a value for the Y coordinate, our bars would be _upside down_. That's why we have to set the Y value to be the difference between the heights of the SVG and our bar.

I hope you enjoyed this introduction to the d3.js framework. Obviously this was a simple example, but you can do a lot of cool things with d3! Go check out their [examples](https://github.com/mbostock/d3/wiki/Gallery) and hopefully you will find something that is relevant and interesting to you.