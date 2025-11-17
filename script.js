// --- JAVASCRIPT LOGIC START HERE ---

const welcomeScreen = document.getElementById('welcome-screen');
const mainContainer = document.getElementById('main-form-container');
const outputCard = document.getElementById('output-card');
const form = document.getElementById('tip-generator-form');
const submitBtn = document.getElementById('submit-btn');

// Function to handle the welcome screen dismissal
document.querySelector('.continue-btn').addEventListener('click', () => {
    welcomeScreen.classList.add('fade-out');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        mainContainer.classList.add('is-visible');
    }, 1500); 
});

// === FREE API INTEGRATION ===
const API_URL = 'http://localhost:3001/api/generate-mantra';

async function generateWithFreeAPI(name, lesson, fear) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                lesson: lesson,
                fear: fear
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Free API failed:', error);
        throw error;
    }
}

// === UPDATED FORM SUBMISSION HANDLER ===

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.textContent = "Generating Your Mantra...";

    const name = document.getElementById('name').value;
    const lesson = document.getElementById('lesson').value.trim();
    const fear = document.getElementById('fear').value.trim();

    if (!lesson || !fear) {
        alert('Please fill in both your lesson and fear');
        submitBtn.disabled = false;
        submitBtn.textContent = "Generate My Professional Mantra";
        return;
    }

    try {
        // Use FREE API to generate content
        const result = await generateWithFreeAPI(name, lesson, fear);

        // Update the UI
        document.getElementById('card-name').innerHTML = `For <span class="highlight">${name}</span>`;
        document.getElementById('pro-tip').innerHTML = result.proTip;
        document.getElementById('graduate-mantra').innerHTML = result.mantra;

        outputCard.style.display = 'block';
        
        setTimeout(() => {
            outputCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

    } catch (error) {
        console.error('Error generating mantra:', error);
        
        // Ultimate fallback - simple but effective
        const simpleProTip = `Your experience taught you <span class="highlight">${lesson}</span>. This wisdom will guide your professional journey.`;
        const simpleMantra = `When I face <span class="highlight">${fear}</span>, I remember that growth happens outside my comfort zone.`;
        
        document.getElementById('card-name').innerHTML = `For <span class="highlight">${name}</span>`;
        document.getElementById('pro-tip').innerHTML = simpleProTip;
        document.getElementById('graduate-mantra').innerHTML = simpleMantra;

        outputCard.style.display = 'block';
        
        setTimeout(() => {
            outputCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Generate My Professional Mantra";
    }
});

// --- JAVASCRIPT LOGIC END HERE ---