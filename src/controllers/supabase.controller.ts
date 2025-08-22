export async function signUp(name: string, surname: string, email: string, password: string, avatar_url: string): Promise<{ data?: JSON; error?: string }> {
  try {
    if (!name || !surname || !email || !password) {
      throw new Error("Por favor, completa todos los campos.");
    }
    if (!email.endsWith("@javeriana.edu.co")) {
      throw new Error("El correo electrónico debe ser de la Pontificia Universidad Javeriana.");
    }
    if (avatar_url) {
      const img = new Image();
      const isValidImage = new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = avatar_url;
      });
      const validImage = await isValidImage;
      if (!validImage) {
        throw new Error("El URL del avatar no apunta a una imagen válida.");
      }
    }
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, password, avatar_url }),
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return { data: data.data, error: null };

  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
}

export async function signIn(email: string, password: string){

  try{
    const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

    const data = await response.json();

    if(data.error){
      throw new Error(data.error);
    }

    return {data: data.data, error: null };
  }catch(error){
    return {data: null, error: (error as Error).message };
  }
}

