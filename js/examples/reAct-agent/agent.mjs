import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";
import { ChainTool, BingSerpAPI, Tool } from "langchain/tools";
import { chain as sql_chain }  from "../db-chain/chain.mjs";
import { chain as qa_chain } from "../qa-chain/chain.mjs";

import dotenv from 'dotenv'
dotenv.config({path: '/workspaces/langchain-tutorial/.env' })

const model = new OpenAI({ temperature: 0 });

const tools = [
    new BingSerpAPI(process.env.BING_SUBSCRIPTION_KEY, {returnDirect:true}),
    new ChainTool({
      name: "Wine reviews",
      chain: sql_chain,
      description:
        "useful for when you need to answer questions about wine",
    }),
    new ChainTool({
        name: "IA Generativa Sevilla",
        chain: qa_chain,
        description:
          "useful for when you need to answer questions about generative AI in Sevilla or the meetup group",
      })
  ];

const executor = await initializeAgentExecutorWithOptions(tools, model, {
  agentType: "zero-shot-react-description",
  verbose: true,
});

const input = `I want a really good wine, I like acidic wines. What do you recommend, and where can I buy this wine?`;
const result = await executor.call({ input });
console.log(result)