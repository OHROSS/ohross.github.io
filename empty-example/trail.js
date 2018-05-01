var song, phrase, part;
var amp, freq;
var volhistory = [];
var ratehistory = [];
var w, r;
var reverb;
var energy;
var pg_date, pg_fft, pg_amp, pg_label;
var rates = [];
var dates = [];

function preload(){
  energy = loadTable('2017_prenergy.csv', 'csv', 'header');
  song = loadSound('rim.mp3');
}

function setup(){

  var cnv = createCanvas(windowWidth,windowHeight);
  cnv.style('display', 'block');
  pg_date = createGraphics(256,75);

  pg_fft = createGraphics(256,256);
  pg_label = createGraphics(256,100);
  angleMode(DEGREES);
  pg_amp = createGraphics(768,768);
  pg_r = createGraphics(256,200);
  pg_timeline = createGraphics(1024,300);

  reverb = new p5.Reverb();
  amp = new p5.Amplitude(.95);
  freq = new p5.FFT(.9, 128);
  smooth(.9);
  w = pg_fft.width/128 ;
  // for (var r = 0; r < energy.getRowCount(); r++) {
  //     song.rate(map(energy.get(r, 1),5000000,60000000,.1,10));
  //     song.play();
  for (var r = 0; r < energy.getRowCount(); r++) {
      rates[r] = map(energy.get(r, 1),5000000,60000000,1,4);
      dates[r] = energy.get(r,0);
  //Instrument
      if(rates[r]<1.125){
        rates[r]=1;
      } else if(rates[r]>1.125 & rates[r]<1.2){
        rates[r]=1.125;
      } else if(rates[r]>1.2 & rates[r]<(1.33333333)){
        rates[r]=1.2;
      } else if(rates[r]>1.33333333 & rates[r]<(1.5)){
        rates[r]=1.33333333;
      } else if(rates[r]>1.5 & rates[r]<(1.6)){
        rates[r]=1.5;
      } else if(rates[r]>1.6 & rates[r]<(1.8)){
        rates[r]=1.6;
      } else if(rates[r]>1.8 & rates[r]<2){
        rates[r]=1.8;
      } else if(rates[r]>2 & rates[r]<2.125){
        rates[r]=2;
      } else if(rates[r]>2.125 & rates[r]<(2.6)){
        rates[r]=2.2;
      // } else if(rates[r]>2.2 & rates[r]<(2.6)){
      //   rates[r]=2.25;
      // } else if(rates[r]>2.33333333 & rates[r]<(2.6)){
      //   rates[r]=2.3333333;
      // } else if(rates[r]>2.5 & rates[r]<(2.6)){
      //   rates[r]=2.5;
      // } else if(rates[r]>2.6 & rates[r]<(2.7)){
      //   rates[r]=2.6;
      } else if(rates[r]>2.6 & rates[r]<(2.8125)){
          rates[r]=2.8125;
      } else if(rates[r]>2.8125 & rates[r]<(3)){
          rates[r]=3;
      } else if(rates[r]>3 & rates[r]<(3.375)){
          rates[r]=3.375;
      } else if(rates[r]>3.375 & rates[r]<(3.75)){
          rates[r]=3.75;
      } else {
        rates[r]=4;
      }
  }
  phraseSound = new p5.Phrase('phraseSound', playSounds, rates);
  part = new p5.Part(180,.125);
  part.addPhrase(phraseSound);
  part.setBPM(60);

}

function playSounds(time, playBackrate){
  //reverb.process(song,1,2);
  song.rate(playBackrate);
  song.play(time);
  masterVolume(playBackrate);
//  console.log(playBackrate);
}

function draw(){

  frameRate(20);
  part.start();
  background(20);
  //console.log(part.partStep);
  var vol = amp.getLevel();
  var spectrum = freq.analyze();

  volhistory.push(vol);
  stroke(400);
  noFill();

  // - FFT Visualizer - //
  pg_fft.noStroke();
  pg_fft.background(20);
  for (var i = 0; i < spectrum.length; i++) {
    var fft = spectrum[i];
    var y= map(fft, 0, 256, pg_fft.height, 0)
    pg_fft.fill(i,102,153);
    pg_fft.rect((i*pg_fft.width/64)+60, .9*y+120, 3, pg_fft.height);
  };
  image(pg_fft,0,300);


  // - FFT Label - //
  pg_label.background(20);
  pg_label.strokeWeight(1);
  pg_label.fill(0, 102, 153);
  pg_label.stroke(0,102,153);
  pg_label.line(0.125*256, 15, 0.875*256, 15);
  pg_label.textSize(10);
  pg_label.noStroke();
  pg_label.text('Hz', 0.025*256, .34*100);
  pg_label.text('400', 0.119*256, .34*100);
  pg_label.text('900', 0.819*256, .34*100);
  image(pg_label,0,529);

  //frameRate(50);
  //beginShape();

  // - Amplitude Visualizer - //
  pg_amp.background(20)
  pg_amp.noFill();
  pg_amp.strokeWeight(2);
  pg_amp.stroke(0,102,153);
  pg_amp.strokeJoin(ROUND);
  pg_amp.beginShape();
  for (var i = 0; i < 360; i++) {
    //pg_amp.background(volhistory[i]*1800);

    r = map(volhistory[i], 0, 1, 10, 1200);
    var x = 300+ r*cos(i);
    var y = 300+ r*sin(i);
    pg_amp.tint(r);
    if(rates[part.partStep]>2.01){
      pg_amp.fill(110+r,110+r,110+r);
    }else {
      pg_amp.fill(r,r,r);
    };
    pg_amp.vertex(x,y)


    //pg_amp.fill(0, 102, 153);

    //image(pg_r, 256,0);

    pg_amp.stroke(0,102,153);
    pg_amp.strokeWeight(2)
    pg_amp.line(384, 384, x, y);
    //var y = map(2*volhistory[i], 0, .75, height/2, 0);

    //pg_amp.vertex(Math.sin(i), Math.PI*(y));
  }

  pg_amp.endShape();

  if (volhistory.length > 360 ){
    volhistory.splice(0,1);
  };



  image(pg_amp,256,0);

  // - Date Display - //
  pg_date.background(20);
  pg_date.noStroke();
  pg_date.fill(0, 102, 153);
  pg_date.textSize(20);
  pg_date.text(''+dates[part.partStep], 25,50);
  image(pg_date,325,0);

  // - Electricity Label - //
  pg_r.background(20);
  pg_r.fill(0,102,153);
  pg_r.noStroke();
  pg_r.textSize(10);
  pg_r.text('Percentage of island supplied with electricity', 25, 100);
  pg_r.tint(r);
  if(rates[part.partStep]>2.01){
    pg_r.fill(110+r,110+r,110+r);
  }else {
    pg_r.fill(r,r,r);
  };
  pg_r.textSize(80);
  pg_r.strokeWeight(1);
  pg_r.stroke(0,102,153);
  pg_r.text(''+Math.round(constrain(map(energy.get(part.partStep,1),5000000,60000000,20,125),2,99.1535887654)), 60+25, 60);
  image(pg_r,0,200);

  pg_timeline.background(20);
  pg_timeline.fill(0,102,153);
  pg_timeline.noStroke();
  pg_timeline.textSize(10);
  pg_timeline.text('Jan', 50, 62);
  pg_timeline.text('Dec', 400, 62);
  pg_timeline.stroke(0,102,153);
  pg_timeline.strokeWeight(1)
  pg_timeline.line(50, 45, 415, 45);
  pg_timeline.strokeWeight(.8 );
  pg_timeline.line(part.partStep+50,50,part.partStep+50,40);
  image(pg_timeline,300,500);

};
