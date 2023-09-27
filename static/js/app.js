let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// let's confirm our code
/* d3.json(url).then((data) => {
    console.log(data)

})
 */
// function to populate the dropdown menu on the webpage using the names object from samples.json
function dropdown_menu(){

    d3.json(url).then((data) => {
        console.log(data)
let names = data.names
let dropdown_selector = d3.select("#selDataset")
names.forEach((sample) => {
    dropdown_selector 
        .append("option")
        .text(sample)
        .property("value", sample);
});
demographic_table(names[0])


    
    })


}

// Calling this function to populate the dropdown menu
dropdown_menu()

//this function will get call whenever we choose a different value in the dropdown menu 
function optionChanged(sample_id){
    demographic_table(sample_id)   
}

function demographic_table(sample_id){

    d3.json(url).then((data) => {
        console.log(data)
let metadata = data.metadata
let metaarray = metadata.filter(number => number.id == sample_id)[0];

let metadata_dropdown = d3.select("#sample-metadata")
metadata_dropdown.html("")
Object.entries(metaarray).forEach(entry => {
    const [key, value] = entry;
    console.log(key, value);
    metadata_dropdown
    .append("h5")
    .text(`${key}: ${value}`)


  });
let sampledata = data.samples
let samplearray = sampledata.filter(number => number.id == sample_id)[0];

let otu_ids=samplearray.otu_ids
let sample_values =samplearray.sample_values 
let otu_labels=samplearray.otu_labels



var bubbledata = [{
    x:otu_ids ,
    y:sample_values ,
    text:otu_labels,
    mode: 'markers',
    marker: {
      color:otu_ids ,
      colorscale:"Earth", //go there for different colorscale https://plotly.com/javascript/colorscales/
      size: sample_values,
    }
  }];
  
  
  var bubblelayout = {
    title: 'Bubble Chart',
    showlegend: false,
  };
  
  Plotly.newPlot('bubble', bubbledata, bubblelayout);
  
  
  var bardata = [{
    x: sample_values.slice(0,10).reverse(), //.slice(0,10).reverse() this reverse the data and keep the top 10
    y: otu_ids.slice(0,10).map(otu=>`otu ${otu}`).reverse(),
    text:otu_labels.slice(0,10).reverse(),
    orientation: 'h',
    marker: {
      colorscale: 'Earth',
    },
    type: 'bar'
  }];
  
  

  
  var barlayout = {
    title: 'Bar Chart',

  };
  
  Plotly.newPlot('bar', bardata, barlayout);
  
  
    
    })
    
    
}


