import axios from 'axios';
import { getRedirectPath } from '../util';

// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';  
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  // pwd : '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload}
    case LOAD_DATA:
      return  {...state, ...action.payload }  
    case ERROR_MSG: 
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
  return state;
}

// function registerSuccess(data) {
//   return {type: REGISTER_SUCCESS, payload: data}
// }

// function loginSuccess(data) {
//   return { type: LOGIN_SUCCESS, payload: data}
// }
function authSuccess(obj) {
  const { pwd, ...data} = obj; //  过滤某个属性
  return { type: AUTH_SUCCESS, payload: data }
}
function errMsg(msg) {
  return { msg, type: ERROR_MSG};
}
export function loadData(userinfo) {
  console.log(userinfo);
  return { type: LOAD_DATA, payload: userinfo}
}

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
  }
}

export function login({user, pwd}) {
  if (!user || !pwd) {
    return errMsg('用户名密码必须输入'); 
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data));  
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
      .catch(err => {
        console.log(err);
        // console.log(e  rr, 33);
      });
  }
}  
export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !repeatpwd) {
    return errMsg('用户名密码必须输入');
  }
  if (pwd !== repeatpwd) {
    return errMsg('两次密码输入不一致');
  }
  return dispatch => {
    axios.post('/user/register', { user,pwd, type })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess({ user, pwd, type }));
        } else {
          dispatch(errMsg(res.data.msg));
        }
      })
      .catch(err => {
        console.log(err);
        // console.log(e  rr, 33);
      });
  }
}