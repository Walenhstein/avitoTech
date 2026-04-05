import { OpenRouter } from "@openrouter/sdk"
import { maxTokensUsed } from "@openrouter/sdk/lib/stop-conditions.js"


const aiKey = import.meta.env.VITE_ai_key

const openrouter = new OpenRouter({
    apiKey: aiKey, 
})

const reference = `
Средняя цена на MacBook Pro 16" M1 Pro (16/512GB): 
115 000 – 135 000 ₽ — отличное состояние. 
От 140 000 ₽ — идеал, малый износ АКБ. 
90 000 – 110 000 ₽ — срочно или с дефектами.
`

export async function checkPrice(title, brand, model, type, yearManufacture, transmission, mileage, state) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_ai_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        model:'google/gemini-2.0-flash-001',
        messages: [
            {
                role: 'system',
                content: `В ОТВЕТ НА СООБЩЕНИЕ ОБЯЗАТЕЛЬНО ПРИСЫЛАЙ ПО ОБРАЗЦУ ${reference}`,
            },
            {
                role: 'user',
                content: `Узнай цену по объекту ${title} ${brand} ${model} ${type} ${yearManufacture} ${state} ${mileage} ${transmission}`
            }  
        ],
        max_tokens: 150
    })
})
    const data = await response.json();
    return data.choices[0].message.content
}

export async function createDescription(title, brand, model, type, yearManufacture, transmission, mileage, state, description) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_ai_key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        model:'google/gemini-2.0-flash-001',
        messages: [
            {
                role: 'system',
                content: `На основе сообщения с имеющимся (или undefined) описанием составь маркетинговое описание для Avito для ${title} ${brand} ${model} ${type} ${yearManufacture} ${state} ${mileage} ${transmission} . В ОТВЕТ ПРИШЛИ ТОЛЬКО ОБЬЯВЛЕНИЕ БЕЗ ЛИШНИХ РАССУЖДЕНИЙ И СЛОВ `,
            },
            {
                role: 'user',
                content: `Вот возможное описание ${description}  `,
            }  
        ],
        max_tokens: 150
    })
})
    const data = await response.json();
    return data.choices[0].message.content
}