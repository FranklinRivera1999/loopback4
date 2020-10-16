import {S3} from 'aws-sdk';

export class SpaceService {

  s3: S3;
  bucket: any;

  constructor() {

    this.s3 = new S3({
      endpoint: process.env.ENDPOINT,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    })
    this.bucket = process.env.BUCKET_NAME
  }

  getURLfile(time: number, key: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: this.bucket,
      Key: key,
      Expires: time
    })
  }

  getUrlUpload(key: string, expireSeconds: number) {
    let params = {
      Bucket: this.bucket,
      Key: key,
      ACL: "public-read",
      Expires: expireSeconds
    }
    console.log('PARAMS', params)
    return this.s3.getSignedUrl('putObject', params)
  }

  async deleteFile(key: string) {
    return new Promise((resolve, reject) => {
      let params = {
        Bucket: this.bucket,
        Key: key
      }

      this.s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log(err, err.stack)
          return reject(err)
        }
        return resolve(data)
      })
    })
  }

}
