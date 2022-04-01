function drawGaugePlot(selectionID){

    //log selection
    console.log(selectionID);

    // Select the input value from the form
    d3.json('../data/samples.json').then((data)=>{

        // Filter Metadata for selected ID from dropdown
        const metadataid = data.metadata.filter(item=> (item.id == selectionID));

        // Gauge Chart to plot weekly washing frequency 
        const guageDisplay = d3.select("#gauge");
        guageDisplay.html(""); 
        const washFreq = metadataid[0].wfreq;
 
        const guageData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "<b>Belly Button Washing Frequency </b><br> (Scrubs Per Week)" },
            type: "indicator",
            mode: "gauge+number",     
            gauge: {
            axis: { range: [0,9] },
            bar: { color: "#f2e9e4" },
            steps: [
                { range: [0, 1], color: "#e5d5d0" },
                { range: [1, 2], color: "#dbc7c2" },
                { range: [2, 3], color: "#d2b9b4" },
                { range: [3, 4], color: "#c9ada7" },
                { range: [4, 5], color: "#ac9899" },
                { range: [5, 6], color: "#8a7e88" },
                { range: [6, 7], color: "#7d7482" },
                { range: [7, 8], color: "#706a7b" },
                { range: [8, 9], color: "#4a4e69" }
                
                ],
            threshold: {
                value: washFreq
                }
            }
        }
        ]; 
        const gaugeLayout = {  width: 600, 
                   height: 400, 
                   margin: { t: 0, b: 0 }, 
                    };
 
        // Plot using Plotly
        Plotly.newPlot('gauge', guageData, gaugeLayout); 

    }); 
    

}

