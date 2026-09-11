import app from "express";
 export default app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

