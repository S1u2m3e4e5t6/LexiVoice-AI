document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (savedTheme === 'light-mode') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    } else {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark-mode');
        }
    });

    // Modal functions
    window.openModal = function() {
        document.getElementById("myModal").style.display = "flex";
    }
    window.closeModal = function() {
        document.getElementById("myModal").style.display = "none";
    }
    window.onclick = function(event) {
        const modal = document.getElementById("myModal");
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    window.startTrial = function() {
        alert("Trial started! Connecting to AI backend for full experience.");
        closeModal();
        // Start voice recognition after trial starts
        startVoiceRecognition();
    }
    
    // FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close all other open FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle the clicked item
            item.classList.toggle('active');
        });
    });

    // Voice Assistant and SLM Integration
    let recognition;
    let isListening = false;

    function startVoiceRecognition() {
        if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
            console.warn('Voice recognition not supported in this browser.');
            alert('Your browser does not support voice recognition. Please try a modern browser like Chrome or Edge.');
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false; // Listen for a single utterance
        recognition.interimResults = false;
        recognition.lang = 'hi-IN'; // Set to Hindi for better recognition

        recognition.onstart = function() {
            isListening = true;
            console.log('Voice recognition started. Listening...');
            // You can add a UI indicator here, like changing the button text or color
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            console.log('User said: ' + transcript);
            processLegalQuery(transcript);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error: ', event.error);
            isListening = false;
            if (event.error === 'not-allowed' || event.error === 'permission-denied') {
                alert('Microphone access denied. Please allow microphone access for voice assistance.');
            }
        };

        recognition.onend = function() {
            isListening = false;
            console.log('Voice recognition ended.');
        };

        if (!isListening) {
            recognition.start();
        }
    }

    async function processLegalQuery(query) {
        console.log(`Sending query to SLM: ${query}`);

        // Placeholder for your backend API call
        // Replace this URL with your actual API endpoint
        const backendApiUrl = 'http://your-slm-backend-url.com/api/legal-query';

        try {
            const response = await fetch(backendApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: query }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }

            const data = await response.json();
            const legalAnswer = data.answer; // Assuming your API returns a JSON object with a key 'answer'

            // Display the text answer on the UI (you need an element for this in your HTML)
            // Example: const answerDiv = document.getElementById('ai-answer');
            // if (answerDiv) {
            //     answerDiv.textContent = legalAnswer;
            // }

            // Convert the text answer to voice
            speakResponse(legalAnswer);

        } catch (error) {
            console.error('Error fetching legal answer from backend:', error);
            const errorMessage = "Sorry, I am unable to process your request right now. Please try again later.";
            speakResponse(errorMessage);
        }

        // On-the-spot deletion logic
        console.log('Conversation and data deleted immediately after processing.');
    }

    function speakResponse(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            // You can select a specific voice if needed
            // const voices = window.speechSynthesis.getVoices();
            // utterance.voice = voices.find(voice => voice.lang === 'en-US' && voice.name.includes('Google'));
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn('Text-to-speech not supported in this browser.');
            alert("Text-to-speech is not supported on your browser.");
        }
    }
});