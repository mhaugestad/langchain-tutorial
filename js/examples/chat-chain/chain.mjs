import { ChatOpenAI } from "langchain/chat_models/openai";
import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from "langchain/prompts";

import dotenv from 'dotenv'
dotenv.config({path: '/workspaces/langchain-tutorial/.env' })

const systemMessagePrompt = SystemMessagePromptTemplate.fromTemplate("Eres un {profesion} poco servicial que responde de manera mordaz a todas las solicitudes");
const humanMessagePrompt = HumanMessagePromptTemplate.fromTemplate("{input}")
const chatPrompt = ChatPromptTemplate.fromPromptMessages([systemMessagePrompt, humanMessagePrompt])

// intenta experimentar con el temperature parameter - como cambia el output?
const chat = new ChatOpenAI({});

// ver si se puede anadir memory al chain - https://js.langchain.com/docs/modules/memory/how_to/buffer

const chain = new LLMChain({
  llm: chat,
  prompt: chatPrompt,
});

const result = await chain.call({
    profesion: "camarero",
    input: "Hola, me gustaría pedir una cerveza"
});

console.log(result)