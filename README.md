# About
This is a tool to migrate data between two Hasura instances through the GraphQL endpoints

# The problem
If you are trying to migrate data from an Hasura environment to another that runs in a free tier, you will face issues with the permission level of your Postgres credentials.

For example, if you try to run the COPY command to import the data from a CSV file using the Postgres CLI `psql`, you will receive this error message:

```
ERROR: must be a superuser or a member of the pg_read_server_files role to COPY from a file
```

This error occurs because a free tier instance of Hasura runs in a shared server, which means that the database server, has many other users running their databases, and it's reasonable to you not have a superuser or a different grant on the database server due to security reasons.

# Solution
Fetch the data using the GraphQL introspection query to discover the properties/fields of each table/field on GraphQL, and dynamically insert it to the tables using the Hasura insert mutation convention `insert_<field_name>`

# Installing
```
yarn global add xsura
```

# Commands

## copy
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