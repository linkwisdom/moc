var ms = require('../');

// 脱离edp直接运行mock服务
var argv = process.argv;
if (argv[1] == __filename) {
    /**
     * 通过scan-start
     * - 修改默认配置
     * - 增加处理逻辑
     */
    ms.on('scan-start', function(config) {
        console.log('%s', JSON.stringify(config, '\t', 2));
    });
    
    /**
     * 通过scan-end
     * - 修改默认配置
     * - 增加处理逻辑
     */
    ms.on('scan-end', function(scan) {
        console.log('%s', JSON.stringify(scan.dynamicList, '\t', 2));
    });

    /**
     * 通过query-start事件
     * - 默认结果为请求对象
     * - 可以修改请求url及GET参数
     * - 可以修改POST数据
     * - 可以监控请求
     */
    ms.on('query-start', function(request) {
        console.log('%s', request.pathname);
    });

    /**
     * 通过query-ready事件
     * - 默认参数为上下文对象
     * - query-ready时上下文解析成功准备调用处理函数
     * - 可以修改请求参数及上下文的解析
     * - 可以修改header等信息
     */
    ms.on('query-ready', function(context) {
        console.log('path = %s ', context.path);
    });

    /**
     * 请求response-start事件
     * - 默认参数为请求返回结果
     * - 可以修改请求返回结果
     * - 自定义返回格式
     * - 自定义异常处理等
     */
    ms.on('response-start', function(result) {
        console.log(JSON.stringify(result));
    });

    ms.config([
        {
            dir: './response',
            logError: {
                logFile: 'ms-error-log'
            }
        },
        {
            name: 'debug',
            dir: './debug'
        },
        {
            name: 'service',
            dir: './service'
        }
    ]);
    
    ms.listen(argv[2] || 8848);
}