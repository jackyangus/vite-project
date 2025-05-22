# Framework

React + TypeScript + Vite + Eslint9 + Prettier

# Run

2. `npm i` nodejs >= 18
3. `npm run dev` run local project
4. `npm run build` build project

# Files

```
find src -type d | sed -e "s/[^-][^\/]*\//  │   /g" -e "s/│\([^ ]\)/├── \1/" -e "s/  │/│/" -e "s/│\s*$//" -e "s/^/    /" | sed "s/├── src/src/"
```

# Update dependency

` `

# [Https](https://github.com/FiloSottile/mkcert)

## Windows

`choco install mkcert`

## Mac

`brew install mkcert`

`brew install nss` # if you use Firefox

### Generate certificate

`mkcert localhost 127.0.0.1 ::1`

## enqueueSnackbar

```
 enqueueSnackbar("Do you want to confirm this action?", {
          variant: "info",
          autoHideDuration: 10000, // 10 seconds
          action: (key) => (
            <CommonButton
              color="inherit"
              size="xs"
              onClick={() => {
                // Handle confirmation action here
                console.log("Action confirmed");
                closeSnackbar(key);
              }}
            >
              Confirm
            </CommonButton>
          ),
        });
```

# ESlint rule check

```
 npx eslint .
```

```
feat: Implement Phase 1 of MVP Backend

This commit includes the initial backend setup for the translation platform MVP:

- User Service:
  - Email/password registration and login.
  - Google OAuth2 registration and login.
  - JWT generation and validation.
  - Password hashing with BCrypt.
- Translation Service:
  - API for creating translation requests (direct text input).
  - Asynchronous processing of translations via a placeholder Machine Translation client.
  - API for retrieving user's translation history.
- Database:
  - MySQL schema for users, OAuth identities, and translation requests.
- API Gateway:
  - JWT authentication and authorization configured within the Spring Boot application.
  - CORS configured for frontend integration.
- Containerization:
  - Dockerfile for the Spring Boot application.
  - docker-compose.yml for local development with MySQL.

All services are currently part of a single Spring Boot application.
```
