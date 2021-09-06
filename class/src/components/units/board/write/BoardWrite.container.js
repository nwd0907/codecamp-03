import BoardWriteUI from './BoardWrite.presenter'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOARD } from './BoardWrite.queries'

export default function BoardWrite(){

    const [ createBoard ] = useMutation(CREATE_BOARD)
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
    }

    return (
        <BoardWriteUI 
            onChangeMyWriter={onChangeMyWriter} 
            onChangeMyTitle={onChangeMyTitle}
            onChangeMyContents={onChangeMyContents}
            aaa={aaa}
            zzz={zzz}
            qqq={qqq}
        />
    )
}