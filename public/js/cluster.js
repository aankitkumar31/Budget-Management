
function entityObject() {
    this.name = ""
    this.totalpolarity = 0
    this.totalsubjectivity = 0
    this.cluster = 0
    this.count = 0
}

var gentities = []
var gclusters = []
var uniqueentities = []
var clusterId;

$(function() {
	
	$("#searchbtn").click(function() {
		//alert('serch');
		keyword = $("#keyword").val();
        var size = $("#size").val();

        if (keyword == '' || size == '') {
            return false;
        }
		 d3.select("svg").remove();
			$("#legend").html("");
		 $("#loader").show();
         $("#drop").html("");
         var myData;
         var parseData;
		 
		  gentities = [];
          gclusters = [];
          uniqueentities = [];
		 
		 
		 var baseURL = "https://indexer.me/api/CreateVector";
		 
		 $.ajax({
            type: "GET",
            contentType: "application/json",
            url: baseURL + '?keyword=' + keyword + '&size=' + size,
            headers: {
                'api-key': '6Z8y5eaov5Cd9Pqqd7DJmnzVHFAhMqyMtZbifLUD'
            },
            success: function(myData) {
                parseData = JSON.parse(myData)
                parseData = parseData.data
				
				$("#loader").hide();
//======================================================================


					var wordID = parseData["Word: ID"]

                    var entities = parseData["Entities"]

                    var subjectivity = parseData["subjectivity"]

                    var polarity = parseData["polarity"]

                    var cluster = parseData["Cluster"]


                    $.each(wordID, function (docindex, item) {
                        var docCluster = cluster[docindex]
                        var docEntities = entities[docindex]

                        var docEntitiesArray = d3.csvParseRows(docEntities)

                        // create entity array for this cluster
                        if (uniqueentities[docCluster] == null) {
                            uniqueentities[docCluster] = new Array()
                            gclusters.push(docCluster)
                        }

                        var clusterEntities = uniqueentities[docCluster]
                        for(var docentitynum = 0;  docentitynum < docEntitiesArray[0].length; docentitynum++) {

                            var found = false
                            var entityname = docEntitiesArray[0][docentitynum]

                            $.each(clusterEntities, function (ceid, centityarr) {
                                if (entityname == centityarr.name) {
                                    centityarr.count = centityarr.count + 1
                                    centityarr.totalpolarity = centityarr.totalpolarity + parseFloat(polarity[docindex].replace(/[^\d.-]/g, ''));
                                    centityarr.totalsubjectivity = centityarr.totalsubjectivity + parseFloat(subjectivity[docindex].replace(/[^\d.-]/g, ''));

                                    found = true
                                    return false
                                }
                            })
                            if (!found) {
                                var entityvalues = new entityObject()
                                entityvalues.name = entityname
                                entityvalues.count = 1
                                entityvalues.cluster = docCluster
                                entityvalues.totalpolarity = parseFloat(polarity[docindex].replace(/[^\d.-]/g, ''))
                                entityvalues.totalsubjectivity = parseFloat(subjectivity[docindex].replace(/[^\d.-]/g, ''))

                                clusterEntities.push(entityvalues)
                            }
                        }
                    })

                    // calculate averages based on total
					
                    for(var entityarrnum = 0;  entityarrnum < uniqueentities.length; entityarrnum++) {
                        
                        gentities[entityarrnum] = uniqueentities[entityarrnum].map(function (value, index) {
                            var avgpolarity = value.totalpolarity / value.count
                            var avgsubjectivity = value.totalsubjectivity / value.count
                            return  d = {
								 clusterId: value.cluster,
								 name: value.name, 
								 nameCode: value.name.split(' ').join('_')+'_'+value.cluster,
								 polarity: avgpolarity, 
								 subjectivity: avgsubjectivity, 
								 entity_count:value.count
								};
                        })
                    }
					gclusters = gclusters.sort();
					
					//console.log(gentities)
                   //console.log(gclusters)
					
					var selector = d3.select("#drop")
                            .append("select")
                            .attr("id", "dropdown")
							.attr("class", "form-control")
							 .on("change", function (d) {
								$("#chart").html("");
								$("#legend").html("");
                                selectedVal = document.getElementById("dropdown");
								if(selectedVal.value=='ALL'){
									clusterId = selectedVal.value;
								}
                                else{
									clusterId = parseInt(selectedVal.value);
								 }
                                scriptcall();

                            });
							
					 selector.selectAll("option")
                            .data(gclusters)
                            .enter().append("option")
                            .attr("value", function (d) {
                                return d;
                            })
                            .text(function (d) {
                                return d;
                            })		
					$("#dropdown").prepend($("<option value='ALL' selected>All</option>"));
					
					   clusterId = 'ALL';
					   scriptcall();
//======================================================================				
				
               
            },
            error: function(error) {
                console.log('oops');
            }
        });
		
		
	})
	
})

function scriptcall(){
	
	var entityRecord = []
	if(clusterId=='ALL'){
		for(var i=0; i<gentities.length; i++){
		  var records = gentities[i];
			for(var j=0; j<records.length; j++){
				entityRecord.push({
						 "clusterId": records[j].clusterId,
						 "name":records[j].name,
						 "nameCode":records[j].nameCode,
						 "entity_count":records[j].entity_count,
						 "subjectivity":records[j].subjectivity,
						 "polarity":records[j].polarity,						
												 
					});
				}
		     }	
	      }
	else {
		
		var records = gentities[clusterId];
		for(var j=0; j<records.length; j++){
			entityRecord.push({
					 "clusterId": records[j].clusterId,
					 "name":records[j].name,
					 "nameCode":records[j].name.split(' ').join('_'),
					 "entity_count":records[j].entity_count,
					 "subjectivity":records[j].subjectivity,
					 "polarity":records[j].polarity,						
											 
				});
			  }
	      }					  
	console.log("==============="+clusterId+"===============");			
	console.log(entityRecord);
	
	
	////////////////////////////////////////////////////////////
//////////////////////// Set-up ////////////////////////////
////////////////////////////////////////////////////////////

//Quick fix for resizing some things for mobile-ish viewers
// vanilla JS window width and height
// https://gist.github.com/joshcarr/2f861bd37c3d0df40b30
d3.select("svg").remove();
$("#legend").html("");
const wV = window;
const dV = document;
const eV = dV.documentElement;
const gV = dV.getElementsByTagName('body')[0];
const xV = wV.innerWidth || eV.clientWidth || gV.clientWidth;
const yV = wV.innerHeight || eV.clientHeight || gV.clientHeight;

// Quick fix for resizing some things for mobile-ish viewers
const mobileScreen = (xV < 500);

//Scatterplot
const margin = {left: 60, top: 20, right: 20, bottom: 60};

const width = Math.min(document.getElementById('chart').offsetWidth, 840) - margin.left - margin.right;
const height = width*2/3;

const svg = d3.select("#chart").append("svg")
  .attr("width", (width + margin.left + margin.right))
  .attr("height", (height + margin.top + margin.bottom));

const wrapper = svg.append("g").attr("class", "scatterWrapper")
  .attr("transform", `translate(${margin.left},${margin.top})`);

let idVariable = "nameCode";
// add a an id property to each entry in the entityRecord data
// if an idVariable is not defined already  	
entityRecord.forEach((d, i) => {
	if (typeof idVariable === 'undefined') {
  	entityRecord[i].id = `${i}`;
	}
})
if (typeof idVariable === 'undefined') idVariable = 'id';

//////////////////////////////////////////////////////
///////////// Initialize Axes & Scales ///////////////
//////////////////////////////////////////////////////

const opacityCircles = 0.7;

const maxDistanceFromPoint = 50;

//Set the color for each clusterId
const color = d3.scaleOrdinal()
    
	.domain(gclusters)
	.range(selectColore());

  function selectColore(){
	var colorScheme = []; 
	var colorCode = [
                      "#FF0000","#60497A","#F79620", "#F5C918", "#FF6600", "#707FBE", "#3669B3", "#009ACC", "#008C8C", "#3EBCA2"
                    ]
		 for(k=0;k<gclusters.length;k++){
			   colorScheme.push(colorCode[k]);
		 }	
         
		 return colorScheme;
}

//const color = d3.scaleOrdinal(d3.schemeCategory10).domain(gclusters);
//Set the new x axis range
const xScale = d3.scaleLinear()
	.range([0, width])
	//.domain([100,2e5])//I prefer this exact scale over the true range and then using "nice"
.domain([0,100])//(d3.extent(entityRecord, function(d) { return d.subjectivity; }))
.nice();
//Set new x-axis
const xAxis = d3.axisBottom()
	.ticks(6)
	//.tickFormat(d => xScale.tickFormat((mobileScreen ? 4 : 8),d => d3.format('.2')(d))(d))	
	.scale(xScale);
//Append the x-axis
wrapper.append("g")
	.attr("class", "x axis")
	.attr("transform", `translate(${0},${height})`)
	.call(xAxis);

//Set the new y axis range
const yScale = d3.scaleLinear()
	.range([height,0])
	.domain([-100,100])//(d3.extent(entityRecord, d => d.polarity))
	.nice();
const yAxis = d3.axisLeft()
	.ticks(6)  //Set rough # of ticks
	.scale(yScale);
//Append the y-axis
wrapper.append("g")
	.attr("class", "y axis")
	.attr("transform", `translate(${0},${0})`)
	.call(yAxis);

//Scale for the bubble size
const rScale = d3.scaleSqrt()
	.range([mobileScreen ? 1 : 2, mobileScreen ? 10 : 16])
	.domain(d3.extent(entityRecord, d => d.entity_count));

//////////////////////////////////////////////////////
///////////////// Initialize Labels //////////////////
//////////////////////////////////////////////////////

//Set up X axis label
wrapper.append("g")
	.append("text")
	.attr("class", "x title")
	.attr("text-anchor", "end")
	.style("font-size", `${mobileScreen ? 8 : 12}px`)
	.attr("transform", `translate(${width},${height - 10})`)
	.text("Subjectivity");

//Set up y axis label
wrapper.append("g")
	.append("text")
	.attr("class", "y title")
	.attr("text-anchor", "end")
	.style("font-size", `${mobileScreen ? 8 : 12}px`)
	.attr("transform", "translate(18, 0) rotate(-90)")
	.text("Polarity");

////////////////////////////////////////////////////////////  
//////////////// Setup for the tooltip  ////////////////////
////////////////////////////////////////////////////////////

// initialize variable for popover tooltip
let popoverTooltip;

const tooltipVariables = [
  {
    name: 'name',
    valueOnly: true
  }
];

const xVariable = 'subjectivity';
const yVariable = 'polarity';

// strip out any white space
const xSelector = xVariable.replace(/\s/g, '');
const ySelector = yVariable.replace(/\s/g, '');

const xDroplineTextFormat = ".0f";
const yDroplineTextFormat = ".0f";

////////////////////////////////////////////////////////////	
///// Capture mouse events and voronoi.find() the site /////
////////////////////////////////////////////////////////////

// Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
svg._tooltipped = svg.diagram = null;
svg.on('mousemove', function() {
  if (!svg.diagram) {
    //console.log('computing the voronoi…');
    svg.diagram = d3.voronoi()
        .x(d => xScale(d.subjectivity))
        .y(d => yScale(d.polarity))
        (entityRecord);
    //console.log('…done.');
  }
  const p = d3.mouse(this);
  let site;
  p[0] -= margin.left;
  p[1] -= margin.top;
  // don't react if the mouse is close to one of the axis
  if (p[0] < 5 || p[1] < 5) {
    site = null;
  } else {
    site = svg.diagram.find(p[0], p[1], maxDistanceFromPoint);
  }
  if (site !== svg._tooltipped) {
    if (svg._tooltipped) {
        // removeTooltip(svg._tooltipped.data)
        const removeTooltipOptions = {
        idVariable,
        xVariable,
        yVariable,
        xSelector,
        ySelector,
        wrapper,
        height,
        width
      };
      removeTooltip(svg._tooltipped.data, undefined, removeTooltipOptions, popoverTooltip)
    }
    if (site) {
        // showTooltip(site.data);
        const showTooltipOptions = {
        idVariable,
        xVariable,
        yVariable,
        xSelector,
        ySelector,
        wrapper,
        height,
        width,
        tooltipVariables,
        xDroplineTextFormat,
        yDroplineTextFormat
      };
      // return the updated popoverTooltip
      popoverTooltip = showTooltip(site.data, undefined, showTooltipOptions, popoverTooltip);
    }
    svg._tooltipped = site;
  }
});

////////////////////////////////////////////////////////////	
/////////////////// Scatterplot Circles ////////////////////
////////////////////////////////////////////////////////////	

//Initiate a group element for the circles	
const circleGroup = wrapper.append("g")
	.attr("class", "circleWrapper");

//Place the name circles
circleGroup.selectAll("entityRecord")
	.data(entityRecord.sort((a, b) => b.entity_count > a.entity_count)) //Sort so the biggest circles are below
	.enter().append("circle")
		.attr("class", (d, i) => `entityRecord marks ${d.nameCode}`)
		.attr("cx", d => xScale(d.subjectivity))
		.attr("cy", d => yScale(d.polarity))
		.attr("r", d => rScale(d.entity_count)*3)
		.style("opacity", opacityCircles)
		.style("fill", d => color(d.clusterId));

///////////////////////////////////////////////////////////////////////////
///////////////////////// Create the Legend////////////////////////////////
///////////////////////////////////////////////////////////////////////////

if (!mobileScreen) {
  //Legend			
  const legendMargin = {left: 5, top: 10, right: 5, bottom: 10};

  const legendWidth = 145;
  const legendHeight = 270;

  const svgLegend = d3.select("#legend").append("svg")
		.attr("width", (legendWidth + legendMargin.left + legendMargin.right))
		.attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));

  const legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
		.attr("transform", `translate(${legendMargin.left},${legendMargin.top})`);
  
  //dimensions of the colored square
  const rectSize = 15; //width of each row

  //height of a row in the legend
  const rowHeight = 20;
  const maxWidth = 144;

  //Create container per rect/text pair  
  const legend = legendWrapper.selectAll('.legendSquare')  	
		.data(color.range())                              
		.enter().append('g')   
		.attr('class', 'legendSquare') 
		.attr("transform", (d, i) => `translate(${0},${i * rowHeight})`)
		.style("cursor", "pointer")
		.on("mouseover", selectLegend(0.02))
		.on("mouseout", selectLegend(opacityCircles));

  //Non visible white rectangle behind square and text for better hover
  legend.append('rect')                                     
	  .attr('width', maxWidth) 
	  .attr('height', rowHeight)			  		  
	 .style('fill', "transparent");
  //Append small squares to Legend
  legend.append('rect')                                     
	  .attr('width', rectSize) 
	  .attr('height', rectSize) 			  		  
	  .style('fill', d => d);
  //Append text to Legend
 legend.append('text')                                     
	  .attr('transform', `translate(${22},${rectSize/2})`)
	  .attr("class", "legendText")
	  .style("font-size", "10px")
	  .attr("dy", ".35em")		  
	  .text((d, i) => color.domain()[i]);

  //Create g element for bubble size legend
  const bubbleSizeLegend = legendWrapper.append("g")
		.attr("transform", `translate(${legendWidth/2 - 30},${color.domain().length*rowHeight + 20})`);
  //Draw the bubble size legend
  //bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [1e11,3e12,1e13], legendName = " ");
}//if !mobileScreen
else {
	d3.select("#legend").style("display","none");
}

//////////////////////////////////////////////////////
/////////////////// Bubble Legend ////////////////////
//////////////////////////////////////////////////////

function bubbleLegend(wrapperVar, scale, sizes, titleName) {
  const legendSize1 = sizes[0];
  const legendSize2 = sizes[1];
  const legendSize3 = sizes[2];
  const legendCenter = 0;
  const legendBottom = 50;
  const legendLineLength = 25;
  const textPadding = 5;
  const numFormat = d3.format(",");

  wrapperVar.append("text")
		.attr("class","legendTitle")
		.attr("transform", `translate(${legendCenter},${0})`)
		.attr("x", `${0}px`)
		.attr("y", `${0}px`)
		.attr("dy", "1em")
		.text(titleName);

  wrapperVar.append("circle")
    .attr('r', scale(legendSize1))
    .attr('class',"legendCircle")
    .attr('cx', legendCenter)
    .attr('cy', (legendBottom-scale(legendSize1)));
  wrapperVar.append("circle")
    .attr('r', scale(legendSize2))
    .attr('class',"legendCircle")
    .attr('cx', legendCenter)
    .attr('cy', (legendBottom-scale(legendSize2)));
  wrapperVar.append("circle")
    .attr('r', scale(legendSize3))
    .attr('class',"legendCircle")
    .attr('cx', legendCenter)
    .attr('cy', (legendBottom-scale(legendSize3)));

  wrapperVar.append("line")
    .attr('class',"legendLine")
    .attr('x1', legendCenter)
    .attr('y1', (legendBottom-2*scale(legendSize1)))
	  .attr('x2', (legendCenter + legendLineLength))
    .attr('y2', (legendBottom-2*scale(legendSize1)));
  wrapperVar.append("line")
    .attr('class',"legendLine")
    .attr('x1', legendCenter)
    .attr('y1', (legendBottom-2*scale(legendSize2)))
	  .attr('x2', (legendCenter + legendLineLength))
    .attr('y2', (legendBottom-2*scale(legendSize2)));
  wrapperVar.append("line")
    .attr('class',"legendLine")
    .attr('x1', legendCenter)
    .attr('y1', (legendBottom-2*scale(legendSize3)))
	  .attr('x2', (legendCenter + legendLineLength))
    .attr('y2', (legendBottom-2*scale(legendSize3)));

  wrapperVar.append("text")
    .attr('class',"legendText")
    .attr('x', (legendCenter + legendLineLength + textPadding))
    .attr('y', (legendBottom-2*scale(legendSize1)))
	  .attr('dy', '0.25em')
	  .text(`$ ${numFormat(Math.round(legendSize1/1e9))} B`);
  wrapperVar.append("text")
    .attr('class',"legendText")
    .attr('x', (legendCenter + legendLineLength + textPadding))
    .attr('y', (legendBottom-2*scale(legendSize2)))
	  .attr('dy', '0.25em')
	  .text(`$ ${numFormat(Math.round(legendSize2/1e9))} B`);
  wrapperVar.append("text")
    .attr('class',"legendText")
    .attr('x', (legendCenter + legendLineLength + textPadding))
    .attr('y', (legendBottom-2*scale(legendSize3)))
	  .attr('dy', '0.25em')
	  .text(`$ ${numFormat(Math.round(legendSize3/1e9))} B`);
}


//bubbleLegend

///////////////////////////////////////////////////////////////////////////
//////////////////// Hover function for the legend ////////////////////////
///////////////////////////////////////////////////////////////////////////

//Decrease opacity of non selected circles when hovering in the legend	
function selectLegend(opacity) {
	return (d, i) => {
		const chosen = color.domain()[i];
			
		wrapper.selectAll(".entityRecord")
			.filter(d => d.clusterId != chosen)
			.transition()
			.style("opacity", opacity);
	  };
}//function selectLegen

}