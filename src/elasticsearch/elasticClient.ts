import { envs } from '@configs'
import {Client} from '@elastic/elasticsearch'
export const elasticClient = new Client({
    node: envs.ELASTICSEARCH_URL,
    auth: {
        username: envs.ELASTICSEARCH_USERNAME,
        password: envs.ELASTICSEARCH_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
})