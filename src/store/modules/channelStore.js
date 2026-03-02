import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const channelStore = createSlice({
    name: 'channel',
    initialState: {
        channelList: []
    },
    reducers: {
        setChannelList: (state, action) => {
            state.channelList = action.payload
        },
        addChannel: (state, action) => {
            state.channelList.push(action.payload)
        },
        removeChannel: (state, action) => {
            state.channelList = state.channelList.filter(item => item.id !== action.payload)
        }
    }
})

//异步请求部分

export const {setChannelList, addChannel, removeChannel} = channelStore.actions

const fetchChannelList = () => {
    return async (dispatch) => {
        const res = await axios.get('http://geek.itheima.net/v1_0/channels')
        dispatch(setChannelList(res.data.data.channels))

    }
}

export {fetchChannelList}

export default channelStore.reducer

