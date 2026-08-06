export default {
  async fetch(request, env) {
      if (request.method === "OPTIONS") {
            return new Response(null, {
                    headers: {
                              "Access-Control-Allow-Origin": "*",
                                        "Access-Control-Allow-Methods": "POST, OPTIONS",
                                                  "Access-Control-Allow-Headers": "Content-Type",
                                                          },
                                                                });
                                                                    }

                                                                        if (request.method !== "POST") {
                                                                              return new Response("Method not allowed", { status: 405 });
                                                                                  }

                                                                                      try {
                                                                                            const { messages } = await request.json();

                                                                                                  const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
                                                                                                          method: "POST",
                                                                                                                  headers: {
                                                                                                                            "Content-Type": "application/json",
                                                                                                                                      "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
                                                                                                                                              },
                                                                                                                                                      body: JSON.stringify({
                                                                                                                                                                model: "gpt-4o-mini",
                                                                                                                                                                          messages: messages,
                                                                                                                                                                                    max_tokens: 500,
                                                                                                                                                                                            }),
                                                                                                                                                                                                  });
                                                                                                                                                                                                  
                                                                                                                                                                                                        const data = await openaiResponse.json();
                                                                                                                                                                                                        
                                                                                                                                                                                                              return new Response(JSON.stringify(data), {
                                                                                                                                                                                                                      headers: {
                                                                                                                                                                                                                                "Content-Type": "application/json",
                                                                                                                                                                                                                                          "Access-Control-Allow-Origin": "*",
                                                                                                                                                                                                                                                  },
                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                                                                                  return new Response(JSON.stringify({ error: err.message }), {
                                                                                                                                                                                                                                                                          status: 500,
                                                                                                                                                                                                                                                                                  headers: {
                                                                                                                                                                                                                                                                                            "Content-Type": "application/json",
                                                                                                                                                                                                                                                                                                      "Access-Control-Allow-Origin": "*",
                                                                                                                                                                                                                                                                                                              },
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                          },
                                                                                                                                                                                                                                                                                                                          };
