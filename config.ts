interface Config {
    GraphQLUrl: string;
}

const DevConfig: Config = {
    GraphQLUrl: 'https://localhost:44378/graphql/',
};

const ProdConfig: Config = {
    GraphQLUrl: ''
};
  
export const Config = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig;