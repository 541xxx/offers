import axios from 'axios';
import { getRedirectPath } from '../util';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';

const initState = {
  isAuth: '',
  msg: '',
  user: '',
  pwd: '',
  type: ''
}
// reducer
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS:
      return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    default:
      return state;
  }
  return state;
}

function registerSuccess(data) {
  return {type: REGISTER_SUCCESS, payload: data}
}

function errMsg(msg) {
  return { msg, type: ERROR_MSG};
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
          dispatch(registerSuccess({ user, pwd, type }));
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