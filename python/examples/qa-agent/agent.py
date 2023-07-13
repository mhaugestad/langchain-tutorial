from langchain.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from dotenv import load_dotenv
load_dotenv()

embeddings = OpenAIEmbeddings(openai_api_key='')

db = Chroma(persist_directory="./chroma_db", embedding_function=embeddings)
qa = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type="stuff", retriever=db.as_retriever())

if __name__ == "__main__":
    query = "What is Generative IA Sevilla?"
    print(qa.run(query))
