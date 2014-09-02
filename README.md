moc [![NPM version](https://badge.fury.io/js/moc.png)](https://npmjs.org/package/moc) [![Dependencies Status](https://david-dm.org/linkwisdom/moc.png)](https://david-dm.org/linkwisdom/moc)

===========

> 构造数据服务

- moc组件为mockservice的通用升级版本
- 增加任意path`多级文件结构path匹配规则`
- 增加`query为请求字段`

即如下请求方式都可以支持

http://localhost:8848/GET/budy?uid=123
http://localhost:8848/GET/budy?params={uid:123}
http://localhost:8848/GET/budy?params={uid:123}
http://localhost:8848/request.ajax?path=GET/budy&params={uid:123}

具体的使用方法与[mockservice](https://github.com/linkwisdom/mockserivce)一致
---------------------------

## 安装与配置


### 选择npm安装

> npm install mock

### gitub安装 (需要支持git协议)

> npm install git://github.com/linkwisdom/moc.git




