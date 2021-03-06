/**
 * 让fetch也可以timeout
 *  timeout不是请求连接超时的含义，它表示请求的response时间，包括请求的连接、服务器处理及服务器响应回来的时间
 * fetch的timeout即使超时发生了，本次请求也不会被abort丢弃掉，它在后台仍然会发送到服务器端，只是本次请求的响应内容被丢弃而已
 * @param {Promise} fetch_promise    fetch请求返回的Promise
 * @param {number} [timeout=10000]   单位：毫秒，这里设置默认超时时间为10秒
 * @return 返回Promise
 */
function timeout_fetch(fetch_promise,timeout = 30000) {
  let timeout_fn = null;

  //这是一个可以被reject的promise
  let timeout_promise = new Promise(function(resolve, reject) {
    timeout_fn = function() {
      reject('timeout promise');
    };
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortable_promise = Promise.race([
    fetch_promise,
    timeout_promise
  ]);

  setTimeout(function() {
    timeout_fn();
  }, timeout);

  return abortable_promise ;
}

import {Toast} from 'antd-mobile'

let common_url = 'http://120.79.10.79/';  //服务器地址
/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
function fetchRequest(config) {
  let _url = common_url + config.url
  let _params = config.params || {}
  let _method = config.method || 'post'
  //  如果请求方式存在
  if (_method) {
    _method = _method.toLocaleUpperCase()
  }
  let _header = {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  };
  let _options = {
    method: _method,
    headers: _header
  }
  //  get 请求带参数
  if (_method === 'GET' && Object.keys(_params).length > 0) {
    let paramsArray = [];
    //拼接参数
    Object.keys(_params).forEach(
      key => paramsArray.push(key + '=' + _params[key])
    )
    if (_url.search(/\?/) === -1) {
      _url += '?' + paramsArray.join('&')
    } else {
      _url += '&' + paramsArray.join('&')
    }
  }
  if (_method === 'POST') {
    _options.body = JSON.stringify(_params)
  }
  //  loading加载
  Toast.loading('加载中...', 0)
  return new Promise(function (resolve, reject) {
    timeout_fetch(fetch(_url,_options))
      .then((response) => response.json())
      .then((response) => {
        //网络请求成功返回的数据
        Toast.hide()
        resolve(response)
      })
      .catch((err) => {
        Toast.hide()
        //网络请求失败返回的数据
        reject(err)
      })
  })
}
// 上传图片
export const fetchImage = (config) => {
  let _url = common_url + config.url
  let _params = config.params
  let formData = new FormData()
  for (let key in _params){
    formData.append(key, _params[key])
  }
  let file = {
    uri: _params.file,
    type: 'multipart/form-data',
    name: 'image.jpg'
  };

  formData.append("pic_class", file)

  return new Promise(function (resolve, reject) {
    timeout_fetch(fetch(_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
      },
      body: formData
    })).then((response) => response.json())
      .then((response)=> {
        resolve(response)
      })
      .catch((err)=> {
        reject(err)
      })
  })
}