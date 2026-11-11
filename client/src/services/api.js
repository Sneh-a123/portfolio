// API Client for SNEHA.EXE Frontend

const API_BASE = '/api';

export const sendInquiry = async (inquiryData) => {
  try {
    const res = await fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('API error, simulating offline fallback:', err);
    return {
      success: true,
      simulated: true,
      message: "Thank you! Your inquiry has been noted. A real human reply is on the way! ❤️",
    };
  }
};

export const sendChatMessage = async (payload) => {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn('Chat API error, simulating local fallback:', err);
    return {
      success: true,
      reply: "I've received your thoughts! Sneha is currently away from the chat, but a real human reply is on the way! ❤️ You can also email her at snehasinha0905@gmail.com.",
      handoffCompleted: true,
    };
  }
};
