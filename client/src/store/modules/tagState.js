const state = {
    list: [
        {
            name: '我的项目',
            url: '/main/project',
            isChecked: true
        }
    ],
    tagIndex: '',
    isRedirect: true
};

const mutations = {
    tagAdd(state, item) {
        // 先将 tag 全部设为 false, 再将添加的设为true
        state.list.forEach(item => {
            item.isChecked = false;
        });
        const tmpItem = {
            name: item.name,
            url: item.url,
            isChecked: true
        };
        state.list.push(tmpItem);
    },

    tagClose(state, tag) {
        // tag 数量大于 1
        if (state.list.length > 1) {
            let tmp = tag.index;
            // 选择的 tag 为选中状态
            if (state.list[tag.index].isChecked) {
                /**
                 * 选择的 tag 改为未选择状态
                 * 选择的 tag 是最后一个，则将前一个 tag 设为选中状态
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
    // checked: 组件自带的 prop，index: 元素的 name 值
    tagChange(state, tag) {
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
