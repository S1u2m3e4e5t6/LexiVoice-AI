# 🎙️ LexiVoice AI — Local LLM Voice Legal Assistant

```
 _              ___     __    _               _    ___ 
| |    _____  _(_) \   / /__ (_) ___ ___     / \  |_ _|
| |   / _ \ \/ / |\ \ / / _ \| |/ __/ _ \   / _ \  | | 
| |__|  __/>  <| | \ V / (_) | | (_|  __/  / ___ \ | | 
|_____\___/_/\_\_|  \_/ \___/|_|\___\___| /_/   \_\___|

```
## code Google Colab Link
```
https://colab.research.google.com/drive/1JqRm2RkXb9YC87159b5QY-lNMIHgKW_G?usp=sharing

```




### prototype website
```
https://s1u2m3e4e5t6.github.io/LexiVoice-AI/
```
## Project Introduction
LexiVoice AI is a voice-activated legal AI assistant. It provides answers to common legal questions, but it's important to note that it's not a substitute for legal advice. Its primary advantage is that it operates entirely on a local model, ensuring that no user data is sent to OpenAI or any other third-party API.

* What it is: A local, voice-based LLM (Large Language Model) designed to answer everyday legal queries.

* Privacy: It is 100% private as all processing is done locally.

* Cost: This is an open-source and free-to-use project.

## Technical Pipeline
The project operates through four main stages:

1. 🎙️ Voice Input (ASR): The user speaks their question. The system captures the audio and uses a model like Google Speech-to-Text (STT) or Whisper to convert the speech into text.

2. 🧠 LLM Processing (Backend): This is the core of the project. The transcribed question is fed into a small, local GPT-style LLM. This model has been specifically fine-tuned on a legal dataset to provide accurate and relevant answers. The responses are based on prompt templates and a few-shot examples.

3. 🗣️ Voice Output (TTS): The answer from the LLM, in text format, is converted back into speech using a Text-to-Speech (TTS) model like gTTS or Coqui.

4. 🖥️ User Interface (Frontend): A simple yet effective Streamlit or Gradio UI serves as the frontend. It functions like a chat interface, allowing the user to interact with the AI assistant through voice and receive responses via both audio and text.

## Technology Stack
* Core Libraries: PyTorch, 🤗 Transformers & 🤗 Datasets, Tokenizers

* Voice Processing: Google STT / Whisper (ASR), gTTS / Coqui TTS (TTS)

* Frontend: Gradio / Streamlit

* Infrastructure: Google Colab (T4/V100 GPU)

## Key Features
* Base Model: A compact GPT-style model.

* Data: A curated set of public legal FAQs and synthetic QA data, which was meticulously cleaned and prepared for model training.

* Fine-Tuning: Techniques like LoRA (Low-Rank Adaptation) are used for faster, resource-efficient fine-tuning.

* Evaluation: The model's performance is evaluated using metrics like ROUGE score for content accuracy, while latency and ASR's impact on word error rate (WER) are also measured.

## Important Limitations
* This project is not a substitute for professional legal advice.

* The model may, at times, experience hallucinations, where it generates incorrect or fabricated information. Users are always encouraged to cross-reference the answers.






* Next upgrades. RAG with a statutes/FAQs index, LoRA on domain-specific corpora, quantization (GGUF/8-bit) for CPU-only runs.

