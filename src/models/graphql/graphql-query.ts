import { gql } from "graphql-request";
import { GraphQLFrament } from "./graphql-frament";

export default class GraphQLQuery {
  static getMenuHeaderParent: string = gql`
    query GetMenuHeader($slug: String!) {
      menusMenus(filters: { slug: { eq: $slug } }) {
        data {
          id
          attributes {
            items(
              pagination: { pageSize: 50 }
              sort: "order:asc"
              filters: { parent: { id: { eq: null } } }
            ) {
              data {
                ...MenuItemEntry
              }
            }
          }
        }
      }
    }

    ${GraphQLFrament.MenuItemEntry}
  `;

  static getMenuItemsByIdParent: string = gql`
    query GetMenuItemsByIdParent($id: ID!, $isShowDataRelate: Boolean!) {
      menusMenuItems(
        filters: { parent: { id: { eq: $id } } }
        sort: "order:asc"
      ) {
        data {
          ...MenuItemHasDocsEntry
        }
      }
    }

    ${GraphQLFrament.MenuItemHasDocsEntry}
  `;
}
