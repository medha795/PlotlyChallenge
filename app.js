// Setting function on dropdownmenu to print new graph based on option selected
d3.selectAll("#selDataset").on("change", selection)

// create function to make dropdown value
    // Select the dropdownmenu with d3
d3.json("data/samples.json").then(function(dataOtu){
    
    // get names list from json data
    var names_list = dataOtu.names;
    
    // Printing the first option in the dropdownmenu
    buildPlot(names_list[0]);
    
    // make for loop to append/push new options to dropdown menu using d3
    var dropDownMenu = d3.select("#selDataset");
    dropDownMenu.selectAll("option").data(names_list).enter().append("option").text(function(d) {
        return d;
         })
           .attr("value", function(d) {
        return d;
        });
});

// Selecting the value of the dropdownmenu and running buildplot function based on input
function selection(){
    // Selecting Dropdownmenu
    var dropDownMenu = d3.select("#selDataset")
    // Selecting Value of the dropdown which has been selected 
    var input = dropDownMenu.node().value;
    // running plot function with new node value
    buildPlot(input)
};

function buildPlot(input) {
    d3.json("data/samples.json").then(function(dataOtu){
        // Make a list of all the data in names
        var names_list = dataOtu.names;
        
        // fetch the index value based on the name input by user
        var sample_id = names_list.findIndex(i => i == input);
        
        // Adding data for the graphs and placing data to relevent variables
        var otu_IDs = dataOtu.samples[sample_id].otu_ids; 
        var samp_Values = dataOtu.samples[sample_id].sample_values;
        var otu_Labels = dataOtu.samples[sample_id].otu_labels; 

        // Getting top ten values from data and reversing the data order
        otuIDs = otu_IDs.slice(0,10);
        otuIDs = otuIDs.map(s => `OTU ${s}`).reverse();
        sampValues = samp_Values.slice(0,10).reverse();
        otuLabels = otu_Labels.slice(0,10).reverse();

        // Making the Bar Chart
        var trace = {
            x: sampValues,
            y: otuIDs,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        var layout = {
        };
        var data = [trace];
        Plotly.newPlot("bar", data, layout);

        // Making the Bubble Chart
        var trace1 = {
            x: otu_IDs,
            y: samp_Values,
            text: otu_Labels,
            mode: 'markers',
            marker: {
              size: samp_Values,
              color: otu_IDs,
              colorscale: [[0, '#4b4ba9'], [.2, '#54d2b0'],[.2, '#7fe36b'],[.5, '#c0ea6e'],[.5, '#99752b'],[1, '#d7c7b9']]
            }
        };
        var data = [trace1];  
        var layout = {
            xaxis: {title: 'OTU ID'},
            showlegend: false,
        };
        Plotly.newPlot('bubble', data, layout);

        // Removing all data in metadata box before printing new data
        d3.select("#sample-metadata").selectAll("p").remove();
        // Fetch Metadata based on userinput
        var meta_text = dataOtu.metadata[sample_id];

        // Cereating a list of object in the User MetaData
        var m_keys = Object.entries(meta_text);

        // Selecting MetaData HTML for data input
        var meta_data = d3.select("#sample-metadata");

        // Creating loop to input data in Demographic Info
        m_keys.forEach(function(m_data){
        meta_data.append("p").text(`${m_data[0]}: ${m_data[1]}`)
        });

        // Setting wash frequency variable for guage
        var wash_freq = meta_text.wfreq
        
        // Initiating guage function with wash_frequency
        guage(wash_freq)
    }); 
};
