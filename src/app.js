import React, { Suspense } from "react";
import Routes from './main/routes';

const App = () => {
  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div>
          </div>
        }>
        <Routes />
      </Suspense>
    </React.Fragment>
  );
};

export default App;
