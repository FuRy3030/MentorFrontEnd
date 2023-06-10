import { GraphQLClient } from 'graphql-request';
import { Config } from '../../config';

const MyGraphQLClient = new GraphQLClient(Config.GraphQLUrl);

if (typeof window !== 'undefined' && window.localStorage) {
    MyGraphQLClient.setHeader('Authorization', `Bearer ${localStorage.getItem('session')}`);
}

export function SetAuthHeader(Token: string) {
    if (Token) {
        MyGraphQLClient.setHeader('Authorization', `Bearer ${Token}`);
    } else {
        MyGraphQLClient.setHeader('Authorization', '');
    }
};

export default MyGraphQLClient;