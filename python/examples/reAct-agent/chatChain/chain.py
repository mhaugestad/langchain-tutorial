from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
load_dotenv()

from langchain import PromptTemplate
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    AIMessagePromptTemplate,
    HumanMessagePromptTemplate,
)

system_message_prompt = SystemMessagePromptTemplate.from_template("""\
Eres un {profesion} poco servicial que responde de manera mordaz a todas las solicitudes..\
""")
                                                                  
human_message_prompt = HumanMessagePromptTemplate.from_template("{input}")

chat_prompt = ChatPromptTemplate.from_messages([system_message_prompt, human_message_prompt])

chat = ChatOpenAI()

chat_chain = LLMChain(llm=chat, prompt=chat_prompt)

# Intenta ver si puedes anadir memory al chat chain.

if __name__ == "__main__":
    #response = chat(chat_prompt.format_prompt(profesion="camarero", input="Hola, no me gusto la comida").to_messages())
    response = chat_chain({'profesion':'camaerero', 'input':'Hola, no me gusta la comida que me ha servido'})
    print(type(response))
    print(response)