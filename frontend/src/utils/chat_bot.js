function LoadChatBot(){

    console.log("Probando mensaje de prueba: capital de españa");
    sendMessage("Dime cual es la capital de España");
}

async function sendMessage(message) {
    const inputMessage = message.trim();
    
    if (inputMessage === "") return; // No enviar mensajes vacíos
  
    // Clave de la API
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${CHATGPT_API_KEY}` // Usa la clave API
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo", // O "gpt-3.5-turbo" dependiendo de tu acceso
          messages: [{ "role": "user", "content": inputMessage }]
        })
      });
  
      
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        const errorMessage = `Error de response: ${response.status} - ${response.statusText}`;
        console.error(errorMessage);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      const botMessage = await data.choices[0].message;
      //const botMessage = data.choices[0].message;
  
      console.log("Respuesta de ChatGPT:", botMessage);
  
      // Aquí puedes manejar la respuesta del bot, por ejemplo, mostrarla en la interfaz
      // appendMessage("bot-message", botMessage);
  
    } catch (error) {
      console.error("Error al hacer la solicitud a la API de OpenAI:", error);
    }
  }