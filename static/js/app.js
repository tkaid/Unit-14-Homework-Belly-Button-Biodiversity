function init() {
  var selector = d3.select("#selDataset");

  //Collecting the data 
  d3.json("samples.json").then((data) => {
    var sampleData = data.names;

    sampleData.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstData = sampleData[0];
    buildCharts(firstData);
    buildMetadata(firstData);
  });
}

// Creating The Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var PANEL = d3.select("#sample-metadata");
    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// Creating the Horizontal Bar Chart
function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
    
    var samples = data.samples;
    var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var  ids = result.otu_ids;
    var labels = result.otu_labels.slice(0, 10).reverse();
    var values = result.sample_values.slice(0,10).reverse();

    var bubbleLabels = result.otu_labels;
    var bubbleValues = result.sample_values;


// Creating Bubble Chart
    var bar = [{
      x: values,
      y: labels,
      type: "bar",
      orientation: "h",
      text: labels 
    }];
    Plotly.newPlot("bar", bar);


// Creating Bubble Chart
    var bubble = [{
      x: ids,
      y: bubbleValues,
      text: bubbleLabels,
      mode: "markers",
       marker: {
         size: bubbleValues,
         color: bubbleValues,
       }
    }];
    var bubbleLayout = {
        xaxis: {title: "OTU ID"},
    };
    Plotly.newPlot("bubble", bubble, bubbleLayout)

  // Initializing the dashboard
init();

  });
}