from dotenv import load_dotenv
load_dotenv()

from datetime import datetime

from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.agents import AgentType
from langchain.llms import OpenAI
from langchain.tools import Tool

from dbChain.chain import db_chain
from qaChain.chain import qa_chain

from langchain.utilities import BingSearchAPIWrapper

search = BingSearchAPIWrapper()

llm = OpenAI(temperature=0)

tools = [
    Tool(
        name="Search",
        func=search.run,
        description="useful for when you need to answer questions about current events",
    ),
    Tool(
        name="Wine database",
        func=db_chain.run,
        description="useful for when you need to answer questions about wine",
    ),
    Tool(
        name="IA Generativa Sevilla",
        func=qa_chain.run,
        description="useful for when you need to answer questions about generative AI in Sevilla or the meetup group",
    ),
    Tool(
        name="Today",
        func=lambda x: datetime.now().strftime("%d/%m/%Y"),
        description="useful if you need to know what date it is today",
    ),
]

agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

if __name__ == '__main__':
    #agent.run("What is a good event if I want to learn about AI in Sevilla this week?")
    agent.run("I want a really good wine, I like acidic wines. What do you recommend, and where can I buy this wine?")