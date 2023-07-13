from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.docstore.document import Document
from langchain.indexes.vectorstore import VectorstoreIndexCreator
from langchain.document_loaders import WebBaseLoader
from dotenv import load_dotenv
load_dotenv()

loader = WebBaseLoader(["https://www.meetup.com/ia-generativa-sevilla/"])
websites = loader.load()

text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
documents = text_splitter.split_documents(websites)

embeddings = OpenAIEmbeddings(openai_api_key='')

db = Chroma.from_documents(documents, embeddings, persist_directory='./chroma_db')

#query = "What is Generative IA Sevilla?"
#docs = db.similarity_search(query)