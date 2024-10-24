import { pipeline } from '@xenova/transformers';

// Extend the NodeJS Global interface to include our embedding pipeline promise
declare global {
  // eslint-disable-next-line no-var
  var embeddingPipelinePromise: Promise<any> | undefined;
}

// Function to initialize the embedding pipeline
const initializeEmbeddingPipeline = () => {
  if (!global.embeddingPipelinePromise) {
    console.log('Initializing embedding pipeline...');
    global.embeddingPipelinePromise = pipeline(
      'feature-extraction',
      'mixedbread-ai/mxbai-embed-large-v1'
    )
      .then((pipe) => {
        console.log('Embedding pipeline initialized.');
        return pipe;
      })
      .catch((error) => {
        console.error('Error initializing embedding pipeline:', error);
        throw error;
      });
  }
};

// Immediately invoke the initialization
initializeEmbeddingPipeline();