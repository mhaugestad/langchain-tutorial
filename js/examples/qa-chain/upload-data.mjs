import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";

import dotenv from 'dotenv'
dotenv.config({path: '/workspaces/langchain-tutorial/.env' })

// Coger el texto de la web
// No estoy seguro como quitar los tags the html de aqui
const loader = new CheerioWebBaseLoader(
  "https://www.meetup.com/ia-generativa-sevilla/",
  {
    selector: "body",
  }
);
const text = await loader.load();

// Partir texto en chunks
const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 20
  });
const docs = await textSplitter.splitDocuments(text);

// Create a vector store through any method, here from texts as an example
const vectorStore = await HNSWLib.fromDocuments(
  docs,
  new OpenAIEmbeddings(),
  {collectionName: "meetup"}
);

// Guardar en disco
const directory = "./vectordb";
await vectorStore.save(directory);

// Cargar de disco
const loadedVectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings(), {collectionName: "meetup"});

// vectorStore and loadedVectorStore are identical
const result = await loadedVectorStore.similaritySearch("who is the meetup organizer", 3);
console.log(result);