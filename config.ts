interface Config {
    GraphQLUrl: string;
    FilesUrl: string;
}

const DevConfig: Config = {
    GraphQLUrl: 'https://localhost:44378/graphql/',
    FilesUrl: 'https://localhost:44378/files'
};

const ProdConfig: Config = {
    GraphQLUrl: '',
    FilesUrl: ''
};
  
export const Config = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig;