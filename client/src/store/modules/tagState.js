const state = {
    list: [],
    menuList: {
        projectInfo: {
            title: '项目信息',
            name: 'ProjectInfo'
        },
        projectPeople: {
            title: '成员管理',
            name: 'ProjectPeople'
        },
        projectModules: {
            title: '功能模块',
            name: 'ProjectModules'
        },
        projectVersions: {
            title: '版本管理',
            name: 'ProjectVersions'
        },
        userProject: {
            title: '我的项目',
            name: 'TheProject'
        },
        retrieval: {
            title: 'BUG 检索',
            name: ''
        },
        user: {
            title: '账号设置',
            name: 'TheUserInfo'
        },
        newProject: {
            title: '新建项目',
            name: 'TheNewProject'
        },
        console: {
            title: '项目概况',
            name: ''

        }
    },
    tagIndex: Number,
    isRedirect: true // tag 组件被点击，判断是否跳转
};

const mutations = {
    // tagAdd 由 Main 组件触发，tagClose、tagChange 由 tag 组件触发
    tagAdd(state, item) {
        /**
         * 先将 tag 全部设为 false,
         * 如果需要添加，则将要添加的 tag 设为 true
         * 否则，将激活项对应的 tag 设为 true
         */
        let isAdd = true;
        state.list.forEach((i, index) => {
            i.isChecked = false;
            if (i.tag === item.tag) {
                isAdd = false;
                state.tagIndex = index;
            }
        });
        if (isAdd) {
            const tmpItem = {
                tag: item.tag,
                title: item.title,
                name: item.name,
                isChecked: true
            };
            state.list.push(tmpItem);
        } else {
            state.list[state.tagIndex].isChecked = true;
        }
    },

    tagClose(state, tag) {
        // tag 数量大于 1
        if (state.list.length > 1) {
            let tmp = tag.index;
            // 选择的 tag 为选中状态
            if (state.list[tag.index].isChecked) {
                /**
                 * 选择的 tag 改为未选择状态
                 * 若选择的 tag 是最后一个，则将前一个 tag 设为选中状态
                 * 否则，后一个 tag 设为选中状态
                 */
                state.list[tag.index].isChecked = false;
                if (tag.index === state.list.length - 1) {
                    tmp = tmp - 1;
                    state.list[tmp].isChecked = true;
                } else {
                    state.list[tag.index + 1].isChecked = true;
                }
                state.isRedirect = true;
            } else {
                state.isRedirect = false;
            }
            state.tagIndex = tmp;
            state.list.splice(tag.index, 1);
        }
    },

    tagChange(state, tag) {
        // index: 元素的 name 值 (索引值)
        if (!state.list[tag.index].isChecked) {
            state.list.forEach(item => {
                item.isChecked = false;
            });
            state.list[tag.index].isChecked = true;
            state.isRedirect = true;
        } else {
            state.isRedirect = false;
        }
    }
};

const tagState = {
    state,
    mutations
};

export default tagState;
