import { useMutation, gql } from "@apollo/client"

const CREATE_BOARD = gql`
    mutation createBoard($createBoardInput: CreateBoardInpupt!){
        createBoard(createBoardInput: $createBoardInput){
            _id
        }
    }
`


const CREATE_PRODUCT = gql`
    mutation createProduct($seller: String, $createProductInput: CreateProductInput!) {
        createProduct(
            seller: $seller, 
            createProductInput: $createProductInput
        ){
            _id
            number
            message
        }
    }
`

export default function GraphqlMutationProductPage(){
    const [ createProduct ] = useMutation(CREATE_PRODUCT)

    async function onClickSubmit(){
        const result = await createProduct({
            variables: {
                seller: "영희",
                createProductInput: {
                    name: "키보드",
                    detail: "아주 좋은 키보드",
                    price: 5000
                }
            }
        })
        console.log(result.data.createProduct._id)
    }

    return (
        <>
            판매자: <input type="text" />
            상품명: <input type="text" />
            상품상세: <input type="text" />
            상품가격: <input type="text" />
            <button onClick={onClickSubmit}>상품 등록하기!!</button>
        </>
    )
}