module.exports = (options) => async function ipArbiter (ctx, next) {
    let pathname = ctx.URL.pathname// '/test'
    let times = options.times
    let timeLength = options.timeLength
    let pathnameArr = options.pathnameArr
    let ip = ctx.ip
    //无效路径
    if (!pathnameArr.includes(pathname)) {
        await next()
        return
    }
    //有效路径
    if (!global.ipArbiter) global.ipArbiter = {}
    if (!global.ipArbiter[ip]) global.ipArbiter[ip] = {}
    if (!global.ipArbiter[ip][pathname]) global.ipArbiter[ip][pathname] = []
    if (global.ipArbiter[ip][pathname].length >= times) {
        let lastTime = global.ipArbiter[ip][pathname][0]
        if (Date.now() - lastTime < timeLength) {
            ctx.body = {
                code: 500,
                fuckerrmsg: '你天天搁这请求你🐴呢'
            }
            return true
        } else {
            global.ipArbiter[ip][pathname].splice(0, 1)
        }
    }
    global.ipArbiter[ip][pathname].push(Date.now())
    await next();
    console.log('fkip');
}