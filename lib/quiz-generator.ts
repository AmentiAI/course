// Quiz generator for lesson comprehension tests

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option (0-3)
  explanation: string;
}

export const generateQuiz = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  lessonContent: string
): QuizQuestion[] => {
  const cat = category.toLowerCase();
  const questions: QuizQuestion[] = [];
  
  // Extract key concepts from lesson title
  const titleWords = lessonTitle.toLowerCase();
  
  // Generate 5 questions per lesson
  for (let i = 0; i < 5; i++) {
    questions.push(generateQuestion(i, courseTitle, lessonTitle, cat, titleWords));
  }
  
  return questions;
};

const generateQuestion = (
  index: number,
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string
): QuizQuestion => {
  const questionTypes = [
    { type: 'concept', template: generateConceptQuestion },
    { type: 'application', template: generateApplicationQuestion },
    { type: 'strategy', template: generateStrategyQuestion },
    { type: 'mistake', template: generateMistakeQuestion },
    { type: 'implementation', template: generateImplementationQuestion },
  ];
  
  const questionType = questionTypes[index % questionTypes.length];
  return questionType.template(courseTitle, lessonTitle, category, titleWords, index);
};

const generateConceptQuestion = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string,
  index: number
): QuizQuestion => {
  const questions = {
    'web3': [
      {
        q: `What is the primary purpose of ${lessonTitle.toLowerCase()} in ${courseTitle}?`,
        opts: [
          'To maximize short-term profits without considering risks',
          'To build sustainable, scalable strategies for long-term success',
          'To copy what others are doing without understanding why',
          'To avoid all forms of risk and innovation'
        ],
        correct: 1,
        exp: 'The lesson focuses on building sustainable strategies that prioritize long-term growth and understanding over quick wins.'
      },
      {
        q: `In the context of ${courseTitle}, what is a key principle of ${lessonTitle.toLowerCase()}?`,
        opts: [
          'Always follow the crowd for safety',
          'Understand fundamentals before taking action',
          'Speed is more important than accuracy',
          'Ignore data and trust your gut'
        ],
        correct: 1,
        exp: 'Understanding fundamentals is crucial before implementing any strategy in Web3 and crypto.'
      }
    ],
    'ai': [
      {
        q: `What is the main takeaway from ${lessonTitle}?`,
        opts: [
          'AI can do everything without human oversight',
          'Automation should complement human decision-making, not replace it',
          'More complex AI is always better',
          'AI tools work the same in all scenarios'
        ],
        correct: 1,
        exp: 'Effective AI implementation enhances human capabilities rather than attempting to replace them entirely.'
      },
      {
        q: `When implementing ${lessonTitle.toLowerCase()}, what should be your first step?`,
        opts: [
          'Buy the most expensive AI tool available',
          'Clearly define the problem you\'re trying to solve',
          'Implement everything at once',
          'Copy someone else\'s workflow exactly'
        ],
        correct: 1,
        exp: 'Problem definition is crucial before selecting and implementing AI solutions.'
      }
    ],
    'business': [
      {
        q: `According to ${lessonTitle}, what drives successful ${courseTitle.toLowerCase()}?`,
        opts: [
          'Luck and perfect timing',
          'Consistent execution and data-driven decisions',
          'Having the biggest marketing budget',
          'Waiting for the perfect moment'
        ],
        correct: 1,
        exp: 'Success comes from consistent execution and making informed, data-driven decisions.'
      },
      {
        q: `What is a critical component of ${lessonTitle.toLowerCase()}?`,
        opts: [
          'Avoiding all competition',
          'Understanding your target audience deeply',
          'Focusing only on features, not benefits',
          'Setting prices as low as possible'
        ],
        correct: 1,
        exp: 'Deep understanding of your target audience is fundamental to business success.'
      }
    ]
  };
  
  const catKey = category.includes('web3') || category.includes('crypto') ? 'web3' : 
                 category.includes('ai') ? 'ai' : 'business';
  
  const selectedQ = questions[catKey][index % questions[catKey].length];
  
  return {
    id: `q${index + 1}`,
    question: selectedQ.q,
    options: selectedQ.opts,
    correctAnswer: selectedQ.correct,
    explanation: selectedQ.exp
  };
};

const generateApplicationQuestion = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string,
  index: number
): QuizQuestion => {
  const isWeb3 = category.includes('web3') || category.includes('crypto');
  const isAI = category.includes('ai');
  
  return {
    id: `q${index + 1}`,
    question: `How would you apply the concepts from ${lessonTitle} in a real-world scenario?`,
    options: [
      'Implement everything immediately without testing',
      'Start with a small pilot, measure results, then scale what works',
      'Wait until conditions are perfect before starting',
      'Copy exactly what worked for someone else'
    ],
    correctAnswer: 1,
    explanation: 'Starting small, measuring results, and scaling successful strategies is the proven approach to implementation.'
  };
};

const generateStrategyQuestion = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string,
  index: number
): QuizQuestion => {
  const isWeb3 = category.includes('web3') || category.includes('crypto');
  
  return {
    id: `q${index + 1}`,
    question: `What is the most effective strategy discussed in ${lessonTitle}?`,
    options: [
      'Following trends without understanding them',
      'Building systems that compound over time',
      'Chasing every new opportunity immediately',
      'Avoiding all forms of experimentation'
    ],
    correctAnswer: 1,
    explanation: 'The lesson emphasizes building sustainable systems that create compounding value over time.'
  };
};

const generateMistakeQuestion = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string,
  index: number
): QuizQuestion => {
  const isWeb3 = category.includes('web3') || category.includes('crypto');
  const isAI = category.includes('ai');
  
  const mistakes = isWeb3 ? [
    'Investing without understanding the fundamentals',
    'Having a clear risk management strategy',
    'Diversifying across multiple assets',
    'Continuously learning and adapting'
  ] : isAI ? [
    'Implementing AI without clear objectives',
    'Setting measurable goals before automation',
    'Testing solutions before full deployment',
    'Training team members on new tools'
  ] : [
    'Ignoring customer feedback and data',
    'Building systems for scalability',
    'Testing offers before scaling',
    'Tracking key performance metrics'
  ];
  
  return {
    id: `q${index + 1}`,
    question: `Which of the following is a common mistake to avoid when implementing ${lessonTitle.toLowerCase()}?`,
    options: mistakes,
    correctAnswer: 0,
    explanation: 'The lesson specifically warns against this common pitfall that many beginners make.'
  };
};

const generateImplementationQuestion = (
  courseTitle: string,
  lessonTitle: string,
  category: string,
  titleWords: string,
  index: number
): QuizQuestion => {
  return {
    id: `q${index + 1}`,
    question: `What is the recommended first action step after completing ${lessonTitle}?`,
    options: [
      'Move immediately to the next lesson without practice',
      'Apply one key concept from this lesson in your own project',
      'Wait until you\'ve completed the entire course',
      'Rewatch the lesson multiple times without taking action'
    ],
    correctAnswer: 1,
    explanation: 'Immediate application of one key concept helps reinforce learning and builds momentum for continued progress.'
  };
};
