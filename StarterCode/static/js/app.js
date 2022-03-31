


function makePlot(selectedID){

    //Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    //Use `sample_values` as the values for the bar chart.
    //Use `otu_ids` as the labels for the bar chart.
    //Use `otu_labels` as the hovertext for the chart.

    d3.json('../data/samples.json').then((data)=>{


        // Clears dropdown
        d3.select("#selDataset").html("");   
    
        // Select the metadata array and for each item append the item ID and adds ID to dropdown
        data.metadata.forEach(item =>
         {
            // console.log(item.id);
            d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
        // Selected value is passed
        d3.select("#selDataset").node().value = selectedID;
    
        // Filter Metadata for selected ID from dropdown
        const idMetadata = data.metadata.filter(item=> (item.id == selectedID));

        // Check the metadata loaded for the selected ID
        console.log(idMetadata);
    
        const panelDisplay = d3.select("#sample-metadata");
        panelDisplay.html("");
        Object.entries(idMetadata[0]).forEach(item=> 
        {
            // console.log(item);
            panelDisplay.append("p").text(`${item[0]}: ${item[1]}`)
        });
 


        //filter sample array data for selected id
        var sampledata = data.samples.filter(item => parseInt(item.id) == selectedID)

        //extract top 10 sample values
        var samplesValuesTOP10 = sampledata[0].sample_values.slice(0,10);
        samplesValuesTOP10 = samplesValuesTOP10.reverse();

        var otu_ids_top10 = sampledata[0].otu_ids.slice(0,10);
        otu_ids_top10 = otu_ids_top10.reverse();

        var otu_labels_top10 = sampledata[0].otu_labels.slice(0,10);
        otu_labels_top10 = otu_labels_top10.reverse();
        //trace
        let trace={
            x: samplesValuesTOP10,
            y: otu_ids_top10.map(r=>`UTO ${r}`),
            text: otu_ids_top10,
            type:'bar',
            orientation:'h'
        }
        // Render the plot 
        Plotly.newPlot('bar',[trace]);

        //Create a bubble chart that displays each sample.
        //Use `otu_ids` for the x values.
        //Use `sample_values` for the y values.
        //Use `sample_values` for the marker size.
        //Use `otu_ids` for the marker colors.
        //Use `otu_labels` for the text values.

        var sample_values_full = sampledata[0].sample_values;
        var otu_ids_full =  sampledata[0].otu_ids;
        var otu_labels_full =  sampledata[0].otu_labels;
        var minIds=d3.min(otu_ids_full);
        var maxIds=d3.max(otu_ids_full);
        var mapNr = d3.scaleLinear().domain([minIds, maxIds]).range([0, 1]);
        var bubbleColors = otu_ids_full.map( val => d3.interpolateRgbBasis(["royalblue", "greenyellow", "goldenrod"])(mapNr(val)));

        var trace1={
            x: otu_ids_full,
            y: sample_values_full,
            text: otu_labels_full,
            mode: 'markers',
            marker: {
                color: bubbleColors,
                size: sample_values_full.map(x=>x*10),
                sizemode: 'area'
            }
        };

        var bubbleLayout={
            xaxis:{
                autochange: true,
                height: 600,
                width: 1000,
                title: {
                    text: 'OTU ID'
                }
            },
        };
        Plotly.newPlot('bubble',[trace1],bubbleLayout);   
/*
        var meta=data.metadata;

        console.log(selectedID);
        console.log(meta);

        // display meta info
        var metadata=d3.select('#sample-metadata');
        metadata.html('');
        Object.entries(meta[selectedID]).forEach(([k,v])=>{
            metadata.append('p').text(`${k.toUpperCase()}:\n${v}`);
        })
*/
    }); 
    
}



function optionChanged(selectionID){

    //log selection
    console.log(selectionID);

    // Select the input value from the form
   makePlot(selectionID);

}

function init() {

      makePlot(940);

  }

// Initialize the dashboard
init();
