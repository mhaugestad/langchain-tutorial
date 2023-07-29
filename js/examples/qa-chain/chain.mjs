import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
import dotenv from 'dotenv'
dotenv.config({path: '/workspaces/langchain-tutorial/.env' })

const directory = "/workspaces/langchain-tutorial/js/examples/qa-chain/vectordb";
const collectionName = "meetup";
const llm = new OpenAI({});

const vectorStore = await HNSWLib.load(directory, new OpenAIEmbeddings(), {collectionName: "meetup"});
const vectorStoreRetriever = vectorStore.asRetriever(5);

export const chain = RetrievalQAChain.fromLLM(llm, vectorStoreRetriever);

/*
const query1 = await chain.call({query: "What is IA Generativa Sevilla?"});
console.log("What is IA Generativa Sevilla?")
console.log(query1);

const query2 = await chain.call({query: "Who is the organizer of IA Generativa Sevilla?"});
console.log("Who is the organizer of IA Generativa Sevilla?")
console.log(query2);

const query3 = await chain.call({query: "Who is the co-organizer of IA Generativa Sevilla?"});
console.log("Who is the co-organizer of IA Generativa Sevilla?")
console.log(query3);
*/