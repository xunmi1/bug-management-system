import axios from "axios/index";

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
    token: '12345678'  // 本地数据
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
    async getInfo(context) {
        // 通过本地的 token，请求用户数据
        if (context.state.token) {
            // 开发调试模式，默认设为 123456
            console.log('开发调试模式，默认设为 123456');
            context.commit('setUserName', {name: '123456'});
            return '123456';
        }
    },
    async loginCheck(context, info) {
        const response = await axios.post('/api/login', {
            username: info.name,
            password: info.pwd
        });
        console.dir(response.data);
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
        await axios.post('/api/user', info)
            .then((response) => {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error.data);
            });
    },
    async postSafe(context, info) {
        context.commit('setUserPwd', info);
        await axios.post('/api/user', info)
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
