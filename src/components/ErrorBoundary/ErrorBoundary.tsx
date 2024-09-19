import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom';

// react router error boundary
export default function BlogErrorBoundary() {
  const error = useRouteError();

  let errorMessage: string =
    'Failed to load the blog posts. Please try again later.';

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.data.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = 'Unknown error';
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
      <div className="flex flex-col gap-4 justify-center items-center">
        <img src="/logo.svg" alt="Blog logo" className="h-16" />
        <h1 className="text-4xl font-bold">Oops! Error:</h1>
        <h3 className="text-xl">&quot;{errorMessage}&quot;</h3>
      </div>
      <p>
        You can always return{' '}
        <Link
          to="/"
          className="bg-link-blue-300 hover:bg-link-blue-100 active:bg-link-blue-600 text-white rounded px-5 py-2 duration-300 ease-in-out"
        >
          Home
        </Link>
      </p>
    </div>
  );
}
