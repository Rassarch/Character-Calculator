const inputText = document.getElementById('input-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const paraCount = document.getElementById('para-count');
const sentenceCount = document.getElementById('sentence-count');
const charNsCount = document.getElementById('char-ns-count');
const uniqueWordCount = document.getElementById('unique-word-count');
const keywordList = document.getElementById('keyword-list');
const keywordCount = document.getElementById('keyword-count');
const keywordPercentage = document.getElementById('keyword-percentage');
const readingTime = document.getElementById('reading-time');
const speakingTime = document.getElementById('speaking-time');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const langID = document.getElementById('lang-id');
const langEN = document.getElementById('lang-en');

inputText.addEventListener('input', () => {
    const text = inputText.value;

    charCount.textContent = text.length;
    wordCount.textContent = countWords(text);
    paraCount.textContent = countParagraphs(text);
    sentenceCount.textContent = countSentences(text);
    charNsCount.textContent = text.replace(/\s/g, '').length;
    uniqueWordCount.textContent = countUniqueWords(text);
    const keywords = extractKeywords(text);
    keywordList.textContent = keywords.join(', ');
    keywordCount.textContent = `${keywords.length} kata`;
    keywordPercentage.textContent = `${(keywords.length / countWords(text) * 100 || 0).toFixed(2)}%`;
    readingTime.textContent = `${Math.ceil(text.split(' ').length / 200)} menit`; // assuming average reading speed is 200 wpm
    speakingTime.textContent = `${Math.ceil(text.split(' ').length / 130)} menit`; // assuming average speaking speed is 130 wpm
});

darkModeToggle.addEventListener('click', () => {
    const body = document.body;
    if (body.getAttribute('data-bs-theme') === 'dark') {
        body.removeAttribute('data-bs-theme');
    } else {
        body.setAttribute('data-bs-theme', 'dark');
    }
});

function switchToIndonesian() {
        document.getElementById('language-toggle').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate me-2" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
            </svg>
            Indonesia
        `;
        updateLanguage('id');
    }

    function switchToEnglish() {
        document.getElementById('language-toggle').innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-translate me-2" viewBox="0 0 16 16">
              <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z"/>
              <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31"/>
            </svg>
            English
        `;
        updateLanguage('en');
    }

    inputText.addEventListener('input', () => {
    const text = inputText.value;
    const keywords = extractKeywords(text);

    // Update UI
    document.getElementById('x1-list').textContent = keywords.x1.join(', ');
    document.getElementById('x2-list').textContent = keywords.x2.join(', ');
    document.getElementById('x3-list').textContent = keywords.x3.join(', ');

    // Update counts and percentages
    charCount.textContent = text.length;
    wordCount.textContent = countWords(text);
    paraCount.textContent = countParagraphs(text);
    sentenceCount.textContent = countSentences(text);
    charNsCount.textContent = text.replace(/\s/g, '').length;
    uniqueWordCount.textContent = countUniqueWords(text);
    keywordCount.textContent = `${keywords.x1.length + keywords.x2.length + keywords.x3.length} kata`;
    keywordPercentage.textContent = `${((keywords.x1.length + keywords.x2.length + keywords.x3.length) / countWords(text) * 100 || 0).toFixed(2)}%`;
    readingTime.textContent = `${Math.ceil(text.split(' ').length / 200)} menit`; // assuming average reading speed is 200 wpm
    speakingTime.textContent = `${Math.ceil(text.split(' ').length / 130)} menit`; // assuming average speaking speed is 130 wpm
});


function updateLanguage(lang) {
    if (lang === 'id') {
        document.getElementById('title').innerText = 'Kalkulator Karakter';
        document.getElementById('input-text').placeholder = 'Tempel atau ketik teks Anda di sini...';
        document.querySelectorAll('.bento-box h4')[0].innerText = 'Karakter';
        document.querySelectorAll('.bento-box h4')[1].innerText = 'Kata';
        document.querySelectorAll('.bento-box h4')[2].innerText = 'Paragraf';
        document.querySelectorAll('.bento-box h4')[3].innerText = 'Kalimat';
        document.querySelectorAll('.bento-box h4')[4].innerText = 'Karakter (tanpa spasi)';
        document.querySelectorAll('.bento-box h4')[5].innerText = 'Kata Unik';
        document.querySelectorAll('.bento-box h4')[6].innerText = 'Kata Kunci';
        document.querySelectorAll('.bento-box h4')[7].innerText = 'Waktu Baca';
        document.querySelectorAll('.bento-box h4')[8].innerText = 'Waktu Pidato';
        document.querySelectorAll('.bento-box p')[0].textContent = '0';
        document.querySelectorAll('.bento-box p')[1].textContent = '0';
        document.querySelectorAll('.bento-box p')[2].textContent = '0';
        document.querySelectorAll('.bento-box p')[3].textContent = '0';
        document.querySelectorAll('.bento-box p')[4].textContent = '0';
        document.querySelectorAll('.bento-box p')[5].textContent = '0';
        document.querySelectorAll('.bento-box p')[6].textContent = 'N/A';
        document.querySelectorAll('.bento-box p')[7].textContent = '0 menit';
        document.querySelectorAll('.bento-box p')[8].textContent = '0 menit';
    } else if (lang === 'en') {
        document.getElementById('title').innerText = 'Character Calculator';
        document.getElementById('input-text').placeholder = 'Paste or type your text here...';
        document.querySelectorAll('.bento-box h4')[0].innerText = 'Characters';
        document.querySelectorAll('.bento-box h4')[1].innerText = 'Words';
        document.querySelectorAll('.bento-box h4')[2].innerText = 'Paragraphs';
        document.querySelectorAll('.bento-box h4')[3].innerText = 'Sentences';
        document.querySelectorAll('.bento-box h4')[4].innerText = 'Characters (no spaces)';
        document.querySelectorAll('.bento-box h4')[5].innerText = 'Unique Words';
        document.querySelectorAll('.bento-box h4')[6].innerText = 'Keywords';
        document.querySelectorAll('.bento-box h4')[7].innerText = 'Reading Time';
        document.querySelectorAll('.bento-box h4')[8].innerText = 'Speaking Time';
        document.querySelectorAll('.bento-box p')[0].textContent = '0';
        document.querySelectorAll('.bento-box p')[1].textContent = '0';
        document.querySelectorAll('.bento-box p')[2].textContent = '0';
        document.querySelectorAll('.bento-box p')[3].textContent = '0';
        document.querySelectorAll('.bento-box p')[4].textContent = '0';
        document.querySelectorAll('.bento-box p')[5].textContent = '0';
        document.querySelectorAll('.bento-box p')[6].textContent = 'N/A';
        document.querySelectorAll('.bento-box p')[7].textContent = '0 minutes';
        document.querySelectorAll('.bento-box p')[8].textContent = '0 minutes';
    }
}

function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word).length;
}

function countParagraphs(text) {
    return text.trim().split(/\n+/).filter(para => para).length;
}

function countSentences(text) {
    return text.split(/[.!?]+/).filter(sentence => sentence.trim()).length;
}

function countUniqueWords(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    if (words) {
        const uniqueWords = new Set(words);
        return uniqueWords.size;
    }
    return 0;
}

function extractKeywords(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const wordFreq = {};
    words.forEach(word => {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    return Object.keys(wordFreq).sort((a, b) => wordFreq[b] - wordFreq[a]).slice(0, 5);
}
