import { DataSource } from "typeorm";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";

import dotenv from 'dotenv'
dotenv.config({path: '/workspaces/langchain-tutorial/.env' })

const datasource = new DataSource({
    type: "mssql",
    database: process.env.DB_NAME,
    port: 1433,
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
    includesTables: ["WineReviews"],
  });
  
  export const chain = new SqlDatabaseChain({
    llm: new OpenAI({ temperature: 0 }),
    database: db,
    //sqlOutputKey: "sql"
  });
  
  const res = await chain.call({ query: "Recommend me a good Tinto. I like very acidic wines"});
  console.log(res);