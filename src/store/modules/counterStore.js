import {createSlice} from "@reduxjs/toolkit";

const counterStore = createSlice({
    name: 'counter',

    //初始化的状态
    initialState: {
        count_RTX: 0
    }, // 修改状态的方法 同步方法 支持直接修改state
    reducers: {
        increment: (state) => {
            state.count_RTX++
        }, decrement: (state) => {
            state.count_RTX--
        },
        addToNum: (state, action) => {
            state.count_RTX += action.payload
        },
        decNum: (state, action) => {
            state.count_RTX -= action.payload
        },
        reset: (state) => {
            state.count_RTX = 0
        }
    }
})

//解构出actionCreater函数
//以按需导出的方式导出
export const {increment, decrement, addToNum, decNum, reset} = counterStore.actions
//获取reducer
//export const counterReducer = counterStore.reducer


//默认导出的方式导出reducer
export default counterStore.reducer