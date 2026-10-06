export type MemoryType = "image" | "video";

export type MemoryLayout =
  | "full"
  | "offset-left"
  | "offset-right"
  | "hero"
  | "cinema";

export type Memory = {
  id: number;
  type: MemoryType;
  src: string;
  layout: MemoryLayout;
  text: string;
};

export type Interlude = {
  after: number;
  text: string;
  tone?: "quiet" | "large";
};

export const introText = "Hola amor, queria hacerte algo diferente... ";
export const introButton = "Pulsa para ver";

export const memories: Memory[] = [
  { id: 1, type: "image", src: "/media/1.jpeg", layout: "full", text: "Eres unica sabes? demaciado para mi, en serio" },
  { id: 2, type: "image", src: "/media/2.jpeg", layout: "offset-right", text: "No sabes lo mucho que te amo, y lo que me encanta verte en mi cel" },
  { id: 3, type: "image", src: "/media/3.jpeg", layout: "full", text: "La alegria que me da de tan solo ver una notificacion tuya" },
  { id: 4, type: "image", src: "/media/4.jpeg", layout: "hero", text: "Que reviso el cel una y otra ves muchas veces porque quiero hablar contigo" },
  { id: 5, type: "video", src: "/media/5.mp4", layout: "full", text: "Eres esa niña que siempre quiero cuidar como siempre te lo eh dicho" },
  { id: 6, type: "video", src: "/media/6.mp4", layout: "offset-left", text: "A veces las palabras se las lleva el viento" },
  { id: 7, type: "video", src: "/media/7.mp4" , layout: "full", text: "Quiero que me dejes amarte, quererte, cuidarte" },
  { id: 8, type: "video", src: "/media/8.mp4", layout: "cinema", text: "" },
  { id: 9, type: "video", src: "/media/9.mp4", layout: "offset-right", text: "Se que eh cometido mis faltas, y las acepto pero creo que te eh dejado claro en claro que te amo, y quiero demostrartelo, quiero mejorar para ser mejor persona, y que nunca te alejes de mi por mis faltas" },
  { id: 10, type: "video", src: "/media/10.mp4", layout: "offset-right", text: "Y ese lazo quiero cuidarlo siempre y protegerlo" },
  { id: 11, type: "video", src: "/media/11.mp4", layout: "full", text: "Eres mi corasoncito rosado 💗" },
  { id: 12, type: "video", src: "/media/12.mp4", layout: "cinema", text: "Y mi niña preciosa" },
];

export const interludes: Interlude[] = [
  { after: 0, text: "A veces son cosas que quiero decirte pero no me salen", tone: "quiet" },
  { after: 4, text: "Y reina, mi niña, mi vida", tone: "large" },
  { after: 6, text: "Por eso quiero pedirte algo de todo corazon", tone: "large" },
  { after: 9, text: "Que nuestra amistad sea ese lazo que nunca se rompa, que tenga altos, bajos pero que se mantenga, que aprendamos a tener esas convesaciones incomodadas, que nos aprendamos a contar las cosas y no se guarden los sentimientos nunca mi princesa divina", tone: "quiet" },
];

export const interludeLine = "Y antes de terminar";
export const specialLine1 = "Quiero darte una ultima cosa";
export const specialLine2 = "Mi niña";
export const specialSrc = "/media/especial.jpeg";

export const preFinalMessage =
  "TE AMOOOOO 💗💗💗💗💗";

export const finalMessage = "Que la distancia nunca te haga dudar eso, ni mis errores te hagan cambiar o te hagan dudar de lo que siento por ti eres mi niña preciosa,  y mi joyita a la que amo demaciado";
