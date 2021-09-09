import BoardWriteUI from './BoardWrite.presenter'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD, UPDATE_BOARD } from './BoardWrite.queries'
import { useRouter } from 'next/router'

export default function BoardWrite(props){
    const router = useRouter()

    const [ createBoard ] = useMutation(CREATE_BOARD)
    const [ updateBoard ] = useMutation(UPDATE_BOARD)

    const [myWriter, setMyWriter] = useState("")
    const [myTitle, setMyTitle] = useState("")
    const [myContents, setMyContents] = useState("")

    const [zzz, setZzz] = useState(false)
    const [qqq, setQqq] = useState(false)


    // myWriter, myTitle, myContents 모두 내용이 저장되어 있다면,
    // 즉, (myWriter !== "" && myTitle !== "" && myContents !== "") 라면,
    // setQqq를 사용해서, false => true, 이모션의 버튼색을 노란색으로 변경하기
    function onChangeMyWriter(event){
        setMyWriter(event.target.value)
        // setMyTitle(event.target.value)
        // setQqq(true)
        // setMyContents(event.target.value)
        // setMyWriter(event.target.value)

        if(event.target.value !== "" && myTitle !== "" && myContents !== ""){
            setQqq(true)
        }
    }

    function onChangeMyTitle(event){
        setMyTitle(event.target.value)
        if(myWriter !== "" && event.target.value !== "" && myContents !== ""){
            setQqq(true)
        }
    }

    function onChangeMyContents(event){
        setMyContents(event.target.value)
        if(myWriter !== "" && myTitle !== "" && event.target.value !== ""){
            setQqq(true)
        }
    }

    async function aaa(){
        const result = await createBoard({
            variables: { writer: myWriter, title: myTitle, contents: myContents }
        })
        console.log(result)
        console.log(result.data.createBoard.number)
        router.push(`/08-04-board-detail/${result.data.createBoard.number}`)
    }

    async function onClickEdit(){
        try {
            // 0
            // ""
            // null
            // undefined
            // false
            // 1. state의 초기값에도 defaultValue 를 넣어주는 방법
            // 2. 실제로 변경이 일어난 값만 수정하라고 Backend에 요청하는 방법
            const myVariables = {
                number: Number(router.query.number)
            }
            if(myWriter) myVariables.writer = myWriter
            if(myTitle) myVariables.title = myTitle
            if(myContents) myVariables.contents = myContents
            await updateBoard({
                variables: myVariables
            })
            router.push(`/08-04-board-detail/${router.query.number}`)
        } catch(error){
            console.log(error)
        }
    }

    return (
        <BoardWriteUI 
            onChangeMyWriter={onChangeMyWriter} 
            onChangeMyTitle={onChangeMyTitle}
            onChangeMyContents={onChangeMyContents}
            aaa={aaa}
            zzz={zzz}
            qqq={qqq}
            isEdit={props.isEdit}
            onClickEdit={onClickEdit}
            data={props.data}
        />
    )
}