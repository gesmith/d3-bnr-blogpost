$(document).ready(function () {

	var svgHeight = '100';
	var svgWidth = '600';
	var barPadding = '1';

	var dataset = [12, 19, 8, 17, 12, 9, 15, 12, 22, 25, 17];

	function createSvg(parent, height, width) {
		return d3.select(parent)
				 .append('svg')
				 .attr('height', height)
				 .attr('width', width);
	}
	
	var svg = createSvg('#graph', svgHeight, svgWidth);

	svg.selectAll('rect')
	   .data(dataset)
	   .enter()
	   .append('rect')
	   .attr('x', function (d, i) {
	   		return i * (svgWidth / dataset.length);
	   })
	   .attr('y', function (d) {
	   		return svgHeight - (d * 4); // Align the bars to the bottom of the SVG.
	   })
	   .attr('width', svgWidth / dataset.length - barPadding)
	   .attr('height', function (d) {
	   		return d * 4;
	   });

});