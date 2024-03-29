interface Config {
    GraphQLUrl: string;
    FilesUrl: string;
}

const DevConfig: Config = {
    GraphQLUrl: 'https://localhost:44378/graphql/',
    FilesUrl: 'https://localhost:44378/files'
};

const TestProdConfig: Config = {
    GraphQLUrl: 'https://competifymentorbackendtestserver.azurewebsites.net/graphql/',
    FilesUrl: 'https://competifymentorbackendtestserver.azurewebsites.net/files'
};

const ProdConfig: Config = {
    GraphQLUrl: 'https://competifymentorproduction.azurewebsites.net/graphql/',
    FilesUrl: 'https://competifymentorproduction.azurewebsites.net/files'
};
  
export const Config = process.env.NODE_ENV === 'production' ? ProdConfig : DevConfig;