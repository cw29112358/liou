const fetch = require('node-fetch');
const chunk = require('lodash/chunk');
// const async = require('async');

const images = [
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/0',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/1',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/2',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/3',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/4',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/5',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/6',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/7',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/8',
  'https://interview-1255573639.cos.ap-shanghai.myqcloud.com/9',
];

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
const download = (url) => fetch(url)
  .then((response) => response.text())
  .then(console.log);
const parallelDownload = (urls) => Promise.all(urls.map(download));
const serialDownload = (previousDownload, urls) => previousDownload
  .then(() => parallelDownload(urls));
const serialDownloadWithDelay = (previousDownload, urls) => serialDownload(previousDownload, urls)
  .then(() => delay(1000));
const downloadImages = (imagesArray) => {
  const chunks = chunk(imagesArray, 2);
  chunks.reduce(serialDownloadWithDelay, Promise.resolve());
};

// const downloadImages = (imagesArray) => {
//   const download = (url) => fetch(url)
//     .then((response) => response.text())
//     .then(console.log);
//
//     async.mapSeries(images ,function(item, callback){
//
//       download(item).then(callback(null, item))
//     }, function(err, results){});
// };


// const downloadImages = (imagesArray) => {
//   async function a(){
//     for(let image of imagesArray){
//         await download(image)
//     }
//   }
//   return a();
// }


downloadImages(images);
