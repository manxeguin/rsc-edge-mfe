export const config = {
    runtime: 'edge', // this is a pre-requisite
  };
  
  export default (req) => {
    return new Response(`Hello, from ${req.url} I'm now an Edge Function!`);
  };