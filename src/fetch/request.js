/**
 * fetch 网络请求超时处理
 * @param original_promise 原始的fetch
 * @param timeout 超时时间 30s
 * @returns {Promise.<*>}
 */


const timeout_fetch= (fetch_promise,timeout = 30000) =>{
  let timeoutBlock = () => {}

  //这是一个可以被reject的promise
  let timeout_promise = new Promise(function(resolve, reject) {
    timeoutBlock = () => {
      reject('timeout promise');
    }
  });

  //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
  let abortable_promise = Promise.race([
    fetch_promise,
    timeout_promise
  ]);

  setTimeout(function() {
    timeoutBlock();
  }, timeout);

  return abortable_promise ;
}

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST，只能大写
 * @param {JSON} [params=''] body的请求参数，默认为空
 * @return 返回Promise
 */
let base_url = 'http://120.79.10.79/';  //服务器地址

import Loading from '../utils/loading'
import Toast from '../utils/toast'
export const fetchRequest = (url, params={}, method="POST") => {
  method = method.toUpperCase()
  let options = {
    method,
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
  }
  if (method === 'POST') {
    options.body = JSON.stringify(params)
  }
  //  loading加载
  Loading.show()
  return new Promise(function (resolve, reject) {
    timeout_fetch(fetch(base_url + url, options))
      .then((response) => response.json())
      .then((response) => {
        //  隐藏loading
        Loading.hidden()
        if (response.status_code === 200) {
          //网络请求成功返回的数据
          resolve(response);
        } else {
          reject(response);
        }
      }).catch((err) => {
        Loading.hidden()
        Toast.show(err)
        //网络请求失败返回的数据
        reject(err);
      })
  })
}
export const uploadImage = (url,params) => {
  //  loading加载
  Loading.show()
  return new Promise(function (resolve, reject) {
    let formData = new FormData();
    for (var key in params){
      formData.append(key, params[key])
    }
    let file = {
      uri: params.file,
      type: 'multipart/form-data',
      name: 'image.jpg'
    };
    formData.append("pic_class", file);
    fetch(base_url + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
      },
      body: formData,
    }).then((response) => response.json())
      .then((responseData)=> {
        //  隐藏loading
        Loading.hidden()
        resolve(responseData);
      })
      .catch((err)=> {
        //  隐藏loading
        Loading.hidden(()=> {
          Toast.show(err)
        })
        reject(err);
      });
  });
}
export default fetchRequest