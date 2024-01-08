# Welcome to CDK TypeScript project

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Steps

- Installation of aws-cdk

```
npm install -g aws-cdk
cdk --version
npm install -g typescript
```

- CDK app initialization

```
cdk init app --language typescript
```

- Typescript app initialization

```
npm init -y
npx tsc --init
```

- Dependencies installation

```
npm install express aws-sdk dotenv
npm install -D ts-node ts-node-dev typescript @types/express @types/dotenv @types/node nodemon
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- Run backend app locally

```
cd backend
npm install
npm run start

# watch mode
npm run start:dev
```

- Run backend docker app locally

```
cd backend
docker build -t backend_image .
docker run -p 3000:3000 --name backend_app backend_image
```

- Deployment

```
npm run build
cdk bootstrap
cdk synth
cdk deploy --require-approval never
cdk destroy -f
```

## APIs
- `/healthcheck`
  
  ![image](https://github.com/ernitingarg/aws-cdk-typescript/assets/20875452/36d3a5dc-1ab9-4ff4-9192-3a40b6e5d5b4)

- `/generate`
  
  ![image](https://github.com/ernitingarg/aws-cdk-typescript/assets/20875452/82a2d73e-4276-45c7-9e5f-145f7a139f4a)

  ![image](https://github.com/ernitingarg/aws-cdk-typescript/assets/20875452/045a75b6-9ca1-4c0a-a7c2-080f758a08c5)

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
