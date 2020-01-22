import gql from "graphql-tag";
import compose from "lodash/flowRight";

const todosQuery = gql`
    query TodosQuery {
        todos {
            id
            name
        }
    }
`;

export default (

);