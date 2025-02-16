# Install necessary packages
!pip install unsloth
!pip install --force-reinstall --no-cache-dir --no-deps git+https://github.com/unslothai/unsloth.git

# Import necessary libraries
import os
from huggingface_hub import login
import wandb
from google.colab import drive
from transformers import AutoTokenizer, AutoModelForCausalLM, TextStreamer
from unsloth import FastLanguageModel

# Mount Google Drive
drive.mount('/content/drive')

# Define the path to your model
model_path = "/content/drive/MyDrive/LLM Outputs/Deepseek-Business/"

max_seq_length = 2048
dtype = None
load_in_4bit = True

# Load the model and tokenizer using FastLanguageModel
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = model_path,
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit
)

import re

FastLanguageModel.for_inference(model)

def generate_response():
      # Format the prompt
      prompt = f"### Question: {user_question}\n### Response:"
      # Tokenize input and move to GPU
      inputs = tokenizer(prompt, return_tensors="pt").to("cuda")
      # Generate response
      outputs = model.generate(
          input_ids=inputs.input_ids,
          attention_mask=inputs.attention_mask,
          max_new_tokens=200,
          use_cache=True
      )
      # Decode the output to text
      response = tokenizer.decode(outputs[0], skip_special_tokens=True)
      # Remove content within <think> tags and the tags themselves
      response = re.sub(r'<think>.*?</think>', '', response, flags=re.DOTALL)
      # Remove any occurrence of the <|endoftext|> token
      response = response.replace('<|endoftext|>', '')
      # Strip leading and trailing whitespace
      return response.strip()


print(generate_response())


generate_response()