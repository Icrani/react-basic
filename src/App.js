import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import './css/index.css'
import * as Redux from 'redux'
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {decrement, increment, addToNum, decNum, reset} from "./store/modules/counterStore";


// import _ from 'lodash' //引入lodash
// import classNames from "classnames"; //引入classNames
// npm i uuid //安装uuid
// import {v4 as uuidV4} from 'uuid' //引入uuid
//使用uuid：uuidV4()
//uuidV4()的返回值就是一个随机的ID

import * as dayjs from 'dayjs'
import {fetchChannelList} from "./store/modules/channelStore";


//父传子
//父组件中name1={name2}，name1与子组件中props中的键name1一致，name2与父组件中定义的const name2 一致
//子组件只能读取props属性，不能修改props属性
const name = 'this is a app name'

function Son(props) {
    // console.log('props', props)
    return (<div>
        this is son: {props.name}
    </div>)
}

//子组件中，props.children，可以直接获取子组件标签中的内容
const Son1 = (props) => {
    return (
        <div>
            <span>
                this is a Son1:{props.children}
            </span>
        </div>
    )
}


//子传父
function Son2({onGetMessage}) {
    const Son2Message = 'this is son2 message'
    return (<div>
        this is a son2
        <button
            onClick={() => onGetMessage(Son2Message)}>SendMessage</button>  {/*onClick={() => props.fn('jack', 18)}*/}
    </div>)
}


function A({onGetAName}) {
    const AName = 'this is a A name'
    return (<div>
        this is A component
        <button onClick={() => {
            onGetAName(AName)
        }}>send</button>
    </div>)
}

function B(props) {
    // console.log('B', props)
    return (<div>
        this is B component: {props.name}

    </div>);
}

//跨层组件通信
const MsgContext = createContext()


function C() {
    return <div>
        this is C component
        <br/>
        <D/>
    </div>
}

function D() {
    const Msg = useContext(MsgContext)
    return <div>
        this is D component：{Msg}
    </div>
}

//useEffect


const URL = 'http://geek.itheima.net/v1_0/channels'


//自定义Hooks函数
function useToggle() {
    //可复用的逻辑代码
    //自定义Hooks
    const [valueFlag1, setValueFlag1] = useState(true)

    const toggle = () => {
        setValueFlag1(!valueFlag1)
    }

    //哪些状态和回调函数需要再其他组件中使用，就return
    return {
        valueFlag1,
        toggle
    }

}

/*  如何自定义hook函数
*   1.声明一个以use打头的函数
*   2.函数内部封装可复用的逻辑（只要是可复用的逻辑代码）
*   3.把组件中用到的状态和回调函数，return出去（以对象或者数组的方式）
*   4.在组件中，执行自定义Hooks函数，并解构出状态和回调函数进行使用
* */
/*  规则
*   1.只能在组件中或者其他自定义hook函数中调用
*   2.只能在组件的顶层调用，不能嵌套在if、for、while、switch...等其他函数中使用
*
* */


//尝试封装一个自定义Hooks
function useGetList() {

    // useEffect
    //创建一个状态数据
    const [list1, setList1] = useState([])

    useEffect(() => {
        //额外的操作 获取频道列表
        // const res =await fetch(URL)
        async function getList() {
            const res = await axios.get(URL)
            console.log('res', res)
            setList1(res.data.data.channels)
        }

        getList().catch(err => {
            console.log(err)
        })


    }, [])

    return {
        list1,
        setList1
    }

}


function App() {

    const count = 100

    function getName() {

        return 'jack'
    }

    const list = [{id: 1, name: 'jack'}, {id: 2, name: 'tom'}, {id: 3, name: 'vue'}]

    const isLogin = true


    // 使用逻辑判断
    const articleType = 0 // 0 1 2

    function getArticleTem() {
        if (articleType === 0) {
            return <div> 我是无图片文章</div>
        } else if (articleType === 1) {
            return <div> 我有图片文章</div>
        } else {
            return <div> 我有视频文章</div>
        }
    }


    // 事件绑定
    const handleClick = (e) => {
        console.log('被点击了', e)
    }

    //传自定义参数
    const handleParams = (name, e) => {
        console.log('被点击了name', name, e)
    }


    // 自定义组件
    const Button = () => {
        return <button onClick={handleClick}>click</button>
    }

    // useState
    // countSum 状态变量
    // setCountSum 状态更新方法
    const [countSum, setCountSum] = useState(0)

    const handleSumClick = () => {

        //作用：1.用传入的新值，更新状态变量
        //作用：2.使用新的状态变量，重新渲染页面
        setCountSum(countSum + 1)
    }

    const [userInfo, setUserInfo] = useState({
        name: 'jack', age: 18
    })
    const changeUserInfo = () => {
        setUserInfo({
            ...userInfo, name: 'tom'
        })
    }


    //表单受控绑定
    const [inputValue, setInputValue] = useState('')


    const testFunction = (e) => {
        console.log('e', e)
        setInputValue(e.target.value)
    }

    //1.useRef生成ref对象，绑定到dom标签身上
    //2.通过ref对象的current，获取dom标签
    //渲染完毕之后dom生成之后才可用
    const inputRef = useRef(null);


    function showDom() {
        console.log(inputRef.current)
        console.log(inputRef.current.value)
        console.dir(inputRef.current)
    }


    const [message11, setMessage] = useState('')

    const getMessage = (msg) => {

        console.log('msg', msg)
        setTimeout(() => {
            setMessage(msg)
            console.log('message', message11)
        }, 1000)
    }

    //兄弟组件通信
    const [AName, setAName] = useState('')
    const getAName = (name) => {
        console.log('name', name)
        setAName(name)
    }

    //跨层组件通信
    const AppMessage = 'this is a AppMessage'


    //尝试自己将请求接口封装到一个hooks中
    const {list1, setList1} = useGetList() //我这里用不上setList1这个方法


    // useEffect---清除副作用
    const [show, setShow] = useState(false)

    function Son3() {
        useEffect(() => {
            //由于在 188行中也定义了 setInterval，导致计时器混乱，所以会出现1秒运行多次的计时器，写了清楚副作用的代码后就可以正常执行了
            //console.log('message', message11)
            const timer3 = setInterval(() => {
                console.log('定时器执行了')
            }, 1000)

            //在第一个函数参数中，进行return ()=>{}，即可清除副作用
            //清除副作用逻辑（组件卸载时执行）
            return () => {

                clearInterval(timer3)
            }

        }, [])
        return (<div>
            this is a Son3
        </div>)
    }

    //自定义Hooks
    const {valueFlag1, toggle} = useToggle()


    //自定义一个item作为列表的
    function Item({item}) {
        return (
            <li key={item.id}>{item.name}</li>
        )
    }

    //实现一个简单的reducer （原生的redux）

    //1.定义一个reducer函数
    /*作用：根据不同的action对象，返回不同的新的state
    * state: 管理的数据初始状态
    * action: 对象type标记当前想要做什么样的修改
    * */
    function reducer(state = {count: 0}, action) {
        //数据不可变：基于原始的状态生成一个新的状态
        if (action.type === 'INCREMENT') {
            return {count: state.count + 1}
        }
        if (action.type === 'DECREMENT') {
            return {count: state.count - 1}
        }
        return state
    }

    //2.使用reducer函数生成store实例
    const store = Redux.createStore(reducer)

    //3.使用store实例的subscribe方法，监听store状态的修改
    //回调函数可以在每次state修改时自动执行
    store.subscribe(() => {
        console.log('state发生变化了')
        document.getElementById('countNum').innerText = store.getState().count
    })

    //4.通过store实例的dispatch函数提交action更改状态
    useEffect(() => {
        const inBtn = document.getElementById('increment')
        inBtn.addEventListener('click', () => {
            store.dispatch({type: 'INCREMENT'})
        })

        const deBtn = document.getElementById('decrement')
        deBtn.addEventListener('click', () => {
            store.dispatch({type: 'DECREMENT'})
        })
    }, []);

    //5.通过store实例的getState方法获取最新状态更新到视图中


    //RTX
    const {count_RTX} = useSelector((state) => state.counter)
    const dispatch = useDispatch()


    //RTX---异步
    const {channelList} = useSelector((state) => state.channel)
    //使用useEffect出发异步请求
    useEffect(() => {
        dispatch(fetchChannelList())
    },[dispatch])


    return (<div className="App">
        <header className="App-header">
            this is a test
            {/*使用引号传递字符串*/}

            {'this is a message'}
            <br/>
            {/*识别js变量*/}
            {count}
            <br/>
            {/*    函数调用*/}
            {getName()}
            <br/>
            {/*方法调用*/}
            {new Date().getDate()}
            <br/>
            {/*使用js对象*/}
            <div style={{color: 'red'}}> this is a test</div>


        </header>
        <hr/>

        {'这里是尝试小demo 生成ul'}
        <ul>
            {/*使用map遍历*/
                list.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>

        <hr/>

        {'尝试使用逻辑判断：与，或，三目'}

        <br/>
        {'与'}
        {isLogin && <div>已登录</div>}

        <br/>
        {'或'}
        {isLogin || <div>未登录</div>}

        <br/>
        {'三目运算符'}
        {isLogin ? <div>已登录</div> : <div>未登录</div>}


        <hr/>
        {'复杂条件渲染'}
        <br/>
        {'调用函数渲染不同的模板'}
        {getArticleTem()}


        <hr/>
        {'事件绑定'}

        <button onClick={handleClick}>点击</button>


        <br/>
        {'传递自定义参数'}
        <button onClick={(e) => handleParams('jack', e)}>点击</button>

        <hr/>
        {'定义组件'}
        {/*以首字母大写的方式，创建一个方法*/}
        <br/>
        {'自闭和'}
        <Button/>

        <br/>
        {'成对标签'}
        <Button></Button>

        <hr/>


        {'useState 实现一个计数器按钮'}
        <button onClick={handleSumClick}>{countSum}</button>

        <br/>
        <br/>

        {'修改对象的状态'}
        <button onClick={changeUserInfo}>{userInfo.name}</button>

        <hr/>

        {'CSS样式'}
        <br/>

        <div className="box">box</div>


        <hr/>
        {'表单受控绑定'}
        <br/>
        <input
            type="text"
            value={inputValue}
            onChange={(e) => testFunction(e)}/>
        <br/>
        <p>{inputValue}</p>


        {'React中获取DOM'}
        <br/>
        <input type="text" ref={inputRef}/>
        <button onClick={showDom}>点击获取dom</button>

        <hr/>
        <p>{dayjs(new Date()).format('YY-MM-DD HH:mm:ss')}</p>

        <hr/>

        {/*    组件通信-父传子*/}
        {'组件通信-父传子'}
        <Son
            name={name}
            age={18}
            isTrue={true}
            list={[1, 2, 3]}
            obj={{name: 'jack', age: 18}}
            fn={() => {
                console.log('this is a function')
            }}
            child={<span>this is a span</span>}
        />


        <br/>


        <Son1>
            {/*直接写一个标签内容，可以在子组件中props中获取children属性*/}
            <span>this is a span test</span>
        </Son1>

        <hr/>
        {/*    子传父*/}
        {'子传父'}
        {/*子组件中调用父组件中的函数，然后再通过函数传参给父组件*/}
        <div>
            <p>{message11}</p>
        </div>
        <Son2 onGetMessage={getMessage}/>

        <hr/>

        {/*    兄弟间组件通信*/}
        {'兄弟间组件通信'}
        {/*    先子传父，然后父传子*/}
        <A onGetAName={getAName}/>
        <B name={AName}/>


        <hr/>

        {'跨层组件通信'}
        {/* 只要存在顶层与底层的嵌套关系，即可使用*/}
        {/* 1.createContext方法创建一个上下文对象
            2.在顶层组件 通过Provider 组件，将数据传递给子组件
            3.在需要使用的组件 通过useContext钩子函数，获取数据
         */}

        <MsgContext.Provider value={AppMessage}>
            <C/>
        </MsgContext.Provider>


        <hr/>
        {'useEffect'}
        <div>
            this is app
            <ul>
                {
                    list1.map(item => (<Item item={item} key={item.id}/>))
                }
            </ul>
        </div>

        {/*
            1.没有依赖项 初始+组件重新渲染时
            2.[] 空数组 仅初始化
            3.有依赖项 仅初始+依赖项变化时
        */}

        <br/>
        <br/>
        {'useEffect----清除副作用'}

        <div>
            {show && <Son3/>}
            <button onClick={() => setShow(false)}>卸载Son3组件</button>
        </div>

        <hr/>

        {'自定义Hooks函数'}

        <div>
            {valueFlag1 && <div>this is div</div>}
            <button onClick={toggle}>toggle</button>
        </div>


        {'实现一个简单的reducer'}

        <div>
            <button id={'decrement'}> -</button>
            <div id={"countNum"}>0</div>
            <button id={'increment'}> +</button>
        </div>

        <hr/>

        {'react+RTS'}

        <div>
            <p>{count_RTX}</p>
            <button onClick={() => dispatch(decrement())}> -</button>
            <button onClick={() => dispatch(increment())}> +</button>
        </div>

        <br/>

        {'react+RTX---传递参数'}
        <button onClick={() => dispatch(addToNum(10))}>+10</button>
        <button onClick={() => dispatch(addToNum(20))}>+20</button>
        <button onClick={() => dispatch(decNum(20))}>-20</button>
        <button onClick={() => dispatch(reset())}>归零</button>


        <hr/>

        {'RTX---异步函数'}
        <ul>
            {
                channelList.map(item => <li key={item.id}>{item.name}</li>)
            }
        </ul>



    </div>);

}

export default App;
