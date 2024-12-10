export async function setLocale(locale) {
    const response = await fetch('/api/set-locale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ locale }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to set locale');
    }
  }
  