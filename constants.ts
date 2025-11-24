
import { Project, Animation, BlogPost, Edit } from './types';

export const HERO_TEXT = {
  greeting: "Hello Everyone",
  tagline: "A curated collection of my tech projects, robotics builds, blogs, animations, and the skills and experiences I pick up along the way. It’s a space where I share what I create, what I learn, and everything interesting I encounter in my journey."
};

export const ABOUT_TEXT = {
  name: "Hridik Sabharwal",
  role: "Student",
  intro: "Hi everyone! I'm Hridik Sabharwal, a 13-year-old student at Springdales School, Dhaula Kuan, New Delhi, India. I have a strong interest in computer programming and I'm a full-stack developer with experience in HTML, CSS, JavaScript, React, Python, and C. I also enjoy robotics and build new projects using Arduino, ESP32, and Raspberry Pi, while exploring the worlds of IoT, AI, and more.",
  secondary: "Besides tech, I'm a budding animator and have a growing passion for entrepreneurship and startups. I hope to create my own startup one day and continue innovating along the way."
};

export const FULL_ABOUT = {
  story: "My journey started with a curiosity about how things work. From taking apart toys to writing my first 'Hello World', I've always been driven by the desire to create. Being 13 allows me to look at technology with fresh eyes, unburdened by 'how things have always been done'. I believe in learning by doing—whether it's debugging a C program for my robot or tweaking keyframes in a Blender animation.",
  education: {
    school: "Springdales School, Dhaula Kuan",
    location: "New Delhi, India",
    details: "Currently balancing academics with my passion for technology and innovation."
  },
  journey: [
    { year: "2017", title: "Hello World", desc: "Started my journey with basic office tools like Word, PowerPoint, and Excel." },
    { year: "2018", title: "Editing & Design", desc: "Started designing graphics and editing content using Canva." },
    { year: "2021", title: "Web Development", desc: "Deep dived into HTML, CSS, and JS to build interactive websites." },
    { year: "2022", title: "Robotics", desc: "Built my first Arduino obstacle avoiding robot." },
    { year: "2023", title: "IoT & Automation", desc: "Started building smart devices with ESP32 and React." },
    { year: "2024", title: "Drone Aerodynamics", desc: "Explored the mechanics of flight and drone technology." },
    { year: "2025", title: "Animations & Skills", desc: "Leveling up my animation capabilities and refining technical skills." }
  ]
};

export const FOOTER_TEXT = "Feel free to reach out if you’d like to collaborate, share ideas, or just say hello! You can also contact me for comments, inquiries, or any help you need—I’m always happy to connect.";

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Smart Home IoT System',
    description: 'An automated home system using ESP32 and React dashboard to control lights and monitor temperature.',
    tags: ['IoT', 'React', 'C++'],
    imageUrl: 'https://picsum.photos/id/201/800/600',
    category: 'iot',
    featured: true,
    date: '2023-11-15',
    fullDescription: "This project aims to bridge the gap between affordable hardware and modern web interfaces. The Smart Home IoT System is a centralized control hub allowing users to monitor room temperature, humidity, and control lighting remotely. Using the ESP32 microcontroller as the brain, it communicates via WebSockets to a React-based frontend hosted on a local network.",
    journey: "I started this project because I wanted to turn my room lights on without getting out of bed. It began with a simple LED blink over Wi-Fi. Over three weeks, I learned about the MQTT protocol (though I eventually settled on WebSockets for lower latency on the local network) and how to design a PCB for the relay modules.",
    journeyImage: "https://picsum.photos/id/1/800/600",
    challenges: "The biggest challenge was handling the asynchronous nature of WebSocket messages in C++. I encountered several memory leaks on the ESP32 which caused it to crash after a few hours. Debugging this required me to dive deep into memory management and optimize the JSON parsing libraries I was using.",
    challengesImage: "https://picsum.photos/id/2/800/600",
    techStackDetails: ["ESP32 Microcontroller", "React.js (Frontend)", "Node.js (Backend)", "WebSockets", "C++ (Firmware)", "Tailwind CSS"],
    githubLink: "#",
    demoLink: "#"
  },
  {
    id: '2',
    title: 'Obstacle Avoiding Robot',
    description: 'A 4-wheel robot built with Arduino that navigates environments autonomously using ultrasonic sensors.',
    tags: ['Robotics', 'Arduino', 'C'],
    imageUrl: 'https://picsum.photos/id/202/800/600',
    category: 'robotics',
    featured: true,
    date: '2023-10-01',
    fullDescription: "An autonomous rover capable of navigating complex indoor environments without human intervention. The robot uses an HC-SR04 ultrasonic sensor mounted on a servo motor to 'look' around. When it detects an obstacle, it halts, scans left and right, calculates the clearest path, and executes a turn.",
    journey: "This was my entry into the world of robotics. I sourced the chassis and motors from a local scrap market. The first version simply spun in circles! It took many iterations of tweaking the motor driver logic (L298N) and sensor timing to get it to drive straight.",
    journeyImage: "https://picsum.photos/id/4/800/600",
    challenges: "Power management was tricky. The motors drew too much current, causing the Arduino to reset. I solved this by isolating the power supplies—one Li-ion battery for the motors and a separate 9V for the logic board.",
    challengesImage: "https://picsum.photos/id/5/800/600",
    techStackDetails: ["Arduino Uno", "C/C++", "L298N Motor Driver", "HC-SR04 Ultrasonic Sensor", "Servo Motors"],
    githubLink: "#"
  },
  {
    id: '3',
    title: 'Personal Portfolio v1',
    description: 'My first portfolio website built with simple HTML and CSS.',
    tags: ['HTML', 'CSS', 'Web'],
    imageUrl: 'https://picsum.photos/id/203/800/600',
    category: 'tech',
    featured: false,
    date: '2023-01-20',
    fullDescription: "The humble beginnings of my web development journey. This static site was hand-coded without any frameworks. It taught me the fundamentals of the Box Model, Flexbox, and responsive design using media queries.",
    journey: "I wanted a place to show my school friends what I was working on. I spent days just trying to center a div! Looking back, the code was messy, but it was functional and fast.",
    journeyImage: "https://picsum.photos/id/6/800/600",
    challenges: "Making it mobile-responsive was the hardest part. Understanding how 'rem' and '%' units worked versus fixed pixels was a major learning curve.",
    techStackDetails: ["HTML5", "CSS3", "Vanilla JavaScript"],
    githubLink: "#",
    demoLink: "#"
  },
  {
    id: '4',
    title: 'AI Image Classifier',
    description: 'Python script using TensorFlow to classify different types of fruits.',
    tags: ['AI', 'Python', 'TensorFlow'],
    imageUrl: 'https://picsum.photos/id/204/800/600',
    category: 'ai',
    featured: false,
    date: '2023-12-05',
    fullDescription: "A Convolutional Neural Network (CNN) trained on a custom dataset of fruit images. The model achieves 92% accuracy in distinguishing between apples, bananas, and oranges. It uses data augmentation techniques to prevent overfitting.",
    fullDescriptionImage: "https://picsum.photos/id/7/800/600",
    journey: "After watching a video on how AI 'sees', I had to try it myself. I collected 500 images of fruits and labeled them manually. Training the model on my laptop took hours, heating up the room!",
    challenges: "The model initially confused yellow apples with bananas. I had to tune the hyperparameters and add more variety to the training data (different lighting conditions) to improve robustness.",
    challengesImage: "https://picsum.photos/id/8/800/600",
    techStackDetails: ["Python", "TensorFlow/Keras", "NumPy", "Matplotlib", "Jupyter Notebook"],
    githubLink: "#"
  }
];

export const ANIMATIONS: Animation[] = [
  {
    id: '1',
    title: 'Cyberpunk City Walk',
    description: 'A 3D loop animation created in Blender featuring a neon-lit street.',
    imageUrl: 'https://picsum.photos/id/301/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    featured: true,
    date: '2023-11-20',
    software: ['Blender', 'DaVinci Resolve']
  },
  {
    id: '2',
    title: 'Character Rig Test',
    description: 'Testing fluid movements for a new character design.',
    imageUrl: 'https://picsum.photos/id/302/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    featured: true,
    date: '2023-10-15',
    software: ['Maya', 'After Effects']
  },
  {
    id: '3',
    title: 'Bouncing Ball Study',
    description: 'Classic animation exercise focusing on squash and stretch principles.',
    imageUrl: 'https://picsum.photos/id/304/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    featured: false,
    date: '2023-08-10',
    software: ['Blender']
  }
];

export const EDITS: Edit[] = [
  {
    id: '1',
    title: 'Cinematic Travel Montage',
    description: 'A fast-paced travel edit synced to music with custom transitions.',
    imageUrl: 'https://picsum.photos/id/401/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    featured: true,
    date: '2023-12-10',
    software: ['Premiere Pro', 'After Effects']
  },
  {
    id: '2',
    title: 'Gaming Highlights',
    description: 'High energy gaming compilation with visual effects and color grading.',
    imageUrl: 'https://picsum.photos/id/402/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    featured: true,
    date: '2023-11-05',
    software: ['Davinci Resolve']
  },
  {
    id: '3',
    title: 'Vlog Edit - Day in Life',
    description: 'A storytelling focused edit with calm pacing and aesthetic shots.',
    imageUrl: 'https://picsum.photos/id/403/800/600',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    featured: false,
    date: '2023-09-20',
    software: ['Premiere Pro']
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'My Journey into Robotics',
    excerpt: 'How I started with a simple LED blink and moved to complex autonomous rovers.',
    date: 'Oct 12, 2023',
    readTime: '5 min read',
    imageUrl: 'https://picsum.photos/id/101/800/600',
    featured: true,
    tags: ['Robotics', 'Learning'],
    author: "Hridik Sabharwal",
    content: [
      "It all started with a kit my parents bought me for my 10th birthday. It was a simple electronics kit with wires, batteries, and LEDs. I remember the first time I completed a circuit and the red light turned on—it felt like magic.",
      "But I quickly wanted more. I wanted the light to blink on its own. I wanted motors to spin based on sensors. That's when I discovered Arduino.",
      "The transition from simple electronics to programmable microcontrollers was steep. I had to learn C++. I had to understand variables, loops, and logic. My first few codes were copy-pasted, but slowly I began to understand the syntax.",
      "My first major build was the Obstacle Avoiding Robot. It was frustrating. Wires kept coming loose, the code had bugs, and the batteries would die. But the moment it autonomously turned away from a wall for the first time, all the frustration vanished.",
      "Robotics has taught me patience. It has taught me that failure is just a data point. Every time something doesn't work, I learn one way how NOT to do it. And that is the essence of engineering."
    ]
  },
  {
    id: '2',
    title: 'Why React for 2024?',
    excerpt: 'Analyzing why React remains the king of frontend development libraries.',
    date: 'Nov 03, 2023',
    readTime: '4 min read',
    imageUrl: 'https://picsum.photos/id/102/800/600',
    featured: true,
    tags: ['Tech', 'Web Dev'],
    author: "Hridik Sabharwal",
    content: [
      "In the ever-changing landscape of web development, frameworks come and go. Yet, React stands tall. Why?",
      "Component-Based Architecture: This is the game changer. Breaking down complex UIs into small, reusable pieces makes development faster and maintenance easier.",
      "The Ecosystem: The sheer number of libraries, tools, and tutorials available for React is staggering. If you have a problem, someone has likely already solved it and made a package for it.",
      "React Native: Learning React opens the door to mobile app development. The ability to use the same logic for web and mobile is a massive productivity booster.",
      "While newer contenders like Svelte and SolidJS are exciting, React's maturity and job market dominance make it the essential skill for 2024."
    ]
  },
  {
    id: '3',
    title: 'Getting Started with Blender',
    excerpt: 'Tips and tricks for beginners looking to dive into 3D animation.',
    date: 'Sep 15, 2023',
    readTime: '6 min read',
    imageUrl: 'https://picsum.photos/id/103/800/600',
    featured: false,
    tags: ['Animation', '3D'],
    author: "Hridik Sabharwal",
    content: [
      "Blender is intimidating. When you first open it, there are buttons everywhere. Don't panic.",
      "Start with the Donut Tutorial by Blender Guru. It's a rite of passage for every 3D artist. It covers modeling, texturing, lighting, and rendering in a way that is easy to follow.",
      "Learn the shortcuts. Blender relies heavily on keyboard shortcuts. G for Grab, R for Rotate, S for Scale. Memorize these, and your workflow will speed up by 10x.",
      "Don't aim for photorealism immediately. Start with low-poly styles. They are forgiving and help you understand form and composition without getting bogged down in complex texturing.",
      "Have fun! 3D art is about creating worlds. Don't be afraid to experiment."
    ]
  }
];
