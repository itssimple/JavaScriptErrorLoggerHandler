# JavaScript Error Logger / Handler

This is a small project that I got an idea from work, when a co-worker asked if we could
trap errors/exceptions from JavaScript and push into services like Exceptional.

Currently we have nothing like that, so I thought I'd make a module for it.

So basically, this is gonna be a small javascript-block that you're gonna put at the top
of your `head`-tag, so we can catch as much error as possible.

```html
<script type="text/javascript">
const EHLConfig = {
    RESTEndpoint: 'https://<exampledomain>/<restEndpoint>',
    WebSocketServer: 'wss://<exampledomain>',
    PushErrors: true
};
</script>
<script type="text/javascript" src="ELH.js"></script>
```
