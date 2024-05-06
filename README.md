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

## Search index generation

We use Algolia for search.

### Automatic index generation

A Github Action runs daily that regenerates the search index from the live gimlet.io site.

### Running search index generation locally

First you need to put the Algolia admin keys to the `.env.local` file.
Obtain the admin key from the Gimlet maintainers.

```bash
APPLICATION_ID=<APP_ID>
API_KEY=<ADMIN_API_KEY>
```

Then run the following oneliner:

```bash
docker run -it --env-file=.env.local -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper
```

If you don't have jq, install it here: [install jq, a lightweight command-line JSON processor](https://github.com/stedolan/jq/wiki/Installation)

## License

Content in the `src/pages` folder are licensed under Apache License 2.0.


