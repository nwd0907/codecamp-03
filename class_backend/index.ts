// console.log("hello world");
import { createConnection } from "typeorm";
import { ApolloServer, gql } from "apollo-server";
import Board from "./Board.mysql";

const typeDefs = gql`
  input CreateBoardInput {
    writer: String
    title: String
    age: Int
  }

  type Return {
    message: String
    number: Int
  }

  type Board {
    number: Int
    writer: String
    title: String
    age: Int
  }

  type Query {
    fetchBoard: Board
    fetchBoards: [Board]
  }

  type Mutation {
    # 주석입니다 createBoard(writer: String, title: String, age: Int): Return
    createBoard(createBoardInput: CreateBoardInput): Return
    updateBoard: Return
    deleteBoard: Return
  }
`;

const resolvers = {
  Query: {
    fetchBoard: async () => {
      // 데이베이스에서 해당하는 데이터 꺼내서 브라우저에 던져주기(응답주기)
      const result = await Board.findOne({
        where: { number: 1, deletedAt: null },
      });
      return result;
      // return {
      //   writer: result?.writer,
      //   title: result?.title,
      //   age: result?.age,
      // };
    },
    fetchBoards: async () => {
      const result = await Board.find({ where: { deletedAt: null } }); // [{...}, {...}, {...}]
      return result;
    },
  },
  Mutation: {
    createBoard: async (_: any, args: any) => {
      // 데이터베이스 데이터 입력하기
      // const result = await Board.insert({
      //   title: args.title,
      //   writer: args.writer,
      //   age: args.age,
      // });
      const result = await Board.insert({
        ...args.createBoardInput,
        // title: args.createBoardInput.title,
        // writer: args.createBoardInput.writer,
        // age: args.createBoardInput.age,
      });
      console.log(result);

      return { message: "성공했습니다", number: result.identifiers[0].number };
    },

    updateBoard: async (_: any, args: any) => {
      await Board.update({ number: 3 }, { writer: "영희" });
      return { message: "수정완료!!" };
    },

    deleteBoard: async () => {
      // await Board.delete({ number: 4 });

      // await Board.update({ number: 5 }, { deletedAt: new Date() });

      return { message: "삭제완료!!" };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

createConnection({
  type: "mysql",
  database: "mysql",
  username: "root",
  password: "codecamp",
  port: 3308,
  host: "34.64.207.239",
  entities: [__dirname + "/*.mysql.ts"],
  logging: true,
  synchronize: true,
})
  .then(() => {
    // 연결성공시 실행
    console.log("접속완료!!!");
    server.listen({ port: 4000 });
  })
  .catch((error) => {
    console.log(error);
  });
