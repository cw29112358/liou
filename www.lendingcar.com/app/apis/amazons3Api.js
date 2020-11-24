import AWS from 'aws-sdk';
import {
  S3_BUCKET_REGION, S3_ACCE_KEY_ID, S3_SECREDT_ACCE_KEY,
} from 'configs/amazons3-config';
import { getFileMimeTypeByFileExt } from 'utils/helpers';

export const S3_IMG_BUCKET_NAME = 'img.lendingcar.com';
export const IMG_ENDPOINT = 'inventories';
export const DOC_ENDPOINT = 'documentsForTest';

AWS.config.update({
  region: S3_BUCKET_REGION,
  accessKeyId: S3_ACCE_KEY_ID,
  secretAccessKey: S3_SECREDT_ACCE_KEY,
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: S3_IMG_BUCKET_NAME },
});

class Amazons3Api {
  static uploadFile(filePath, fileBlob) {
    const params = {
      Key: filePath,
      Body: fileBlob,
      Bucket: S3_IMG_BUCKET_NAME,
      ACL: 'public-read',
      ContentType: getFileMimeTypeByFileExt(filePath),
    };
    const s3promise = s3.upload(params).promise();
    return s3promise;
  }

  static uploadImageFile(fileName, fileBlob) {
    const filePath = `${IMG_ENDPOINT}/${fileName}.jpg`;
    const params = {
      Key: filePath,
      Body: fileBlob,
      Bucket: S3_IMG_BUCKET_NAME,
      ACL: 'public-read',
    };
    const s3promise = s3.upload(params).promise();
    return s3promise;
  }

  // static uploadCSVFile(fileName, fileBlob) {
  //   const filePath = `${DOC_ENDPOINT}/${fileName}.csv`;
  //   const params = {
  //     Key: filePath,
  //     Body: fileBlob,
  //     Bucket: S3_IMG_BUCKET_NAME,
  //     ACL: 'public-read',
  //   };
  //   const s3promise = s3.upload(params).promise();
  //   return s3promise;
  // }
}

// function deletePhoto(fileName) {
//   const fileKey = `${S3_IMG_ENDPOINT}/${fileName}`;
//   s3.deleteObject({
//     Key: fileKey,
//   }, (err, data) => {
//     if (err) {
//       return alert('There was an error deleting your photo: ', err.message, ', data: ', data);
//     }
//     return alert('Successfully deleted photo.');
//   });
// }

export default Amazons3Api;
