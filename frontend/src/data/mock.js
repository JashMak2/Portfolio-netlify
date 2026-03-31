export const mockData = {
  personal: {
    name: "Jash Makwana",
    title: "Product Manager & Software Engineer",
    email: "jashmakwana1003@gmail.com",
    phone: "+1-201-284-1782",
    location: "New York City, New York",
    description: "MS Software Engineering student at Stevens Institute of Technology with expertise in product management, machine learning, and full-stack development. Currently serving as Product Manager at Community Dreams Foundation, driving sustainable community solutions and energy independence initiatives.",
    social: {
      github: "https://github.com/jashmakwana",
      linkedin: "https://www.linkedin.com/in/jash-makwana/",
    }
  },
  
  experience: [
    {
      id: 1,
      company: "Community Dreams Foundation",
      position: "Product Manager",
      duration: "July 2025 – Present",
      location: "Jersey City, Remote",
      description: "Leading end-to-end product development for CDF's in-store energy solutions vertical, owning roadmap, scope, and release decisions from concept through launch.",
      achievements: [
        "Reduced requirements churn by 40% by introducing structured discovery sessions with community stakeholders, translating insights directly into sprint-ready specs.",
        "Cut backlog grooming time by 30% by establishing the team's first product health dashboard tracking KPIs, sprint velocity, and delivery risk across cross-functional teams.",
        "Leading end-to-end product development for CDF's in-store energy solutions vertical — owning roadmap, scope, and release decisions from concept through launch."
      ],
      technologies: ["Product Management", "Roadmap Planning", "Sprint Planning", "KPI Dashboards", "Cross-functional Leadership", "Stakeholder Management"],
      keyProjects: [
        "In-store Energy Solutions Vertical",
        "Product Health Dashboard",
        "Structured Discovery & Sprint Specs"
      ],
      impact: "Reduced requirements churn by 40% and cut backlog grooming time by 30% through structured discovery and KPI tracking."
    },
    {
      id: 2,
      company: "Sarjen Systems Pvt. Ltd.",
      position: "Machine Learning Intern",
      duration: "January 2023 – April 2023",
      location: "Ahmedabad, Gujarat",
      description: "Designed and deployed NLP solutions and machine learning models focused on chatbot development and medical entity recognition.",
      achievements: [
        "Designed and deployed an NLP chatbot using Python and spaCy, automating query responses and improving response efficiency by 30%, reducing manual support time.",
        "Built a Medical Entity Recognition (MER) model with TensorFlow and spaCy, achieving 70% higher accuracy in extracting patient and ailment entities from research papers.",
        "Engineered scalable data pipelines using Pandas and NumPy for text preprocessing and model training, cutting processing time by 20% and accelerating iteration cycles across the ML team."
      ],
      technologies: ["Python", "spaCy", "TensorFlow", "NLP", "Pandas", "NumPy", "Data Pipelines", "Machine Learning"],
      keyProjects: [
        "NLP Chatbot Development",
        "Medical Entity Recognition (MER) Model",
        "Scalable Data Pipeline Engineering"
      ],
      impact: "Improved response efficiency by 30%, achieved 70% higher accuracy in medical entity recognition, and reduced processing time by 20%."
    },
    {
      id: 3,
      company: "Grownited Pvt. Ltd.",
      position: "Product Manager",
      duration: "December 2021 – December 2022",
      location: "Ahmedabad, Gujarat",
      description: "Owned the roadmap for a 0→1 web and mobile platform, defining scope, writing user stories, and shipping a full product cycle on time and within budget.",
      achievements: [
        "Owned the roadmap for a 0→1 web and mobile platform, defining scope, writing user stories, and shipping a full product cycle on time and within budget across 3 engineering squads.",
        "Drove a 30% rise in client satisfaction and 25% reduction in post-release defects by embedding structured feedback loops, acceptance criteria, and QA checkpoints into every sprint.",
        "Built a live KPI and velocity dashboard in Confluence, surfacing bottlenecks that improved sprint throughput by 20% within two quarters."
      ],
      technologies: ["Agile", "Scrum", "Jira", "Confluence", "Sprint Planning", "KPI Tracking", "Roadmap Ownership", "QA"],
      keyProjects: [
        "0→1 Web & Mobile Platform",
        "Live KPI & Velocity Dashboard",
        "Structured Feedback & QA Integration"
      ],
      impact: "Drove 30% rise in client satisfaction, 25% reduction in post-release defects, and 20% improvement in sprint throughput."
    },
    {
      id: 4,
      company: "Grownited Pvt. Ltd.",
      position: "Software Developer",
      duration: "July 2021 – December 2021",
      location: "Ahmedabad, Gujarat",
      description: "Built full-stack features across web and mobile platforms, partnering with product and design teams to accelerate delivery and reduce revision cycles.",
      achievements: [
        "Engineered backend workflows in Python and SQL, eliminating manual processes and cutting data retrieval time by 35%, directly enabling the analytics layer used for PM-level release decisions.",
        "Built and optimized cross-platform UI components in React, TypeScript, and Flutter, reducing average page load time by 30% and improving user retention by 20% across web and mobile.",
        "Partnered with product and design teams to align technical implementation with user requirements, cutting revision cycles by 40% and accelerating feature sign-off from 2 weeks to 3 days."
      ],
      technologies: ["Python", "SQL", "React", "TypeScript", "Flutter", "Dart", "Full-stack Development", "API Development"],
      keyProjects: [
        "Backend Workflow Automation",
        "Cross-platform UI Components",
        "Product & Design Collaboration"
      ],
      impact: "Cut data retrieval time by 35%, reduced page load time by 30%, improved user retention by 20%, and accelerated feature sign-off from 2 weeks to 3 days."
    },
    {
      id: 5,
      company: "Huddle and Score",
      position: "Web Developer",
      duration: "July 2022 – December 2022",
      location: "Ahmedabad, Gujarat",
      description: "Rebuilt the company website and integrated a full database solution, significantly improving performance, user engagement, and data management.",
      achievements: [
        "Rebuilt the company website in React.js, reducing page load time by 40% and driving a 25% lift in user engagement within the first month post-launch.",
        "Designed and integrated an MSSQL database to manage user registrations, queries, and bookings, cutting manual data handling by 40% and reducing query resolution time by 35%.",
        "Overhauled UI/UX workflows and front-end validation, reducing form submission errors by 30% and lifting user satisfaction scores by 20% within two quarters."
      ],
      technologies: ["React.js", "MSSQL", "JavaScript", "UI/UX", "Responsive Design", "Front-end Validation", "Database Design"],
      keyProjects: [
        "Company Website Rebuild",
        "MSSQL Database Integration",
        "UI/UX & Validation Overhaul"
      ],
      impact: "Reduced page load time by 40%, cut manual data handling by 40%, reduced form errors by 30%, and improved user satisfaction by 20%."
    }
  ],
  projects: [
    {
      id: 1,
      title: "NLP Chatbot System",
      description: "Advanced NLP-based chatbot with automated response system using Python and spaCy for intelligent query handling and customer support.",
      longDescription: "Designed and deployed an intelligent NLP chatbot using Python and spaCy that automates query responses and improves response efficiency by 30%. The system includes natural language processing capabilities, automated response generation, and seamless integration with existing support workflows.",
      technologies: ["Python", "spaCy", "NLP", "Machine Learning", "TensorFlow", "Pandas", "NumPy", "REST APIs", "Text Processing"],
      category: "ml",
      date: "January 2023 - April 2023",
      githubUrl: "https://github.com/jashmakwana/nlp-chatbot",
      liveUrl: "https://nlp-chatbot.demo.com",
      features: [
        "Natural language processing with spaCy",
        "Automated query response system",
        "30% improvement in response efficiency",
        "Intelligent conversation flow management",
        "Seamless integration with support workflows",
        "Real-time query processing and analysis"
      ]
    },
    {
      id: 2,
      title: "Medical Entity Recognition System",
      description: "Advanced ML model for extracting patient and ailment entities from medical research papers using TensorFlow and spaCy.",
      longDescription: "Built a sophisticated Medical Entity Recognition (MER) model with TensorFlow and spaCy, achieving 70% higher accuracy in extracting patient and ailment entities from research papers. The system processes unstructured medical text and identifies key medical entities with high precision.",
      technologies: ["TensorFlow", "spaCy", "Python", "Machine Learning", "Healthcare Technology", "Entity Recognition", "Pandas", "NumPy", "Data Pipelines"],
      category: "ml",
      date: "January 2023 - April 2023",
      githubUrl: "https://github.com/jashmakwana/medical-entity-recognition",
      liveUrl: "https://mer-system.demo.com",
      features: [
        "70% higher accuracy in entity extraction",
        "TensorFlow and spaCy integration",
        "Medical text processing capabilities",
        "Patient and ailment entity identification",
        "Scalable architecture for large datasets",
        "Healthcare domain-specific optimization"
      ]
    },
    {
      id: 3,
      title: "Budget Buddy",
      description: "A comprehensive Flutter-based personal finance management application with advanced features for transaction tracking and financial insights.",
      longDescription: "Collaborated with the team to develop a Flutter-based application focused on personal finance management. Designed and implemented the app's database, ensuring efficient management of user transaction data. Developed key backend functionalities, including CRUD operations for SQLite, to enable transaction storage and retrieval.",
      technologies: ["Flutter", "Dart", "SQLite", "Firebase", "REST APIs", "State Management", "UI/UX Design", "GitHub Actions", "CI/CD"],
      category: "mobile",
      date: "August 2024 - December 2024",
      githubUrl: "https://github.com/jashmakwana/budget-buddy",
      liveUrl: "https://budgetbuddy.app",
      features: [
        "Personal finance management with intuitive UI",
        "SQLite database for efficient transaction storage",
        "CRUD operations for transaction management",
        "Real-time data updates and interactive user experience",
        "CI/CD integration with GitHub Actions",
        "Unit testing for reliability and quality assurance"
      ]
    },
    {
      id: 4,
      title: "Huddle and Score",
      description: "Full-stack responsive web application with React.js frontend and MSSQL database integration for user management and booking systems.",
      longDescription: "Developed and deployed a comprehensive responsive website using React.js framework, improving page load speed and user engagement by 25%. The application includes MSSQL database integration for managing user registrations, queries, and bookings with optimized UI/UX workflows.",
      technologies: ["React.js", "JavaScript", "MSSQL", "Node.js", "Responsive Design", "UI/UX", "CSS3", "HTML5", "REST APIs"],
      category: "web",
      date: "July 2022 - December 2022",
      githubUrl: "https://github.com/jashmakwana/huddle-and-score",
      liveUrl: "https://huddleandscore.demo.com",
      features: [
        "25% improvement in page load speed and user engagement",
        "MSSQL database for user management",
        "40% reduction in manual data handling",
        "30% reduction in form submission errors",
        "20% improvement in user satisfaction scores",
        "Cross-device responsive design"
      ]
    },
    {
      id: 5,
      title: "Image Caption Generator",
      description: "Advanced machine learning model for automatic image caption generation using deep learning and computer vision techniques.",
      longDescription: "Built a machine learning model to generate captions for images provided by the user. Trained the model on a large dataset, using CNNs like VGGNet and ResNet to extract meaningful image features. Applied advanced techniques such as beam search and length normalization to enhance caption quality.",
      technologies: ["Python", "TensorFlow", "CNN", "VGGNet", "ResNet", "Computer Vision", "Keras", "NumPy", "NLTK", "Deep Learning"],
      category: "ml",
      date: "January 2022 - May 2022",
      githubUrl: "https://github.com/jashmakwana/image-caption-generator",
      liveUrl: "https://imagecaptions.demo.com",
      features: [
        "CNN-based feature extraction using VGGNet and ResNet",
        "Advanced beam search implementation",
        "Length normalization for improved caption quality",
        "Large dataset training for robust performance",
        "Real-time image processing and caption generation"
      ]
    }
  ],

  skills: {
    aiml: ["Prompt Engineering", "NLP Pipeline Design", "ML Feature Scoping", "LLM Evaluation"],
    languages: ["Python", "C/C++", "HTML", "CSS", "JavaScript", "Dart", "TypeScript", "SQL"],
    libraries: ["Pandas", "NumPy", "spaCy", "TensorFlow", "Flutter", "Angular", "React"],
    databases: ["MySQL", "MongoDB", "MSSQL", "SQLite"],
    tools: ["Git", "GitHub Actions", "VS Code", "Power BI", "Tableau", "Docker"],
    methodologies: ["Agile", "Scrum", "Kanban", "Waterfall", "Six Sigma", "Lean"],
    management: ["Asana", "ClickUp", "Jira", "Trello", "Notion", "Confluence", "Slack", "MS Teams", "Google Workspace", "Sharepoint", "MS Visio", "MS Project", "Microsoft Office Suite"]
  },

  education: [
    {
      institution: "Stevens Institute of Technology",
      degree: "Master of Science in Software Engineering",
      location: "Hoboken, NJ",
      duration: "September 2023 - May 2025",
      gpa: "3.90/4.0",
      coursework: "Cost Estimation and Metrics, Decision and Risk Analysis, Agile Methodologies"
    },
    {
      institution: "Indus University",
      degree: "Bachelor of Technology in Computer Engineering", 
      location: "Gujarat, India",
      duration: "July 2019 - May 2023",
      gpa: "3.71/4.0"
    }
  ]
};
