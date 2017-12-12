//Instrumentalist - A Music Exploration Tool
//Instrumentalist/vnd.discogs.v2.html+json


d3.queue()
  .defer(d3.tsv, "Guitar-Rock - Sheet1.tsv", parse)
  .defer(d3.tsv, "Guitar-Jazz - Sheet1.tsv", parse)
  .defer(d3.tsv, "Guitar-Soul - Sheet1.tsv", parse)
  .defer(d3.tsv, "Piano-Rock - Agg.tsv", parse)
  .defer(d3.tsv, "Piano-Jazz - Agg.tsv", parse)
  .defer(d3.tsv, "Piano-Soul - Agg.tsv", parse)
  .defer(d3.tsv, "Trumpet-Rock - Agg.tsv", parse)
  .defer(d3.tsv, "Trumpet-Jazz - Agg.tsv", parse)
  .defer(d3.tsv, "Trumpet-Soul - Agg.tsv", parse)
  .await(dataLoaded);

function parse(d){
        return {
            year:+d.year,
            count:+d.count.replace(',', ''),
            decade:d.year.substring(0,3),
        };
    }

var t = d3.transition()
        .duration(500)
        .ease(d3.easeLinear);

function menu(err,guitar,Trumpet,trumpet){

}

function dataLoaded(err, guitarrock, guitarjazz, guitarsoul, pianorock, pianojazz, pianosoul, trumpetrock, trumpetjazz, trumpetsoul)
{ //happens after the data has been loaded

  d3.select('#guitarRock').on('click', function(){
    d3.selectAll("svg#guitar > *").remove()
    guitarChart(guitarrock);

  });

  d3.select('#guitarJazz').on('click', function(){
    d3.selectAll("svg#guitar>*").remove()
    guitarChart(guitarjazz);
  });

  d3.select('#guitarSoul').on('click', function(){
    d3.selectAll("svg#guitar > *").remove()
    guitarChart(guitarsoul);
  });

  d3.select('#pianoRock').on('click', function(){
    d3.selectAll("svg#piano > *").remove()
    pianoChart(pianorock);

  });

  d3.select('#pianoJazz').on('click', function(){
    d3.selectAll("svg#piano > *").remove()
    pianoChart(pianojazz);
  });

  d3.select('#pianoSoul').on('click', function(){
    d3.selectAll("svg#piano > *").remove()
    pianoChart(pianosoul);
  });

    d3.select('#trumpetRock').on('click', function(){
      d3.selectAll("svg#trumpet > *").remove()
      trumpetChart(trumpetrock);

    });

    d3.select('#trumpetJazz').on('click', function(){
      d3.selectAll("svg#trumpet > *").remove()
      trumpetChart(trumpetjazz);
    });

    d3.select('#trumpetSoul').on('click', function(){
      d3.selectAll("svg#trumpet > *").remove()
      trumpetChart(trumpetsoul);
  });
}



function guitarChart(array){
  console.log(array)

  decades = d3.nest().key(function(d){return d.decade}).entries(array)
  decades.forEach(function(dec){
    dec.sum = 0
    dec.values.forEach(function(year){
      dec.sum += year.count;
    })
    dec.decade = +dec.key.concat('0');
  })

  var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 1);

  var guitar = d3.select("#guitar"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = guitar.attr("width") - margin.left - margin.right,
      height = guitar.attr("height") - margin.top - margin.bottom;

  var scale_x = d3.scaleLinear()
    .domain(d3.extent(decades, function(d) { return d.decade; }))
    .range([40, width-40]);

  var scale_y = d3.scaleLinear()
    .domain([0, d3.max(decades, function(d) { return d.sum; })])
    .range([100,height]);

  var g = guitar.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          // var elements = Object.keys(data[0])
          //   .filter(function(d){
          //        return ((d != "decade") & (d != "count"));
          //        });
          //         var selection = elements[0];

          // Add the x-axis.
        guitar.append("g")
            .attr("class", "line")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom().scale(scale_x).ticks(6));

        // Add the y-axis.
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(d3.axisLeft().scale(scale_y).ticks(7));



        guitar = guitar.selectAll("rectangle")
          .data(decades)
          .enter()
          .append("rect")
          .attr("class","rectangle")
          .attr("x", function(d) {
            return scale_x(d.decade)-40});
          guitar
          .transition(t)
          .attr("y", function(d) {  return ((height - (scale_y(d.sum))))-30})
          .attr("width", 80)
          .attr("height", function(d) {return ((scale_y(d.sum)))});

          guitar.on('mouseover', function(d) {
            // console.log(d);
            div.transition()
                .duration(200)
                .style("opacity", 0);

            div.attr("class", "tooltip")
                .html("Album Count:" + d.sum)
            })
          .on('mouseout', function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });


}

function pianoChart(array){
  console.log(array)

  decades = d3.nest().key(function(d){return d.decade}).entries(array)
  decades.forEach(function(dec){
    dec.sum = 0
    dec.values.forEach(function(year){
      dec.sum += year.count;
    })
    dec.decade = +dec.key.concat('0');
  })
  console.log(decades);
  var piano = d3.select("#piano"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = piano.attr("width") - margin.left - margin.right,
      height = piano.attr("height") - margin.top - margin.bottom;

  var scale_x = d3.scaleLinear()
    .domain(d3.extent(decades, function(d) { return d.decade; }))
    .range([40, width-40]);

  var scale_y = d3.scaleLinear()
    .domain([0, d3.max(decades, function(d) { return d.sum; })])
    .range([100,height]);

  var g = piano.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          // var elements = Object.keys(data[0])
          //   .filter(function(d){
          //        return ((d != "decade") & (d != "count"));
          //        });
          //         var selection = elements[0];

          // Add the x-axis.
        piano.append("g")
            .attr("class", "line")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom().scale(scale_x).ticks(6));

        // Add the y-axis.
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(d3.axisLeft().scale(scale_y).ticks(7));

        piano.selectAll("rectangle")
          .data(decades)
          .enter()
          .append("rect")
          .attr("class","rectangle")
          .attr("x", function(d) {
            return scale_x(d.decade)-40})
          .transition(t)
          .attr("y", function(d) {  return ((height - (scale_y(d.sum))))-30})
          .attr("width", 80)
          .attr("height", function(d) {
            return ((scale_y(d.sum)))
          })




}

function trumpetChart(array){
  console.log(array)

  decades = d3.nest().key(function(d){return d.decade}).entries(array)
  decades.forEach(function(dec){
    dec.sum = 0
    dec.values.forEach(function(year){
      dec.sum += year.count;
    })
    dec.decade = +dec.key.concat('0');
  })
  console.log(decades);
  var trumpet = d3.select("#trumpet"),
      margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = trumpet.attr("width") - margin.left - margin.right,
      height = trumpet.attr("height") - margin.top - margin.bottom;

  var scale_x = d3.scaleLinear()
    .domain(d3.extent(decades, function(d) { return d.decade; }))
    .range([40, width-40]);

  var scale_y = d3.scaleLinear()
    .domain([0, d3.max(decades, function(d) { return d.sum; })])
    .range([100,height]);

  var g = trumpet.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
          // var elements = Object.keys(data[0])
          //   .filter(function(d){
          //        return ((d != "decade") & (d != "count"));
          //        });
          //         var selection = elements[0];

          // Add the x-axis.
        trumpet.append("g")
            .attr("class", "line")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom().scale(scale_x).ticks(6));

        // Add the y-axis.
        // svg.append("g")
        //     .attr("class", "y axis")
        //     .call(d3.axisLeft().scale(scale_y).ticks(7));

        trumpet.selectAll("rectangle")
          .data(decades)
          .enter()
          .append("rect")
          .attr("class","rectangle")
          .attr("x", function(d) {
            return scale_x(d.decade)-40})
          .transition(t)
          .attr("y", function(d) {  return ((height - (scale_y(d.sum))))-30})
          .attr("width", 80)
          .attr("height", function(d) {
            return ((scale_y(d.sum)))
          })




}




//compatibility: anything supporting XMLHttpRequest2 http://caniuse.com/xhr2
