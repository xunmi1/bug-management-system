import axios from "axios/index";
import qs from 'qs';

const state = {
    userInfo: {
        name: '',
        pwd: '',
        email: '',
        text: '',
        avatarId: '',
        localStating: '', // 当前页面判断依据
        dbStating: '' // 将在后台判断用户是否同时在线
    }
};

const mutations = {
    setUserName(state, info) {
        state.userInfo.name = info.name;
    },
    setUserPwd(state, info) {
        state.userInfo.pwd = info.pwd;
    },
    setUserLocalStating(state, info) {
        state.userInfo.localStating = info.localStating;
    },
    setUserAvatarId(state, info) {
        state.userInfo.avatarId = info.avatarId;
    },
};

const actions = {
    nameCheck(context, info) {
        // 向服务器验证是否已存在
        if (true) {

        } else {
            context.commit('setUserName', info);
        }
    },
    pwdCheck(context, info) {
        if (true) {

        } else {
            context.commit('setUserPwd', info);
        }
    },
    async loginCheck(context, info) {
        context.commit('setUserName', info);
        context.commit('setUserPwd', info);
        await axios.post('/api/login', qs.stringify({
            username: context.state.userInfo.name,
            password: context.state.userInfo.pwd
        }))
            .then((response) => {
                // console.log(response.data);
                if (!state.userInfo.dbStating) {
                    context.commit('setUserLocalStating', {
                        localStating: response.data
                    });
                }
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
