# About
This is a tool to migrate data between two Hasura instances through the GraphQL endpoints

# Installing
```
yarn global add xsura
```

# Commands

## Copy
Copy the data from an instance of Hasura to another instance of Hasura

```bash
xsura copy \
--fields="table_a,table_b" \
--source="https://source.hasura.app/v1/graphql" \
--source-headers="x-hasura-admin-secret|ADMIN_SECRET_KEY" \
--target="https://target.hasura.app/v1/graphql" \
--target-headers="x-hasura-admin-secret|ADMIN_SECRET_KEY"
```