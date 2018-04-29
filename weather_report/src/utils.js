import {csv} from 'd3';

export const parse = d => {
  //NAME,DATE,TAVG,TMAX,TMIN
  const name = d.name;
  const date = new Date (d.date);
  const tavg = d.tavg;
  const tmax = d.tmax;
  const tmin = d.tmin;
  return{
    name: name,
    date: date,
    tavg: tavg,
    tmax: tmax,
    tmin: tmin
  };
}

// export const fetchCsv = (url, parse) => {
// 	return new Promise((resolve, reject) => {
// 		csv(url, parse, (err, data) => {
// 			if(err){
// 				reject(err);
// 			}else{
// 				resolve(data);
// 			}
// 		})
// 	});
// }
