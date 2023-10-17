import S3 from "aws-sdk/clients/s3";
import { NextResponse } from "next/server";
export async function POST(req) {
  // create dev and prod buckets
  const s3 = new S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    signatureVersion: "v4",
  });

  console.log("HITTING UPLOAD ROUTE");
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method not allowed" });
  }

  try {
    const data = await req.json();
    const { name, type } = data;

    const fileParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    return NextResponse.json({ url });
  } catch (err) {
    console.log("ERROR--->", err);
    return NextResponse.json({ message: err });
  }
}
