// Dropdown menu Function 
function optionChanged(selectedID){
  console.log(selectedID);
 
// json file for the data
 d3.json("samples.json").then((data) => {
   var metadata= data.metadata;
   var resultsarray= metadata.filter(sampleobject => 
     sampleobject.id == sample);
   var result= resultsarray[0]
   var panel = d3.select("#sample-metadata");
   panel.html("");
   Object.entries(result).forEach(([key, value]) => {
     panel.append("h6").text(`${key}: ${value}`);
   });

   function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("samples.json").then((data) => {
      var samples= data.samples;
      var resultsarray= samples.filter(sampleobject => 
          sampleobject.id == sample);
      var result= resultsarray[0]
    
      var ids = result.otu_ids;
      var labels = result.otu_labels;
      var values = result.sample_values;

 // Bubble Chart 
 const trace1 = {
   x: otuID1,
   y: sampleValue1,
   mode: 'markers',
   marker: {
     color: otuID1,
     
     size: sampleValue1
   }
 },
 layout1 = {
   title: '<b>Bubble Chart For Each Sample</b>',
   xaxis: {title: 'OTU ID'},
   yaxis: {title: 'Number of Samples Collected'},
   showlegend: false,
   height: 800,
   width: 1800
   };
// Ploting the Data
Plotly.newPlot('bubble', [trace1], layout1);


// Bar Chart 
    const yAxis = otuID.map(item => 'OTU' + " " + item);
       const trace = {
       y: yAxis,
       x: sampleValue,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       marker: {
          color: 'rgb(154, 140, 152)',
          line: {
             width: 3
         }
        }
       },
       layout = {
       title: 'Top 10 Operational Taxonomic Units (OTU)/Individual',
       xaxis: {title: 'Number of Samples Collected'},
       yaxis: {title: 'OTU ID'}
       };
// Ploting the Data
Plotly.newPlot('bar', [trace], layout,  {responsive: true}); 