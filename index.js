const { ApolloServer, gql } = require("apollo-server");

let todos = [
  {
    id: 0,
    text: "Hello from GraphQL",
    completed: false,
  },
];

const typeDefs = gql`
  type Todo {
    id: String
    text: String
    completed: Boolean
  }

  type Query {
    todos: [Todo]!
  }

  type Mutation {
    createTodo(text: String!): String
    removeTodo(id: String!): String
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    createTodo: (parent, args, context, info) => {
      return todos.push({
        id: Date.now().toString(),
        text: args.text,
        completed: false,
      });
    },
    removeTodo: (parent, args, context, info) => {
      for (let i in todos) {
        if (todos[i].id === args.id) {
          todos.splice(i, 1);
        }
      }
      return args.id;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
