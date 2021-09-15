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

# Options

## --fields
GraphQL fields that you want to copy to the target

## --source
GraphQL URL of your source server
## --source-headers
Headers that you may need to use to authenticate your requests for you source server
## --target
GraphQL URL of your target server

## --target-headers
Headers that you may need to use to authenticate your requests for you target server