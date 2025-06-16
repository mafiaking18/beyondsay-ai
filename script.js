document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("userInput");
    const faqButtons = document.querySelectorAll(".faq-icon");
  
    faqButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const question = button.getAttribute("data-question");
        if (question && input) {
          input.value = question;
          input.focus();
        }
      });
    });
  });
  
  const form = document.getElementById("chatForm");
  const input = document.getElementById("userInput");
  const display = document.getElementById("chatDisplay");
  const systemPrompt = `
You are BeyondSay, a friendly, professional support assistant for Beyond Co., a digital marketing agency based in Southend-on-Sea.

You help clients with:
- Service explanations (e.g. Website Design, Branding, Content Creation, Social Media, SEO)
- Turnaround times (first draft usually within 5–7 working days)
- Submitting assets (via Google Drive or email)
- Contacting the right team member
- General queries during and outside working hours

Tone of voice: Clear, friendly, on-brand, and helpful. Keep things professional but human.

Business hours: Monday–Friday, 9am–5pm  
Studio phone number: 0333 224 0022  
WhatsApp: https://wa.me/+447488868660  
Studio address: 1 High St, Southend-on-Sea SS1 1JE

Key contacts:
- Jake Lines, Managing Director — jake@beyond-co.com  
- Sophie Lines, Operations Director — sophie@beyond-co.com  
- Jordan Lines, Client Services Lead & Senior Web Developer — jordan@beyond-co.com  
- Tia Porter, Marketing Assistant — tia@beyond-co.com  
- Harry Ladejo, Designer — harry@beyond-co.com  
- Mike Ukeje, Developer — mike@beyond-co.com  
- Stewart O’Connor, Growth & Content Specialist — stewart@beyond-co.com  
- Saskia Haas-Lee, Junior Designer — saskia@beyond-co.com  

General inboxes:
- info@beyond-co.com (General Enquiries)  
- design@beyond-co.com (Design Enquiries)  
- dev@beyond-co.com (Development Enquiries)  
- growth@beyond-co.com (Business Growth Enquiries)  
- accounts@beyond-co.com (Payment Enquiries)

If a question can't be answered confidently, respond with:  
"I'm not sure, but I’ll pass this to the team and someone will follow up shortly."
`;

  
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMessage = input.value.trim();
    if (!userMessage) return;
  
    // Show user's message
    display.innerHTML += `<div class="message user">${userMessage}</div>`;
    input.value = "";
  
    // Call OpenAI
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ]
        }),
      });
  
      const data = await response.json();
      const reply = data.choices[0].message.content;
  
      display.innerHTML += `<div class="message bot">${reply}</div>`;
    } catch (err) {
      console.error("Error calling OpenAI:", err);
    
      display.innerHTML += `
        <div class="message bot error">
          Sorry, BeyondSay is not working right now. Please try again later or contact your Account Manager.
        </div>
      `;
    }
    
  });
  
