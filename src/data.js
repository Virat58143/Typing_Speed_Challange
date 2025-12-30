export function getText() {
  const texts = [
    "In today’s fast-paced digital world, artificial intelligence has become an integral part of our daily lives. With the advancement of technology, AI-powered chatbots are transforming the way we interact with computers and access information. These intelligent systems not only understand human queries but also provide quick and accurate responses in real time. By combining voice recognition, text analysis, and animated visual representation, AI chatbots create an engaging and interactive experience for users. Such innovations bridge the gap between humans and machines, making technology more intuitive, accessible, and fun.",
    "History helps us understand past events, learn from great civilizations, and see how human society has changed over time.",
    "By studying history, we understand how civilizations grew, faced challenges, and changed over time.",
    "The study of history shows how human ideas, societies, and traditions developed across centuries.",
    "History helps us understand past events, great civilizations, powerful leaders, social changes, and human struggles, showing how experiences of earlier times shaped the modern world and taught us important lessons for the future.",
    "By learning history, we understand the struggles, achievements, and ideas of people from the past, which helps us respect our heritage and make better decisions in the modern world.",
    "The study of history shows how human societies developed through time, facing challenges like conflicts, discoveries, and social change, and how these events shaped the world we live in now."
  ];

  return texts[Math.floor(Math.random() * texts.length)];
}
