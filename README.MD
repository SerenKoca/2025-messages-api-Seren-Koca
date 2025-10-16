# local development 
'npm run dev'


## MongoDB configuration

This project uses the `config` package to manage the MongoDB connection string for different environments.

- Local (default): the app reads `config/default.json` which points to `mongodb://127.0.0.1:27017/messages`.
- Production: create a `config/production.json` or set the environment variable `MONGO_URI`.

Examples (PowerShell):

```powershell
# Run locally (uses default config)
npm run dev

# Run in production mode with an explicit Mongo URI
$env:NODE_ENV = 'production'; $env:MONGO_URI = 'mongodb://user:pass@host:27017/yourdb'; node index.js
```

If `MONGO_URI` is set it will override the config value.

