import {useState} from "react";
import './css/index.css'

function App() {

    const count = 100

    function getName() {

        return 'jack'
    }

    const list = [{id: 1, name: 'jack'}, {id: 2, name: 'tom'}, {id: 3, name: 'vue'}]

    const isLogin = true

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

    const handleClick = (e) => {
        console.log('被点击了', e)
    }

    const handleParams = (name, e) => {
        console.log('被点击了name', name, e)
    }

    const Button = () => {
        return <button onClick={handleClick}>click</button>
    }

    // countSum 状态变量
    // setCountSum 状态更新方法
    const [countSum, setCountSum] = useState(0)

    const handleSumClick = () => {

        //作用：1.用传入的新值，更新状态变量
        //作用：2.使用新的状态变量，重新渲染页面
        setCountSum(countSum + 1)
    }

    const [userInfo, setUserInfo] = useState({
        name: 'jack',
        age: 18
    })
    const changeUserInfo = () => {
        setUserInfo({
            ...userInfo,
            name: 'tom'
        })
    }


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


    </div>);
}

export default App;
