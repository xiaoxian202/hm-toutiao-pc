// 提供操作本地户用信息的相关函数

//sessionStorage进行存储
//保存--setItem('键名'，'具体数据，必须是字符串格式')
//获取--getItem('键名')
//删除--removeItem('键名')
const KEY = 'hm-toutiao-cp-user' 

/**
 * 保存用户信息
 * @param:是对参数的解释
 * @param {object} user -使用户信息对象
 */
const setUser = user => {
    window.sessionStorage.setItem(KEY,JSON.stringify(user))
}

/**
 *获取用户信息
 */
const getUser = () => {
    const localUser =  window.sessionStorage.getItem(KEY)
    return JSON.parse(localUser || '{}')
}

/**
 * 删除用户信息
 */
const delUser = () => {
    window.sessionStorage.removeItem(KEY)
}

// 导出函数
export default {setUser,getUser,delUser}