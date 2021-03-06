
/**
 * 请求解析出path和param
 * - 如果业务参数与默认接口格式不一致；通过扩展这个接口即可
 * 
 * @param {http.ClientRequest} request 客户端请求
 * @param {http.ServerResponse} response 服务端响应对象
 */
function getContext(request, response) {
    var query= request.query; // 请求GET参数
    var body = exports.getBody(request); // 请求POST参数
    var param = exports.getQueryParam(request);
    var path = exports.getQueryPath(request);
    
    // param 解析为对象
    if (param && 'string' == typeof param) {
        param = exports.parseParams(param);
    }

    return {
        path: path,
        param: param,
        GET: query,
        POST: body
    };
}

/**
 * 如果参数是字符串、解析为json
 * 
 * @param {string} param
 * @return {object} json结果
 */
exports.parseParams = function(param) {
    try {
        // 符合标准json格式的处理
        param = JSON.parse(param);
    } catch (ex) {
        // 对于不规范的json对象额外处理
        param = eval( '(' + param + ')');
    } finally {
        return param;
    }
};

/**
 * 对post数据进行解析
 * 
 * @param {Request} request
 * @return {Object}
 */
exports.getBody = function (request) {
    var body = request.body || '';

    // 如果是post过来的请求
    if (body) {
        body = body.toString();
        body = require('querystring').parse(body);
        request.body = body;
    }

    return body;
};

/**
 * 根据请求获取路径信息
 * 
 * @param {Request} request
 * @return {string}
 */
exports.getQueryPath = function (request) {
    var query = request.query;
    var body = request.body || {};

    // 支持param和params两种参数接口
    var path = query.path || body.path;

    // 如果未指定path, 以url.pathname作为path值
    if (!path) {
        // 删除请求后缀，如果有
        if (global.postfix) {
            path = request.pathname;
        } else {
            path = request.pathname.replace(/\.\w{1,5}$/, '');
        }

        // 删除前缀 `/`
        if (path.charAt(0) == '/') {
            path = path.substr(1);
        }
    }

    if (path) {
        // 这是为了兼容各种系统路径结构问题
        // 所有`/`转为`_`方便mock接口命名
        path = path.replace(/\//g, '_');
    }

    return path;
};

/**
 * 更加请求获取请求参数
 * 
 * @param {Request} request
 * @return {Object}
 */
exports.getQueryParam = function (request) {
    var query = request.query;
    var body = request.body;
    var param = null;

console.log(body);

    if (body) {
        param = body.param || body.params || body;
    }

    if (!param && query) {
        param = query.param || query.params || query;
    }

    return param || {};
};

/**
 * 作为公共接口
 * 
 * @type {function}
 */
exports.getContext = getContext;