# 📡 API Layer

### Use a Single Instance of the API Client

When your application interacts with either RESTful APIs, it is better to use a single instance of the API client that has been pre-configured (retries, tokens handling, interceptors, etc) and can be reused throughout the application. We have choose to go with [axios](https://github.com/axios/axios) for our projects. [Ky](https://github.com/sindresorhus/ky) is a good alternative if you prefer native fetch over axios.

[API Client Example Code](../src/libs/http-client.js)

### Define and Export Request Declarations

Rather than declaring API requests on the fly, it is recommended to define and export them separately.

Declaring API requests in a structured manner can help maintain a clean and organized codebase as everything is co-located.
Every API request declaration should consist of:

- A fetcher function that calls an endpoint, using the API client instance. e.g. **fetchGetRequest**, **fetchPostMultipartRequest**. You would define and export them from **libs/http-client**.
- A hook that consumes the fetcher function that is built on top of libraries such as [react-query](https://tanstack.com/query), [swr](https://swr.vercel.app/), [redux-query](https://redux-toolkit.js.org/rtk-query/overview), etc. to manage the data fetching and caching logic.

This approach simplifies the tracking of defined endpoints available in the application.