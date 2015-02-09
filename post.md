d3.js is not new, but it __is__ pretty shiny. It is a JavaScript framework for creating data-driven documents. In other words, it helps you create data visualizations by binding data to the DOM. Data is not always, actually very rarely in a consumable and understandable format to humans. If your data needs to portray a message and be *understood*, a visualization always helps. As an example, d3 could help you: visualize the relationships between species of Salamanders, chart your business's quarterly financial results, or make a nifty music frequency analyser. There are countless possibilities, you can check out some of the examples [here](https://github.com/mbostock/d3/wiki/Gallery).

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

*We will be using CDNs for jQuery and d3 but if you play on working offline make sure to download the libs to your project folder.

Next, create the app.js file in the same directory.

{% highlight javascript %}
$(document).ready(function () {

});
{% endhighlight %}
