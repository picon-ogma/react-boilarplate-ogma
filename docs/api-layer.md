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

### Here's a demo on how would configure axios client with reduxjs-toolkit:

1. Create **Axios** api client
2. Add interceptors

```js
// src/libs/http-client.js

import axios from 'axios';

/**
 * @type {import('axios').AxiosRequestConfig} httpClientConfig
 */
const httpClientConfig = {
  baseURL: '...',
};

export const httpClient = axios.create(httpClientConfig);

export const setupInterceptor = (store) => {
  httpClient.interceptors.request.use(
    async (config) => {
      const token = store.getState().auth.tokens.accessToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    (error) => {
      return Promise.reject(error);
    }
  );

  httpClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const response = await axios.patch('...', {...});
          const { accessToken } = response.data.tokens;

          // Persist the latest access token in the appropriate state store.
          // Code goes here...

          // Retry the original failed request
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          return httpClient(originalRequest);
        } catch {
          // Failed renew auth tokens. Redirect to login page and exit from the error callback fn!
          // Code goes here..
        }
      }

      return Promise.reject(error);
    }
  );
};
```

3. Configure **Redux** store with api client.
```js
// src/AppShell.jsx
export const AppShell = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <div>Your error fallback component goes here</div>
      )}
    >
      <HelmetProvider>
       <Provider store={store}>
         <Suspense fallback={<div>Your awesome spinner component goes here</div>}>
           {children}
         </Suspense>
       </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

setupInterceptor(store)
```

Similarly, if you are using **React Query** or **RTK Query**, you would configure them in the **src/libs/** folder and reuse throughout the application.

### Here's a demo of react-query client configuration and usage:

1. Configure the client

```js
// src/libs/query-client.js

import { QueryClient } from '@tanstack/react-query';

/**
 * @type {import('@tanstack/react-query').DefaultOptions} queryConfig
 */
export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60, // Configure the stale time based on your requirments
  },
};

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});
```

2. Add the react-query client to the app-shell component.

```js
export const AppShell = ({ children }) => {
  return (
      <ErrorBoundary FallbackComponent={...}>
        <Suspense fallback={...}>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              {import.meta.env.DEV && <ReactQueryDevtools />}
              {children}
            </QueryClientProvider>
          </HelmetProvider>
        </Suspense>
      </ErrorBoundary>
  );
};

```

3. Use the react-query to create router loaders (prefetch initial data)

```js
 // src/features/products/api/get-products.js
export const getProducts = () => {
  return api.get(`/products`);
};

export const getProductsQueryOptions = () => {
  return queryOptions({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

// src/features/products/loaders.js
export const productsLoader = (queryClient) => async () => {
  const query = getUsersQueryOptions();

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};

// src/AppRouter.jsx
export const createRouter = (queryClient) => {
  return createBrowserRouter([
    {
      path: '/app',
      element: (...),
      children: [
        {
          path: 'products',
          lazy: async () => {
            const { ProductsRoute } = await import('./routes/app/products');
            return { Component: ProductsRoute };
          },
          loader: productsLoader(queryClient),
        },
      ],
    },
  ]);
};

const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};

// You can create a hook as well to use with react components
export const useProducts = ({ queryConfig }) => {
  return useQuery({
    ...getProductsQueryOptions(),
    ...queryConfig,
  })
}

export const AnyComponent = () => {
  const { data, isLoading, error } = useProducts();

  return <>...</>
}
```
