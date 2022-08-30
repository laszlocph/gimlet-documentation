# Gimlet.io

This repo holds the source code of the Gimlet.io website.

## Getting started

```bash
npm install
cp .env.example .env.local
```

Next, run the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3001](http://localhost:3001) in your browser.

## Set up your environment

You'll need to set your Algolia application ID and admin API key as environment variables. If you don't have an Algolia account, you need to [create one](https://www.algolia.com/pricing/).

Overwrite .env.local file with the following two variables:

```bash
APPLICATION_ID=<APP_ID>
API_KEY=<ADMIN_API_KEY>
```

Replace all of the environment variables based on your Algolia application in .env:

```bash
NEXT_PUBLIC_DOCSEARCH_APP_ID=<APP_ID>
NEXT_PUBLIC_DOCSEARCH_API_KEY=<SEARCH_ONLY_API_KEY>
NEXT_PUBLIC_DOCSEARCH_INDEX_NAME=gimlet
```

You can run a crawl from the packaged Docker image to crawl your website. You will need to [install jq, a lightweight command-line JSON processor](https://github.com/stedolan/jq/wiki/Installation)

Run the command:

```bash
docker run -it --env-file=.env.local -e "CONFIG=$(shell ./config.json | jq -r tostring)" algolia/docsearch-scraper
```

## License

Content in the `src/pages` folder are licensed under Apache License 2.0.
