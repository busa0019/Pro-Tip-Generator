const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Try a different Hugging Face model that's more reliable
const HF_API_URL = "https://api-inference.huggingface.co/models/gpt2";

app.post('/api/generate-mantra', async (req, res) => {
  try {
    const { name, lesson, fear } = req.body;

    if (!lesson || !fear) {
      return res.status(400).json({ 
        error: 'Lesson and fear are required fields' 
      });
    }

    console.log('Generating mantra for:', { name, lesson, fear });

    try {
      const hfResult = await generateWithHuggingFace(name, lesson, fear);
      res.json(hfResult);
    } catch (hfError) {
      console.log('Hugging Face failed, using template system:', hfError.message);
      const fallbackResult = generateFallbackMantra(lesson, fear);
      res.json(fallbackResult);
    }

  } catch (error) {
    console.error('Server error:', error);
    const fallbackResult = generateFallbackMantra(lesson, fear);
    res.json(fallbackResult);
  }
});

async function generateWithHuggingFace(name, lesson, fear) {
  const prompt = `Create an inspiring professional mantra for a tech graduate. Lesson learned: ${lesson}. Fear: ${fear}.`;

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 100,
        temperature: 0.8,
        do_sample: true,
        return_full_text: false
      }
    }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const result = await response.json();
  const generatedText = result[0]?.generated_text || "";
  
  // Process the response to create our two parts
  const sentences = generatedText.split('. ').filter(s => s.length > 10);
  
  return {
    proTip: sentences[0] || `Your experience with "${lesson}" will guide your career.`,
    mantra: sentences[1] || `I will face ${fear} with courage and grow from the experience.`
  };
}

function generateFallbackMantra(lesson, fear) {
  const processedLesson = enhancedProcessInput(lesson, 'lesson');
  const processedFear = enhancedProcessInput(fear, 'fear');
  
  return {
    proTip: generateProTip(processedLesson),
    mantra: generateMantra(processedFear, processedLesson)
  };
}

function enhancedProcessInput(input, type) {
  let processed = input.toLowerCase().trim().replace(/[.,!?;:]$/, '');
  
  if (type === 'lesson') {
    if (processed.includes("google") || processed.includes("stackoverflow") || processed.includes("search")) {
      return "resourcefulness in finding solutions";
    }
    if (processed.includes("debug") || processed.includes("fix") || processed.includes("solve")) {
      return "systematic problem-solving approach";
    }
    if (processed.includes("ask") || processed.includes("help") || processed.includes("collaborat") || processed.includes("peer")) {
      return "the power of collaboration and communication";
    }
    if (processed.includes("practice") || processed.includes("learn") || processed.includes("try")) {
      return "continuous learning and adaptation";
    }
    if (processed.includes("test") || processed.includes("check") || processed.includes("verify")) {
      return "attention to detail and thorough validation";
    }
  }
  
  if (type === 'fear') {
    if (processed.includes("not good") || processed.includes("not smart") || processed.includes("imposter")) {
      return "moments of self-doubt";
    }
    if (processed.includes("new") || processed.includes("technology") || processed.includes("framework")) {
      return "learning new technologies";
    }
    if (processed.includes("complex") || processed.includes("hard") || processed.includes("difficult")) {
      return "complex challenges";
    }
    if (processed.includes("fail") || processed.includes("mistake") || processed.includes("wrong") || processed.includes("deployment")) {
      return "the possibility of failure";
    }
    if (processed === "debugging") {
      return "complex debugging challenges";
    }
    if (!processed.startsWith('the ') && !processed.startsWith('my ') && !processed.includes(' ')) {
      processed = "the " + processed;
    }
  }
  
  return processed;
}

function generateProTip(lesson) {
  const contexts = [
    `Your journey revealed that <span class="highlight">${lesson}</span>`,
    `The most valuable lesson you learned: <span class="highlight">${lesson}</span>`,
    `Through every challenge, you discovered <span class="highlight">${lesson}</span>`,
    `Your key insight was that <span class="highlight">${lesson}</span>`
  ];
  
  const applications = [
    "will be your foundation in the professional world.",
    "is your secret weapon for career success.",
    "will guide you through any challenge ahead.",
    "separates exceptional professionals from average ones.",
    "is the key to thriving in your tech career."
  ];
  
  const context = contexts[Math.floor(Math.random() * contexts.length)];
  const application = applications[Math.floor(Math.random() * applications.length)];
  
  return `${context} ${application}`;
}

function generateMantra(fear, lesson) {
  const templates = [
    `When facing <span class="highlight">${fear}</span>, I'll draw strength from <span class="highlight">${lesson}</span>`,
    `Though <span class="highlight">${fear}</span> may challenge me, I trust in <span class="highlight">${lesson}</span>`,
    `I transform <span class="highlight">${fear}</span> into growth through <span class="highlight">${lesson}</span>`,
    `Each encounter with <span class="highlight">${fear}</span> strengthens my belief in <span class="highlight">${lesson}</span>`,
    `I embrace <span class="highlight">${fear}</span> as an opportunity to apply <span class="highlight">${lesson}</span>`,
    `My response to <span class="highlight">${fear}</span> is grounded in <span class="highlight">${lesson}</span>`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
}

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running with improved template system!' });
});

app.listen(port, () => {
  console.log(`🚀 Mantra server running on http://localhost:${port}`);
  console.log(`📍 Using improved template system - reliable and free!`);
});