# serverless-framework

## Developement

### Deploy

Deploy serverless.yml changes

```
> sls deploy --verbose
```

Deploy function changes only

```
> sls deploy function -f <function name>
```

### Logs

Watch logs for a function

```
sls logs -f <function name> -t
```

Show all logs for a function

```
sls logs -f <function name> -t
```

Show all logs for a function number of minutes ago

```
sls logs -f <function name> --startTime <[1m | 5m | 10m]>
```

### Invoke Function

```
> sls invoke -f <function name> -l
```

## Resources

[AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)

[@aws-sdk/client-dynamodb](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/)

[@aws-sdk/client-sesv2](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-sesv2/)
