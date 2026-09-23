import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { BAKERY_CATALOG, DessertItem } from './src/data/bakeryCatalog.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// --- HELPER: FALLBACK MATCH LOGIC ---
function calculateFallbackMatch(
  occasion: string,
  mood: string,
  people: string,
  budget: number,
  dietary: string
) {
  // Score items in catalog
  const scored = BAKERY_CATALOG.map((item) => {
    let score = 0;
    if (item.moods.includes(mood as any)) score += 3;
    if (item.occasions.includes(occasion as any)) score += 3;
    if (dietary !== 'all' && item.dietary.includes(dietary as any)) score += 4;
    if (item.price <= budget) score += 2;
    // People match
    if (people.includes('6–8') || people.includes('10')) {
      if (item.category === 'loaf' || item.category === 'cake') score += 3;
    } else {
      if (item.category === 'cookie' || item.category === 'roll' || item.category === 'brownie') score += 2;
    }
    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const match = scored[0]?.item || BAKERY_CATALOG[0];

  return {
    matchedItemId: match.id,
    matchedItem: match,
    matchTitle: `Your Perfect Match: ${match.name}`,
    matchSubtitle: `${match.story.split('.')[0]}.`,
    servingFit: `Serves ${match.serves}.`,
    budgetFit: `Within your PKR ${budget} budget (PKR ${match.price}).`,
    bakerStory: match.story,
    sensoryNotes: match.sensoryNotes,
    whyThisBake: `Handcrafted specifically for your ${occasion} craving with ${mood} flavors. Made fresh to order in our small-batch ovens.`,
    complimentaryPairing: match.sensoryNotes.pairing,
    suggestedAddOn: BAKERY_CATALOG.find((i) => i.id !== match.id && i.category === 'cookie') || null,
  };
}

// --- API 1: DESSERT MATCHMAKER ---
app.post('/api/match', async (req: Request, res: Response) => {
  try {
    const { occasion, mood, people, budget, dietary, note } = req.body;
    const budgetNum = typeof budget === 'number' ? budget : 1500;
    const ai = getGeminiClient();

    if (!ai) {
      const fallback = calculateFallbackMatch(occasion, mood, people, budgetNum, dietary);
      return res.json(fallback);
    }

    const catalogSummary = BAKERY_CATALOG.map((i) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      price: i.price,
      serves: i.serves,
      moods: i.moods,
      occasions: i.occasions,
      dietary: i.dietary,
      story: i.story,
      pairing: i.sensoryNotes.pairing,
    }));

    const prompt = `
You are the Master Baker and Experience Matchmaker for "BAKE MATCH", a cozy artisan bakery where desserts are experiences, not commodities.

User Request:
- Occasion: "${occasion}"
- Mood: "${mood}"
- Servings/People: "${people}"
- Budget: "PKR ${budgetNum}"
- Dietary preference: "${dietary}"
- Personal note/vibe: "${note || 'None'}"

Here is the Bakehouse Pantry catalog:
${JSON.stringify(catalogSummary, null, 2)}

Pick the single BEST primary match from this catalog for this customer, plus an optional complementary add-on.
Write warm, sensory, poetic, and heartwarming copy.

Return a JSON object conforming strictly to this schema:
{
  "matchedItemId": "the exact id of the item from catalog",
  "matchTitle": "e.g. Your Perfect Match: Apple Cinnamon Loaf 🍎",
  "matchSubtitle": "e.g. Warm, comforting and perfect for a small tea gathering.",
  "servingFit": "e.g. Serves 6–8 people generously.",
  "budgetFit": "e.g. Within your PKR 1,000 budget (PKR 950).",
  "bakerStory": "An evocative, heartfelt 2-sentence story behind this bake (e.g. This is the loaf you order when you want your house to smell like cinnamon on a Sunday afternoon...)",
  "whyThisBake": "2 sentences explaining why this specifically fits their occasion and mood",
  "sensoryNotes": {
    "aroma": "sensory aroma description",
    "texture": "mouthfeel and texture description",
    "pairing": "recommended tea, coffee, or beverage pairing"
  },
  "suggestedAddOnId": "optional id of a cookie or brownie from catalog that pairs nicely, or empty string"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty Gemini response');
    }

    const parsed = JSON.parse(text);
    const matchedItem = BAKERY_CATALOG.find((i) => i.id === parsed.matchedItemId) || BAKERY_CATALOG[0];
    const suggestedAddOn = parsed.suggestedAddOnId
      ? BAKERY_CATALOG.find((i) => i.id === parsed.suggestedAddOnId) || null
      : null;

    res.json({
      ...parsed,
      matchedItem,
      suggestedAddOn,
    });
  } catch (error) {
    console.error('Matchmaker error:', error);
    const { occasion, mood, people, budget, dietary } = req.body;
    const fallback = calculateFallbackMatch(occasion || 'teaparty', mood || 'warm', people || '6–8', budget || 1000, dietary || 'all');
    res.json(fallback);
  }
});

// --- API 2: SURPRISE ME 🎲 ---
app.post('/api/surprise', async (req: Request, res: Response) => {
  try {
    const { moodHint, dietary } = req.body;
    const ai = getGeminiClient();

    let pool = BAKERY_CATALOG;
    if (dietary && dietary !== 'all') {
      const filtered = pool.filter((i) => i.dietary.includes(dietary as any));
      if (filtered.length > 0) pool = filtered;
    }

    const randomPick = pool[Math.floor(Math.random() * pool.length)];

    if (!ai) {
      return res.json({
        item: randomPick,
        surpriseHeadline: `Serendipity Served: ${randomPick.name}`,
        surpriseReason: `The ovens were whispering your name. A spontaneous treat packed with ${randomPick.moods.join(' & ')} magic.`,
        story: randomPick.story,
        bakerPairing: randomPick.sensoryNotes.pairing,
      });
    }

    const prompt = `
The customer clicked "SURPRISE ME 🎲" at BakeMatch bakery!
They want an unexpected, delightful homemade dessert experience.
Selected dessert: "${randomPick.name}" (${randomPick.category}, PKR ${randomPick.price}, serves ${randomPick.serves}).
Mood hint: "${moodHint || 'Spontaneous indulgence'}".

Provide a short, captivating surprise reveal in JSON format:
{
  "surpriseHeadline": "Catchy, evocative headline like 'Today’s Serendipitous Hearth Treat'",
  "surpriseReason": "2 playful, mouth-watering sentences about why the bakery universe picked this exact bake for them right now",
  "story": "A poetic 2-sentence story of this bake",
  "bakerPairing": "The perfect hot or iced drink to enjoy with it"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      item: randomPick,
      surpriseHeadline: parsed.surpriseHeadline || `Today's Serendipity: ${randomPick.name}`,
      surpriseReason: parsed.surpriseReason || `Fresh out of our cast-iron pans, chosen for your sweet tooth.`,
      story: parsed.story || randomPick.story,
      bakerPairing: parsed.bakerPairing || randomPick.sensoryNotes.pairing,
    });
  } catch (error) {
    console.error('Surprise API error:', error);
    const randomPick = BAKERY_CATALOG[Math.floor(Math.random() * BAKERY_CATALOG.length)];
    res.json({
      item: randomPick,
      surpriseHeadline: `Today's Sweet Serendipity: ${randomPick.name}`,
      surpriseReason: `Our baker pulled this batch fresh from the hearth this morning. Pure spontaneous comfort.`,
      story: randomPick.story,
      bakerPairing: randomPick.sensoryNotes.pairing,
    });
  }
});

// --- API 3: AI BAKER CHAT ("Treats&Temptations") ---
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Friendly rule-based response if API key is not yet set
      const lower = (message || '').toLowerCase();
      let reply = "Hello dear friend! I'm Treats&Temptations by SK, your boutique baker concierge. ";
      let recommendedIds: string[] = [];

      if (lower.includes('4 people') || lower.includes('5 people') || lower.includes('sugar free') || lower.includes('loaf')) {
        reply = "Our artisanal loaves are specifically baked to serve 4 to 5 people! For a wholesome, guilt-free delight, try our Sugar Free Dates and Walnuts Loaf (PKR 1,450), or our customer-favorite Apple Cinnamon Streusel Loaf (PKR 1,200).";
        recommendedIds = ['sugar-free-dates-walnuts-loaf', 'apple-cinnamon-loaf'];
      } else if (lower.includes('chocolate') || lower.includes('cocoa')) {
        reply = "For chocolate lovers, we have our Decadent Chocolate Custard Cake (PKR 1,850), Double Chocolate Loaf (serves 4-5, PKR 1,350), and our molten Artisan Fudge Brownies (PKR 350)!";
        recommendedIds = ['chocolate-custard-cake', 'classic-fudge-brownies', 'double-chocolate-loaf'];
      } else if (lower.includes('trifle') || lower.includes('triffle')) {
        reply = "We offer 3 delectable trifles: Gourmet Brownie Trifle (PKR 950), Artisan Banoffee Trifle (PKR 950), and Seasonal Fresh Fruit Trifle (PKR 900)!";
        recommendedIds = ['banoffee-trifle', 'brownie-trifle', 'fruit-trifle'];
      } else {
        reply += "Tell me how many guests you are hosting, what flavors you're daydreaming about, or your budget, and I'll tailor the ultimate Treats & Temptations boutique spread!";
        recommendedIds = ['cinnamon-rolls-cream-cheese', 'strawberry-cheesecake'];
      }

      const recommendedItems = BAKERY_CATALOG.filter((i) => recommendedIds.includes(i.id));

      return res.json({
        reply,
        recommendedItems,
        totalEstimate: recommendedItems.reduce((acc, i) => acc + i.price, 0),
      });
    }

    const catalogContext = BAKERY_CATALOG.map((i) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      price: i.price,
      serves: i.serves,
      moods: i.moods,
      dietary: i.dietary,
      story: i.story,
      sweetness: i.id.includes('sugar-free') || i.id.includes('lemon') ? 'Gentle / Balanced / Natural Sweetness' : 'Indulgent & Rich',
    }));

    const prompt = `
You are "Treats&Temptations", the master artisan baker at Treats & Temptations by SK (@treats&temptationsbysk).
Your bakery is dedicated to "finding the perfect homemade dessert experience" with our exclusive 15-item menu (cinnamon rolls with cream cheese frosting, fudge brownies, chocolate chip cookies, 7 artisan loaves each serving 4-5 people, brownie/banoffee/fruit trifles, strawberry cheesecake, and chocolate custard cake).
You speak like a warm, passionate baker in an apron with flour on your hands—inviting, sensory, knowledgeable, and caring. All loaves serve 4 to 5 people. All prices are in PKR.

Here is the complete BakeMatch bakery catalog:
${JSON.stringify(catalogContext, null, 2)}

User's message:
"${message}"

Conversation History:
${JSON.stringify(history || [])}

Instructions:
1. Provide a warm, conversational, sensory response. Address specific details like number of guests, sweetness preferences ("not too sweet"), dietary needs, and budget in PKR.
2. Recommend specific item(s) from the catalog with exact math (servings and prices). If they ask for a combo (e.g. 1 loaf + cookies), give them an exact recommendation within budget.
3. Suggest a drink pairing or serving ritual (e.g., warm in the oven for 3 minutes).
4. Return a JSON object with this schema:
{
  "reply": "Your warm conversational reply to the customer.",
  "recommendedItemIds": ["id1", "id2"],
  "combinationSummary": "Short explanation of the combo, e.g. 1 Loaf (serves 8) + 2 Brownies = PKR 1,650",
  "servingTip": "A small tip from the baker on how to warm or serve it"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    const recommendedItems = (parsed.recommendedItemIds || [])
      .map((id: string) => BAKERY_CATALOG.find((item) => item.id === id))
      .filter(Boolean);

    res.json({
      reply: parsed.reply,
      recommendedItems,
      combinationSummary: parsed.combinationSummary,
      servingTip: parsed.servingTip,
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.json({
      reply: "I'd love to bake something special for you! Our Apple Cinnamon Loaf and Fleur de Sel Cookies are a timeless comforting combination for any gathering.",
      recommendedItems: [BAKERY_CATALOG[0], BAKERY_CATALOG[5]],
      servingTip: "Warm gently in a low oven for 5 minutes before serving so the kitchen fills with the scent of cinnamon.",
    });
  }
});

// --- API 4: GET CATALOG ---
app.get('/api/catalog', (_req: Request, res: Response) => {
  res.json(BAKERY_CATALOG);
});

// --- API 5: SIMULATE ORDER SUBMISSION ---
app.post('/api/order', (req: Request, res: Response) => {
  const { items, boxCustomization, deliveryDate, deliverySlot, giftNote, customerInfo } = req.body;
  const orderNumber = `BM-${Math.floor(100000 + Math.random() * 900000)}`;
  const estimatedBakeTime = 'Tomorrow morning, 6:00 AM – 9:00 AM (Fresh from the oven)';

  res.json({
    success: true,
    orderNumber,
    estimatedBakeTime,
    items,
    boxCustomization,
    deliveryDate: deliveryDate || 'Tomorrow',
    deliverySlot: deliverySlot || 'Afternoon Tea Batch (2:00 PM - 5:00 PM)',
    giftNote,
    customerInfo,
    message: 'Your order has been logged into the bakery dough schedule! We will start whipping the butter fresh.',
  });
});

// Mount Vite or serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BakeMatch server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
