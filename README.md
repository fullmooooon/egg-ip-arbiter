# egg-ip-arbiter
throttle ip middleware for egg.js

Put 'ip-arbiter.js' in folder 'middleware'

config.default.js add following code
```
  config.ipArbiter={
    times:'3',//次数
    timeLength:10*1000,//毫秒数
    pathnameArr:[
      '/test'
    ]
  }
```