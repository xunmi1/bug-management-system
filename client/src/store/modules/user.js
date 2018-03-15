import axios from "axios/index";
import VueCookie from 'vue-cookie';

axios.defaults.withCredentials = true;

const state = {
    userInfo: {
        userId: '11111111',
        name: '123456',
        pwd: '',
        email: '',
        desc: '',
        avatarId: '',
        status: 0, // 0: 用户不存在，1: 密码错误，2: 同时登录，3: 登录成功
    },
    token: ''  // 本地数据
};

const mutations = {
    setUserName(state, info) {
        state.userInfo.name = info.name;
    },
    setUserPwd(state, info) {
        state.userInfo.pwd = info.pwd;
    },
    setUserEmail(state, info) {
        state.userInfo.email = info.email;
    },
    setUserAvatarId(state, info) {
        state.userInfo.avatarId = info.avatarId;
    },
    setUserDesc(state, info) {
        state.userInfo.desc = info.desc;
    },
    setUserStatus(state, status) {
        state.userInfo.status = status;
    },
    setToken(state, token) {
        state.token = token;
    }
};

const actions = {
    nameCheck(context, info) {
        // 向服务器验证是否已存在
        if (true) {

        } else {
            context.commit('setUserName', info);
        }
    },
    async userCheck(context) {
        // 通过请求所携带的 cookie，请求用户数据
        const res = await axios.post(process.env.API_HOST + '/check');
        if (res.data.status >= 3) {
            if (res.data.status === 4) {
                context.commit('setToken', res.data.token);
                VueCookie.set('userToken', res.data.token, {expires: '7D'});
            }
            return true;
        } else {
            return false;
        }
    },
    async loginCheck(context, info) {
        const response = await axios.post(process.env.API_HOST + '/login', {
            username: info.name,
            password: info.pwd
        });
        context.commit('setUserStatus', response.data.status);
        context.commit('setToken', response.data.token);
        if (context.state.token) {
            if (context.state.userInfo.status === 3) {
                context.commit('setUserName', info);
                context.commit('setUserPwd', info);
            }
        }
    },
    async postInfo(context, info) {
        context.commit('setUserName', info);
        context.commit('setUserEmail', info);
        context.commit('setUserDesc', info);
        await axios.post(process.env.API_HOST + '/user', info)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    },
    async postSafe(context, info) {
        context.commit('setUserPwd', info);
        await axios.post(process.env.API_HOST + '/user', info)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    }
};

const user = {
    state,
    actions,
    mutations,
};

export default user;
