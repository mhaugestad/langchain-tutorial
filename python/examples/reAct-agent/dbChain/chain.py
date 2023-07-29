from langchain import OpenAI, SQLDatabase, SQLDatabaseChain
import os
from dotenv import load_dotenv
load_dotenv()

db = SQLDatabase.from_uri(os.environ['SQLALCHEMY_DATABASE_URI'])
llm = OpenAI(temperature=0, verbose=True)

db_chain = SQLDatabaseChain.from_llm(llm, db, verbose=True)

if __name__ == '__main__':
    print(db_chain.run("Recommend me a good Tinto. I like very acidic wines"))