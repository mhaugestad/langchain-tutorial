from langchain.vectorstores import Chroma
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain.llms import OpenAI
from langchain.embeddings.openai import OpenAIEmbeddings
from dotenv import load_dotenv
load_dotenv()

embeddings = OpenAIEmbeddings()

db = Chroma(collection_name='meetup', persist_directory="./chroma_db", embedding_function=embeddings)
qa_chain = RetrievalQA.from_chain_type(llm=OpenAI(), chain_type="stuff", retriever=db.as_retriever())

if __name__ == "__main__":
    query = "What is Generative IA Sevilla?"
    print(f"pregunta: {query}")
    print(f"respuesta: {qa_chain.run(query)}")
    print("\n\n")
    
    query = "Who is the organizer of Generative IA Sevilla?"
    print(f"pregunta: {query}")
    print(f"respuesta: {qa_chain.run(query)}")
