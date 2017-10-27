import axios from 'axios';
import {CONSTANT} from './constant';

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  CONSTANT.methods.loading('open');
  return config;
}, function (error) {
  CONSTANT.methods.loading('close');
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  CONSTANT.methods.loading('close');
  return response;
}, function (error) {
  CONSTANT.methods.loading('close');
  return Promise.reject(error);
});

//  登录接口
export function _loginIn (user) {
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.LOGIN,
      data: {
        params: user
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
//  退出登录
export function _logout () {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.LOGOUT,
      data: {
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
//  获取个人信息
export function _getUserInfo () {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETPERSONALINFO,
      data: {
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
//  修改个人信息
export function _updateUserInfo (user) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.UPDATEPERSONALINFO,
      data: {
        params: {
          email: user.email
        }
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
//  获取七牛上传uptoken
export function _getQiniuUptoken () {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETQINIUTOKEN,
      data: {
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 新增轮播图
export function _addSlideshow (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.ADDSLIDESHOW,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取轮播图list
export function _getSlideShowList (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETSLIDESHOWLIST,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 根据id获取轮播图信息
export function _getSlideShow (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETSLIDESHOW,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 修改轮播图
export function _updateSlideshow (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.UPDATESLIDESHOW,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 删除轮播图
export function _deleteSlideshow (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.DELETESLIDESHOW,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取首页公司简介信息
export function _getCompanyProfile () {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETCOMPANYPROFILE,
      data: {
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 编辑首页公司简介信息
export function _updateCompanyProfile (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.UPDATECOMPANYPROFILE,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取首页信息
export function _getHomePage () {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETHOMEPAGE,
      data: {
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取用户列表
export function _getUserList (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETUSERLIST,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 新增用户
export function _addUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.ADDUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取用户详情
export function _getUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 编辑用户
export function _updateUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.UPDATEUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 禁用用户
export function _disableUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.DISABLEUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 启用用户
export function _enableUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.ENABLEUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
export function _deleteUser (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.DELETEUSER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 获取客户一览
export function _getCustomerList (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETCUSTOMERLIST,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 新增客户
export function _addCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.ADDCUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 查看客户详情
export function _getCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.GETCUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 编辑客户详情
export function _updateCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.UPDATECUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 禁用客户详情
export function _disableCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.DISABLECUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 启用客户详情
export function _enableCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.ENABLECUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
// 删除客户详情
export function _deleteCustomer (params) {
  var jwtToken = localStorage.getItem('jwtToken');

  if (!jwtToken) {
    location.href = location.origin + '/#/login'
  }
  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: CONSTANT.api.DELETECUSTOMER,
      data: {
        params: params
      },
      headers: {
        'Authorization': jwtToken
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}

//  获取导航菜单
export function _getMenu () {

  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: '/static',
      data: {

      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}

//  获取微信openid
export function _test () {


  return new Promise(function (resolve, reject) {
    axios({
      method: 'post',
      url: '/portal/enterprise/editWholeGroup',
      data: {

        "enterpriseId":235604,
        "forbidTalkUserNumbers":[66252576,66570070,66580691,66618105],
        "isIncludeHidden":1,
        "isIncludeViewself":0

      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}
export function _testJava () {


  return new Promise(function (resolve, reject) {
    axios({
      method: 'get',
      url: '/getHomePage',
      data: {

      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(function (response) {
      resolve(response);
    }).catch(function (response) {
      reject(response);
    })
  });

}