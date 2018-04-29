import * as d3 from 'd3';
import * as p5 from 'p5';
import {parse} from './utils';

// var angle = d3.time.scale()
// 	.range([0, 2 * Math.PI]);
//

	// var button, song, phrase, part;
	// var rates = [];
	//
	// //const simulation = forceSimulation();
	//
	// function preload(){
	//   weather = loadTable('./data/2017_weather_boston.csv','csv','header')
	//   chord = loadSound('chord.mp3');
	// }
	//
	// function setup() {
	//   console.log(weather);
	//   createCanvas(300, 300);
	//   background(0);
	//   for (var r = 0; r < weather.getRowCount(); r++) {
	//     rates[r] = map(weather.get(r, 'tavg'),0,100,1,4);
	//     //Instrument
	//     if(rates[r]<1.125){
	//       rates[r]=1;
	//     } else if(rates[r]>1.125 & rates[r]<1.2){
	//       rates[r]=1.125;
	//     } else if(rates[r]>1.2 & rates[r]<(1.33333333)){
	//       rates[r]=1.2;
	//     } else if(rates[r]>1.33333333 & rates[r]<(1.5)){
	//       rates[r]=1.33333333;
	//     } else if(rates[r]>1.5 & rates[r]<(1.6)){
	//       rates[r]=1.5;
	//     } else if(rates[r]>1.6 & rates[r]<(1.8)){
	//       rates[r]=1.6;
	//     } else if(rates[r]>1.8 & rates[r]<2){
	//       rates[r]=1.8;
	//     } else if(rates[r]>2 & rates[r]<2.125){
	//       rates[r]=2;
	//     } else if(rates[r]>2.125 & rates[r]<(2.6)){
	//       rates[r]=2.2;
	//     // } else if(rates[r]>2.2 & rates[r]<(2.6)){
	//     //   rates[r]=2.25;
	//     // } else if(rates[r]>2.33333333 & rates[r]<(2.6)){
	//     //   rates[r]=2.3333333;
	//     // } else if(rates[r]>2.5 & rates[r]<(2.6)){
	//     //   rates[r]=2.5;
	//     // } else if(rates[r]>2.6 & rates[r]<(2.7)){
	//     //   rates[r]=2.6;
	//     } else if(rates[r]>2.6 & rates[r]<(2.8125)){
	//         rates[r]=2.8125;
	//     } else if(rates[r]>2.8125 & rates[r]<(3)){
	//         rates[r]=3;
	//     } else if(rates[r]>3 & rates[r]<(3.375)){
	//         rates[r]=3.375;
	//     } else if(rates[r]>3.375 & rates[r]<(3.75)){
	//         rates[r]=3.75;
	//     } else {
	//       rates[r]=4;
	//     }
	// }
	//   console.log(rates);
	//   phraseSound = new p5.Phrase('phraseSound', playSounds, rates);
	//   part = new p5.Part(180,.125);
	//   part.addPhrase(phraseSound);
	//   part.setBPM(60);
	// }
	//
	// function draw() {
	//       background(10);
	//       text(msg, 100, 100);
	//   }
	//
	// function playSounds(time, playBackrate){
	//     //reverb.process(song,1,2);
	//       chord.rate(playBackrate);
	//       chord.play(time);
	//       masterVolume(playBackrate);
	//   }
	//
	// function mouseClicked() {
	//       if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
	//       part.start();
	//       msg = 'playing';
	//       }
	//   }

d3.csv('./data/2017_weather_boston.csv', parse)
	.then((data) => {

		var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		var audioElement = document.getElementById('audioElement');

		function startPlayback() {
		  return document.querySelector('#audioElement').play();
		}

		var rates = [];
		var msg = 'play'
		var innerRadius = 100, outerRadius = 500;
		var index = [];
		var rad = [];
		var linePoints = [];


		var scale = d3.scaleLinear()
			.domain([d3.min(data, d => d.tmin), d3.max(data, d => d.tmax)])
			.range([300, 400]);


    var svgContainer = d3.select("body")
			.append("svg")
      .attr("width", 1000)
      .attr("height", 1000)
			.data([1]);

		var gradient = svgContainer.append("linearGradient")
		   .attr("id", "svgGradient")
		   .attr("x1", "0%")
		   .attr("x2", "100%")
		   .attr("y1", "0%")
		   .attr("y2", "0%");

		gradient.append("stop")
		   .attr('class', 'start')
		   .attr("offset", "0%")
		   .attr("stop-color", "blue")
		   .attr("stop-opacity", 1);

		gradient.append("stop")
		   .attr('class', 'end')
		   .attr("offset", "100%")
		   .attr("stop-color", "orange")
		   .attr("stop-opacity", 1);

		//console.log(data[0].date);

	// for (var r = 0; r < 366; r++) {
	// 	rates[r] = map(data[r].tavg,20,90,1,2.125);
	//
	// 	if(rates[r]<1.125){
	// 		rates[r]=1;
	// 	} else if(rates[r]>1.125 & rates[r]<1.2){
	// 		rates[r]=1.125;
	// 	} else if(rates[r]>1.2 & rates[r]<(1.33333333)){
	// 		rates[r]=1.2;
	// 	} else if(rates[r]>1.33333333 & rates[r]<(1.5)){
	// 		rates[r]=1.33333333;
	// 	} else if(rates[r]>1.5 & rates[r]<(1.6)){
	// 		rates[r]=1.5;
	// 	} else if(rates[r]>1.6 & rates[r]<(1.8)){
	// 		rates[r]=1.6;
	// 	} else if(rates[r]>1.8 & rates[r]<2){
	// 		rates[r]=1.8;
	// 	} else if(rates[r]>2 & rates[r]<2.125){
	// 		rates[r]=2;
	// 	}
	// }

	const svgEnter = svgContainer.enter()
				.append('g')
				.attr('class','weatherbar')
				.attr('transform','translate(200,200)')
				.on('click',()=>{
						console.log(d);
				});

	const weatherbars = svgContainer.merge(svgEnter)
			.selectAll('.weatherbar')
			.data(data);

	const circlesEnter = weatherbars.enter()
			.append('circle')
			.attr('cx',286)
			.attr('cy',286)
			.attr('r',200)
			.style('fill','none')
			.style('stroke',"gray")


  const barsEnter = weatherbars.enter()
			.append("rect")
			.attr("x", (d,i)=>{
				//return 0-(Math.cos(i)*data[i].tavg);
			})
			.attr("y", (d,i)=>{
				//return 0-(Math.sin(i)*data[i].tavg);
			})
			.attr("width", (d,i)=>{
				return +data[i].tmax - data[i].tmin;
				})
			.attr("height", 2)
			.attr('transform', (d,i)=>{
				var r = +data[i].tmin+70;
				//linePoints[i,0] = i;
				linePoints[i] = r;
				var x = r*Math.cos(i);
				var y = r*Math.sin(i);
				// console.log(linePoints[i]);
				return 'translate('+(scale(x))+','+(scale(y))+') rotate('+(i*180/Math.PI)+')';
				})
			.attr("fill", "url(#svgGradient)");


	var radialAreaGenerator = d3.areaRadial();

	var radial = radialAreaGenerator(linePoints);

	d3.select('g')
			.append('path')
			.attr('d',radial)
			.attr("transform","translate(300,300)");



  });
