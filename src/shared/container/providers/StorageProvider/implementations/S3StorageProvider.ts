import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import { resolve } from "path";

import upload from "@configs/upload";

import { IStorageProvider } from "../IStorageProvider";

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_BUCKET_REGION,
    });
  }
  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);
    console.log(originalName);

    const fileContent = await fs.promises.readFile(originalName);

    const ContentType = mime.getType(originalName);
    console.log(ContentType);

    await this.client
      .putObject({
        Bucket: `${process.env.BUCKET_NAME}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }
  async delete(file: string, folder: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: `${process.env.BUCKET_NAME}/${folder}`,
        Key: file,
      })
      .promise();
  }
}

export { S3StorageProvider };
