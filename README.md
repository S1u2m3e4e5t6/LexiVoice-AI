# 🎙️LexiVoice AI — Local LLM Voice Legal Assistant (Colab)

What it is. A voice interface over a locally fine-tuned transformer LLM for answering common legal questions. No OpenAI/ChatGPT calls.

# Pipeline

* ASR: Capture speech and transcribe (Whisper or Google STT in Colab).

* LLM: Local small model (GPT-like) fine-tuned for legal Q&A with prompt templates & few-shot examples.

* TTS: Convert the answer back to speech (gTTS/Coqui).

* UI: Streamlit app for talk-back interaction.

# Tech 🤗

* PyTorch,  Transformers & Datasets, Tokenizers

* Whisper / Google STT, gTTS / Coqui TTS

* Gradio/Streamlit, Google Colab (T4/V100)

# summary 🤗

* Base: small GPT-style model (e.g., ~125M–350M params).

* Data: curated public legal FAQs + synthetic QA; cleaned and split with stratified sampling.

* Fine-tune: next-token objective; LoRA optional for fast iteration.

* Eval: exact-match & ROUGE on a held-out set; report latency and WER impact from ASR.

# Limits

* Not a substitute for legal advice.

* Hallucinations possible; encourage follow-up checks.

# Run in Colab

* Notebook includes setup, model load, weights, and a one-click Gradio demo.


* Next upgrades. RAG with a statutes/FAQs index, LoRA on domain-specific corpora, quantization (GGUF/8-bit) for CPU-only runs.

