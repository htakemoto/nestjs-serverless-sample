# NestJS Serverless Sample

You can obtain CI/CD to deploy NestJS project to Serverless stack (`API Gateway` and `Lambda`)

## Requirements

- AWS Account
- Node.js (verified on v14.4.0)
- NestJS and Serverless
  ```bash
  # install NestJS and Serverless packages
  npm i -g @nestjs/cli
  npm i -g serverless
  ```

## Deployment to AWS Lambda

Deploying this NextJS project to AWS Lambda is involved with the following AWS services:

- IAM *
- S3 *
- CloudFormation
- Lambda
- API Gateway
- CloudWatch

Note: star(*) indicates the service you need to access and configure

### Setup

Note that the below steps grant the Serverless Framework administrative access to your account. While this makes things simple when you are just starting out, we recommend that you create and use more fine grained permissions once you determine the scope of your serverless applications and move them into production.

1. Login to your AWS Account and go to IAM page.
2. Click on **Users** and then **Add user**. Enter a name in the first field to remind you this User is related to the Service you are deploying with the Serverless Framework, like `serverless-admin`. Enable **Programmatic access** by clicking the checkbox. Click **Next** to go through to the Permissions page. Click on **Attach existing policies directly**. Search for and select **AdministratorAccess** then click **Next: Review**. Check to make sure everything looks good and click **Create user**.
3. View and copy the **API Key & Secret** to a temporary place. You'll need it in the next step.
4. Create one S3 bucket on **US-EAST-1** for storing CloudFormation template and package files. (For this project, `cloudformation-nestjs-serverless-sample` bucket has been configured on `serverless.yml`.)
5. Update `serverless.yml` on `profile` and `deploymentBucket` fields for your own
6. Install **AWS CLI 2** from AWS
    ```bash
    # make sure you installed AWS CLI 2
    aws --version
    ```
7. Setup AWS credentials (profile part is optional)<br>
   (profile is useful to manage multiple AWS credentials on your local)
    ```bash
    aws configure --profile YOUR_PROFILE
    ```

### Deploy

```bash
npm run deploy:dev  # for dev
npm run deploy:prod # for prod
```

Note: if you get error, try again or print debug information with the following command:

```bash
SLS_DEBUG=1 serverless deploy > deploy.log
```

Invoke deployed function

```bash
# through rest call
curl https://XXXXXXXXXX.execute-api.ap-northeast-1.amazonaws.com/dev/
# through serverless command
serverless invoke -f index
```

## Local Test

```bash
# start nestjs project on your local
serverless offline
```

## Serverless Tips

Remove serverless stack from AWS

```bash
# remove all components (API Gateway, Lambda, CloudFormation) but except for S3
serverless remove --stage dev --region us-east-1
# remove S3
aws s3 rm s3://bucket-name/serverless/nestjs-serverless-sample/dev --recursive
```

## How to Create This Template Project from Scratch

Here is the steps I went through to create this project, but you can skip this part if you are not interested in how I created this project.

```bash
# create nestjs project
nest new nestjs-serverless-sample
cd nestjs-serverless-sample
# import required plugins
npm i -S aws-lambda aws-serverless-express express
npm i -D @types/aws-serverless-express serverless-layers serverless-offline
npm i -S @nestjs/config
# add lambda function root file. This will wrap NestJS main.ts
touch src/index.ts
# add deployment config
touch serverless.yml
touch .env
```

I also edited `package.json` to add deploy commands:

```js
"scripts": {
  // ...
  "deploy:dev": "nest build && serverless deploy",
  "deploy:prod": "nest build && serverless deploy --stage prod"
  // ...
}
```
